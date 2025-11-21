import React from "react";
import { selectBrowLaminationForm } from "../../../store/slices/formsSlice";
import Stepper, { Step } from "../Stepper";
import PersonalHistoryPage from "../PersonalHistoryPage";
import MedicalHistoryPage from "../MedicalHistoryPage";
import ConsentSignaturePage from "../ConsentSignaturePage";
import ConfirmationPage from "../ConfirmationPage";

const BrowLaminationForm = (props) => {
  return (
    <Stepper initialStep={1}>
      <Step>
        <PersonalHistoryPage
          {...props}
          formName="browLaminationForm"
          formSelector={selectBrowLaminationForm}
          headerTitle="BROW LAMINATION + TINT"
          pageName="Personal Information + History"
          serviceQuestion="Have you had brow lamination or tinting done before?"
          productQuestion="Have you used any hair-removal methods on your brows or face recently?"
          productOptions={[
            "None",
            "Wax",
            "Threading",
            "Tweezing",
            "Dermaplaning",
            "Other",
          ]}
          additionalRadios={[
            {
              name: "browShape",
              question: "Preferred brow shape:",
              options: [
                "Unsure",
                "Natural",
                "Soft Arch",
                "High Arch",
                "Straight",
              ],
            },
          ]}
        />
      </Step>
      <Step>
        <MedicalHistoryPage
          {...props}
          formName="browLaminationForm"
          formSelector={selectBrowLaminationForm}
          headerTitle="BROW LAMINATION + TINT"
          conditions={[
            "Acne",
            "Cancer/Chemo",
            "Childbirth within 120 Days",
            "Eczema",
            "Permanent Makeup in Treatment Area",
            "Previous Reaction to Waxing/Threading",
            "Psoriasis",
            "Recent Procedures (Botox, Fillers, Laser)",
            "Recent Facial Injury or Infection",
            "Rosacea",
            "Sensitive Skin",
            "Skin Thinning or Fragility",
            "Sunburn in Treatment Area",
            "Thyroid Disease",
          ]}
          productSection={{
            helper: "These may increase sensitivity during brow shaping.",
            items: [
              "AHA/BHA Acids",
              "Accutane",
              "Benzoyl Peroxide",
              "Chemical Peels",
              "Other Active Skincare Products",
              "Recent Laser Treatments",
              "Retin-A/Retinol",
              "Tretinoin",
            ],
          }}
        />
      </Step>
      <Step>
        <ConsentSignaturePage
          {...props}
          formName="browLaminationForm"
          formSelector={selectBrowLaminationForm}
          consentId="browLamination"
          consentField="browLaminationConsent"
          headerTitle="BROW LAMINATION + TINT"
          agreementText="I have read and fully understand all information in this agreement. I consent to the agreement and to the brow lamination procedure."
        />
      </Step>
      <Step>
        <ConfirmationPage />
      </Step>
    </Stepper>
  );
};

export default BrowLaminationForm;
