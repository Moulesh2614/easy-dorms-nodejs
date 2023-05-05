const http = require('http');
const path = require('path');
const fs = require('fs');
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions))
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
            fs.readFile(path.join(__dirname,'dormsCollection.json'),'utf-8',(err, content)=>{
                if (err) throw err;
                res.writeHead(200, {'Content-Type':'application/json'});
                res.end(content);
            })
    }
    else{
        res.writeHead(404,{'Content-Type':'text/html'});
        res.end(" <h1> 404 Nothing Found </h1>")
    }
})
server.listen(3000, ()=> console.log("Our server is running"));