import "./db";
import "./models/Video";
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
const PORT = 4000;


//---- express app 생성기 ------
const app = express();
const logger = morgan("dev");


console.log(process.cwd())
//현재작업중인 디렉토리 확인
//C:\Users\Ryu\wetube 라고 뜸
//views 폴더까지 접근하려면 작업 디렉토리가 C:\Users\Ryu\wetube\src 가 되어야함
/*
    현재작업중인 디렉토리는
    서버를 기동하는 파일의 위치에 따라 결정됨
    즉, 어디서 node.js를 부르고 어디서 서버를 기동하고 있는지임

    누가 서버를 기동함?
    = package.json 임

    즉, 우리가 Wetube 안에 있는 package.json에서 node.js 를 실행하고 있기 때문에, 
    C:\Users\Ryu\wetube 가 현재 작업 디렉토리가 되는 것

*/



app.set('view engine', 'pug') 
//뷰 엔진을 pug로 세팅
/*
    express 가 views 디렉토리에서 pug 파일을 찾도록 설정되어있기 때문에
    따로 pug 파일을 import 를 해줄 필요가 없음
*/
app.set('views', process.cwd() + '/src/views');
//views 폴더가 C:\Users\Ryu\wetube\src\views 에서 인식될 수 있도록 바꾸기




app.use(logger)
app.use(express.urlencoded({extended:true}))
/*
    routes 를 사용하기 전에 이 express.urlencoded middleware를 사용해야함
    - 그래야 이 express.urlencoded 가 form 을 이해하고
    - 그것들을 JS 로 변형시켜줘서 우리가 사용할 수 있게 만들어줌

    express.urlencoded
    - 너의 express app 이 form 의 value 를 이해할 수 있도록 하고
    우리가 쓸 수 있는 JS 형식으로 변형 시켜줌
*/

app.use('/', globalRouter) //globalRouter 임포트 해줘야함
app.use('/videos', videoRouter);
app.use('/users', userRouter);



//----- app.get 설정 ------
const loggerMiddle = (req, res, next) => {
    //console.log("I'm in the middle!")
    console.log(`${req.method} ${req.url}`)
    //return res.send("text") <== 를 쓰면 next()가 실행되지 않음
    next();
}

const privateMiddleware = (req, res, next) => {
    const url = req.url;
    if (url === "/protected") {
        return res.send("<h1>Not Allowed</h1>");
    }
    console.log("Allowed, you may continue.")
    next();
}

const handleHome = (req, res) => {
    //return res.end(); //종료시키기
    return res.send("I still love you");
    // return res.end();
}
//토막 지식! * req, res 는 express에서 제공받는거임



//----- protection middleware ------

//----- app.use ------
//global middleware를 만들어줌 - 어느 URL 에서도 작동하는 middleware
//**주의! : app.use() 다음에 app.get() 순서로 작성해줘야함.

// app.use(loggerMiddle)
// app.use(privateMiddleware)


const handleListening = () => console.log(`✅ Server listening on port ${PORT}`)

//------ app.listen ------
app.listen(PORT, handleListening) //port listen




/* ----- middleware란??? -------

    - request 와 response 의 사이에 있음
    
    app.get("/", 여기에 들어가는 함수가 Middleware 임)
    app.get("/", handleHome) === app.get("/", middleware)

    그리고, 
    app.get("/", handleHome<---Controller 라고 함)
*/

/*  ----  middleware와 next() -----

    Controller 함수에 3번째 파라미터가 있음
    바로 "next"(middleware) 

    const handleHome = (req, res, next) => {
        next(); // 다음 함수를 호출해줌
    }

    app.get("/", handleHome, 다음함수)
*/

/* ---- morgan 이란? -------
    - node.js 용 request logger middleware

    == 사용법 ==
    1. 먼저 morgan 함수를 호출해야함(함수에 설정할 것이 있음)
    - morgan 함수를 호출하면, 네가 설정한 대로 middleware 를 return 해줌

    morgan은 (== morgan('dev')를 호출했을 때의 경우)
    = GET, path, status code, 응답시간 등의 정보를 가짐

    **morgan에도 next() 가 있음!

*/

/* --- router ----
    - 너희 컨트롤러와 URL의 관리를 쉽게 해줌

*/