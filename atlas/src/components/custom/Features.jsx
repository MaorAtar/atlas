import React from 'react';

function Features() {
  const features = [
    {
      icon: '/homepage-icons/globe.png',
      title: 'Global Destinations',
      description: 'Explore curated trips to destinations all over the world.',
    },
    {
      icon: '/homepage-icons/voltage.png',
      title: 'AI-Powered Itineraries',
      description: 'Quickly generate travel plans tailored to your preferences.',
    },
    {
      icon: '/homepage-icons/money.png',
      title: 'Budget-Friendly',
      description: 'Stay within your budget while experiencing the best.',
    },
  ];

  return (
    <div className="py-20 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-20">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="mb-4">
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-32 h-32 mx-auto"
              />
            </div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="mt-3 text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;