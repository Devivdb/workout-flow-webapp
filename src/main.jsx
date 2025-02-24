import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router} from "react-router-dom";
import {MuscleProvider} from "./context/muscleContext/MuscleContext.jsx";
import {ExercisesProvider} from "./context/exercisesContext/ExercisesContext.jsx";
import {LevelProvider} from "./context/levelContext/LevelContext.jsx";
import {EquipmentProvider} from "./context/equipmentContext/EquipmentContext.jsx";
import {ForceProvider} from "./context/forceContext/ForceContext.jsx";
import {MechanicProvider} from "./context/mechanicContext/MechanicContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Router>
          <MuscleProvider>
              <ExercisesProvider>
                  <LevelProvider>
                      <EquipmentProvider>
                          <ForceProvider>
                              <MechanicProvider>
                                  <App/>
                              </MechanicProvider>
                          </ForceProvider>
                      </EquipmentProvider>
                  </LevelProvider>
              </ExercisesProvider>
          </MuscleProvider>
      </Router>
  </StrictMode>,
)
