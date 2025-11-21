import React, { useCallback, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import FormHeader from "../../common/FormHeader";
import FormNavButtons from "../../common/FormNavButtons";
import { REGEX_INITIALS } from "./FormFunctions";
import { clearForm, savePageData } from "../../store/slices/formsSlice";
import { submitForm } from "../../services/submitForm";
import { selectConsents } from "../../store/slices/consentsSlice";

const ConsentSignaturePage = ({
  currentStep,
  goToPreviousPage,
  goToNextPage,
  formName,
  formSelector,
  consentId,
  consentField,
  headerTitle,
  agreementText,
  pageName = "Consent + Liability",
}) => {
  const dispatch = useDispatch();
  const formData = useSelector(formSelector);
  const consents = useSelector(selectConsents);

  const serviceConsents =
    consents?.find((item) => item.id === consentId)?.[consentField] || [];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const sigRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm();

  const validateSignature = () => {
    if (sigRef.current?.isEmpty()) {
      setError("signature", {
        type: "manual",
        message: "Signature is required.",
      });
      return false;
    }
    clearErrors("signature");
    return true;
  };

  const getFormattedDate = useCallback(() => {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  const submissionMemoDate = useMemo(
    () => getFormattedDate(),
    [getFormattedDate]
  );

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    if (!validateSignature()) return;

    setIsSubmitting(true);
    const signatureDataUrl = sigRef.current.toDataURL();

    dispatch(
      savePageData({
        formName,
        page: "page3",
        data: {
          ...data,
          consents: serviceConsents,
          signature: signatureDataUrl,
        },
      })
    );

    const fullFormData = {
      ...formData,
      page3: {
        ...data,
        consents: serviceConsents,
        signature: signatureDataUrl,
        submissionDate: getFormattedDate(),
      },
    };

    try {
      await submitForm(formName, fullFormData);
      reset();
      sigRef.current?.clear();
      dispatch(clearForm({ formName }));
      goToNextPage({ success: true });
    } catch (error) {
      reset();
      sigRef.current?.clear();
      dispatch(clearForm({ formName }));
      goToNextPage({ success: false });
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearSig = () => {
    sigRef.current?.clear();
    setError("signature", {
      type: "manual",
      message: "Signature is required.",
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow">
      {isSubmitting && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-20">
          <CircularProgress />
        </div>
      )}
      <FormHeader title={headerTitle} pageName={pageName} />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="p-4 space-y-4">
          <div className="p-4 border rounded bg-gray-50 h-64 overflow-y-scroll text-sm">
            <ul className="ml-2 list-disc flex flex-col">
              {serviceConsents.length > 0 ? (
                serviceConsents.map((consent, index) => (
                  <li key={index}>{consent}</li>
                ))
              ) : (
                <li>No consents available.</li>
              )}
            </ul>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-2 ">
              <input
                id="agree"
                type="checkbox"
                {...register("agree", { required: "Consent is required." })}
              />
              <label htmlFor="agree" className="text-sm">
                {agreementText}
              </label>
            </div>
            {errors.agree && (
              <p className="text-red-500 text-sm">{errors.agree.message}</p>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <label htmlFor="initials">Initials</label>
              <input
                id="initials"
                type="text"
                className={`w-full p-2 border rounded ${
                  errors.initials && "border-red-500"
                }`}
                {...register("initials", {
                  required: "Initials are required.",
                  pattern: {
                    value: REGEX_INITIALS,
                    message:
                      "Please enter exactly two uppercase letters (e.g., LH)",
                  },
                })}
              />
              {errors.initials && (
                <p className="text-red-500 text-sm">
                  {errors.initials.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="submissionDate">Date</label>
              <input
                type="text"
                value={submissionMemoDate}
                readOnly
                className="border rounded p-2 w-full"
              />
            </div>
          </div>

          <p className="mt-2 italic text-sm">
            By signing below, you agree to the following: I have completed this
            form truthfully and to the best of my knowledge. I agree to inform
            the technician of any changes in the above information. I agree to
            waive all liabilities toward my technician and Garden and Bee LLC.
          </p>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Client Signature
            </label>
            <div
              className={`border rounded ${
                errors.signature && "border-red-500"
              }`}
            >
              <SignatureCanvas
                penColor="black"
                canvasProps={{
                  width: 600,
                  height: 150,
                  className: "sig-canvas",
                }}
                ref={sigRef}
                onEnd={() => {
                  if (!sigRef.current?.isEmpty()) {
                    clearErrors("signature");
                  }
                }}
              />
            </div>
            {errors.signature && (
              <p className="text-red-500 text-sm">{errors.signature.message}</p>
            )}
          </div>

          <div className="space-y-4 lg:space-x-4 lg:space-y-0 flex flex-col lg:flex-row w-full mt-4">
            <button
              type="button"
              onClick={clearSig}
              className="px-3 py-1 rounded w-full lg:w-[20%] border border-primary text-primary_dark"
            >
              Clear Signature
            </button>
          </div>
        </div>
        <FormNavButtons
          currentStep={currentStep}
          goToPreviousPage={goToPreviousPage}
        />
      </form>
    </div>
  );
};

export default ConsentSignaturePage;
