import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import io from "socket.io-client";
import { chunks, attemptToParseURLH } from "./utils/streamParser";
import List from "./components/List";
import "./App.css";
const DEBUG_MODE = false;

// "enum"
// const APP_STATES = [
//   "page_loaded",
//   "prompt_response_active",
//   "prompt_response_finished",
//   "prompt_response_error",
// ];

function App() {
  const [counter, setCounter] = useState(0);

  const [raw, setRaw] = useState([]);
  const [data, setData] = useState({});
  const [socket, setSocket] = useState(null);
  const [voiceActivated, setVoiceActivated] = useState(false);
  const [smokeAlarm, setSmokeAlarm] = useState(false);
  const [streamingFinished, setStreamingFinished] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (DEBUG_MODE) return;
    if (!annyang) return;
    if (!socket) return;
    if (!voiceActivated) return;
    annyang.start();
    annyang.addCallback("result", (userSaid) => {
      console.log("User may have said:", userSaid);
      setVoiceActivated(false);
      handleVoiceSubmit(userSaid[0]);
    });

    return () => {
      annyang.removeCallback("result");
      annyang.abort();
    };
  }, [socket, voiceActivated]);

  function handleVoiceSubmit(voiceInput) {
    setStreamingFinished(false);
    socket.emit("user-prompt", voiceInput);
  }

  useEffect(() => {
    if (DEBUG_MODE) return;
    console.log(">>>>>>>", raw);
    attemptToParseURLH(raw, data, setData, smokeAlarm, setSmokeAlarm);
  }, [raw]);

  useEffect(() => {
    if (DEBUG_MODE) return;

    const _socket = io(import.meta.env.VITE_APP_AI_API, {
      transports: ["websocket"],
    });
    setSocket(_socket);
    _socket.on("ai-streaming-response", (msg) => {
      setStreamingFinished(false);
      setRaw((raw) => [...raw, msg]);
    });
    _socket.on("ai-streaming-response-finished", (msg) => {
      setStreamingFinished(true);
    });
    _socket.on("connect", () => {
      console.log("connected");
    });

    return () => {
      _socket.close();
    };
  }, []);

  useEffect(() => {
    if (!DEBUG_MODE) return;

    attemptToParseURLH(raw, data, setData, smokeAlarm, setSmokeAlarm);
    setTimeout(() => {
      setStreamingFinished(true);
    }, 10000);
  }, [raw]);

  useEffect(() => {
    if (!DEBUG_MODE) return;
    if (counter >= chunks.length) return;
    const interval = setTimeout(() => {
      setCounter((counter) => counter + 1);
      setRaw((raw) => [...raw, chunks[counter]]);
    }, 50);

    return () => clearTimeout(interval);
  }, [counter]);

  if (smokeAlarm) {
    return (
      <div className="wrapping flex flex-col items-center h-full">
        <Header />
        <h1 className="text-6xl">SMOKE ALARM</h1>
      </div>
    );
  } else {
    return (
      <div className="wrapping flex flex-col items-center h-full">
        <Header />
        <Form
          voiceActivated={voiceActivated}
          socket={socket}
          setVoiceActivated={setVoiceActivated}
          setStreamingFinished={setStreamingFinished}
          streamingFinished={streamingFinished}
          initialLoad={initialLoad}
          setInitialLoad={setInitialLoad}
          setData={setData}
          setRaw={setRaw}
        />

        {Object.keys(data).length > 0 && (
          <div className="wrapperStyle max-w-5xl  flex flex-col p-3">
            {" "}
            <div className="flex">
              {Object.keys(data).map((key) => (
                <div className="flex-1 m-1" key={key}>
                  <div className="w-full itemStyle mb-5 p-4 text-center">
                    <h1 className="itemTitle text-xl">{key}</h1>
                    <h2>{data[key].description}</h2>
                  </div>
                </div>
              ))}{" "}
              {/* DELETEME */}
            </div>{" "}
            {/* DELETEME */}
            <div className="flex">
              {" "}
              {/* DELETEME */}
              {Object.keys(data).map((key) => (
                <div className="flex-1 m-1" key={key}>
                  <List
                    substeps={data[key].substeps}
                    socket={socket}
                    setVoiceActivated={setVoiceActivated}
                    streamingFinished={streamingFinished}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default App;
