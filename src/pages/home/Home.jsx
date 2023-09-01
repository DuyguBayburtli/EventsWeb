import React,{useContext} from 'react'
import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/heroSection/HeroSection'
import Filter from '../../components/filter/Filter'
import EventCard from '../../components/eventCard/EventCard'
//import { useDispatch, useSelector } from 'react-redux'
//import { addToCart, deleteFromCart } from '../../redux/cartSlice'

function Home() {
 // const dispatch = useDispatch();
 //const cartItem = useSelector((state)=> state.cart)

  {/*const addCart = ()=> {
    dispatch(addToCart("shirt"));
  }

  const deleteCart = () =>{
    dispatch(deleteFromCart("shirt"));
  } */}
  return (
    <Layout>
      <HeroSection/>
      <Filter/>
      <EventCard/>
    </Layout>
  )
}

export default Home
