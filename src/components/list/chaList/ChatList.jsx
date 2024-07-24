import React, { useEffect, useState } from 'react';
import './chatList.css';
import AddUser from './addUser/AddUser';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../library/firebase';
import { useUserStore } from '../../library/userStore';
import { useChatStore } from '../../library/chatStore';
import { toast } from 'react-toastify';

function ChatList() {
    const [chats, setChats] = useState([]);
    const [add, setAdd] = useState(false);
    const { currentUser } = useUserStore();
    const [input, setInput] = useState('');
    const { chatId, changeChat } = useChatStore();

    const addFunc = () => {
        setAdd((prev) => !prev);
    };

    useEffect(() => {
        const onLoad = onSnapshot(doc(db, 'userChat', currentUser.id), async (res) => {
            console.log(res);
            const items = res.data().chats;
            const promises = items.map(async (item) => {
                const userDocRef = doc(db, 'users', item.receiverId);
                const userDocSnap = await getDoc(userDocRef);
                const user = userDocSnap.data();
                return { ...item, user };
            });
            const chatData = await Promise.all(promises);
            setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        });
        return () => {
            onLoad();
        };
    }, [currentUser.id]);

    const handleSelect = async (chat) => {
        const userChats = chats.map((item) => {
            const { user, ...rest } = item;
            return rest;
        });
        const chatIndex = userChats.findIndex(item => item.chatId == chat.chatId);
        userChats[chatIndex].isSeen = true;
        const userChatRef = doc(db, 'userChat', currentUser.id);
        try {
            await updateDoc(userChatRef, {
                chats: userChats
            });
            changeChat(chat.chatId, chat.user);
        } catch (e) {
            toast.error(e.message);
        }
    };

    const filteredChats = chats.filter((c) => c.user.username.toLowerCase().includes(input.toLowerCase()));

    return (
        <div className='chatList'>
            <div className="search">
                <div className="searchBar">
                    <img src="./search.png" alt="search" />
                    <input type="text" placeholder='Search' onChange={(e) => setInput(e.target.value)} />
                </div>
                <img className='add' onClick={addFunc} src={add ? './minus.png' : './plus.png'} alt="btn" />
            </div>
            {filteredChats.length ? filteredChats.map(chat => {
                return (
                    <div className="item" key={chat.chatId} onClick={() => handleSelect(chat)}
                        style={{ background: chat?.isSeen ? 'transparent' : '#5183fe' }}
                    >
                        <img src={chat?.user?.blocked.includes(currentUser.id) ? "./avatar.png" : chat.user.avatar || './avatar.png'} alt="avatar" />
                        <div className="text">
                            <span>{chat.user.blocked.includes(currentUser.id) ? 'User' : chat.user.username}</span>
                            <p>{chat.lastMessage}</p>
                        </div>
                    </div>)
            }) : <span style={{padding: '20px', marginLeft: '20px'}}>No users</span>}
            {add && <AddUser />}
        </div>
    );
}

export default ChatList;
