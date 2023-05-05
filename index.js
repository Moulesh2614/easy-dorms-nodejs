const http = require('http');
const path = require('path');
const fs = require('fs');
let resData;
const {MongoClient} = require('mongodb');


async function main(){

    const uri = "mongodb+srv://moulesh:choudhury@newcluster.p5mnff5.mongodb.net/test"
    const client = new MongoClient(uri);
    

    try{
        await client.connect();
        console.log('Connection Established')
        resData = await findSomeData(client)
    }
    catch(e){
        await console.error(e);
    }finally{
        await client.close();
        console.log('Connection Closed')

    }

}
// const cors=require("cors");
// const corsOptions ={
//    origin:'*', 
//    credentials:true,            //access-control-allow-credentials:true
//    optionSuccessStatus:200,
// }
// app.use(cors(corsOptions))
const server = http.createServer((req,res)=>{
    console.log(req.url);
    if(req.url ==='/'){
        
        fs.readFile(path.join(__dirname,'index.html'), (err, content)=>{
            if (err) throw err;
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(content);
        });
    }
    
    else if(req.url ==='/api'){
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify(resData[0]))
            // fs.readFile(path.join(__dirname,'dormsCollection.json'),'utf-8',(err, content)=>{
            //     if (err) throw err;
            //     res.writeHead(200, {'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*'});
            //     res.end(content);
            // })
    }
    else{
        res.writeHead(404,{'Content-Type':'text/html'});
        res.end(" <h1> 404 Nothing Found </h1>")
    }
});
async function findSomeData(client){
    // dbList = await client.db().admin().listDatabases();
    // console.log("List of Databases: ")
    // console.log(dbList['databases']);

    const cursor = client.db("easy-dorms").collection("dormsCollection").find({})
    const results = await cursor.toArray();
    console.log(results);
    const js = JSON.stringify(results)
    console.log(js)
    console.log("Type of data: ",typeof(js))
}  

server.listen(3000, ()=> console.log("Our server is running"));