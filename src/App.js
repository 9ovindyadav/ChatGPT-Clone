import { useEffect, useRef, useState } from "react";
import "./App.css";
import {BsSend} from "react-icons/bs";

function App() {

  const [message,setMessage] = useState("");
  const [input,setInput] = useState("");
const [preChat,setPreChat] = useState([]);
const [curTitle,setCurTitle] = useState("");
const divforScroll = useRef(null);

const createNewChat = ()=>{
  setMessage("");
  setInput("");
  setCurTitle("");
}

const handleClick = (uniTitle)=>{

setCurTitle(uniTitle);
setMessage("");
setInput("");

}



const getMessages = async ()=>{
  
  const options ={
    method:"POST",
    body: JSON.stringify({
      message: input,
    }),
    headers:{
      "Content-type":"application/json"
    }
  }
  try {
 const response = await fetch("http://localhost:8000/completions",options)

 const data = await response.json();


 setMessage(data.choices[0].message);

  } catch (error) {
    console.error(error);
  }
}

useEffect(()=>{

if(!curTitle && input && message){
  setCurTitle(input);
}

if(curTitle && input && message){
    
  setPreChat(preChat=>(
    [...preChat,{
      title: curTitle,
      role: "user",
      content: input,
    },{
      title: curTitle,
      role: message.role,
      content: message.content,
    }]
  ))

}


},[message,curTitle]);


         const currentChat =  preChat.filter( preChat => preChat.title === curTitle);

         const uniqueTitle = Array.from(new Set(preChat.map(preChat => preChat.title)));
    
         useEffect(() => {
          if (divforScroll.current) {
            divforScroll.current.scrollIntoView({ behavior : "smooth" });
          }
        }, [preChat]);        


  return (
    <div className="App">
    <section className="side-bar">
      <button onClick={createNewChat}>New Chat</button>
      <ul className="history">
        {
          uniqueTitle?.map((item,index)=>(
            <li key={index} onClick={()=>handleClick(item)}>{item}</li>
          ))
        }
      </ul>
      <nav>
        <p>Made by Govind</p>
      </nav>
    </section>
    <section className="main">
      { !curTitle && <h1>GPT Clone</h1>}
      <ul className="feed">
        {
          currentChat.map((item,index)=>(
            <li key={index}>
              <p className="role">{item.role}</p>
              <p>{item.content}</p>
            </li>
          ))
        }
        <div ref={divforScroll} ></div>
      </ul>
      <div className="buttom-section">
        <div className="input-container">
          <input value={input} onChange={(e)=>setInput(e.target.value)} />
          <div id="submit" onClick={getMessages}>{<BsSend />}</div>
        </div>
        <p className="info">
        ChatGPT Mar 23 Version. Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts.

        </p>
      </div>
    </section>
    </div>
  );
}

export default App;
