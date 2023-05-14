import endent from "endent";
import Head from "next/head";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function CarsChat() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState<string>("");
  const [chunks, setChunks] = useState([]);
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<string>("");
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [mode, setMode] = useState<"search" | "chat">("chat");
  const [matchCount, setMatchCount] = useState<number>(20);
  // const [apiKey, setApiKey] = useState<string>(process.env.OPENAI_API_KEY);

  const handleSearch = async () => {
    // if (!apiKey) {
    //   alert("Please enter an API key.");
    //   return;
    // }

    if (!query) {
      alert("Please enter a query.");
      return;
    }

    setAnswer("");
    setChunks([]);

    setLoading(true);

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

    setChunks(results);

    setLoading(false);

    inputRef.current?.focus();

    return results;
  };

  const handleAnswer = async () => {
    // if (!apiKey) {
    //   alert("Please enter an API key.");
    //   return;
    // }

    if (!query) {
      alert("Please enter a query.");
      return;
    }

    setAnswer("");
    setChunks([]);

    setLoading(true);

    const searchResponse = await fetch("/api/search-cars", {
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
    console.log("search", searchResponse);

    const results = await searchResponse.json();

    setChunks(results);
    console.log(results);
    const prompt = endent`
    Now, let's recommend an used car to our client based on their query: "${query}"

    ${results
      ?.map((d) => {
        return `brand: ${d.brand} model: ${d.model} version: ${d.version} year: ${d.year} price: ${d.price}`;
      })
      .join("\n\n")}
    `;
    console.log(prompt);
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

    setLoading(false);

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setAnswer((prev) => prev + chunkValue);
    }

    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (mode === "search") {
        handleSearch();
      } else {
        handleAnswer();
      }
    }
  };

  const handleSave = () => {
    // if (apiKey.length !== 51) {
    //   alert("Please enter a valid API key.");
    //   return;
    // }

    // localStorage.setItem("PG_KEY", apiKey);
    localStorage.setItem("PG_MATCH_COUNT", matchCount.toString());
    localStorage.setItem("PG_MODE", mode);

    setShowSettings(false);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    localStorage.removeItem("PG_KEY");
    localStorage.removeItem("PG_MATCH_COUNT");
    localStorage.removeItem("PG_MODE");

    setMatchCount(5);
    setMode("search");
  };

  useEffect(() => {
    if (matchCount > 10) {
      setMatchCount(10);
    } else if (matchCount < 1) {
      setMatchCount(1);
    }
  }, [matchCount]);

  useEffect(() => {
    // const PG_KEY = localStorage.getItem("PG_KEY");
    // const PG_MATCH_COUNT = localStorage.getItem("PG_MATCH_COUNT");
    // const PG_MODE = localStorage.getItem("PG_MODE");

    // if (PG_KEY) {
    //   setApiKey(PG_KEY);
    // }

    // if (PG_MATCH_COUNT) {
    //   setMatchCount(parseInt(PG_MATCH_COUNT));
    // }

    // if (PG_MODE) {
    //   setMode(PG_MODE as "search" | "chat");
    // }

    inputRef.current?.focus();
  }, []);
  // console.log(chunks);
  // console.log(answer);
  // console.log(query);

  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    const base64Image = await readFileAsDataURL(file);

    const response = await fetch("/api/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_path: base64Image,
        prompt: "Adidas sneakers",
      }),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      console.log(prediction.detail);
      return;
    }

    setPrediction(prediction);
    console.log(prediction);
  };
  // const generateImage = async (url: string) => {
  //   const response = await fetch("/api/image", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       prompt: "a car on concrete, epic mountains in the background",
  //       image_path: url,
  //     }),
  //   });
  //   let prediction = await response.json();
  //   if (response.status !== 201) {
  //     console.log(prediction.detail);
  //     return;
  //   }
  // };

  return (
    <>
      <Head>
        <title>Car AI</title>
        <meta
          name="description"
          content={`AI-powered search for used cars - Car AI`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-2 bg-gray-100 sm:col-span-2 sm:col-end-9">
        <div>
          {/* <input type="file" onChange={handleFileChange} /> */}
          {/* {prediction && (
            <div className="mt-6 w-full">
              <div className="font-bold text-2xl">Prediction</div>
              <div className="mt-2">
                <img src={prediction[1]} />
              </div>
            </div>
          )} */}
          {loading ? (
            <div className="mt-6 w-full">
              {mode === "chat" && (
                <>
                  <div className="font-bold text-2xl">Answer</div>
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
          ) : answer ? (
            <div className="px-2 py-4">
              <div className="max-w-4xl flex items-center w-full flex-col  justify-center pb-6 mx-auto">
                <div className="font-bold text-2xl mb-2">Car AI:</div>
                <div className="max-h-[400px] h-full">{answer}</div>
              </div>
              <div className="max-w-[100%] pb-12 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {chunks?.map((chunk) => (
                  <Card key={chunk.id} className="flex flex-col min-w-[300px]">
                    <div className="flex snap-x rounded-t-lg flex-col">
                      {/* {JSON.parse(chunk?.images).map((image, i) => (
                          ))}
                        } */}
                      <Image
                        src={chunk.image}
                        width={200}
                        height={400}
                        alt={`image of ${chunk.name}`}
                        className="lg:h-[200px] h-[400px] w-auto object-cover snap-center rounded-t-lg"
                      />
                      {/* <button onClick={() => generateImage(chunk.image)}>
                        🔃
                      </button> */}
                    </div>
                    <div className="px-4 py-2 h-full flex flex-col gap-2 justify-between">
                      <div>
                        <h2 className="font-bold text-base">{chunk.brand}</h2>
                        <p>
                          {chunk.model} {chunk.version}
                        </p>
                        <p>{chunk.year}</p>
                      </div>
                      <p className="font-bold text-orange-600">
                        R$ {chunk.price}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex gap-2 relative max-w-4xl justify-center mx-auto py-4">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Estoy buscando una 4x4 ford"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            onClick={mode === "search" ? handleSearch : handleAnswer}
            className="text-sm absolute right-0 bg-transparent"
          >
            🔍
          </Button>
        </div>
      </div>
    </>
  );
}

async function urlToBase64(url: string) {
  const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
  const proxyUrl = "https://crossorigin.me/";
  const response = await fetch(proxy);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
