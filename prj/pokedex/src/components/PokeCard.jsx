import React from 'react'
import { useEffect,useState } from 'react'
import { getFullPokedexNumber, getPokedexNumber } from '../utils'
import  TypeCard  from './TypeCard'

export default function PokeCard(props) {
  const {pokemon} = props
  const [data, setData] = useState(null) 
  const [loading, setLoading] = useState(false)

  const {name, height, abilities, types, weight, sprites} = data || {}
  const imgList = Object.keys(sprites || {}).filter(val => {
    if (!sprites[val]) {return false}
    if (['versions', 'other'].includes(val)) {return false}
    return true
  })

  // whenever user fetch a new pokemon, value selectedPokemon changes -> useEffect runs
  useEffect(() => {
    // loading OR no access to local storage
    if (loading || !localStorage) return
    // check if selected pokemon is available in the cache
      // 1) define the cache
      let cache = {}
      if (localStorage.getItem('pokedex')) {
        cache = JSON.parse(localStorage.getItem('pokedex'))
      }

      // 2) check if the selected pokemon is in the cache
      if (pokemon in cache){
        setData(cache[pokemon])
        return
      }

      // fetch logic
      async function fetchData() {
        setLoading(true)
        try{
          const baseUrl = 'https://pokeapi.co/api/v2/'
          const suffix = 'pokemon/' + getPokedexNumber(pokemon)
          const finalUrl = baseUrl + suffix
          const res = await fetch(finalUrl)
          const pokemonData = await res.json()
          setData(pokemonData)

          cache[pokemon] = pokemonData
          localStorage.setItem('pokedex',JSON.stringify(cache))
        }
        catch (error){
          console.log(error.message)
        } finally {
          setLoading(false)
        }
      }  
      fetchData()
    
      // if fetch from API, make sure to save information to the cahe
  }, [pokemon])

  if (loading || !data) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    )
  }

  return (
    <div className='poke-card'>
      <div>
        <h4>#{getFullPokedexNumber(pokemon)}</h4>
        <h2>{name}</h2>
      </div>
      <div className='type-container'>
          {types.map((typeObj, typeIndex) => {
            return (
              <TypeCard key={typeIndex} type={typeObj?.type?.name}/>
            )
          })}
      </div>
      <img className='default-img' 
      src={'/pokemon/' + getFullPokedexNumber(pokemon) + '.png'} 
      alt={`${name}-large-img`}/>

      <div className='img-container'>
        {imgList.map((spriteUrl, spriteIndex) => {
          const imgUrl = sprites[spriteUrl]
          return (
            <img key={spriteIndex} src={imgUrl} alt={`${name}-img-${spriteUrl}`}/>
          )
        })}
      </div>
    </div>
  )
}
