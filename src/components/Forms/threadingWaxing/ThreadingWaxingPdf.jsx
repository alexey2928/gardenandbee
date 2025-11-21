import React from "react";
import FormPdfDocument from "../FormPdfDocument";

const ThreadingWaxingPdf = ({ formData }) => (
  <FormPdfDocument
    formData={formData}
    headerTitle="THREADING & WAXING"
    page1SubTitle="Personal Information + History"
    serviceQuestion="Have you had threading or facial waxing before?"
    productQuestion="Have you used any hair-removal products or tools on your face recently?"
    page2ProductLabel="Skincare products:"
    agreementText="I have read and fully understand all information in this agreement. I consent to the agreement and to the threading or waxing procedure."
  />
);

export default ThreadingWaxingPdf;
