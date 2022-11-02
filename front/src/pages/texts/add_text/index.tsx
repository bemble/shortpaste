import { Box, IconButton, InputBase, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import classes from "./styles.module.scss";
import {PostAdd as AddTextIcon} from "@mui/icons-material";
import { ChangeEvent, FormEvent, useState } from "react";
import {Text as ShortText} from "../../../common/data.types";
import { textsRepository } from "../../../repositories";

type AddTextProps = {
    onAdd: (l: ShortText) => void
};

const AddText:React.FC<AddTextProps> = ({onAdd}) => {
    const [text, setText] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {t} = useTranslation();

    const handleChangeText = (e:ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
        setIsValid(e.target.validity.valid);
    };

    const handleAdd = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);
        
        const createdText = await textsRepository.add({text});
        onAdd(createdText);

        setText("");
        setIsValid(false);
        setIsLoading(false);
    };

    return <Box>
        <Paper className={classes.input_container} variant="outlined"
            component="form"
            onSubmit={handleAdd}
            >
            <InputBase
                multiline maxRows={8}
                value={text} disabled={isLoading}
                onChange={handleChangeText}
                sx={{ ml: 1, flex: 1 }}
                placeholder={t("texts.add_placeholder")}
                inputProps={{ 'aria-label': t("texts.add_aria_label"), required: true }}
            />
            <IconButton type="submit" className={classes.add_button} aria-label={t("texts.add_button_aria_label")} disabled={!isValid || isLoading}>
                <AddTextIcon />
            </IconButton>
        </Paper>
    </Box>;
};

export default AddText;