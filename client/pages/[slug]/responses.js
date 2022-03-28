
import Layout from '../../components/Layout';
import BarChartComponent from '../../components/BarChartComponent';
import { getAuthSession } from '../../util/withAuth';
import axios from 'axios';
import { Demographic, DemographicInfos } from '../../components/Demographic'
import CategorySubSection from '../../components/CategorySubSection'
import User from '../../components/User';
import { useStepperContext } from "../../context/StepperContext";

export default function stats(props) {
  const survey = props.survey;
  const questions = props.questions;

  const responses = props.responses;

  return (
    <Layout username={props.user.username}>
      <div >
        <div>
          <h1>{survey.title}</h1>

          {questions.map((question) => {
            return (
              <div>
                <h2>{question.title}</h2>

                {/* <BarChartComponent
                  question={question}
                  responses={responses}
                /> */}

              </div>
            );
          })}


        </div>
      </div>
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
      params: { surveyId: survey.id }
    }
    )

    var user = res.data
    console.log("demographics")

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
}
