import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const ServiceCard = ({ service, className = "" }) => {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`flex flex-col bg-white backdrop-blur-[5px] rounded-[40px] shadow-md w-full ${className}`}
    >
      {/* Image */}
      {service.imageUrl && (
        <div className="w-full h-[320px]">
          <img
            className="w-full h-full object-cover rounded-t-[40px]"
            src={service.imageUrl}
            alt={service.name}
          />
        </div>
      )}

      {/* Content (fills available space) */}
      <div className="flex flex-col flex-1 p-4">
        {/* Top Section (title, desc toggle) */}
        <div className="flex-1">
          <button
            type="button"
            className="flex w-full items-center justify-between"
            onClick={() => setIsOpen(!isOpen)}
          >
            <h4 className="text-2xl lg:text-3xl text-primary_dark font-medium">
              {service.name}
            </h4>
            {service.description && (
              <FaChevronDown
                className={`text-primary_dark transform transition-transform duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            )}
          </button>

          {service.description && isOpen && (
            <p className="text-primary text-base my-2">{service.description}</p>
          )}
        </div>

        {/* Bottom Section (always pinned) */}
        <div className="mt-2">
          {/* Price + Duration */}
          <div className="flex justify-between mt-2">
            <span>{service.price}</span>
            <span className="text-gray-500">{service.duration}</span>
          </div>

          {/* Refills */}
          {service.refills && (
            <div className="mt-2">
              <h5 className="text-lg font-medium text-primary_dark">
                Refills:
              </h5>
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
      </div>
    </div>
  );
};

const ServiceCategoryWithImage = ({ serviceCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
      {serviceCategory.services.map((service, i) => (
        <ServiceCard
          key={i}
          service={service}
          className="flex-1 min-w-[250px] max-w-[420px]"
        />
      ))}
    </div>
  );
};

export default ServiceCategoryWithImage;
