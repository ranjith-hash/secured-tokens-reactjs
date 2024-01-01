import React, { useState } from 'react'

const CpxAuth = () => {

    const[sam, setsam] = useState("")
    // Some React component

const saveTokenToServiceWorker = token => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        action: 'saveToken',
        token: token,
      });
    }
  };
  
  const getTokenFromServiceWorker = async () => {
    return new Promise(resolve => {
      if (navigator.serviceWorker.controller) {
        const messageChannel = new MessageChannel();
        messageChannel.port1.onmessage = event => {
          resolve(event.data);
        };
  
        navigator.serviceWorker.controller.postMessage(
          { action: 'getToken' },
        //   [messageChannel.port2]
        );
      } else {
        resolve(null);
      }
    });
  };
  
//   // Usage
//   const token = "sampletoken";
//   saveTokenToServiceWorker(token);
  
//   // Later in your code
//   const savedToken = await getTokenFromServiceWorker();
//   console.log('Access Token from Service Worker:', savedToken);
  
  const SaveToken =  () =>{
    const token = "eykajbsc;kjsdbc;ksjbcd;skjcb;ksjbc"
    saveTokenToServiceWorker(token)


  }

  const GetToken = async () => {
    const savedToken = await getTokenFromServiceWorker();
    console.log('Access Token from Service Worker:', savedToken);
    setsam(savedToken)
  }


  return (
    <div>
        <h1>{sam}</h1>

        <button onClick={SaveToken}>Save Token</button>
        <button onClick={GetToken}>Get Token</button>

    </div>
  )
}

export default CpxAuth