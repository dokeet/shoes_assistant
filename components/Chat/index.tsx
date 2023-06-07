import AnswerComponent from "@/components/Answer/Answer";
import endent from "endent";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChatProps {
  setHistory: (e: any) => void;
  history: any;
  setLoading: (a: boolean) => void;
  loading: boolean;
}

const Chat: React.FC<ChatProps> = ({
  setHistory,
  history,
  setLoading,
  loading,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState<string>("");
  const [mode, setMode] = useState<"search" | "chat">("chat");
  const [matchCount, setMatchCount] = useState<number>(3);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleAnswer = async (e: any) => {
    if (!query) {
      alert("Please enter a query.");
      return;
    }
    setQuery("");

    setHistory((prevHistory: any) => [
      ...prevHistory,
      {
        role: "user",
        content: e.target.value,
        chunks: [],
      },
    ]);
    setLoading(true);

    // search conincidences
    const searchResponse = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, matches: matchCount }),
    });

    if (!searchResponse.ok) {
      setLoading(false);
      throw new Error(searchResponse.statusText);
    }

    const results = await searchResponse.json();

    const prompt = endent`
    Based on previous messages: ${history.map((item) => {
      return `\n ${item.role}: ${item.content}`;
    })} let's recommend a shoe to our client: "${query}"
      ${results
        ?.map((d: any) => {
          let accordionsString = "";
          let accordions = [];
          try {
            accordions = JSON.parse(d.accordions);
          } catch (e) {
            // console.log(e);
            accordions = [];
          }

          if (accordions && accordions.length > 0) {
            accordions.forEach((accordion: any) => {
              accordionsString += `\n${accordion.title}:`;
              accordion.content.forEach((contentItem: string) => {
                accordionsString += `\n  - ${contentItem}`;
              });
            });
          }
          const lines = accordionsString.split("\n");
          const filteredLines = lines.filter(
            (line: string) => !line.startsWith("  - Color del artículo")
          );
          const filteredDetailsContent = filteredLines.join("\n");

          return `name: ${d.name} color: ${d.color.split("/")[0]} category: ${
            d.category
          } | ${filteredDetailsContent}`;
        })
        .join("\n\n")}
      `;

    //AI answers
    const answerResponse = await fetch("/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!answerResponse.ok) {
      setLoading(false);
      throw new Error(answerResponse.statusText);
    }

    const data = answerResponse.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let answer = "";
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      answer += chunkValue;

      if (done) {
        setHistory((prevHistory: any) => [
          ...prevHistory,
          {
            role: "addidasChatBot",
            content: answer,
            chunks: results, // imagenes
          },
        ]);
      }
    }

    setLoading(false);

    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAnswer(e);
    }
  };

  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div className="bg-gray-100 flex flex-col justify-between p-4 w-1/3 overflow-y-auto">
      <div className="p-2 flex flex-col">
        {history.map((item: any, i: number) => {
          if (item.role === "user")
            return (
              <div key={i + item.role} className="flex flex-col">
                <div className="bg-white shadow-md p-4 rounded-tr-2xl rounded-l-2xl self-end max-w-[240px] w-auto mt-4 text-end">
                  {item.content}
                </div>
              </div>
            );
          if (item.role === "addidasChatBot")
            return (
              <div key={i + item.role} className="flex flex-col pr-16">
                <AnswerComponent images={item.chunks} answer={item.content} />
              </div>
            );
        })}
        {loading && (
          <div className="mt-6 self-start max-w-xs w-full">
            {mode === "chat" && (
              <>
                <div className="font-bold text-2xl">Espere</div>
                <div className="animate-pulse mt-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded mt-2"></div>
                  <div className="h-4 bg-gray-300 rounded mt-2"></div>
                  <div className="h-4 bg-gray-300 rounded mt-2"></div>
                  <div className="h-4 bg-gray-300 rounded mt-2"></div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <div className="relative" ref={chatContainerRef}>
        <Input
          type="text"
          className="p-4 rounded-2xl h-12 mt-4 shadow-md"
          placeholder="Want some Stan Smith?"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <Button
          onClick={handleAnswer}
          className="text-xs lg:text-sm absolute bottom-1 right-0 bg-transparent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 stroke-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </Button>
        {/* <div ref={chatContainerRef} className="h-6" /> */}
      </div>
    </div>
  );
};

export default Chat;
