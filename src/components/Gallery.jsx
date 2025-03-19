import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MenuHeader from "../common/MenuHeader";
import { SECONDARY_BUTTON } from "../common/styles";
import { useSelector } from "react-redux";
import {
  selectGallery,
  selectGalleryError,
} from "../store/slices/gallerySlice";

const shuffleArray = (array) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
const Gallery = () => {
  const images = useSelector(selectGallery);
  const error = useSelector(selectGalleryError);

  const [visibleCount, setVisibleCount] = useState(8);
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    setShuffledImages(shuffleArray(images));
  }, [images]);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };
  if (error) {
    return (
      <>
        <MenuHeader name="GALLERY" />
        <h3 className="text-2xl lg:text-4xl text-primary_dark my-4 lg:mt-20 lg:mb-10 text-center h-10 lg:h-12 w-full">
          {error}
        </h3>
      </>
    );
  }

  return (
    <div>
      <MenuHeader name="GALLERY" />
      {/* Carousel */}
      <div className="max-w-5xl mx-auto py-10">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="w-full h-[500px]"
        >
          {shuffledImages.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </SwiperSlide>
          ))}
          {/* Custom arrows */}
          <div
            className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 text-primary cursor-pointer text-4xl z-10 
rounded-full w-[55px] h-[55px] flex items-center justify-center 
border border-primary bg-secondary opacity-40 leading-none"
          >
            <MdArrowBackIosNew
              className="w-8 h-8"
              viewBox="0 0 24 24"
              stroke="text-primary"
            />
          </div>
          <div
            className="custom-next absolute right-4 top-1/2 -translate-y-1/2 text-primary cursor-pointer text-4xl z-10 
rounded-full w-[55px] h-[55px] flex items-center justify-center 
border border-primary bg-secondary opacity-40 leading-none"
          >
            <MdArrowForwardIos
              className="w-8 h-8"
              viewBox="0 0 24 24"
              stroke="text-primary"
            />
          </div>
        </Swiper>
      </div>

      {/* Image Grid */}

      <div className="p-4">
        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {shuffledImages.slice(0, visibleCount).map((src, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-lg">
              <img
                src={src}
                alt={`Gallery ${index + 1}`}
                className="w-full h-72 object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {visibleCount < shuffledImages.length && (
          <div className="flex justify-center mt-6">
            <button onClick={handleShowMore} className={SECONDARY_BUTTON}>
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
