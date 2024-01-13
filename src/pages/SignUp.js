import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth } from "../config";
import { set,ref} from "firebase/database";
import {database} from "../config"
export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    imgurl: '',
    email: '',
    password: '',
    password_confirm: '',
  });
  const[loading,setLoading] = useState(false)
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.password_confirm) {
      alert('Please fill in all fields');
      setLoading(false)

      return;
    }
    if(
      formData.password !== formData.password_confirm
    ){
      alert('Passwords do not match');
      setLoading(false)

      return;
    }
    try{
      const userCredentials = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredentials.user
      
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userPostCount',0);

      // Additional user data
    const additionalData = {
      displayName: formData.name,
      photoURL: formData.imgurl,
      // Add more fields if needed
    };

    // Update user profile with additional data
    if(userCredentials.user){
    await updateProfile(userCredentials.user, additionalData);
    const updatedUser = auth.currentUser;
    const userRef = ref(database, `users/${updatedUser.uid}`);
await set(userRef, {
  displayName: updatedUser.displayName,
  email: updatedUser.email,
  uid: updatedUser.uid,
  photoURL: updatedUser.photoURL,
  createdAt: new Date().toISOString(),
});

    localStorage.setItem('user', JSON.stringify(updatedUser));

    } 
    navigate('/');


    }
    catch(err){
      console.log(err)
      alert(err.message)
    }
    finally{
      setLoading(false)
    }
    setFormData({
      name: '',
      email: '',
      password: '',
      password_confirm: '',
      imgurl: '',
    });};
  return (
    <>

      <div
        id="page-container"
        className="mx-auto h-screen overflow-hidden flex min-h-dvh w-full min-w-[320px] flex-col relative"
      >
        <main id="page-content" className="flex max-w-full flex-auto flex-col relative z-50">
          <div
            className="flex min-h-dvh flex-col"
            
          >
            <section className="flex max-w-xl grow flex-col bg-white px-5 py-10  sm:px-20 sm:py-16">
              <div className="flex grow ">
                <div className="grow space-y-10">
                  <header>
                    <h1 className="mb-2 inline-flex items-center space-x-2 text-4xl font-bold text-rose-400">
                    <Link to={"/"}> TweetX</Link>
                    </h1>
                   <h3 className="my-10"> <Link to={"/login"} className="text-sm font-bold text-gray-600 border border-gray-500 px-16 py-3 rounded-xl w-fit ">
                      Login                    </Link></h3>
                  </header>

                  <form className="space-y-6">
                    <h2 className="text-4xl font-medium text-gray-500 my-16">Create Account</h2>
                    <div className="space-y-1">

                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full rounded-lg bg-gray-100/55 px-5 py-3 leading-6 placeholder-gray-400 "
                      />
                    </div>
                    <div className="space-y-1">

<input
  type="text"
  id="imgurl"
  name="imgurl"
  placeholder="Image URL"
  value={formData.imgurl}
  onChange={handleChange}
  className="block w-full rounded-lg bg-gray-100/55 px-5 py-3 leading-6 placeholder-gray-400 "
/>
</div>
                    <div className="space-y-1">

                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full rounded-lg bg-gray-100/55 px-5 py-3 leading-6 placeholder-gray-400 "
                      />
                    </div>
                    <div className="space-y-1">

                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="block w-full rounded-lg  bg-gray-100/55 px-5 py-3 leading-6 placeholder-gray-400 "
                      />
                    </div>
                    <div className="space-y-1">

                      <input
                        type="password"
                        id="password_confirm"
                        name="password_confirm"
                        placeholder="Confirm Password"
                        value={formData.password_confirm}
                        onChange={handleChange}
                        className="block w-full rounded-lg bg-gray-100/55 px-5 py-3 leading-6 placeholder-gray-400"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`justify-end flex w-fit items-center space-x-2 rounded-lg border px-6 py-3 font-semibold leading-6 bg-rose-400 text-white ${loading ? 'animate-pulse' : ''}`}
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>

                </div>
              </div>


            </section>
          </div>
        </main>
        <img src="/pwd.png" className="absolute top-20 right-0" alt=""/>

      </div>

    </>
  );
}
