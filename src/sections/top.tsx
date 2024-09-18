import { Image } from "@fluentui/react-components";
import { Navigation24Filled } from "@fluentui/react-icons";
// import "./src/assets/ErikNason.jpg";

function top() {
  return (
    <div className="topSection">
    <Navigation24Filled className="navigation"/>
      <header className="App-header">
        <p>Unified Support</p>
      </header>
      <Image alt="Erik Nason" src="../src/assets/ErikNason.jpg" className="headerlogo" />
    </div>
  );
}

export default top;
