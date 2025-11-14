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
  selectEyelashLiftForm,
} from "../../../store/slices/formsSlice";
import FormHeader from "../../../common/FormHeader";
import FormNavButtons from "../../../common/FormNavButtons";

const Page1 = ({ currentStep, goToNextPage }) => {
  const dispatch = useDispatch();
  const formData = useSelector(selectEyelashLiftForm);
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
          formName: "eyelashLiftForm",
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
        formName: "eyelashLiftForm",
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
        title="EYELASH LIFT + TINT"
        pageName="Personal Information + Lash History"
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="p-4">
          {/* Inputs */}
          <>
            <div className="space-y-2">
              {/* First + Last Name */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    className={`w-full p-2 border rounded ${
                      errors.firstName && "border-red-500"
                    }`}
                    {...register("firstName", {
                      required: "First Name is required.",
                      maxLength: {
                        value: 50,
                        message: "First Name cannot exceed 50 characters",
                      },
                    })}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    className={`w-full p-2 border rounded ${
                      errors.lastName && "border-red-500"
                    }`}
                    {...register("lastName", {
                      required: "Last Name is required.",
                      maxLength: {
                        value: 50,
                        message: "Last Name cannot exceed 50 characters",
                      },
                    })}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input
                  id="dateOfBirth"
                  type="date"
                  className={`w-full p-2 border rounded ${
                    errors.dateOfBirth && "border-red-500"
                  }`}
                  min="1900-01-01"
                  max={
                    new Date(Date.now() - 86400000).toISOString().split("T")[0]
                  } // yesterday
                  {...register("dateOfBirth", {
                    required: "Date of Birth is required.",
                    validate: (value) => {
                      const date = new Date(value);
                      const min = new Date("1900-01-01");
                      const max = new Date(Date.now() - 86400000); // yesterday
                      if (isNaN(date)) return "Invalid date.";
                      if (date < min) return "Date must be after Jan 1, 1900.";
                      if (date > max)
                        return "Date cannot be today or in the future.";
                      return true;
                    },
                  })}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <p>Gender</p>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="Female"
                      {...register("gender", {
                        required: "Please select your gender.",
                      })}
                    />
                    <span>Female</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="Male"
                      {...register("gender", {
                        required: "Please select your gender.",
                      })}
                    />
                    <span>Male</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="Other"
                      {...register("gender", {
                        required: "Please select your gender.",
                      })}
                    />
                    <span>Other</span>
                  </label>
                </div>
                {errors.gender && (
                  <p className="text-red-500 text-sm">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  type="text"
                  placeholder="(optional)"
                  className={`w-full p-2 border rounded ${
                    errors.address && "border-red-500"
                  }`}
                  {...register("address", {
                    maxLength: {
                      value: 100,
                      message: "Address cannot exceed 100 characters",
                    },
                  })}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* City / State / Zip */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    type="text"
                    placeholder="(optional)"
                    className={`w-full p-2 border rounded ${
                      errors.city && "border-red-500"
                    }`}
                    {...register("city", {
                      maxLength: {
                        value: 50,
                        message: "City cannot exceed 50 characters",
                      },
                    })}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label htmlFor="state">State</label>
                  <input
                    id="state"
                    type="text"
                    placeholder="(optional)"
                    className={`w-full p-2 border rounded ${
                      errors.state && "border-red-500"
                    }`}
                    {...register("state", {
                      maxLength: {
                        value: 2,
                        message: "State cannot exceed 2 characters",
                      },
                    })}
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm">
                      {errors.state.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label htmlFor="zipCode">Zip Code</label>
                  <input
                    id="zipCode"
                    type="text"
                    placeholder="(optional)"
                    className={`w-full p-2 border rounded ${
                      errors.zipCode && "border-red-500"
                    }`}
                    {...register("zipCode", {
                      maxLength: {
                        value: 5,
                        message: "Zip Code cannot exceed 5 digits",
                      },
                    })}
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm">
                      {errors.zipCode.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email + Phone */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    className={`w-full p-2 border rounded ${
                      errors.email && "border-red-500"
                    }`}
                    {...register("email", {
                      required: "Email is required.",
                      pattern: {
                        value: REGEX_EMAIL,
                        message: "Invalid email format.",
                      },
                      maxLength: {
                        value: 100,
                        message: "Email cannot exceed 0 characters",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <Controller
                    name="phone"
                    control={control}
                    rules={{
                      required: "Phone number is required.",
                      pattern: {
                        value: REGEX_PHONE,
                        message: "Phone number must be 10 digits.",
                      },
                    }}
                    render={({ field }) => (
                      <div>
                        <label htmlFor="phone">Phone Number</label>
                        <input
                          id="phone"
                          type="text"
                          placeholder="(10 digits)"
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

              {/* Heard */}
              <div>
                <label htmlFor="heard">How did you hear about us?</label>
                <input
                  id="heard"
                  type="text"
                  className={`w-full p-2 border rounded ${
                    errors.heard && "border-red-500"
                  }`}
                  {...register("heard", {
                    maxLength: {
                      value: 100,
                      message: "This field cannot exceed 100 characters",
                    },
                  })}
                />
                {errors.heard && (
                  <p className="text-red-500 text-sm">{errors.heard.message}</p>
                )}
              </div>

              {/* Photo consent */}
              <div>
                <p>
                  Are you comfortable with us taking and sharing pictures of
                  your service results on our social media or website?
                </p>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="Yes"
                      {...register("photoConsent", {
                        required: "Please select an option.",
                      })}
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="No"
                      {...register("photoConsent", {
                        required: "Please select an option.",
                      })}
                    />
                    <span>No</span>
                  </label>
                </div>
                {errors.photoConsent && (
                  <p className="text-red-500 text-sm">
                    {errors.photoConsent.message}
                  </p>
                )}
              </div>
            </div>

            {/* Lash history */}
            <div className="bg-secondary_light p-4 space-y-2">
              <div>
                <p>Have you had eyelash lift before?</p>
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
                <div className="flex space-x-4 items-center">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="None"
                      {...register("products", {
                        required: "Please select an option.",
                      })}
                    />
                    <span>None</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="Curl"
                      {...register("products", {
                        required: "Please select an option.",
                      })}
                    />
                    <span>Curl</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="Perm"
                      {...register("products", {
                        required: "Please select an option.",
                      })}
                    />
                    <span>Perm</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="Tint"
                      {...register("products", {
                        required: "Please select an option.",
                      })}
                    />
                    <span>Tint</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="Other"
                      {...register("products", {
                        required: "Please select an option.",
                      })}
                    />
                    <span>Other</span>
                  </label>
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
