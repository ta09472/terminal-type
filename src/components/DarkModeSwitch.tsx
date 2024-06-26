"use client";

import { Radio } from "antd";
import { Mode } from "../type/custom";

interface Props {
  _theme: Mode;
  _setTheme: (v: Mode) => void;
}

export const DarkModeSwitch = ({ _setTheme, _theme }: Props) => {
  const toggleTheme = (mode?: Mode) => {
    const root = document.getElementsByTagName("html")[0];
    if (mode === "dark") {
      root.classList.add("dark");
      _setTheme("dark");
    } else {
      root.classList.remove("dark");
      _setTheme("light");
    }
  };

  return (
    <div className="dark:text-neutral-50 flex gap-8">
      <Radio.Group onChange={(e) => toggleTheme(e.target.value)} value={_theme}>
        <Radio
          value={"light"}
          className="dark:bg-neutral-800 dark:text-neutral-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
        </Radio>
        <Radio
          value={"dark"}
          className="dark:bg-neutral-800 dark:text-neutral-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        </Radio>
      </Radio.Group>
    </div>
  );
};
