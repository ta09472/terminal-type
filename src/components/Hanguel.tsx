import * as Hangul from "hangul-js";
import {
  checkCombinedFinal,
  checkCombinedVowel,
  toKorChars,
} from "../util/typing";
import { extractTextInBrackets } from "../util/color";

interface Props {
  target: string | undefined;
  input: string;
  color?: {
    normal: string;
    accuracy: string;
    inaccuracy: string;
  };
}

export default function Hanguel({
  target,
  input,
  color = {
    normal: "text-gray-400",
    accuracy: "text-black",
    inaccuracy: "text-red-500",
  },
}: Props) {
  if (!target) return null;

  console.log(target.split("").map((v) => Hangul.disassemble(v)));
  console.log(input.split("").map((v) => Hangul.disassemble(v)));

  //   console.log(Hangul.disassemble(target));

  //   console.log(Hangul.disassemble(input));

  return <div>{target}</div>;
}
