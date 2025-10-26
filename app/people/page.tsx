import Image from "next/image";
import { people, Person } from "../../data/people";

interface PersonCardProps {
  person: Person;
}

function PersonCard({ person }: PersonCardProps) {
  return (
    <div className="rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
      <div className="lg:flex">
        <div className="lg:w-2/5 p-8 animate-fade-in-left">
          <div className="relative mb-6 flex justify-center">
            <Image
              src={person.image}
              alt={person.name}
              width={400}
              height={400}
              className="w-72 h-72 rounded-full object-cover border-4 border-gray-200 shadow-lg"
            />
          </div>
          
          {/* Contact Information */}
          <div className="rounded-lg p-6">
            <h4 className="text-lg font-bold mb-4" style={{ color: '#ba0d2f' }}>Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ba0d2f' }}></div>
                <p className="text-gray-700 font-medium">{person.email}</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ba0d2f' }}></div>
                <p className="text-gray-700 font-medium">{person.phone}</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ba0d2f' }}></div>
                <p className="text-gray-700 font-medium">{person.address}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-3/5 p-8 animate-fade-in-right">
          <h3 className="text-3xl font-bold text-gray-900 mb-3">{person.name}</h3>
          <p className="text-xl font-semibold mb-4" style={{ color: '#ba0d2f' }}>{person.title}</p>
          <p className="text-gray-600 mb-6">
            {person.affiliation}
          </p>
          
          <div className="mb-6">
            <h4 className="text-xl font-bold mb-3" style={{ color: '#ba0d2f' }}>Research Focus</h4>
            <div className="rounded-lg p-4 border-l-4" style={{ borderLeftColor: '#ba0d2f' }}>
              <p className="text-gray-700 leading-relaxed">
                {person.researchFocus}
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-xl font-bold mb-3" style={{ color: '#ba0d2f' }}>Education</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {person.education.map((degree, index) => (
                <div key={index} className="p-3 rounded-lg hover:shadow-md transition-all duration-200">
                  <p className="text-gray-700 font-medium text-sm">{degree}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function People() {
  const principalInvestigators = people.filter(person => person.isPrincipalInvestigator);
  const teamMembers = people.filter(person => !person.isPrincipalInvestigator);

  return (
    <div>
      {/* Principal Investigator */}
      {principalInvestigators.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-3xl font-bold text-gray-900">Principal Investigator</h2>
              <div className="w-24 h-1 mx-auto mt-4" style={{ backgroundColor: '#ba0d2f' }}></div>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {principalInvestigators.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Research Team */}
      {teamMembers.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Research Team</h2>
              <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: '#ba0d2f' }}></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((person) => (
                <div key={person.id} className="animate-fade-in-up">
                  <PersonCard person={person} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Join Our Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Team</h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: '#ba0d2f' }}></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We are always looking for talented researchers to join our team. 
              If you are interested in our research areas, please contact Dr. Li.
            </p>
          </div>
          
          {/* Placeholder for future team members */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 animate-scale-in">
              <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center animate-subtle-pulse" style={{ backgroundColor: '#ba0d2f' }}>
                <span className="text-white text-3xl font-bold">+</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Join Our Team</h3>
              <p className="text-gray-600">
                We welcome graduate students, postdocs, and research associates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lab Gallery Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Lab Gallery</h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: '#ba0d2f' }}></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A glimpse into our research environment and team activities.
            </p>
          </div>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="animate-fade-in-up">
              <Image
                src="/teampics/lab.jpeg"
                alt="Lab Environment"
                width={400}
                height={300}
                className="w-full h-64 object-cover rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift"
              />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <Image
                src="/teampics/labcoats.jpeg"
                alt="Team in Lab Coats"
                width={400}
                height={300}
                className="w-full h-64 object-cover rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift"
              />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Image
                src="/teampics/pelotonia.jpeg"
                alt="Pelotonia Event"
                width={400}
                height={300}
                className="w-full h-64 object-cover rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}