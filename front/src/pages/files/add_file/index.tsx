import { Box, IconButton, Paper } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { useTranslation } from "react-i18next";
import classes from "./styles.module.scss";
import { UploadFile as AddFileIcon } from "@mui/icons-material";
import { FormEvent, useState } from "react";
import { File as ShortFile } from "../../../common/data.types";
import { filesRepository } from "../../../repositories";

type AddFileProps = {
  onAdd: (l: ShortFile) => void;
};

const AddFile: React.FC<AddFileProps> = ({ onAdd }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleChangeFile = (newFile: File | null) => {
    setFile(newFile || null);
    setIsValid(newFile !== null);
  };

  const handleAdd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (file) {
      setIsLoading(true);

      const createdText = await filesRepository.add(file);
      onAdd(createdText);

      setFile(null);
      setIsValid(false);
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Paper
        className={classes.input_container}
        variant="outlined"
        component="form"
        onSubmit={handleAdd}
      >
        <MuiFileInput
          variant="standard"
          value={file}
          onChange={handleChangeFile}
          sx={{ ml: 1, flex: 1 }}
          placeholder={t("files.add_placeholder")}
        />
        <IconButton
          type="submit"
          className={classes.add_button}
          aria-label={t("files.add_button_aria_label")}
          disabled={!isValid || isLoading}
        >
          <AddFileIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default AddFile;
