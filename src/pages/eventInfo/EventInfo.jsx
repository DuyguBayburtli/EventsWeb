import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/data/myContext';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addDoc, collection, doc, getDoc } from '@firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import Modal from '../../components/modal/Modal';
import { addToCart } from '../../redux/cartSlice';

function ProductInfo() {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const [products, setProducts] = useState('')
    const params = useParams()
    // console.log(products.title)

    const getProductData = async () => {
        setLoading(true)
        try {
            const productTemp = await getDoc(doc(fireDB, "products", params.id))
            // console.log(productTemp)
            setProducts(productTemp.data());
            // console.log(productTemp.data())
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    useEffect(() => {
        getProductData()

    }, [])



    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart)
    // console.log(cartItems)

   

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])


    const [name, setName] = useState("")
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
  
  
    const buyNow = async () => {
      // validation 
      if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
        return toast.error("All fields are required", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
        }
        const addressInfo = {
          name,
          address,
          pincode,
          phoneNumber,
        }
        console.log(addressInfo)
  
      
        const orderInfo = {
            cartItems,
            addressInfo,
            email: JSON.parse(localStorage.getItem("user")).user.email,
            userid: JSON.parse(localStorage.getItem("user")).user.uid,
          }
  
        try {
            const result = collection(fireDB, "orders")
            addDoc(result,orderInfo)
          } 
          catch (error) {
            console.log(error)
          }

         
        dispatch(addToCart(products));
        toast.success('Etkinlik eklendi');
        
  
      };


    return (
        <Layout>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-10 mx-auto">
                    {products && 
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img
                            alt="ecommerce"
                            className="lg:w-1/3 w-full lg:h-auto  object-cover object-center rounded"
                            src={products.imageUrl}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                {products.adress}
                            </h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                {products.title}
                            </h1>
                            
                            <p className="leading-relaxed border-b-2 mb-5 pb-5">
                                {products.description}
                            </p>

                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">
                                {products.date} / {products.time}
                                </span>

                            </div>
                            <Modal name={name} address={address} pincode={pincode} phoneNumber={phoneNumber} setName={setName} setAddress={setAddress} setPincode={setPincode} setPhoneNumber={setPhoneNumber} buyNow={buyNow} />

                        </div>
                    </div>}
                </div>
            </section>

        </Layout>
    )
}

export default ProductInfo