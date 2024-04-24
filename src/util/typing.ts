// export function toKorChars(input) {
//   if (!input) return [];
//   const cCho = [
//     "ㄱ",
//     "ㄲ",
//     "ㄴ",
//     "ㄷ",
//     "ㄸ",
//     "ㄹ",
//     "ㅁ",
//     "ㅂ",
//     "ㅃ",
//     "ㅅ",
//     "ㅆ",
//     "ㅇ",
//     "ㅈ",
//     "ㅉ",
//     "ㅊ",
//     "ㅋ",
//     "ㅌ",
//     "ㅍ",
//     "ㅎ",
//   ];
//   const cJung = [
//     "ㅏ",
//     "ㅐ",
//     "ㅑ",
//     "ㅒ",
//     "ㅓ",
//     "ㅔ",
//     "ㅕ",
//     "ㅖ",
//     "ㅗ",
//     "ㅘ",
//     "ㅙ",
//     "ㅚ",
//     "ㅛ",
//     "ㅜ",
//     "ㅝ",
//     "ㅞ",
//     "ㅟ",
//     "ㅠ",
//     "ㅡ",
//     "ㅢ",
//     "ㅣ",
//   ];
//   const cJong = [
//     "",
//     "ㄱ",
//     "ㄲ",
//     "ㄳ",
//     "ㄴ",
//     "ㄵ",
//     "ㄶ",
//     "ㄷ",
//     "ㄹ",
//     "ㄺ",
//     "ㄻ",
//     "ㄼ",
//     "ㄽ",
//     "ㄾ",
//     "ㄿ",
//     "ㅀ",
//     "ㅁ",
//     "ㅂ",
//     "ㅄ",
//     "ㅅ",
//     "ㅆ",
//     "ㅇ",
//     "ㅈ",
//     "ㅊ",
//     "ㅋ",
//     "ㅌ",
//     "ㅍ",
//     "ㅎ",
//   ];

//   let chars = [];

//   for (let i = 0; i < input.length; i++) {
//     const cCode = input.charCodeAt(i);

//     // 한글 완성형 범위 내
//     if (cCode >= 0xac00 && cCode <= 0xd7a3) {
//       let offset = cCode - 0xac00;
//       const jong = offset % 28; // 종성
//       offset = (offset - jong) / 28;
//       const jung = offset % 21; // 중성
//       const cho = (offset - jung) / 21; // 초성

//       let obj = {
//         initial: cCho[cho],
//         vowel: cJung[jung],
//         final: jong ? cJong[jong] : undefined, // 종성이 없는 경우 undefined
//       };

//       // 다음 문자의 초성 찾기
//       if (i + 1 < input.length) {
//         const nextCode = input.charCodeAt(i + 1);
//         if (nextCode >= 0xac00 && nextCode <= 0xd7a3) {
//           let nextOffset = nextCode - 0xac00;
//           const nextJong = nextOffset % 28;
//           nextOffset = (nextOffset - nextJong) / 28;
//           const nextJung = nextOffset % 21;
//           const nextCho = (nextOffset - nextJung) / 21;
//           obj.spare = cCho[nextCho];
//         }
//       }

//       chars.push(obj);
//     } else if (
//       (cCode >= 0x3131 && cCode <= 0x314e) ||
//       (cCode >= 0x314f && cCode <= 0x3163)
//     ) {
//       // 한글 자모 범위 내
//       let foundCho = cCho.find((ch) => ch.charCodeAt(0) === cCode);
//       let foundJung = cJung.find((j) => j.charCodeAt(0) === cCode);

//       let obj = {
//         initial: foundCho ? foundCho : undefined,
//         vowel: foundJung ? foundJung : undefined,
//         final: undefined,
//       };

//       // 다음 문자의 초성 찾기
//       if (i + 1 < input.length) {
//         const nextCode = input.charCodeAt(i + 1);
//         if (nextCode >= 0x3131 && nextCode <= 0x314e) {
//           let nextCho = cCho.find((ch) => ch.charCodeAt(0) === nextCode);
//           if (nextCho) obj.spare = nextCho;
//         }
//       }

