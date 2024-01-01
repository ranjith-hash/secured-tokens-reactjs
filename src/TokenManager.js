// src/TokenManager.js
import React, { useState, useEffect } from 'react';
// import axios from 'axios';

const TokenManager = () => {
  const [token, setToken] = useState("");

  const [retToken, setRetToke] = useState("")

  useEffect(() => {
    // Retrieve token when the component mounts
    retrieveToken();
  }, []);

  const retrieveToken = async () => {
    if ('serviceWorker' in navigator) {
      // Use the MessageChannel API to communicate with the service worker
      const channel = new MessageChannel();
      channel.port1.onmessage = (event) => {
        setToken(event.data);
        setRetToke(event.data)
        console.log("ret data",event.data)
      };

      navigator.serviceWorker.controller.postMessage({ type: "GET_TOKEN" }, [channel.port2]);
    }
  };

  const saveToken = async () => {
    // const response = await axios.get('YOUR_TOKEN_ENDPOINT');
    const newToken = "SampleToken";

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.controller.postMessage({ type: "SAVE_TOKEN", token: newToken });
    }

    setToken(newToken);
  };

  return (
    <div>
      <p>Access Token: {token || "No token saved"}</p>
      <p>ret Token: {retToken || "No token saved"}</p>
      <button onClick={saveToken}>Save Token</button>
      <button onClick={retrieveToken}>ret Token</button>

    </div>
  );
};

export default TokenManager;
