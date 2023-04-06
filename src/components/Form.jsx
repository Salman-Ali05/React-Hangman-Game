import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/form.css"

function Form() {

    //Variables pour les paramètres du jeu
    let [fpseudo, setFpseudo] = useState("");
    let [fmin, setFmin] = useState("");
    let [fmax, setFmax] = useState("");
    let [fdiff, setfdiff] = useState("easy");

    //Functions pour gérer les cas de changemens lors de la saisies des valeurs
    let handleChangeFpseudo = (e) => {
        setFpseudo(e.target.value);
    };
    let handleChangeFmin = (e) => {
        setFmin(e.target.value);
    };
    let handleChangeFmax = (e) => {
        setFmax(e.target.value);
    };
    let handleChangeFdiff = (e) => {
        setfdiff(e.target.value);
    };

    return (
        <div className="formular">

            <h1>Hangman Game : </h1>
            <h4>Developped by CHABOUNI Manissa, SAYAH Salas et MADEC Salman Ali</h4>

            <div>

                <form>

                    <label>
                        Username :
                        <input type="text" value={fpseudo} onChange={handleChangeFpseudo} />
                        {/* exemple d'un cas d'utilisation d'une function qui gère la saisie */}
                    </label>

                    <br />

                    <label>
                        Minimum char in the word :
                        <input type="number" value={fmin} onChange={handleChangeFmin} />
                    </label>

                    <br />

                    <label>
                        Maximum char in the word :
                        <input type="number" value={fmax} onChange={handleChangeFmax} min={fmin} />
                    </label>

                    <br />

                    <select name="difficulty" onChange={handleChangeFdiff}>
                        <option value="easy">Easy Peasy Lemon Squeezy</option>
                        <option value="average">Average, not bad</option>
                        <option value="hard">Hard, carefull, He's a Hero</option>
                    </select>

                    <br />

                    {/* condition : si un des inputs est vide, le jeu ne commence pas, géré via les Links (qui en gros sont des routes plus ou moins) */}
                    {fpseudo && fmin && fmax && fdiff && (parseInt(fmin) < parseInt(fmax)) && (
                        <Link to="/jeu" state={{ pseudo: fpseudo, min: fmin, max: fmax, difficulty: fdiff }}>
                            <button type="submit" id="play">Play !</button>
                        </Link>
                    )}

                </form>

            </div>

        </div>
    )
}

export default Form