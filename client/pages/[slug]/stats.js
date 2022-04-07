import Layout from '../../components/Layout';
import BarChartComponent from '../../components/BarChartComponent';
import BarChartSubCategoryComponent from '../../components/BarChartSubCategoryComponent';
import { getAuthSession } from '../../util/withAuth';
import axios from 'axios';
import { Fragment, useState } from 'react'
import { XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, FilterIcon, MinusSmIcon, PlusSmIcon, ViewGridIcon } from '@heroicons/react/solid'
import { Demographic, DemographicInfos } from '../../components/Demographic'
import CategorySubSection from '../../components/CategorySubSection'
import User from '../../components/User';
import { useStepperContext } from "../../context/StepperContext";
import { Dialog, Disclosure, Menu, RadioGroup, Transition } from '@headlessui/react'
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  CartesianGrid,
  Pie,
  PieChart,
  Cell,
} from 'recharts';
import { SERVER_URL } from '../_app';
const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c"]

export const filters = [
  {
    id: 'gender',
    name: 'Gender',
    options: [
      { label: 'Male', value: 'male', checked: false },
      { label: 'Female', value: 'female', checked: false },
    ],
  },
  {
    id: 'age',
    name: 'Age',
    options: [
      { label: '30 Below', value: 1, checked: false },
      { label: '31-40', value: 2, checked: false },
      { label: '41-50', value: 3, checked: false },
      { label: '51 and Above', value: 4, checked: false },
    ],
  },
  {
    id: 'maritalStatus',
    name: 'Marital Status',
    options: [
      { label: 'Single', value: 's', checked: false },
      { label: 'Married', value: 'm', checked: false },
      { label: 'Widowed', value: 'w', checked: false },
      { label: 'Divorced', value: 'd', checked: false },
    ],
  },
  {
    id: 'qualification',
    name: 'Qualification',
    options: [
      { label: 'PhD', value: 'Phd', checked: false },
      { label: 'Master', value: 'MSc', checked: false },
      { label: 'Bachelor', value: 'BSc', checked: false },
      { label: 'Diploma', value: 'Dip', checked: false },
      { label: 'SPM/STPM', value: 'SPM', checked: false },
      { label: 'Other', value: 'other', checked: false },
    ],
  },
  {
    id: 'rank',
    name: 'Rank',
    options: [
      { label: 'Col - Lt Col', value: 'Col', checked: false },
      { label: 'Maj - Capt', value: 'Maj', checked: false },
      { label: 'Enlisted Rank', value: 'Enl', checked: false },
    ],
  },
  {
    id: 'service',
    name: 'Service',
    options: [
      { label: 'Malaysian Army', value: 'Mar', checked: false },
      { label: 'Royal Malaysian Air Force (RMAF)', value: 'RMAF', checked: false },
      { label: 'Royal Malaysian Navy (RMN)', value: 'RMN', checked: false },
    ],
  },
  {
    id: 'dutyArea',
    name: 'Duty Area',
    options: [
      { label: 'Base/Formation', value: 'base', checked: false },
      { label: 'Unit', value: 'unit', checked: false },
      { label: 'Operations (Base)', value: 'Ops(base)', checked: false },
      { label: 'Operations (Vessel)', value: 'Ops (vessel)', checked: false },
      { label: 'Support', value: 'support', checked: false },
      { label: 'Training', value: 'training' }
    ],
  },
  {
    id: 'locationDuty',
    name: 'Location Duty',
    options: [
      { label: 'Alor Setar', value: 'str', checked: false },
      { label: 'Butterworth', value: 'btr', checked: false },
      { label: 'Perak', value: 'perak', checked: false },
      { label: 'Pahang', value: 'pahang', checked: false },
      { label: 'Selangor', value: 'slg', checked: false },
      { label: 'Kuala Lumpur', value: '', checked: false },
      { label: 'Labuan', value: 'lbn', checked: false },
      { label: 'Sabah', value: 'sabh', checked: false },
      { label: 'Sarawak', value: 'srk', checked: false },
    ],
  },
  {
    id: 'serviceYear',
    name: 'Service Year',
    options: [
      { label: 'Below 10 Years', value: '1', checked: false },
      { label: '11 - 15 Years', value: '2', checked: false },
      { label: '16 - 20 Years', value: '3', checked: false },
      { label: 'More than 21 Years', value: '4', checked: false },
    ],
  },
  {
    id: 'accomodation',
    name: 'Accomodation',
    options: [
      { label: 'Mess/Wisma', value: 'asd', checked: false },
      { label: 'Family Home', value: 'ad', checked: false },
      { label: 'Rented House', value: 'add', checked: false },
      { label: 'Owned House', value: 'dad', checked: false },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function stats(props) {
  const survey = props.survey;
  const questions = props.questions;
  const categories = props.categories;
  const subcategories = props.subcategories;
  const responses = props.responses;
  const users = props.users;

  console.log("responses")
  console.log(responses)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({})

  function goToThanks() {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  function updateFilter(e) {
    console.log(e)
  }

  var categoryValues = {}
  var subCategoryValues = {}
  var questionsMap = {}
  var categoryCountsMap = {}
  var subcategoryCountsMap = {}
  var uniqueUsers = []
  var selectedUserData = {}

  filters.forEach((filter) => {
    selectedUserData[filter.id] = {}
    filter.options.forEach((option) => {
      selectedUserData[filter.id][option.value] = 0
    })
  })

  for (var j = 0; j < users.length; j++) {
    var user = users[j]

    filters.forEach((filter) => {
      if (user[filter.id]) {
        if (selectedFilters[filter.id]) {
          if (!selectedFilters[filter.id].includes(user[filter.id])) {
            selectedFilters[filter.id].push(user[filter.id])
          }
          selectedUserData[filter.id][user[filter.id]] = selectedUserData[filter.id][user[filter.id]] + 1
        } else {
          selectedFilters[filter.id] = [user[filter.id]]
          selectedUserData[filter.id][user[filter.id]] = 1
        }
      }

    })


    //   const handleSelect = technology => {
    //     const isSelected = selectedTechnologies.includes(technology);
    //     /* If the option has already been selected, we remove it from the array. */
    // ‍
    //     /* Otherwise, we add it. */ 
    // ‍
    //     const newSelection = isSelected
    //     ? selectedTechnologies.filter(currentTech => currentTech !== technology)
    //     : [...selectedTechnologies, technology];
    //   setSelectedTechnologies(newSelection);};

  }

  for (var j = 0; j < questions.length; j++) {
    var question = questions[j]
    questionsMap[question.id] = question
  }



  for (var i = 0; i < responses.length; i++) {
    var response = responses[i]

    if (!uniqueUsers.includes(response.userId)) {
      uniqueUsers.push(response.userId)
    }

    var question = questionsMap[response.questionId]
    if (question) {
      if (categoryValues[question.categoryId]) {
        categoryValues[question.categoryId] = categoryValues[question.categoryId] + parseInt(response.responseValue)
        categoryCountsMap[question.categoryId] = categoryCountsMap[question.categoryId] + 1
      } else {
        categoryValues[question.categoryId] = parseInt(response.responseValue)
        categoryCountsMap[question.categoryId] = 1
      }

      if (subCategoryValues[question.subcategoryId]) {
        subCategoryValues[question.subcategoryId] = subCategoryValues[question.subcategoryId] + parseInt(response.responseValue)
        subcategoryCountsMap[question.subcategoryId] = subcategoryCountsMap[question.subcategoryId] + 1
      } else {
        subCategoryValues[question.subcategoryId] = parseInt(response.responseValue)
        subcategoryCountsMap[question.subcategoryId] = 1
      }
    }
  }



  const categorySpiperData = categories.map((category) => {
    var info = { name: category.title, x: categoryValues[category.id] / categoryCountsMap[category.id] }
    return info
  })

  // const responseValues = responses.map((r) => {
  //   if (r.questionId === question.id) {
  //     return parseInt(r.responseValue);
  //   }
  // });

  // const countOccurrences = (responseValues, value) =>
  //   responseValues.reduce((a, v) => (v === value ? a + 1 : a), 0);
  // const barChartData = [];

  // // go through every possible value from min Value to MaxValue and count occurence each time:

  // for (let step = 1; step <= 5; step++) {
  //   const countByValue = {
  //     value: step,
  //     n: countOccurrences(responseValues, step),
  //   };

  //   barChartData.push(countByValue);
  // }

  console.log(categoryValues)
  console.log(subCategoryValues)

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


                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </div>
              </Transition.Child>
            </Dialog>
          </Transition.Root>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 flex items-baseline justify-between pt-6 pb-6 border-b border-gray-200">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{survey.title}</h1>

              <div className="flex items-center">
                {/* <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Print
                      <ChevronDownIcon
                        className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                </Menu> */}
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" >
                      Export
                      <ChevronDownIcon
                        className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                </Menu>


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
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                {/* Filters */}
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>

                  {filters.map((filter) => (
                    <Disclosure as="div" key={filter.id} className="border-b border-gray-200 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">{filter.name}</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              <RadioGroup onChange={(e) => updateFilter(e)} className="mt-4 flex mx-auto w-full">
                                {filter.options.map((option, index) => (
                                  <RadioGroup.Option value={index} name={option} >
                                    <input
                                      name={`${filter.id}[]`}
                                      value={option.value}
                                      type="checkbox"
                                      // checked={selectedUserData[filter.id].includes(option.value)}
                                      className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      className="ml-3 text-sm text-gray-600"
                                    >
                                      {option.label}
                                    </label>
                                  </RadioGroup.Option>
                                ))}
                              </RadioGroup>

                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3">

                  {JSON.stringify(selectedFilters)}
                  <br></br>
                  <br></br>
                  {JSON.stringify(selectedUserData)}
                  <br></br>
                  <br></br>
                  {filters.map((filter) => {
                    var barChartData = Object.entries(selectedUserData[filter.id]).map((e) => {
                      return {
                        value: e[0],
                        count: e[1],
                      }
                    }
                    )

                    return (
                      <div>
                        <h2>{filter.name}</h2>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart
                            data={barChartData}
                            margin={{ top: 10, right: 10, left: 10, bottom: 50 }}
                          >
                            <XAxis dataKey="value" />

                            {/* <YAxis /> */}
                            <Tooltip />

                            <Bar dataKey="count" fill="#30CDCD" >
                              {
                                barChartData.map((entry, index) => {
                                  return <Cell fill={barColors[index]} />;
                                })
                              }
                            </Bar>
                          </BarChart>

                        </ResponsiveContainer>

                        <br></br>

                        <PieChart width={730} height={250}>
                          <Legend verticalAlign="top" height={36} />
                          <Tooltip />
                          <Pie data={barChartData} dataKey="count" nameKey="value" fill="#8884d8" >
                            {
                              barChartData.map((entry, index) => {
                                return <Cell fill={barColors[index]} />;
                              })
                            }
                          </Pie>

                        </PieChart>
                      </div>
                    );
                  })}


                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart height={500} width={500}
                      outerRadius="80%" data={categorySpiperData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis />
                      <Radar dataKey="x" stroke="green"
                        fill="green" fillOpacity={0.5} />
                    </RadarChart>
                  </ResponsiveContainer>

                  SubCategory
                  {subcategories.map((subcategory) => {
                    return (
                      <div>
                        <h2>{subcategory.title}</h2>

                        <BarChartSubCategoryComponent
                          question={question}
                          responses={responses}
                          subcategories={subcategories}
                        />

                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </Layout >
  )
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

    const { data } = await axios.get(SERVER_URL + `/api/v1/surveys`, {
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

    const questionsres = await axios.get(SERVER_URL + `/api/v1/questions`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { surveyId: survey.id }
    })
    console.log("questions2")

    const categoriesres = await axios.get(SERVER_URL + `/api/v1/categories`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { surveyId: survey.id }
    })
    console.log("questions1")

    const subcategoriesres = await axios.get(SERVER_URL + `/api/v1/subcategories`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { surveyId: survey.id }
    })

    console.log("questions")

    const responsesres = await axios.get(SERVER_URL + `/api/v1/responses/`, {
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

    var res = await axios.get(SERVER_URL + `/api/v1/demographics`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { surveyId: survey.id }
    }
    )

    var users = res.data
    console.log("demographics")

    console.log(users)

    return {
      props: { slug, users, survey, questions, categories, subcategories, responses },
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

