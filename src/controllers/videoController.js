export const trending = (req, res) => res.send('Home page Videos')
export const see = (req, res) => {
    console.log(req.params)
    return res.send(`Watch Video #${req.params.id}`)
}
export const edit = (req, res) => {
    // console.log(req.params)
    return res.send('Edit')
}
export const search =(req,res) => res.send('Search')
export const upload =(req,res) => res.send('Upload')
export const deleteVideo =(req,res) => {
    // console.log(req.params)
    return res.send('Delete Video')
}

// export default trending //한 가지 변수 밖에 export 하지 못함
/*
    파일 내의 모든 변수들을 export 하려면?
    - 각 변수 앞에 export 붙여주기
    ex) export const name..
        export const name2..

    ::!! 다른 파일에서 import 할 때, 정확한 이름으로 가져와야함
*/