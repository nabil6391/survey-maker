import Layout from '../components/Layout.js';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { SERVER_URL } from './_app.js';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = JSON.stringify({
      email,
      password,
    });
    const options = {
      headers: { "content-type": "application/json" }
    }

    const res = await axios.post(SERVER_URL + `/register`, payload, options)
      .then((response) => {
        if (response.status == 200) {
          // setUser(data.user)
          router.push(`/login`);
        }
      })
      .catch((err) => {
        console.log(err)
        setErrorMessage(err.response.data.message)
      });


  };

  return (
    <Layout>
      <div className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">

        <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
          <section>
            <h3 className="font-bold text-2xl">Register</h3>
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

              <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">SignUp</button>
            </form>
          </section>
        </main>

        <div className="max-w-lg mx-auto text-center mt-12 mb-6">
          <p className="text-black">Already have an account? <a href="/login" className="font-bold hover:underline text-purple-500">Login</a>.</p>
        </div>
        <p style={{ color: 'red' }}>{errorMessage}</p>

      </div>
    </Layout >
  );
}