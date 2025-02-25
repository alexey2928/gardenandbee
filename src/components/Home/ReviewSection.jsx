import React, { useState } from "react";
import { GoArrowLeft, GoArrowRight, GoArrowUpRight } from "react-icons/go";
import { useSelector } from "react-redux";
import { selectGoogleReviews } from "../../store/googleReviewsSlice";
import { LINK_LEAVE_A_REVIEW } from "../../helpers/links";

const ReviewSection = () => {
  const items = [
    {
      src: "https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/8d44dd27-5fb2-4878-15bb-d681c4ca9700/public",
      title: "Eyelash Extensions",
    },
    {
      src: "https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/f775786a-6e7f-4843-4466-f1b82e09c100/public",
      title: "Brow Shaping",
    },
    {
      src: "https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/ce3cdc7d-fdd5-4db1-f038-3abc4733ce00/public",
      title: "Professional Makeup",
    },
    {
      src: "https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/9fa21546-b424-41d8-e60f-f7e287fe0000/public",
      title: "Rejuvenating Facials",
    },
    {
      src: "https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/6071a5a1-8710-4a97-42ce-6fb6e0147a00/publicContain",
      title: "Customized Experiences",
    },
    {
      src: "https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/fd10484b-e8e4-40c5-5c2a-f7aa4cb81200/public",
      title: "Glowing Skin Treatments",
    },
    {
      src: "https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/fd8ce1e0-ec53-4ef7-fb54-8dbfa1b63e00/publicContain",
      title: "Special Event Makeup",
    },
    {
      src: "https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/84fe34dc-1e57-4461-37ea-145a0a98f100/publicContain",
      title: "Relaxing Spa Treatments",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const googleData = useSelector(selectGoogleReviews);
  const reviews = googleData["reviews"];
  const photos = googleData["photos"];
  console.log("REVIES", reviews);
  console.log("PHOTOS", photos);
  const totalItems = reviews?.length;

  // Function to move the carousel left
  const moveLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(totalItems - 1); // Loop to the last item
    }
  };

  // Function to move the carousel right
  const moveRight = () => {
    if (currentIndex < totalItems - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop to the first item
    }
  };

  return (
    <section className="relative z-10 mt-10">
      <div className="mx-auto max-w-[1570px] sm:px-10 2xl:px-5">
        <div className="rounded-[30px] bg-secondary px-5 pb-[100px] pt-9 sm:rounded-[50px] sm:p-6 lg:px-9 lg:pb-12 lg:pt-14">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:gap-[30px]">
              <div className="flex items-center justify-center gap-[11px] rounded-[60px] border border-white px-5 text-lg font-medium text-white sm:py-1.5 sm:text-base xl:py-2.5 xl:text-lg">
                Our Reviews
              </div>
              <h4 className="text-[30px] font-semibold text-white sm:text-[22px] md:text-[30px]">
                Exceptional Beauty Experiences
              </h4>
            </div>
            <a
              href={LINK_LEAVE_A_REVIEW}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto inline-flex h-[50px] items-center justify-between gap-2.5 rounded-full bg-primary p-[5px] pl-[18px] text-lg font-medium text-white sm:mx-0 border border-primary"
            >
              <span>Leave a Review</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                <GoArrowUpRight size={24} className="text-primary" />
              </span>
            </a>
          </div>
          <div className="mb-10 mt-5 overflow-hidden sm:my-[30px] md:mb-12 md:mt-10">
            <div
              className="flex gap-[15px] transition-transform duration-500 ease-in-out sm:gap-3 lg:gap-4"
              style={{
                transform: `translateX(-${currentIndex * 365}px)`, // Move the carousel items based on the current index
              }}
            >
              {photos &&
                items.map((photo) => (
                  <div className="relative h-[448px] w-[350px] flex-shrink-0">
                    <img
                      src={photo.src}
                      alt={photo.name || "Photo"}
                      className="h-full w-full rounded-[35px] object-cover"
                    />
                    {reviews &&
                      reviews.map((review, index) => (
                        <>
                          <p></p>
                          <div className="absolute bottom-0 left-0 w-full rounded-t-none rounded-b-[35px] bg-[#999999] bg-opacity-30 backdrop-blur-[10px] py-[16px] text-center">
                            {/* absolute bottom-5 left-1/2 mx-auto w-[92%] -translate-x-1/2
                    rounded-[20px] bg-[#999999] bg-opacity-30 p-4
                    backdrop-blur-[5px] 2xl:px-6 2xl:py-[29px] */}
                            <h6
                              key={index}
                              className="text-lg font-medium text-white drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] lg:text-2xl"
                            >
                              {review.authorAttribution.displayName}
                            </h6>
                          </div>
                        </>
                      ))}
                  </div>
                ))}
            </div>

            <div className="mt-3 items-center justify-between gap-5 sm:flex md:mt-5 md:gap-10">
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
              <p className="ml-auto max-w-[760px] text-end text-sm font-normal leading-[22px] text-white md:text-lg md:leading-[30px] mt-2">
                At Garden and Bee Beauty Salon, our commitment is to provide an
                exceptional beauty experience tailored to your unique needs,
                ensuring you look and feel your best in a serene atmosphere.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute left-0 right-0 top-1/2 -z-10 mx-auto h-[103%] w-[95%] max-w-full -translate-y-1/2 rounded-[30px] bg-primary sm:h-[90%] sm:w-full sm:max-w-[590px] sm:rounded-[50px] md:max-w-[750px] lg:max-w-[980px] xl:max-w-[1590px]"></div>
      </div>
    </section>
  );
};

export default ReviewSection;
