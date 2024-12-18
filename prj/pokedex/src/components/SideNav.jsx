import React from 'react'
import { useState } from 'react'
import {first151Pokemon, getFullPokedexNumber } from "../utils"

export default function SideNav(props) {
  const {pokemon, setPokemon, handleCloseMenu, showSideMenu} = props

  const [searchValue, setSearchValue] = useState('')

  const filteredPokemon = first151Pokemon.filter((ele, eleIndex) => {
    // if full pokedex number includes search value, true
    if (toString(getFullPokedexNumber(eleIndex)).includes(searchValue)) {
      return true
    }
    if (ele.toLowerCase().includes(searchValue)) {
      return true
    }
    return false
  })

  return (
    <nav className={' ' + (!showSideMenu ? 'open': '')}>
      <div className={"header " + (!showSideMenu ? 'open': '')}>
        <button onClick={handleCloseMenu} className='open-nav-button'>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h1 className='text-gradient'>Pokédex</h1>
      </div>
      <input placeholder='e.g 001 or Bulbasaur...' value={searchValue} onChange={(e) => {
        setSearchValue(e.target.value)
      }}/>
      {filteredPokemon.map((pokemons, pokemonIndex) => {
        const truePokemonIndex = first151Pokemon.indexOf(pokemons)
        return (
          <button onClick={() => {
            setPokemon(truePokemonIndex)
            handleCloseMenu()
          }}
          className={'nav-card ' + (pokemonIndex === pokemon ? ' nav-card-selected' : ' ')} key={pokemonIndex}>
            <p>{getFullPokedexNumber(truePokemonIndex)}</p>
            <p>{pokemons}</p>
          </button>
        )
      })}
    </nav>
  )
}
