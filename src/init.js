//이 파일은 모든 걸 초기화 시켜줌
//init.js :: 필요한 모든 것들을 import 시키는 역할 담당

//app이 시작점이 init.js 부터이기 때문에 dotenv 를 init.js 최상단으로 옮기기
// require('dotenv').config() <= 이렇게 작성하면 최상위 파일에 작성을 해도 적용하고자 하는 파일에 일일히 적용해줘야하고 또 에러도 나기 때문에
import 'dotenv/config'; //<== 이렇게 작성해주기
import "./db";
import "./models/Video";
import "./models/User";
import app from "./server"

const PORT = 4000;

const handleListening = () => console.log(`✅ Server listening on port ${PORT}`)

//------ app.listen ------
app.listen(PORT, handleListening) //port listen
