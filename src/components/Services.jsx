import React from "react";
import { useSelector } from "react-redux";
import MenuHeader from "../common/MenuHeader";
import {
  selectServices,
  selectServicesError,
} from "../store/slices/servicesSlice";

const ServicesPage = () => {
  const services = useSelector(selectServices);
  const error = useSelector(selectServicesError);

  const categoryOrder = [
    "Lash Extensions",
    "Lash Lifting and Coloring",
    "Brow Services",
    "Facial Treatments",
    "Makeup Services",
    "Hair Removal",
  ];

  const sortedServices = [...services].sort(
    (a, b) =>
      categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
  );

  if (error) {
    return (
      <>
        <MenuHeader name="SERVICES" />
        <h3 className="text-2xl lg:text-4xl text-primary_dark my-4 lg:mt-20 lg:mb-10 text-center h-10 lg:h-12 w-full">
          {error}
        </h3>
      </>
    );
  }

  return (
    <div>
      <MenuHeader name="SERVICES" />
      <div className="overflow-hidden w-full mt-4">
        <ul className="flex w-max gap-4 animate-slide hover:animation-paused">
          {[...categoryOrder, ...categoryOrder, ...categoryOrder].map(
            (service, index) => (
              <li key={index}>
                <div className="flex h-10 items-center justify-center rounded-full border border-primary px-6 text-base font-medium text-primary whitespace-nowrap">
                  {service}
                </div>
              </li>
            )
          )}
        </ul>
      </div>
      <div>
        {sortedServices.map((serviceCategory) => (
          <div key={serviceCategory.id}>
            <div className="sticky top-20 bg-background z-[90]">
              <h3 className="text-2xl lg:text-4xl text-primary_dark mt-4 lg:mt-16 lg:mb-10 text-center w-full">
                {serviceCategory.category}
              </h3>
            </div>

            <div
              key={serviceCategory.category}
              className="flex flex-col lg:flex-row items-center gap-4 lg:gap-10"
            >
              {/* Left Side: Category Image */}

              {serviceCategory.imageUrl && (
                <div className="lg:w-1/3">
                  <img
                    className="w-full h-full max-h-[500px] object-cover rounded-[40px] shadow-lg"
                    src={serviceCategory.imageUrl}
                    alt={serviceCategory.category}
                  />
                </div>
              )}
              {/* Right Side: Service List */}
              <div
                className={`${
                  serviceCategory.imageUrl ? "lg:w-2/3" : "lg:w-full"
                }`}
              >
                <div className="space-y-2 md:space-y-4 lg:space-y-10">
                  {serviceCategory.services.map((service, i) => (
                    <div
                      key={i}
                      className={`flex flex-col lg:flex-row gap-4 bg-white backdrop-blur-[5px] rounded-[40px] shadow-md`}
                    >
                      {service.imageUrl && (
                        <div className="lg:w-1/3">
                          <img
                            className="w-full h-full max-h-[500px] object-cover rounded-[40px]"
                            src={service.imageUrl}
                            alt={service.name}
                          />
                        </div>
                      )}

                      {/* Text Details */}
                      <div
                        className={`${
                          service.imageUrl ? "lg:w-2/3" : "lg:w-full"
                        }`}
                      >
                        <div className="flex justify-between items-end p-4 md:p-6 lg:p-8">
                          <div>
                            <h4 className="text-2xl lg:text-3xl text-primary_dark font-medium">
                              {service.name}
                            </h4>
                            {service.description && (
                              <p className="text-primary text-base mt-1">
                                {service.description}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-4 px-4 text-right w-[30%] md:w-auto">
                            <span className="text-base">{service.price}</span>
                            <span className="text-gray-500 text-base">
                              {service.duration}
                            </span>
                          </div>
                        </div>
                        {service.refills && (
                          <div className="p-4 md:p-6 lg:p-8 w-full">
                            <h5 className="text-lg font-medium text-primary_dark">
                              Refills:
                            </h5>
                            <ul className="mt-2 space-y-2">
                              {service.refills.map((refill, j) => (
                                <li
                                  key={j}
                                  className="flex justify-between items-center bg-secondary o p-3 rounded-lg shadow-sm text-base"
                                >
                                  <span className="text-white">
                                    {refill.name}
                                  </span>
                                  <div className="flex gap-4">
                                    <span className="text-white">
                                      {refill.price}
                                    </span>
                                    <span className="text-white/90">
                                      {refill.duration}
                                    </span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
