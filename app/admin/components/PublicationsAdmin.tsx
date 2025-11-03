'use client';

import { useState, useEffect } from 'react';
import { Publication } from '../../../data/types';
import { updateFile, validatePAT } from '../../../lib/github';

export default function PublicationsAdmin() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPublication, setEditingPublication] = useState<Publication | null>(null);
  const [showPATModal, setShowPATModal] = useState(false);
  const [pat, setPat] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [patAction, setPatAction] = useState<'save' | 'delete' | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<Publication>>({
    title: '',
    authors: '',
    journal: '',
    year: new Date().getFullYear(),
    citations: 0,
    pmid: '',
    doi: '',
    type: 'article',
    role: undefined,
  });

  // Load publications data
  useEffect(() => {
    const loadPublications = async () => {
      try {
        // Import the JSON data directly like the main pages do
        const publicationsData = await import('../../../data/publications.json');
        setPublications(publicationsData.default as Publication[]);
      } catch (error) {
        console.error('Error loading publications:', error);
        setMessage({ type: 'error', text: 'Failed to load publications' });
      } finally {
        setIsLoading(false);
      }
    };

    loadPublications();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'citations' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPatAction('save');
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

      // Generate ID if new publication
      const newPublication: Publication = {
        ...formData as Publication,
        id: editingPublication?.id || generateId(formData.title || ''),
      };

      // Update publications array
      let updatedPublications: Publication[];
      if (editingPublication) {
        updatedPublications = publications.map(p => 
          p.id === editingPublication.id ? newPublication : p
        );
      } else {
        updatedPublications = [...publications, newPublication];
      }

      // Create JSON content
      const jsonContent = JSON.stringify(updatedPublications, null, 2);

      // Update file via GitHub API
      const result = await updateFile(
        pat,
        'data/publications.json',
        jsonContent,
        editingPublication 
          ? `Update publication: ${newPublication.title}`
          : `Add publication: ${newPublication.title}`
      );

      if (result.success) {
        setPublications(updatedPublications);
        setMessage({ type: 'success', text: 'Publication saved successfully!' });
        resetForm();
        setShowPATModal(false);
        setPat('');
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      console.error('Error saving publication:', error);
      setMessage({ type: 'error', text: 'Failed to save publication' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (publication: Publication) => {
    setEditingPublication(publication);
    setFormData(publication);
    setShowForm(true);
  };

  const handleDelete = async (publication: Publication) => {
    if (!confirm(`Are you sure you want to delete "${publication.title}"?`)) {
      return;
    }
    setEditingPublication(publication);
    setPatAction('delete');
    setShowPATModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!editingPublication) return;

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

      // Remove publication from array
      const updatedPublications = publications.filter(p => p.id !== editingPublication.id);

      // Create JSON content
      const jsonContent = JSON.stringify(updatedPublications, null, 2);

      // Update file via GitHub API
      const result = await updateFile(
        pat,
        'data/publications.json',
        jsonContent,
        `Delete publication: ${editingPublication.title}`
      );

      if (result.success) {
        setPublications(updatedPublications);
        setMessage({ type: 'success', text: 'Publication deleted successfully!' });
        setShowPATModal(false);
        setPat('');
        setEditingPublication(null);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      console.error('Error deleting publication:', error);
      setMessage({ type: 'error', text: 'Failed to delete publication' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      authors: '',
      journal: '',
      year: new Date().getFullYear(),
      citations: 0,
      pmid: '',
      doi: '',
      type: 'article',
      role: undefined,
    });
    setEditingPublication(null);
    setShowForm(false);
  };

  const generateId = (title: string): string => {
    return (publications.length + 1).toString();
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading publications...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Publications</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          Add Publication
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

      {/* Publications List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full table-auto divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Journal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Citations
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {publications.map((publication) => (
              <tr key={publication.id}>
                <td className="px-6 py-4 align-top">
                  <div className="text-sm font-medium text-gray-900 max-w-2xl whitespace-normal break-words">
                    {publication.title}
                  </div>
                </td>
                <td className="px-6 py-4 align-top text-sm text-gray-500 whitespace-normal break-words max-w-lg">
                  {publication.journal}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {publication.year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {publication.citations}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleEdit(publication)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(publication)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingPublication ? 'Edit Publication' : 'Add Publication'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <label className="block text-sm font-medium text-gray-700">Authors *</label>
                    <input
                      type="text"
                      name="authors"
                      required
                      value={formData.authors}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Journal *</label>
                    <input
                      type="text"
                      name="journal"
                      required
                      value={formData.journal}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Year *</label>
                    <input
                      type="number"
                      name="year"
                      required
                      value={formData.year}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Citations</label>
                    <input
                      type="number"
                      name="citations"
                      value={formData.citations}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="article">Article</option>
                      <option value="book">Book</option>
                      <option value="conference">Conference</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">DOI</label>
                    <input
                      type="text"
                      name="doi"
                      value={formData.doi}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">PMID</label>
                    <input
                      type="text"
                      name="pmid"
                      value={formData.pmid}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                      name="role"
                      value={formData.role || ''}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">None</option>
                      <option value="first">First Author</option>
                      <option value="co-first">Co-First Author</option>
                      <option value="corresponding">Corresponding Author</option>
                      <option value="co-corresponding">Co-Corresponding Author</option>
                    </select>
                  </div>
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
                    {editingPublication ? 'Update' : 'Add'} Publication
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
                Enter your GitHub Personal Access Token to {patAction === 'delete' ? 'delete' : 'save'} this publication.
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
                    setPatAction(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  onClick={patAction === 'delete' ? handleDeleteConfirm : handlePATSubmit}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Processing...' : (patAction === 'delete' ? 'Delete' : 'Save')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
