import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router";

const Page3 = () => {
  const navigate = useNavigate();

  const formRef = useRef(null);
  const sigRef = useRef(null);
  const printRef = useRef(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm();

  const [isPDF, setIsPDF] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const REGEX_EMAIL = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const REGEX_PHONE = /^[0-9]{10}$/; // simple US 10-digit pattern

  const formatPhoneNumber = (value) => {
    if (!value) return "";
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");
    // Match US phone pattern
    const match = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (!match) return value;
    let formatted = "";
    if (match[1]) {
      formatted = `(${match[1]}`;
    }
    if (match[2]) {
      formatted += `) ${match[2]}`;
    }
    if (match[3]) {
      formatted += `-${match[3]}`;
    }
    return formatted;
  };

  const clearSig = () => {
    sigRef.current?.clear();
    setError("signature", {
      type: "manual",
      message: "Signature is required.",
    });
  };

  const onSubmit = async (data) => {
    if (!validateSignature()) return;

    const element = printRef.current;
    if (!element) return;

    setSubmittedData(data);
    setIsPDF(true);

    try {
      await document.fonts.ready;

      const pdf = await generatePdf(element, data);
      pdf.save(getFileName(data));

      cleanupForm();
      navigate("/forms");
    } catch (err) {
      console.error("PDF generation failed:", err);
      setIsPDF(false);
    }
  };

  // --- Helpers ---

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

  const generatePdf = async (element, data) => {
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/jpeg", 0.7); // compress

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 10;
    const availableWidth = pageWidth - 2 * margin;
    const imgHeight = (canvas.height * availableWidth) / canvas.width;
    let position = margin;

    pdf.addImage(imgData, "JPEG", margin, position, availableWidth, imgHeight);
    return pdf;
  };

  const getFileName = (data) => {
    const today = new Date();
    const formattedDate = `${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}-${today.getFullYear()}`;
    return `lash_extension_${data.lastName}_${data.firstName}_${formattedDate}.pdf`;
  };

  const cleanupForm = () => {
    reset();
    sigRef.current?.clear();
    setIsPDF(false);
    setSubmittedData(null);
  };

  return (
    <div className="max-w-5xl my-6 lg:my-10 mx-auto px-6 pt-2 pb-6 bg-white rounded shadow">
      <DevTool control={control} />
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div
          ref={printRef}
          className={`${isPDF ? "print-a4 space-y-4" : "space-y-4"}`}
        >
          {/* Logo */}
          <div className={isPDF ? "flex justify-center" : "hidden"}>
            <img
              src={`${process.env.PUBLIC_URL}/images/logo.png`}
              alt="Garden & Bee"
              className="h-36"
            />
          </div>

          {/* Header */}
          <div className="flex flex-col items-center">
            <h2 className="text-center text-[35px] font-medium leading-normal text-black sm:text-4xl sm:leading-[78px] lg:text-5xl">
              EYELASH EXTENSION
            </h2>
            <span className="text-primary italic text-xl">
              Consent + Liability
            </span>
          </div>
          {isPDF && (
            <div className="text-sm mb-4">
              <p>
                <strong>Name:</strong> {submittedData.firstName}{" "}
                {submittedData.lastName}
              </p>
              <p>
                <strong>Email:</strong> {submittedData.email}
              </p>
              <p>
                <strong>Phone Number:</strong>{" "}
                {formatPhoneNumber(submittedData.phone)}
              </p>
            </div>
          )}
          {/* Consent Text */}
          <div
            className={`p-4 border rounded bg-gray-50 ${
              !isPDF && "h-64 overflow-y-scroll"
            } text-sm`}
          >
            <ul className="ml-2 flex flex-col">
              <li>
                I agree to have eyelash extensions applied to my natural
                eyelashes and/or removed and retouched. By signing this
                agreement, I consent to the placement and/or removal of the
                eyelash extensions by the certified eyelash extension
                professional.
              </li>
              <li>
                I understand that in rare occasions there are risks associated
                with having artificial eyelashes and eyelash extensions applied
                to or removed form my natural eyelashes. I further understand
                that in rare cases as part of the procedure eye irritation and
                discomfort could occur. I agree that if I experience any of
                these conditions with my lashes that I will contact the
                certified eyelash extension professional that performed this
                procedure and it may be beneficial to have the eyelashes
                removed.
              </li>
              <li>
                I understand and agree to the after-care instructions provided
                by the certified eyelash extension professional for the use and
                care of my eyelash extensions. I realize and accept the
                consequences ' failure to adhere to these instruction may cause
                the eyelash extensions to fall out and/or decrease the time the
                lashes will last.
              </li>
              <li>
                I understand and consent to having my eyes closed and covered
                for the duration of approximately 60-120 minute procedure. Times
                may vary depending on the type and number or eyelashes applied.
              </li>
              <li>
                I agree to the following eyelash extension follow-up
                maintenance: No water can come in contact with the eye area for
                24 hours after the application. Avoid makeup such as mascara,
                eyeliner or brow pencil for the first 24 hours. Avoid using oil
                containing sunscreens, moisturizes and cleansers on lashes for
                the first 24 hours. No pulling or rubbing Eyelash Extensions. No
                tinting or permanent eyelash extensions.
              </li>
              <li>
                I understand that a free or discounted touch-up is available
                only within 3 days of the initial application. After this
                period, any additional service will be considered a refill and
                charged accordingly.
              </li>
              <li>
                I release Garden and Bee and its technicians from any liability
                or claims arising from the lash extension procedure, including
                allergic reactions or damage to my natural lashes.
              </li>
            </ul>
          </div>

          {/* Inputs */}
          {!isPDF && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                  <input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    className={`w-full p-2 border rounded ${
                      errors.firstName && "border-red-500"
                    }`}
                    {...register("firstName", {
                      required: "First Name is required.",
                    })}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    className={`w-full p-2 border rounded ${
                      errors.lastName && "border-red-500"
                    }`}
                    {...register("lastName", {
                      required: "Last Name is required.",
                    })}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className={`w-full p-2 border rounded ${
                    errors.email && "border-red-500"
                  }`}
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: REGEX_EMAIL,
                      message: "Invalid email format.",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "Phone number is required.",
                    pattern: {
                      value: REGEX_PHONE,
                      message: "Phone must be 10 digits.",
                    },
                  }}
                  render={({ field }) => (
                    <div>
                      <input
                        id="phone"
                        type="text"
                        placeholder="Phone (10 digits)"
                        className={`w-full p-2 border rounded ${
                          errors.phone && "border-red-500"
                        }`}
                        value={formatPhoneNumber(field.value)} // 👈 show formatted
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, ""); // raw numbers
                          field.onChange(digits); // 👈 store only digits in RHF
                        }}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          )}

          {/* Agreement Checkbox */}
          <div className="mt-4">
            <div className="flex items-center gap-2 ">
              <input
                id="agree"
                type="checkbox"
                {...register("agree", { required: "Consent is required." })}
              />
              <label htmlFor="agree" className="text-sm">
                I have read and fully understand all information in this
                agreement. I consent to the agreement and to the eyelash
                extension application procedure.
              </label>
            </div>
            {errors.agree && (
              <p className="text-red-500 text-sm">{errors.agree.message}</p>
            )}
          </div>

          {/* Signature */}
          <p className="mt-2 italic text-sm">
            By signing below, I confirm that I am over 18 years of age, consent
            to this agreement, and waive all liabilities.
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
        </div>

        {/* Buttons */}
        <div className="space-y-4 lg:space-x-4 lg:space-y-0 flex flex-col lg:flex-row w-full mt-4">
          <button
            type="button"
            onClick={clearSig}
            className="px-3 py-1 rounded w-full lg:w-[20%] border border-primary text-primary_dark"
          >
            Clear Signature
          </button>
          <button
            type="submit"
            className="px-3 py-1 bg-primary text-white rounded w-full lg:w-[80%] hover:bg-green-700"
          >
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page3;
