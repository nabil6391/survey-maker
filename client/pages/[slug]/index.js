import Layout from '../../components/Layout';
import { useState, useContext, Fragment } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Stepper from '../../components/Stepper';
import StepperControl from '../../components/StepperControl';
import YoutubeEmbed from '../../components/YoutubeEmbed';
import { useRouter } from 'next/router';
import { Demographic } from '../../components/Demographic'
import CategorySubSection from '../../components/CategorySubSection'
import User from '../../components/User';
import { useStepperContext } from "../../context/StepperContext";
import { SERVER_URL } from '../_app';
import { Dialog, Transition } from '@headlessui/react';
import { content, useLanguageContext, filters } from "../../context/LanguageContext"
import Image from 'next/image';
import { checkLanguage } from '../../util/withAuth';
import bg from '../../public/image0.jpeg'

export default function slug(props) {
  console.log("slug started")
  const router = useRouter();
  const { language } = useLanguageContext();

  checkLanguage()

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
  const [consent, setConsent] = useState(true)

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
                  <label className="block text-sm font-bold mb-2 ml-3" htmlFor="email">  {content[language]['project_leader']} Hasan Al-Banna bin Mohamed</label>


                  <label className="block text-sm mb-2 ml-3" htmlFor="email">  {content[language]['name_researchers']}</label>

                  <div className='px-4'>
                    <li>Inderjit Singh a/l Tara Singh</li>
                    <li>Safar Yaacob</li>
                    <li>Ummul Fahri Abdul Rauf</li>
                    <li>Jessica Ong Hai Liaw</li>
                    <li>Abdul Rahman Abdul Razak Shaik</li>
                    <li>Siti Najwa Zainuddin</li>
                    <li>Kwong Fook Wen</li>
                    <li>Wong Wai Loong</li>
                  </div>
                  <br></br>

                  <label className="block text-sm mb-2 ml-3" htmlFor="email">  {content[language]['name_uni']}</label>
                  <label className="block text-sm font-bold mb-2 ml-3" htmlFor="email">  {content[language]['research_field']}</label>

                  <label className="block text-sm font-bold mb-2 ml-3" htmlFor="email">  {content[language]['research_duration']}</label>

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

      <h1 className='font-bold'> {content[language]['about_study']}</h1>

      <p>
        {content[language]['about_study_desc']}
      </p>
      <br />

      <h1 className='font-bold'>{content[language]['confidentiality']}</h1>
      <p>
        {content[language]['confidentiality_desc']}
      </p>
      <br />
      <YoutubeEmbed embedId="Ra5n4bjFO0g" />
      <br />
      <p>

      </p>
      <br />
      <ul>
        <li>•	{content[language]['agree_read_info']} </li>
        <li>•	{content[language]['agree_voluntary']} </li>
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
          console.log(asd)
          // if (asd.length < filters.length) {
          //   var remaining = filters.filter(e => !asd.some(a => a[0] == e.id)).map(m => m.name)
          //   console.log(remaining)
          //   setErrorMessage("Please select all information \n" + JSON.stringify(remaining))
          // } else {
          setCurrentStep(newStep);
          // }
          break
        default:
          var categoryQuestions = questions.filter(question => question.categoryId == categories[currentStep - 2].id).map(q => q.id);
          var responses = Object.entries(userData["responses"] ?? [])
          var questionsAnswered = responses.filter(response => categoryQuestions.includes(parseInt(response[0]))).length

          console.log(responses, questionsAnswered, categoryQuestions.length)
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
  const images = ['/image0.jpeg', '/image1.jpeg', '/image2.jpeg', '/image3.jpeg', '/image0.jpeg', '/image1.jpeg', '/image2.jpeg', '/image3.jpeg']

  return <div className='h-screen' style={{
    backgroundImage: `url(${images[currentStep - 1]})`,
    width: '100%',
    height: '100%',
  }}>
    <div>
      <Layout>

        <div className="bg-white/40 rounded-xl p-5 shadow-2xl max-w-4xl mx-auto backdrop-blur-lg">
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
                    </Dialog.Title >
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
                  </div >
                </Transition.Child >
              </div >
            </Dialog >
          </Transition >

          {errorMessage}
          < form onSubmit={handleSubmit} >

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

          </form >
        </div >
      </Layout >
    </div>
  </div >
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
