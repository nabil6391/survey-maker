import Layout from '../../components/Layout';
import { useState, useContext, Fragment } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Stepper from '../../components/Stepper';
import StepperControl from '../../components/StepperControl';
import YoutubeEmbed from '../../components/YoutubeEmbed';
import { useRouter } from 'next/router';
import { Demographic, DemographicInfos } from '../../components/Demographic'
import CategorySubSection from '../../components/CategorySubSection'
import User from '../../components/User';
import { useStepperContext } from "../../context/StepperContext";
import { SERVER_URL } from '../_app';
import { Dialog, Transition } from '@headlessui/react';
import { content, useLanguageContext } from "../../context/LanguageContext"

export default function slug(props) {
  console.log("slug started")
  const router = useRouter();
  const { language } = useLanguageContext();

  if (typeof window !== 'undefined') {
    if (!localStorage.getItem('language')) {
      router.push(`/welcome?redirect=${props.slug}`);
    }
  }

  if (!props.questions || props.questions.length == 0) {
    return (
      <Layout><div className='bg-white rounded-xl p-5 shadow-2xl max-w-2xl mx-auto'>
        <h3>{content[language]['page_not_exist']}</h3>
      </div>
      </Layout>
    );
  }

  function goToThanks() {
    showProjectDetails(true)
  }

  function closeModal() {
    setErrorMessage("")
  }

  const survey = props.survey;
  const userId = props.userId;

  const [currentStep, setCurrentStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [projectDetails, showProjectDetails] = useState(false);
  const [consent, setConsent] = useState(false)

  if (!consent) {
    return <div className='p-5 max-w-4xl mx-auto'>

      <Transition appear show={projectDetails} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {content[language]['project_details']}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {errorMessage}
                  </p>
                </div>
                <div className="mb-6 pt-3 rounded ">
                  <label className="block text-sm font-bold mb-2 ml-3" htmlFor="email">Project Leader: Hasan Al-Banna bin Mohamed</label>


                  <label className="block text-sm mb-2 ml-3" htmlFor="email">Name of co-researchers</label>

                  <div className='px-4'>
                    <li>Inderjit Singh a/l Tara Singh</li>
                    <li>Safar Yaacob</li>
                    <li>Ummul Fahri Abdul Rauf</li>
                    <li>Jessica Ong Hai Liaw</li>
                    <li>Inderjit Singh a/l Tara Singh</li>
                    <li>Abdul Rahman Abdul Razak Shaik</li>
                    <li>Siti Najwa Zainuddin</li>
                    <li>Kwong Fook Wen</li>
                    <li>Wong Wai Loong</li>
                  </div>
                  <br></br>

                  <label className="block text-sm mb-2 ml-3" htmlFor="email">National Defence University of Malaysia, Sg Besi Camp
                    hasanalbanna@upnm.edu.my</label>
                  <label className="block text-sm font-bold mb-2 ml-3" htmlFor="email">Research Field: Social Science</label>

                  <label className="block text-sm font-bold mb-2 ml-3" htmlFor="email">Duration : 1 September 2019 – 31 May 2022</label>



                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={() => { showProjectDetails(false) }}
                    >
                      {content[language]['okay']}
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog >
      </Transition >

      <h1>About Study</h1>

      <p>
        You are invited to participate in a web - app online survey on Measurement of Intangible Human Dimension of Soldiers Leading Towards Military Command Climate Readiness conducted by National Defence University of Malaysia(NDUM).This is a research project being conducted to examine the intangible human dimensions of soldiers.For this purpose, we would appreciate if you could respond to the following questionnaire relating to morale, quality of life and psychological factors.It should take approximately 20 - 30minutes to complete.The Ministry of Education(MOE) has funded this study under the Fundamental Research Grant Scheme(FRGS / 1 / 2019 / SS03 / UPNM / 02 / 2).
      </p>
      <br />

      <h1>CONFIDENTIALITY</h1>
      <p>
        We would like to assure you that your response would be treated as private and
        CONFIDENTIAL and would only be used for this academic study.

        We thank you very much for responding to our questionnaire despite your hectic
        workload.
      </p>
      <br />
      <YoutubeEmbed embedId="Ra5n4bjFO0g" />
      <br />
      <p>
        ELECTRONIC CONSENT: Please select your choice below. Clicking on the “Agree” button indicates that
      </p>
      <br />
      <ul>
        <li>•	You have read the above information</li>
        <li>•	You voluntarily agree to participate</li>
      </ul>

      <br />
      <button
        type="button"
        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        onClick={() => goToThanks()}
      >
        {content[language]['project_details']}
      </button>
      <button
        type="button"
        className="mt-3 w-100 bg-purple-500 text-white-100 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        onClick={() => setConsent(true)}
      >
        {content[language]['agree']}
      </button>
    </div >
  }

  const steps = [
    content[language]['profile_information'],
  ];
  props.categories.forEach(element => {
    steps.push(element.title)
  });
  steps.push(content[language]['complete'])

  const { userData, setUserData } = useStepperContext()
  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Demographic />;
      default:
        return <CategorySubSection index={step - 2} categories={categories} subcategories={subcategories} questions={questions} />;
    }
  };

  const handleClick = async (direction) => {
    let newStep = currentStep;
    direction === "next" ? newStep++ : newStep--;
    // check if steps are within bounds
    if (newStep > 0 && newStep <= steps.length) {

      switch (currentStep) {
        case 1:
          //Check if all data is present

          var asd = Object.entries(userData)
          // if (asd.length == 0 || Object.entries(DemographicInfos).length != asd.length) {
          // setErrorMessage("Please select all information")
          // } else {
          setCurrentStep(newStep);
          // }
          break
        default:
          var categoryQuestions = questions.filter(question => question.categoryId == currentStep - 1).map(q => q.id);
          var responses = Object.entries(userData["responses"] ?? [])
          var questionsAnswered = responses.filter(response => categoryQuestions.includes(parseInt(response[0]))).length

          console.log(questionsAnswered, categoryQuestions.length)
          if (direction != "next") {
            setCurrentStep(newStep);
          } else if (questionsAnswered == categoryQuestions.length) {
            if (currentStep === steps.length - 1) {
              try {

                userData["surveyId"] = survey.id
                userData["userId"] = userId
                const response = await fetch(SERVER_URL + '/api/v1/stats/' + survey.id, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    userData: userData,
                    responseValues: userData.responseValues,
                  }),
                });

                if (response.status == 201) {
                  router.push(`/thanks`);
                } else {
                  setErrorMessage(response.statusText)
                }

              } catch (e) {
                console.log(e)
                setErrorMessage(e)
              }
            } else {
              console.log("setSetp", newStep)
              setCurrentStep(newStep);
            }
          } else {
            // setCurrentStep(newStep);
            setErrorMessage(content[language]['input_information'])
          }
      }
    }

  };

  const handleSubmit = async e => {
    e.preventDefault();

  };

  const questions = props.questions;
  const categories = props.categories;
  const subcategories = props.subcategories;

  return <Layout>

    <div className='bg-white rounded-xl p-5 shadow-2xl max-w-4xl mx-auto'>
      {/* <User ></User> */}
      <Transition appear show={errorMessage != ""} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {content[language]['error']}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {errorMessage}
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    {content[language]['okay']}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {errorMessage}
      <form onSubmit={handleSubmit} >

        <div className="mx-auto pb-2 ">
          {/* Stepper */}
          <div className="horizontal container mt-5 ">
            <Stepper steps={steps} currentStep={currentStep} />

            <div className="p-4 py-10 ">
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

  try {
    const slug = context.query.slug;
    const { data } = await axios.get(SERVER_URL + `/api/v1/surveys`, {
      params: { slug: slug }
    }
    )
    var survey = data[0]
    if (survey === undefined) {
      return { props: {} };
    }

    const questionsres = await axios.get(SERVER_URL + `/api/v1/questions`, {
      params: { surveyId: survey.id }
    })

    const categoriesres = await axios.get(SERVER_URL + `/api/v1/categories`, {
      params: { surveyId: survey.id }
    })

    const subcategoriesres = await axios.get(SERVER_URL + `/api/v1/subcategories`, {
      params: { surveyId: survey.id }
    })

    var questions = questionsres.data
    var categories = categoriesres.data
    var subcategories = subcategoriesres.data

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
