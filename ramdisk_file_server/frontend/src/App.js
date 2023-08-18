import React from 'react'
import ReactDOM from 'react-dom'
import Item from "./components/item";
import Navbar from "./components/navbar";
import { Box, Grid } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import {handleAccess,arr} from './components/interfacing';
import {Context} from "./components/context";

function App() {

  const [path,setpath]=useState("/");         //current path
  const [FileList,SetFileList]=useState(arr); //list of files and directories inside current path

  useEffect(()=>{console.log(path);
    handleAccess(path,setpath,SetFileList)
  },[path])

  return (
    <Context.Provider value={{pathstate:[path,setpath],liststate:[FileList,SetFileList]}}>
    
    <Navbar/>
    <Box sx={{position:"relative",left:0,top:0,width:"100%",height:"10rem",color:"#000"}}></Box>
    
    <Grid container spacing={2}>
      {FileList.map((i)=><Item key={i.path} clicked={setpath} name={i.name} path={i.path} size={i.size}/>)}
    </Grid>
    
    </Context.Provider>
  );
}


export default App;