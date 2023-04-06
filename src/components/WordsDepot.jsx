//Le dépôt a la même structure que celui StudentContext
import { useState, createContext, useContext } from "react";

const WordsContext = createContext(null); //Création du context

//WordProvider va permettre de l'utiliser en tant que "balise", ça sera notre component en quelque sorte
export const WordsProvider = ({ children }) => {

    //Liste des mots chosis
    const wordList = ["GYMNASTIQUE", "MUSCULATION", "MANGER", "REACT", "TEST", "DATA", "DEVELOPPEMENT", "PNEUMONOULTRAMICROSCOPICSILICOVOLCANOCONIOSIS", "FIGHTING", "LIVE", "FASTING", "SHADOW", "HAPPY", "LOVE", "INITIATE", "HEH", "OUSTANDING", "REFEREE", "ACTION", "MOVE", "FIGURE", "STATEMENT", "MANAGE", "PROFESIONNAL", "BOXING", "FOOTBALL", "UPPER", "BENCHPRESS"];
    //Le mot va stocker le array complet de wordList via une fonction qui va permttre de remplir notre array word
    const [words, setWords] = useState(wordList);

    //Function qui va récup et stocker le array
    function getWords(newWord) {
        setWords([...words, newWord]);
    }

    return (
        // utilisation du provider + le children est un peu pour moi mais il y était dans le StudentContext mais sans lui, on ne peut pas utiliser le provider, c'est comme si il renvoit tout le dépôt, plus ou moins
        <WordsContext.Provider value={{ words, getWords }}>
            {children}
        </WordsContext.Provider>
    );
};

export const useWordsContext = () => useContext(WordsContext);
