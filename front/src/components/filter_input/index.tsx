import { useEffect, useState } from "react";
import { IconButton, TextField, Box } from "@mui/material";
import {FilterList as FilterListIcon, FilterListOff as FilterListOffIcon} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import classes from "./styles.module.scss";

type FilterInputProps = {
    onChange: (query:string) => void
};

const FilterInput:React.FC<FilterInputProps> = ({onChange}) => {
    const [filterQuery, setFilterQuery] = useState("");
    const {t} = useTranslation();

    useEffect(() => {
        onChange(filterQuery);
    }, [filterQuery]);

    return <Box className={classes.root}>
        <IconButton
            className={classes.clear_button}
            aria-label={t("actions.clear_filter_label")}
            onClick={() => setFilterQuery("")}
        >
            {filterQuery.length ? <FilterListOffIcon />: <FilterListIcon />}
        </IconButton>
        <TextField 
            fullWidth
            variant="standard"
            label={t("actions.filter")}
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
        />
    </Box>;
};

export default FilterInput;