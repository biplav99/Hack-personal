import { useState } from "react";
import "./App.css";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { Button } from "@fluentui/react-components";

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <div className="App">
        <header className="App-header">
          <p>Unified Support</p>
        </header>
        <p>Get Started</p>
        <p>
          Welcome to the Unified Support App. Simply click "New Issue" to get
          started
        </p>
        <Button shape="circular" size="large">New Issue</Button>
      </div>
    </FluentProvider>
  );
}

export default App;
