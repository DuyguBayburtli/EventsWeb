import React, { useContext } from 'react'
import myContext from '../../../context/data/myContext';

function AddEvent() {
    const context = useContext(myContext);
    const {products,setProducts,addProduct} = context
    
    return (
        <div>
            <div className=' flex justify-center items-center h-screen'>
                <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                    <div className="">
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Etkinlik ekle</h1>
                    </div>
                    <div>
                        <input type="text"
                            onChange={(e) => setProducts({ ...products, title: e.target.value })} value={products.title}
                            name='title'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Başlık'
                        />
                    </div>
                    <div>
                        <input type="text"
                            onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })} value={products.imageUrl}
                            name='imageurl'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Resim url'
                        />
                    </div>
                    <div>
                        <input type="text"
                            onChange={(e) => setProducts({ ...products, category: e.target.value })} value={products.category}
                            name='category'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Kategori'
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='time'
                            onChange={(e) => setProducts({ ...products, time: e.target.value })} value={products.time}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Saat'
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='date'
                            onChange={(e) => setProducts({ ...products, date: e.target.value })} value={products.date}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Tarih'
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='adress'
                            onChange={(e) => setProducts({ ...products, adress: e.target.value })} value={products.adress}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Adres'
                        />
                    </div>
                  
                   
                    <div>
                       <textarea cols="30" rows="10" 
                            name='description' 
                            onChange={(e) => setProducts({ ...products, description: e.target.value })}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Açıklama'>

                       </textarea>
                    </div>
                    <div className=' flex justify-center mb-3'>
                        <button
                            onClick={addProduct}
                            className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                            Etkinlik Ekle
                        </button>
                    </div>
                 
                </div>
            </div>
        </div>
    )
}

export default AddEvent
