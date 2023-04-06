import React from 'react'
import ReactDOM from 'react-dom/client'
import Form from './components/Form'
import Jeu from './components/Jeu'
import { WordsProvider } from './components/WordsDepot';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Router>

      {/* je n'ai pas trouvé d'alternative que d'englober mes routes dans mon dépôt afin d'utiliser mon dépôt qui y stocke le array des mots */}
      <WordsProvider>

        <Routes>

          <Route path="/" element={<Form />} />
          <Route path="/jeu" element={<Jeu />} />

        </Routes>

      </WordsProvider>

    </Router>

  </React.StrictMode>,
)
