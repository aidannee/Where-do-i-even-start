import React, { useState, useEffect, useRef } from "react";

import "/src/App.css";

export default function Form({
  voiceActivated,
  setVoiceActivated,
  socket,
  setStreamingFinished,
  streamingFinished,
  initialLoad,
  setInitialLoad,
  setData,
  setRaw,
}) {
  const inputRef = useRef(null);
  function handleSubmit(e) {
    if (!streamingFinished) return; // guard clause
    setInitialLoad(false);
    setStreamingFinished(false);
    e.preventDefault();

    socket.emit("user-prompt", e.target.elements.userInputField.value);
  }
  function newRequest(e) {
    e.preventDefault();

    inputRef.current.focus();
    inputRef.current.value = "";
    setData({});
    setRaw([]);
    setInitialLoad(true);
  }
  return (
    <>
      <form className="w-full flex flex-col" onSubmit={handleSubmit}>
        <div className="flex items-center w-full flex-col">
          <div className=" text-center w-full">
            {" "}
            <input
              ref={inputRef}
              name="userInputField"
              className=" w-1/2 p-2 m-2 bg-transparent border-none border-0 "
              id="userInputField"
              type="text"
            />
            {!streamingFinished ? (
              <button className="buttonStyle" disabled>
                Please wait
              </button>
            ) : initialLoad ? (
              <button className="buttonStyle">Submit</button>
            ) : (
              <button onClick={newRequest} className="buttonStyle">
                New request
              </button>
            )}
          </div>

          {/* VOICE ACTIVATION BUTTON */}

          {!initialLoad || window.innerWidth <= 768 ? (
            ""
          ) : (
            <button
              style={
                voiceActivated
                  ? {
                      boxShadow:
                        "inset 6px 6px 10px #c99bc3, inset -6px -6px 10px #edb7e5",
                    }
                  : {}
              }
              className={` w-1/3
        ${voiceActivated ? "itemStyle" : ""} 
          buttonStyle`}
              onClick={() => setVoiceActivated((va) => !va)}
            >
              Voice Activated: {voiceActivated ? "ON" : "OFF"}
            </button>
          )}
        </div>
      </form>
    </>
  );
}
