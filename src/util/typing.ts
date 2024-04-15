// 타이핑 시작 시간과 종료 시간을 저장할 변수
let startTime: number | null = null;
let endTime: number | null = null;

// 타이핑 테스트를 시작하는 함수
export function startTypingTest(): void {
  startTime = new Date().getTime();
}

// 타이핑 테스트를 종료하고 속도를 계산하는 함수
export function endTypingTest(testText: string): string {
  if (startTime === null) {
    return "테스트를 시작하지 않았습니다.";
  }

  endTime = new Date().getTime();
  const duration = (endTime - startTime) / 60000; // 밀리초 단위의 시간을 분 단위로 변환
  const wordCount = testText.split(/\s+/).length;
  const wpm = wordCount / duration;

  // 테스트 초기화
  startTime = null;
  endTime = null;

  return `당신의 타이핑 속도는 분당 ${wpm.toFixed(2)}단어입니다.`;
}

// 예제 사용:
startTypingTest();
// 사용자가 텍스트를 모두 입력한 후 `endTypingTest` 함수를 호출합니다.
const result = endTypingTest("빠른 갈색 여우가 게으른 개를 뛰어넘습니다.");
