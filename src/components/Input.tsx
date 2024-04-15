import { useEffect, useRef } from "react";
import sentence from "../contents/sentence";
import { Language } from "../type/custom";

interface Props {
  value: string;
  index: number;
  lang: Language;
  setInput: (v: string) => void;
  setIndex: any;
  className?: string;
}

export default function Input({
  value,
  index,
  lang,
  className = "",
  setIndex,
  setInput,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: { key: string }) => {
      if (event.key === "Escape") {
        setInput("");
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <input
      className={className}
      autoFocus
      ref={inputRef}
      value={value}
      onChange={({ currentTarget }) => {
        if (value.length >= sentence[lang].at(index)!.content.length) return;
        // 공백만 있는 입력을 무시합니다.
        const trimmedValue = currentTarget.value.trim();
        if (trimmedValue === "" && currentTarget.value.includes(" ")) {
          return;
        }
        setInput(currentTarget.value);
      }}
      onKeyDown={({ code }) => {
        if (code === "Escape") {
          setInput("");
        }
        if ((sentence[lang].at(index)?.content.length ?? 0) <= value.length) {
          if (code === "Enter" || code === "Space") {
            setInput(""); // 입력 필드를 비웁니다.
            setIndex((prev: number) => {
              if (prev === sentence[lang].length - 1) {
                return 0;
              }
              return prev + 1;
            });
          }
        }
      }}
    />
  );
}
