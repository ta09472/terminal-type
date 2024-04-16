/* eslint-disable @typescript-eslint/no-unused-vars */
import { Suspense, useEffect, useState } from "react";
import Basic from "../components/Basic";
import Pro from "../components/Pro";
import Minimal from "../components/Minimal";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Button, Divider, FloatButton, Modal, Popconfirm, Tooltip } from "antd";
import ThemeRadio from "../components/ThemeRadio";
import ColorRadio from "../components/ColorRadio";
import TextAlignRadio from "../components/TextAlignRadio";
import LanguageRadio from "../components/LanguageRadio";
import TextSizeRadio from "../components/TextSizeRadio";
import {
  Color,
  DefaultSetting,
  FontSize,
  Language,
  Mode,
  TextAlign,
  Theme,
} from "../type/custom";
import { getLocalStorage, setLocalStorage } from "../util/localStorage";
import PatchNote from "../components/PatchNode";
import sentence from "../contents/sentence";
import { twMerge } from "tailwind-merge";
import { extractTextInBrackets } from "../util/color";
import BackgroundCropper from "../components/Cropper";
import CropDemo from "../components/Cropper";
import { PixelCrop } from "react-image-crop";
import { createBackgroundImageStyle } from "../util/crop";

const defaultSetting: DefaultSetting = {
  theme: "minimal",
  systemLanguage: "korean",
  language: "korean",
  mode: "light",
  fontSize: "medium",
  textAlign: "center",
  color: {
    accuracy: "text-[#000000]",
    normal: "text-[#969da6]",
    inaccuracy: "text-[#446cef]",
  },
  background: "#ffffff",
};

