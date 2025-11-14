import Navlink from "../common/Navlink";
import MainFooter from "./Main/MainFooter";

const HamburgerMenu = ({ isOpen, handleHamburgerClick, isFooter, height }) => {
  return (
    <div
      className={
        isOpen
          ? "sticky top-60 w-full bg-background text-primary_dark z-[90] overflow-hidden flex flex-col items-center justify-between"
          : "hidden"
      }
      style={{ height: height }}
    >
      <div className="flex flex-col items-center h-full text-xl text-primary_dark gap-6">
        <span onClick={handleHamburgerClick} className="mt-6">
          <Navlink url="home" name="HOME" />
        </span>
        <span onClick={handleHamburgerClick}>
          <Navlink url="services" name="SERVICES" />
        </span>
        <span onClick={handleHamburgerClick}>
          <Navlink url="gallery" name="GALLERY" />
        </span>
        <span onClick={handleHamburgerClick}>
          <Navlink url="forms" name="FORMS" />
        </span>
        <span onClick={handleHamburgerClick}>
          <Navlink url="about" name="ABOUT US" />
        </span>
      </div>
      {isFooter && (
        <div className="mb-20">
          <MainFooter />
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
