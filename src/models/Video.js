import mongoose from "mongoose"

/*
    mongoose : mongoDB와 대화할 수 있게 해줌
    - mongoose 에게 우리 app의 데이터들이 어떻게 생겼는지 알려줘야 함
    - database 가 알아야 할 것은 데이터가 어떻게 생겼는가 이다.
        = 작성자를 가지고 있는지? 댓글은 있는지? 그 댓글은 숫자인지 문자인지?? 등등
    
    ::: 이러한 데이터의 모양들을 Database 에게 알려주기 위해
    model 을 만드는 것임

    => Database가 model 을 만들고 model을 검색하고, 삭제하고
    수정하는 것을 도와줌

    즉, 데이터의 관점에서 Video 가 어떻게 생겼는지 설명을 해주기 위해
    Model 을 만든 것!!!
*/

const videoSchema = new mongoose.Schema({
    //비디오(데이터) 형식을 작성
    title : String,
    description:String,
    createdAt:Date,
    hashtags:[{type:String}],
    meta :{
        views : Number,
        rating : Number,
    }
});

//model 생성 
const Video = mongoose.model("Video", videoSchema)

export default Video;
