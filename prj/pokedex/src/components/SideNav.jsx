import React from 'react'
import {first151Pokemon, getFullPokedexNumber } from "../utils"

export function SideNav() {
  return (
    <nav>
      <div>
        <h1 className='text-gradient'>Pokédex</h1>
      </div>
      <input/>
      {first151Pokemon.map((pokemon, pokemonIndex) => {
        return (
          <button className='nav-card ' key={pokemonIndex}>
            <p>{getFullPokedexNumber(pokemonIndex)}</p>
            <p>{pokemon}</p>
          </button>
        )
      })}
    </nav>
  )
}
