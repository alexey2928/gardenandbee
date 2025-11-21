import React from "react";
import FormPdfDocument from "../FormPdfDocument";

const LashLiftFormPdf = ({ formData }) => (
  <FormPdfDocument
    formData={formData}
    headerTitle="EYELASH LIFT + TINT"
    page1SubTitle="Personal Information + Lash History"
    serviceQuestion="Have you had eyelash lift before?"
    productQuestion="Which products do you use on your eyelashes?"
    includeEyeQuestions
    agreementText="I have read and fully understand all information in this agreement. I consent to the agreement and to the eyelash lift application procedure."
  />
);

export default LashLiftFormPdf;
