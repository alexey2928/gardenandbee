import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  savePageData,
  selectEyelashLiftForm,
} from "../../../store/slices/formsSlice";
import { useDispatch, useSelector } from "react-redux";
import FormHeader from "../../../common/FormHeader";
import FormNavButtons from "../../../common/FormNavButtons";
import { trimData } from "../FormFunctions";

const Page2 = ({ currentStep, goToPreviousPage, goToNextPage }) => {
  const dispatch = useDispatch();
  const formData = useSelector(selectEyelashLiftForm);
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
          formName: "eyelashLiftForm",
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
        formName: "eyelashLiftForm",
        page: "page2",
        data: trimmedData,
      })
    );
    goToNextPage();
  };
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-b-2xl shadow">
      {/* Header */}
      <FormHeader title="EYELASH LIFT + TINT" pageName="Medical History" />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="p-4">
          {/* Inputs */}
          <div className="space-y-2">
            {/* Conditions */}
            <div>
              <p>Do you have or had any of the following conditions?</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                {[
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
              <p className="text-sm text-neutral-500">
                Medical tape and adhesives required for eyelash lifts may
                contain acrylic or latex.
              </p>
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

            {/* Glasses */}
            <div>
              <p>Do you wear glasses?</p>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="No"
                    {...register("glasses", {
                      required: "Please select an option.",
                    })}
                  />
                  <span>No</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="Yes"
                    {...register("glasses", {
                      required: "Please select an option.",
                    })}
                  />
                  <span>Yes</span>
                </label>
              </div>
              {errors.glasses && (
                <p className="text-red-500 text-sm">{errors.glasses.message}</p>
              )}
            </div>

            {/* Lenses */}
            <div>
              <p>Do you wear lenses?</p>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="No"
                    {...register("lenses", {
                      required: "Please select an option.",
                    })}
                  />
                  <span>No</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="Yes"
                    {...register("lenses", {
                      required: "Please select an option.",
                    })}
                  />
                  <span>Yes</span>
                </label>
              </div>
              {errors.lenses && (
                <p className="text-red-500 text-sm">{errors.lenses.message}</p>
              )}
            </div>

            {/* Eye Illness */}
            <div>
              <p>
                Do you have, or are you being treated for any eye
                illness/injury?
              </p>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="No"
                    {...register("eyeIllness", {
                      required: "Please select an option.",
                    })}
                  />
                  <span>No</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="Yes"
                    {...register("eyeIllness", {
                      required: "Please select an option.",
                    })}
                  />
                  <span>Yes</span>
                </label>
              </div>
              {errors.eyeIllness && (
                <p className="text-red-500 text-sm">
                  {errors.eyeIllness.message}
                </p>
              )}
            </div>

            {/* Watery eyes */}
            <div>
              <p>Do you often have eye irritation, itching or watery eyes?</p>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="No"
                    {...register("wateryEyes", {
                      required: "Please select an option.",
                    })}
                  />
                  <span>No</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="Yes"
                    {...register("wateryEyes", {
                      required: "Please select an option.",
                    })}
                  />
                  <span>Yes</span>
                </label>
              </div>
              {errors.wateryEyes && (
                <p className="text-red-500 text-sm">
                  {errors.wateryEyes.message}
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
