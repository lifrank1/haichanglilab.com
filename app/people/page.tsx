import Image from "next/image";

export default function People() {
  return (
    <div className="bg-white">
      {/* Principal Investigator */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold text-gray-900">Principal Investigator</h2>
            <div className="w-24 h-1 mx-auto mt-4" style={{ backgroundColor: '#ba0d2f' }}></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="lg:flex">
                <div className="lg:w-2/5 p-8">
                  <div className="relative mb-6">
                    <Image
                      src="/headshot.png"
                      alt="Dr. Haichang Li"
                      width={400}
                      height={400}
                      className="w-full h-72 object-cover object-top rounded-lg border-4 border-gray-200 shadow-lg"
                    />
                  </div>
                  
                  {/* Contact Information */}
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h4 className="text-lg font-bold mb-4" style={{ color: '#ba0d2f' }}>Contact Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ba0d2f' }}></div>
                        <p className="text-gray-700 font-medium">li.3714@osu.edu</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ba0d2f' }}></div>
                        <p className="text-gray-700 font-medium">614-247-5703</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-3/5 p-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">Dr. Haichang Li</h3>
                  <p className="text-xl font-semibold mb-4" style={{ color: '#ba0d2f' }}>Assistant Professor</p>
                  <p className="text-gray-600 mb-6">
                    The Ohio State University College of Veterinary Medicine
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-xl font-bold mb-3" style={{ color: '#ba0d2f' }}>Research Focus</h4>
                    <div className="bg-gray-50 rounded-lg p-4 border-l-4" style={{ borderLeftColor: '#ba0d2f' }}>
                      <p className="text-gray-700 leading-relaxed">
                        Dr. Li's research focuses on cell membrane repair mechanisms, particularly the MG53 protein, 
                        and its applications in regenerative medicine, cancer biology, and therapeutic protein development. 
                        His work spans from basic molecular mechanisms to translational applications, with significant 
                        contributions to understanding tissue repair, wound healing, and tumor suppression.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-xl font-bold mb-3" style={{ color: '#ba0d2f' }}>Education</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200">
                        <p className="text-gray-700 font-medium text-sm">PhD, Molecular Biology and Genetics, Gifu University, Japan</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200">
                        <p className="text-gray-700 font-medium text-sm">MS, Physiology and Biochemistry, Beijing Agricultural University, China</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200">
                        <p className="text-gray-700 font-medium text-sm">BA, Veterinary Science, Henan Agricultural University, China</p>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Team Members Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Research Team</h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: '#ba0d2f' }}></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We are always looking for talented researchers to join our team. 
              If you are interested in our research areas, please contact Dr. Li.
            </p>
          </div>
          
          {/* Placeholder for future team members */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#ba0d2f' }}>
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
    </div>
  );
}
