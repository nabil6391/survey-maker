
import React from 'react';
import Layout from '../components/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { checkLanguage, getAuthSession } from '../util/withAuth';
import axios from 'axios';
import { SERVER_URL } from './_app';

export default function New(props) {

  checkLanguage()

  const user = props.user;
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState(title);
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    if (title == undefined || title == '') {
      setErrorMessage("Title cannot be empty")
      return
    }

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
            <section>
              <h3 className="font-bold text-2xl">Create a Survey</h3>
            </section>

            <section className="mt-10">
              <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="mb-6 pt-3 rounded bg-gray-200">
                  <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="email">Survey Title</label>

                  <input
                    onChange={(e) => {
                      setTitle(e.currentTarget.value), setSlug(e.currentTarget.value.replace(/ /g, "-"));
                    }}

                    className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                    placeholder="survey-name"
                  ></input>
                  <br />

                  <p>www.ccres.co/{slug}</p>

                </div>
                <p style={{ color: 'red' }}>{errorMessage}</p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">  CREATE SURVEY</button>
              </form>
            </section>
          </main>

        </div>

      </Layout>
    </React.Fragment>
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
    return {
      props: { user },
    }
  }

  return {
    props: { token },
  }
}