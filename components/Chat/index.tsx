import AnswerComponent from "@/components/Answer/Answer";
import { useEffect, useRef, useState } from "react";
import Input from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Message, CreateMessage } from "ai/react";
import { ChatRequest, FunctionCallHandler } from "ai";

interface ChatProps {
  messages: Message[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isStreamDone: boolean;
}

const Chat: React.FC<ChatProps> = ({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isStreamDone,
}) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const extractJPGUrls = (str: string): string[] => {
    const regex = /https:\/\/[a-zA-Z0-9\/\._,-]+\.jpg/g;
    const result = str.match(regex);
    return result ? result : [];
  };
  console.log(messages);
  return (
    <div className="bg-gray-100 flex flex-col justify-between p-4 w-1/3 overflow-y-auto">
      <div className="p-2 flex flex-col">
        {messages.length > 0 ? (
          messages.map((item: any) => {
            if (item.role === "user") {
              return (
                <div key={item.id} className="flex flex-col">
                  <div className="bg-gray-600 shadow-md p-4 rounded-tr-2xl rounded-l-2xl self-end max-w-[240px] w-auto mt-4 text-end text-white">
                    {item.content}
                  </div>
                </div>
              );
            }
            if (item.role === "assistant") {
              return (
                <div key={item.id} className="flex flex-col pr-16">
                  <AnswerComponent
                    images={extractJPGUrls(item.content)}
                    answer={item.content}
                    isStreamDone={isStreamDone}
                  />
                </div>
              );
            }
          })
        ) : (
          <div className="p-4">
            <AnswerComponent
              images={[]}
              answer="Hi there! I am your Adidas assistant, how can I help you?"
              isStreamDone={isStreamDone}
            />
          </div>
        )}
      </div>
      <div className="relative">
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            className="pl-4 pr-10 py-4 rounded-2xl h-12 mt-4 shadow-md"
            value={input}
            placeholder="I would like to know about Ultraboost"
            onChange={handleInputChange}
            onKeyDown={() => handleSubmit}
          />
          <Button
            type="submit"
            className="text-xs lg:text-sm absolute bottom-1 right-0 bg-transparent hover:bg-transparent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 stroke-gray-400">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </Button>
          <div ref={chatContainerRef}></div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
