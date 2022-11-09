import { Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Header, Spacer, Title } from "../../components";
import { Text as ShortText } from "../../common/data.types";
import { textsRepository } from "../../repositories";
import TextsContext from "../texts_context";
import AddText from "./add_text";
import TextsList from "./texts_list";
import copy from 'copy-to-clipboard';

const Links:React.FC = () => {
    const [texts, setTexts] = useState<Record<string, ShortText>>({});
    const [displayCopySnack, setDisplayCopySnack] = useState(false);
    const {t} = useTranslation();

    useEffect(() => {
        (async () => {
            const texts = await textsRepository.getAll();
            setTexts(texts);
        })();
    }, []);

    const handleTextAdded = (t:ShortText) => {
        setTexts({...texts, [t.id]: t});
    };

    const handleTextDeleted = (id:string) => {
        const newTexts = {...texts};
        delete newTexts[id];
        setTexts(newTexts);
    };

    const handleURLCopied = () => {
        setDisplayCopySnack(true);
    };

    const handleSnackClose = () => {
        setDisplayCopySnack(false);
    };

    return <>
        <Header>
            <Title color="purple">{t("titles.texts")}</Title>
        </Header>
        <AddText onAdd={handleTextAdded} />
        <Spacer />
        <TextsContext.Provider value={texts}>
            <TextsList onDelete={handleTextDeleted} onShortenedURLCopied={handleURLCopied} />
        </TextsContext.Provider>
        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={displayCopySnack}
            autoHideDuration={3000}
            onClose={handleSnackClose}
            message={t("texts.copy_message")}
            />
    </>;
};

export default Links;