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
      <div className="flex flex-col items-center h-full text-2xl text-primary_dark gap-8">
        <span onClick={handleHamburgerClick} className="mt-8">
          <Navlink url="home" name="HOME" />
        </span>
        <span onClick={handleHamburgerClick}>
          <Navlink url="services" name="SERVICES" />
        </span>
        <span onClick={handleHamburgerClick}>
          <Navlink url="gallery" name="GALLERY" />
        </span>
        <span onClick={handleHamburgerClick}>
          <Navlink url="about" name="ABOUT US" />
        </span>
      </div>
      {isFooter && (
        <div>
          <MainFooter />
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
