import express from "express";
import { watch, getEdit,postEdit, getUpload, postUpload } from "../controllers/videoController"

const videoRouter = express.Router();

// const handleWatch = (req, res) => res.send("Watch video")
// const handleEdit = (req, res) => res.send("Edit Video")


/*
    :::: 중요 !!!! 
    /upload 를 가장 상단에 위치시켜야하는 이유
    
    - /:id 가 만일 가장 위에 위치된다면
    - /upload 를 입력했을 때 브라우저는 이 upload 도 변수로 인식을 해버리게 되기 때문.

*/
videoRouter.get('/:id(\\d+)', watch)
//Js 는 정규식 작성 시, \\이렇게 두개 사용해야함

videoRouter.route('/:id(\\d+)/edit').get(getEdit).post(postEdit);
// videoRouter.get('/:id(\\d+)/edit', getEdit)
// videoRouter.post('/:id(\\d+)/edit',postEdit)

videoRouter.route("/upload").get(getUpload).post(postUpload);


export default videoRouter