
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import { getAuthSession } from '../util/withAuth';
import axios from 'axios';


export default function Home(props) {
  console.log(props.user)
  return (
    <Layout username={props.user.username}>

      <div className="body-bg  pt-12 md:pt-20 pb-6 px-2 md:px-0">

        <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
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
                  <p>{survey.title}</p>
                  <p>{survey.id}  <Link href={"/" + survey.slug + "/edit"} >
                    <a>
                      <button>Edit</button>
                    </a>
                  </Link></p>

                </div>
              );
            })
          }
        </main>

        <div className="max-w-lg mx-auto text-center mt-12 mb-6">
          <Link href="/new">
            <a>
              <button>+ New Survey</button>
            </a>
          </Link>
          <p className="text-black">Create a new  <a href="/new" className="font-bold hover:underline">Survey</a>.</p>
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

    const { data } = await axios.get(`http://localhost:3080/api/v1/surveys`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { slug: slug }
    }
    )
    console.log("response")
    console.log(data)
    var surveys = data

    var res = await axios.get(`http://localhost:3080/user`, {
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
