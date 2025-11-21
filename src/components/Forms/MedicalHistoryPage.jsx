import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import FormHeader from "../../common/FormHeader";
import FormNavButtons from "../../common/FormNavButtons";
import { trimData } from "./FormFunctions";
import { savePageData } from "../../store/slices/formsSlice";

const radioField = (name, question, register, errors, helperText) => (
  <div>
    <p>{question}</p>
    {helperText && <p className="text-sm text-neutral-500">{helperText}</p>}
    <div className="flex space-x-4">
      {["No", "Yes"].map((value) => (
        <label key={value} className="flex items-center space-x-2">
          <input
            type="radio"
            value={value}
            {...register(name, {
              required: "Please select an option.",
            })}
          />
          <span>{value}</span>
        </label>
      ))}
    </div>
    {errors[name] && (
      <p className="text-red-500 text-sm">{errors[name].message}</p>
    )}
  </div>
);

const MedicalHistoryPage = ({
  currentStep,
  goToPreviousPage,
  goToNextPage,
  formName,
  formSelector,
  headerTitle,
  pageName = "Medical History",
  conditions = [],
  latexHelperText,
  additionalRadios = [],
  showEyeQuestions = false,
  productSection,
}) => {
  const dispatch = useDispatch();
  const formData = useSelector(formSelector);
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
          formName,
          page: "page2",
          data: trimData(allValues),
        })
      );
    }, 200);
    return () => clearTimeout(timeout);
  }, [allValues, dispatch, formName]);

  const onSubmit = (data) => {
    const trimmedData = trimData(data);
    dispatch(
      savePageData({
        formName,
        page: "page2",
        data: trimmedData,
      })
    );
    goToNextPage();
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-b-2xl shadow">
      <FormHeader title={headerTitle} pageName={pageName} />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="p-4">
          <div className="space-y-2">
            {conditions.length > 0 && (
              <div>
                <p>Do you have or had any of the following conditions?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                  {conditions.map((condition) => (
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
            )}

            {radioField(
              "latexAllergy",
              "Are you allergic to acrylic or latex?",
              register,
              errors,
              latexHelperText
            )}

            {radioField(
              "moreAllergies",
              "Do you have any other allergies?",
              register,
              errors
            )}

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

            {radioField(
              "pregnant",
              "Are you, or could you be pregnant?",
              register,
              errors
            )}

            {additionalRadios.map(({ name, question }) =>
              radioField(name, question, register, errors)
            )}

            {showEyeQuestions && (
              <>
                {radioField(
                  "glasses",
                  "Do you wear glasses?",
                  register,
                  errors
                )}
                {radioField("lenses", "Do you wear lenses?", register, errors)}
                {radioField(
                  "eyeIllness",
                  "Do you have, or are you being treated for any eye illness/injury?",
                  register,
                  errors
                )}
                {radioField(
                  "wateryEyes",
                  "Do you often have eye irritation, itching or watery eyes?",
                  register,
                  errors
                )}
              </>
            )}

            {productSection && (
              <div className="mt-4">
                <p>
                  Are you currently using any of the following skincare
                  products?
                </p>
                {productSection.helper && (
                  <p className="text-sm text-neutral-500">
                    {productSection.helper}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                  {productSection.items.map((product) => (
                    <label
                      key={product}
                      className="flex items-center space-x-2"
                    >
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
            )}

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
        <FormNavButtons
          currentStep={currentStep}
          goToPreviousPage={goToPreviousPage}
        />
      </form>
    </div>
  );
};

export default MedicalHistoryPage;
