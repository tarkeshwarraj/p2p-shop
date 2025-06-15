// app/components/HowItWorks.jsx (or wherever your components live)

export default function HowItWorks() {
  const steps = [
    "1. Register & Verify Account",
    "2. Post Product or Browse Listings",
    "3. Chat with Buyer/Seller",
    "4. Complete Transaction Securely",
  ];

  return (
    <section className="py-10 bg-gray-100 px-6 text-center">
      <h2 className="text-3xl font-semibold mb-10 text-gray-800">How It Works</h2>

      {/* Embedded Short Video */}
      <div className="max-w-3xl mx-auto ">
        <div className="aspect-video mb-6 rounded-xl overflow-hidden shadow-lg">
          {/* <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your video URL
            title="How It Works Video"
            frameBorder="0"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe> */}
        </div>
      </div>

      {/* Steps Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {steps.map((step, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-700 font-medium">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
