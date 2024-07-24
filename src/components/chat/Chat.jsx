import React, { useEffect, useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import './Chat.css';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../library/firebase';
import { useChatStore } from '../library/chatStore';
import { useUserStore } from '../library/userStore';
import upload from '../library/upload';
import { toast } from 'react-toastify';

function Chat() {
  const [chat, setChat] = useState(null);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [img, setImg] = useState({ file: null, url: '' });
  const endRef = useRef(null);
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
  const { currentUser } = useUserStore();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages]);

  useEffect(() => {
    if (chatId) {
      const unSub = onSnapshot(doc(db, 'chats', chatId), (res) => {
        setChat(res.data());
      });
      return () => {
        unSub();
      };
    }
  }, [chatId]);

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  const addEmoji = (emoji) => {
    setText(prev => prev + emoji);
  };

  const handleSend = async () => {
    if (text === '' && !img.file) return;

    let imgUrl = null;
    if (img.file) {
      imgUrl = await upload(img.file);
    }

    const newMessage = {
      senderId: currentUser.id,
      text,
      createdAt: new Date(),
      ...(imgUrl && { img: imgUrl })
    };

    try {
      await updateDoc(doc(db, 'chats', chatId), {
        messages: arrayUnion(newMessage)
      });

      const userIDs = [currentUser.id, user.id];
      for (const id of userIDs) {
        const userChatRef = doc(db, 'userChats', id);
        const userChatsSnapshot = await getDoc(userChatRef);
        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data().chats;
          const chatIndex = userChatsData.findIndex(c => c.chatId === chatId);
          if (chatIndex !== -1) {
            userChatsData[chatIndex].lastMessage = text;
            userChatsData[chatIndex].isSeen = id === currentUser.id;
            userChatsData[chatIndex].updatedAt = Date.now();
          } else {
            userChatsData.push({
              chatId,
              lastMessage: text,
              isSeen: id === currentUser.id,
              updatedAt: Date.now()
            });
          }
          await updateDoc(userChatRef, {
            chats: userChatsData
          });
        }
      }
    } catch (e) {
      toast.error(e.message);
    }

    setImg({ file: null, url: '' });
    setText('');
  };

  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src={user?.avatar || "./avatar.png"} alt="avatar" />
          <div className="text">
            <span>{user?.username}</span>
          </div>
        </div>
      </div>
      <div className="center">
      {chat?.messages?.map((msg) => {
        return (
          <div className={msg.senderId === currentUser.id ? "message own" : 'message'} key={msg.createdAt}>
            <div className="text">
              {msg.img && <img src={msg.img} alt="img" />}
              <p>{msg.text}</p>
            </div>
          </div>
        );
      })}
        {img.url && (
          <div className="message own">
            <div className="text">
              <img src={img.url} alt="img" />
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png" alt="icon" />
          </label>
          <input type="file" id='file' style={{ display: 'none' }} onChange={handleImg} />
          <img src="./camera.png" alt="camera icon" />
          <img src="./mic.png" alt="mic icon" />
        </div>
        <input
          type="text"
          placeholder={(isCurrentUserBlocked || isReceiverBlocked) ? 'you cannot send messages': 'Type a message..'}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />
        <div className="emoji">
          <img src="./emoji.png" alt="emoji icon" onClick={() => setOpen(prev => !prev)} />
          {open && (
            <div className="picker">
              <EmojiPicker onEmojiClick={(e, emojiObject) => addEmoji(emojiObject.emoji)} />
            </div>
          )}
        </div>
        <button className='sendButton' onClick={handleSend} disabled={isCurrentUserBlocked || isReceiverBlocked}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
