import { ColorPicker, Space } from "antd";
import { useState } from "react";
import { Color } from "../type/custom";

interface Props {
  selectedColor: Color;
  setSelectedColor: (v: Color) => void;
  isLocal: boolean;
}

export default function ColorRadio({
  selectedColor,
  setSelectedColor,
  isLocal,
}: Props) {
  const [temp, setTemp] = useState<Color>(selectedColor);

  const onChange = (key: string, value: string) => {
    setTemp((prev) => {
      return { ...prev, [key]: `text-[${value}]` };
    });
    setSelectedColor(temp);
  };

  function extractTextInBrackets(str: string) {
    const regex = /\[([^\]]+)\]/g;
    const matches = str.match(regex);

    return (matches ? matches.map((match: any) => match.slice(1, -1)) : []).at(
      0
    );
  }

  return (
    <div className="flex w-full justify-evenly">
      <Space direction="vertical" className=" flex flex-col items-center">
        {isLocal ? "기본 문자" : "Normal"}
        <ColorPicker
          format="hex"
          defaultValue={extractTextInBrackets(selectedColor.normal)}
          onChange={(_, hex) => onChange("normal", hex)}
        />
      </Space>
      <Space direction="vertical" className=" flex flex-col items-center">
        {isLocal ? "정확한 문자" : "Accuracy"}
        <ColorPicker
          format="hex"
          defaultValue={extractTextInBrackets(selectedColor.accuracy)}
          onChange={(_, hex) => onChange("accuracy", hex)}
        />
      </Space>
      <Space direction="vertical" className=" flex flex-col items-center">
        {isLocal ? "부정확한 문자" : "Inaccuracy"}
        <ColorPicker
          format="hex"
          defaultValue={extractTextInBrackets(selectedColor.inaccuracy)}
          onChange={(_, hex) => onChange("Inaccuracy", hex)}
        />
      </Space>
    </div>
  );
}
