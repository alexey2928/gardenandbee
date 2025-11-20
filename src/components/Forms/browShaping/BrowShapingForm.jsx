import React from "react";
import Stepper, { Step } from "../Stepper";

import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import ConfirmationPage from "../ConfirmationPage";

const BrowShapingForm = () => {
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
      <Step>
        <ConfirmationPage />
      </Step>
    </Stepper>
  );
};

export default BrowShapingForm;
