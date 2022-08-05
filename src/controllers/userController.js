import User from '../models/User';
import fetch from 'node-fetch'; 
import bcrypt from 'bcrypt';

export const getJoin = (req, res) => {
    return res.render('join', {pageTitle:'Join'})
}


const pageTitle = "Join"

export const postJoin = async(req, res) =>{
   const {name, email, username, password,password2, location} = req.body;

   //$or 사용 => 각 조건이 true 일때 실행
   //즉, 하나만 해당 되어도 검색
   const exists = await User.exists({$or : [{username: username}, {email: email}]})

   if(exists){
    return res.status(400).render('join', {pageTitle, errorMessage : "This username/email is already taken."})
    //return 을 넣어줘야 여기서 함수를 멈춤
    //안해주면 아래로 계속 실행됨
   }

   if(password !== password2){
    return res.status(400).render('join', {pageTitle, errorMessage : "Password confirmation does not match"})
   }


   try{
    await User.create({
        name, 
        email, 
        username, 
        password, 
        password2, 
        location
       })
    
       return res.redirect('/login')
   }catch(err){
        return res.status(400).render('join', {pageTitle : "Error", errorMessage : err._message});
   }
}



export const getLogin = (req, res) => res.render("login", {pageTitle : "Login"})



export const postLogin = async(req, res)=>{
    //check if account exists
    //check if password correct
    const {username, password} = req.body;
    const pageTitle = "Login"
    const user = await User.findOne({username, socialOnly:false})

    if(!user){
        return res.status(400).render('login',{pageTitle, errorMessage:"An account with this username does not exists"} )
    }

    console.log('🙄 user password=>', user.password)
    
    const ok = await bcrypt.compare(password, user.password);

    if(!ok){
        return res.status(400).render('login',{pageTitle, errorMessage:"Wrong password"} )
    }

    //유저가 로그인 하면 그 유저에 대한 정보를 세션에 담기
    //세션에 object 정보 담기
    //세션 초기화
    req.session.loggedIn = true;
    req.session.user = user;
    
    return res.redirect('/')
}


export const startGithubLogin = (req, res)=>{
    //user를 Github 로 redirect 시킬 콘트롤러
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id:process.env.GH_CLIENT,
        allow_signup : false,
        scope : "read:user user:email"
        //스코프 정보들은 공백으로 나눠줌
    }
    const params = new URLSearchParams(config).toString();

    const finalUrl = `${baseUrl}?${params}`

    return res.redirect(finalUrl)
}

export const finishGithubLogin = async(req, res) =>{
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret : process.env.GH_SECRET,
        code : req.query.code
    }

    const params = new URLSearchParams(config).toString();

    const finalUrl = `${baseUrl}?${params}`;


    const tokenRequest = await (await fetch(finalUrl, {
        method:"POST",
        headers:{
            accept:'application/json'
        }
    })).json()
    // const json = await data.json();
    // console.log(json)
    // res.send(JSON.stringify(json))

    if("access_token" in tokenRequest){
        //access api
        const {access_token} = tokenRequest;
        const apiUrl ="https://api.github.com"
        const userData = await(await fetch(`${apiUrl}/user`, {
            headers:{
                Authorization : `token ${access_token}`,
            }
        })).json();

        // console.log("userData =>", userData)
        const emailData = await (await fetch(`${apiUrl}/user/emails`, {
            headers:{
                Authorization : `token ${access_token}`,
            }
        })).json();

        const emailObj = emailData.find((email)=>{
            return email.primary ===true && email.verified === true;
        })

        if(!emailObj){
            return res.redirect('/login')
        }

        let user = await User.findOne({email : emailObj.email})
        if(!user){
            const user = await User.create({
                avatarUrl:userData.avatarUrl,
                name:userData.name,
                username:userData.login,
                email:emailObj.email,
                password:"",
                socialOnlt:true,
                location:userData.location
            });
            
        }
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect('/');

        // console.log("emailData =>", emailData)
    }else{
        return res.redirect('/login')
    }

}


export const edit = (req, res) => res.send("Edit User")
export const remove = (req, res) => res.send("Remove User")
export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect('/');
}
export const see = (req, res) => res.send("See")
// export default join