
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import { checkLanguage, getAuthSession } from '../util/withAuth';
import axios from 'axios';
import { SERVER_URL } from "./_app";
import { createContext, useContext, useState } from "react";
import { content, useLanguageContext } from "../context/LanguageContext"

export default function Home(props) {
  const { language } = useLanguageContext();

  checkLanguage()

  async function onDelete(survey) {
    const response = await fetch(SERVER_URL + '/api/v1/surveys/' + survey.id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status == 200) {
      location.reload();
    }
  }


  return (
    <Layout username={props.user.username}>

      <div className="body-bg pt-8 pb-6 px-2 md:px-0 ">

        <div class="relative flex px-5 items-center ">
          <div class="flex-grow border-t border-gray-400"></div>
          <h3 className="font-bold text-2xl px-8">{content[language]['current_surveys']}</h3>
          <div class="flex-grow border-t border-gray-400" ></div>
          <div className="max-w-lg mx-auto text-center mt-12 mb-6">
            <Link href="/new">
              <a>
                <button
                  className="rounded-md border border-transparent px-4 py-2 bg-purple-500 text-base font-medium text-white hover:ring-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-900 sm:ml-3 sm:w-auto sm:text-sm"
                >+ {content[language]['new_survey']}</button>
              </a>
            </Link>
          </div>
          <div class="flex-grow border-t border-gray-400"></div>
        </div>

        <main className="mx-auto px-8">
          {
            props.surveys.length == 0 ? <p>{content[language]['no_surveys']}</p> : props.surveys.map((survey) => {
              return (
                <div className="bg-white max-w-4xl mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                  <h1 className='text-xl font-bold'>{survey.title}</h1>

                  <div className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">


                    <Link href={"/" + survey.slug + "/edit"} >
                      <a>
                        <button
                          type="button"
                          className="outline outline-offset-2 outline-1 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          {content[language]['edit']}
                        </button>
                      </a>
                    </Link>
                    <a>
                      <button
                        type="button"
                        className="outline outline-offset-4 outline-1 mt-3 w-full rounded-md border border-gray-300 shadow-sm px-4  bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => onDelete(survey)}
                      >
                        Delete
                      </button>
                    </a>
                    <Link href={"/" + survey.slug + "/stats"} >
                      <a>
                        <button
                          type="button"
                          className=" outline outline-offset-2 outline-1 mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          {content[language]['view_stats']}
                        </button>
                      </a>
                    </Link>
                    <Link href={"/" + survey.slug + "/responses"} >
                      <a>
                        <button
                          type="button"
                          className="outline outline-offset-4 outline-1 mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          {content[language]['view_responses']}
                        </button>
                      </a>
                    </Link>
                    <Link href={"/" + survey.slug + "/"} >
                      <a>
                        <button
                          type="button"
                          className=" outline outline-offset-4 outline-1 mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm  bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          {content[language]['view_survey']}
                        </button>
                      </a>
                    </Link>

                  </div>

                </div>
              );
            })
          }
        </main>
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
    }
    )

    var surveys = data

    var res = await axios.get(SERVER_URL + `/user`, {
      headers: { Authorization: `Bearer ${token}` },
    }
    )

    var user = res.data

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
