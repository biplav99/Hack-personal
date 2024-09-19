import { Image } from "@fluentui/react-components";
import { useState } from 'react';
import { Navigation24Filled } from "@fluentui/react-icons";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { Container } from "react-bootstrap";


function top() {
  const { instance } = useMsal();

  const activeAccount = instance.getActiveAccount();
  const [showLogout, setShowLogout] = useState(false);

  const handleAvatarClick = () => {
    setShowLogout(!showLogout);
  };

  const handleLogout = () => {
    instance.logoutRedirect().catch((error) => console.log(error));
    console.log('User logged out!');
  }
  return (
    <div className="topSection">
      <Navigation24Filled className="navigation" />
      <header className="App-header">
        <p>Unified Support</p>
      </header>
      <UnauthenticatedTemplate>
        <Image alt="Erik Nason" src="../src/assets/ErikNason.jpg" className="headerlogo" />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        {activeAccount ? (
          <Container>
            <div>
              <Image alt="Erik Nason" className="headerlogo"
                src="../src/assets/ErikNason.jpg"
                onClick={handleAvatarClick}
                style={{ cursor: 'pointer' }}
              />
              {showLogout && (
                <button className="btnLgOut" onClick={handleLogout}>Logout</button>
              )}
            </div>
          </Container>
        ) : null}
      </AuthenticatedTemplate>

    </div>
  );
}

export default top;
