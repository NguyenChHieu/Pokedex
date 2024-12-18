import React from 'react'
import { useState } from 'react'
import {first151Pokemon, getFullPokedexNumber } from "../utils"

export default function SideNav(props) {
  const {pokemon, setPokemon} = props

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
    <nav>
      <div className={"header"}>
        <h1 className='text-gradient'>Pokédex</h1>
      </div>
      <input value={searchValue} onChange={(e) => {
        setSearchValue(e.target.value)
      }}/>
      {filteredPokemon.map((pokemon, pokemonIndex) => {
        return (
          <button onClick={() => {
            setPokemon(pokemonIndex)
          }}
          className={'nav-card ' + (pokemonIndex === pokemon ? ' nav-card-selected': ' ')} key={pokemonIndex}>
            <p>{getFullPokedexNumber(first151Pokemon.indexOf(pokemon))}</p>
            <p>{pokemon}</p>
          </button>
        )
      })}
    </nav>
  )
}
