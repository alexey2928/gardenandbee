import React from "react";
import { PHONE_NUMBER } from "../../helpers/links";
import { MdPhone } from "react-icons/md";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";

const Section1 = () => {
  return (
    <section className="relative m-0 overflow-hidden bg-background bg-cover bg-center bg-no-repeat pt-4 lg:pt-0 lg:rounded-[35px]">
      <div className="absolute left-2.5 top-[90px] flex hidden h-[209px] w-[209px] items-center justify-center rounded-full bg-secondary bg-opacity-10 xl:top-[232px] xl:block"></div>
      <div className="absolute right-[22vw] top-[-75px] hidden h-[730px] w-[230px] rotate-[-18.74deg] bg-secondary opacity-[0.03] xl:top-[-102px] xl:block xl:h-[1276px] xl:w-[326px]"></div>
      <span className="absolute left-[15%] top-[10%] flex h-[270px] w-[270px] items-center justify-center rounded-full bg-secondary opacity-30 blur-[80px] sm:left-[32%] sm:h-[315px] sm:w-[315px] lg:top-[25%]"></span>
      <div className="ml-auto pl-0 lg:pl-[calc(41vw_-_405px)] xl:pl-[calc(41vw_-_505px)] 2xl:pl-[calc(41vw_-_605px)]">
        <div className="flex flex-col items-center lg:flex-row">
          <div className="relative w-full px-5 text-center lg:w-[40%] lg:p-0 lg:pr-6 lg:text-left">
            <h1 className="mb-5 mt-2.5 text-center text-4xl font-semibold leading-[42px] text-black sm:mb-2.5 sm:leading-[52px] lg:text-left lg:text-5xl xl:mb-5 xl:mt-[18px] xl:text-[60px] xl:leading-[85px]">
              <span>Transform Your </span>
              <span className="text-primary">Beauty Routine</span>
              <span> with Garden and Bee</span>
            </h1>
            <p className="mb-10 max-w-full text-center text-lg font-normal leading-[30px] text-black sm:mb-5 lg:max-w-[400px] lg:text-left lg:text-sm lg:leading-5 xl:mb-9 xl:max-w-[620px] xl:leading-[30px] 2xl:text-lg">
              Experience tailored beauty services at Garden and Bee Beauty
              Salon, where each treatment is customized to your needs. Indulge
              in eyelash extensions, brow shaping, professional makeup, and
              rejuvenating facials—all designed to enhance your natural beauty
              in a serene environment.
            </p>
            <a
              href={PHONE_NUMBER}
              className="mx-auto inline-flex h-[60px] items-center justify-center rounded-full bg-primary pl-5 pr-2.5 text-lg font-medium sm:mx-0 text-white"
            >
              <span>
                <MdPhone size={24} className="" />
              </span>
              <span className="ml-2 mr-[18px] block">Call to Book Now</span>
            </a>
          </div>
          <div className="w-full lg:w-[60%]">
            <div className="relative mt-4">
              <img
                src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/37d15e5f-6f06-4860-321b-73571b40fc00/public"
                className="w-full object-cover lg:h-[800px] rounded-[35px]"
                alt=""
                data-landingsite-gallery-type="image"
                data-seo-image=""
                data-media='{"id":"1124229429","src":"iStock","type":"image"}'
              />
              <div className="absolute bottom-[2%] right-10 hidden lg:block">
                <div className="mb-5 ml-auto max-w-[350px] rounded-[20px] border border-white border-opacity-50 bg-[#A0A0A0] bg-opacity-30 p-4 backdrop-blur-[2.5px] xl:max-w-[420px] xl:pb-4 xl:pl-5 xl:pr-8 xl:pt-4">
                  <h4 className="text-2xl font-medium text-[#FFFFFF]">
                    Explore Our Services
                  </h4>
                  <p className="text-base font-normal leading-5 text-[#FFFFFF] xl:text-lg xl:leading-[30px]">
                    From eyelash extensions to rejuvenating facials, our range
                    of services is designed to help you look and feel your best.
                    Discover how we can fulfill your unique beauty needs.
                  </p>
                  <div className="mt-2.5 flex items-center justify-end xl:mt-5">
                    <Link
                      to="/services"
                      className="flex h-[50px] items-center justify-center gap-2.5 rounded-full bg-primary text-white text-base font-medium  xl:gap-[18px] xl:text-lg"
                    >
                      <span className="whitespace-nowrap pl-4">
                        View All Services
                      </span>
                      <span className="mr-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-white">
                        <GoArrowUpRight size={24} className="text-primary" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
