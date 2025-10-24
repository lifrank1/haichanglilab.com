'use client';

import { useState, useMemo } from 'react';
import { publications, Publication } from '../../data/publications';
import PublicationCard from '../components/PublicationCard';

export default function Publications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'year' | 'citations'>('year');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredAndSortedPublications = useMemo(() => {
    let filtered = publications.filter(publication =>
      publication.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      publication.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      publication.journal.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'year') {
        comparison = a.year - b.year;
      } else if (sortBy === 'citations') {
        comparison = a.citations - b.citations;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [searchTerm, sortBy, sortOrder]);

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-subtle-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Publications</h1>
            <div className="w-24 h-1 bg-osu-scarlet mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our research contributions in cell membrane repair, cancer biology, 
              regenerative medicine, and therapeutic protein development.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Controls */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search publications by title, author, or journal..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-osu-scarlet focus:border-osu-scarlet transition-all duration-300"
              />
            </div>
            
            {/* Sort Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'year' | 'citations')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-osu-scarlet focus:border-osu-scarlet transition-all duration-300"
              >
                <option value="year">Sort by Year</option>
                <option value="citations">Sort by Citations</option>
              </select>
              
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-osu-scarlet focus:border-osu-scarlet transition-all duration-300"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
          
          {/* Results count */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredAndSortedPublications.length} of {publications.length} publications
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-sm text-osu-scarlet hover:text-osu-scarlet/80 transition-colors duration-300"
              >
                Clear search
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Publications List */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredAndSortedPublications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No publications found matching your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredAndSortedPublications.map((publication) => (
                <PublicationCard key={publication.id} publication={publication} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Research Impact Summary */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Research Impact</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">3,096</div>
              <div className="text-sm text-gray-600">Total Citations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">30</div>
              <div className="text-sm text-gray-600">H-Index</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">41</div>
              <div className="text-sm text-gray-600">i10-Index</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">48+</div>
              <div className="text-sm text-gray-600">Publications</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
