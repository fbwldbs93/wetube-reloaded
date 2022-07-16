import express from "express";
import { join, login } from "../controllers/userController";
import { trending, search } from "../controllers/videoController";

const globalRouter = express.Router();


/*
    라우터와 컨트롤러를 섞어서 사용 X 
    그러므로 컨트롤러들은 controller 파일로 이동~~
 */
// const handleHome = (req, res) => res.send('Home')
// const handleJoin = (req, res) => res.send('Join')

globalRouter.get('/', trending)
globalRouter.get('/join', join)
globalRouter.get('/login', login);


export default globalRouter
//globalRouter 변수를 export 하는 것