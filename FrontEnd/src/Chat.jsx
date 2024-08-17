import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { format, formatDistanceToNow, isBefore, subDays } from 'date-fns';
import HomeDuplicate from './HomeDuplicate';
import './Chat.css';

// Function to generate a color based on an index
const getColorForIndex = (index) => {
    const colors = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6f42c1', '#e83e8c', '#fd7e14'];
    return colors[index % colors.length];
};

// Function to format the timestamp
const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();

    if (isBefore(date, subDays(now, 7))) {
        // More than 7 days ago
        return format(date, 'yyyy-MM-dd HH:mm');
    } else if (isBefore(date, subDays(now, 1))) {
        // Between 1 and 7 days ago
        return format(date, 'EEEE HH:mm'); // Weekday and time
    } else {
        // Less than 1 day ago
        return formatDistanceToNow(date, { addSuffix: true });
    }
};

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const username = localStorage.getItem('username');
    const [userColors, setUserColors] = useState({});
    const chatBoxRef = useRef(null);
    const endOfMessagesRef = useRef(null);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [newMessage, setNewMessage] = useState(null); // New state for the latest message

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (isFirstLoad && messages.length > 0) {
            endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
            setIsFirstLoad(false);
        }
    }, [messages]);

    useEffect(() => {
        if (newMessage) {
            endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
            setNewMessage(null); // Reset the new message state
        }
    }, [newMessage]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8080/getmessages');
            setMessages(response.data);

            const colors = {};
            response.data.forEach((msg, index) => {
                if (!colors[msg.username]) {
                    colors[msg.username] = getColorForIndex(index);
                }
            });
            setUserColors(colors);
        } catch (error) {
            console.error("Error fetching messages", error);
        }
    };

    const sendMessage = async () => {
        if (message.trim() === '') return;
        try {
            const response = await axios.post('http://localhost:8080/postmessages', { username, message });
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, response.data];
                setNewMessage(response.data); // Set the new message state
                return updatedMessages;
            });
            setMessage('');
        } catch (error) {
            console.error("Error sending message", error);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className='mainchat'>
            <HomeDuplicate />
            <div className="chat-container">
                <div className="chat-box" ref={chatBoxRef}>
                    {messages.map((msg, index) => (
                        <div key={index} className="chat-message">
                            <span 
                                className="chat-username" 
                                style={{ color: userColors[msg.username] || '#007bff' }}
                            >
                                {msg.username}
                                {msg.username === username && <span className="chat-you"> (you)</span>}
                                {': '}
                            </span>
                            <span className="chat-text">{msg.message}</span>
                            <span className="chat-timestamp">{formatTimestamp(msg.timestamp)}</span>
                        </div>
                    ))}
                    <div ref={endOfMessagesRef} />
                </div>
                <div className="chat-input">
                    <input 
                        type="text" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        onKeyPress={handleKeyPress} 
                        placeholder="Type your message..."
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
