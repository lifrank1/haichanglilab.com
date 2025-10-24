import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
          <section className="bg-subtle-gradient py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="animate-fade-in-left">
              <h1 className="text-4xl md:text-5xl font-bold text-osu-scarlet mb-6">
                Dr. Haichang Li
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                Assistant Professor
              </p>
              <p className="text-lg text-gray-600 mb-8">
                The Ohio State University College of Veterinary Medicine
              </p>
              
              {/* Impact Statement */}
              <div className="bg-white border-l-4 border-osu-scarlet p-6 mb-8 shadow-sm hover-lift transition-all duration-300">
                <p className="text-lg font-medium text-gray-900 italic">
                  "Advancing regenerative medicine through research in cell membrane repair, 
                  cancer biology, and therapeutic protein development."
                </p>
              </div>
            </div>
            
                <div className="flex justify-center animate-fade-in-right">
                  <div className="relative">
                    <Image
                      src="/headshot.png"
                      alt="Dr. Haichang Li"
                      width={400}
                      height={400}
                      className="rounded-lg shadow-lg hover-lift transition-all duration-300 animate-gentle-float"
                      priority
                    />
                  </div>
                </div>
          </div>
        </div>
      </section>

      {/* Research Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-osu-scarlet mb-4">Research Overview</h2>
            <div className="w-24 h-1 bg-osu-scarlet mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl hover-lift transition-all duration-300 p-8 border border-gray-200 group animate-fade-in-up">
              <div className="mb-6">
                <h3 className="text-xl font-bold group-hover:text-osu-scarlet transition-colors duration-300" style={{ color: '#ba0d2f' }}>
                  Cell Membrane Repair & MG53 Protein
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Dr. Li's research focuses on the MG53 protein, a key component in cell membrane repair mechanisms. 
                His work has demonstrated how MG53 can protect against acute kidney injury, promote wound healing, 
                and enhance tissue regeneration. This research has significant implications for treating various 
                diseases including diabetes, cardiovascular disease, and acute lung injury.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl hover-lift transition-all duration-300 p-8 border border-gray-200 group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="mb-6">
                <h3 className="text-xl font-bold group-hover:text-osu-scarlet transition-colors duration-300" style={{ color: '#ba0d2f' }}>
                  Cancer Biology & Tumor Suppressors
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                His laboratory investigates tumor suppressors in lung cancer and other solid tumors, with particular 
                focus on drug resistance mechanisms. Dr. Li's work on MG53 has shown its role in suppressing tumor 
                progression and stress granule formation in non-small cell lung cancer, opening new therapeutic 
                avenues for cancer treatment.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl hover-lift transition-all duration-300 p-8 border border-gray-200 group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="mb-6">
                <h3 className="text-xl font-bold group-hover:text-osu-scarlet transition-colors duration-300" style={{ color: '#ba0d2f' }}>
                  Regenerative Medicine & Wound Healing
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                The lab develops innovative approaches to tissue repair and regeneration, including bioinspired 
                hydrogels for controlled drug release and sustained delivery systems for therapeutic proteins. 
                These technologies show promise for treating chronic wounds, particularly in diabetic patients, 
                and promoting hair follicle development.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl hover-lift transition-all duration-300 p-8 border border-gray-200 group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="mb-6">
                <h3 className="text-xl font-bold group-hover:text-osu-scarlet transition-colors duration-300" style={{ color: '#ba0d2f' }}>
                  Translational Medicine
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Dr. Li's research bridges basic science and clinical applications, with several therapeutic 
                proteins and delivery systems moving toward clinical translation. His work on recombinant 
                human MG53 protein has shown protective effects against influenza virus infection and various 
                forms of tissue injury, demonstrating the translational potential of his research.
              </p>
            </div>
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
