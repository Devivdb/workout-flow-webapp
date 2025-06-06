import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router} from "react-router-dom";
import {FiltersProvider} from "./context/filtersContext/FiltersContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Router>
          <FiltersProvider>
              <App/>
          </FiltersProvider>
      </Router>
  </StrictMode>,
)
