import { Route } from "react-router-dom";
import classes from "./app.module.scss";
import { MemoryRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { Content, MainMenu } from "./components";
import { Files, Links, Texts } from "./pages";
import AppContext from "./app_context";
import { useEffect, useState } from "react";
import { App as ShortApp } from "./common/data.types";
import { appRepository } from "./repositories";
import { config } from "./core";

const theme = createTheme({
  spacing: 16,
});

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [appContextValue, setAppContextValue] = useState<ShortApp>();
  useEffect(() => {
    (async() => {
      const app = await appRepository.get()
      setAppContextValue(app);
      config.domain = app.domain;
      setIsLoading(false);
    })();
  }, []);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={appContextValue}>
          <div className={classes.root}>
            {!isLoading ? <>
              <MainMenu />
              <Content>
                <Route path="/" element={<Links />} />
                <Route path="/texts" element={<Texts />} />
                <Route path="/files" element={<Files />} />
              </Content>
            </> : null}
          </div>
        </AppContext.Provider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
