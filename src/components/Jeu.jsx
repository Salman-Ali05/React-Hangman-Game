import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useWordsContext } from "./WordsDepot";
import { Link } from "react-router-dom";
import "../assets/styles/jeu.css"

function Jeu() {

    //On récupère/créer tout ce qui va nous être utile pour le jeu
    const { words } = useWordsContext(); //Les mots
    const [word, setWord] = useState(""); //Le mot généré
    const [displayWord, setDisplayWord] = useState(""); //Var et Function pour set et cacher le mot généré
    const [guessedLetters, setGuessedLetters] = useState([]); //Character et Function pour gérer la key saisie
    const [usedChars, setUsedChars] = useState([]); //Liste des char utilisés
    const [gameOver, setGameOver] = useState(false); //Gérer le game over
    const [win, setWin] = useState(false); //Gérer la win
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //Array de notre chère alphabet

    let location = useLocation(); //Location nous permet de récupérer ce qui a été envoyé en param dans le lien Link

    //Récupération des params
    let pseudo = location.state["pseudo"];
    let min = location.state["min"];
    let max = location.state["max"];
    let diff = location.state["difficulty"];
    let diffChances = 0;

    // Gérer le nombre de chances selon l'option choisie
    if (diff == "easy") {
        diffChances = 8;
    } else if (diff == "average") {
        diffChances = 5;
    } else {
        diffChances = 3;
    }

    const [chances, setChances] = useState(diffChances); //Nombre de chances

    //On choisis un mot de min char à max char
    useEffect(() => {
        let filteredWords = words.filter(
            (w) => w.length >= min && w.length <= max
        );
        if (filteredWords.length > 0) {
            let randomIndex = Math.floor(Math.random() * filteredWords.length);
            setWord(filteredWords[randomIndex].toUpperCase());
        }
    }, [min, max, words]);

    //Permet l'initialisation du mot
    useEffect(() => {
        if (guessedLetters.length === 0) {
            return;
        }

        let newWord = ""; //Mot qui va être généré
        let allCharGuessed = true; //Dans le cas true, 

        //Ici on gère l'initialisation du mot
        for (let i = 0; i < word.length; i++) {

            let letter = word[i];

            //On affiche la lettre si elle bonne (due à u)
            if (guessedLetters.includes(letter)) {
                newWord += letter;
            }
            //Sinon on met les '_' pour cacher les lettres du mot généré et on m
            else {
                newWord += "_";
                allCharGuessed = false;
            }
            newWord += " ";
        }
        setDisplayWord(newWord);

        //Gérer les cas de win et loose
        if (allCharGuessed) {
            setGameOver(true);
            setWin(true);
        } else if (chances === 0) {
            setGameOver(true);
            setWin(false);
        }
    }, [guessedLetters, word, chances]);

    //Gérer si la lettre est bonne ou pas
    function handleGuess(char) {
        if (!usedChars.includes(char)) {
            if (!guessedLetters.includes(char)) {
                setGuessedLetters([...guessedLetters, char]);
                if (!word.includes(char)) {
                    setChances(chances - 1);
                }
            }
            setUsedChars([...usedChars, char]);
        }
    }

    return (
        <div className="hangman-game">
            <div className="container">
                <h1>Bienvenue {pseudo} !</h1>
                <p>
                    Will be able to guess the word that contains at least {" "}
                    {min} characters and  max {max} ?
                </p>
                {/* Afficher le mot en caché */}
                <p>{displayWord}</p>

                {/* Si gagné ou si perdu, un message est affiché */}
                {gameOver && (
                    <p>{win ? "Hehe, you've Won !" : "Better luck next time I guess ! (whoops I guessed what you've not 🙃) The word was " + word}</p>
                )}
                {!gameOver && (
                    <div>
                        {/* Compteur du nombre de chances restantes */}
                        <p>Remaining chances : {chances} | Difficulty : {diff.toUpperCase()}</p>
                        {/* Liste des char utilisés */}
                        <p>Used letters : {usedChars.join(", ")}</p>
                        <div>
                            {Array.from(alphabet).map((char) => (
                                <button key={char} onClick={() => handleGuess(char)}>
                                    {char}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {/* Retour au menu */}
                <Link to="/">
                    <button>Main menu</button>
                </Link>
            </div>
            {/* Dessin du pendu  */}
            {chances == 7 && (
                <div className="hangman">
                    <div className="pole-x"></div>
                </div>
            )}
            {chances == 6 && (
                <div className="hangman">
                    <div className="pole-x"></div>
                    <div className="pole-y"></div>
                </div>
            )}
            {chances == 5 && (
                <div className="hangman">
                    <div className="pole-x"></div>
                    <div className="pole-y"></div>
                    <div className="head"></div>
                </div>
            )}
            {chances == 4 && (
                <div className="hangman">
                    <div className="pole-x"></div>
                    <div className="pole-y"></div>
                    <div className="head"></div>
                    <div className="body"></div>
                </div>
            )}
            {chances == 3 && (
                <div className="hangman">
                    <div className="pole-x"></div>
                    <div className="pole-y"></div>
                    <div className="head"></div>
                    <div className="body"></div>
                    <div className="left-arm"></div>
                </div>
            )}
            {chances == 2 && (
                <div className="hangman">
                    <div className="pole-x"></div>
                    <div className="pole-y"></div>
                    <div className="head"></div>
                    <div className="body"></div>
                    <div className="left-arm"></div>
                    <div className="right-arm"></div>
                </div>
            )}
            {chances == 1 && (
                <div className="hangman">
                    <div className="pole-x"></div>
                    <div className="pole-y"></div>
                    <div className="head"></div>
                    <div className="body"></div>
                    <div className="left-arm"></div>
                    <div className="right-arm"></div>
                    <div className="left-leg-resized"></div>
                </div>
            )}
            {chances == 0 && (
                <div className="hangman">
                    <div className="pole-x"></div>
                    <div className="pole-y"></div>
                    <div className="head"></div>
                    <div className="body"></div>
                    <div className="left-arm"></div>
                    <div className="right-arm"></div>
                    <div className="left-leg"></div>
                    <div className="right-leg"></div>
                </div>
            )}
        </div>
    );
}

export default Jeu;
