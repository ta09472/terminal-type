import { FontSize } from "../type/custom";

export const getFontSize = (value: FontSize) => {
  switch (value) {
    case "small":
      return "text-base";
    case "medium":
      return "text-lg";
    case "large":
      return "text-2xl";
    case "extraLarge":
      return "text-3xl";
    default:
      return "";
  }
};

export const getAuthorFontSize = (value: FontSize) => {
  switch (value) {
    case "small":
      return "text-sm";
    case "medium":
      return "text-base";
    case "large":
      return "text-lg";
    case "extraLarge":
      return "text-2xl";
    default:
      return "";
  }
};
