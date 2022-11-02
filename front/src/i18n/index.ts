import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./en.json";
import fr from "./fr.json";

const resources = {
    en: { translation: en },
    fr: { translation: fr }
};

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        detection: {
            order: ['querystring', 'localStorage', 'navigator']
        },
        fallbackLng: "en",
        supportedLngs: Object.keys(resources),
        keySeparator: ".",
        initImmediate: true,
        interpolation: {
            escapeValue: false,
        }
    });

export default i18n;