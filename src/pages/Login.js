import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";
export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const[loading,setLoading] = useState(false)
  const navigate = useNavigate();
  // Function to update form data on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async(e) => {
    setLoading(true)
    e.preventDefault();
    
    // Check if all fields are filled
    if (!formData.email || !formData.password) {
      // Handle the case where not all fields are filled
      console.log('Please fill in all fields');
      return;
    }
    try{
    const userCredentials = await signInWithEmailAndPassword(auth, formData.email, formData.password);
    const user = userCredentials.user
    localStorage.setItem('token', user.accessToken);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userPostCount',0);
    navigate('/');
    }
    catch(err){
      console.log(err)
      alert(err.message)
    }
    finally{
      setLoading(false)
    }
    // Perform further actions, such as API calls or dispatching to Redux store

    // Reset the form after submission
    setFormData({
      email: '',
      password: '',
    });

    // Additional logic for form submission can be added here
  };

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
                    <h3 className="my-10"> <Link to={"/signup"} className="text-sm font-bold text-gray-600 border border-gray-500 px-16 py-3 rounded-xl w-fit ">
                      Sign Up                    </Link></h3>
                  </header>

                  <form className="space-y-6">
                    <h2 className="text-4xl font-medium text-gray-500 my-16">Login</h2>
                   
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


                    <div className="flex justify-end">
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                        className={` justify-end flex w-fit items-center space-x-2 rounded-lg border px-6 py-3 font-semibold leading-6 bg-rose-400 text-white ${loading?"animate-pulse":""}`}
                      >
                        Login
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
