import React from "react";
import { useState } from "react";
import { LINK_LEAVE_A_REVIEW } from "../../common/links";
import { GoArrowLeft, GoArrowRight, GoArrowUpRight } from "react-icons/go";
import { useSelector } from "react-redux";
import {
  selectReviews,
  selectReviewsError,
} from "../../store/slices/reviewsSlice";
import { FaUserCircle } from "react-icons/fa";

const ReviewSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviews = useSelector(selectReviews);
  const error = useSelector(selectReviewsError);

  // Calculate the new index for navigation
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  if (error) {
    <section className="relative mt-10 overflow-hidden">
      <div className="flex flex-col items-center lg:flex-row ">
        <div className="relative w-full px-5 text-center sm:px-0 lg:w-[40%] ">
          <h2 className="mx-auto mb-4 lg:mb-10 text-[35px] font-medium leading-[43px] text-black sm:mx-0 sm:mb-4 sm:max-w-full sm:text-3xl sm:leading-9 xl:mb-6 xl:mt-5 xl:text-4xl xl:leading-[48px] 2xl:text-[45px] 2xl:leading-[60px]">
            <span>See What Our Clients Say About </span>
            <span className="text-primary">Garden and Bee.</span>
          </h2>
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 xl:flex-nowrap">
            <div className="w-fit">
              <p className="text-center text-base font-normal leading-[30px] text-black lg:text-left 2xl:text-lg">
                Our clients love the personalized care and beauty expertise at
                Garden and Bee! Read their experiences and share your own. Your
                feedback helps us continue delivering exceptional beauty
                services tailored just for you.
              </p>
              <div className="my-6 flex items-center justify-center">
                <a
                  href={LINK_LEAVE_A_REVIEW}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-[60px] items-center justify-center gap-3 rounded-full bg-primary pl-8 pr-2.5 text-lg font-medium text-white"
                >
                  Leave a Review
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                    <GoArrowUpRight size={24} className="text-primary" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-2xl lg:text-4xl text-primary_dark my-4 lg:mt-20 lg:mb-10 text-center h-10 lg:h-12 w-full">
          {error}
        </h3>
      </div>
    </section>;
  }

  return (
    <section className="relative mt-10 overflow-hidden">
      <div className="flex flex-col items-center lg:flex-row ">
        <div className="relative w-full px-5 text-center sm:px-0 lg:w-[40%] ">
          <h2 className="mx-auto mb-4 lg:mb-10 text-[35px] font-medium leading-[43px] text-black sm:mx-0 sm:mb-4 sm:max-w-full sm:text-3xl sm:leading-9 xl:mb-6 xl:mt-5 xl:text-4xl xl:leading-[48px] 2xl:text-[45px] 2xl:leading-[60px]">
            <span>See What Our Clients Say About </span>
            <span className="text-primary">Garden and Bee.</span>
          </h2>
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 xl:flex-nowrap">
            <div className="w-fit">
              <p className="text-center text-base font-normal leading-[30px] text-black lg:text-left 2xl:text-lg">
                Our clients love the personalized care and beauty expertise at
                Garden and Bee! Read their experiences and share your own. Your
                feedback helps us continue delivering exceptional beauty
                services tailored just for you.
              </p>
              <div className="my-6 flex items-center justify-center">
                <a
                  href={LINK_LEAVE_A_REVIEW}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-[60px] items-center justify-center gap-3 rounded-full bg-primary pl-8 pr-2.5 text-lg font-medium text-white"
                >
                  Leave a Review
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                    <GoArrowUpRight size={24} className="text-primary" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[60%]">
          <div className="relative">
            <div className="overflow-hidden rounded-[30px] bg-primary text-white sm:rounded-[35px]">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {reviews.map((item, index) => (
                  <div
                    key={index}
                    className="relative w-full flex flex-shrink-0 flex-row lg:flex-col gap-4 px-5 pr-5 pt-5 sm:flex-row sm:p-5 sm:pr-[30px] 2xl:gap-[35px]"
                  >
                    <div className="w-full flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="w-full">
                          <img
                            src={item.imageUrl ? item.imageUrl : ""}
                            alt={item.author}
                            className={`w-24 h-24 lg:w-[320px] lg:h-[320px] rounded-full lg:rounded-[25px]  object-cover ${
                              !item.imageUrl ? "hidden" : ""
                            }`}
                          />

                          {!item.imageUrl && (
                            <div className="flex w-24 h-24 lg:w-[320px] lg:h-[320px]  items-center justify-center rounded-[25px] bg-background">
                              <FaUserCircle
                                size={120}
                                className="text-primary_dark"
                              />
                            </div>
                          )}
                        </div>
                        <div className="w-full flex flex-col items-end justify-end">
                          <h2 className="text-[24px] lg:text-[34px] font-medium leading-10 sm:text-2xl sm:leading-8 xl:text-[30px] xl:leading-9 2xl:text-[33px] 2xl:leading-10 text-end">
                            {item.author}
                          </h2>
                          <div className="flex gap-1 text-xl ">
                            {Array.from({ length: item.rating }, (_, i) => (
                              <span key={i}>⭐</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="h-80 overflow-y-auto lg:h-auto">
                        <p className="text-lg font-normal leading-[30px] sm:my-3 sm:text-sm sm:leading-[26px] xl:my-5 xl:text-base 2xl:text-lg 2xl:leading-[30px] text-white">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end px-8">
                <h6 className="text-2xl font-medium leading-[30px] text-white">
                  <span>{currentIndex + 1}</span>
                  <span>/</span>
                  <span className="text-[15px] font-normal opacity-50">
                    {reviews.length}
                  </span>
                </h6>
              </div>
              <div className="flex w-full items-center justify-center gap-5 mb-4">
                <ul className="flex items-center justify-center gap-5">
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

            {/* Carousel Navigation */}
          </div>
        </div>
      </div>

      <div className="absolute left-[68px] top-0 hidden sm:block">
        <img
          src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/a1c6e264-b883-47da-7a61-401552d62a00/publicContain"
          alt=""
        />
      </div>
    </section>
  );
};

export default ReviewSection;
