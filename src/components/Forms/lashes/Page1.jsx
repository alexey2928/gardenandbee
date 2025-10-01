import { DevTool } from "@hookform/devtools";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const Page1 = () => {
  const formRef = useRef(null);
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

  const handleNext = () => {
    console.log("PAGE 1");
  };

  return (
    <div className="max-w-5xl my-6 lg:my-10 mx-auto px-6 pt-2 pb-6 bg-white rounded shadow">
      <DevTool control={control} />
      <form ref={formRef} onSubmit={handleSubmit(handleNext)} noValidate>
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
              Personal Information + Lash History
            </span>
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
                  id="address"
                  type="text"
                  placeholder="Address"
                  className={`w-full p-2 border rounded ${
                    errors.address && "border-red-500"
                  }`}
                  {...register("address")}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                  <input
                    id="city"
                    type="text"
                    placeholder="City"
                    className={`w-full p-2 border rounded ${
                      errors.city && "border-red-500"
                    }`}
                    {...register("city")}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    id="state"
                    type="text"
                    placeholder="State"
                    className={`w-full p-2 border rounded ${
                      errors.state && "border-red-500"
                    }`}
                    {...register("state")}
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm">
                      {errors.state.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    id="zipCode"
                    type="text"
                    placeholder="Zip Code"
                    className={`w-full p-2 border rounded ${
                      errors.zipCode && "border-red-500"
                    }`}
                    {...register("zipCode")}
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm">
                      {errors.zipCode.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
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
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Page1;
