import { Grid, IconButton, ListItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import {ContentCopy as ContentCopyIcon, DeleteOutline as DeleteIcon, Launch as LaunchIcon} from "@mui/icons-material";
import LinksContext from "../../links_context";
import { useContext, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Link as ShortLink } from "../../../common/data.types";
import { linksRepository } from "../../../repositories";
import classes from "./styles.module.scss";

type LinksListItemProps = {
    link: ShortLink,
    onDelete: (id:string) => void,
    onShortenedURLCopied: () => void
};

const LinksListItem:React.FC<LinksListItemProps> = ({link, onDelete, onShortenedURLCopied}) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const {t} = useTranslation();
    const links = useContext(LinksContext);

    const sortedLink = Object.values(links);
    sortedLink.sort((a, b) => (new Date(a.created_at) > new Date(b.created_at) ? -1 : 1));

    const handleDelete = async () => {
        setIsDisabled(true);
        await linksRepository.delete(link);
        onDelete(link.id);
    };

    return <ListItem className={classes.root} disableGutters
                secondaryAction={
                    <IconButton className={classes.delete_button} aria-label={t("links.delete_button_aria_label")} disabled={isDisabled} onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                }
            >
            <Grid alignItems="center" container direction="row" flexWrap="nowrap">
                <Grid className={classes.primary_info} container direction="column">
                    <Grid>
                        <CopyToClipboard text={link.short_url} onCopy={onShortenedURLCopied} options={{format: "text/plain"}}>
                            <IconButton className={classes.copy_button} aria-label={t("links.copy_button_aria_label")} disabled={isDisabled}>
                                <ContentCopyIcon />
                            </IconButton>
                        </CopyToClipboard>
                        <span>{link.id}</span>
                    </Grid>
                    <Grid>{new Date(link.created_at).toLocaleString()}</Grid>
                </Grid>
                <Grid container flexGrow={1} direction="column" sx={{overflow:"hidden"}}>
                    <Grid className={classes.url}><a href={link.link} title={t("links.open_original")}>{link.link}</a></Grid>
                    <Grid className={classes.numbers}><LaunchIcon /> {link.hit_count} </Grid>
                </Grid>
            </Grid>
    </ListItem>;
};

export default LinksListItem;