import React from "react";

const ConfirmationPage = ({ submissionStatus }) => {
  const isSuccess = submissionStatus?.success;

  return (
    <>
      <div className="max-w-5xl mx-auto bg-white rounded-b-2xl shadow">
        {isSuccess ? (
          <div className={`flex flex-col space-y-2 p-4`}>
            <h1 className="text-2xl font-bold text-green-600 mb-4">
              Form Submitted Successfully!
            </h1>
            <p className="text-gray-700">
              Thank you for completing the form. Your submission has been
              received.
            </p>
          </div>
        ) : (
          <div className={`flex flex-col space-y-2 p-4`}>
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Something Went Wrong
            </h1>
            <p className="text-gray-700">
              There was an issue submitting your form. Please inform your
              technician so they can assist you.
            </p>
          </div>
        )}

        <div className="mt-10 p-4 bg-background rounded-b-2xl">
          <button
            className="duration-350 flex items-center justify-center rounded-full border border-primary py-2 px-8 font-medium tracking-tight text-primary transition"
            onClick={() => (window.location.href = "/forms")}
          >
            Back to Forms
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmationPage;
