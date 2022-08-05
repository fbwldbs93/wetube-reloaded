import e from 'express';
import Video from '../models/Video';

export const home = async(req, res) => {

    /*
        Video.find(); 두가지 사용법이 있음
        1. callback function 사용
        2. promise 사용
        
    */

    //######## promise 방식의 Video.find() ########

    // console.log('I start')
    const videos = await Video.find({}).sort({createdAt : 'desc'});
    // console.log(videos)
    // console.log('I finish')
    
    return res.render('home', {pageTitle : "home", videos})
    /*
        return
        - 함수를 종료시켜줌
        - 원래는 값을 반환하는 역할이지만 함수의 내부에서 사용하면 그저 종료를 해줌
        - 이런 경우 함수 내부으ㅔ return 이 없어도 정상적으로 동작하지만 실수를 방지하기 위해 return 사용

        res.render() 이나 res.end() 등의 함수들이 하나 이상으로 동시에 작성되면 오류가 발생함

        그래서 하나의 함수 아래로는 더이상 실행되지 못하게 return 으로 함수를 종료시켜줌
    */
    
    //export const home = async()=>{} 
    //위와 같이 Controller 변수 함수명에 async 붙여줘야함


    /*
        promise와 callback 의 차이점

        await 을 find 앞에 적으면
        find는 네가 callback 을 필요로하지 않는다는 걸 알게됨
        그렇기에 find는 찾아낸 비디오를 바로 출력해줄거임

        에러는?
        try/catch 사용할거임

        await 장점
        :: await 가 database 를 기다려줌
        - await 만 있으면 JS 는 계속 기다려줌
        - 언제까지? database 에게 결과값을 받을 때 까지
        - callback 은 기다려주지 않음
            => 먼저 실행될거 다 실행해버리고 준비되면 callback 실행이지만
            => await 은 기다려주기 때문에 코드의 순서대로 출력이 되고, 순서대로 코드가 실행되기 때문에 코드를 이해하는 데도 수월함
            ==> 즉, 데이터베이스가 데이터 찾을 때까지 기다려준다
            (다음 것이 먼저 수행되는 것을 막음)
    */



    //######## callback 방식의 Video.find() ########
   // Video.find({}, (error, videos)=>{
        // if(error){
        //     return res.render("server-error")
        // }else{
        //     //return res.render("home", {pageTitle : "home", videos})
        // }
        
        //이제 비동기적으로 브라우저가 비디오 렌더링 시켜줄거임
        //즉, 비디오 렌더링이 될때까지 빠른 작업들은 다 수행시켜버리고
        //그 다음에 비디오가 준비되면 렌더링 시켜줌

    
        /*
            mongoose 는 {} 이 부분을 database 에서 불러올 거임
            - database 가 반응하면, mongoose 는 callback 함수를 실행시킬거임 
            - 그 다음 mongoose 는 err 와 video 의 값을 불러올거임

        */

        /*
            - Video.find() 안에 {} 이 설정되어 있지 않으면
                ==> Video 내부 전체를 불러오겠다는 의미
        */
   // });
    

    // return res.render("home", {pageTitle : "home", videos:[]})} 
    //views 안의 pug 파일이름 작성
    // 자동으로 home.pug 파일을 인식함
    //server.js에서 설정한 app.set('view engine', 'pug') 덕분에
    /*
        render 은 두개의 인수를 받음
        1. view의 이름
        2. 템플릿에 보낼 변수
    */
}

