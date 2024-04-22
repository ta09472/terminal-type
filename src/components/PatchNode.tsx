import { Modal } from "antd";

interface Props {
  open: boolean;
  isLocal: boolean;
  onCancel: () => void;
}
export default function PatchNote({ open, onCancel, isLocal }: Props) {
  return (
    <Modal open={open} footer={null} centered onCancel={onCancel}>
      {isLocal ? (
        <div className="text-lg flex-col text-neutral-800">
          <div className=" overflow-auto px-9 flex-col gap-4">
            <div className="mb-4">
              <div className="pb-4 font-semibold">0.41 패치내역</div>
              <div className="text-base flex flex-col gap-4">
                <div>
                  - 프로 모드에서도 이제 사용자 설정 텍스트 색상이 적용됩니다.
                  <br />- 주어진 문장보다 입력한 글자수가 클 경우 더이상 문자가
                  입력되지 않던 문제가 해결되었습니다.
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="pb-4">0.4 패치내역</div>
              <div className="text-base flex flex-col gap-4">
                <div>
                  - (실험적 기능) 배경화면에 이미지를 삽입할 수 있게 되었습니다.
                  1920 x 1080 크기 이상의 이미지를 사용하기를 권장합니다.
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="pb-4">0.3 패치내역</div>
              <div className="text-base flex flex-col gap-4">
                <div>
                  - 일반 글자, 정확한 글자, 부정확한 글자의 색상을 사용자가
                  변경할 수 있게 되었습니다.
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
      ) : (
        <div className="text-lg flex-col text-neutral-800">
          <div className=" overflow-auto px-9 flex-col gap-4">
            <div className="pb-4 font-semibold">0.41 Notes</div>
            <div className="text-base flex flex-col gap-4">
              <div>
                In pro mode, user-defined text color is now applied.
                <br />- The issue where no more characters were being input if
                the number of characters entered exceeded the given sentence has
                been resolved.
              </div>
            </div>

            <div className="mb-4">
              <div className="pb-4 font-semibold">Patch 0.4 Notes</div>
              <div className="text-base flex flex-col gap-4">
                <div>
                  - (Experimental Feature) You can now insert an image into the
                  background. We recommend using images of size 1920 x 1080.
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="pb-4">Patch 0.3 Notes</div>
              <div className="text-base flex flex-col gap-4">
                <div>
                  - Users can now change the colors of normal text, accurate
                  text, and inaccurate text.
                </div>
              </div>
            </div>
            <div>
              <div className="pb-4">Patch 0.2 Notes</div>
              <div className="text-base flex flex-col gap-4">
                <div>- Line breaks can now be made using the space bar.</div>
                <div>
                  - It is now possible to see the character currently being
                  entered.
                </div>
                <div>
                  - You can now save settings that were changed previously.
                </div>
                <div>- You can now adjust the font size.</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
