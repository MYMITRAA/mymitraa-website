import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

const RTL_LANGS = ["ar", "he", "fa", "ur"];

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en");

  const changeLang = (code) => {
    setLang(code);
    document.documentElement.dir = RTL_LANGS.includes(code) ? "rtl" : "ltr";
    document.documentElement.lang = code;
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);