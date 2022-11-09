import { Grid, IconButton, ListItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import {ContentCopy as ContentCopyIcon, DeleteOutline as DeleteIcon, FileDownload as DownloadIcon, Visibility as ViewIcon} from "@mui/icons-material";
import LinksContext from "../../links_context";
import { useContext, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { File as ShortFile } from "../../../common/data.types";
import { filesRepository } from "../../../repositories";
import classes from "./styles.module.scss";

type TextsListItemProps = {
    file: ShortFile,
    onDelete: (id:string) => void,
    onShortenedURLCopied: () => void
};

const TextsListItem:React.FC<TextsListItemProps> = ({file, onDelete, onShortenedURLCopied}) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const {t} = useTranslation();
    const links = useContext(LinksContext);

    const sortedLink = Object.values(links);
    sortedLink.sort((a, b) => (new Date(a.created_at) > new Date(b.created_at) ? -1 : 1));

    const handleDelete = async () => {
        setIsDisabled(true);
        await filesRepository.delete(file);
        onDelete(file.id);
    };

    return <ListItem className={classes.root} disableGutters
                secondaryAction={
                    <IconButton className={classes.delete_button} aria-label={t("files.delete_button_aria_label")} disabled={isDisabled} onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                }
            >
            <Grid alignItems="center" container direction="row" flexWrap="nowrap">
                <Grid className={classes.primary_info} container direction="column">
                    <Grid>
                        <CopyToClipboard text={file.short_url} onCopy={onShortenedURLCopied} options={{format: "text/plain"}}>
                            <IconButton className={classes.copy_button} aria-label={t("files.copy_button_aria_label")} disabled={isDisabled}>
                                <ContentCopyIcon />
                            </IconButton>
                        </CopyToClipboard>
                        <span>{file.id}</span>
                    </Grid>
                    <Grid>{new Date(file.created_at).toLocaleString()}</Grid>
                </Grid>
                <Grid container flexGrow={1} direction="column" sx={{overflow:"hidden"}}>
                    <Grid className={classes.filename}>{file.name}</Grid>
                    <Grid className={classes.numbers}><ViewIcon /> {file.hit_count} <DownloadIcon /> {file.download_count} </Grid>
                </Grid>
            </Grid>
    </ListItem>;
};

export default TextsListItem;