import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { sendMessageToGemini } from '../services/botServices.js'

const WelcomeMSG = [
    "Hey buddy! Ready to dive in? 💡🌊",
];

const formatText = (text) => {
    return text
        .replace(/^\*([IVXLCDM]+\..*?)\*/gm, "<h3>$1</h3>")
        .replace(/^\s*\*(.*?)\*:/gm, "<strong>$1:</strong>")
        .replace(/^\s*\*(.*?)$/gm, "<li>$1</li>")
        .replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>$1</ul>")
        .replace(/\*(.*?)\*/g, "<strong>$1</strong>")
        .replace(/\n{2,}/g, "<br/><br/>")
        .replace(/\n/g, "<br/>");
};

function Chatbot({ isOpen = true, onClose }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isExpanded, setIsExpanded] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const welcome = {
                id: uuidv4(),
                sender: "bot",
                text: WelcomeMSG[Math.floor(Math.random() * WelcomeMSG.length)],
            };
            setMessages([welcome]);
            setIsExpanded(true);
        }
    }, [isOpen]);

    const handleInputClick = () => {
        setIsExpanded(true);
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { id: uuidv4(), sender: "user", text: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const prompt = `You are a fun + intelligent friend 😎✨ Answer wisely. 🧠💬 \nUser said: "${input}" \n→ Now respond in a helpful, friendly, with lotss of emojis, and concise way 🥳✨.`;
            const response = await sendMessageToGemini(prompt, 'general');

            const botMsg = { id: uuidv4(), sender: "bot", text: response };
            setMessages((prev) => [...prev, botMsg]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { id: uuidv4(), sender: "bot", text: "❌ *Oops! Something went wrong.*" },
            ]);
        }

        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className={`relative w-full h-full bg-zinc-950 transition-[height] shadow-sm shadow-white/15 duration-300 ease-in-out overflow-hidden`}>
            <div className={`h-full flex flex-col transition-opacity duration-300 opacity-100`}>
                <div className='flex items-center justify-between p-2 border-b border-[#30363D] rounded'>
                    <span className='text-white font-semibold'>🤖</span>
                    {onClose && (
                        <button 
                            onClick={onClose}
                            className='text-white hover:text-gray-300'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    )}
                </div>
                <div className='flex-1 overflow-y-auto space-y-2 p-4 pb-20 my-scrollable-element scroll-box'>
                    {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                                message.sender === 'bot'
                                    ? 'border border-[#161B22] text-white rounded-tl-none'
                                    : 'border border-[#FD772F] text-white rounded-tr-none'
                            }`}>
                                <div dangerouslySetInnerHTML={{ __html: formatText(message.text) }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='absolute bottom-0 left-0 right-0 p-4 bg-zinc-950'>
                <div className='flex items-center justify-center gap-2 w-full'>
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='Chat with Bot' 
                        className='w-full p-2 rounded-full bg-[#161B22] text-white focus:outline-none focus:ring-2 focus:ring-[#FD772F]' 
                        onClick={handleInputClick}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button 
                        onClick={handleSend}
                        disabled={loading}
                        className='bg-[#FD772F] hover:bg-[#c95f1f] rounded-full p-2'
                    >
                        {loading ? (
                            <div className="loading-spinner" />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                <path d="M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M11.5 12.5L15 9" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chatbot
