import Image from "next/image";

export default function People() {
  return (
    <div className="bg-white">
      {/* Principal Investigator */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Principal Investigator</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <Image
                    src="/headshot.png"
                    alt="Dr. Haichang Li"
                    width={400}
                    height={400}
                    className="w-full h-80 object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Dr. Haichang Li</h3>
                  <p className="text-lg text-red-600 mb-4">Assistant Professor</p>
                  <p className="text-gray-600 mb-6">
                    The Ohio State University College of Veterinary Medicine
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Research Focus</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Dr. Li's research focuses on cell membrane repair mechanisms, particularly the MG53 protein, 
                      and its applications in regenerative medicine, cancer biology, and therapeutic protein development. 
                      His work spans from basic molecular mechanisms to translational applications, with significant 
                      contributions to understanding tissue repair, wound healing, and tumor suppression.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Education</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• PhD, Molecular Biology and Genetics, Gifu University, Japan</li>
                      <li>• MS, Physiology and Biochemistry, Beijing Agricultural University, China</li>
                      <li>• BA, Veterinary Science, Henan Agricultural University, China</li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Selected Awards & Honors</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Butler-Williams Scholars of NIH/NIA, 2020</li>
                      <li>• Lockwood Early Faculty Career Development Award, OSU, 2015</li>
                      <li>• Early Career Award for Spinal Cord Research, 2009</li>
                      <li>• Core Research for Evolutionary Science and Technology Fellow, Japan, 2001</li>
                      <li>• Rotary Yoneyama Memorial Foundation Scholarship, Japan, 1999</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Professional Services</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Associate Editor, Frontiers in Pharmacology</li>
                      <li>• Section Editor, Recent Patents on Anti-Cancer Drug Discovery</li>
                      <li>• Topic Editor, Frontiers in Oncology/Pharmacology</li>
                      <li>• Reviewer Editor, Frontiers in Oncology/Pharmacology/Physiology</li>
                    </ul>
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
            <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We are always looking for talented researchers to join our team. 
              If you are interested in our research areas, please contact Dr. Li.
            </p>
          </div>
          
          {/* Placeholder for future team members */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-2xl">+</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Join Our Team</h3>
              <p className="text-gray-600 text-sm">
                We welcome graduate students, postdocs, and research associates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
