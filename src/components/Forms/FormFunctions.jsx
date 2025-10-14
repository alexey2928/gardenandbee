import React, { useEffect, useRef } from "react";

export const REGEX_EMAIL = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
export const REGEX_PHONE = /^[0-9]{10}$/; // simple US 10-digit pattern

// export function useClearDependentFields(watchValue, resetField, rules) {
//   const prevValue = useRef(watchValue);

//   useEffect(() => {
//     // Only run if value changed
//     if (prevValue.current !== watchValue) {
//       rules.forEach(({ when, clear }) => {
//         // Clear fields only if condition is NOT met
//         if (!when(watchValue)) {
//           clear.forEach((field) => {
//             try {
//               resetField(field);
//             } catch (err) {
//               console.warn(`Failed to reset field "${field}":`, err);
//             }
//           });
//         }
//       });

//       prevValue.current = watchValue;
//     }
//   }, [watchValue, resetField, rules]);
// }
export function useClearDependentFieldsSimple(
  watchValue,
  setValue,
  fieldsToClear = []
) {
  const prevRef = useRef(watchValue);

  useEffect(() => {
    if (prevRef.current !== watchValue) {
      fieldsToClear.forEach((field) => {
        try {
          setValue(field, "", { shouldDirty: true, shouldTouch: false });
        } catch (err) {
          console.warn(`Failed to clear field "${field}":`, err);
        }
      });

      prevRef.current = watchValue;
    }
  }, [watchValue, setValue, fieldsToClear]);
}
export const formatPhoneNumber = (value) => {
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

export const trimName = (name) => {
  return name.trim().replace(/\s+/g, " ");
};

export const trimData = (data) => {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, trimName(value)];
      }
      return [key, value];
    })
  );
};
