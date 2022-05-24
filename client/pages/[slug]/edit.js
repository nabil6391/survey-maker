import EditQuestionComponent from '../../components/EditQuestionComponent';
import EditCategoryComponent from '../../components/EditCategoryComponent';
import EditSubCategoryComponent from '../../components/EditSubCategoryComponent';
import Layout from '../../components/Layout';
import AddQuestionComponent from '../../components/AddQuestionComponent';
import AddCategoryComponent from '../../components/AddCategoryComponent';
import AddSubCategoryComponent from '../../components/AddSubCategoryComponent';
import { getAuthSession } from '../../util/withAuth';
import axios from 'axios';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, FilterIcon, MinusSmIcon, PlusSmIcon, ViewGridIcon } from '@heroicons/react/solid'
import { SERVER_URL } from '../_app';
import { content, useLanguageContext } from "../../context/LanguageContext"

export default function dashboard(props) {
  const user = props.user;
  // console.log('user', user);
  const access = props.access;
  const survey = props.survey;

  const { language } = useLanguageContext();

  if (survey === undefined) {
    return (
      <Layout>
        <h3 style={{ color: '#f7fcfc' }}>
          {content[language]['no_access']}
        </h3>
      </Layout>
    );
  }
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  if (access === true) {
    const slug = props.slug;
    const questions = props.questions;

    const [categories, setCategories] = useState(props.categories);
    const subcategories = props.subcategories
    const survey = props.survey;

    // function copyToClipBoard(slug) {
    //   navigator.clipboard.writeText(`https://survey.com/${slug}`);
    //   // setLinkCopied('copied to clipboard');
    //   // setTimeout(world, 5000);
    //   // function world() {
    //   //   setLinkCopied(``);
    //   // }

    // }

    return (
      <Layout>
        <div className="bg-white">

          <div>
            {/* Mobile filter dialog */}
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
              <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                    <div className="px-4 flex items-center justify-between">
                      <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                      <button
                        type="button"
                        className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200">
                      <h3 className="sr-only">Categories</h3>


                    </form>
                  </div>
                </Transition.Child>
              </Dialog>
            </Transition.Root>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative z-10 flex items-baseline justify-between pt-6 pb-6 border-b border-gray-200">
                <div>
                  <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{survey.title}</h1>
                  <h4 className="text-xl" >www.ccres.com/{survey.slug}</h4>
                </div>

                <div className="flex items-center">
                  {/* <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" onClick={() => window.location.href = `/${slug}`}>
                        View Survey
                      </Menu.Button>
                    </div>
                  </Menu> */}
                  {/* <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Export
                        <ChevronDownIcon
                          className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                  </Menu> */}


                  <button
                    type="button"
                    className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="sr-only">Filters</span>
                    <FilterIcon className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <section aria-labelledby="products-heading" className="pt-6 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                  {/* Filters */}
                  <form className="hidden lg:block">
                    <h3 className="sr-only">Categories</h3>

                    {categories.map((category, catIndex) => {
                      return (
                        <div className='bg-white m-2 rounded-xl p-5 shadow-2xl max-w-2xl mx-auto'>
                          <Link href={"#" + category.title} ><a className="text-black block">  {category.title}</a></Link>
                          {subcategories.filter(sc => sc.categoryId == category.id).map((subcategory, subcatIndex) => {
                            return (
                              <Link href={"#" + subcategory.title} ><a className="text-black block text-sm">  {subcategory.title}</a></Link>
                            );
                          })}
                        </div>
                      );
                    })}
                  </form>

                  {/* Product grid */}
                  <div className="lg:col-span-3">
                    <div>

                      {
                        categories.map((category, catIndex) => {
                          return (
                            <div className='bg-white m-2 rounded-xl p-5 shadow-2xl max-w-2xl mx-auto' key={"c" + catIndex} id={category.title}>
                              <EditCategoryComponent
                                question={category}
                                index={catIndex}
                              />
                              {subcategories.filter(sc => sc.categoryId == category.id).map((subcategory, subcatIndex) => {

                                return (
                                  <div className='bg-gray-200 p-5  rounded-xl my-5' key={"sc" + subcatIndex} id={subcategory.title}>
                                    <EditSubCategoryComponent
                                      question={subcategory}
                                      surveyId={survey.id}
                                      index={subcatIndex}
                                    />
                                    <br />
                                    {questions.filter(question => question.subcategoryId == subcategory.id).map((question, questionIndex) => {
                                      return (
                                        <div className='bg-white p-5  rounded-xl my-5' key={"q" + questionIndex}>
                                          <EditQuestionComponent
                                            question={question}
                                            index={questionIndex}
                                          />
                                        </div>
                                      );
                                    })}
                                    <AddQuestionComponent survey={survey} subcategory={subcategory} index={questions.filter(question => question.subcategoryId == subcategory.id).length + 1} />
                                  </div>
                                );
                              })}
                              <AddSubCategoryComponent survey={survey} category={category} index={subcategories.filter(sc => sc.categoryId == category.id).length + 1} />
                            </div>
                          );
                        })
                      }
                      <AddCategoryComponent survey={survey} index={categories.length + 1} />
                      {(
                        <div className='rounded-xl p-5 max-w-2xl mx-auto'>
                          <button
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={(e) => {
                              window.location.href = `/${slug}`;
                            }}
                          >
                            {content[language]['view_survey']}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout username={props.user.username}>
      {content[language]['no_access']}
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

    const { data } = await axios.get(SERVER_URL + `/api/v1/surveys`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { slug: slug }
    }
    )
    console.log("responses")
    console.log(data)
    var survey = data[0]
    if (survey === undefined) {
      return { props: {} };
    }

    const questionsres = await axios.get(SERVER_URL + `/api/v1/questions`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { surveyId: survey.id }
    })

    const categoriesres = await axios.get(SERVER_URL + `/api/v1/categories`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { surveyId: survey.id }
    })

    const subcategoriesres = await axios.get(SERVER_URL + `/api/v1/subcategories`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { surveyId: survey.id }
    })


    var questions = questionsres.data
    var categories = categoriesres.data
    var subcategories = subcategoriesres.data

    var res = await axios.get(SERVER_URL + `/user`, {
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