export default function BeautySalonVideoSection() {
  return (
    <section className="relative mt-10 overflow-hidden py-4 sm:py-5 md:py-12 xl:py-[95px]">
      <div>
        <video
          className="absolute top-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src={`${process.env.PUBLIC_URL}/images/video.mp4`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="flex items-center justify-center">
          <div className="relative z-10 bg-black max-w-[290px] sm:max-w-[1170px] bg-opacity-40 rounded-[40px] px-5 py-5 backdrop-blur-[5px] sm:py-10 xl:px-0 xl:pb-[90px] xl:pt-[90px] text-center">
            <h2 className="mb-4 text-[35px] font-semibold leading-[60px] text-white sm:text-5xl xl:text-[60px] xl:leading-[78px]">
              Discover Your Unique Beauty Journey
            </h2>
            <p className="mx-auto max-w-[837px] text-lg font-medium leading-[30px] text-white sm:leading-6 md:text-xl lg:leading-[30px]">
              Garden and Bee Beauty Salon is where you can elevate your beauty
              experience. Our services, from eyelash extensions to rejuvenating
              facials, are meticulously tailored to highlight your features in a
              serene, individualized setting.
            </p>
            <div className="mx-auto mt-9 max-w-[290px] sm:max-w-[1170px]">
              <div className="flex flex-wrap items-center justify-center sm:flex-nowrap">
                {[
                  { number: 500, text: "Eyelash Extensions Applied" },
                  { number: 2000, text: "Beautiful Brows Shaped" },
                  { number: 250, text: "Makeovers Completed" },
                  { number: 150, text: "Happy Clients Acknowledged" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="w-1/2 sm:w-auto px-4 lg:px-[50px] text-white text-center"
                  >
                    <h2 className="text-[28px] font-medium sm:mb-4 sm:text-3xl lg:text-[44px] xl:text-[60px]">
                      {item.number}
                    </h2>
                    <p className="text-xs font-normal sm:text-[15px] lg:text-lg xl:text-[22px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
