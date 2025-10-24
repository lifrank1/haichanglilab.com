export default function Contact() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-subtle-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact</h1>
            <div className="w-24 h-1 mx-auto" style={{ backgroundColor: '#ba0d2f' }}></div>
          </div>
        </div>
      </section>

      {/* Simple Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Phone Contact */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#ba0d2f' }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-500 mb-2">CALL US</h3>
              <a 
                href="tel:+16142475703" 
                className="text-2xl font-bold underline transition-colors duration-300"
                style={{ color: '#ba0d2f' }}
              >
                614-247-5703
              </a>
            </div>

            {/* Email Contact */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#ba0d2f' }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-500 mb-2">EMAIL US</h3>
              <a 
                href="mailto:li.3714@osu.edu" 
                className="text-2xl font-bold underline transition-colors duration-300"
                style={{ color: '#ba0d2f' }}
              >
                li.3714@osu.edu
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
