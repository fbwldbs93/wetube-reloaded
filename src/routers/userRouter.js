import express from "express";
import { edit, remove, logout, see, startGithubLogin, finishGithubLogin } from "../controllers/userController";

const userRouter = express.Router();

// const handleEdit = (req, res) => res.send('Edit User')
// const handleDelete = (req, res) => res.send('Delete User')


userRouter.get('/edit', edit)
userRouter.get('/remove', remove)
userRouter.get(':id', see)
userRouter.get('/logout', logout)

//user를 Github 로 redirect 시킬 라우터
userRouter.get('/github/start', startGithubLogin)

userRouter.get('/github/finish', finishGithubLogin)


/*
    /:id 는 무엇인가? (/:potato 라고 써도 됨)
    - 파라미터라고 부름
    - 이걸로 url 안에 변수를 포함시킬 수 있게 해줌
*/


export default userRouter