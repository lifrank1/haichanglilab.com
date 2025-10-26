'use client';

import { useState, useEffect } from 'react';
import { Person } from '../../../data/types';
import { updateFile, validatePAT } from '../../../lib/github';

export default function PeopleAdmin() {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [showPATModal, setShowPATModal] = useState(false);
  const [pat, setPat] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<Person>>({
    name: '',
    title: '',
    affiliation: '',
    image: '',
    researchFocus: '',
    education: [''],
    email: '',
    phone: '',
    address: '',
    isPrincipalInvestigator: false,
  });

  // Load people data
  useEffect(() => {
    const loadPeople = async () => {
      try {
        // Import the JSON data directly like the main pages do
        const peopleData = await import('../../../data/people.json');
        setPeople(peopleData.default as Person[]);
      } catch (error) {
        console.error('Error loading people:', error);
        setMessage({ type: 'error', text: 'Failed to load people' });
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleEducationChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education?.map((edu, i) => i === index ? value : edu) || ['']
    }));
  };

  const addEducationField = () => {
    setFormData(prev => ({
      ...prev,
      education: [...(prev.education || []), '']
    }));
  };

  const removeEducationField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education?.filter((_, i) => i !== index) || ['']
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For now, we'll just set the filename. In a real implementation,
      // you'd upload the file to a server or cloud storage
      const fileName = `/peopleheadshots/${file.name}`;
      setFormData(prev => ({ ...prev, image: fileName }));
    }
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

      // Generate ID if new person
      const newPerson: Person = {
        ...formData as Person,
        id: editingPerson?.id || generateId(formData.name || ''),
        education: formData.education?.filter(edu => edu.trim() !== '') || [],
      };

      // Update people array
      let updatedPeople: Person[];
      if (editingPerson) {
        updatedPeople = people.map(p => 
          p.id === editingPerson.id ? newPerson : p
        );
      } else {
        updatedPeople = [...people, newPerson];
      }

      // Create JSON content
      const jsonContent = JSON.stringify(updatedPeople, null, 2);

      // Update file via GitHub API
      const result = await updateFile(
        pat,
        'data/people.json',
        jsonContent,
        editingPerson 
          ? `Update person: ${newPerson.name}`
          : `Add person: ${newPerson.name}`
      );

      if (result.success) {
        setPeople(updatedPeople);
        setMessage({ type: 'success', text: 'Person saved successfully!' });
        resetForm();
        setShowPATModal(false);
        setPat('');
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      console.error('Error saving person:', error);
      setMessage({ type: 'error', text: 'Failed to save person' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (person: Person) => {
    setEditingPerson(person);
    setFormData({
      ...person,
      education: person.education.length > 0 ? person.education : ['']
    });
    setShowForm(true);
  };

  const handleDelete = async (person: Person) => {
    if (!confirm(`Are you sure you want to delete "${person.name}"?`)) {
      return;
    }

    setShowPATModal(true);
    setEditingPerson(person);
  };

  const handleDeleteConfirm = async () => {
    if (!editingPerson) return;

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

      // Remove person from array
      const updatedPeople = people.filter(p => p.id !== editingPerson.id);

      // Create JSON content
      const jsonContent = JSON.stringify(updatedPeople, null, 2);

      // Update file via GitHub API
      const result = await updateFile(
        pat,
        'data/people.json',
        jsonContent,
        `Delete person: ${editingPerson.name}`
      );

      if (result.success) {
        setPeople(updatedPeople);
        setMessage({ type: 'success', text: 'Person deleted successfully!' });
        setShowPATModal(false);
        setPat('');
        setEditingPerson(null);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      console.error('Error deleting person:', error);
      setMessage({ type: 'error', text: 'Failed to delete person' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      affiliation: '',
      image: '',
      researchFocus: '',
      education: [''],
      email: '',
      phone: '',
      address: '',
      isPrincipalInvestigator: false,
    });
    setEditingPerson(null);
    setShowForm(false);
  };

  const generateId = (name: string): string => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading people...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">People</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          Add Person
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

      {/* People List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Affiliation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                PI
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {people.map((person) => (
              <tr key={person.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={person.image}
                        alt={person.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/headshots/headshot0.png';
                        }}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{person.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {person.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                  {person.affiliation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {person.isPrincipalInvestigator ? 'Yes' : 'No'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleEdit(person)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(person)}
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
          <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingPerson ? 'Edit Person' : 'Add Person'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  
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
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Affiliation *</label>
                    <input
                      type="text"
                      name="affiliation"
                      required
                      value={formData.affiliation}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Image Path</label>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="/peopleheadshots/filename.jpg"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isPrincipalInvestigator"
                      checked={formData.isPrincipalInvestigator}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      Principal Investigator
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Research Focus *</label>
                  <textarea
                    name="researchFocus"
                    required
                    rows={3}
                    value={formData.researchFocus}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Education</label>
                  {formData.education?.map((edu, index) => (
                    <div key={index} className="flex items-center space-x-2 mt-2">
                      <input
                        type="text"
                        value={edu}
                        onChange={(e) => handleEducationChange(index, e.target.value)}
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
                        placeholder="Degree, Institution, Year"
                      />
                      {formData.education && formData.education.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeEducationField(index)}
                          className="px-3 py-2 text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addEducationField}
                    className="mt-2 px-3 py-1 text-sm text-red-600 hover:text-red-800 border border-red-300 rounded-md hover:bg-red-50"
                  >
                    Add Education
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
                    {editingPerson ? 'Update' : 'Add'} Person
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
                Enter your GitHub Personal Access Token to {editingPerson ? 'delete' : 'save'} this person.
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
                    setEditingPerson(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  onClick={editingPerson ? handleDeleteConfirm : handlePATSubmit}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Processing...' : (editingPerson ? 'Delete' : 'Save')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
