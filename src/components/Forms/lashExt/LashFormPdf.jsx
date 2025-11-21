import React from "react";
import FormPdfDocument from "../FormPdfDocument";

const LashFormPdf = ({ formData }) => (
  <FormPdfDocument
    formData={formData}
    headerTitle="EYELASH EXTENSION"
    page1SubTitle="Personal Information + Lash History"
    serviceQuestion="Have you had eyelash extensions before?"
    productQuestion="Which products do you use on your eyelashes?"
    includeEyeQuestions
    agreementText="I have read and fully understand all information in this agreement. I consent to the agreement and to the eyelash extension application procedure."
  />
);

export default LashFormPdf;
