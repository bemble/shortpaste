import { Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Header, Spacer, Title } from "../../components";
import { File as ShortFile } from "../../common/data.types";
import { filesRepository } from "../../repositories";
import FilesContext from "../files_context";
import AddFile from "./add_file";
import FilesList from "./files_list";
import copy from 'copy-to-clipboard';

const Links:React.FC = () => {
    const [files, setFiles] = useState<Record<string, ShortFile>>({});
    const [displayCopySnack, setDisplayCopySnack] = useState(false);
    const {t} = useTranslation();

    useEffect(() => {
        (async () => {
            const files = await filesRepository.getAll();
            setFiles(files);
        })();
    }, []);

    const handleFileAdded = (f:ShortFile) => {
        setFiles({...files, [f.id]: f});
        copy(f.short_url);
        setDisplayCopySnack(true);
    };

    const handleFileDeleted = (id:string) => {
        const newFiles = {...files};
        delete newFiles[id];
        setFiles(newFiles);
    };

    const handleURLCopied = () => {
        setDisplayCopySnack(true);
    };

    const handleSnackClose = () => {
        setDisplayCopySnack(false);
    };

    return <>
        <Header>
            <Title color="pink">{t("titles.files")}</Title>
        </Header>
        <AddFile onAdd={handleFileAdded} />
        <Spacer />
        <FilesContext.Provider value={files}>
            <FilesList onDelete={handleFileDeleted} onShortenedURLCopied={handleURLCopied} />
        </FilesContext.Provider>
        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={displayCopySnack}
            autoHideDuration={3000}
            onClose={handleSnackClose}
            message={t("files.copy_message")}
            />
    </>;
};

export default Links;