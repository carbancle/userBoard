# React와 SpringBoot 를 사용한 게시판 구현

### 개발환경

- windows 11
- Visual Studio Code
- Eclipse

### 사용 기술

- HTML
- css
- javascript
- React
- SpringBoot
- mysql
- JPA

### 사이트 구현 예시

<img alt="스크린샷 2023-12-05 213929.png" src="https://github.com/carbancle/userBoard/blob/master/img/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202023-12-05%20213929.png?raw=true" data-hpc="true" class="Box-sc-g0xbh4-0 kzRgrI">
  
- 메인화면(로그인 X)<br>
  회원가입, 로그인, 게시판 페이지로 이동 가능<br>
  각 게시판에 전체 등록된 글 수를 보여준다
<hr>
<img alt="스크린샷 2023-12-05 214058.png" src="https://github.com/carbancle/userBoard/blob/master/img/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202023-12-05%20214058.png?raw=true" data-hpc="true" class="Box-sc-g0xbh4-0 kzRgrI">

- 메인화면(로그인 O)<br>
  가입한 유저의 닉네임이 우측 상단과 메인 페이지에 출력된다

<img alt="스크린샷 2023-12-05 214009.png" src="https://github.com/carbancle/userBoard/blob/master/img/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202023-12-05%20214009.png?raw=true" data-hpc="true" class="Box-sc-g0xbh4-0 kzRgrI">

- 회원가입<br>
  이메일 주소, 비밀번호, 닉네임을 입력하여 회원가입이 가능하다<br>
  중복된 이메일 주소를 입력하거나, 공란이 존재할 시 회원 가입이 되지 않는다

<img alt="스크린샷 2023-12-05 214028.png" src="https://github.com/carbancle/userBoard/blob/master/img/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202023-12-05%20214028.png?raw=true" data-hpc="true" class="Box-sc-g0xbh4-0 kzRgrI">

- 로그인<br>
  회원 가입 때 등록한 이메일과 비밀번호로 로그인이 가능하다<br>
  가입되지 않은 아이디를 입력하거나 잘못된 비밀번호를 입력시 로그인 되지 않는다


<img alt="스크린샷 2023-12-05 221404.png" src="https://github.com/carbancle/userBoard/blob/master/img/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202023-12-05%20221404.png?raw=true" data-hpc="true" class="Box-sc-g0xbh4-0 kzRgrI">

- 게시글 목록<br>
  게시판에 등록된 게시글 리스트를 보여준다<br>
  로그인한 경우 우측 하단에 글쓰기 버튼이 나타난다

<img alt="스크린샷 2023-12-05 223955.png" src="https://github.com/carbancle/userBoard/blob/master/img/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202023-12-05%20223955.png?raw=true" data-hpc="true" class="Box-sc-g0xbh4-0 kzRgrI">

- 글쓰기
  게시글을 작성할 수 있다<br>
  작성한 게시글은 게시글 목록에서 확인할 수 있다

<img alt="스크린샷 2023-12-05 223931.png" src="https://github.com/carbancle/userBoard/blob/master/img/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202023-12-05%20223931.png?raw=true" data-hpc="true" class="Box-sc-g0xbh4-0 kzRgrI">

- 게시글 내용<br>
  등록된 게시글의 내용을 확인할 수 있다<br>
  추천 버튼을 클릭하여 글에 대한 추천이 가능하다<br>
  하단의 댓글 작성란을 통하여 댓글 입력이 가능하다<br>
  추천과 댓글 작성의 경우 로그인을 했을 때만 등록 가능하다

<img alt="스크린샷 2023-12-05 224622.png" src="https://github.com/carbancle/userBoard/blob/master/img/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202023-12-05%20224622.png?raw=true" data-hpc="true" class="Box-sc-g0xbh4-0 kzRgrI">

- 댓글
  댓글을 본인이 작성한 경우 삭제 버튼이 나타나며 삭제 가능하다


### 추가 구현 필요 기능 및 진행 방향

- 예외 처리가 발생할 시 안내 기능
- 메인 페이지의 게시판 안내 정보 변경<br>
  (등록된 글 수가 아닌 최근 등록된 글 일부를 출력)
- etc...