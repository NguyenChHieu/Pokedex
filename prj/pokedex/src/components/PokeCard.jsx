import React from 'react'
import { useEffect,useState } from 'react'
import { getFullPokedexNumber, getPokedexNumber } from '../utils'
import TypeCard  from './TypeCard'
import Modal from './Modal'

export default function PokeCard(props) {
  const {pokemon} = props
  const [data, setData] = useState(null) 
  const [loading, setLoading] = useState(false)
  const [skill, setSkill] = useState(null)
  const [loadingSkill, setLoadingSkill] = useState(false)

  const {name, height, abilities, stats, types, moves, sprites} = data || {}
  const imgList = Object.keys(sprites || {}).filter(val => {
    if (!sprites[val]) {return false}
    if (['versions', 'other'].includes(val)) {return false}
    return true
  })

  async function fetchMoveData(move, moveUrl){
    if(loadingSkill || !localStorage || !moveUrl) return

    // check cache for move
    let c = {}
    if (localStorage.getItem('pokemon-moves')){
      c = JSON.parse(localStorage.getItem('pokemon-moves'))
    }

    if (move in c){
      setSkill(c[move])
      console.log("Found move in cache")
      return
    }

    try {
      setLoadingSkill(true)
      const res = await fetch(moveUrl)
      const moveData = await res.json()
      console.log("Fetched from API", moveData)
      const description = moveData?.flavor_text_entries.filter
      (val => {
        return val.version_group.name == 'firered-leafgreen'
      })[0]?.flavor_text

      const skillData = {
        name: move,
        description
      }
      setSkill(skillData)
      c[move] = skillData
      localStorage.setItem('pokemon-moves', JSON.stringify(c))
    } catch (err){
      console.log(err)
    } finally{
      setLoadingSkill(false)
    }
  }

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
        console.log("Found pokemon in cache")
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
          console.log("Fetched from API")
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
      {/** Cond rendering */}
      {skill && (
          <Modal handleCloseModal={() => {setSkill(null)}}>
          <div>
            <h6>Name</h6>
            <h2 className='skill-name'>{skill.name.replaceAll("-", " ")}</h2>
          </div>
          <div>
            <h6>Description</h6>
            <p>{skill.description}</p>
          </div>
        </Modal>
      )}
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
      
      <div>
        <h3>Stats</h3>
        <div className='stats-card'>
          {stats.map((statObj, statIndex) => {
            const {stat, base_stat} = statObj
            return (
              <div key={statIndex} className='stat-item'>
                <p>{stat?.name.replaceAll("-", ' ')}</p>
                <p>{base_stat}</p>  
              </div>
            )
          })}
        </div>
      </div>
      
      <div>
        <h3>Moves</h3>
        <div className='pokemon-move-grid'>
          {moves.map((movesObj, moveIndex) => {
            return (
              <button className='button-card pokemon-move' 
              key={moveIndex}
              onClick={() => {fetchMoveData(movesObj?.move?.name, movesObj?.move?.url)}}>
                <p>{movesObj?.move?.name.replaceAll('-', ' ')}</p>
              </button>
            )
          })}
          </div>
      </div>
    </div>
  )
}
