import { Radio, RadioChangeEvent } from "antd";
import { Language } from "../type/custom";

interface Props {
  selectedLanguage: Language;
  setSelectedLanguage: (v: Language) => void;
  isLocal: boolean;
}

export default function LanguageRadio({
  selectedLanguage,
  setSelectedLanguage,
  isLocal,
}: Props) {
  const onChange = (e: RadioChangeEvent) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <Radio.Group onChange={onChange} value={selectedLanguage}>
      <Radio
        value={"korean"}
        className="dark:bg-neutral-800 dark:text-neutral-200"
      >
        {isLocal ? "한국어" : "Korean"}
      </Radio>
      <Radio
        value={"english"}
        className="dark:bg-neutral-800 dark:text-neutral-200"
      >
        {isLocal ? "영어" : "English"}
      </Radio>
    </Radio.Group>
  );
}