export default function Home() {
  const setting: DefaultSetting =
    getLocalStorage("terminal-type-setting") ?? defaultSetting;

  const [systemLang, setSystemLang] = useState<Language>(
    setting.systemLanguage
  );
  const [theme, setTheme] = useState<Theme>(setting.theme);
  const [lang, setLang] = useState<Language>(setting.language);
  const [_theme, _setTheme] = useState<Mode>(setting.mode);
  const [fontSize, setFontSize] = useState<FontSize>(setting.fontSize);
  const [textAlign, setTextAlign] = useState<TextAlign>(setting.textAlign);
  const [color, setColor] = useState<Color>(setting.color);
  const [background, setBackground] = useState<{
    crop: PixelCrop;
    src: string;
  }>();

  const [index, setIndex] = useState(
    Math.floor(Math.random() * sentence[lang].length - 1)
  );
  const [input, setInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patchNoteOpen, setPatchNoteOpen] = useState(false);

  const isLocal = systemLang === "korean";

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setLocalStorage("terminal-type-setting", {
      theme: theme,
      systemLanguage: systemLang,
      language: lang,
      mode: _theme,
      fontSize: fontSize,
      textAlign: textAlign,
      color: color,
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const tempSetting = {
    theme,
    mode: _theme,
    color,
    language: lang,
    systemLanguage: systemLang,
    fontSize,
    textAlign,
    background,
  };

  const renderTheme = (theme: Theme) => {
    switch (theme) {
      case "pro":
        return (
          <Pro
            setting={tempSetting}
            index={index}
            setIndex={setIndex}
            input={input}
            setInput={setInput}
          />
        );

      case "basic":
        return (
          <Basic
            setting={tempSetting}
            index={index}
            setIndex={setIndex}
            input={input}
            setInput={setInput}
          />
        );

      case "minimal":
        return (
          <Minimal
            setting={tempSetting}
            index={index}
            setIndex={setIndex}
            input={input}
            setInput={setInput}
          />
        );

      default:
        return <div>오류</div>;
    }
  };

  useEffect(() => {
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
    const storedTheme = getLocalStorage("terminal-type-setting");
    if (storedTheme) {
      toggleTheme(storedTheme.mode);
    }
  }, []);

  console.log(createBackgroundImageStyle(background?.crop, background?.src));

  return (
    <div
      style={{
        ...createBackgroundImageStyle(background?.crop, background?.src),
      }}
      className=" flex justify-center items-center "
    >
      <div className="fixed top-0 p-4 w-full bg-transparent flex items-center justify-between">
        <div className={twMerge(" font-bold text-2xl dark:text-neutral-50 ")}>
          /terminal-type/
        </div>
        <div>
          <Button
            type="text"
            onClick={showModal}
            className="dark:text-neutral-50"
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
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </Button>
          <div className=" flex items-center gap-4"></div>
        </div>
      </div>
      <Suspense fallback={<div>loading..</div>}>{renderTheme(theme)}</Suspense>
      <Modal
        keyboard
        classNames={{
          header: "dark:bg-neutral-800 dark:text-neutral-200",
          content: "dark:bg-neutral-800 dark:text-neutral-200",
        }}
        title={
          <span className=" text-2xl dark:bg-neutral-800 dark:text-neutral-200">
            {isLocal ? "설정" : "Config"}
          </span>
        }
        open={isModalOpen}
        onOk={handleOk}
        footer={
          <div className="flex items-center justify-between">
            <Button
              className={`p-0 m-0`}
              type="link"
              onClick={() => {
                setSystemLang((prv) => {
                  if (prv === "english") return "korean";
                  return "english";
                });
              }}
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
                  d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
                />
              </svg>
            </Button>
            <div className="flex gap-2">
              <Button onClick={handleCancel}>
                {isLocal ? "취소" : "Cancel"}
              </Button>
              <Popconfirm
                title={isLocal ? "설정 저장" : "Save Settings"}
                okButtonProps={{
                  className: "shadow-none bg-neutral-900",
                }}
                description={
                  isLocal
                    ? "이 설정을 유지할까요?"
                    : "Do you want me to keep the settings?"
                }
                onConfirm={handleOk}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" className="bg-neutral-900 shadow-none">
                  {isLocal ? "저장" : "Save"}
                </Button>
              </Popconfirm>
            </div>
          </div>
        }
        onCancel={handleCancel}
        centered
      >
        <div className="flex flex-col items-center w-full justify-between">
          <div className="flex w-full flex-col">
            <div className="w-full flex justify-between">
              <span className=" font-semibold text-lg">
                {isLocal ? "스타일" : "Style"}
              </span>
              <div>
                <Tooltip
                  title={
                    systemLang === "english"
                      ? "The Pro theme does not apply custom colors."
                      : "프로 테마는 사용자 지정 색상이 적용되지 않습니다."
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                    />
                  </svg>
                </Tooltip>
              </div>
            </div>
            <div className="flex flex-col items-center w-full justify-between">
              <ThemeRadio
                selectedTheme={theme}
                setSelectedTheme={setTheme}
                isLocal={isLocal}
              />
            </div>
          </div>
          <Divider />
          <div className="flex w-full flex-col">
            <span className=" font-semibold text-lg">
              {isLocal ? "언어" : "Language"}
            </span>
            <div className="flex flex-col items-center w-full justify-between">
              <LanguageRadio
                selectedLanguage={lang}
                setSelectedLanguage={setLang}
                isLocal={isLocal}
              />
            </div>
          </div>
          <Divider />
          <div className="flex w-full flex-col">
            <span className=" font-semibold text-lg">
              {isLocal ? "색상" : "Color"}
            </span>
            <div className="flex flex-col items-center w-full justify-between">
              <ColorRadio
                selectedColor={color}
                setSelectedColor={setColor}
                isLocal={isLocal}
              />
            </div>
          </div>
          <Divider />
          <div className="flex w-full flex-col ">
            <span className=" font-semibold text-lg">
              {isLocal ? "배경" : "Background"}
            </span>
            <div className="flex flex-col items-center w-full justify-between max-h-[18.5rem] overflow-scroll">
              <CropDemo setBackground={setBackground} />
            </div>
          </div>
          <Divider />
          <div className="flex w-full flex-col">
            <span className=" font-semibold text-lg">
              {isLocal ? "폰트 크기" : "Font Size"}
            </span>
            <div className="flex flex-col items-center w-full justify-between">
              <TextSizeRadio
                selectedFontSize={fontSize}
                setSelectedFontSize={setFontSize}
                isLocal={isLocal}
              />
            </div>
          </div>
          {/* <Divider />
          <div className="flex w-full flex-col">
            <span className=" font-semibold text-lg">
              {isLocal ? "글자 정렬" : "Text Align"}
            </span>
            <div className="flex flex-col items-center w-full justify-between">
              <TextAlignRadio
                selectedTextAlign={textAlign}
                setSelectedTextAlign={setTextAlign}
                isLocal={isLocal}
              />
            </div>
          </div> */}
          <Divider />
          <div className="flex w-full flex-col">
            <span className=" font-semibold text-lg">
              {isLocal ? "시력 보호" : "Dark Mode"}
            </span>
            <div className="flex flex-col items-center w-full justify-between">
              <DarkModeSwitch _setTheme={_setTheme} _theme={_theme} />
            </div>
          </div>
        </div>
      </Modal>
      <FloatButton.Group
        trigger="click"
        type={_theme === "light" ? "default" : "primary"}
        style={{ right: 24 }}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002"
            />
          </svg>
        }
      >
        <FloatButton
          tooltip={"패치내역"}
          onClick={() => setPatchNoteOpen(true)}
        />
        {/* <Tooltip title="Copied!" trigger="click">
          <FloatButton
            tooltip={"공유"}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                />
              </svg>
            }
          />
        </Tooltip> */}
      </FloatButton.Group>
      <PatchNote
        open={patchNoteOpen}
        onCancel={() => setPatchNoteOpen(false)}
      />
    </div>
  );
}
