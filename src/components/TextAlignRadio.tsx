import { Radio, RadioChangeEvent } from "antd";
import { TextAlign } from "../type/custom";

interface Props {
  selectedTextAlign: TextAlign;
  setSelectedTextAlign: (v: TextAlign) => void;
  isLocal: boolean;
}

export default function TextAlignRadio({
  selectedTextAlign,
  setSelectedTextAlign,
  isLocal,
}: Props) {
  const onChange = (e: RadioChangeEvent) => {
    setSelectedTextAlign(e.target.value);
  };

  return (
    <Radio.Group onChange={onChange} value={selectedTextAlign}>
      <Radio
        value={"left"}
        className="dark:bg-neutral-800 dark:text-neutral-200"
      >
        {isLocal ? "왼쪽 정렬" : "Left Align"}
      </Radio>
      <Radio
        value={"center"}
        className="dark:bg-neutral-800 dark:text-neutral-200"
      >
        {isLocal ? "중앙 정렬" : "Center Align"}
      </Radio>
    </Radio.Group>
  );
}
