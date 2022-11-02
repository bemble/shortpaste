import classes from "./styles.module.scss";
import Item from "./item";

import LogoIcon from "../../assets/logo.png";
import {Link as LinkIcon, TextSnippetOutlined as TextIcon, FilePresent as FileIcon} from '@mui/icons-material';
import { AppBar, Drawer, Toolbar } from "@mui/material";
import { useTranslation } from "react-i18next";

const MainMenu:React.FC = () => {
  const {t} = useTranslation();

    return <>
    <AppBar position="fixed" className={classes.root_bottom} sx={{ display: { xs: 'block', md: 'none' }, top: 'auto', bottom: 0 }}>
      <Toolbar>
        <Item to="/" color="blue"><LinkIcon />{t("menu.links")}</Item>
        <Item to="/texts" color="purple"><TextIcon />{t("menu.texts")}</Item>
        <Item to="/files" color="pink"><FileIcon />{t("menu.files")}</Item>
      </Toolbar>
    </AppBar>
    <Drawer variant="permanent" open={true} className={classes.root_left} sx={{ display: { xs: 'none', md: 'block' } }}>
        <div className={classes.logo}><img src={LogoIcon} alt="Short{Paste}" /></div>
        <Item to="/" color="blue"><LinkIcon />{t("menu.links")}</Item>
        <Item to="/texts" color="purple"><TextIcon />{t("menu.texts")}</Item>
        <Item to="/files" color="pink"><FileIcon />{t("menu.files")}</Item>
    </Drawer>
  </>;
};

export default MainMenu;