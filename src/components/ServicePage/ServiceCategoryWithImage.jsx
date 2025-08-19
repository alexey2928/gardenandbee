import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const ServiceCategoryWithImage = ({ serviceCategory }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-10">
      {/* Left Side: Category Image */}
      <div className="flex-1 min-w-[250px] max-w-[420px] h-[320px]">
        <img
          className="w-full h-full object-cover rounded-[40px] shadow-lg"
          src={serviceCategory.imageUrl}
          alt={serviceCategory.category}
        />
      </div>

      {/* Right Side: Services */}
      <div className="w-full lg:w-2/3">
        <div className="flex flex-col gap-6">
          {serviceCategory.services.map((service, i) => (
            <ServiceItem key={i} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Separated ServiceItem with toggle logic
const ServiceItem = ({ service }) => {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    // Run on mount
    handleResize();

    // Listen for resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col gap-4 bg-white backdrop-blur-[5px] rounded-[40px] shadow-md p-4">
      {service.imageUrl && (
        <div className="w-full h-[200px]">
          <img
            className="w-full h-full object-cover rounded-[40px]"
            src={service.imageUrl}
            alt={service.name}
          />
        </div>
      )}

      <div>
        <button
          type="button"
          className="flex w-full items-center justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h4 className="text-xl lg:text-2xl text-primary_dark font-medium">
            {service.name}
          </h4>
          {service.description && (
            <FaChevronDown
              className={`text-primary_dark transform transition-transform duration-300 ml-4 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          )}
        </button>

        {/* Description toggle */}
        {service.description && isOpen && (
          <p className="text-primary text-base mt-1">{service.description}</p>
        )}

        <div className="flex justify-between mt-2">
          <span>{service.price}</span>
          <span className="text-gray-500">{service.duration}</span>
        </div>
      </div>

      {service.refills && (
        <div>
          <h5 className="text-lg font-medium text-primary_dark">Refills:</h5>
          <ul className="mt-2 space-y-2">
            {service.refills.map((refill, j) => (
              <li
                key={j}
                className="flex justify-between items-center bg-secondary p-2 rounded-lg shadow-sm text-base"
              >
                <span className="text-white">{refill.name}</span>
                <div className="flex gap-4">
                  <span className="text-white">{refill.price}</span>
                  <span className="text-white/90">{refill.duration}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ServiceCategoryWithImage;
