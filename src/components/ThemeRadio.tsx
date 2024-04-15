import { Radio, RadioChangeEvent } from "antd";
import { Theme } from "../type/custom";

interface Props {
  selectedTheme: Theme;
  setSelectedTheme: (v: Theme) => void;
  isLocal: boolean;
}

export default function ThemeRadio({
  selectedTheme,
  setSelectedTheme,
  isLocal,
}: Props) {
  const onChange = (e: RadioChangeEvent) => {
    setSelectedTheme(e.target.value);
  };

  return (
    <Radio.Group onChange={onChange} value={selectedTheme}>
      <Radio
        value={"basic"}
        className="dark:bg-neutral-800 dark:text-neutral-50"
      >
        {isLocal ? "베이직" : "Basic"}
      </Radio>
      <Radio value={"pro"} className="dark:bg-neutral-800 dark:text-neutral-50">
        {isLocal ? "프로" : "Pro"}
      </Radio>
      <Radio
        value={"minimal"}
        className="dark:bg-neutral-800 dark:text-neutral-50"
      >
        {isLocal ? "미니멀" : "Minimal"}
      </Radio>
    </Radio.Group>
  );
}
