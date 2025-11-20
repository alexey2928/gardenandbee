import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  savePageData,
  selectBrowShapingForm,
} from "../../../store/slices/formsSlice";
import { useDispatch, useSelector } from "react-redux";
import FormHeader from "../../../common/FormHeader";
import FormNavButtons from "../../../common/FormNavButtons";
import { trimData } from "../FormFunctions";

const Page2 = ({ currentStep, goToPreviousPage, goToNextPage }) => {
  const dispatch = useDispatch();
  const formData = useSelector(selectBrowShapingForm);
  const page2Data = formData.page2;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: page2Data || {},
  });

  const allValues = watch();
  const watchMoreAllergies = watch("moreAllergies");

  useEffect(() => {
    const clearIf = (condition, ...fields) => {
      if (condition) fields.forEach((f) => setValue(f, ""));
    };
    clearIf(watchMoreAllergies !== "Yes", "otherAllergies");
  }, [watchMoreAllergies, setValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(
        savePageData({
          formName: "browShapingForm",
          page: "page2",
          data: trimData(allValues),
        })
      );
    }, 200);
    return () => clearTimeout(timeout);
  }, [allValues, dispatch]);

  const onSubmit = (data) => {
    const trimmedData = trimData(data);
    dispatch(
      savePageData({
        formName: "browShapingForm",
        page: "page2",
        data: trimmedData,
      })
    );
    goToNextPage();
  };
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-b-2xl shadow">
      {/* Header */}
      <FormHeader title="BROW SHAPING + TINT" pageName="Medical History" />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="p-4">
          {/* Inputs */}
          <div className="space-y-2">
            {/* Conditions */}
            <div>
              <p>Do you have or had any of the following conditions?</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                {[
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
                ].map((condition) => (
                  <label
                    key={condition}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      value={condition}
                      {...register("conditions")}
                    />
                    <span>{condition}</span>
                  </label>
                ))}
              </div>
              {errors.conditions && (
                <p className="text-red-500 text-sm">
                  {errors.conditions.message}
                </p>
              )}
            </div>

            {/* Latex Allergy */}
            <div>
              <p>Are you allergic to acrylic or latex?</p>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="No"
                    {...register("latexAllergy", {
                      required: "Please select an option.",
                    })}
                  />
                  <span>No</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="Yes"
                    {...register("latexAllergy", {
                      required: "Please select an option.",
                    })}
                  />
                  <span>Yes</span>
                </label>
              </div>
              {errors.latexAllergy && (
                <p className="text-red-500 text-sm">
                  {errors.latexAllergy.message}
                </p>
              )}
            </div>

            {/* More Allergies */}
            <div>
              <p>Do you have any other allergies?</p>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="No"
                    {...register("moreAllergies", {
                      required: "Please select an option.",
                    })}
                  />
                  <span>No</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="Yes"
                    {...register("moreAllergies", {
                      required: "Please select an option.",
                    })}
                  />
                  <span>Yes</span>
                </label>
              </div>
              {errors.moreAllergies && (
                <p className="text-red-500 text-sm">
                  {errors.moreAllergies.message}
                </p>
              )}
            </div>

            {/* Other Allergies */}
            {watchMoreAllergies === "Yes" && (
              <div className="ml-4 md:ml-8">
                <label htmlFor="otherAllergies">Other Allergies</label>
                <input
                  id="otherAllergies"
                  type="text"
                  placeholder="Allergies (comma separated)"
                  className={`w-full p-2 border rounded ${
                    errors.otherAllergies && "border-red-500"
                  }`}
                  {...register("otherAllergies", {
                    required: "Please enter allergies.",
                    maxLength: {
                      value: 100,
                      message: "This field cannot exceed 100 characters",
                    },
                  })}
                />
                {errors.otherAllergies && (
                  <p className="text-red-500 text-sm">
                    {errors.otherAllergies.message}
                  </p>
                )}
              </div>
            )}

            {/* Pregnant */}
            <div>
              <p>Are you, or could you be pregnant?</p>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="No"
                    {...register("pregnant", {
                      required: "Please select an option.",
                    })}
                  />
                  <span>No</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="Yes"
                    {...register("pregnant", {
                      required: "Please select an option.",
                    })}
                  />
                  <span>Yes</span>
                </label>
              </div>
              {errors.pregnant && (
                <p className="text-red-500 text-sm">
                  {errors.pregnant.message}
                </p>
              )}
            </div>

            {/* Skincare Products */}
            <div className="mt-4">
              <p>
                Are you currently using any of the following skincare products?
              </p>
              <p className="text-sm text-neutral-500">
                These may increase sensitivity during brow shaping.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                {[
                  "AHA/BHA Acids",
                  "Accutane",
                  "Benzoyl Peroxide",
                  "Chemical Peels",
                  "Other Active Skincare Products",
                  "Recent Laser Treatments",
                  "Retin-A/Retinol",
                  "Tretinoin",
                ].map((product) => (
                  <label key={product} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={product}
                      {...register("products")}
                    />
                    <span>{product}</span>
                  </label>
                ))}
              </div>

              {errors.products && (
                <p className="text-red-500 text-sm">
                  {errors.products.message}
                </p>
              )}
            </div>

            {/* Medications */}
            <div>
              <label htmlFor="medications">
                Any medications or supplements you take regularly?
              </label>
              <input
                id="medications"
                type="text"
                placeholder="Medications (comma separated)"
                className={`w-full p-2 border rounded ${
                  errors.medications && "border-red-500"
                }`}
                {...register("medications", {
                  maxLength: {
                    value: 100,
                    message: "This field cannot exceed 100 characters",
                  },
                })}
              />
              {errors.medications && (
                <p className="text-red-500 text-sm">
                  {errors.medications.message}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* Navigation buttons */}
        <FormNavButtons
          currentStep={currentStep}
          goToPreviousPage={goToPreviousPage}
        />
      </form>
    </div>
  );
};

export default Page2;
