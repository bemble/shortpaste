import { Box, IconButton, InputBase, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import classes from "./styles.module.scss";
import {AddLink as AddLinkIcon} from "@mui/icons-material";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link as ShortLink } from "../../../common/data.types";
import { linksRepository } from "../../../repositories";

type AddLinkProps = {
    onAdd: (l: ShortLink) => void
};

const AddLink:React.FC<AddLinkProps> = ({onAdd}) => {
    const [url, setURL] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {t} = useTranslation();

    const handleChangeUrl = (e:ChangeEvent<HTMLInputElement>) => {
        setURL(e.target.value);
        setIsValid(e.target.validity.valid);
    };

    const handleAdd = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);
        
        const link = await linksRepository.add({link: url});
        onAdd(link);

        setURL("");
        setIsValid(false);
        setIsLoading(false);
    };

    return <Box>
        <Paper className={classes.input_container} variant="outlined"
            component="form"
            onSubmit={handleAdd}
            >
            <InputBase
                value={url} disabled={isLoading}
                onChange={handleChangeUrl}
                sx={{ ml: 1, flex: 1 }}
                placeholder={t("links.add_placeholder")}
                inputProps={{ 'aria-label': t("links.add_aria_label"), type: "url", required: true }}
            />
            <IconButton type="submit" className={classes.add_button} aria-label={t("links.add_button_aria_label")} disabled={!isValid || isLoading}>
                <AddLinkIcon />
            </IconButton>
        </Paper>
    </Box>;
};

export default AddLink;