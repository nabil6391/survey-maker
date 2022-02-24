import EditQuestionComponent from '../../components/EditQuestionComponent';
import Layout from '../../components/Layout';
import AddQuestionComponent from '../../components/AddQuestionComponent';
import { getAuthSession } from '../../util/withAuth';
import axios from 'axios';

export default function dashboard(props) {
  const user = props.user;
  // console.log('user', user);
  const access = props.access;
  const survey = props.survey;
  if (survey === undefined) {
    return (
      <Layout>
        <h3 style={{ color: '#f7fcfc' }}>
          Sorry you have no access to this page.
        </h3>
      </Layout>
    );
  }
  if (access === true) {
    const username = user.username;
    const surveyId = props.surveyId;
    const slug = props.slug;
    const questions = props.questions;
    const survey = props.survey;

    return (
      <Layout username={username}>
        <div>
          <div
            style={{
              backgroundColor: '#F7FCFC',
              margin: '10px',
              padding: '20px',
              borderRadius: '10px',
            }}
          >
            <h1>{survey.title}</h1>
            <h4>www.survey.com/{survey.customSlug}</h4>
          </div>
          <div className='bg-red-500 text-violet-300'>
            <h1>{survey.title}</h1>
            <h4>www.survey.1com/{survey.customSlug}</h4>
          </div>
          {questions.map((question) => {
            return (
              <div>
                <EditQuestionComponent
                  question={question}
                  surveyId={survey.id}
                />
              </div>
            );
          })}

          <AddQuestionComponent survey={survey} />
          <div
            style={{
              // backgroundColor: '#F7FCFC',
              margin: '10px 10px',
              padding: '0px 0px',
              borderRadius: '10px',
            }}
          >
            {user.id === 1 ? (
              // <div>
              //   <button
              //     onClick={(e) => {
              //       window.location.href = `/signup?returnTo=login?returnTo=${slug}/edit`;
              //     }}
              //   >
              //     preview
              //   </button>
              <button
                style={{ width: '100%' }}
                onClick={(e) => {
                  window.location.href = `/signup?returnTo=login?returnTo=${slug}/edit`;
                }}
              >
                create survey
              </button>
            ) : (
              // <button
              //   onClick={(e) => {
              //     window.location.href = `/signup?returnTo=login?returnTo=${slug}/edit`;
              //   }}
              // >
              //   publish
              // </button>
              // </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <button
                  style={{
                    backgroundColor: '#C1BFBF',
                    color: '#F7FCFC',
                    fontWeight: '650',
                    marginRight: '20px',
                    width: '140px',
                  }}
                  onClick={(e) => {
                    window.location.href = `/user/${username}`;
                  }}
                >
                  RETURN
                </button>
                <button
                  style={{
                    color: '#F7FCFC',
                    fontWeight: '650',
                    width: '140px',
                  }}
                  onClick={(e) => {
                    window.location.href = `/${slug}`;
                  }}
                >
                  VIEW SURVEY
                </button>
                {/* <button
                onClick={(e) => {
                  window.location.href = `/${username}`;
                }}
              >
                save as draft
              </button>
              <button
                onClick={(e) => {
                  window.location.href = `/${slug}`;
                }}
              >
                publish
              </button> */}
              </div>
            )}
          </div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout username={props.user.username}>
      Sorry you have no access to this page.
    </Layout>
  );
}

// export async function getServerSideProps(context) {
//   const { session } = nextCookies(context);
//   // const slug = context.query.slug;

//   // const { getSurveyBySlug } = await import('../../util/databasea.ats');
//   // const survey = await getSurveyBySlug(slug);
//   // if (survey === undefined) {
//   //   return { props: {} };
//   // }

//   // const { getQuestionWhereSurveyIdIs } = await import('../../util/databasea.ats');
//   // const questions = await getQuestionWhereSurveyIdIs(survey.id);

//   // if (await isTokenValid(session)) {
//   //   // console.log('token valid');
//   //   const { getSessionByToken } = await import('../../util/databasea.ats');
//   //   const sessionByToken = await getSessionByToken(session);

//   //   const userId = sessionByToken.userId;
//   //   const { getUserById } = await import('../../util/databasea.ats');
//   //   const user = await getUserById(userId);

//   //   user.createdAt = JSON.stringify(user.createdAt);

//   //   if (survey.userId === user.id) {
//   //     return {
//   //       props: { access: true, user, slug, survey, questions },
//   //     };
//   //   } else return { props: { access: false, user } };
//   // }
//   // const dummyUser = { id: 1 };
//   // if (survey.userId == dummyUser.id) {
//   //   return {
//   //     props: { access: true, slug: slug, user: dummyUser, survey, questions },
//   //   };
//   // } else 

//   return { props: { access: false } };
// }

export async function getServerSideProps(context) {
  console.log("edit")

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
    // var res = await axios.get(`http://localhost:3080/user`, {
    //   headers: { Authorization: `Bearer ${token}` },
    // }
    // )

    const slug = context.query.slug;

    const { data } = await axios.get(`http://localhost:3080/api/v1/surveys`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { slug: slug }
    }
    )
    console.log("response")
    console.log(data)
    var survey = data
    if (survey === undefined) {
      return { props: {} };
    }

    const questionsres = await axios.get(`http://localhost:3080/api/v1/questions`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { survey: survey.id }
    })

    console.log("questions")
    var questions = questionsres.data


    var res = await axios.get(`http://localhost:3080/user`, {
      headers: { Authorization: `Bearer ${token}` },
    }
    )

    var user = res.data
    console.log(user)

    return {
      props: { access: true, slug, user, survey, questions },
    };

    // if (survey.userId === user.id) {
    //   return {
    //     props: { access: true, user, slug, survey, questions },
    // props: { access: true, slug: slug, user: dummyUser, survey, questions },
    //   };
    // } else return { props: { access: false, user } };
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