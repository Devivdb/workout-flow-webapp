import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router} from "react-router-dom";
import {PrimaryMusclesProvider} from "./context/PrimaryMusclesContext/PrimaryMusclesContext.jsx";
import {ExercisesProvider} from "./context/exercisesContext/ExercisesContext.jsx";
import {LevelProvider} from "./context/levelContext/LevelContext.jsx";
import {EquipmentProvider} from "./context/equipmentContext/EquipmentContext.jsx";
import {ForceProvider} from "./context/forceContext/ForceContext.jsx";
import {MechanicProvider} from "./context/mechanicContext/MechanicContext.jsx";
import {SecondaryMusclesProvider} from "./context/SecondaryMusclesContext/SecondaryMusclesContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Router>
          <PrimaryMusclesProvider>
              <SecondaryMusclesProvider>
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
              </SecondaryMusclesProvider>
          </PrimaryMusclesProvider>
      </Router>
  </StrictMode>,
)
