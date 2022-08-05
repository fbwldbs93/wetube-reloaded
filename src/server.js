import express from "express";
import morgan from "morgan";
import { localsMiddleware } from "./middlewares";
import session from 'express-session'
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import MongoStore from "connect-mongo";


const app = express();
const logger = morgan("dev");


app.set('view engine', 'pug') 
app.set('views', process.cwd() + '/src/views');




app.use(logger)
app.use(express.urlencoded({extended:true}))

app.use(session({
    /* ----- secret -----
        우리가 쿠키에 sign 할 때 사용하는 string
        - 쿠키에 sign 하는 이유
            :: backend 가 쿠키를 줬다는 걸 보여주기 위함
            :: 누군가 너의 쿠키를 훔쳐서 마치 너인 척 할 수 있음....ㄷㄷ
        - secret 의 string
            :: 길게 작성되고 강력하고 무작위로 만들어야함
            :: 이 string을 가지고 쿠키를 sign 하고 우리가 만든 것임을 증명할 수 있음
        - 그러므로 secret: string 은 보호해야함
    */
    secret:process.env.COOKIE_SECRET,
    
    //기억하고 싶은 유저의 쿠키만 저장 => false
    resave:false,

    //---- saveUninitialized ----
    //새로운 세션이 있는데, 수정된 적이 없으면 uninitialized(초기화되지 않은) 임
    //세션을 수정할 때만 세션을 DB에 저장하고 쿠키를 넘겨주게 함
    saveUninitialized:false,

    cookie:{
        //maxAge : 쿠키가 얼마나 오래 있을 수 있는지 알려줌
        // => 값은 1/1000초 단위로 쓰면 됨
        // maxAge : 20000, //20초
    },

    //세션 Mongo DB database 에 저장
    //mongoUrl 을 보호해야함
    store:MongoStore.create({mongoUrl:process.env.DB_URL})
}))




app.use(localsMiddleware)
app.use('/', rootRouter) 
app.use('/videos', videoRouter);
app.use('/users', userRouter);






export default app;