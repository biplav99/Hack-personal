import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import {  Image } from "@fluentui/react-components";

function Login() {

  return (
    <FluentProvider theme={webLightTheme}>
      <div className="App">
        <div
          style={{
            display: "flex",
            gap: 8,
            top: "150px",
            position: "absolute"
          }}
        >
          <Image alt="ATT" src="../src/assets/att.svg" className="logo" />
          <Image alt="Apple" src="../src/assets/apple.svg" className="logo" />
          <Image alt="BAC" src="../src/assets/bac.png" className="logo" />
          <Image
            alt="Lululemon"
            src="../src/assets/lululemon.png"
            className="logo"
          />
          <Image
            alt="Microsoft"
            src="../src/assets/microsoft.png"
            className="logo"
          />
          <Image alt="Nike" src="../src/assets/nike.svg" className="logo" />
        </div>
      </div>
    </FluentProvider>
  );
}

export default Login;
