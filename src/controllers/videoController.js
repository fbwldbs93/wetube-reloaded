const fakeUser = {
    username:"Nicolas",
    loggedIn : true,
}

let videos = [
    {
        title:"First Video",
        rating : 5,
        comments:2,
        createdAt :'2 minutes ago',
        views : 1,
        id:1
    },
    {
        title:"Second Video",
        rating : 5,
        comments:2,
        createdAt :'2 minutes ago',
        views : 59,
        id:2
    },
    {
        title:"Third Video",
        rating : 5,
        comments:2,
        createdAt :'2 minutes ago',
        views : 59,
        id:3
    },
];

export const trending = (req, res) => {

    return res.render("home", {pageTitle : "home", tomato : "potato", fakeUser : fakeUser, videos})} 
    //views 안의 pug 파일이름 작성
    // 자동으로 home.pug 파일을 인식함
    //server.js에서 설정한 app.set('view engine', 'pug') 덕분에
    /*
        render 은 두개의 인수를 받음
        1. view의 이름
        2. 템플릿에 보낼 변수
    */

export const watch = (req, res) => {
    // console.log(req.params)
    const {id} = req.params; //현재 페이지 URL 이 바라보는 id 값
    // ES6 문법
    // const id = req.params.id; 와 같은 의미

    const video = videos[id-1];


    // return res.send(`Watch Video #${req.params.id}`)
    return res.render("watch",  {pageTitle : `Watching : ${video.title}`, video })//views 안의 pug 파일이름 작성
}
export const getEdit = (req, res) => {
    // console.log(req.params)
    const {id} = req.params; 
    const video = videos[id-1];
    return res.render('edit',  {pageTitle : `Editing : ${video.title}`,video  })
}

export const postEdit = (req,res) =>{
    const {id} = req.params; 

    // console.log(req.body)
    //{title : form 입력내용 출력}
    //name 이 title이어서 title : 로 출력되는 거임

    const {title} = req.body;

    videos[id-1].title = title;
    return res.redirect(`/videos/${id}`);
}


export const getUpload = (req, res) =>{
    return res.render("upload", {pageTitle : "Upload Video"})
}

export const postUpload = (req, res)=>{
    //here we will add a video to the videos array.
    const {title} = req.body

    const newVideo = {
        title:title,
        rating : 0,
        comments:0,
        createdAt :'just now',
        views : 1,
        id:videos.length + 1
    }

    videos.push(newVideo)

    return res.redirect("/")
}




// export default trending //한 가지 변수 밖에 export 하지 못함
/*
    파일 내의 모든 변수들을 export 하려면?
    - 각 변수 앞에 export 붙여주기
    ex) export const name..
        export const name2..

    ::!! 다른 파일에서 import 할 때, 정확한 이름으로 가져와야함
*/