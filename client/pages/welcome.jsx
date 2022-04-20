
import React from 'react';
import Layout from '../components/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { getAuthSession } from '../util/withAuth';
import axios from 'axios';
import { SERVER_URL } from './_app';
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { useLanguageContext } from "../context/LanguageContext";

export default function New(props) {
  const user = props.user;
  console.log('user data ')
  console.log(user)
  const [errorMessage, setErrorMessage] = useState('');
  const [role, setRole] = useState('admin');
  const { language, setLanguage } = useLanguageContext()
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch(SERVER_URL + '/api/v1/surveys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        title: title,
        title_my: title,
        slug: slug,
      }),
    });
    console.log(response)
    if (response.status === 201) {
      router.push(`/${slug}/edit`);
    } else {
      if (response.status === 403) {
        setErrorMessage('Slug not available!');
      } else setErrorMessage('That Failed!');
    }
  };

  return (
    <React.Fragment>
      <Layout username={user.username}>
        <div className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">

          <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">

            <section className="mt-10">
              <form onSubmit={handleSubmit}>
                <div className="mb-6 pt-3 rounded ">
                  <label className="block text-sm font-bold mb-2 ml-3" htmlFor="email">Welcome to CCRES</label>


                  <label className="block text-sm mb-2 ml-3" htmlFor="email">You are here as</label>

                  < div className="flex mx-auto w-full justify-center">
                    <RadioGroup className="px-4" value={role} onChange={(e) => setRole(e)}>
                      <RadioGroup.Option value="admin" >
                        <label className="">
                          <input className=""
                            type="radio"
                            name="role"
                            value="admin"
                          />
                          <div className="">Admin</div>
                        </label>
                      </RadioGroup.Option>
                      <RadioGroup.Option value="respondent">
                        <label className="">
                          <input
                            type="radio"
                            name="role"
                            value="respondent"
                          />
                          <div className="">Respondent</div>
                        </label>
                      </RadioGroup.Option>
                    </RadioGroup>
                  </div>


                  <br />
                  <label className="block text-sm font-bold mb-2 ml-3" htmlFor="email">     Choose your prefferred Lnagugae</label>
                  {language}

                  <div className="flex mx-auto w-full justify-center">
                    <RadioGroup className="px-4" value={role} onChange={(e) => setLanguage(e)}>
                      <RadioGroup.Option value="bm" >
                        <label className="">
                          <input className=""
                            type="radio"
                            name="language"
                            value="bm"
                          />
                          <div className="">Bahasa</div>
                        </label>
                      </RadioGroup.Option>
                      <RadioGroup.Option value="en" >
                        <label className="">
                          <input
                            type="radio"
                            name="language"
                            value="en"
                          />
                          <div className="">English</div>
                        </label>
                      </RadioGroup.Option>
                    </RadioGroup>
                  </div>

                </div>

                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Start</button>
              </form>
            </section>
          </main>

          <p style={{ color: 'red' }}>{errorMessage}</p>

        </div>

      </Layout>
    </React.Fragment >
  );
}

export async function getServerSideProps(ctx) {
  const token = await getAuthSession(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  try {
    var res = await axios.get(SERVER_URL + `/user`, {
      headers: { Authorization: `Bearer ${token}` },
    }
    )
  } catch (e) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  if (res.status = 200) {
    var user = res.data
    console.log(user)
    return {
      props: { user },
    }
  }

  return {
    props: { token },
  }
}