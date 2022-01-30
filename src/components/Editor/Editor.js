import React, { useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { QuillOptions } from "../../constants/QuillOptions";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import {userState } from "../../atoms/user.atom"
import Navbar from '../home/Navbar'
import { decodeJwt } from "../../helper/decodeJwt";
const Editor = () => {
  const { id } = useParams();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const [user,setUser] = useRecoilState(userState)
  useEffect(() => {
    async function fetch() {
      await decodeJwt(setUser);
    }
    fetch();
  }, []);
  useEffect(() => {
      if(quill)return
    const quillServer = new Quill("#container", {
      theme: "snow",
      modules: {
        toolbar: QuillOptions,
      },
    });
    quillServer.disable()
    quillServer.setText("Loading...")
    setQuill(quillServer);
  }, []);
  useEffect(() => {
    const URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'
      const socketServer = io(URL)
      setSocket(socketServer)
      return ()=> {
        socketServer.disconnect()
      }
  },[])
  useEffect(() => {
    if(!socket || !quill)return
    const handleChange = (delta,oldData,source) => {
      if(source !== 'user')return
      socket && socket.emit('send-changes',delta)
    }
    quill && quill.on('text-change',handleChange)
    return ()=> {
      quill && quill.off('text-change',handleChange)
    }
  },[quill,socket])
  useEffect(() => {
    if(!socket || !quill)return
    const handleChange = (delta) => {
      quill && quill.updateContents(delta)
    }
    socket && socket.on('receive-changes',handleChange)
    return ()=> {
      socket && socket.off('receive-changes',handleChange)
    }
  },[quill,socket])
  useEffect(() => {
    if(!quill || !socket || !id || !user) return
    socket && socket.once('load-document',document => {
      quill && quill.setContents(document)
      quill && quill.enable()
    })
    socket && socket.emit('get-document',{documentId: id,user: user?.user})
  },[quill,socket,id,user])
  useEffect(() => {
    if(!socket || !quill)return
    const interval = setInterval(() => {
      socket && socket.emit('save-document',quill.getContents())
    }, 2000);
    return ()=> {
      clearInterval(interval)
    }
  },[quill,socket])
  if (id)
    return (
      <div className="bg-gray-100 h-screen overflow-y-scroll scrollbar-hide">
        <Navbar search={false} />
        <div className="container" id="container"></div>
      </div>
    );
  else return null;
};

export default Editor;
