import React, { useState } from "react";
import { GoArrowLeft, GoArrowRight, GoArrowUpRight } from "react-icons/go";
import { LINK_BOOK_NOW } from "../../common/links";

const ServiceCard = ({ imageSrc, title, description, buttonText, link }) => {
  return (
    <div className="w-full rounded-[25px] border border-primary border-opacity-80 bg-white p-2.5 pb-[25px] h-[620px] md:h-auto md:w-[320px] md:rounded-[40px] md:pb-9 xl:w-[450px] xl:p-[15px] 2xl:w-[580px]">
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-[270px] sm:h-[300px] md:h-[400px] object-cover rounded-t-[20px] sm:rounded-t-[30px]"
      />
      <div className="text-center sm:pl-2.5 sm:pr-2.5 sm:text-left xl:pl-4">
        <h2 className="mb-1 mt-3.5 text-[25px] font-medium leading-10 text-black sm:mb-3 sm:mt-6 sm:text-3xl xl:text-[40px] xl:leading-[52px]">
          {title}
        </h2>
        <p className="mb-5 text-base font-normal leading-[30px] text-black 2xl:text-lg">
          {description}
        </p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-[60px] items-center justify-center gap-3 rounded-full bg-primary pl-8 pr-2.5 text-lg font-medium text-white"
        >
          {buttonText}
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
            <GoArrowUpRight size={24} className="text-primary" />
          </span>
        </a>
      </div>
    </div>
  );
};

const ServiceSection = () => {
  const services = [
    {
      imageSrc:
        "https://firebasestorage.googleapis.com/v0/b/garden-and-bee.firebasestorage.app/o/lash_extensions1_home.JPG?alt=media&token=4fe72dde-54fc-4431-b678-61056e458f6f",
      title: "Eyelash Extensions",
      description:
        "Enhance your natural beauty with our premium eyelash extensions. Our expert application adds volume, length, and definition to your lashes for a dramatic yet natural look, perfect for any occasion.",
      buttonText: "Book Lash Extensions",
      link: LINK_BOOK_NOW,
    },
    {
      imageSrc:
        "https://firebasestorage.googleapis.com/v0/b/garden-and-bee.firebasestorage.app/o/brow_services_homeJPG.JPG?alt=media&token=f74247f5-59ad-44d4-b1fd-ee69f944b38c",
      title: "Eyebrow Services",
      description:
        "Shape, define, and maintain your brows with our comprehensive eyebrow services. Whether it's waxing, threading, or tinting, we tailor each treatment to accentuate your features and achieve a perfectly polished look.",
      buttonText: "Book Eyebrow Services",
      link: LINK_BOOK_NOW,
    },
    {
      imageSrc:
        "https://firebasestorage.googleapis.com/v0/b/garden-and-bee.firebasestorage.app/o/makeup_home.jpg?alt=media&token=bacd46d8-6c8b-47fa-9225-106ebb242761",
      title: "Makeup",
      description:
        "From glamorous evening looks to natural daytime makeup, our artists tailor every application to your needs. Whether for a special event or daily wear, we ensure you feel confident and stunning.",
      buttonText: "Book Makeup Services",
      link: LINK_BOOK_NOW,
    },
    {
      imageSrc:
        "https://firebasestorage.googleapis.com/v0/b/garden-and-bee.firebasestorage.app/o/facials_home.JPG?alt=media&token=e6359641-835b-4933-950b-5ee5b8f1a835",
      title: "Facials",
      description:
        "Our facials are designed to rejuvenate and refresh your skin. From deep cleansing to hydrating treatments, each facial is customized to address your skin's unique needs, leaving it radiant and glowing.",
      buttonText: "Book Facials",
      link: LINK_BOOK_NOW,
    },
  ];
  const lineServices = [
    "Lash Extensions",
    "Lash Lifting and Coloring",
    "Brow Services",
    "Facial Treatments",
    "Makeup Services",
    "Hair Removal",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const moveLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(services.length - 1); // Loop to the last item
    }
  };

  const moveRight = () => {
    if (currentIndex < services.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop to the first item
    }
  };

  return (
    <section className="relative z-10 mt-10">
      <div className="overflow-hidden w-full my-4">
        <ul className="flex w-max gap-4 animate-slide hover:animation-paused">
          {[...lineServices, ...lineServices, ...lineServices].map(
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
      {/* Title & Buttons */}
      <div className="rounded-[30px] bg-secondary px-5 pb-[100px] pt-9 md:hidden">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:gap-[30px]">
            <div className="flex items-center justify-center gap-[11px] rounded-[60px] border border-white px-5 text-lg font-medium text-white sm:py-1.5 sm:text-base">
              Our Services
            </div>
            <h4 className="text-[30px] font-semibold text-white sm:text-[22px]">
              Exceptional Beauty Experiences
            </h4>
          </div>
          <a
            href="/services"
            className="absolute bottom-10 left-1/2 inline-flex h-[50px] -translate-x-1/2 items-center justify-center gap-3 rounded-[60px] bg-primary p-[5px] pl-6 text-lg font-medium text-white sm:static sm:translate-x-0 min-w-[240px]"
          >
            View All Services
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <GoArrowUpRight size={24} className="text-primary" />
            </span>
          </a>
        </div>

        {/* Carousel Logic for Small Screens */}
        <div className="mb-10 mt-5 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`, // Move the carousel items based on the current index
            }}
          >
            {services.map((service, index) => (
              <div className="relative w-full flex-shrink-0" key={index}>
                <ServiceCard
                  imageSrc={service.imageSrc}
                  title={service.title}
                  description={service.description}
                  buttonText={service.buttonText}
                  link={service.link}
                />
              </div>
            ))}
          </div>

          {/* Arrows for Mobile */}
          <div className="mt-3 flex items-center justify-center gap-5">
            <ul className="flex items-center gap-5">
              <li>
                <button
                  type="button"
                  className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-white"
                  onClick={moveLeft}
                >
                  <GoArrowLeft size={24} className="text-white" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-primary bg-white"
                  onClick={moveRight}
                >
                  <GoArrowRight size={24} className="text-primary" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Grid Layout for Larger Screens */}

      <div className="hidden overflow-scroll md:grid">
        <div className="grid md:grid-cols-4 w-full md:w-[1310px]  xl:w-[1850px] 2xl:w-[2380px] md:my-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              imageSrc={service.imageSrc}
              title={service.title}
              description={service.description}
              buttonText={service.buttonText}
              link={service.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
