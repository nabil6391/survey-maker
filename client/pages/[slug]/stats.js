
import Layout from '../../components/Layout';
import BarChartComponent from '../../components/BarChartComponent';
import { getAuthSession } from '../../util/withAuth';
import axios from 'axios';
import { Demographic, DemographicInfos } from '../../components/Demographic'
import CategorySubSection from '../../components/CategorySubSection'
import User from '../../components/User';
import { useStepperContext } from "../../context/StepperContext";


export default function stats(props) {
  if (props.access === true) {
    const survey = props.survey;
    const questions = props.questions;

    const responses = props.responses;

    const responsesSimplified = responses.flat();

    return (
      <Layout username={props.user.username}>
        <div >
          <div>
            <h1>{survey.title}</h1>

            {questions.map((question) => {
              return (
                <div>
                  <h2>{question.title}</h2>

                  <BarChartComponent
                    question={question}
                    responses={responsesSimplified}
                  />

                </div>
              );
            })}


          </div>
        </div>
      </Layout>
    );
  }
  if (props.user !== undefined) {
    return (
      <Layout username={props.user.username}>
        <h3 style={{ color: '#f7fcfc' }}>
          Sorry you have no access to this page.
        </h3>
      </Layout>
    );
  }
  return (
    <Layout>
      <h3 style={{ color: '#f7fcfc' }}>
        Sorry you have no access to this page.
      </h3>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  console.log("stats")
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
    var survey = data[0]
    if (survey === undefined) {
      return { props: {} };
    }

    const questionsres = await axios.get(`http://localhost:3080/api/v1/questions`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { surveyId: survey.id }
    })
    console.log("questions2")

    const categoriesres = await axios.get(`http://localhost:3080/api/v1/categories`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { surveyId: survey.id }
    })
    console.log("questions1")

    const subcategoriesres = await axios.get(`http://localhost:3080/api/v1/subcategories`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { surveyId: survey.id }
    })

    console.log("questions")

    const responsesres = await axios.get(`http://localhost:3080/api/v1/responses`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { surveyId: survey.id }
    })

    console.log("questions")

    var questions = questionsres.data
    var categories = categoriesres.data
    var subcategories = subcategoriesres.data
    var responses = responsesres.data
    console.log(questions)
    console.log(categories)
    console.log(subcategories)
    console.log(responses)

    var res = await axios.get(`http://localhost:3080/api/v1/demographics`, {
      headers: { Authorization: `Bearer ${token}` },
    }
    )

    var user = res.data
    console.log(user)

    return {
      props: { access: true, slug, user, survey, questions, categories, subcategories },
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



  try {
    // var res = await axios.get(`http://localhost:3080/user`, {
    //   headers: { Authorization: `Bearer ${token}` },
    // }
    // )

    const slug = context.query.slug;

    const survey = await axios.get(`http://localhost:3080/api/v1/surveys`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { slug: slug }
    }
    )
    if (survey === undefined) {
      return { props: {} };
    }

    const questions = await axios.get(`http://localhost:3080/api/v1/questions`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { survey: survey.id }
    })

    // if (survey.userId === user.id) {
    //   return {
    //     props: { access: true, user, slug, survey, questions },
    //   };
    // } else return { props: { access: false, user } };
  } catch (e) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  // const { session } = nextCookies(context);

  // if (await isTokenValid(session)) {
  // console.log('token valid');
  //   const { getSessionByToken } = await import('../../util/databasea.ats');
  //   const sessionByToken = await getSessionByToken(session);

  //   const userId = sessionByToken.userId;
  //   console.log('session.userId', sessionByToken.userId);

  //   const { getUserById } = await import('../../util/databasea.ats');
  //   const user = await getUserById(userId);
  //   user.createdAt = JSON.stringify(user.createdAt);

  //   const slug = context.query.slug;
  //   const { getSurveyBySlug } = await import('../../util/databasea.ats');
  //   const survey = await getSurveyBySlug(slug);

  //   if (survey.userId === user.id) {
  //     console.log('you have access');

  //     const { getQuestionWhereSurveyIdIs } = await import(
  //       '../../util/databasea.ats'
  //     );

  //     const questions = await getQuestionWhereSurveyIdIs(survey.id);

  //     console.log('questions', questions);

  //     const responsesByQuestions = await Promise.all(
  //       questions.map(async (id) => {
  //         const { getResponsesByQuestionId } = await import(
  //           '../../util/databasea.ats'
  //         );
  //         const responses = await getResponsesByQuestionId(id.id);
  //         return responses;
  //       }),
  //     );

  //     console.log('asyncRes', responsesByQuestions);

  //     return {
  //       props: {
  //         user,
  //         survey,
  //         questions,
  //         responses: responsesByQuestions,
  //         access: true,
  //       },
  //     };
  //   }

  //   return {
  //     props: { user, access: false },
  //   };
  // }
  return {
    props: { access: false },
  };
}
