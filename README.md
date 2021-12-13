![nodejs](https://img.shields.io/badge/nodejs-14-green)

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
Swagger API Docs를 통해 구현된 API를 테스트 할 수 있습니다.

- [post-codes swagger API Docs (https://post-codes.kyojs.com/v1/api-docs)](https://post-codes.kyojs.com/v1/api-docs)

# Installation

다음과 같이 입력하여 해당 프로젝트를 실행할 수 있습니다.
```shell
git clone https://github.com/tjsry0466/ATEAM-Ventures-backend-coding-test.git
cd ATEAM-Ventures-backend-coding-test
npm install
npm start
```