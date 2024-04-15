import { Modal } from "antd";

interface Props {
  open: boolean;
  onCancel: () => void;
}
export default function PatchNote({ open, onCancel }: Props) {
  return (
    <Modal open={open} footer={null} centered onCancel={onCancel}>
      <div className="text-lg flex-col text-neutral-800">
        <div className=" overflow-auto px-9 flex-col gap-4">
          <div className="mb-4">
            <div className="pb-4 font-semibold">0.3 패치내역</div>
            <div className="text-base flex flex-col gap-4">
              <div>
                - 일반 글자, 정확한 글자, 부정확한 글자의 색상을 사용자가 변경할
                수 있게 되었습니다.
              </div>
            </div>
          </div>
          <div>
            <div className="pb-4">0.2 패치내역</div>
            <div className="text-base flex flex-col gap-4">
              <div>- 스페이스바로 줄바꿈이 가능해졌습니다.</div>
              <div>- 현재 입력중인 문자를 확인 할 수 있게 되었습니다.</div>
              <div>- 이전에 변경한 설정사항을 저장할 수 있게 되었습니다.</div>
              <div>- 폰트 크기를 조절할 수 있게 되었습니다.</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
