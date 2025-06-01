// components/Features.jsx
export default function Features() {
  const features = [
    "Zero Commission Selling",
    "Secure Messaging System",
    "Verified User Profiles",
    "Fast Payments",
  ];

  return (
    <section className="py-16 bg-white px-6 text-center">
      <h2 className="text-3xl font-semibold mb-10 text-gray-800">Why Use Our Platform?</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, i) => (
          <div key={i} className="p-6 border rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-medium text-gray-700">{feature}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
