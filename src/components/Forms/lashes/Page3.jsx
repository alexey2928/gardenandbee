import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  savePageData,
  selectEyelashExtensionForm,
} from "../../../store/slices/formsSlice";
import { formatPhoneNumber } from "../FormFunctions";
import FormNavButtons from "../../../common/FormNavButtons";
import FormHeader from "../../../common/FormHeader";

const Page3 = ({ currentStep, goToPreviousPage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector(selectEyelashExtensionForm);
  const [isPDF, setIsPDF] = useState(false);

  const printRefs = {
    page1: useRef(),
    page2: useRef(),
    page3: useRef(),
  };
  const sigRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm();

  const clearSig = () => {
    sigRef.current?.clear();
    setError("signature", {
      type: "manual",
      message: "Signature is required.",
    });
  };

  const onSubmit = async (data) => {
    if (!validateSignature()) return;

    dispatch(
      savePageData({
        formName: "eyelashExtensionForm",
        page: "page3",
        data: { ...data, signature: sigRef.current.toDataURL() },
      })
    );
    setIsPDF(true);

    try {
      await document.fonts.ready;
      console.log("FORM DATA", formData);
      const pdf = await generatePdf(formData);
      pdf.save(getFileName(formData.page1));

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

  const generatePdf = async () => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });
    const margin = 10;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const availableWidth = pageWidth - 2 * margin;

    const pages = ["page1", "page2", "page3"]; // add more pages if needed
    for (let i = 0; i < pages.length; i++) {
      const pageKey = pages[i];
      const element = document.getElementById(pageKey);
      if (!element) continue;

      const canvas = await html2canvas(element, { scale: 3, useCORS: true });
      const imgHeight = (canvas.height * availableWidth) / canvas.width;
      const imgData = canvas.toDataURL("image/jpeg", 0.7);

      if (i > 0) pdf.addPage(); // <-- only add a page AFTER the first one
      pdf.addImage(imgData, "JPEG", margin, margin, availableWidth, imgHeight);
    }

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
  };

  return (
    <>
      {isPDF && (
        <>
          {/* PAGE 1 */}
          <div id="page1" className="print-a4 relative">
            <div className="flex flex-col justify-between min-h-full">
              <div>
                {/* Logo */}
                <div className="flex justify-center">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/logo.png`}
                    alt="Garden & Bee"
                    className="h-36"
                  />
                </div>
                {/* Header */}
                <FormHeader
                  title="EYELASH EXTENSION"
                  pageName="Personal Information + Lash History"
                  topPadding={false}
                />
                <div className="p-4 space-y-2">
                  {/* First + Last Name */}
                  <p>
                    <strong>Name:</strong> {formData.page1.firstName}{" "}
                    {formData.page1.lastName}
                  </p>

                  {/* Date of Birth */}
                  <p>
                    <strong>Date of Birth:</strong> {formData.page1.dateOfBirth}
                  </p>

                  {/* Gender */}
                  <p>
                    <strong>Gender:</strong> {formData.page1.gender}
                  </p>

                  {/* Address */}
                  {formData.page1.address && (
                    <p>
                      <strong>Address:</strong> {formData.page1.address}
                      {(formData.page1.city ||
                        formData.page1.state ||
                        formData.page1.zipCode) && (
                        <span>
                          ,{" "}
                          {[
                            formData.page1.city,
                            formData.page1.state,
                            formData.page1.zipCode,
                          ]
                            .filter(Boolean) // remove empty values
                            .join(", ")}
                        </span>
                      )}
                    </p>
                  )}

                  {/* Email */}
                  <p>
                    <strong>Email:</strong> {formData.page1.email}
                  </p>

                  {/* Phone */}
                  <p>
                    <strong>Phone Number:</strong>{" "}
                    {formatPhoneNumber(formData.page1.phone)}
                  </p>

                  {/* Heard */}
                  {formData.page1.heard && (
                    <div className="flex flex-col gap-1">
                      <p>
                        <strong>How did you hear about us?</strong>
                      </p>
                      <p>{formData.page1.heard}</p>
                    </div>
                  )}

                  {/* Photo consent */}
                  <div className="flex flex-col gap-1">
                    <p>
                      <strong>
                        Are you comfortable with us taking and sharing pictures
                        of your service results on our social media or website?
                      </strong>
                    </p>
                    <p>{formData.page1.photoConsent}</p>
                  </div>

                  {/* Lash history */}
                  <div className="bg-secondary_light p-4 space-y-2">
                    <div className="flex flex-col gap-1">
                      <p>
                        <strong>Have you had eyelash extension before?</strong>
                      </p>
                      <p>{formData.page1.lashesBefore}</p>
                    </div>
                    {formData.page1.lashesBefore === "Yes" && (
                      <p className="ml-8">
                        <strong>Where:</strong> {formData.page1.whereApplied}
                      </p>
                    )}

                    {/* Product usage */}
                    <div className="flex flex-col gap-1">
                      <p>
                        <strong>Do you use products on your eyelashes?</strong>
                      </p>
                      <p>{formData.page1.useofProducts}</p>
                    </div>
                    {formData.page1.useofProducts === "Yes" && (
                      <p className="ml-8">
                        <strong>Which products:</strong>{" "}
                        {formData.page1.products === "Other"
                          ? formData.page1.otherProduct
                          : formData.page1.products}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Page # */}
              <div className="absolute bottom-2 left-0 w-full text-center">
                <p>1/3</p>
              </div>
            </div>
          </div>

          {/* PAGE 2 */}
          <div id="page2" className="print-a4 relative">
            <div className="flex flex-col justify-between min-h-full">
              <div>
                {/* Header */}
                <FormHeader
                  title="EYELASH EXTENSION"
                  pageName="Medical History"
                />
                <div className="p-4 space-y-2">
                  {/* Conditions */}
                  {Array.isArray(formData.page2.conditions) &&
                    formData.page2.conditions.length > 0 && (
                      <div className="flex flex-col gap-1">
                        <p>
                          <strong>Medical conditions:</strong>{" "}
                          {formData.page2.conditions.join(", ")}
                        </p>
                      </div>
                    )}

                  {/* Latex Allergy */}
                  <div className="flex flex-col gap-1">
                    <p>
                      <strong>Are you allergic to acrylic or latex?</strong>
                    </p>
                    <p>{formData.page2.latexAllergy}</p>
                  </div>

                  {/* More Allergies */}
                  <div className="flex flex-col gap-1">
                    <p>
                      <strong>Do you have any other allergies?</strong>
                    </p>
                    <p>{formData.page2.moreAllergies}</p>
                  </div>

                  {/* Other Allergies */}
                  {formData.page2.moreAllergies === "Yes" && (
                    <p className="ml-8">
                      <strong>Other Allergies:</strong>{" "}
                      {formData.page2.otherAllergies}
                    </p>
                  )}

                  {/* Pregnant */}
                  <div className="flex flex-col gap-1">
                    <p>
                      <strong>Are you, or could you be pregnant?</strong>
                    </p>
                    <p>{formData.page2.pregnant}</p>
                  </div>

                  {/* Glasses */}
                  <div className="flex flex-col gap-1">
                    <p>
                      <strong>Do you wear glasses?</strong>
                    </p>
                    <p>{formData.page2.glasses}</p>
                  </div>

                  {/* Lenses */}
                  <div className="flex flex-col gap-1">
                    <p>
                      <strong>Do you wear lenses?</strong>
                    </p>
                    <p>{formData.page2.lenses}</p>
                  </div>

                  {/* Eye Illness */}
                  <div className="flex flex-col gap-1">
                    <p>
                      <strong>
                        Do you have, or are you being treated for any eye
                        illness/injury?
                      </strong>
                    </p>
                    <p>{formData.page2.eyeIllness}</p>
                  </div>

                  {/* Watery eyes */}
                  <div className="flex flex-col gap-1">
                    <p>
                      <strong>
                        Do you often have eye irritation, itching or watery
                        eyes?
                      </strong>
                    </p>
                    <p>{formData.page2.wateryEyes}</p>
                  </div>

                  {/* Medications */}
                  {formData.page2.medications && (
                    <p>
                      <strong>
                        Medications or supplements taken regularly:
                      </strong>{" "}
                      {formData.page2.medications}
                    </p>
                  )}
                </div>
              </div>

              {/* Page # */}
              <div className="absolute bottom-2 left-0 w-full text-center">
                <p>2/3</p>
              </div>
            </div>
          </div>

          {/* PAGE 3 */}
          <div id="page3" className="print-a4 relative">
            <div className="flex flex-col justify-between min-h-full">
              <div>
                {/* Header */}
                <FormHeader
                  title="EYELASH EXTENSION"
                  pageName="Consent + Liability"
                />
                <div className="p-4 space-y-2"></div>
              </div>

              {/* Page # */}
              <div className="absolute bottom-2 left-0 w-full text-center">
                <p>3/3</p>
              </div>
            </div>
          </div>
        </>
      )}
      {!isPDF && (
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow">
          {/* Header */}
          <FormHeader
            title="EYELASH EXTENSION"
            pageName="Consent + Liability"
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-4"
          >
            <div className="p-4 space-y-4">
              {/* Consent Text */}
              <div className="p-4 border rounded bg-gray-50 h-64 overflow-y-scroll text-sm">
                <ul className="ml-2 flex flex-col">
                  <li>
                    I agree to have eyelash extensions applied to my natural
                    eyelashes and/or removed and retouched. By signing this
                    agreement, I consent to the placement and/or removal of the
                    eyelash extensions by the certified eyelash extension
                    professional.
                  </li>
                  <li>
                    I understand that in rare occasions there are risks
                    associated with having artificial eyelashes and eyelash
                    extensions applied to or removed form my natural eyelashes.
                    I further understand that in rare cases as part of the
                    procedure eye irritation and discomfort could occur. I agree
                    that if I experience any of these conditions with my lashes
                    that I will contact the certified eyelash extension
                    professional that performed this procedure and it may be
                    beneficial to have the eyelashes removed.
                  </li>
                  <li>
                    I understand and agree to the after-care instructions
                    provided by the certified eyelash extension professional for
                    the use and care of my eyelash extensions. I realize and
                    accept the consequences ' failure to adhere to these
                    instruction may cause the eyelash extensions to fall out
                    and/or decrease the time the lashes will last.
                  </li>
                  <li>
                    I understand and consent to having my eyes closed and
                    covered for the duration of approximately 60-120 minute
                    procedure. Times may vary depending on the type and number
                    or eyelashes applied.
                  </li>
                  <li>
                    I agree to the following eyelash extension follow-up
                    maintenance: No water can come in contact with the eye area
                    for 24 hours after the application. Avoid makeup such as
                    mascara, eyeliner or brow pencil for the first 24 hours.
                    Avoid using oil containing sunscreens, moisturizes and
                    cleansers on lashes for the first 24 hours. No pulling or
                    rubbing Eyelash Extensions. No tinting or permanent eyelash
                    extensions.
                  </li>
                  <li>
                    I understand that a free or discounted touch-up is available
                    only within 3 days of the initial application. After this
                    period, any additional service will be considered a refill
                    and charged accordingly.
                  </li>
                  <li>
                    I release Garden and Bee and its technicians from any
                    liability or claims arising from the lash extension
                    procedure, including allergic reactions or damage to my
                    natural lashes.
                  </li>
                </ul>
              </div>

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
                By signing below, you agree to the following: I have completed
                this form truthfully and to the best of my knowledge. I agree to
                inform the technician of any changes in the above information. I
                agree to waive all liabilities toward my technician and Garden
                and Bee LLC.
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
                  <p className="text-red-500 text-sm">
                    {errors.signature.message}
                  </p>
                )}
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
              </div>
            </div>
            {/* Navigation buttons */}
            <FormNavButtons
              currentStep={currentStep}
              goToPreviousPage={goToPreviousPage}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default Page3;
