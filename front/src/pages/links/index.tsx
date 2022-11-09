import { Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Header, Spacer, Title } from "../../components";
import { Link as ShortLink } from "../../common/data.types";
import { linksRepository } from "../../repositories";
import LinksContext from "../links_context";
import AddLink from "./add_link";
import LinksList from "./links_list";
import copy from 'copy-to-clipboard';

const Links:React.FC = () => {
    const [links, setLinks] = useState<Record<string, ShortLink>>({});
    const [displayCopySnack, setDisplayCopySnack] = useState(false);
    const {t} = useTranslation();

    useEffect(() => {
        (async () => {
            const links = await linksRepository.getAll();
            setLinks(links);
        })();
    }, []);

    const handleLinkAdded = (l:ShortLink) => {
        setLinks({...links, [l.id]: l});
    };

    const handleLinkDeleted = (id:string) => {
        const newLinks = {...links};
        delete newLinks[id];
        setLinks(newLinks);
    };

    const handleURLCopied = () => {
        setDisplayCopySnack(true);
    };

    const handleSnackClose = () => {
        setDisplayCopySnack(false);
    };

    return <>
        <Header>
            <Title color="blue">{t("titles.links")}</Title>
        </Header>
        <AddLink onAdd={handleLinkAdded} />
        <Spacer />
        <LinksContext.Provider value={links}>
            <LinksList onDelete={handleLinkDeleted} onShortenedURLCopied={handleURLCopied} />
        </LinksContext.Provider>
        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={displayCopySnack}
            autoHideDuration={3000}
            onClose={handleSnackClose}
            message={t("links.copy_message")}
            />
    </>;
};

export default Links;