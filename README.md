![nodejs](https://img.shields.io/badge/nodejs-14.18.2-green)

# ATEAM-Venturews-backend-coding-test

## Description

ATEAM-Ventures의 백엔드 코딩 테스트 입니다.
다음과 같은 기능을 구현하였습니다.

- can get the list of stores in `stores.json`
- can get the specific item of stores in `stores.json`
  - Your API consumer can identify the item with its name
- can get the latitude and longitude for each postcode.
  - You can use postcodes.io to get the latitude and longitudefor each postcode.
- can get the functionality that allows you to return a list of stores in a given radius of a given postcode in the UK. The list must be ordered from north to south.

# Demo
Swagger API Docs를 통해 구현된 API의 목록을 확인하고 테스트 할 수 있습니다.

- [post-codes swagger API Docs (https://post-codes.kyojs.com/v1/api-docs)](https://post-codes.kyojs.com/v1/api-docs)

# Installation

다음과 같이 입력하여 해당 프로젝트를 실행할 수 있습니다.
```shell
git clone https://github.com/tjsry0466/ATEAM-Ventures-backend-coding-test.git
cd ATEAM-Ventures-backend-coding-test
cp .env.example .env
npm install
npm start
```

# Finally
아래 질문에 대한 추가적인 답변입니다.

> If you had chosen to spend more time on this test, what would you have done differently?

- 한번 생성되면 잘 변경되지 않는 가게의 우편번호 특성을 생각해 보았을때, Redis와 같은 캐시 저장소를 사용하여 일반적인 경우에는 캐시 데이터로 반환하고 특정 주기로 배치 작업으로 데이터를 업데이트 하거나 변경된 부분만 적용하여 캐시 메모리의 잇점을 적용해보고 싶습니다.

> What part did you find the hardest? What part are you most proud of? In both cases, why?

- 마지막 항목의 요구사항을 정확히 파악하는데에 조금 어려움이 있었습니다.
stores.json파일에 저장된 가게의 목록들에 대해서 반경조회를 하는것인지, 결과 데이터의 항목이 stores.json에 포함되지 않아도 되는건지 의문이 들었지만,
stores.json의 더미 데이터의 항목들이 한 구역에 1~2개의 데이터만 존재하는 걸로 보아 후자가 맞다고 판단해 API의 응답을 기준으로 정렬하여 반환했습니다.
- 에러가 발생할수 있는 케이스를 생각하고, 최대한 발생 할 수 있는 에러 케이스에 대해서 처리를 할 수 있도록 노력했습니다. 어떤 에러 케이스가 있을지 고심했습니다. 
- 공통된 postcodes API URL에 대해서 분리하여 import 해서 사용하고, axios 요청에 대한 로직과 에러 처리에 대한 로직이 공통적으로 사용된다고 생각되어 utils로 분리하였습니다. 코드 재사용과 유지보수에 좋을 것 같습니다.

> What is one thing we could do to improve this test?

- 요구사항을 명확히 하고, 단순히 API 요청을 통해 가져오는 것 뿐만 아니라 데이터의 특성을 파악해서 데이터 특성에 맞는 저장방식과 기능을 구현하도록 할 수 있다면 좋을 것 같습니다.  