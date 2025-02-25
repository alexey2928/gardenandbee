import React from "react";
import { FaInstagram } from "react-icons/fa";
import { LINK_INSTAGRAM } from "../../helpers/links";

const InstagramSection = () => {
  return (
    <section className="overflow-hidden mt-10">
      <h2 className="mb-4 text-center text-[35px] font-semibold leading-[52px] text-black sm:mb-10 sm:text-5xl xl:text-[60px] xl:leading-[78px]">
        Enhance Your Beauty with Us
      </h2>
      <div className="relative left-[97%] flex w-[2170px] -translate-x-1/2 gap-3.5 sm:left-1/2 sm:w-[1290px] sm:gap-5 lg:static lg:-translate-x-0 xl:w-[1600px] 2xl:w-[2200px]">
        <div className="relative w-[350px]">
          <img
            src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/84fe34dc-1e57-4461-37ea-145a0a98f100/publicContain"
            className="aspect-square rounded-[35px] object-cover"
            alt=""
            data-landingsite-gallery-type="image"
            data-media='{"id":"2162548565","src":"iStock","type":"image"}'
          />
        </div>
        <div className="relative w-[350px]">
          <img
            src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/303e8f90-f9ea-46e4-7eaa-3956df130d00/public"
            className="aspect-square rounded-[35px] object-cover"
            alt=""
            data-landingsite-gallery-type="image"
            data-media='{"id":"1296431297","src":"iStock","type":"image"}'
          />
        </div>
        <div className="relative w-[350px]">
          <img
            src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/4ceff797-1c5f-49c8-a04a-2f8e8f2cf100/public"
            className="aspect-square rounded-[35px] object-cover"
            alt=""
            data-landingsite-gallery-type="image"
            data-media='{"id":"1314528208","src":"iStock","type":"image"}'
          />
          <a
            href={LINK_INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <div className="absolute left-1/2 top-1/2 flex h-[154px] w-[154px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-3 rounded-full bg-primary bg-opacity-40 text-center backdrop-blur-[5px] sm:h-[125px] sm:w-[125px] xl:h-[154px] xl:w-[154px]">
              <FaInstagram size={24} className="text-white" />
              <h6 className="text-base font-medium text-white sm:text-sm xl:text-base">
                Follow Us for Beauty Inspiration
              </h6>
            </div>
          </a>
        </div>
        <div className="relative w-[350px]">
          <img
            src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/1769857a-0aa2-4fd1-6bf6-bf324e56c300/public"
            className="aspect-square rounded-[35px] object-cover"
            alt=""
            data-landingsite-gallery-type="image"
            data-media='{"id":"687244776","src":"iStock","type":"image"}'
          />
        </div>
        <div className="relative w-[350px]">
          <img
            src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/31b50671-eaf4-4429-e4d8-827f19885f00/public"
            className="aspect-square rounded-[35px] object-cover"
            alt=""
            data-landingsite-gallery-type="image"
            data-media='{"id":"1161219638","src":"iStock","type":"image"}'
          />
        </div>
        <div className="relative w-[350px]">
          <img
            src={`${process.env.PUBLIC_URL}/images/liliya.jpeg`}
            className="aspect-square rounded-[35px] object-cover"
            alt=""
            data-landingsite-gallery-type="image"
            data-media='{"id":"1241597350","src":"iStock","type":"image"}'
          />
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
