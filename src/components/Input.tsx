import { useEffect, useRef } from "react";
import sentence from "../contents/sentence";

interface Props {
  value: string;
  index: number;
  lang: "english" | "korean";
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
        // if (value.length === 0) {
        //   if (currentTarget.value === " ") {
        //     return;
        //   }
        // }
        setInput(currentTarget.value);
      }}
      onKeyDown={({ code }) => {
        if (code === "Escape") {
          setInput("");
        }
        if ((sentence[lang].at(index)?.content.length ?? 0) <= value.length) {
          // if (code === "Enter" || code === "Space") {
          if (code === "Enter") {
            setInput("");
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
