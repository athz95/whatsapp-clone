import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { Avatar, IconButton } from "@material-ui/core";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import React,{useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useStateValue } from './StateProvider';
import "./chat.css"
import db from './firebase';
import firebase from "firebase";

function Chat() {
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms')
            .doc(roomId)
            .onSnapshot((snapshot) => 
                setRoomName(snapshot.data().name));
                
                db.collection("rooms").doc(roomId)
                .collection("messages").orderBy('timestamp', 'asc')
                .onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map(doc => doc.data()))
                ))
        }
    }, [roomId])
     
    useEffect(() => {
      setSeed( Math.floor(Math.random() * 5000 ))
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed >>>", input);

        db.collection('rooms').doc(roomId).collection
        ('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),

        });

        setInput('');
    };

    return (
        <div className="chat">
            
            <div className="chat-header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000 )}.svg`}/>
           

            <div className="chat-headerinfo">
                <h3>{roomName}</h3>
               <p>last seen {" "}
                   {new Date (
                       messages[messages.length - 1]?.
                       timestamp?.toDate()
                   ).toDateString()}
               </p>
            </div>

            <div className="chat-header-right">
                   <IconButton>
                  < SearchOutlinedIcon/>
                    </IconButton>
                    <IconButton>
                    <AttachFileIcon />
                    </IconButton>
                   <IconButton>
                   <MoreVertIcon />
                   </IconButton>
            </div>
            </div>

            <div className="chat-body">
                {messages.map((message) => (
                    <p 
                    className={`chat-message 
                    ${message.name === user.displayName && "chat-reciever"}`}>
                     <span className="chat-name">
                          {message.name}
                      </span>
                         {message.message}
                      <span className="chat-timestamp">
                        {new Date (message.timestamp?.toDate())
                        .toUTCString()}
                      </span> 
                     </p>
                ))}
               
            </div>

            <div className="chat-footer">
                <InsertEmoticonIcon />
                <form >
                    <input 
                    value={input}
                    onChange={e => setInput(e.target.value)} 
                    type="text" 
                    placeholder="Type a message" />
                    <button onClick={sendMessage} 
                    type="submit"
                    >Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
