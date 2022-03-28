import Layout from '../../components/Layout';
import { useState, useContext } from 'react';
import { getAuthSession } from '../../util/withAuth';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Stepper from '../../components/Stepper';
import StepperControl from '../../components/StepperControl';

import { Demographic, DemographicInfos } from '../../components/Demographic'
import CategorySubSection from '../../components/CategorySubSection'
import User from '../../components/User';
import { useStepperContext } from "../../context/StepperContext";

export default function slug(props) {
  console.log("slug started")
  const survey = props.survey;
  const userId = props.userId;

  const [currentStep, setCurrentStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const steps = [
    "Profile Information",
  ];
  props.categories.forEach(element => {
    steps.push(element.title)
  });
  steps.push("Complete")

  const { userData, setUserData } = useStepperContext()

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Demographic />;
      case 2:
        return <CategorySubSection index={step - 2} categories={categories} subcategories={subcategories} questions={questions} />;
      case steps.length:
        return <thanks />;
    }
  };

  const handleClick = async (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    // check if steps are within bounds


    if (newStep > 0 && newStep <= steps.length - 1) {

      switch (currentStep) {
        case 1:
          //Check if all data is present

          var asd = Object.entries(userData)
          // if (asd.length == 0 || Object.entries(DemographicInfos).length != asd.length) {
          //   setErrorMessage("THere is an error")
          // } else {
          setCurrentStep(newStep);
          // }
          break
        case steps.length:
          try {
            const response = await fetch('http://localhost:3080/api/v1/responses', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userData: userData,
                responseValues: userData.responseValues,
              }),
            });

            setCurrentStep(newStep);
          } catch (e) {

          }
          break

        default:
          //check if all questions answered

          var categoryQuestions = questions.filter(question => question.categoryId == currentStep - 1).map(q => q.id);
          var responses = Object.entries(userData["responses"] ?? [])
          var questionsAnswered = responses.filter(response => categoryQuestions.includes(parseInt(response[0]))).length

          if (questionsAnswered == categoryQuestions.length) {

            if (currentStep == steps.length - 1) {
              try {
                const response = await fetch('http://localhost:3080/api/v1/responses', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    userData: userData,
                    responseValues: userData.responseValues,
                  }),
                });

                setCurrentStep(newStep);
              } catch (e) {

              }
            } else {
              setCurrentStep(newStep);
            }

          } else {
            setErrorMessage("Please input all information")
          }
      }
    }

  };

  const handleSubmit = async e => {
    e.preventDefault();

    console.log("submits")
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

  return <Layout>

    <div className='bg-white rounded-xl p-5 shadow-2xl max-w-2xl mx-auto'>
      <User ></User>

      {errorMessage}
      <form onSubmit={handleSubmit} >

        <div className="mx-auto pb-2 ">
          {/* Stepper */}
          <div className="horizontal container mt-5 ">
            <Stepper steps={steps} currentStep={currentStep} />

            <div className="my-10 p-10 ">
              {displayStep(currentStep)}
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

      </form>
    </div>
  </Layout >
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
      props: { slug, userId, survey, questions, categories, subcategories },
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
