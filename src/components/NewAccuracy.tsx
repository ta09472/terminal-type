import { Language } from "../type/custom";
import { extractTextInBrackets } from "../util/color";

interface Props {
  language: Language;
  target: string | undefined;
  input: string;
  color?: {
    normal: string;
    accuracy: string;
    inaccuracy: string;
  };
}

const getKoreanCharIndices = (char: string) => {
  const base = char.charCodeAt(0) - 0xac00;
  return {
    초성: Math.floor(base / 588),
    중성: Math.floor((base % 588) / 28),
    종성: base % 28,
  };
};

const isHangul = (char: string) => {
  return char.charCodeAt(0) >= 0xac00 && char.charCodeAt(0) <= 0xd7a3;
};

export default function Accuracy({
  target,
  input,
  color = {
    normal: "text-gray-400",
    accuracy: "text-black",
    inaccuracy: "text-red-500",
  },
}: Props) {
  if (!target) return null;

  return (
    <div>
      {target.split("").map((char, index) => {
        if (index >= input.length) {
          return (
            <span
              key={index}
              className={color.normal}
              style={{ color: extractTextInBrackets(color.normal) }}
            >
              {char}
            </span>
          );
        }

        const inputChar = input[index];
        const targetIndices = isHangul(char)
          ? getKoreanCharIndices(char)
          : { 초성: "", 중성: "", 종성: "" };
        const inputIndices = isHangul(inputChar)
          ? getKoreanCharIndices(inputChar)
          : { 초성: "", 중성: "", 종성: "" };

        // Default color set to normal, adjusted below
        let className = color.normal;
        let textColor = extractTextInBrackets(color.normal);

        if (inputChar === " ") {
          if (char !== inputChar) {
            return (
              <span
                key={index}
                className={color.inaccuracy}
                style={{ color: extractTextInBrackets(color.inaccuracy) }}
              >
                _
              </span>
            ); // Incorrect space input shown as "_"
          }
          className = color.normal; // Correct space input keeps the normal color
          textColor = extractTextInBrackets(color.normal);
        } else {
          // Apply accuracy color to the currently being typed character
          if (index === input.length - 1) {
            textColor = extractTextInBrackets(color.accuracy);
            className = color.accuracy;
          } else {
            // For previously entered characters, check for full match or Hangul component match
            if (
              char === inputChar ||
              (isHangul(char) &&
                isHangul(inputChar) &&
                targetIndices.초성 === inputIndices.초성 &&
                targetIndices.중성 === inputIndices.중성 &&
                targetIndices.종성 === inputIndices.종성)
            ) {
              textColor = extractTextInBrackets(color.accuracy);
              className = color.accuracy;
            } else {
              textColor = extractTextInBrackets(color.inaccuracy);
              className = color.inaccuracy;
            }
          }
        }

        return (
          <span key={index} className={className} style={{ color: textColor }}>
            {inputChar}
          </span>
        );
      })}
    </div>
  );
}
