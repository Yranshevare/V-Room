import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Send, SmilePlus } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { useSearchParams } from "next/navigation";

interface Message {
    id: string;
    text: string;
    sender: string;
    timestamp: Date;
    isOwn: boolean;
}

export default function ChatInput({
    setMessages,
    isConnected,
}: {
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    isConnected: boolean;
}) {
    const searchParams = useSearchParams();

    const [showPicker, setShowPicker] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const userName = searchParams.get("name") || "Anonymous";
    const emojiPickerRef = useRef<HTMLDivElement>(null);
    const onEmojiClick = (emojiData: { emoji: string }) => {
        setNewMessage((prev) => prev + emojiData.emoji);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
            setShowPicker(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const message: Message = {
                id: Date.now().toString(),
                text: newMessage.trim(),
                sender: userName,
                timestamp: new Date(),
                isOwn: true,
            };
            setMessages((prev) => [...prev, message]);
            setNewMessage("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="p-2">
            <div className=" bg-gray-200 shadow rounded-lg ">
                <div className="flex justify-between items-center gap-2  bg-white border-b border-1 py-2 px-5 rounded-lg">
                    <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 outline-none resize-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden text-foreground placeholder:text-muted"
                        disabled={!isConnected}
                    />
                    <Button onClick={() => setShowPicker(!showPicker)} className="bg-white  shadow-none text-secondary-foreground hover:bg-white">
                        <SmilePlus className="size-6 text-secondary" />
                    </Button>

                    <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() || !isConnected}
                        className="bg-white  shadow-none text-secondary-foreground hover:bg-white"
                    >
                        <Send className="size-6 text-secondary" />
                    </Button>
                </div>
                <p className="text-xs text-muted mt-2 text-center pb-2">Press Enter to send • Shift+Enter for new line</p>
            </div>
            {showPicker && (
                <div ref={emojiPickerRef} className="absolute bottom-30">
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
            )}
        </div>
    );
}
