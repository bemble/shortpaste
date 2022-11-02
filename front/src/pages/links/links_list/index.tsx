import { List, Paper } from "@mui/material";
import classes from "./styles.module.scss";
import LinksContext from "../../links_context";
import { useContext, useEffect, useState } from "react";
import LinksListItem from "../links_list_item";
import { Link as ShortLink } from "../../../common/data.types";
import { FilterInput } from "../../../components";

type LinksListProps = {
    onShortenedURLCopied: () => void,
    onDelete: (id:string) => void
};

const LinksList:React.FC<LinksListProps> = ({onDelete, onShortenedURLCopied}) => {
    const [filtredList, setFiltredList] = useState<ShortLink[]>([]);
    const [filterQuery, setFilterQuery] = useState("");
    const links = useContext(LinksContext);

    useEffect(() => {
        let search = filterQuery.toLowerCase();
        const sortedLinks = Object.values(links).filter(e => !search.length
            || e.id.toLowerCase().indexOf(search) >= 0
            || e.link.toLowerCase().indexOf(search) >= 0);
        sortedLinks.sort((a, b) => (new Date(a.created_at) > new Date(b.created_at) ? -1 : 1));
        setFiltredList(sortedLinks);
    }, [links, filterQuery]);

    return <Paper variant="outlined" className={classes.root}>
        <FilterInput onChange={setFilterQuery}/>
        <List className={classes.list}>
            {filtredList.map((link) => <LinksListItem key={link.id} link={link} onDelete={onDelete} onShortenedURLCopied={onShortenedURLCopied} />)}
        </List>
    </Paper>;
};

export default LinksList;