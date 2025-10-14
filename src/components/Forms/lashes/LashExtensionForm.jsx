import React from "react";
import Stepper, { Step } from "../Stepper";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";

const LashExtensionForm = () => {
  return (
    <Stepper initialStep={1}>
      <Step>
        <Page1 />
      </Step>
      <Step>
        <Page2 />
      </Step>
      <Step>
        <Page3 />
      </Step>
    </Stepper>
  );
};

export default LashExtensionForm;
