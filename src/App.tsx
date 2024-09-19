import "./App.css";
import Top from "./sections/top.tsx";
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { Container, Button } from "react-bootstrap";
import { loginRequest } from './authConfig';
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx'


const MainContent = () => {

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
  return (
    <FluentProvider theme={webLightTheme}>
      <div className="App container">
        <AuthenticatedTemplate>
          {activeAccount ? (
            <Container>
              <Top />
              <Dashboard />
            </Container>
          ) : null}
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Top />
          <div className="row loginwrapper">
            <p className="getStarted">Hi there!</p>
            <p className="welcome"> Welcome to STORES</p>
          </div>
          <div className="row">
            <Button shape="circular" size="large" className="btnNewIssue" onClick={handleRedirect}>
              Get Started </Button>
          </div>
          <div className="MainContainer">
            <Login />
          </div>
        </UnauthenticatedTemplate>
      </div>
    </FluentProvider>
  );
};


const App = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
      <MainContent />
    </MsalProvider>
  );
};

export default App;
