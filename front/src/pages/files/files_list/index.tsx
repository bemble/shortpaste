import { List, Paper } from "@mui/material";
import classes from "./styles.module.scss";
import { useContext, useEffect, useState } from "react";
import FilesListItem from "../files_list_item";
import { FilterInput } from "../../../components";
import FilesContext from "../../files_context";
import { File as ShortFile } from "../../../common/data.types";

type TextsListProps = {
    onShortenedURLCopied: () => void,
    onDelete: (id:string) => void
};

const TextsList:React.FC<TextsListProps> = ({onDelete, onShortenedURLCopied}) => {
    const [filtredList, setFiltredList] = useState<ShortFile[]>([]);
    const [filterQuery, setFilterQuery] = useState("");
    const files = useContext(FilesContext);

    useEffect(() => {
        let search = filterQuery.toLowerCase();
        const sortedFiles = Object.values(files).filter(e => !search.length
            || e.id.toLowerCase().indexOf(search) >= 0
            || e.name.toLowerCase().indexOf(search) >= 0
            || e.mime.toLowerCase().indexOf(search) >= 0);
            sortedFiles.sort((a, b) => (new Date(a.created_at) > new Date(b.created_at) ? -1 : 1));
        setFiltredList(sortedFiles);
    }, [files, filterQuery]);

    return <Paper variant="outlined" className={classes.root}>
        <FilterInput onChange={setFilterQuery}/>
        <List className={classes.list}>
            {filtredList.map((file) => <FilesListItem key={file.id} file={file} onDelete={onDelete} onShortenedURLCopied={onShortenedURLCopied} />)}
        </List>
    </Paper>;
};

export default TextsList;