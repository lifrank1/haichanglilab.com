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


  const getArticleUrl = () => {
    if (publication.doi) {
      return `https://doi.org/${publication.doi}`;
    } else if (publication.pmid) {
      return `https://pubmed.ncbi.nlm.nih.gov/${publication.pmid}`;
    }
    return null;
  };

  const articleUrl = getArticleUrl();

  return (
    <a 
      href={articleUrl || '#'}
      target={articleUrl ? "_blank" : undefined}
      rel={articleUrl ? "noopener noreferrer" : undefined}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg hover-lift transition-all duration-300 p-6 border border-gray-100 cursor-pointer"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 leading-tight">
          {publication.title}
        </h3>
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
              DOI: {publication.doi}
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
    </a>
  );
}
