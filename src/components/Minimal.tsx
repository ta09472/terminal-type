import sentence from "../contents/sentence";
import Input from "./Input";
import { DefaultSetting } from "../type/custom";
import { getAuthorFontSize, getFontSize } from "../util/font";
import NewAccuracy from "./NewAccuracy";
import { twMerge } from "tailwind-merge";
import Test from "./Test";

interface Props {
  index: number;
  input: string;
  setInput: (v: string) => void;
  setIndex: unknown;
  setting: DefaultSetting;
}

export default function Minimal({
  index,
  input,
  setIndex,
  setInput,
  setting,
}: Props) {
  const fontSize = getFontSize(setting.fontSize);
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen gap-4 dark:bg-neutral-800">
      <div className="flex flex-col gap-4 w-min-[40rem] items-center lg:items-start">
        <div
          className={`text-md text-neutral-500 -skew-x-6 ml-2 dark:text-neutral-500 ${getAuthorFontSize(
            setting.fontSize
          )}`}
        >
          {sentence[setting.language].at(index - 1)?.content}
        </div>
        <div className="relative ">
          <div
            className={`flex-none font-semibold  ${getFontSize(
              setting.fontSize
            )}`}
          >
            {setting.language === "korean" ? (
              <Test
                color={{
                  accuracy: twMerge(
                    fontSize,
                    "dark:text-neutral-50 ",
                    setting.color.accuracy
                  ),
                  normal: twMerge(fontSize, setting.color.normal),
                  inaccuracy: twMerge(fontSize, setting.color.inaccuracy),
                }}
                target={sentence[setting.language].at(index)?.content}
                input={input}
              />
            ) : (
              <NewAccuracy
                language="english"
                color={{
                  accuracy: twMerge(
                    fontSize,
                    "dark:text-neutral-50 ",
                    setting.color.accuracy
                  ),
                  normal: twMerge(fontSize, setting.color.normal),
                  inaccuracy: twMerge(fontSize, setting.color.inaccuracy),
                }}
                target={sentence[setting.language].at(index)?.content}
                input={input}
              />
            )}
          </div>
          <Input
            className={`flex-1 bg-transparent font-semibold text-transparent absolute top-0 left-0 w-full caret-neutral-400 ${getFontSize(
              setting.fontSize
            )}`}
            value={input}
            setIndex={setIndex}
            setInput={setInput}
            index={index}
            lang={setting.language}
          />
        </div>
        <div
          className={`text-md text-neutral-400 skew-x-6 ml-2 dark:text-neutral-600 ${getAuthorFontSize(
            setting.fontSize
          )}`}
        >
          {sentence[setting.language].at(index + 1)?.content}
        </div>
      </div>
    </div>
  );
}
