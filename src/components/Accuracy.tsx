import { extractTextInBrackets } from "../util/color";
import {
  checkCombinedFinal,
  checkCombinedVowel,
  toKorChars,
} from "../util/typing";

interface Props {
  target: string | undefined;
  input: string;
  color?: {
    normal: string;
    accuracy: string;
    inaccuracy: string;
  };
}

export default function Accuracy({
  target,
  input,
  color = {
    normal: "text-gray-400",
    accuracy: "text-black",
    inaccuracy: "text-red-500",
  },
}: Props) {
  const { normal, accuracy, inaccuracy } = color;

  if (!target) return null;

  const targetDecomposed = toKorChars(target).map((char) => ({ ...char }));
  const inputDecomposed = toKorChars(input);

  const calculateColor = (index: number) => {
    if (index >= inputDecomposed.length) {
      return color.normal; // 아직 입력되지 않은 인덱스
    }

    const inputChar = inputDecomposed[index];
    const targetChar = targetDecomposed[index];
    const nextTargetChar =
      index + 1 < targetDecomposed.length ? targetDecomposed[index + 1] : null;

    // 모든 조건을 종합하여 정확도를 계산
    // const isCurrentInputMatching =
    //   inputChar.initial === targetChar.initial &&
    //   checkCombinedVowel(inputChar.vowel, targetChar.vowel) &&
    //   checkCombinedFinal(inputChar.final, targetChar.final);

    // // 현재 문자의 종성과 다음 문자의 초성 조합을 고려하여 정확도 계산
    // const isNextInitialMatching =
    //   nextTargetChar &&
    //   inputChar.final &&
    //   (inputChar.final === nextTargetChar.initial ||
    //     checkCombinedFinal(inputChar.final, nextTargetChar.initial));

    // 조합 가능한 종성과 초성인 경우 정확도 확인

    // const combinedFinalMatching =
    //   nextTargetChar &&
    //   checkCombinedFinal(inputChar.final, nextTargetChar.initial);

    // targetChar의 종성이 존재하지 않고 현재 입력중인 input의 종성이 nextTargetChar의 초성과 같으면 accuracy이지만 현재 입력중이 아닌 그러니까 index-1인 inputChar과 targetChar이 일치하지 않으면 inaccuracy이다.
    // targetChar의 종성이 존재하고 현재 입력중인 input의 종성이 nextTargetChar의 초성을 포함하고 있으면 accuracy이고 아니라면 inaccuracy이지만 현재 입력중이 아닌 그러니까 index-1인 inputChar과 targetChar이 일치하지 않으면 inaccuracy이다.

    if (index !== inputDecomposed.length - 1) {
      const matches =
        inputChar.initial === targetChar.initial &&
        checkCombinedVowel(inputChar.vowel, targetChar.vowel) &&
        checkCombinedFinal(inputChar.final, targetChar.final);

      return matches ? color.accuracy : color.inaccuracy;
    } else {
      if (
        inputChar.initial === targetChar.initial &&
        inputChar.vowel === targetChar.vowel
      ) {
        // 대상종성이 없고 입력종성이 없을떄
        if (targetChar.final === undefined && inputChar.final === undefined) {
          if (
            (nextTargetChar && nextTargetChar.initial === inputChar.final) ||
            inputChar.final === undefined
          ) {
            // if (!inputChar.final && targetChar.final !== inputChar.final) {
            //   return color.inaccuracy;
            // }
            return color.accuracy;
          }

          return color.inaccuracy;
        } else {
          // 대상 종성이 있고 입력종성이 있을때

          return color.accuracy;
        }
      }

      // 입력이 완료된 인덱스에 대해서는 기존 로직을 적용
      const matches =
        inputChar.initial === targetChar.initial &&
        (checkCombinedVowel(inputChar.vowel, targetChar.vowel) ||
          inputChar.vowel === undefined) &&
        (checkCombinedFinal(inputChar.final, targetChar.final) ||
          inputChar.final === undefined);

      // if (isNextInitialMatching) {
      //   return isCurrentInputMatching ? color.accuracy : color.inaccuracy;
      // }

      return matches ? color.accuracy : color.inaccuracy;
    }
  };

  return (
    <div>
      {target.split("").map((char, index) => {
        if (index < input.length) {
          // 사용자가 입력한 문자열의 인덱스가 현재 인덱스보다 큰 경우
          if (index < input.length - 1) {
            // 입력 중인 인덱스보다 이전이며 정답과 다른 문자열은 빨간색으로 표현
            const className = char === input[index] ? accuracy : inaccuracy;
            const textColor = extractTextInBrackets(calculateColor(index));

            if (char === " " && char !== input[index])
              return (
                <span
                  key={index}
                  className={inaccuracy}
                  style={{ color: textColor }}
                >
                  _
                </span>
              );
            return (
              <span
                key={index}
                className={className}
                style={{ color: textColor }}
              >
                {char}
              </span>
            );
          } else {
            // 사용자가 입력 중인 인덱스의 문자열은 기본색상으로 표현

            if (char === input[index])
              return (
                <span
                  key={index}
                  className={accuracy}
                  style={{ color: extractTextInBrackets(accuracy) }}
                >
                  {char}
                </span>
              );
            return (
              <span
                key={index}
                className={normal}
                style={{ color: extractTextInBrackets(normal) }}
              >
                {char}
              </span>
            );
          }
        }

        // 사용자가 아직 입력하지 않은 부분은 기본 색상으로 표시
        return (
          <span
            key={index}
            className={normal}
            style={{ color: extractTextInBrackets(normal) }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}
