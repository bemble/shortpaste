import { List, Paper } from "@mui/material";
import classes from "./styles.module.scss";
import { useContext, useEffect, useState } from "react";
import TextsListItem from "../texts_list_item";
import { FilterInput } from "../../../components";
import TextsContext from "../../texts_context";
import { Text as ShortText } from "../../../common/data.types";

type TextsListProps = {
    onShortenedURLCopied: () => void,
    onDelete: (id:string) => void
};

const TextsList:React.FC<TextsListProps> = ({onDelete, onShortenedURLCopied}) => {
    const [filtredList, setFiltredList] = useState<ShortText[]>([]);
    const [filterQuery, setFilterQuery] = useState("");
    const texts = useContext(TextsContext);

    useEffect(() => {
        let search = filterQuery.toLowerCase();
        const sortedTexts = Object.values(texts).filter(e => !search.length
            || e.id.toLowerCase().indexOf(search) >= 0
            || e.text.toLowerCase().indexOf(search) >= 0);
            sortedTexts.sort((a, b) => (new Date(a.created_at) > new Date(b.created_at) ? -1 : 1));
        setFiltredList(sortedTexts);
    }, [texts, filterQuery]);

    return <Paper variant="outlined" className={classes.root}>
        <FilterInput onChange={setFilterQuery}/>
        <List className={classes.list}>
            {filtredList.map((text) => <TextsListItem key={text.id} text={text} onDelete={onDelete} onShortenedURLCopied={onShortenedURLCopied} />)}
        </List>
    </Paper>;
};

export default TextsList;