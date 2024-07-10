## 스크린샷

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/6230a896-44e2-4d37-8578-4f257f4d8b0b/670a363b-ef05-460e-8b0a-daa5ecbe20a7/Untitled.png)

## 프로젝트 개요: 사용자 커스텀 가능한 미니멀한 디자인의 타자 연습 사이트

[terminal-type](https://www.terminal-type.com/)

## 기능 요구사항:

- 사용자는 주어진 문자열에 대해서 입력을 할 수 있으며, 주어진 문자열과 사용자의 입력을 비교하여 “입력하기 전 문자”, “일치하는 문자” , ”일치하지 않는 문자”를 색상으로 구분하여 보여준다.
- 사용자는 basic, pro, minimal 세가지 테마 중에서 택1 할 수 있다.
- 사용자는 언어, 폰트크기, 시스템언어, 시력보호모드,글자색상을 변경하고 변경내용을 저장할 수 있다.
- 사용자는 이미지를 업로드하여 크기를 조절후 웹의 배경화면으로 사용할 수 있다.

## 기술 스택

- React, antd, taillwindcss, vite

## 트러블 슈팅

- 기획 초기에는 고려하지 않았던 사용자 설정 저장 기능을 위해 로컬스토리지를 사용하려 했으나 NEXT.js로 빌드된 초기 프로젝트의 설계와 맞지 않다고 판단하여 SSR대신 CSR방식을 채택하여 React.js로 마이그레이션
- 문자열의 일치여부를 완성된 문자를 기준으로 하였을때 사용자가 올바른 문자를 입력중임에도 불구하고 올바르지 않은 문자열로 검사하는 문제가 있어 유니코드를 사용하여 초성,중성,종성으로 분리하여 각각을 비교하도록 하였음

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/6230a896-44e2-4d37-8578-4f257f4d8b0b/e73f41e2-12af-491f-ab6c-4a9b94a9a259/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/6230a896-44e2-4d37-8578-4f257f4d8b0b/c59923c3-5556-493e-9b16-8ea53b0e499a/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/6230a896-44e2-4d37-8578-4f257f4d8b0b/89589428-0f97-4dab-86df-7a61ef405148/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/6230a896-44e2-4d37-8578-4f257f4d8b0b/0c8a998b-35ba-447d-a41d-691cffe15d7c/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/6230a896-44e2-4d37-8578-4f257f4d8b0b/93d4d86d-022a-4ab2-b948-1e0a45390513/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/6230a896-44e2-4d37-8578-4f257f4d8b0b/80349779-6231-4e8b-9da4-7d54f0165f48/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/6230a896-44e2-4d37-8578-4f257f4d8b0b/6a06dbe7-3467-4dd8-8980-3fdd5260cbe2/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/6230a896-44e2-4d37-8578-4f257f4d8b0b/4fcf97f5-9326-4f56-b9e8-39c5b81ca0b7/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/6230a896-44e2-4d37-8578-4f257f4d8b0b/71032f61-dd6c-4784-b7da-750b2f45c3d7/Untitled.png)
