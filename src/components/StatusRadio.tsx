import { Radio, RadioChangeEvent } from "antd";
import { Status } from "../type/custom";

interface Props {
  isLocal: boolean;
  status: Status;
  setStatus: (v: Status) => void;
}

export default function StatusRadio({ status, setStatus, isLocal }: Props) {
  const onChange = (e: RadioChangeEvent) => {
    setStatus(e.target.value);
  };
  return (
    <Radio.Group
      className="flex items-center"
      onChange={onChange}
      value={status}
    >
      <Radio
        value="active"
        className="  text-[16px] dark:bg-neutral-800 dark:text-neutral-200"
      >
        {isLocal ? "활성화" : "Active"}
      </Radio>
      <Radio
        value="inactive"
        className="  text-[16px] dark:bg-neutral-800 dark:text-neutral-200"
      >
        {isLocal ? "비활성화" : "Inactive"}
      </Radio>
    </Radio.Group>
  );
}
