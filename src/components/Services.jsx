import React from "react";

const services = [
  {
    category: "Lash Extensions",
    imageUrl: "/images/lash-extensions.jpg", // Main category image
    services: [
      {
        name: "Classic Lash Set",
        images: [
          "/images/classic-lash1.jpg",
          "/images/classic-lash2.jpg",
          "/images/classic-lash3.jpg",
        ],
        description:
          "A natural-looking lash enhancement for added length and curl.",
        price: "$120",
        duration: "90 min",
        refills: [
          { name: "1 Week Refill", price: "$50", duration: "45 min" },
          { name: "2 Week Refill", price: "$65", duration: "60 min" },
          { name: "3 Week Refill", price: "$80", duration: "75 min" },
        ],
      },
      {
        name: "Hybrid Lash Set",
        images: [
          "/images/hybrid-lash1.jpg",
          "/images/hybrid-lash2.jpg",
          "/images/hybrid-lash3.jpg",
        ],
        description:
          "A mix of classic and volume lashes for a fuller, textured look.",
        price: "$140",
        duration: "100 min",
        refills: [
          { name: "1 Week Refill", price: "$60", duration: "50 min" },
          { name: "2 Week Refill", price: "$75", duration: "65 min" },
          { name: "3 Week Refill", price: "$90", duration: "80 min" },
        ],
      },
      {
        name: "Volume Lash Set",
        images: [
          "/images/volume-lash1.jpg",
          "/images/volume-lash2.jpg",
          "/images/volume-lash3.jpg",
        ],
        description:
          "Multiple lightweight extensions applied per lash for a dramatic effect.",
        price: "$160",
        duration: "120 min",
        refills: [
          { name: "1 Week Refill", price: "$70", duration: "55 min" },
          { name: "2 Week Refill", price: "$85", duration: "70 min" },
          { name: "3 Week Refill", price: "$100", duration: "90 min" },
        ],
      },
    ],
  },
  {
    category: "Lash & Brow Treatments",
    imageUrl: "/images/brow-treatments.jpg", // Main category image
    services: [
      {
        name: "Lash Lift & Tint",
        imageUrl: "/images/lash-lift.jpg",
        description:
          "A semi-permanent treatment that curls and darkens natural lashes.",
        price: "$90",
        duration: "75 min",
      },
      {
        name: "Brow Lamination",
        imageUrl: "/images/brow-lamination.jpg",
        description:
          "Achieve fuller, perfectly shaped brows with a semi-permanent treatment.",
        price: "$85",
        duration: "60 min",
      },
      {
        name: "Brow Shaping",
        imageUrl: "/images/brow-shaping.jpg",
        description:
          "Expertly shaped brows using waxing or threading techniques.",
        price: "$25",
        duration: "20 min",
      },
      {
        name: "Brow Tinting",
        imageUrl: "/images/brow-tinting.jpg",
        description: "Enhance and define your brows with semi-permanent tint.",
        price: "$30",
        duration: "30 min",
      },
    ],
  },
  {
    category: "Facial Treatments",
    imageUrl: "/images/facials.jpg", // Main category image
    services: [
      {
        name: "Express Facial",
        imageUrl: "/images/express-facial.jpg",
        description: "A quick, refreshing facial tailored to your skin type.",
        price: "$50",
        duration: "30 min",
      },
      {
        name: "Hydrating Facial",
        imageUrl: "/images/hydrating-facial.jpg",
        description:
          "Deeply moisturizes and revitalizes dry or dehydrated skin.",
        price: "$85",
        duration: "60 min",
      },
      {
        name: "Anti-Aging Facial",
        imageUrl: "/images/anti-aging-facial.jpg",
        description: "Reduces fine lines and improves skin elasticity.",
        price: "$100",
        duration: "75 min",
      },
      {
        name: "Acne Treatment Facial",
        imageUrl: "/images/acne-facial.jpg",
        description:
          "A deep cleansing facial targeting breakouts and congestion.",
        price: "$95",
        duration: "75 min",
      },
    ],
  },
  {
    category: "Makeup Services",
    imageUrl: "/images/makeup.jpg", // Main category image
    services: [
      {
        name: "Bridal Makeup",
        imageUrl: "/images/bridal-makeup.jpg",
        description: "Flawless, long-lasting bridal makeup for your big day.",
        price: "$200",
        duration: "120 min",
      },
      {
        name: "Special Occasion Makeup",
        imageUrl: "/images/special-occasion-makeup.jpg",
        description: "Expertly applied makeup for any event or celebration.",
        price: "$100",
        duration: "90 min",
      },
      {
        name: "Makeup Lesson",
        imageUrl: "/images/makeup-lesson.jpg",
        description: "Personalized lessons to enhance your makeup skills.",
        price: "$80",
        duration: "75 min",
      },
    ],
  },
];

const Services = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-xl font-semibold text-indigo-600 tracking-wide uppercase">
            Our Services
          </h2>
          <p className="mt-2 text-4xl font-extrabold text-gray-900">
            Enhance Your Natural Beauty
          </p>
        </div>

        <div className="space-y-16">
          {services.map((serviceCategory, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row items-center gap-10"
            >
              {/* Left Side: Image */}
              <div className="lg:w-1/3">
                <img
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                  src={serviceCategory.imageUrl}
                  alt={serviceCategory.category}
                />
              </div>

              {/* Right Side: Services List */}
              <div className="lg:w-2/3">
                <h3 className="text-3xl font-semibold text-gray-900 mb-6">
                  {serviceCategory.category}
                </h3>
                <div className="space-y-6">
                  {serviceCategory.services.map((service, i) => (
                    <div
                      key={i}
                      className="p-5 bg-gray-100 rounded-xl shadow-md"
                    >
                      {/* For Lash Extensions, we display multiple images */}
                      {service.images &&
                        service.images.map((image, index) => (
                          <img
                            key={index}
                            className="w-full h-48 object-cover rounded-md mb-4"
                            src={image}
                            alt={`${service.name} ${index + 1}`}
                          />
                        ))}
                      {!service.images && (
                        <img
                          className="w-full h-48 object-cover rounded-md mb-4"
                          src={service.imageUrl}
                          alt={service.name}
                        />
                      )}
                      <h4 className="text-lg font-medium text-gray-800">
                        {service.name}
                      </h4>
                      <p className="text-gray-600 text-sm mt-1">
                        {service.description}
                      </p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-indigo-600 font-semibold">
                          {service.price}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {service.duration}
                        </span>
                      </div>

                      {/* Refills (If Available) */}
                      {service.refills && (
                        <div className="mt-4">
                          <h5 className="text-md font-medium text-gray-700">
                            Refills:
                          </h5>
                          <ul className="mt-2 space-y-2">
                            {service.refills.map((refill, j) => (
                              <li
                                key={j}
                                className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm"
                              >
                                <span className="text-gray-800">
                                  {refill.name}
                                </span>
                                <div className="text-gray-600 text-sm flex gap-4">
                                  <span>{refill.price}</span>
                                  <span>{refill.duration}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
