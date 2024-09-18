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

  // 유니코드를 통해 초성, 중성, 종성을 분리하는 함수
  const decomposeHangul = (syllable: string) => {
    const initialConsonants = [
      "ㄱ",
      "ㄲ",
      "ㄴ",
      "ㄷ",
      "ㄸ",
      "ㄹ",
      "ㅁ",
      "ㅂ",
      "ㅃ",
      "ㅅ",
      "ㅆ",
      "ㅇ",
      "ㅈ",
      "ㅉ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ",
    ];
    const medialVowels = [
      "ㅏ",
      "ㅐ",
      "ㅑ",
      "ㅒ",
      "ㅓ",
      "ㅔ",
      "ㅕ",
      "ㅖ",
      "ㅗ",
      "ㅘ",
      "ㅙ",
      "ㅚ",
      "ㅛ",
      "ㅜ",
      "ㅝ",
      "ㅞ",
      "ㅟ",
      "ㅠ",
      "ㅡ",
      "ㅢ",
      "ㅣ",
    ];
    const finalConsonants = [
      "",
      "ㄱ",
      "ㄲ",
      "ㄳ",
      "ㄴ",
      "ㄵ",
      "ㄶ",
      "ㄷ",
      "ㄹ",
      "ㄺ",
      "ㄻ",
      "ㄼ",
      "ㄽ",
      "ㄾ",
      "ㄿ",
      "ㅀ",
      "ㅁ",
      "ㅂ",
      "ㅄ",
      "ㅅ",
      "ㅆ",
      "ㅇ",
      "ㅈ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ",
    ];

    if (syllable.length === 1 && initialConsonants.includes(syllable)) {
      // 자음(초성)만 입력된 경우
      return {
        initial: syllable,
        medial: undefined,
        final: undefined,
      };
    }

    const baseCode = syllable.charCodeAt(0) - 0xac00;

    const initialIndex = Math.floor(baseCode / 588);
    const medialIndex = Math.floor((baseCode % 588) / 28);
    const finalIndex = baseCode % 28;

    return {
      initial: initialConsonants[initialIndex],
      medial: medialVowels[medialIndex],
      final: finalConsonants[finalIndex],
    };
  };

  // 중성이 결합될 수 있는지 확인하는 함수 (모음 결합 과정)
  const canMedialCombine = (inputMedial: string, targetMedial: string) => {
    const combinationRules = {
      ㅗ: ["ㅘ", "ㅙ", "ㅚ"], // "도" -> "되" -> "된"
      ㅜ: ["ㅝ", "ㅞ", "ㅟ"],
      ㅡ: ["ㅢ"], // "으" -> "의"
    };

    return combinationRules[inputMedial]?.includes(targetMedial);
  };

  // 종성-초성 결합이 가능한지 확인하는 함수
  const canFinalConsonantCombineWithInitial = (
    final: string,
    initial: string
  ) => {
    const combinationRules = {
      ㄱ: ["ㄱ", "ㄲ", "ㅋ", "ㅁ"],
      ㄲ: ["ㄱ", "ㄲ"],
      ㄳ: ["ㄱ", "ㅅ"],
      ㄴ: ["ㄴ", "ㄹ", "ㄵ", "ㄶ"],
      ㄵ: ["ㄴ", "ㅈ"],
      ㄶ: ["ㄴ", "ㅎ"],
      ㄷ: ["ㄷ", "ㅌ"],
      ㄹ: ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅌ", "ㅍ", "ㅎ"],
      ㄺ: ["ㄹ", "ㄱ"],
      ㄻ: ["ㄹ", "ㅁ"],
      ㄼ: ["ㄹ", "ㅂ"],
      ㄽ: ["ㄹ", "ㅅ"],
      ㄾ: ["ㄹ", "ㅌ"],
      ㄿ: ["ㄹ", "ㅍ"],
      ㅀ: ["ㄹ", "ㅎ"],
      ㅁ: ["ㅁ", "ㅂ"],
      ㅂ: ["ㅂ", "ㅃ"],
      ㅄ: ["ㅂ", "ㅅ"],
      ㅅ: ["ㅅ", "ㅆ"],
      ㅆ: ["ㅅ", "ㅆ"],
      ㅇ: ["ㅇ"],
      ㅈ: ["ㅈ", "ㅉ"],
      ㅊ: ["ㅊ"],
      ㅋ: ["ㅋ"],
      ㅌ: ["ㅌ"],
      ㅍ: ["ㅍ"],
      ㅎ: ["ㅎ"],
    };

    return combinationRules[final]?.includes(initial);
  };

  // 겹종성(복합 자음)이 완성되는 과정을 처리하는 함수
  const isPartialFinalMatch = (inputFinal: string, targetFinal: string) => {
    const partialFinals = {
      ㄶ: "ㄴ", // "많"을 입력할 때 "만"이 중간 입력으로 처리되어야 함
      ㄳ: "ㄱ",
      ㄵ: "ㄴ",
      ㄼ: "ㄹ",
      ㄻ: "ㄹ",
      ㄺ: "ㄹ",
      ㅀ: "ㄹ",
      ㅄ: "ㅂ",
    };
    return partialFinals[targetFinal] === inputFinal;
  };

  const calculateColor = (index: number) => {
    if (index >= input.length) {
      return color.normal; // 아직 입력되지 않은 인덱스는 기본 색상
    }

    const inputChar = input[index]; // 사용자가 입력한 문자
    const targetChar = target[index]; // 타겟의 해당 위치 문자

    // 초성, 중성, 종성 분리
    const inputDecomposed = decomposeHangul(inputChar);
    const targetDecomposed = decomposeHangul(targetChar);

    // 초성만 입력되었을 때도 올바른 입력으로 처리
    if (
      inputDecomposed.initial === targetDecomposed.initial &&
      !inputDecomposed.medial &&
      !inputDecomposed.final
    ) {
      return color.accuracy; // 초성만 입력되었을 경우에도 일치
    }

    // 초성, 중성이 일치하고 종성이 입력되지 않은 상태일 경우
    if (
      inputDecomposed.initial === targetDecomposed.initial &&
      inputDecomposed.medial === targetDecomposed.medial &&
      !inputDecomposed.final // 종성이 아직 입력되지 않은 상태일 때
    ) {
      return color.accuracy; // 중간 입력으로 올바르게 처리
    }

    // 모음(중성)이 결합되는 과정인지 확인 (ex. "으" -> "의"로 가는 과정)
    if (
      inputDecomposed.initial === targetDecomposed.initial &&
      !inputDecomposed.final &&
      canMedialCombine(inputDecomposed.medial, targetDecomposed.medial)
    ) {
      return color.accuracy; // 중성이 결합되는 과정도 올바르게 처리
    }

    // 겹종성(복합 자음)이 완성되는 과정인지 확인 (ex. "만" -> "많"으로 가는 과정)
    if (
      inputDecomposed.initial === targetDecomposed.initial &&
      inputDecomposed.medial === targetDecomposed.medial &&
      isPartialFinalMatch(inputDecomposed.final, targetDecomposed.final)
    ) {
      return color.accuracy; // 겹종성이 완성되지 않은 상태도 올바르게 처리
    }

    // 종성이 아직 완성되지 않은 겹종성 상태를 처리
    if (
      inputDecomposed.initial === targetDecomposed.initial &&
      inputDecomposed.medial === targetDecomposed.medial &&
      inputDecomposed.final &&
      !targetDecomposed.final
    ) {
      return color.accuracy; // 겹종성의 중간 단계도 올바른 입력으로 처리
    }

    // 다음 문자의 초성을 고려하여 종성이 결합될 수 있는지 확인
    if (index + 1 < target.length) {
      const nextTargetDecomposed = decomposeHangul(target[index + 1]);

      if (
        inputDecomposed.final &&
        canFinalConsonantCombineWithInitial(
          inputDecomposed.final,
          nextTargetDecomposed.initial
        )
      ) {
        return color.accuracy; // 종성이 다음 초성과 결합 가능한 경우
      }
    }

    // 초성, 중성, 종성이 모두 일치하는지 확인
    const isMatching =
      inputDecomposed.initial === targetDecomposed.initial &&
      inputDecomposed.medial === targetDecomposed.medial &&
      inputDecomposed.final === targetDecomposed.final;

    return isMatching ? color.accuracy : color.inaccuracy;
  };

  return (
    <div>
      {target.split("").map((char, index) => {
        const className = calculateColor(index);
        const textColor = extractTextInBrackets(className);

        return (
          <span key={index} className={className} style={{ color: textColor }}>
            {char}
          </span>
        );
      })}
    </div>
  );
}
