import mongoose from "mongoose"

// export const formatHashtags = (hashtags) => {
//     hashtags.split(',').map(word => {
//         return word.startsWith('#') ? word : `#${word}`
//     })
// }

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
    title : {
        type:String,
        required : true,
        trim :true,
        maxLength : 80
    }, //{type: String} 과 같은 의미
    description:{
        type:String,
        trim : true,
        minLength : 20
    },
    createdAt:{
        type:Date, 
        required : true, 
        default : Date.now
    },
    hashtags:[{type:String, trim : true}],
    meta :{
        views : {
            type: Number,
            default:0,
            required :true
        },
        rating : {
            type: Number, 
            default:0, 
            required :true
        },
    }
});

/*
    middleware는 무조건 model 이 생성되기 전에 만들어야 함
*/
// videoSchema.pre('save', async function(){
//     /*
//         ----!!! 여기서 콜백함수를 arrow 함수로 해서 
//         this를 호출하려고 하면 안됨..!
//         왜냐면 arrow 함수의 this 는 this를 감싸고 있는 함수가 아니라, 글로벌 스코프를 바라보기 때문!
//     */

//     //middleware 함수 안에 this 가 존재함
//     console.log("🎃 we are about to save :", this);
//     //막 생성한 데이터 출력이 됨

//     this.title = 'hahaha, I\'m a middleware!'
//     /*
//         데이터가 저장(save)되기 전에 실행되는 middleware 이기 때문에, 여기서의 작업이 이루어진 후 데이터가 서버에 저장이 됨.

//         즉, this.title 로 title을 바꿀수 있음
//     */

//     this.hashtags = this.hashtags[0].split(',').map(word => word.startsWith('#') ? word : `#${word}`)


// })


//static function
//Video function을 커스터마이징 할 수 있음
/*
    Video.create()
    Video.findById() 등등 처럼
    Video.formatHashtags()로 가져다 쓸 수 있는 커스텀 함수!!
*/
videoSchema.static('formatHashtags', function(hashtags){
    return hashtags.split(',').map(word => {
        return word.startsWith('#') ? word : `#${word}`
    })
})


//model 생성 
const Video = mongoose.model("Video", videoSchema)

export default Video;
