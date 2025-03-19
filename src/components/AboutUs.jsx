import React, { useState } from "react";
import MenuHeader from "../common/MenuHeader";
import { useSelector } from "react-redux";
import {
  selectTeamMembers,
  selectTeamMembersError,
} from "../store/slices/teamSlice";

const TeamMember = ({ teamMember }) => {
  const [isExpanded, setIsExpanded] = useState(
    window.innerWidth < 768 ? false : true
  );

  const bioContent = isExpanded ? teamMember.bio : teamMember.bio.slice(0, 215);

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 my-6 lg:my-10">
      {/* Left Side: Team Member Image */}
      <div className="lg:w-1/3">
        <img
          className="w-full h-96 object-cover rounded-[40px] shadow-lg"
          src={teamMember.imageUrl}
          alt={teamMember.name}
        />
      </div>

      {/* Right Side: Team Member Details */}
      <div className="lg:w-2/3 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl lg:text-3xl text-primary_dark font-medium">
            {teamMember.name}
          </h3>
          <p className="text-primary text-base">{teamMember.position}</p>

          {/* Bio Text */}
          <p className="text-base lg:text-xl my-6">
            {bioContent}
            {/* Only show "Read More" button on mobile if bio is truncated */}
            {window.innerWidth < 768 && teamMember.bio.length > 215 && (
              <>
                <br />
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-secondary text-base font-medium"
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </button>
              </>
            )}
          </p>
        </div>
        <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
          <a
            href={teamMember.bookNow}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-auto inline-flex h-[60px] min-w-[150px] lg:min-w-[180px] items-center justify-center rounded-full bg-primary text-lg font-medium sm:mx-0"
          >
            <span>Book with {teamMember.name}</span>
          </a>
          <a
            href={teamMember.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent text-primary border border-primary mx-auto inline-flex h-[60px] min-w-[150px] lg:min-w-[180px] items-center justify-center rounded-full bg-primary text-lg font-medium sm:mx-0"
          >
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

const AboutSalon = () => {
  return (
    <div className="flex flex-col lg:flex-row-reverse gap-4 lg:gap-10 my-10">
      {/* Right Side: Salon Image */}
      <div className="lg:w-1/2">
        <img
          className="w-full h-96 lg:h-full object-cover rounded-[40px] shadow-lg"
          src="https://firebasestorage.googleapis.com/v0/b/garden-and-bee.firebasestorage.app/o/about_us.jpg?alt=media&token=5b4f16ff-efca-460f-bf85-152bad7888c1"
          alt="Garden and Bee Salon"
        />
      </div>

      {/* Left Side: About Text */}
      <div className="relative lg:w-1/2 flex flex-col justify-center">
        <div className="absolute hidden  left-2.5 top-[90px] lg:flex h-[209px] w-[209px] items-center justify-center rounded-full bg-primary_dark bg-opacity-10 xl:top-[232px] xl:block"></div>
        <span className="absolute left-[15%] top-[10%] flex h-[270px] w-[270px] items-center justify-center rounded-full bg-primary opacity-30 blur-[80px] sm:left-[32%] sm:h-[315px] sm:w-[315px] lg:top-[25%]"></span>
        <h2 className="text-center text-[35px] font-medium leading-normal text-black sm:text-4xl sm:leading-[78px] lg:text-[60px]">
          Welcome to <span className="text-primary">Garden and Bee</span>
        </h2>
        <p className="text-base lg:text-xl mt-4 leading-relaxed">
          At Garden and Bee, we believe beauty is a deeply personal journey. Our
          salon is a haven where artistry meets relaxation, providing expert
          services in lashes, brows, facials, and more. Whether you're looking
          for a rejuvenating facial or the perfect set of lashes, we ensure a
          tailored experience that enhances your natural beauty.
        </p>
      </div>
    </div>
  );
};

const AboutUs = () => {
  const teamMembers = useSelector(selectTeamMembers);
  const error = useSelector(selectTeamMembersError);

  if (error) {
    return (
      <>
        <MenuHeader name="ABOUT US" />
        <AboutSalon />
        <h3 className="text-2xl lg:text-4xl text-primary_dark my-4 lg:mt-20 lg:mb-10 text-center h-10 lg:h-12 w-full">
          {error}
        </h3>
      </>
    );
  }

  return (
    <div>
      <MenuHeader name="ABOUT US" />
      <AboutSalon />
      <div className="sticky top-20 bg-background py-0.5 lg:py-0 z-[90]">
        <h3 className="text-2xl lg:text-4xl underline underline-offset-8 text-primary_dark lg:my-20 text-center h-10 w-full">
          Meet Our Team
        </h3>
      </div>
      {teamMembers.map((teamMember, index) => (
        <div key={index}>
          <TeamMember teamMember={teamMember} />
          <hr className="border-t-2 border-secondary w-2/3 mx-auto" />
        </div>
      ))}
    </div>
  );
};

export default AboutUs;
