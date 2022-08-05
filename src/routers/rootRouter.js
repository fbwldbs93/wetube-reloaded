import express from "express";
import { get } from "mongoose";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userController";
import {search } from '../controllers/videoController'
import { home } from "../controllers/videoController";

const rootRouter = express.Router();


/*
    라우터와 컨트롤러를 섞어서 사용 X 
    그러므로 컨트롤러들은 controller 파일로 이동~~
 */
// const handleHome = (req, res) => res.send('Home')
// const handleJoin = (req, res) => res.send('Join')

rootRouter.get('/', home)
rootRouter.route('/join').get(getJoin).post(postJoin)
rootRouter.route('/login').get(getLogin).post(postLogin);
rootRouter.get('/search', search)


export default rootRouter
//globalRouter 변수를 export 하는 것