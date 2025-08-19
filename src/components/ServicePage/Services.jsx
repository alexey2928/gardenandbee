import React from "react";
import { useSelector } from "react-redux";
import MenuHeader from "../../common/MenuHeader";
import {
  selectServices,
  selectServicesError,
} from "../../store/slices/servicesSlice";
import ServiceCategoryWithImage from "./ServiceCategoryWithImage";
import ServiceCategoryWithoutImage from "./ServiceCategoryWithoutImage";

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

            {serviceCategory.imageUrl ? (
              <ServiceCategoryWithImage serviceCategory={serviceCategory} />
            ) : (
              <ServiceCategoryWithoutImage serviceCategory={serviceCategory} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
