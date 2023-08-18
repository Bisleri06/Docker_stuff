import axios from 'axios';


//placeholder array
const arr=[
    {
      name:"test",
      path:"test",
      size:0
    }
  ]

//handle click event on item
//if folder, get its contents
//if file download it as zip
async function handleAccess(path,setpath,setlist){

  let response=await axios.post("/checkfile",{fname:path});
  if(response.status!=200)
    return;
  
  //console.log(response.data);
  if(!response.data.file)
  {
    return setlist(response.data.data);   //update the item list
  }


  //download the file

  response=await axios.get("/download?fname="+path,{responseType: 'arraybuffer'});

  const url=window.URL.createObjectURL(new Blob([response.data],{type:'application/gzip'}));
  const link=document.createElement('a')

  link.href=url;
  const fname=path.slice(path.lastIndexOf("/")+1)

  link.setAttribute('download',fname+".gz");
  link.click();
  
}



//handle upload functionality
async function handleUpload(path,data,setlist,list){

  const response=await axios.post("/upload?fpath="+path,data,{headers: {
    'Content-Type': 'multipart/form-data'
  }});

  if(response.data.success)
  {
    //include the uploaded file in the current items array
    alert("uploaded")
    setlist([...list,response.data.elem])
  }
  else
  {
    alert("error")
  }

}


export {handleAccess,handleUpload,arr}