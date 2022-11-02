import {NavLink} from "react-router-dom";
import classnames from "classnames";
import { SectionColor } from "../../../common/common.types";

import classes from "./styles.module.scss";

type ItemProps = {
    to: string,
    color: SectionColor,
    children: React.ReactNode
};

const Item:React.FC<ItemProps> = ({to, color, children}) => {
    if (to.startsWith("http")) {
        return <a href={to} className={classnames(classes.root, classes[color])}>
            {children}
        </a>;
    }
    return <NavLink to={to} end={to === "/"} className={({isActive}) => classnames(classes.root, classes[color], {[classes.active]: isActive}) }>
        {children}
    </NavLink>;
};

export default Item;