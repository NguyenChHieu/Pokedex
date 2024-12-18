import PokeCard  from "./components/PokeCard"
import Header  from "./components/Header"
import SideNav  from "./components/SideNav"

import { useState } from "react"

function App() {
  const [pokemon, setPokemon] = useState(0)
  const [showSideMenu, setShowSideMenu] = useState(true)

  function handleToggleMenu(){
    setShowSideMenu(!showSideMenu)
  }

  function handleCloseMenu(){
    setShowSideMenu(true)
  }

  return (
    <>
      <Header handleToggleMenu={handleToggleMenu}/>
      <SideNav pokemon={pokemon} 
      setPokemon={setPokemon} 
      handleCloseMenu={handleCloseMenu}
      showSideMenu={showSideMenu}/>
      <PokeCard pokemon={pokemon} />
    </>
  )
}

export default App
