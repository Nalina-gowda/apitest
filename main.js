var express=require("express")
var mysql=require("mysql")
var app=express()
app.use(express.json())
const userRoute=require("./routes/user")

const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'#mickeymynaa@1601',
    database:'newdb'
})
con.connect((err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log("connected!!")
    }
})

app.delete('/deletedata/:id',(req,res)=>{
    const delid=req.params.id;
    con.query('delete from mytable where id=?',delid,(err,result)=>
    {
        if(err)
    {
        console.log(err)
    }else{
        if(result.affectedRows==0)
        {
            res.send("id not prsent")
        }else{
              res.send("deleted")
        }
      
        console.log(result)
    }
        
    })
})
app.get("/api/test",()=>{
    console.log("test is successfull");
});

// app.put("/update/:id",(req,res)=>{
//     const upid=req.params.id;
//     const name=req.body.name;
//     const marks=req.body.mark;
//     console.log(upid)
//     con.query('update mytable set name=?,marks=? where id=? ',[name,marks,upid],(err,result)=>
//     {
//         if(err)
//     {
//         console.log(err)
//     }else{

//         if(result.affectedRows==0)
//         {
//             res.send("id not present")

//         }else{
//             res.send("updated")
//         }
//         res.send("updated")
//         console.log(result)
//     }
        
//     })
// })
// app.get("/fetchbyid",(req,res)=>{                          //get
//     const fetchid=req.query.id;
//     console.log(fetchid);
//     con.query('select * from mytable where  id=?',fetchid,(err,result)=>{
//         if(err)
//         {
//             console.log(err)
//         }else{
//             console.log(result)
//             if(result.length==0)
//            {
//                console.log("id not present");
//             }else{
//             var value=JSON.parse(JSON.stringify(result))
//             console.log(value[0])}
//             console.log("results",result)
//           res.send(result)
//         }

//     })
// })
// app.get("/fetch",(req,res)=>{                                                  //get
//     con.query("select * from mytable",function(err,result,fields){
//         if(err)
//         {
//             console.log(err)
//         }else{
//             //console.log(result)
//             var r=JSON.parse(JSON.stringify(result))
//             console.log(r[0])
//             console.log(r[1])
//             //console.log(JSON.parse(JSON.stringify(result)))
//             //res.send(result)
//         }
//     })
// })

//post
// app.post('/post',(req,res)=>{
//     const name=req.body.name;
//     const id=req.body.id;
//     const mark=req.body.mark;

//     con.query('insert into mytable values(?,?,?)',[id,name,mark],(err,result)=>{
//         if(err)
//     {
//         console.log(err)
//     }else{
//         res.send("posted")
//     }
//     })

// })
app.use("/api/users",userRoute)

app.listen(3000,(err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log("on port 3000")
    }
})

