import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import {  Image } from "@fluentui/react-components";

function Login() {

  return (
    <FluentProvider theme={webLightTheme}>
      <div className="App container">
        <div className="row loginimg">
          <div className="col"><Image alt="ATT" src="../src/assets/logo-img.png" className="logo" /></div>
        </div>
      </div>
    </FluentProvider>
  );
}

export default Login;
