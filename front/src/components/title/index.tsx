import classes from "./styles.module.scss";
import classnames from "classnames";
import { SectionColor } from "../../common/common.types";

type TitleProps = {
    secondary?:boolean,
    color?: SectionColor,
    children: React.ReactNode
};

const Title:React.FC<TitleProps> = ({secondary, color, children}) => {
    return <h1 className={classnames({[classes.root]: true, [classes.secondary]: secondary})}>
        {color && !secondary ? <span className={classnames({[classes.ColorIntro]: true, [classes[color]]: true})} /> : null }
        {children}
    </h1>;
}

export default Title;