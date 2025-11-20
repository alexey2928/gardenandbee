import React from "react";
import { Controller } from "react-hook-form";
import { REGEX_EMAIL, REGEX_PHONE, formatPhoneNumber } from "./FormFunctions";
import DatePickerModal from "../../common/DatePickerModal";

const PersonalInfoSection = ({ register, control, errors }) => {
  return (
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
              maxLength: { value: 50, message: "Cannot exceed 50 characters" },
            })}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
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
              maxLength: { value: 50, message: "Cannot exceed 50 characters" },
            })}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Date of Birth */}
      <Controller
        name="dateOfBirth"
        control={control}
        rules={{
          required: "Date of Birth is required.",
          validate: (value) => {
            if (!value) return "Date of Birth is required.";

            const date = new Date(value);
            const min = new Date("1900-01-01");
            const max = new Date(Date.now() - 86400000); // yesterday

            if (isNaN(date)) return "Invalid date.";
            if (date < min) return "Date must be after Jan 1, 1900.";
            if (date > max) return "Date cannot be today or in the future.";

            return true;
          },
        }}
        render={({ field }) => (
          <div>
            <label>Date of Birth</label>

            <DatePickerModal
              value={field.value}
              onChange={(val) => field.onChange(val)}
            />

            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>
        )}
      />

      {/* Gender */}
      <div>
        <p>Gender</p>
        <div className="flex space-x-4">
          {["Female", "Male", "Other"].map((opt) => (
            <label key={opt} className="flex items-center space-x-2">
              <input
                type="radio"
                value={opt}
                {...register("gender", {
                  required: "Please select your gender.",
                })}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender.message}</p>
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
            maxLength: { value: 100, message: "Cannot exceed 100 characters" },
          })}
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address.message}</p>
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
              maxLength: { value: 50, message: "Cannot exceed 50 characters" },
            })}
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
        </div>

        <div className="flex-1">
          <label htmlFor="state">State</label>
          <input
            id="state"
            type="text"
            placeholder="(optional)"
            maxLength={2}
            className={`w-full p-2 border rounded ${
              errors.state && "border-red-500"
            }`}
            {...register("state", {
              maxLength: { value: 2, message: "Max 2 characters (e.g., NJ)" },
            })}
          />
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state.message}</p>
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
              maxLength: { value: 5, message: "Max 5 digits" },
            })}
          />
          {errors.zipCode && (
            <p className="text-red-500 text-sm">{errors.zipCode.message}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className={`w-full p-2 border rounded ${
            errors.email && "border-red-500"
          }`}
          {...register("email", {
            required: "Email is required.",
            pattern: { value: REGEX_EMAIL, message: "Invalid email format." },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <Controller
        name="phone"
        control={control}
        rules={{
          required: "Phone number is required.",
          pattern: { value: REGEX_PHONE, message: "Must be 10 digits." },
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
              value={formatPhoneNumber(field.value)}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, "");
                field.onChange(digits);
              }}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
        )}
      />

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
            maxLength: { value: 100, message: "Cannot exceed 100 characters" },
          })}
        />
        {errors.heard && (
          <p className="text-red-500 text-sm">{errors.heard.message}</p>
        )}
      </div>

      {/* Photo Consent */}
      <div>
        <p>
          Are you comfortable with us taking and sharing pictures of your
          results?
        </p>
        <div className="flex space-x-4">
          {["Yes", "No"].map((opt) => (
            <label key={opt} className="flex items-center space-x-2">
              <input
                type="radio"
                value={opt}
                {...register("photoConsent", {
                  required: "Please select an option.",
                })}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
        {errors.photoConsent && (
          <p className="text-red-500 text-sm">{errors.photoConsent.message}</p>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoSection;
