import mongoose from "mongoose"

mongoose.connect(process.env.DB_URL , {
    useUnifiedTopology:true,
});

//--- 니코쌤은 하라고 했는데, 이상하게 하면 오류남..-----
// useFindAndModify:false,
//userNewUrlParser : true, 


//연결 여부
const db = mongoose.connection;

const handleOpen =()=> console.log("✅ Connected to DB")
const handleError =()=> console.log("⛔ DB Error", error)


db.on("error", handleError);
//on : 여러번 계속 발생시킬 수 있음
db.once("open", handleOpen)
//once : 오로지 한번만 발생



/*
    C:\Program Files\MongoDB\Server\5.2\bin 치시고 mongod 적으시면 니꼬쌤 처럼 나옵니다. (현재 버전 기준).
    ==> 내 꺼는 5.0 버전임

    순서
    mongod
    mongo
    show dbs
    use wetube

    show collections
    --> video document 들로 구성된 video collection을 보여줌

    db.collection이름.find()
    --> 등록된 데이터베이스 출력

    db.collection이름.remove({})
    -->collection내부 데이터 삭제
*/