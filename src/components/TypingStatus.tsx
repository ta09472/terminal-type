import { Button, Popover } from "antd";
import { useEffect, useState } from "react";

import Draggable from "react-draggable";

type TypingStats = {
  wpm: number;
  cpm: number;
  acc: number;
};

interface Props {
  input: string;
  target: string;
  isLocal: boolean;
  onClick: () => void;
}

export default function TypingStatus({
  input,
  target,
  onClick,
  isLocal,
}: Props) {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [typingStats, setTypingStats] = useState<TypingStats>({
    wpm: 0,
    cpm: 0,
    acc: 0,
  });
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timer, setTimer] = useState<number | null>(null);

  // Start timing when input starts
  useEffect(() => {
    if (input.length === 1 && !startTime) {
      setStartTime(Date.now());
      const newTimer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
      setTimer(newTimer);
    } else if (input.length === 0 && startTime) {
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }
      setStartTime(null);
      setElapsedTime(0);
    }
  }, [input]);

  // Calculate typing stats when input or elapsedTime changes
  useEffect(() => {
    if (input && startTime) {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 1000;
      setTypingStats(calculateTypingStats(input, target, elapsedTime));
    }
  }, [input, elapsedTime]);

  function calculateTypingStats(
    typedText: string,
    referenceText: string,
    elapsedTime: number
  ): TypingStats {
    const charsTyped = typedText.length;
    const correctChars = typedText.split("").reduce((acc, char, index) => {
      return (
        acc +
        (index < referenceText.length && char === referenceText[index] ? 1 : 0)
      );
    }, 0);

    const wpm = charsTyped / 5 / (elapsedTime / 60);
    const cpm = charsTyped / (elapsedTime / 60);
    const accuracy = charsTyped > 0 ? (correctChars / charsTyped) * 100 : 0;

    return {
      wpm: parseFloat(wpm.toFixed(0)),
      cpm: parseFloat(cpm.toFixed(0)),
      acc: parseFloat(accuracy.toFixed(0)),
    };
  }

  return (
    <Draggable>
      <div className="hover:bg-neutral-100 hover:dark:bg-neutral-700 z-[1000] p-2  bg-transparent rounded-md fixed top-44 right-28 cursor-move">
        <div className="flex justify-between items-center">
          <div>
            <Popover
              title={
                <div>
                  {isLocal ? "이번에만 숨깁니다." : "Hide this time."}
                  <div className="flex items-center">
                    {isLocal
                      ? "설정에서 변경사항을 저장할 수 있습니다."
                      : "You can save the changes in Settings."}
                  </div>
                </div>
              }
            >
              <Button
                type="text"
                onClick={onClick}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 dark:text-neutral-50"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                }
              />
            </Popover>
          </div>
        </div>
        <div className="pl-2 w-[10rem]">
          <div
            className="flex items-center"
            // style={{
            //   color: extractTextInBrackets(color.accuracy),
            // }}
          >
            <div className="w-[4rem]  dark:text-neutral-50 flex flex-col">
              <div>WPM</div>
              <div>{typingStats.wpm}</div>
            </div>
            <div className="w-[4rem]  dark:text-neutral-50 flex flex-col">
              <div>CPM</div>
              <div>{typingStats.cpm}</div>
            </div>
            <div className="w-[4rem]  dark:text-neutral-50 flex flex-col">
              <div>ACC</div> <div>{typingStats.acc}%</div>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
}