export const watch = async (req, res) => {
    // console.log(req.params)
    const {id} = req.params; //현재 페이지 URL 이 바라보는 id 값
    // ES6 문법
    // const id = req.params.id; 와 같은 의미

    const video = await Video.findById(id)

    console.log('👀 id =>', id)
    console.log('👀 video =>', video)

    if(!video){
        return res.render('404', {pageTitle : "Video not found"})  
    }

    // return res.send(`Watch Video #${req.params.id}`)
    return res.render("watch",  {pageTitle :video.title, video})//views 안의 pug 파일이름 작성  

    
}
export const getEdit = async(req, res) => {
    // console.log(req.params)
    const {id} = req.params; 
    const video = await Video.findById(id)

    if(!video){
        return res.render('404', {pageTitle : "Video not found"})  
        /*
            return  을 안하면
            영상이 존재하지 않을 때 JS 는 이 부분을 실행하고
            계속해서 아래 코드도 실행할 것임
            -----
            이 function을 여기 안에서 끝내야 하니까
            return 을 적어줘야함
        */
    }

    return res.render('edit',  {pageTitle:`Edit : ${video.title}`, video })
}

export const postEdit = async(req,res) =>{
    // console.log(req.body)
    //{title : form 입력내용 출력}
    //name 이 title이어서 title : 로 출력되는 거임
    console.log('👀 req.body =>', req.body)

    const {id} = req.params
    const {title, description, hashtags} = req.body

    const video = await Video.exists({_id : id})
    /*
        Video.exists() :: 찾고자하는 값의 존재 유무 확인
        즉, true 나 false 를 반환함
        그리고 exists는 filter 를 인자로 받음
        Video.exists({id : id}) 는 object 의 id 가 req.params의 id 와 같은지 확인
        --------
        즉, Video object 에서 부여하는 MongoDB id 랑 지금 브라우저 Url 의 id 랑 같음???을 물어보고
        true, false 를 반환하는 것
    */
    if(!video){
        return res.status(404).render('404', {pageTitle : "Video not found"})  
    }

    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags : Video.formatHashtags(hashtags)
    })

    //--------  Video.findByIdAndUpdate 을 쓰지 않고 업데이트 연습 해봄 ------------
    //데이터 객체들 업데이트
    // video.title = title;
    // video.description = description;
    // video.hashtags = hashtags.split(",").map(word => word.startsWith('#') ? word :`#${word}`);

    //업데이트 된 데이터 세이브
    // await video.save();
    //---------------------------------------

    return res.redirect(`/videos/${id}`);
}


export const getUpload = (req, res) =>{
    return res.render("upload", {pageTitle : "Upload Video"})
}

export const postUpload = async (req, res)=>{
    //here we will add a video to the videos array.
    const {title, description, hashtags} = req.body
    // console.log(title, description, hashtags)
    try{
        await Video.create({
            title,
            description,
            hashtags : Video.formatHashtags(hashtags)
        });
        return res.redirect("/")
    } catch(err){
        console.log(err)
        return res.status(400).render('upload', {pageTitle : "upload Video", errorMessage : err._message});
    }
    // console.log(video)
    // const dbVideo = await video.save();
    // console.log(dbVideo)
    /*
        save()는 promise 를 return 해 줌
        즉, save 작업이 끝날 때까지 기다려줘야한다는 뜻
        - database에 기록되고 저장되는 데에 시간이 조금 걸리기 때문
        - 기다림의 방법
            --> async await
    */
    
}

//video 삭제
export const deleteVideo = async(req,res) =>{
    const {id} = req.params;
    console.log("💜id : ", id);
    await Video.findByIdAndDelete(id);
    //delete video
    return res.redirect('/')
}



// export default trending //한 가지 변수 밖에 export 하지 못함
/*
    파일 내의 모든 변수들을 export 하려면?
    - 각 변수 앞에 export 붙여주기
    ex) export const name..
        export const name2..

    ::!! 다른 파일에서 import 할 때, 정확한 이름으로 가져와야함
*/

export const search= async(req, res)=>{
    const {keyword} = req.query
    // console.log("💖id =>", keyword)
    let videos = []
    if(keyword){
        //search here
        videos = await Video.find({
            title:{
                $regex: new RegExp(keyword, "i")
                //RegEx 를 보낼 수 있음
                //contain 방식의 RegExp 생성
                //i => 대소문자 구분 무시
            },
        })
    }

    return res.render('search', {pageTitle : 'Search', videos})

}