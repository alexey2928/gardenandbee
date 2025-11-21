import React from "react";
import { selectEyelashLiftForm } from "../../../store/slices/formsSlice";
import Stepper, { Step } from "../Stepper";
import PersonalHistoryPage from "../PersonalHistoryPage";
import MedicalHistoryPage from "../MedicalHistoryPage";
import ConsentSignaturePage from "../ConsentSignaturePage";
import ConfirmationPage from "../ConfirmationPage";

const LashLiftForm = (props) => {
  return (
    <Stepper initialStep={1}>
      <Step>
        <PersonalHistoryPage
          {...props}
          formName="eyelashLiftForm"
          formSelector={selectEyelashLiftForm}
          headerTitle="EYELASH LIFT + TINT"
          pageName="Personal Information + Lash History"
          serviceQuestion="Have you had eyelash lift before?"
          productQuestion="Which products do you use on your lashes?"
          productOptions={["None", "Curl", "Perm", "Tint", "Other"]}
        />
      </Step>
      <Step>
        <MedicalHistoryPage
          {...props}
          formName="eyelashLiftForm"
          formSelector={selectEyelashLiftForm}
          headerTitle="EYELASH LIFT + TINT"
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
          latexHelperText="Medical tape and adhesives required for eyelash lifts may contain acrylic or latex."
          showEyeQuestions
        />
      </Step>
      <Step>
        <ConsentSignaturePage
          {...props}
          formName="eyelashLiftForm"
          formSelector={selectEyelashLiftForm}
          consentId="lashLift"
          consentField="lashLiftConsent"
          headerTitle="EYELASH LIFT + TINT"
          agreementText="I have read and fully understand all information in this agreement. I consent to the agreement and to the eyelash lift application procedure."
        />
      </Step>
      <Step>
        <ConfirmationPage />
      </Step>
    </Stepper>
  );
};

export default LashLiftForm;
