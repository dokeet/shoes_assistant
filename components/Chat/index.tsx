import AnswerComponent from "@/components/Answer/Answer";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PGChunk } from "@/types";
import {
  IconArrowRight,
  IconExternalLink,
  IconSearch,
} from "@tabler/icons-react";
import endent from "endent";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [chunks, setChunks] = useState([
    {
      id: 784,
      name: "ZAPATILLAS STAN SMITH",
      category: "Originals",
      rating: "12245",
      price: "30.499",
      color: "Cloud White / Cloud White / Green",
      sizes:
        '[{"size":"34 (UK 3)","inStock":true},{"size":"34.5 (UK 3.5)","inStock":false},{"size":"35.5 (UK 4)","inStock":false},{"size":"36 (UK 4.5)","inStock":false},{"size":"36.5 (UK 5)","inStock":false},{"size":"37.5 (UK 5.5)","inStock":false},{"size":"38 (UK 6)","inStock":false},{"size":"38.5 (UK 6.5)","inStock":false},{"size":"39 (UK 7)","inStock":false},{"size":"39.5 (UK 7.5)","inStock":false},{"size":"40 (UK 8)","inStock":false},{"size":"41 (UK 8.5)","inStock":false},{"size":"41.5 (UK 9)","inStock":false},{"size":"42 (UK 9.5)","inStock":false},{"size":"43 (UK 10)","inStock":true},{"size":"43.5 (UK 10.5)","inStock":false},{"size":"44 (UK 11)","inStock":false},{"size":"45 (UK 11.5)","inStock":true},{"size":"45.5 (UK 12)","inStock":true},{"size":"46 (UK 12.5)","inStock":false},{"size":"47 (UK 13)","inStock":false},{"size":"47.5 (UK 13.5)","inStock":false}]',
      images:
        '["https://assets.adidas.com/images/w_600,f_auto,q_auto/68ae7ea7849b43eca70aac1e00f5146d_9366/Zapatillas_Stan_Smith_Blanco_FX5502_01_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/ac706d8555244a6e8ea7ac1e00f521d1_9366/Zapatillas_Stan_Smith_Blanco_FX5502_02_standard_hover.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/72a38538fd684788b5d9ac1e00f52860_9366/Zapatillas_Stan_Smith_Blanco_FX5502_03_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/f86168171d2a4644a8eeac1e00f52f85_9366/Zapatillas_Stan_Smith_Blanco_FX5502_04_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/79e5a7b748c54cbf8c57ac1e00f53669_9366/Zapatillas_Stan_Smith_Blanco_FX5502_05_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/4bc9628836bf42a181f1ac1e00f51b22_9366/Zapatillas_Stan_Smith_Blanco_FX5502_06_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/e111d2c7b44442e0b16cac1e01048b6d_9366/Zapatillas_Stan_Smith_Blanco_FX5502_09_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/d5afac8099674bfea559ac1e00f53d7c_9366/Zapatillas_Stan_Smith_Blanco_FX5502_41_detail.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/e53b9a57b0a745be924bac1e00f54427_9366/Zapatillas_Stan_Smith_Blanco_FX5502_42_detail.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/43afbbf4e6ab41cab1ccaca000996da7_9366/Zapatillas_Stan_Smith_Blanco_FX5502_HM1.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/424656d133304bba9f5faca000996839_9366/Zapatillas_Stan_Smith_Blanco_FX5502_HM2.jpg"]',
      accordions: "[]",
      similarity: 0.795303498267395,
    },
    {
      id: 995,
      name: "ZAPATILLAS STAN SMITH",
      category: "Originals",
      rating: "12245",
      price: "41.799",
      color: "Off White / Pantone / Core Black",
      sizes:
        '[{"size":"34.5 (UK 3.5)","inStock":false},{"size":"35.5 (UK 4)","inStock":false},{"size":"36 (UK 4.5)","inStock":false},{"size":"36.5 (UK 5)","inStock":false},{"size":"37.5 (UK 5.5)","inStock":false},{"size":"38 (UK 6)","inStock":false},{"size":"38.5 (UK 6.5)","inStock":false},{"size":"39 (UK 7)","inStock":false},{"size":"39.5 (UK 7.5)","inStock":false},{"size":"40 (UK 8)","inStock":true},{"size":"41 (UK 8.5)","inStock":false},{"size":"41.5 (UK 9)","inStock":false},{"size":"42 (UK 9.5)","inStock":false},{"size":"43 (UK 10)","inStock":true},{"size":"43.5 (UK 10.5)","inStock":false},{"size":"44 (UK 11)","inStock":false},{"size":"45 (UK 11.5)","inStock":true},{"size":"45.5 (UK 12)","inStock":true},{"size":"46 (UK 12.5)","inStock":false},{"size":"47 (UK 13)","inStock":false}]',
      images:
        '["https://assets.adidas.com/images/w_600,f_auto,q_auto/f40541cafb6741d1bab1ac7200db8c94_9366/Zapatillas_Stan_Smith_Blanco_FZ2706_01_standard.jpg","https://assets.adidas.com/videos/w_600,f_auto,q_auto/ec5d5c07298f4998872eace900e697ae_d98c/Zapatillas_Stan_Smith_Blanco_FZ2706_video.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/d6b62c59eba542fe9251acf000e3a8fc_9366/Zapatillas_Stan_Smith_Blanco_FZ2706_011_hover_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/b0aed2bb6e9f4165a76bac7200db972c_9366/Zapatillas_Stan_Smith_Blanco_FZ2706_02_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/fe8a3d503a4d42959102ac7200db9e56_9366/Zapatillas_Stan_Smith_Blanco_FZ2706_03_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/5138e2384317419787d6ac7200dba3ff_9366/Zapatillas_Stan_Smith_Blanco_FZ2706_04_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/b5885950a4e545a394beac7200dba9de_9366/Zapatillas_Stan_Smith_Blanco_FZ2706_05_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/541a4432d16d4a408643ac7200db9191_9366/Zapatillas_Stan_Smith_Blanco_FZ2706_06_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/7e38ab8a1aa24b12b186ac72012e7281_9366/Zapatillas_Stan_Smith_Blanco_FZ2706_09_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/c26fd9e9006845cc9491ac7200dbaea6_9366/Zapatillas_Stan_Smith_Blanco_FZ2706_41_detail.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/d3775fbf328543ae8b49ac7200dbb53c_9366/Zapatillas_Stan_Smith_Blanco_FZ2706_42_detail.jpg"]',
      accordions: "[]",
      similarity: 0.793501982286431,
    },
    {
      id: 972,
      name: "ZAPATILLAS STAN SMITH PARLEY",
      category: "Hombre • Originals",
      rating: "74",
      price: "41.799",
      color: "White Tint / Cloud White / Off White",
      sizes:
        '[{"size":"36.5 (UK 5)","inStock":false},{"size":"37.5 (UK 5.5)","inStock":false},{"size":"38 (UK 6)","inStock":true},{"size":"38.5 (UK 6.5)","inStock":true},{"size":"39 (UK 7)","inStock":true},{"size":"39.5 (UK 7.5)","inStock":true},{"size":"40 (UK 8)","inStock":true},{"size":"41 (UK 8.5)","inStock":false},{"size":"41.5 (UK 9)","inStock":false},{"size":"42 (UK 9.5)","inStock":false},{"size":"43 (UK 10)","inStock":false},{"size":"43.5 (UK 10.5)","inStock":false},{"size":"44 (UK 11)","inStock":false},{"size":"45 (UK 11.5)","inStock":false},{"size":"45.5 (UK 12)","inStock":false},{"size":"46 (UK 12.5)","inStock":false}]',
      images:
        '["https://assets.adidas.com/images/w_600,f_auto,q_auto/63885ed215264facae12adf9008972cb_9366/Zapatillas_Stan_Smith_Parley_Blanco_GV7614_01_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/90a5e0ed9ba1427b871badf9008982f4_9366/Zapatillas_Stan_Smith_Parley_Blanco_GV7614_02_standard_hover.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/a63883bb00144eb2b660adf9008989db_9366/Zapatillas_Stan_Smith_Parley_Blanco_GV7614_03_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/08768a17c97446f3a8ecadf900899160_9366/Zapatillas_Stan_Smith_Parley_Blanco_GV7614_04_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/b8e79c34285c43a88b51adf9008999e6_9366/Zapatillas_Stan_Smith_Parley_Blanco_GV7614_05_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/c9311c2e80b5437d9767adf900897ba1_9366/Zapatillas_Stan_Smith_Parley_Blanco_GV7614_06_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/a9bf0f632e65439cb711adf901150eca_9366/Zapatillas_Stan_Smith_Parley_Blanco_GV7614_09_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/82816425eef94d269be1adf90089a1d3_9366/Zapatillas_Stan_Smith_Parley_Blanco_GV7614_41_detail.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/c89dd3710dd5464783d3adf90089aaaa_9366/Zapatillas_Stan_Smith_Parley_Blanco_GV7614_42_detail.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/ce1befd64d214d2eaf12ae4c00afbfe8_9366/Zapatillas_Stan_Smith_Parley_Blanco_GV7614_HM1.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/7451759fce2f4cd585a5ae4c00afcf8c_9366/Zapatillas_Stan_Smith_Parley_Blanco_GV7614_HM2.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/6ac1a571b183401c84dfae4c00afcda4_9366/Zapatillas_Stan_Smith_Parley_Blanco_GV7614_HM3.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/0d2089747b234f779a4bae4c00afba1e_9366/Zapatillas_Stan_Smith_Parley_Blanco_GV7614_HM4.jpg"]',
      accordions: "[]",
      similarity: 0.792937831221069,
    },
    {
      id: 1092,
      name: "ZAPATILLAS STAN SMITH X ANDRÉ SARAIVA",
      category: "Hombre • Originals",
      rating: "",
      price: "41.799",
      color: "Cream White / Cream White / Core Black",
      sizes: "[]",
      images:
        '["https://assets.adidas.com/videos/w_600,f_auto,q_auto/bcd1926218aa439f808faea700da16c4_d98c/Zapatillas_Stan_Smith_x_Andre_Saraiva_Blanco_GZ2202_video.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/36322b52c5614c348567ae8900228d9e_9366/Zapatillas_Stan_Smith_x_Andre_Saraiva_Blanco_GZ2202_01_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/073b45bf2ae24488bbf5ae890022b5ec_9366/Zapatillas_Stan_Smith_x_Andre_Saraiva_Blanco_GZ2202_02_standard_hover.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/0c8062243e90438dbb22ae890022ca6f_9366/Zapatillas_Stan_Smith_x_Andre_Saraiva_Blanco_GZ2202_03_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/f33e39f0f32e42b4a78aae890022e00f_9366/Zapatillas_Stan_Smith_x_Andre_Saraiva_Blanco_GZ2202_04_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/2dfd875b6c8a49bbb415ae890022f5e0_9366/Zapatillas_Stan_Smith_x_Andre_Saraiva_Blanco_GZ2202_05_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/39f57fc99c794c66931fae890022a1d0_9366/Zapatillas_Stan_Smith_x_Andre_Saraiva_Blanco_GZ2202_06_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/362252a8f8d14761a8bbae89002347eb_9366/Zapatillas_Stan_Smith_x_Andre_Saraiva_Blanco_GZ2202_09_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/03b1ab6cd8424ad5bb6cae8900232175_9366/Zapatillas_Stan_Smith_x_Andre_Saraiva_Blanco_GZ2202_41_detail.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/76b1f1ed480341a09ba3ae89002330b2_9366/Zapatillas_Stan_Smith_x_Andre_Saraiva_Blanco_GZ2202_42_detail.jpg"]',
      accordions: "[]",
      similarity: 0.789080451729998,
    },
    {
      id: 1148,
      name: "ZAPATILLAS STAN SMITH",
      category: "Hombre • Originals",
      rating: "",
      price: "41.799",
      color: "Cloud White / Cream White / Blue Bird",
      sizes: "[]",
      images:
        '["https://assets.adidas.com/videos/w_600,f_auto,q_auto/48f944b68fce459f9eacadc800e8a705_d98c/Zapatillas_Stan_Smith_Blanco_H05334_video.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/3e6fee00e9b9424fb9d1ad5600b381ea_9366/Zapatillas_Stan_Smith_Blanco_H05334_01_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/6cfe3444823a41289f28ad5600b39058_9366/Zapatillas_Stan_Smith_Blanco_H05334_02_standard_hover.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/156e5aab67fc42ee9c9dad5600b396b3_9366/Zapatillas_Stan_Smith_Blanco_H05334_03_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/1b2c9a5ac2b34895b8b8ad5600b39d6c_9366/Zapatillas_Stan_Smith_Blanco_H05334_04_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/1d3a539a897844eba475ad5600b3a51c_9366/Zapatillas_Stan_Smith_Blanco_H05334_05_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/9bc720cbbd0d4ce2a4aaad5600b3896a_9366/Zapatillas_Stan_Smith_Blanco_H05334_06_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/af333bb10d1b4802a202ad5600b3bd7b_9366/Zapatillas_Stan_Smith_Blanco_H05334_09_standard.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/8f104bacc69446e3b152ad5600b3ac3d_9366/Zapatillas_Stan_Smith_Blanco_H05334_41_detail.jpg","https://assets.adidas.com/images/w_600,f_auto,q_auto/0cf051798b054073b999ad5600b3b293_9366/Zapatillas_Stan_Smith_Blanco_H05334_42_detail.jpg"]',
      accordions: "[]",
      similarity: 0.787782180144006,
    },
  ]);
  const [answer, setAnswer] = useState<string>("");
  const [responseAdded, setResponseAdded] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<any>([]);
  // const [showSettings, setShowSettings] = useState<boolean>(false);
  const [mode, setMode] = useState<"search" | "chat">("chat");
  const [matchCount, setMatchCount] = useState<number>(3);
  // const [apiKey, setApiKey] = useState<string>(process.env.OPENAI_API_KEY);

  const handleSearch = async (event: any) => {
    // if (!apiKey) {
    //   alert("Please enter an API key.");
    //   return;
    // }
    // console.log("event mode search", event);
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
    console.log("query in search response", query);
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

  const handleAnswer = async (e: any) => {
    // if (!apiKey) {
    //   alert("Please enter an API key.");
    //   return;
    // }

    if (!query) {
      alert("Please enter a query.");
      return;
    }
    setQuery("");
    // setAnswer("");
    // setChunks([]);

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
    console.log("query", query);
    if (!searchResponse.ok) {
      setLoading(false);
      throw new Error(searchResponse.statusText);
    }
    // console.log("search", searchResponse);

    const results = await searchResponse.json();

    setChunks(results);
    // console.log("results", results);
    const prompt = endent`
      Now, let's recommend a shoe to our client based on their query: "${query}"

      ${results
        ?.map((d: any) => {
          let accordionsString = "";
          let accordions = [];
          try {
            accordions = JSON.parse(d.accordions);
          } catch (e) {
            console.log(e);
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
    // console.log(prompt);

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
    console.log("data", data);
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    setResponseAdded(false);
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setAnswer((prev) => prev + chunkValue);
      // generar id al hacer un submit
      // const newMessage = await getAnswer(prompt)

      // if (done && !responseAdded) {
      //   setResponseAdded(true);
      // }
    }
    // setHistory((prevHistory: any) => [
    //   ...prevHistory,
    //   {
    //     role: "ai",
    //     content: answer,
    //     chunks: results,
    //   },
    // ]);
    setLoading(false);
    inputRef.current?.focus();
  };

  // useEffect(() => {
  //   if (responseAdded) {
  //     setHistory((prevHistory: any) => [
  //       ...prevHistory,
  //       {
  //         role: "ai",
  //         content: answer,
  //         chunks: chunks,
  //       },
  //     ]);
  //   }
  // }, [answer, responseAdded]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (mode === "search") {
        handleSearch(e);
      } else {
        handleAnswer(e);
      }
    }
  };

  // const handleSave = () => {
  //   // if (apiKey.length !== 51) {
  //   //   alert("Please enter a valid API key.");
  //   //   return;
  //   // }

  //   // localStorage.setItem("PG_KEY", apiKey);
  //   localStorage.setItem("PG_MATCH_COUNT", matchCount.toString());
  //   localStorage.setItem("PG_MODE", mode);

  //   setShowSettings(false);
  //   inputRef.current?.focus();
  // };

  // const handleClear = () => {
  //   // localStorage.removeItem("PG_KEY");
  //   localStorage.removeItem("PG_MATCH_COUNT");
  //   localStorage.removeItem("PG_MODE");

  //   // setApiKey("");
  //   setMatchCount(5);
  //   setMode("search");
  // };

  // useEffect(() => {
  //   if (matchCount > 10) {
  //     setMatchCount(10);
  //   } else if (matchCount < 1) {
  //     setMatchCount(1);
  //   }
  // }, [matchCount]);

  // useEffect(() => {
  //   // const PG_KEY = localStorage.getItem("PG_KEY");
  //   const PG_MATCH_COUNT = localStorage.getItem("PG_MATCH_COUNT");
  //   const PG_MODE = localStorage.getItem("PG_MODE");

  //   // if (PG_KEY) {
  //   //   setApiKey(PG_KEY);
  //   // }

  //   if (PG_MATCH_COUNT) {
  //     setMatchCount(parseInt(PG_MATCH_COUNT));
  //   }

  //   if (PG_MODE) {
  //     setMode(PG_MODE as "search" | "chat");
  //   }

  //   inputRef.current?.focus();
  // }, []);
  // console.log("chunks", chunks);
  // console.log("question", question);
  // console.log(answer);
  // console.log("history", history);
  // console.log("answer", answer);
  return (
    <div className="flex flex-col justify-between h-screen overflow-y-auto p-4 bg-gray-100 sm:col-span-2 sm:col-end-9">
      <div className="p-2 flex flex-col">
        {history.map((item: any, i: number) => {
          // console.log("chunks", item.chunks);
          if (item.role === "user")
            return (
              <div key={i + item.role} className="flex flex-col">
                <div className="bg-blue-100 p-4 rounded-br-2xl rounded-l-2xl self-end max-w-xs w-full mt-4">
                  {item.content}
                </div>
              </div>
            );
          if (item.role === "ai")
            return (
              <div key={i + item.role} className="flex flex-col">
                <div className="self-start max-w-xs w-full mt-4">
                  <AnswerComponent images={item.chunks} answer={item.content} />
                </div>
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
      <div className="flex gap-2 relative">
        <Input
          ref={inputRef}
          type="text"
          className="p-4 rounded-xl h-12 mb-4 border-gray-400"
          placeholder="Want some Stan Smith?"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <Button
          onClick={mode === "search" ? handleSearch : handleAnswer}
          className="text-xs lg:text-sm absolute top-1 right-0 bg-transparent"
        >
          🔍
        </Button>
      </div>
    </div>
  );
}
