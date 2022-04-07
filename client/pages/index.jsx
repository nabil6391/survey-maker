
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import { getAuthSession } from '../util/withAuth';
import axios from 'axios';

import { SERVER_URL } from "./_app";

export default function Home(props) {
  console.log(props.user)
  return (
    <Layout username={props.user.username}>

      <div className="body-bg  pt-12 md:pt-20 pb-6 px-2 md:px-0">

        <main className="bg-white max-w-lg mx-auto p-8 md:p-12 rounded-lg shadow-2xl">
          <section>
            <h3 className="font-bold text-2xl">Welcome {props.user.username}</h3>
          </section>
        </main>

        <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
          <h1>Current Surveys</h1>
          {
            props.surveys.length == 0 ? <p>Nothing Available</p> : props.surveys.map((survey) => {
              return (
                <div>
                  <h1>{survey.title}</h1>

                  <div className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">

                    <Link href={"/" + survey.slug + "/edit"} >
                      <a>
                        <button
                          type="button"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Edit
                        </button>
                      </a>
                    </Link>
                    <Link href={"/" + survey.slug + "/stats"} >
                      <a>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          View Stats
                        </button>
                      </a>
                    </Link>
                    <Link href={"/" + survey.slug + "/responses"} >
                      <a>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          View Responses
                        </button>
                      </a>
                    </Link>
                    <Link href={"/" + survey.slug + "/"} >
                      <a>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          View Survey
                        </button>
                      </a>
                    </Link>

                  </div>

                </div>
              );
            })
          }
        </main>

        <div className="max-w-lg mx-auto text-center mt-12 mb-6">
          <Link href="/new">
            <a>
              <button
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              >+ New Survey</button>
            </a>
          </Link>
        </div>

      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  console.log("home")

  const token = await getAuthSession(context);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  try {

    const slug = context.query.slug;

    const { data } = await axios.get(SERVER_URL + `/api/v1/surveys`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { slug: slug }
    }
    )
    console.log("response")
    console.log(data)
    var surveys = data

    var res = await axios.get(SERVER_URL + `/user`, {
      headers: { Authorization: `Bearer ${token}` },
    }
    )

    var user = res.data
    console.log(user)

    return {
      props: { user, surveys },
    };
  } catch (e) {
    console.log(e)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
}
