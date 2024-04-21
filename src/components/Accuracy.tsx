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
  return (
    <div>
      {target.split("").map((char, index) => {
        if (index < input.length) {
          // 사용자가 입력한 문자열의 인덱스가 현재 인덱스보다 큰 경우
          if (index < input.length - 1) {
            // 입력 중인 인덱스보다 이전이며 정답과 다른 문자열은 빨간색으로 표현
            const className = char === input[index] ? accuracy : inaccuracy;
            const textColor =
              char === input[index]
                ? extractTextInBrackets(accuracy)
                : extractTextInBrackets(inaccuracy);

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
