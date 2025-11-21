import React from "react";
import FormPdfDocument from "../FormPdfDocument";

const BrowShapingPdf = ({ formData }) => (
  <FormPdfDocument
    formData={formData}
    headerTitle="BROW SHAPING + TINT"
    page1SubTitle="Personal Information + History"
    serviceQuestion="Have you had brow shaping or tinting done before?"
    productQuestion="Have you used any hair-removal methods on your brows or face recently?"
    includeBrowShape
    page2ProductLabel="Skincare products:"
    agreementText="I have read and fully understand all information in this agreement. I consent to the agreement and to the brow shaping procedure."
  />
);

export default BrowShapingPdf;
