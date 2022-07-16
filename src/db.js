import mongoose from "mongoose"

mongoose.connect("mongodb://127.0.0.1:27017/wetube", {useUnifiedTopology:true});
//userNewUrlParser : true, 


//연결 여부
const db = mongoose.connection;

const handleOpen =()=> console.log("✅ Connected to DB")
const handleError =()=> console.log("⛔ DB Error", error)


db.on("error", handleError);
//on : 여러번 계속 발생시킬 수 있음
db.once("open", handleOpen)
//once : 오로지 한번만 발생