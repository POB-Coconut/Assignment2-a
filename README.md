# Wanted Front-end onBoarding # 2

## Demo Link
🔗 Product Page : https://elegant-haibt-8fc815.netlify.app/product

🔗 RecentList Page : https://elegant-haibt-8fc815.netlify.app/recentList

## 💬 프로젝트 개요
Mr.Camel : 고객들이 원하는 상품 목록을 위한 사용자의 상품 조회 이력 제작

## 😀 프로젝트 Memebers
|이름|GitHub|담당|
|------|---|---|
|김승원|[lumpenop](https://github.com/lumpenop)|공통 Styled Component|
|남택훈|[tech-hoon](https://github.com/tech-hoon)|Product 페이지|
|이상훈|[simoniful](https://github.com/simoniful) |Storage 관리와 Utils 생성|
|최인경|[ink-0](https://github.com/ink-0)|recentList 페이지|

## 🪄 실행 방법

#### Project setup
`npm install`
#### Compiles and hot-reloads for development
`npm run serve`
#### Compiles and minifies for production
`npm run build`

## 🔧 Skills

- React, React Router, Styled Components, ES6+


## 🐱‍👤 협업 Tool

- Slack, Git-Hub

## 🎬 기능구현 데모

![](https://i.imgur.com/orXqwTF.gif)
![화면 기록 2021-08-01 오전 5 31 17 mov](https://user-images.githubusercontent.com/71919983/127751942-008e05b9-1b6a-4fc0-abef-005ab3f433cc.gif)




## 👍🏻 구현 기능 상세
사용자는 랜덤한 상품들을 보며 관심없는 상품을 표시하고  
관심없는 상품에서 제외된 상품들을 브랜드별,가격별 필터링을 한 목록을 볼 수 있다.

### 1. 기본 요구 사항

> - ClassComponent 사용해서 만들어주세요.
> - SessionStorage 또는 LocalStorage 사용해서 이력을 관리해 주세요.
> - 외부 API를 사용하지 않고, Client의 리소스만 사용합니다.
> ### 과제 구현 목록
> - [x] ClassComponent 사용
> - [x] SessionStorage 또는 LocalStorage 사용해서 이력을 관리
> - [x] 외부 API를 사용하지 않고, Client의 리소스만 사용
> - [x] 편리하게 Storage를 사용할 수 있는 Utils 생성
> - [x] '최근 조회이력 목록'에서 정렬/필터의 자연스러운 갱신 처리

### 2. 공통 컴포넌트 와 프로젝트 구조
#### 프로젝트 구조
```html
📦src
 ┣ 📂components
 ┃ ┗ 📜ProductCard.jsx
 ┣ 📂pages
 ┃ ┣ 📜Product.jsx
 ┃ ┗ 📜RecentList.jsx
 ┣ 📂styles
 ┃ ┗ 📜GlobalStyle.js
 ┣ 📂utils
 ┃ ┣ 📜config.js
 ┃ ┣ 📜fetches.js
 ┃ ┗ 📜storage.js
 ┣ 📜Routes.js
 ┗ 📜index.js
```
#### 공통 component
> - 상품 Card 컴포넌트 구성
> - Utils 파일 생성


### 3. 📎 Route Path

> - /product : 상품 상세 페이지
> - /recentList : 상품 조회 이력 목록 페이지

### 4. 페이지 별 상세 기능
#### product
랜덤버튼을 통해 랜덤상품 조회가 가능하고 관심없는 상품 처리 가능
> - 상품 상세 조회 시 이력데이터 누적
> - 동일상품 조회 시 최신 데이터로 갱신
> - `랜덤상품조회` 클릭 시 현상품 제외하고 랜덤 로드
> - `관심없음` 클릭 시 랜덤로드 후 상품 상세 노출리스트에서 제외
#### recentList
> - 00시 기준 최근 조회이력과 관심 없는 상품목록 초기화
> - 별도 페이징 처리 없이 전체 로드
> - (목록 상단) 필터: '브랜드' (전체 및 존재하는 브랜드 목록), 다중 선택 가능
> - (목록 상단) 필터: '관심 없는 상품 숨기기' 체크 박스
> - (선택 팝업) 정렬: 최근 조회 순, 낮은 가격 순
> - 상품 클릭 시 '상품상세 페이지'(/product)로 이동, 관심 없는 상품 클릭 시 
> 경고 메세지 노출되며 이동하지 않음


## Reference

- 이 프로젝트는 [미스터카멜](https://mrcamel.co.kr/)의 과제전형을 참조하여 학습목적으로 만들었습니다.
- 이프로젝트에서 사용하고 있는 data는 미스터 카멜측에서 제공받았습니다.

---
