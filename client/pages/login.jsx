import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useAuth } from "../util/authProvider";
import axios from 'axios';
import { SERVER_URL } from "./_app";
import { getAuthSession } from "../util/withAuth";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState("");
  const { auth } = useAuth()
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = JSON.stringify({
      email,
      password,
    });
    const options = {
      headers: { "content-type": "application/json" }
    }
    axios.defaults.baseURL = SERVER_URL

    // const token = await getAuthSession(context);

    // if (token) {
    //   return {
    //     redirect: {
    //       destination: '/',
    //       permanent: false,
    //     },
    //   }
    // }

    const res = await axios
      .post(`/login`, payload, options)
      .then(async (response) => {
        if (response.status = 200) {
          // setUser(data.user)

          // console.log(response.data)

          Cookies.set('jwt', response.data, {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000),
          });

          // axios.defaults.headers.common = { 'Authorization': `bearer ${response.data}` }

          const config = {
            headers: { Authorization: `Bearer ${response.data}` }
          };

          console.log("calling user1")
          try {
            var res = await axios.get(`/user`, config)
            console.log(res)
            router.push('/')
          } catch (e) {
            console.log("Return to login")
            return {
              redirect: {
                destination: '/login',
                permanent: false,
              },
            }
          }



        }
      })
      .catch((err) => {
        console.log(err)
        setError(err.response.data.message)
        // setError(err.response)
      });
  };

  return (
    <div className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
      <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <section>
          <h3 className="font-bold text-2xl">Welcome Admin</h3>
          <p className="text-gray-600 pt-2">Sign in to your account.</p>
        </section>

        <section className="mt-10">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="email">Email</label>
              <input value={email}
                onChange={e => setEmail(e.target.value)} type="email" id="email" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" />
            </div>
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="password">Password</label>
              <input value={password}
                onChange={e => setPassword(e.target.value)} type="password" id="password" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" />
            </div>
            {/* <div className="flex justify-end">
              <a href="#" className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Forgot your password?</a>
            </div> */}
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Sign In</button>
          </form>
          <p style={{ color: 'red' }}>{errorMessage}</p>
        </section>
      </main>

      <div className="max-w-lg mx-auto text-center mt-6 mb-6">
        <p className="text-black">Don't have an account? <a href="/signup" className="font-bold hover:underline text-purple-500">Sign up</a>.</p>
      </div>


    </div>
  );
};

export default login;