import React from "react";

const FormHeader = ({ title, pageName }) => {
  return (
    <div className={`flex flex-col space-y-2 p-4`}>
      <h2 className="text-center text-3xl font-medium leading-normal text-primary_dark">
        {title}
      </h2>
      <span className="text-primary italic text-2xl">{pageName}</span>
    </div>
  );
};

export default FormHeader;
