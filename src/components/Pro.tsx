/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Accuracy from "./Accuracy";
import sentence from "../contents/sentence";
import Input from "./Input";
import { DefaultSetting, Language } from "../type/custom";
import { getAuthorFontSize, getFontSize } from "../util/font";
import { twMerge } from "tailwind-merge";
import { extractTextInBrackets } from "../util/color";

interface Props {
  index: number;
  input: string;
  setInput: (v: string) => void;
  setIndex: any;
  setting: DefaultSetting;
}

export default function Pro({
  index,
  input,
  setIndex,
  setInput,
  setting,
}: Props) {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen gap-4  dark:bg-neutral-800">
      <div
        className={` dark:text-neutral-200 ${getAuthorFontSize(
          setting.fontSize
        )}`}
        style={{
          color: `${extractTextInBrackets(setting.color.accuracy)}`,
        }}
      >
        - {sentence[setting.language].at(index)?.author} -
      </div>
      <Accuracy
        target={sentence[setting.language].at(index)?.content}
        input={input}
        color={{
          accuracy: twMerge(
            getFontSize(setting.fontSize),
            "dark:text-neutral-50",
            setting.color.accuracy
          ),
          normal: twMerge(
            getFontSize(setting.fontSize),
            // "text-neutral-400",
            setting.color.normal
          ),

          inaccuracy: twMerge(
            getFontSize(setting.fontSize),
            setting.color.inaccuracy
          ),
        }}
      />
      <div className="bg-black rounded-lg min-w-[22rem] lg:min-w-[45rem] flex gap-2 items-center mb-12">
        <div
          className={`pl-2 text-white ${getFontSize(
            setting.fontSize
          )} mb-[0.125rem]`}
        >
          {">_"}
        </div>
        <Input
          className={`w-full p-2 bg-transparent text-white font-light ${getFontSize(
            setting.fontSize
          )}`}
          value={input}
          setIndex={setIndex}
          setInput={setInput}
          index={index}
          lang={setting.language}
        />
      </div>
    </div>
  );
}
