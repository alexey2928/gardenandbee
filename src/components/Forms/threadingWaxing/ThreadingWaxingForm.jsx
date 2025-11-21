import React from "react";
import { selectThreadingWaxingForm } from "../../../store/slices/formsSlice";
import Stepper, { Step } from "../Stepper";
import PersonalHistoryPage from "../PersonalHistoryPage";
import MedicalHistoryPage from "../MedicalHistoryPage";
import ConsentSignaturePage from "../ConsentSignaturePage";
import ConfirmationPage from "../ConfirmationPage";

const ThreadingWaxingForm = (props) => {
  return (
    <Stepper initialStep={1}>
      <Step>
        <PersonalHistoryPage
          {...props}
          formName="threadingWaxingForm"
          formSelector={selectThreadingWaxingForm}
          headerTitle="THREADING & WAXING"
          pageName="Personal Information + History"
          serviceQuestion="Have you had threading or facial waxing before?"
          productQuestion="Have you used any hair-removal products or tools on your face recently?"
          productOptions={[
            "None",
            "Wax",
            "Threading",
            "Tweezing",
            "Dermaplaning",
            "Other",
          ]}
        />
      </Step>
      <Step>
        <MedicalHistoryPage
          {...props}
          formName="threadingWaxingForm"
          formSelector={selectThreadingWaxingForm}
          headerTitle="THREADING & WAXING"
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
            helper:
              "These may increase sensitivity during waxing or threading.",
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
          formName="threadingWaxingForm"
          formSelector={selectThreadingWaxingForm}
          consentId="threadingWaxing"
          consentField="threadingWaxingConsent"
          headerTitle="THREADING & WAXING"
          agreementText="I have read and fully understand all information in this agreement. I consent to the agreement and to the threading or waxing procedure."
        />
      </Step>
      <Step>
        <ConfirmationPage />
      </Step>
    </Stepper>
  );
};

export default ThreadingWaxingForm;
