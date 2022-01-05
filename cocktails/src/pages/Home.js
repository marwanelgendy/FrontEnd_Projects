import React from 'react'
import CocktailList from '../component/CocktailList'
import SearchForm from '../component/SearchForm'

const Home = () => {
  return (
    <div>
      <SearchForm />
      <CocktailList />
    </div>
  )
}

export default Home