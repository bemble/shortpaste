import { Route } from "react-router-dom";
import classes from './app.module.scss';
import {MemoryRouter as Router} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { Content, MainMenu } from './components';
import { Files, Links, Texts } from './pages';

const theme = createTheme({
    spacing: 16,
});

function App() {
  return <Router basename={process.env.PUBLIC_URL}>
    <ThemeProvider theme={theme}>
    <div className={classes.root}>
      <MainMenu />
      <Content>
          <Route path="/" element={<Links />} />
          <Route path="/texts" element={<Texts />} />
          <Route path="/files" element={<Files />} />
      </Content>
    </div>
  </ThemeProvider>
  </Router>;
}

export default App;
