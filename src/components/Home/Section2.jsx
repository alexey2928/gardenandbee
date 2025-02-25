import React from "react";
import { useState } from "react";
import { LINK_BOOK_NOW } from "../../helpers/links";
import {
  GoArrowLeft,
  GoArrowRight,
  GoArrowUpRight,
  GoPlus,
} from "react-icons/go";
import { FaWandMagicSparkles } from "react-icons/fa6";

const Section2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of items to control how many items you have in the carousel
  const carouselItems = [
    {
      imgSrc:
        "https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/303e8f90-f9ea-46e4-7eaa-3956df130d00/public",
      title: "Elevate Your Beauty Experience",
      description:
        "Experience specialized beauty services at Garden and Bee Beauty Salon, where every treatment is tailored to your individual needs in a serene environment.",
    },
    {
      imgSrc:
        "https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/4ceff797-1c5f-49c8-a04a-2f8e8f2cf100/public",
      title: "Enhance Your Natural Beauty",
      description:
        "Enjoy the transformative power of our eyelash extensions and expert brow shaping for a polished look that enhances your features.",
    },
  ];

  // Calculate the new index for navigation
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + carouselItems.length) % carouselItems.length
    );
  };

  return (
    <section className="relative mt-10 overflow-hidden">
      <div className="mx-auto max-w-[2400px] sm:px-5 lg:px-10 2xl:px-5">
        <ul className="hidden lg:flex mb-10 w-[1350px]  items-center gap-2.5 pl-5 sm:w-auto sm:pl-0 lg:gap-4">
          <li>
            <div className="flex h-10 items-center justify-center rounded-full border border-primary px-[25px] text-base font-medium text-primary sm:px-2.5 md:px-5 lg:h-[50px] lg:px-6 xl:px-11 xl:text-lg">
              Eyelash Extensions
            </div>
          </li>
          <li>
            <div className="flex h-10 items-center justify-center rounded-full border border-primary px-[25px] text-base font-medium text-primary sm:px-2.5 md:px-5 lg:h-[50px] lg:px-6 xl:px-11 xl:text-lg">
              Brow Shaping
            </div>
          </li>
          <li>
            <div className="flex h-10 items-center justify-center rounded-full border border-primary px-[25px] text-base font-medium text-primary sm:px-2.5 md:px-5 lg:h-[50px] lg:px-6 xl:px-11 xl:text-lg">
              Professional Makeup
            </div>
          </li>
          <li>
            <div className="flex h-10 items-center justify-center rounded-full border border-primary px-[25px] text-base font-medium text-primary sm:px-2.5 md:px-5 lg:h-[50px] lg:px-6 xl:px-11 xl:text-lg">
              Rejuvenating Facials
            </div>
          </li>
          <li>
            <div className="flex h-10 items-center justify-center rounded-full border border-primary px-[25px] text-base font-medium text-primary sm:px-2.5 md:px-5 lg:h-[50px] lg:px-6 xl:px-11 xl:text-lg">
              Personalized Care
            </div>
          </li>
        </ul>
        <div className="flex flex-col items-center gap-[50px] lg:flex-row 2xl:gap-[70px]">
          <div className="w-full lg:w-[59%]">
            <div className="relative">
              <div className="overflow-hidden rounded-[30px] bg-secondary sm:rounded-[35px]">
                <div
                  className="flex items-center transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {carouselItems.map((item, index) => (
                    <div
                      key={index}
                      className="relative flex w-full flex-shrink-0 flex-col items-center gap-4 px-5 pb-[35px] pr-5 pt-5 sm:flex-row sm:p-5 sm:pr-[30px] 2xl:gap-[35px]"
                    >
                      <div className="w-full sm:w-1/2 2xl:w-[58%]">
                        <img
                          src={item.imgSrc}
                          alt={item.title}
                          className="h-[500px] w-full rounded-[25px] object-cover"
                        />
                      </div>
                      <div className="w-full pb-32 sm:w-1/2 2xl:w-[42%] text-white">
                        <h2 className="text-[34px] font-medium leading-10 sm:text-2xl sm:leading-8 xl:text-[30px] xl:leading-9 2xl:text-[33px] 2xl:leading-10">
                          {item.title}
                        </h2>
                        <p className="my-5 text-lg font-normal leading-[30px] sm:my-3 sm:text-sm sm:leading-[26px] xl:my-5 xl:text-base 2xl:text-lg 2xl:leading-[30px]">
                          {item.description}
                        </p>
                        <a
                          href={LINK_BOOK_NOW}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mx-auto inline-flex h-[50px] items-center justify-between gap-2.5 rounded-full bg-white p-[5px] pl-[18px] text-lg font-medium text-primary sm:mx-0 border border-primary"
                        >
                          <span> Schedule Your Appointment</span>
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                            <GoArrowUpRight size={24} className="text-white" />
                          </span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Navigation */}
              <div className="absolute bottom-[30px] right-0 mt-9 flex w-full items-center justify-between px-[30px] sm:mt-5 md:right-[30px] md:w-[45vw] md:pl-[18px] md:pr-0 lg:w-[24vw] 2xl:bottom-[60px] 2xl:mt-10 2xl:w-[18vw] 2xl:max-w-[300px]">
                <h6 className="text-2xl font-medium leading-[30px] text-white">
                  <span>{currentIndex + 1}</span>
                  <span>/</span>
                  <span className="text-[15px] font-normal opacity-50">
                    {carouselItems.length}
                  </span>
                </h6>
                <ul className="flex items-center gap-5">
                  <li>
                    <button
                      className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-white"
                      onClick={prevSlide}
                    >
                      <GoArrowLeft size={24} className="text-white" />
                    </button>
                  </li>
                  <li>
                    <button
                      className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-primary bg-white"
                      onClick={nextSlide}
                    >
                      <GoArrowRight size={24} className="text-primary" />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="relative w-full px-5 text-center sm:px-0 lg:w-[41%] lg:text-left">
            <h2 class="mx-auto mb-10 max-w-[319px] text-[35px] font-medium leading-[43px] text-black sm:mx-0 sm:mb-4 sm:max-w-full sm:text-3xl sm:leading-9 lg:max-w-[410px] xl:mb-6 xl:mt-5 xl:text-4xl xl:leading-[48px] 2xl:text-[45px] 2xl:leading-[60px]">
              <span>Transform Your Beauty Routine with </span>
              <span class="text-primary">Garden and Bee.</span>
            </h2>
            <div class="flex flex-wrap items-center gap-3 sm:gap-6 xl:flex-nowrap">
              <div class="order-1 w-full text-center sm:order-2 xl:order-1 xl:w-1/2">
                <div class="relative inline-block w-full sm:w-auto">
                  <img
                    src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/1769857a-0aa2-4fd1-6bf6-bf324e56c300/public"
                    alt=""
                    class="w-full rounded-[25px] sm:w-auto"
                    data-landingsite-gallery-type="image"
                    data-media='{"id":"687244776","src":"iStock","type":"image"}'
                  />
                  <div class="absolute -top-6 left-1/2 flex h-[60px] w-[60px] -translate-x-1/2 -translate-y-0 items-center justify-center rounded-full bg-primary sm:-left-8 sm:top-1/2 sm:-translate-x-0 sm:-translate-y-[50%]">
                    <GoPlus size={24} className="text-white" />
                  </div>
                </div>
              </div>
              <div class="order-2 w-fit sm:order-1 xl:order-2 xl:w-1/2">
                <FaWandMagicSparkles className="text-primary absolute left-5 top-0 text-3xl leading-5 sm:static sm:mb-4" />
                <p class="text-center text-base font-normal leading-[30px] text-black lg:text-left 2xl:text-lg">
                  Enjoy a personalized beauty experience at Garden and Bee,
                  where our commitment to excellence meets your unique beauty
                  needs. Let our expert services redefine your beauty routine
                  and enhance your confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute right-[68px] top-0 hidden sm:block">
        <img
          src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/a1c6e264-b883-47da-7a61-401552d62a00/publicContain"
          alt=""
        />
      </div>
    </section>
  );
};

export default Section2;
