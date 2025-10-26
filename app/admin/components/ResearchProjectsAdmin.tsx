'use client';

import { useState, useEffect } from 'react';
import { ResearchProject } from '../../../data/types';
import { updateFile, validatePAT } from '../../../lib/github';

export default function ResearchProjectsAdmin() {
  const [researchProjects, setResearchProjects] = useState<ResearchProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<ResearchProject | null>(null);
  const [showPATModal, setShowPATModal] = useState(false);
  const [pat, setPat] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<ResearchProject>>({
    title: '',
    description: '',
    keyFindings: [''],
    status: 'active',
    collaborators: [''],
    funding: '',
  });

  // Load research projects data
  useEffect(() => {
    const loadResearchProjects = async () => {
      try {
        // Import the JSON data directly like the main pages do
        const researchProjectsData = await import('../../../data/researchProjects.json');
        setResearchProjects(researchProjectsData.default as ResearchProject[]);
      } catch (error) {
        console.error('Error loading research projects:', error);
        setMessage({ type: 'error', text: 'Failed to load research projects' });
      } finally {
        setIsLoading(false);
      }
    };

    loadResearchProjects();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleKeyFindingsChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      keyFindings: prev.keyFindings?.map((finding, i) => i === index ? value : finding) || ['']
    }));
  };

  const addKeyFinding = () => {
    setFormData(prev => ({
      ...prev,
      keyFindings: [...(prev.keyFindings || []), '']
    }));
  };

  const removeKeyFinding = (index: number) => {
    setFormData(prev => ({
      ...prev,
      keyFindings: prev.keyFindings?.filter((_, i) => i !== index) || ['']
    }));
  };

  const handleCollaboratorsChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      collaborators: prev.collaborators?.map((collab, i) => i === index ? value : collab) || ['']
    }));
  };

  const addCollaborator = () => {
    setFormData(prev => ({
      ...prev,
      collaborators: [...(prev.collaborators || []), '']
    }));
  };

  const removeCollaborator = (index: number) => {
    setFormData(prev => ({
      ...prev,
      collaborators: prev.collaborators?.filter((_, i) => i !== index) || ['']
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowPATModal(true);
  };

  const handlePATSubmit = async () => {
    if (!pat.trim()) {
      setMessage({ type: 'error', text: 'Please enter your GitHub PAT' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      // Validate PAT
      const isValidPAT = await validatePAT(pat);
      if (!isValidPAT) {
        setMessage({ type: 'error', text: 'Invalid GitHub PAT' });
        setIsSubmitting(false);
        return;
      }

      // Generate ID if new project
      const newProject: ResearchProject = {
        ...formData as ResearchProject,
        id: editingProject?.id || generateId(formData.title || ''),
        keyFindings: formData.keyFindings?.filter(finding => finding.trim() !== '') || [],
        collaborators: formData.collaborators?.filter(collab => collab.trim() !== '') || [],
      };

      // Update research projects array
      let updatedProjects: ResearchProject[];
      if (editingProject) {
        updatedProjects = researchProjects.map(p => 
          p.id === editingProject.id ? newProject : p
        );
      } else {
        updatedProjects = [...researchProjects, newProject];
      }

      // Create JSON content
      const jsonContent = JSON.stringify(updatedProjects, null, 2);

      // Update file via GitHub API
      const result = await updateFile(
        pat,
        'data/researchProjects.json',
        jsonContent,
        editingProject 
          ? `Update research project: ${newProject.title}`
          : `Add research project: ${newProject.title}`
      );

      if (result.success) {
        setResearchProjects(updatedProjects);
        setMessage({ type: 'success', text: 'Research project saved successfully!' });
        resetForm();
        setShowPATModal(false);
        setPat('');
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      console.error('Error saving research project:', error);
      setMessage({ type: 'error', text: 'Failed to save research project' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (project: ResearchProject) => {
    setEditingProject(project);
    setFormData({
      ...project,
      keyFindings: project.keyFindings && project.keyFindings.length > 0 ? project.keyFindings : [''],
      collaborators: project.collaborators && project.collaborators.length > 0 ? project.collaborators : [''],
    });
    setShowForm(true);
  };

  const handleDelete = async (project: ResearchProject) => {
    if (!confirm(`Are you sure you want to delete "${project.title}"?`)) {
      return;
    }

    setShowPATModal(true);
    setEditingProject(project);
  };

  const handleDeleteConfirm = async () => {
    if (!editingProject) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      // Validate PAT
      const isValidPAT = await validatePAT(pat);
      if (!isValidPAT) {
        setMessage({ type: 'error', text: 'Invalid GitHub PAT' });
        setIsSubmitting(false);
        return;
      }

      // Remove project from array
      const updatedProjects = researchProjects.filter(p => p.id !== editingProject.id);

      // Create JSON content
      const jsonContent = JSON.stringify(updatedProjects, null, 2);

      // Update file via GitHub API
      const result = await updateFile(
        pat,
        'data/researchProjects.json',
        jsonContent,
        `Delete research project: ${editingProject.title}`
      );

      if (result.success) {
        setResearchProjects(updatedProjects);
        setMessage({ type: 'success', text: 'Research project deleted successfully!' });
        setShowPATModal(false);
        setPat('');
        setEditingProject(null);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      console.error('Error deleting research project:', error);
      setMessage({ type: 'error', text: 'Failed to delete research project' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      keyFindings: [''],
      status: 'active',
      collaborators: [''],
      funding: '',
    });
    setEditingProject(null);
    setShowForm(false);
  };

  const generateId = (title: string): string => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'upcoming': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading research projects...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Research Projects</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          Add Project
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      {/* Research Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {researchProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{project.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
            
            {project.funding && (
              <p className="text-xs text-gray-500 mb-4">
                <span className="font-medium">Funding:</span> {project.funding}
              </p>
            )}
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleEdit(project)}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project)}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingProject ? 'Edit Research Project' : 'Add Research Project'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description *</label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status *</label>
                    <select
                      name="status"
                      required
                      value={formData.status}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="upcoming">Upcoming</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Funding</label>
                    <input
                      type="text"
                      name="funding"
                      value={formData.funding}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Key Findings</label>
                  {formData.keyFindings?.map((finding, index) => (
                    <div key={index} className="flex items-center space-x-2 mt-2">
                      <input
                        type="text"
                        value={finding}
                        onChange={(e) => handleKeyFindingsChange(index, e.target.value)}
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
                        placeholder="Key finding"
                      />
                      {formData.keyFindings && formData.keyFindings.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeKeyFinding(index)}
                          className="px-3 py-2 text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addKeyFinding}
                    className="mt-2 px-3 py-1 text-sm text-red-600 hover:text-red-800 border border-red-300 rounded-md hover:bg-red-50"
                  >
                    Add Key Finding
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Collaborators</label>
                  {formData.collaborators?.map((collab, index) => (
                    <div key={index} className="flex items-center space-x-2 mt-2">
                      <input
                        type="text"
                        value={collab}
                        onChange={(e) => handleCollaboratorsChange(index, e.target.value)}
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
                        placeholder="Collaborator name"
                      />
                      {formData.collaborators && formData.collaborators.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCollaborator(index)}
                          className="px-3 py-2 text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addCollaborator}
                    className="mt-2 px-3 py-1 text-sm text-red-600 hover:text-red-800 border border-red-300 rounded-md hover:bg-red-50"
                  >
                    Add Collaborator
                  </button>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    {editingProject ? 'Update' : 'Add'} Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* PAT Modal */}
      {showPATModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                GitHub Authentication Required
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Enter your GitHub Personal Access Token to {editingProject ? 'delete' : 'save'} this research project.
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub PAT
                </label>
                <input
                  type="password"
                  value={pat}
                  onChange={(e) => setPat(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowPATModal(false);
                    setPat('');
                    setEditingProject(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  onClick={editingProject ? handleDeleteConfirm : handlePATSubmit}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Processing...' : (editingProject ? 'Delete' : 'Save')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
