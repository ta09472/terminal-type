import { Radio, RadioChangeEvent } from "antd";
import { FontSize } from "../type/custom";

interface Props {
  selectedFontSize: FontSize;
  setSelectedFontSize: (v: FontSize) => void;
  isLocal: boolean;
}

export default function TextSizeRadio({
  selectedFontSize,
  setSelectedFontSize,
  isLocal,
}: Props) {
  const onChange = (e: RadioChangeEvent) => {
    setSelectedFontSize(e.target.value);
  };

  return (
    <Radio.Group
      onChange={onChange}
      value={selectedFontSize}
      className="flex items-center"
    >
      {/* 
      <Radio
        value={"middle"}
        className=" dark:bg-neutral-800 dark:text-neutral-200"
      >
        {isLocal ? "중간" : "Middle"}
      </Radio> */}
      <Radio
        value={"small"}
        className="  text-[16px] dark:bg-neutral-800 dark:text-neutral-200"
      >
        {isLocal ? "작게" : "Small"}
      </Radio>
      <Radio
        value={"medium"}
        className="text-lg dark:bg-neutral-800 dark:text-neutral-200"
      >
        {isLocal ? "중간" : "Medium"}
      </Radio>
      <Radio
        value={"large"}
        className="text-2xl dark:bg-neutral-800 dark:text-neutral-200"
      >
        {isLocal ? "크게" : "Large"}
      </Radio>
    </Radio.Group>
  );
}
