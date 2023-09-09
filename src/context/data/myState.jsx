import React, {useEffect, useState} from 'react'
import MyContext from './myContext';
import { fireDB } from '../../firebase/FirebaseConfig';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from '@firebase/firestore';
import { toast } from 'react-toastify';

function MyState(props) {
  const [mode, setMode] = useState('light');
  const [loading, setLoading] = useState(false)
 

  const toggleMode = () => {
    if (mode === 'light') {
        setMode('dark');
        document.body.style.backgroundColor = 'rgb(17, 24, 39)';
    }
    else {
        setMode('light');
        document.body.style.backgroundColor = 'white';

    }
  } 

  const [products, setProducts] = useState({
    title: null,
    imageUrl: null,
    category: null,
    time: null,
    date:null,
    adress: null,
    description: null
  });

   // ********************** Add Product Section  **********************
   const addProduct = async () => {

    if (products.title == null || products.imageUrl == null || products.category == null || products.time == null || products.date == null || products.adress == null || products.description == null) {
      return toast.error('Lütfen tüm alanları doldurun')
    }

    setLoading(true)

    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, products)
      toast.success("Etkinlik Ekleme Başarılı")
      setTimeout(() => {
        window.location.href ='/dashboard'
      }, 800 );
      
      getProductData();
      setLoading(false)
      
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    setProducts("")
  }

  const [product, setProduct] = useState([]);

  // ****** get product
  const getProductData = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy("time"),
        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray)
        setLoading(false);
      });
      return () => data;

    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductData();
  }, []);  

  const edithandle = (item) => {
    setProducts(item)
  }

  // update product
  const updateProduct = async () => {
    setLoading(true)
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Etkinlik güncelleme başarılı")
      getProductData();
      setTimeout(() => {
        window.location.href = '/dashboard'
      },800 );
      setLoading(false)

    } catch (error) {
      setLoading(false)
      console.log(error)
    }
   
  }


  const deleteProduct = async (item) => {
    setLoading(true)
    try {
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success('Etkinlik Silme Başarılı')
      setLoading(false)
      getProductData()

    } catch (error) {
      // toast.success('Product Deleted Falied')
      setLoading(false)
      console.log(error)
    }
  }

  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterAddress, setFilterAddress] = useState('')

  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "orders"))
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false)
      });
      setOrder(ordersArray);
      // console.log(ordersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductData();
    getOrderData();
   
  }, []);



  return (
    <MyContext.Provider value={{ 
      mode, toggleMode, loading, setLoading,
      products, setProducts, addProduct, product,
       edithandle, updateProduct, deleteProduct, order,
       searchkey,setSearchkey,filterAddress, setFilterAddress,
       filterType, setFilterType
    }}>
      {props.children}
    </MyContext.Provider>
  )
}

export default MyState