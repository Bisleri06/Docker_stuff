import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UploadIcon from '@mui/icons-material/Upload';
import { Dialog, DialogTitle } from '@mui/material';
import { handleUpload } from './interfacing';
import {Context} from './context';


function cutPath(path){
    path=path.slice(0,path.lastIndexOf("/"))

    if(!path)
        return "/";
    else
        return path;
}

export default function Navbar(props) {

  const [dialog,setdialog]=React.useState(false);
  const {pathstate,liststate}=React.useContext(Context)
  const [path,setpath]=pathstate;
  const [list,setlist]=liststate;

  return (
      <AppBar sx={{paddingTop:"20px",paddingBottom:"20px"}}>
        <Toolbar>
          <IconButton

            onClick={()=>{
              setpath(cutPath(path))
            }}

            size="large"
            sx={{
              color:"white",
              marginRight:"20px",
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h3" component="div" fontFamily={"sans-serif"} sx={{backgroundColor:"white",color:"#42a5f5",padding:"1rem",width:"70%",position:"relative",wordWrap:'break-word' }}>
            {path}
          </Typography>
          

          <input id="myInput" name="uploadFile" type="file" style={{ display: 'none' }}/>
          
          <Button type="submit" size="large" sx={{backgroundColor:"white",color:"#42a5f5",position:"absolute",height:"4rem",width:"7rem",right:"5%"}} variant="contained" onClick={()=>{
            document.getElementById('myInput').click();
            setdialog(true);
            }}>
            <UploadIcon/>Upload</Button>
        </Toolbar>
          
        
        <Dialog
            open={dialog}
          >
            <DialogTitle>Confirm upload?</DialogTitle>
            <Button onClick={()=>setdialog(false)}>Cancel</Button>
            <Button onClick={()=>{
              
              //handle file upload
              
              let formData = new FormData();
              let fp = document.getElementById('myInput');
              formData.append("file", fp.files[0]);

              handleUpload(path,formData,setlist,list);
              setdialog(false);

            }}>Confirm</Button>
        </Dialog>


      </AppBar>
  );
}