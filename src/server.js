import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4000;


//---- express app 생성기 ------
const app = express();
const logger = morgan("dev");

app.use(logger)

// const globalRouter = express.Router(); //글로벌라우터

// const handleHome2 = (req, res) => res.send('Home')

// globalRouter.get('/', handleHome2)

// const userRouter = express.Router(); //유저라우터

// const handleEditUser = (req, res) => res.send('Edit User')

// userRouter.get('/edit', handleEditUser)

// const videoRouter = express.Router(); //비디오라우터

// const handleWatchVideo = (req, res) => res.send("Watch video")

// videoRouter.get('/watch', handleWatchVideo)

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

/*
const handleLogin = (req, res) => {
    return res.send("Login Here")
}

const handleProtected = (req, res) => {
    return res.send("welcome to the privated lounge")
}
*/

//----- protection middleware ------

//----- app.use ------
//global middleware를 만들어줌 - 어느 URL 에서도 작동하는 middleware
//**주의! : app.use() 다음에 app.get() 순서로 작성해줘야함.

// app.use(loggerMiddle)
// app.use(privateMiddleware)


//----- app.get ------
/*
app.get("/", handleHome) //get request
app.get("/protected", handleProtected)
app.get("/login", handleLogin)
*/

const handleListening = () => console.log(`Server listening on port ${PORT}`)

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