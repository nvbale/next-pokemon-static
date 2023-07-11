import { NextPage, GetStaticProps } from 'next'
import { Grid } from '@nextui-org/react'
import { PokemonListResponse, SmallPokemon } from '@/interfaces'
import { Layout } from '@/components/layouts'
import { PokemonCard } from '@/components/pokemon'
import { pokeApi } from '@/api'

interface Props {
  pokemons: SmallPokemon[]
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Listado de Pokémons">
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid.Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

  const pokemons: SmallPokemon[] = data.results.map((pokemon) => {
    const urlParts = pokemon.url.split('/')
    const id = urlParts[urlParts.length - 2]
    const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`

    return {
      ...pokemon,
      id,
      img,
    }
  })

  return {
    props: { pokemons },
  }
}

export default HomePage
