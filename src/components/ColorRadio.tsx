import { ColorPicker, Space } from "antd";
import { Color } from "../type/custom";
import { extractTextInBrackets } from "../util/color";

interface Props {
  selectedColor: Color;
  setSelectedColor: React.Dispatch<React.SetStateAction<Color>>;
  isLocal: boolean;
}

export default function ColorRadio({
  selectedColor,
  setSelectedColor,
  isLocal,
}: Props) {
  const onChange = (key: string, value: string) => {
    setSelectedColor((prev: Color) => {
      return { ...prev, [key]: `text-[${value}]` } as Color;
    });
  };

  return (
    <div className="flex w-full justify-evenly">
      <Space direction="vertical" className=" flex flex-col items-center">
        {isLocal ? "기본 문자" : "Normal"}
        <ColorPicker
          format="hex"
          value={extractTextInBrackets(selectedColor.normal)}
          onChange={(_, hex) => onChange("normal", hex)}
        />
      </Space>
      <Space direction="vertical" className=" flex flex-col items-center">
        {isLocal ? "정확한 문자" : "Accuracy"}
        <ColorPicker
          format="hex"
          value={extractTextInBrackets(selectedColor.accuracy)}
          onChange={(_, hex) => onChange("accuracy", hex)}
        />
      </Space>
      <Space direction="vertical" className=" flex flex-col items-center">
        {isLocal ? "부정확한 문자" : "Inaccuracy"}
        <ColorPicker
          format="hex"
          value={extractTextInBrackets(selectedColor.inaccuracy)}
          onChange={(_, hex) => onChange("inaccuracy", hex)}
        />
      </Space>
    </div>
  );
}
