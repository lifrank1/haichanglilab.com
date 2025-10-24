import { Publication } from '../../../data/publications';

interface PublicationCardProps {
  publication: Publication;
}

export default function PublicationCard({ publication }: PublicationCardProps) {
  const getRoleBadge = (role?: string) => {
    if (!role) return null;
    
    const roleStyles = {
      'first': 'bg-osu-scarlet/10 text-osu-scarlet border-osu-scarlet/20',
      'corresponding': 'bg-osu-scarlet-light/10 text-osu-scarlet-light border-osu-scarlet-light/20',
      'co-first': 'bg-osu-accent/10 text-osu-accent border-osu-accent/20',
      'co-corresponding': 'bg-osu-scarlet-dark/10 text-osu-scarlet-dark border-osu-scarlet-dark/20'
    };
    
    const roleLabels = {
      'first': 'First Author',
      'corresponding': 'Corresponding Author',
      'co-first': 'Co-First Author',
      'co-corresponding': 'Co-Corresponding Author'
    };
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${roleStyles[role as keyof typeof roleStyles]}`}>
        {roleLabels[role as keyof typeof roleLabels]}
      </span>
    );
  };

  const getJournalIcon = (journal: string) => {
    if (journal.toLowerCase().includes('nature')) return '🌿';
    if (journal.toLowerCase().includes('science')) return '🔬';
    if (journal.toLowerCase().includes('cell')) return '🧬';
    if (journal.toLowerCase().includes('journal')) return '📰';
    return '📄';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg hover-lift transition-all duration-300 p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-osu-scarlet rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm">{getJournalIcon(publication.journal)}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 leading-tight">
            {publication.title}
          </h3>
        </div>
        {getRoleBadge(publication.role)}
      </div>
      
      <div className="space-y-3">
        <p className="text-gray-700">
          <span className="font-medium text-osu-scarlet">Authors:</span> {publication.authors}
        </p>
        
        <p className="text-gray-600">
          <span className="font-medium text-osu-scarlet-light">Journal:</span> {publication.journal}
        </p>
        
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-osu-scarlet">Year:</span>
            <span className="text-gray-600">{publication.year}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="font-medium text-osu-scarlet-light">Citations:</span>
            <span className="text-gray-600 font-semibold">{publication.citations}</span>
          </div>
          
          {publication.doi && (
            <a 
              href={`https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-osu-scarlet hover:text-osu-scarlet/80 transition-colors duration-300"
            >
              DOI
            </a>
          )}
          
          {publication.pmid && (
            <a 
              href={`https://pubmed.ncbi.nlm.nih.gov/${publication.pmid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-osu-scarlet-light hover:text-osu-scarlet-light/80 transition-colors duration-300"
            >
              PubMed
            </a>
          )}
        </div>
      </div>
      
      {/* Citation impact indicator */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">Impact:</span>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < Math.min(5, Math.floor(publication.citations / 100))
                      ? 'bg-osu-scarlet'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
          <span className="text-xs text-gray-500">
            {publication.citations > 100 ? 'High Impact' : publication.citations > 50 ? 'Medium Impact' : 'Emerging'}
          </span>
        </div>
      </div>
    </div>
  );
}