//       chars.push(obj);
//     }
//   }

//   return chars;
// }

export function toKorChars(input) {
  if (!input) return [];
  const cCho = [
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
  const cJung = [
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
  const cJong = [
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

  let chars = [];

  for (let i = 0; i < input.length; i++) {
    const cCode = input.charCodeAt(i);

    // 한글 완성형 범위 내
    if (cCode >= 0xac00 && cCode <= 0xd7a3) {
      let offset = cCode - 0xac00;
      const jong = offset % 28; // 종성
      offset = (offset - jong) / 28;
      const jung = offset % 21; // 중성
      const cho = (offset - jung) / 21; // 초성

      let obj = {
        initial: cCho[cho],
        vowel: cJung[jung],
        final: jong ? cJong[jong] : undefined, // 종성이 없는 경우 undefined
      };

      chars.push(obj);
    } else if (
      (cCode >= 0x3131 && cCode <= 0x314e) ||
      (cCode >= 0x314f && cCode <= 0x3163)
    ) {
      // 한글 자모 범위 내
      let foundCho = cCho.find((ch) => ch.charCodeAt(0) === cCode);
      let foundJung = cJung.find((j) => j.charCodeAt(0) === cCode);

      let obj = {
        initial: foundCho ? foundCho : undefined,
        vowel: foundJung ? foundJung : undefined,
        final: undefined,
      };

      chars.push(obj);
    } else {
      // 공백이나 특수 문자인 경우
      chars.push(input.charAt(i));
    }
  }

  return chars;
}

// 조합형 중성과 종성을 확인하고 처리하는 로직
export const checkCombinedVowel = (inputVowel, targetVowel) => {
  const vowelCombinations = {
    ㅘ: ["ㅗ", "ㅏ"],
    ㅙ: ["ㅗ", "ㅐ"],
    ㅚ: ["ㅗ", "ㅣ"],
    ㅝ: ["ㅜ", "ㅓ"],
    ㅞ: ["ㅜ", "ㅔ"],
    ㅟ: ["ㅜ", "ㅣ"],
    ㅢ: ["ㅡ", "ㅣ"],
  };

  return (
    targetVowel === inputVowel ||
    (vowelCombinations[targetVowel] &&
      vowelCombinations[targetVowel].includes(inputVowel))
  );
};

export const checkCombinedFinal = (inputFinal, targetFinal) => {
  const finalCombinations = {
    ㄳ: ["ㄱ", "ㅅ"],
    ㄵ: ["ㄴ", "ㅈ"],
    ㄶ: ["ㄴ", "ㅎ"],
    ㄺ: ["ㄹ", "ㄱ"],
    ㄻ: ["ㄹ", "ㅁ"],
    ㄼ: ["ㄹ", "ㅂ"],
    ㄽ: ["ㄹ", "ㅅ"],
    ㄾ: ["ㄹ", "ㅌ"],
    ㄿ: ["ㄹ", "ㅍ"],
    ㅀ: ["ㄹ", "ㅎ"],
    ㅄ: ["ㅂ", "ㅅ"],
  };

  return (
    targetFinal === inputFinal ||
    (finalCombinations[targetFinal] &&
      finalCombinations[targetFinal].includes(inputFinal))
  );
};

export const ejectFinal = (targetFinal: string) => {
  const finalCombinations = {
    ㄳ: ["ㄱ", "ㅅ"],
    ㄵ: ["ㄴ", "ㅈ"],
    ㄶ: ["ㄴ", "ㅎ"],
    ㄺ: ["ㄹ", "ㄱ"],
    ㄻ: ["ㄹ", "ㅁ"],
    ㄼ: ["ㄹ", "ㅂ"],
    ㄽ: ["ㄹ", "ㅅ"],
    ㄾ: ["ㄹ", "ㅌ"],
    ㄿ: ["ㄹ", "ㅍ"],
    ㅀ: ["ㄹ", "ㅎ"],
    ㅄ: ["ㅂ", "ㅅ"],
  };

  return finalCombinations[targetFinal];
};
