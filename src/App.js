import TokenManager from "./TokenManager";



function App() {

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/serviceWorker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Token Storage App</h1>
        <TokenManager />
      </header>
    </div>
  );
}

export default App;
