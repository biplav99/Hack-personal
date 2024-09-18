import "./App.css";
import { lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import Top from "./sections/top.tsx";
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { Container, Button } from "react-bootstrap";
import { loginRequest } from './authConfig';
import { AddRegular } from "@fluentui/react-icons";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from "./Chat.tsx";

const Login = lazy(() => import("./pages/Login.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));



const MainContent = () => {
  /**
   * useMsal is hook that returns the PublicClientApplication instance,
   * that tells you what msal is currently doing. For more, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
   */
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  const handleRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: 'create',
      })
      .catch((error) => console.log(error));
  };
  const handleLogoutRedirect = () => {
    instance.logoutRedirect().catch((error) => console.log(error));
};
  return (
    <FluentProvider theme={webLightTheme}>
      <div className="App container">
        <AuthenticatedTemplate>
          {activeAccount ? (
            <Container>
              <Top />
            <div className="row">
            <div className="col-sm-12 col-xs-12">
                        <Button variant="warning" onClick={handleLogoutRedirect}>
                            Sign out
                        </Button>
                    </div>
                    <Dashboard/>
            </div>  
            </Container>
          ) : null}
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <BrowserRouter>
            <div className="TopContainer">
              <Top />
            </div>
            <div className="MainContainer">
              <Login />
            </div>
          </BrowserRouter>
          <p className="getStarted">Get Started</p>
          <p className="welcome">
            Welcome to the Unified Support App. Simply click "New Issue" to get
            started
          </p>
          <Button
            shape="circular"
            size="large"
            className="btnNewIssue"
            onClick={handleRedirect}
          >
           <AddRegular /> New Issue
          </Button>
        </UnauthenticatedTemplate>
      </div>
    </FluentProvider>
  );
};


/**
* msal-react is built on the React context API and all parts of your app that require authentication must be 
* wrapped in the MsalProvider component. You will first need to initialize an instance of PublicClientApplication 
* then pass this to MsalProvider as a prop. All components underneath MsalProvider will have access to the 
* PublicClientApplication instance via context as well as all hooks and components provided by msal-react. For more, visit:
* https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
*/
const App = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
      <MainContent />
    </MsalProvider>
  );
};

export default App;
