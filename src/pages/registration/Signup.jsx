import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import myContext from '../../context/data/myContext';
import { ToastContainer, toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDb } from '../../firebase/firebaseConfig';
import Loader from '../../components/loader/Loader';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const context = useContext(myContext);
    const {loading, setLoading} = context;

    const signup = async () => {
        // Kullanıcı işlemi sırasında yüklemeyi göstermek için setLoading(true) kullanıyoruz.
        setLoading(true);
    
        // Ad, e-posta ve şifre boşsa, hata mesajı gösterip işlemi sonlandırıyoruz.
        if (name === "" || email === "" || password === "" ) {
            return toast.error("Tüm Alanları Doldurun");
        }
    
        try {
            // Firebase kimlik doğrulama servisini kullanarak yeni bir kullanıcı hesabı oluşturuyoruz.
            const users = await createUserWithEmailAndPassword(auth, email, password);
    
            // Kullanıcının adını, kimlik bilgisini ve e-postasını içeren bir nesne oluşturuyoruz.
            const user = {
                name: name,
                uid: users.user.uid,
                email: users.user.email,
                time: Timestamp.now()
            };
    
            // Firestore veritabanına "user" koleksiyonuna yeni kullanıcıyı ekliyoruz.
            const userRef = collection(fireDb, "users");
            await addDoc(userRef, user);

             // Kullanıcıya başarılı bir kayıt mesajı gösteriyoruz.
             toast.success('Kayıt Başarılı');
    
            // İşlem tamamlandığında, ad, e-posta ve şifreyi sıfırlıyoruz.
            setName("");
            setEmail("");
            setPassword("");
    
            // İşlem tamamlandığında yüklemeyi kapatmak için setLoading(false) kullanıyoruz.
            setLoading(false);
        } catch (error) {
            // Hata durumunda kullanıcıya hata mesajı gösteriyoruz.
            toast.error('Kayıt Başarısız');
    
            // İşlem tamamlandığında yüklemeyi kapatmak için setLoading(false) kullanıyoruz.
            setLoading(false);
        }
    }
    
   
    return (
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader/>}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Kaydol</h1>
                </div>
                <div>
                    <input type="text"
                        value ={name}
                        onChange={(e) => setName(e.target.value)}
                        name='name'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='İsim'
                    />
                </div>
                <div>
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Şifre'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        onClick={signup}
                        className=' bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                        Kaydol
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Hesabın var mı? <Link className=' text-red-500 font-bold' to={'/login'}>Giriş Yap</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Signup