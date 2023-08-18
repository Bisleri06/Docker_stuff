const app=require('./setup')
const fs= require('fs');
const path = require("path");
const chokidar=require('chokidar');
const process=require('process');
const zlib=require('zlib');
const { exec } = require('child_process');

//root location and changed files storage
const base_path=process.env.BASE_PATH;
const backup_path=process.env.BACKUP_PATH;
const files=new Set();

//file updates logging
const watcher=chokidar.watch(base_path);
watcher.on('add',(fp)=>{
    files.add(fp);
    console.log("added "+fp);
});

watcher.on('unlink',(fp)=>{
    files.delete(fp);
    console.log("deleted "+fp);
});


//handle file upload with fp.mv() method
app.post("/upload",(req,res)=>{
    const fp=req.files.file;

    fp.mv(path.join(base_path,req.query['fpath'],fp.name),(err)=>{
        if(err)
            return res.status(500).json({success:false})

        console.log("uploaded "+fp.name)
        return res.json({
            success:true,
            elem:{
                name:fp.name,
                size:fp.size,
                path:path.join(req.query['fpath'],fp.name)
            }
        })
    })
})



//handle filedownload with suitable headers
app.get("/download",(req,res)=>{
    const fpath=path.join(base_path,req.query['fname']);

    const stream=fs.createReadStream(fpath).on('end',()=>{
        console.log("done");
    });

    //IMPORTANT HEADERS
    res.set({
        'Content-Disposition': "attachment;filename="+path.basename(req.query['fname'])+".gz",
        'Content-Type': 'application/gzip'
    })

    //SEND ZIP FILE
    const gz=zlib.createGzip();
    stream.pipe(gz).pipe(res);
})


//check if path is a file or a directory
//if directory it returns all items inside along with their sizes
app.post("/checkfile",(req,res)=>{
    
    const fpath=path.join(base_path,req.body.fname);

    fs.stat(fpath,(err,stats)=>{
        if(err)
        {
            return res.status(400).json({msg:err})
        }
        
        if(stats.isFile())
        {
            console.log("Download ",req.body.fname);
            return res.json({path:fpath,file:true,data:fs.readFileSync(fpath,{encoding:'binary'})})
        }
        else
        {
            console.log("hit ",req.body.fname);

            //reads directory and creates object for each entry
            fs.readdir(fpath,(err,files)=>
            {
                const data=files.map((file)=>
                {
                    return {
                        name:file,
                        path:path.join(req.body.fname,file),
                        size:fs.statSync(path.join(fpath,file)).size
                    }
                })
                
                //return array of file data in requested directory
                return res.json({path:fpath,file:false,data:data})
            })
        }
    })
})



//instantiate ramdisk
app.listen(3001,(req,res)=>{
    console.log("started");
})


//clean up ramdisk and copy leftover files to permanent storage
process.on('SIGTERM', function() {
    console.log("Leftover files are ");
    console.log(files);
    async function execute(){
        await exec("cp -r "+base_path+" "+backup_path);
        await exec("sudo umount "+base_path);
    }
    execute().then(()=>process.exit());
    console.log("Exited");
})