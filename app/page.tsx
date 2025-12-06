import Image from "next/image";
import researchProjectsData from "../data/researchProjects.json";
import { ResearchProject } from "../data/types";

// Type assertion to ensure proper typing
const researchProjects: ResearchProject[] = researchProjectsData as ResearchProject[];

interface ResearchProjectCardProps {
  project: ResearchProject;
}

function ResearchProjectCard({ project }: ResearchProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'upcoming': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl hover-lift transition-all duration-300 p-8 border border-gray-200 group h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold group-hover:text-osu-scarlet transition-colors duration-300" style={{ color: '#ba0d2f' }}>
          {project.title}
        </h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </div>
      
      <p className="text-gray-700 leading-relaxed mb-4">
        {project.description}
      </p>
      
      {project.keyFindings && project.keyFindings.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2" style={{ color: '#ba0d2f' }}>Key Findings:</h4>
          <ul className="list-disc list-inside space-y-1">
            {project.keyFindings.map((finding, index) => (
              <li key={index} className="text-gray-600 text-sm">{finding}</li>
            ))}
          </ul>
        </div>
      )}
      
      {project.funding && (
        <div className="pt-4 border-t-2 border-gray-300 mt-auto">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Funding:</span> {project.funding}
          </p>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-white">
      {/* Research Overview */}
      <section className="py-20 bg-subtle-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-osu-scarlet mb-4">Research Overview</h1>
            <div className="w-24 h-1 bg-osu-scarlet mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Our laboratory focuses on advancing regenerative medicine through cutting-edge research in cell membrane repair mechanisms, 
              cancer biology, and therapeutic protein development. We bridge the gap between basic molecular science and clinical applications, 
              with the ultimate goal of developing novel therapeutic strategies for treating various diseases and injuries.
            </p>
            
            <div className="bg-white border-l-4 border-osu-scarlet p-6 shadow-sm hover-lift transition-all duration-300">
              <p className="text-lg font-medium text-gray-900 italic">
                "Advancing regenerative medicine through research in cell membrane repair, 
                cancer biology, and therapeutic protein development."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-osu-scarlet mb-4">Research Projects</h2>
            <div className="w-24 h-1 bg-osu-scarlet mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchProjects.map((project, index) => (
              <div key={project.id} className="animate-fade-in-up h-full" style={{ animationDelay: `${index * 0.1}s` }}>
                <ResearchProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-osu-scarlet mb-4">Research Impact</h2>
            <div className="w-24 h-1 bg-osu-scarlet mx-auto"></div>
          </div>
          
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center bg-white rounded-xl p-8 shadow-lg hover:shadow-xl hover-lift transition-all duration-300 border border-gray-200 animate-scale-in">
                  <div className="text-4xl font-bold mb-2 animate-subtle-pulse" style={{ color: '#ba0d2f' }}>3,096</div>
                  <div className="text-lg text-gray-700 font-medium">Total Citations</div>
                </div>
                
                <div className="text-center bg-white rounded-xl p-8 shadow-lg hover:shadow-xl hover-lift transition-all duration-300 border border-gray-200 animate-scale-in" style={{ animationDelay: '0.1s' }}>
                  <div className="text-4xl font-bold mb-2 animate-subtle-pulse" style={{ color: '#ba0d2f' }}>30</div>
                  <div className="text-lg text-gray-700 font-medium">H-Index</div>
                </div>
                
                <div className="text-center bg-white rounded-xl p-8 shadow-lg hover:shadow-xl hover-lift transition-all duration-300 border border-gray-200 animate-scale-in" style={{ animationDelay: '0.2s' }}>
                  <div className="text-4xl font-bold mb-2 animate-subtle-pulse" style={{ color: '#ba0d2f' }}>48+</div>
                  <div className="text-lg text-gray-700 font-medium">Publications</div>
                </div>
              </div>
        </div>
      </section>
    </div>
  );
}
