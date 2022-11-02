import classes from "./styles.module.scss";
import classnames from "classnames";

type HeaderProps = {
    children: React.ReactNode
};

const Header:React.FC<HeaderProps> = ({children}) => {
    return <div className={classnames({[classes.root]: true})}>
        {children}
    </div>;
};

export default Header;