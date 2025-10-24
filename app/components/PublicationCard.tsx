import { Publication } from '../../../data/publications';

interface PublicationCardProps {
  publication: Publication;
}

export default function PublicationCard({ publication }: PublicationCardProps) {
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
      className="block bg-white rounded-xl shadow-lg hover:shadow-xl hover-lift transition-all duration-300 p-6 border border-gray-200 cursor-pointer group"
    >
      {/* Year and Citations Badge */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {publication.year}
          </span>
          <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: '#ba0d2f', color: 'white' }}>
            {publication.citations} citations
          </span>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-osu-scarlet transition-colors duration-300">
          {publication.title}
        </h3>
      </div>
      
      <div className="space-y-3">
        <p className="text-gray-700">
          <span className="font-semibold" style={{ color: '#ba0d2f' }}>Authors:</span> {publication.authors}
        </p>
        
        <p className="text-gray-600">
          <span className="font-semibold" style={{ color: '#ba0d2f' }}>Journal:</span> {publication.journal}
        </p>
        
        <div className="flex flex-wrap items-center gap-4 text-sm pt-3 border-t border-gray-100">
          {publication.doi && (
            <a 
              href={`https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-osu-scarlet hover:text-osu-scarlet/80 transition-colors duration-300 font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              DOI: {publication.doi}
            </a>
          )}
          
          {publication.pmid && (
            <a 
              href={`https://pubmed.ncbi.nlm.nih.gov/${publication.pmid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-osu-scarlet-light hover:text-osu-scarlet-light/80 transition-colors duration-300 font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              PubMed
            </a>
          )}
        </div>
      </div>
    </a>
  );
}
