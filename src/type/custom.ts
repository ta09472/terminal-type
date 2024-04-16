export type Theme = "basic" | "minimal" | "pro";
export type Language = "korean" | "english";
export type Mode = "dark" | "light";
export type TextAlign = "left" | "center";
export type FontSize = "small" | "medium" | "large" | "extraLarge";
export type Color = {
  normal: string;
  accuracy: string;
  inaccuracy: string;
};

export type DefaultSetting = {
  theme: Theme;
  language: Language;
  mode: Mode;
  textAlign: TextAlign;
  fontSize: FontSize;
  color: Color;
  systemLanguage: Language;
};
