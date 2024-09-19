import { Image } from "@fluentui/react-components";
import { useState } from 'react';
import { Navigation24Filled } from "@fluentui/react-icons";
import { AuthenticatedTemplate, useMsal } from "@azure/msal-react";


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
    <div className="topSection conatainer">
      <div className="row">
        <div className="col-2 nav-logo"><Navigation24Filled className="navigation" /></div>
        <div className="col-7 brandname">Unified Support</div>
      </div>
      <AuthenticatedTemplate>
        {activeAccount ? (
            <div className="col-3">
              <Image alt="Erik Nason" className="headerlogo"
                src="../src/assets/ErikNason.jpg"
                onClick={handleAvatarClick}
                style={{ cursor: 'pointer' }}
              />
              {showLogout && (
                <div>
                <button className="btnLgOut" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
        ) : null}
      </AuthenticatedTemplate>

    </div>
  );
}

export default top;
