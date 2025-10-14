import React, { useState, Children, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Stepper({
  children,
  initialStep = 1,
  disableStepIndicators = false,
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isLastStep = currentStep === totalSteps;

  const goToNextPage = () => {
    if (currentStep < totalSteps) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentStep]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center lg:my-4">
      <div className="mx-auto w-full rounded-2xl max-w-5xl h-full shadow-2xl">
        {/* Step Indicators */}
        <div className="flex w-full items-center p-4 md:my-4">
          {!disableStepIndicators &&
            stepsArray.map((_, index) => {
              const stepNumber = index + 1;
              const isNotLastStep = index < totalSteps - 1;
              return (
                <React.Fragment key={stepNumber}>
                  <StepIndicator step={stepNumber} currentStep={currentStep} />

                  {isNotLastStep && (
                    <StepConnector isComplete={currentStep > stepNumber} />
                  )}
                </React.Fragment>
              );
            })}
        </div>

        {/* Step Content */}
        <StepContentWrapper currentStep={currentStep} direction={direction}>
          {React.cloneElement(stepsArray[currentStep - 1].props.children, {
            goToNextPage,
            goToPreviousPage,
            isLastStep,
            currentStep,
          })}
        </StepContentWrapper>
      </div>
    </div>
  );
}

function StepContentWrapper({ currentStep, direction, children, className }) {
  const [parentHeight, setParentHeight] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setParentHeight(entry.contentRect.height);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [currentStep]);

  return (
    <motion.div
      style={{ position: "relative", overflow: "hidden" }}
      animate={{ height: parentHeight }}
      transition={{ type: "spring", duration: 0.4 }}
      className={className}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        <div ref={containerRef} key={currentStep}>
          {children}
        </div>
      </AnimatePresence>
    </motion.div>
  );
}

export function Step({ children }) {
  return <div>{children}</div>;
}

function StepIndicator({ step, currentStep }) {
  const status =
    currentStep === step
      ? "active"
      : currentStep < step
      ? "inactive"
      : "complete";

  return (
    <motion.div
      className="relative cursor-pointer outline-none focus:outline-none"
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: {
            scale: 1,
            backgroundColor: "#f5eff2",
            color: "#704415",
            border: "1px solid",
            borderColor: "#704415",
          },
          active: { scale: 1, backgroundColor: "#956C3F", color: "#f5eff2" },
          complete: { scale: 1, backgroundColor: "#956C3F", color: "#f5eff2" },
        }}
        transition={{ duration: 0.3 }}
        className="flex h-8 w-8 items-center justify-center rounded-full font-semibold"
      >
        {status === "complete" ? (
          <CheckIcon className="h-4 w-4 text-background" />
        ) : status === "active" ? (
          <div className="h-3 w-3 rounded-full bg-background" />
        ) : (
          <span className="text-sm">{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

function StepConnector({ isComplete }) {
  return (
    <div className="relative mx-2 h-0.5 flex-1 overflow-hidden rounded bg-[#DED6DA]">
      <motion.div
        className="absolute left-0 top-0 h-full"
        variants={{ incomplete: { width: 0 }, complete: { width: "100%" } }}
        initial={false}
        animate={isComplete ? "complete" : "incomplete"}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.1,
          type: "tween",
          ease: "easeOut",
          duration: 0.3,
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
