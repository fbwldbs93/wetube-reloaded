# Wetube Reloaded

어떤 종류의 데이터를 사용할 것인가?

- 비디오
- 유저
  (위 두개를 도메인이라고 함 - 이유 모름)

------ 글로벌 라우터 -----
/ => Home
/join => Join
/login => Login
/search => Search

------ 유저 라우터 -----
/users/edit => Edit User
/users/delete => Delete User

------ 비디오 라우터 -----
/video/watch => Watch Video
/video/edit => Edit Video
/video/delete => Delete Video
/video/comments => Comment on a video
/video/comments/delte => Delete a comment of a video

라우터를 도메인별로 나누기

라우터는?

- 너희가 작업중인 주게를 기반으로 URL을 그룹화 해줌

# MongoDB

- document-based(문서 기반) 임
  - MongoDB에서 저장하는 것들은 JSON-like-document 임
  - 즉, Object 모양의 데이터들이 저장됨
- document-based(문서 기반) 의 반대는 sql-based(엑셀시트와 같은 행 기반)

# CRUD

- C : create
- R : read
- U : update
- D : delete
