import EditQuestionComponent from '../../components/EditQuestionComponent';
import Layout from '../../components/Layout';
import AddQuestionComponent from '../../components/AddQuestionComponent';
import AddCategoryComponent from '../../components/AddCategoryComponent';
import AddSubCategoryComponent from '../../components/AddSubCategoryComponent';
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

    const categories = props.categories
    const subcategories = props.subcategories
    const survey = props.survey;

    return (
      <Layout username={username}>
        <div>
          <div className='bg-white rounded-xl p-5 shadow-2xl max-w-2xl mx-auto'>
            <h1 className="font-bold text-2xl">{survey.title}</h1>
            <h4 className="font-bold text-2xl" >www.survey.com/{survey.slug}</h4>
          </div>
          {
            categories.map((category) => {
              return (
                <div className='bg-white m-2 rounded-xl p-5 shadow-2xl max-w-2xl mx-auto'>
                  <h1>Category: {category.title}</h1>

                  {subcategories.filter(sc => sc.categoryId == category.id).map((subcategory) => {

                    return (
                      <div className='bg-gray-200 p-5  rounded-xl my-5'>
                        <h1>SubCategory: {subcategory.title}</h1>
                        <br />
                        {questions.filter(question => question.subcategoryId == subcategory.id).map((question) => {
                          return (
                            <div className='bg-white p-5  rounded-xl my-5'>
                              <EditQuestionComponent
                                question={question}
                                surveyId={survey.id}
                              />

                            </div>
                          );
                        })}
                        <AddQuestionComponent survey={survey} subcategory={subcategory} />

                      </div>
                    );

                  })}

                  <AddSubCategoryComponent survey={survey} category={category} />
                </div>
              );
            })
          }
          <AddCategoryComponent survey={survey} />
          {(
            <div className='rounded-xl p-5 max-w-2xl mx-auto'>
              <button

                onClick={(e) => {
                  window.location.href = `/user/${username}`;
                }}
              >
                RETURN
              </button>
              <button

                onClick={(e) => {
                  window.location.href = `/${slug}`;
                }}
              >
                VIEW SURVEY
              </button>
            </div>
          )}
        </div>
      </Layout >
    );
  }
  return (
    <Layout username={props.user.username}>
      Sorry you have no access to this page.
    </Layout>
  );
}

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

    var questions = questionsres.data
    var categories = categoriesres.data
    var subcategories = subcategoriesres.data
    console.log(questions)
    console.log(categories)
    console.log(subcategories)

    var res = await axios.get(`http://localhost:3080/user`, {
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
}