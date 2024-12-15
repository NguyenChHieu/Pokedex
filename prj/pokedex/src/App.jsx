import { PokeCard } from "./components/PokeCard"
import { Header } from "./components/Header"
import { SideNav } from "./components/SideNav"

import { useState } from "react"

function App() {
  const [pokemon, setPokemon] = useState(0)

  return (
    <>
      <Header/>
      <SideNav pokemon={pokemon} setPokemon={setPokemon} />
      <PokeCard setPokemon={setPokemon} />
    </>
  )
}

export default App
