import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  formatPhoneNumber,
  REGEX_EMAIL,
  REGEX_PHONE,
  trimData,
} from "../FormFunctions";
import { useDispatch, useSelector } from "react-redux";
import {
  savePageData,
  selectEyelashExtensionForm,
} from "../../../store/slices/formsSlice";
import FormHeader from "../../../common/FormHeader";
import FormNavButtons from "../../../common/FormNavButtons";
import PersonalInfoSection from "../PersonalInfoSection";

const Page1 = ({ currentStep, goToNextPage }) => {
  const dispatch = useDispatch();
  const formData = useSelector(selectEyelashExtensionForm);
  const page1Data = formData.page1;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: page1Data || {},
  });

  const allValues = watch();
  const watchServiceBefore = watch("serviceBefore");

  const watchProducts = watch("products");

  useEffect(() => {
    const clearIf = (condition, ...fields) => {
      if (condition) fields.forEach((f) => setValue(f, ""));
    };
    clearIf(watchServiceBefore !== "Yes", "whereApplied");
    clearIf(watchProducts !== "Other", "otherProduct");
  }, [watchServiceBefore, watchProducts, setValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(
        savePageData({
          formName: "eyelashExtensionForm",
          page: "page1",
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
        formName: "eyelashExtensionForm",
        page: "page1",
        data: trimmedData,
      })
    );
    goToNextPage();
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-b-2xl shadow">
      {/* Header */}
      <FormHeader
        title="EYELASH EXTENSION"
        pageName="Personal Information + Lash History"
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="p-4">
          {/* Inputs */}
          <>
            <PersonalInfoSection
              register={register}
              control={control}
              errors={errors}
            />
            {/* Lash history */}
            <div className="bg-secondary_light p-4 space-y-2">
              <div>
                <p>Have you had eyelash extension before?</p>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="Yes"
                      {...register("serviceBefore", {
                        required: "Please select an option.",
                      })}
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="No"
                      {...register("serviceBefore", {
                        required: "Please select an option.",
                      })}
                    />
                    <span>No</span>
                  </label>
                </div>
                {errors.serviceBefore && (
                  <p className="text-red-500 text-sm">
                    {errors.serviceBefore.message}
                  </p>
                )}
              </div>
              {watchServiceBefore === "Yes" && (
                <div className="ml-4 md:ml-8">
                  <label htmlFor="whereApplied">Where?</label>
                  <input
                    id="whereApplied"
                    type="text"
                    placeholder="Salon or location (optional)"
                    className={`w-full p-2 border rounded ${
                      errors.whereApplied && "border-red-500"
                    }`}
                    {...register("whereApplied", {
                      maxLength: {
                        value: 50,
                        message: "This field cannot exceed 50 characters",
                      },
                    })}
                  />
                  {errors.whereApplied && (
                    <p className="text-red-500 text-sm">
                      {errors.whereApplied.message}
                    </p>
                  )}
                </div>
              )}

              {/* Product usage */}
              <div>
                <p>Which products do you use on your lashes?</p>

                <div className="flex flex-wrap gap-x-3 gap-y-1 md:flex-nowrap">
                  {["None", "Curl", "Perm", "Tint", "Other"].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value={option}
                        {...register("products", {
                          required: "Please select an option.",
                        })}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>

                {errors.products && (
                  <p className="text-red-500 text-sm">
                    {errors.products.message}
                  </p>
                )}
              </div>

              {watchProducts === "Other" && (
                <div className="ml-4 md:ml-8">
                  <label htmlFor="otherProduct">Other</label>
                  <input
                    id="otherProduct"
                    type="text"
                    placeholder="Other Product name..."
                    className={`w-full p-2 border rounded ${
                      errors.otherProduct && "border-red-500"
                    }`}
                    {...register("otherProduct", {
                      required: "Please specify.",
                      maxLength: {
                        value: 50,
                        message: "This field cannot exceed 50 characters",
                      },
                    })}
                  />
                  {errors.otherProduct && (
                    <p className="text-red-500 text-sm">
                      {errors.otherProduct.message}
                    </p>
                  )}
                </div>
              )}
            </div>
          </>
        </div>
        {/* Navigation buttons */}
        <FormNavButtons currentStep={currentStep} />
      </form>
    </div>
  );
};

export default Page1;
