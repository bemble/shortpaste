import classes from "./styles.module.scss";
import {Routes} from "react-router-dom";
import { Box } from "@mui/system";

type ContentProps = {
    children: React.ReactNode
}

const Content:React.FC<ContentProps> = ({children}) => {
    return <Box className={classes.root}>
        <Routes>{children}</Routes>
    </Box>;
};

export default Content;