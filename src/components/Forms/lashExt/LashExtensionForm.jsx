import React from "react";
import { selectEyelashExtensionForm } from "../../../store/slices/formsSlice";
import Stepper, { Step } from "../Stepper";
import PersonalHistoryPage from "../PersonalHistoryPage";
import MedicalHistoryPage from "../MedicalHistoryPage";
import ConsentSignaturePage from "../ConsentSignaturePage";
import ConfirmationPage from "../ConfirmationPage";

const LashExtensionForm = (props) => {
  return (
    <Stepper initialStep={1}>
      <Step>
        <PersonalHistoryPage
          {...props}
          formName="eyelashExtensionForm"
          formSelector={selectEyelashExtensionForm}
          headerTitle="EYELASH EXTENSION"
          pageName="Personal Information + Lash History"
          serviceQuestion="Have you had eyelash extension before?"
          productQuestion="Which products do you use on your lashes?"
          productOptions={["None", "Curl", "Perm", "Tint", "Other"]}
        />
      </Step>
      <Step>
        <MedicalHistoryPage
          {...props}
          formName="eyelashExtensionForm"
          formSelector={selectEyelashExtensionForm}
          headerTitle="EYELASH EXTENSION"
          conditions={[
            "Alopecia",
            "Allergies",
            "Blepharoplasty",
            "Cancer/Chemo",
            "Cataract",
            "Childbirth within 120 days",
            "Conjunctivitis",
            "Dry eyes",
            "Eczema",
            "Glaucoma",
            "Permanent eye makeup",
            "Psoriasis around the eyes",
            "Recent eye infection",
            "Sensitive Eyes",
            "Thyroid disease",
          ]}
          latexHelperText="Medical tape and adhesives required for eyelash extensions may contain acrylic or latex."
          showEyeQuestions
        />
      </Step>
      <Step>
        <ConsentSignaturePage
          {...props}
          formName="eyelashExtensionForm"
          formSelector={selectEyelashExtensionForm}
          consentId="lashExtension"
          consentField="lashExtConsent"
          headerTitle="EYELASH EXTENSION"
          agreementText="I have read and fully understand all information in this agreement. I consent to the agreement and to the eyelash extension application procedure."
        />
      </Step>
      <Step>
        <ConfirmationPage />
      </Step>
    </Stepper>
  );
};

export default LashExtensionForm;
