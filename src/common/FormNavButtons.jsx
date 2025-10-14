import React from "react";

const FormNavButtons = ({ currentStep, goToPreviousPage }) => {
  return (
    <div
      className={`mt-10 p-4 flex ${
        currentStep > 1 ? "justify-between" : "justify-end"
      } bg-background rounded-b-2xl`}
    >
      {currentStep > 1 && (
        <button
          type="button"
          onClick={goToPreviousPage}
          className="duration-350 flex items-center justify-center rounded-full border border-primary py-2 px-8 font-medium tracking-tight text-primary transition"
        >
          Previous
        </button>
      )}
      <button
        type="submit"
        className={`duration-350 flex items-center justify-center rounded-full ${
          currentStep === 3 ? "bg-green-600" : "bg-primary"
        }  py-2 px-8 font-medium tracking-tight text-background transition`}
      >
        {currentStep === 3 ? "Submit Form" : "Next"}
      </button>
    </div>
  );
};

export default FormNavButtons;
