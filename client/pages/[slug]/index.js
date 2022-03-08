import Layout from '../../components/Layout';
import { useState } from 'react';
import { getAuthSession } from '../../util/withAuth';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Stepper from '../../components/Stepper';
import StepperControl from '../../components/StepperControl';

import { UseContextProvider } from "../../context/StepperContext";
import Demographic from '../../components/Demographic'
import CategorySubSection from '../../components/CategorySubSection'

export default function slug(props) {
  console.log("slug started")
  const survey = props.survey;
  const loggedIn = props.loggedIn;

  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    "Profile Information",
  ];
  props.categories.forEach(element => {
    steps.push(element.title)
  });
  steps.push("Complete")

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Demographic />;
      case 2:
        return <CategorySubSection index={step - 1} categories={categories} subcategories={subcategories} questions={questions} />;

      default:
        return <Demographic />;
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await fetch('/api/addresponse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        responseValues: responseValues,
      }),
    });
  };

  if (!props.questions) {
    return (
      <Layout>
        <h3 style={{ color: '#d5d4d4' }}>Oops..This page does not exist</h3>
      </Layout>
    );
  }
  const questions = props.questions;
  const categories = props.categories;
  const subcategories = props.subcategories;

  const defaultValues = questions.map((question) => {
    return {
      questionId: question.id,
      responseValue: '',
    };
  });

  const [responseValues, setResponseValues] = useState(defaultValues);

  function updateResponseValues(questionId, responseValue) {
    const newResponseValues = responseValues.map((response) => {
      if (questionId === response.questionId) {
        return {
          questionId: response.questionId,
          responseValue: responseValue,
        };
      }
      return response;
    });

    return setResponseValues(newResponseValues);
  }

  return <Layout>
    <div className='bg-white rounded-xl p-5 shadow-2xl max-w-2xl mx-auto'>
      <form onSubmit={handleSubmit} >

        <h1>{survey.title}</h1>

        <div className="mx-auto rounded-2xl bg-white pb-2 shadow-xl md:w-1/2">
          {/* Stepper */}
          <div className="horizontal container mt-5 ">
            <Stepper steps={steps} currentStep={currentStep} />

            <div className="my-10 p-10 ">
              <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
            </div>
          </div>

          {/* navigation button */}
          {currentStep !== steps.length && (
            <StepperControl
              handleClick={handleClick}
              currentStep={currentStep}
              steps={steps}
            />
          )}
        </div>

        {questions.map((question) => {
          return (
            <div className='bg-white rounded-xl p-5 shadow-2xl max-w-2xl mx-auto'>
              <h2>{question.title}</h2>

              <input
                onChange={(e) => {
                  updateResponseValues(question.id, Number(e.currentTarget.value));

                }}
                type="range"
                min={`${question.valueMin}`}
                max={`${question.valueMax}`}
                id={`${question.id}`}
                name={`${question.title}`}
                value={
                  responseValues.find((r) => r.questionId === question.id)
                    .responseValue
                }
              ></input>
              <div>
                <div>
                  {question.descriptionMin}({question.valueMin})
                </div>
                <div>
                  {question.descriptionMax}({question.valueMax})
                </div>
              </div>
            </div>
          );
        })}

      </form>
    </div>
  </Layout>
}

export async function getServerSideProps(context) {
  console.log("index")

  try {
    const slug = context.query.slug;

    const { data } = await axios.get(`http://localhost:3080/api/v1/surveys`, {
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
      params: { surveyId: survey.id }
    })
    console.log("questions2")

    const categoriesres = await axios.get(`http://localhost:3080/api/v1/categories`, {
      params: { surveyId: survey.id }
    })
    console.log("questions1")

    const subcategoriesres = await axios.get(`http://localhost:3080/api/v1/subcategories`, {
      params: { surveyId: survey.id }
    })

    console.log("questions")

    var questions = questionsres.data
    var categories = categoriesres.data
    var subcategories = subcategoriesres.data
    console.log(questions)
    console.log(categories)
    console.log(subcategories)

    var userId = uuidv4()
    return {
      props: { access: true, slug, userId, survey, questions, categories, subcategories },
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
  return { props: {} };
}
