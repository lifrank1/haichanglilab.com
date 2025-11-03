export default function ContactSuccess() {
  return (
    <div className="bg-white">
      <section className="bg-subtle-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Message sent</h1>
            <div className="w-24 h-1 mx-auto" style={{ backgroundColor: '#ba0d2f' }}></div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <p className="text-lg text-gray-700 mb-6">
              Thank you for reaching out. Well get back to you shortly.
            </p>
            <div className="space-x-4">
              <a
                href="/contact"
                className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-colors"
              >
                Back to Contact
              </a>
              <a
                href="/"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition-colors"
              >
                Home
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


