import React from "react";

export const REGEX_EMAIL = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
export const REGEX_PHONE = /^[0-9]{10}$/; // simple US 10-digit pattern
export const REGEX_INITIALS = /^[A-Z]{2}$/;

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

export const formatName = (name) => {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

export const formatServiceName = (name) => {
  if (!name) return "";

  // Remove the trailing "Form" if it exists
  let formatted = name.replace(/Form$/i, "");

  // Insert space before each capital letter
  formatted = formatted.replace(/([a-z])([A-Z])/g, "$1 $2");

  // Capitalize the first letter and lowercase the rest of each word
  formatted = formatted
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return formatted;
};
