import React,{useContext} from 'react'
import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/heroSection/HeroSection'
import Filter from '../../components/filter/Filter'
import EventCard from '../../components/eventCard/EventCard'

function Home() {
  return (
    <Layout>
      <HeroSection/>
      <Filter/>
      <EventCard/>
    </Layout>
  )
}

export default Home
