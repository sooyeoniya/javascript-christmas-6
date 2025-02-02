# 기능 목록

## 입력
  - [x] 방문 날짜 입력
  - [x] 메뉴 및 수량 입력

## 출력

  - [x] 환영 인사 출력
  - [x] 주문 메뉴 출력
  - [x] 할인 전 총 주문 금액 출력

  - [x] 증정 메뉴 출력
    - 없는 경우 `없음` 출력

  - [x] 혜택 내역 출력
    - 크리스마스 디데이 할인, 평일 할인, 주말 할인, 특별 할인, 증정 이벤트
    - 없는 경우 `없음` 출력
    - 각 할인 금액이 `0`원인 경우 출력하지 않음

  - [x] 총 혜택 금액
    - 할인 금액의 합계 + 증정 메뉴의 가격
    - 없는 경우 `0원` 출력

  - [x] 할인 후 예상 결제 금액
    - 할인 전 총 주문 금액 - (증정 이벤트 가격을 제외한 나머지 할인 총 금액)

  - [x] 12월 이벤트 배지 출력
    - 없는 경우 `없음` 출력

## 기능

  - [x] 메뉴 저장
  - [x] 크리스마스 디데이 할인 계산
  - [x] 평일 할인 계산
  - [x] 주말 할인 계산
  - [x] 특별 할인 계산 (별이 있는 부분)
  - [x] 증정 이벤트 (할인 전 총 주문 금액이 12만원 이상인 경우 샴페인 1개 증정)
  
  **이벤트 기간**
  - [x] 크리스마스 디데이 할인 이벤트 기간 : 12.1 ~ 12.25
  - [x] 나머지 할인 이벤트 기간 : 12.1 ~ 12.31

  **이벤트 배지**
  - [x] `총혜택 금액`에 따라 배지 부여
    - 5천 원 이상: 별
    - 1만 원 이상: 트리
    - 2만 원 이상: 산타

  **모든 이벤트 관련 조건**
  - [x] 총 주문 금액 10,000원 이상부터 이벤트 적용

## 예외 처리

  - [x] 방문 날짜
    - [x] 숫자인지 확인
    - [x] 정수인지 확인
    - [x] 1 이상 31 이하의 숫자인지 확인

  - [x] 메뉴 및 수량
    - [x] 입력 값이 빈 경우
    - [x] 입력 형식이 틀린 경우 ('-'로 나누었을 때 값이 2개가 아닌 경우)
    - [x] 메뉴판에 없는 메뉴가 있는 경우
    - [x] 수량이 숫자가 아닌 경우
    - [x] 각 메뉴 개수가 1 이상의 숫자가 아닌 경우
    - [x] 중복된 메뉴를 입력한 경우
    - [x] 음료만 주문한 경우
    - [x] 총 메뉴 개수가 20개를 초과하는 경우

## 테스트 코드

  - [x] 통합 테스트: 입력 및 예외 테스트
  - [x] 단위 테스트
    - [x] validateDate 메서드 테스트
    - [x] validateMenu 메서드 테스트
    - [x] EventManager 클래스 테스트

## 기타

  - [x] 상수화 
  - [x] 함수 길이 10 제한
  - [x] indent depth 2 제한
