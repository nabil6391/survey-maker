import Layout from '../../components/Layout';
import BarChartSubCategoryComponent from '../../components/BarChartSubCategoryComponent';
import { getAuthSession } from '../../util/withAuth';
import axios from 'axios';
import { Fragment, useState } from 'react'
import { XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, FilterIcon, MinusSmIcon, PlusSmIcon, ViewGridIcon } from '@heroicons/react/solid'
import { useLanguageContext, filters, filterName, optionName, categoryTitle, subcategoryTitle, content } from "../../context/LanguageContext";
import { Dialog, Disclosure, Menu, RadioGroup, Transition, Tab } from '@headlessui/react'
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
const barColors =
  [
    "#63b598", "#ce7d78", "#648177",
    "#f205e6", "#1c0365", "#14a9ad", "#4ca2f9", "#a4e43f", "#d298e2", "#6119d0",
    "#d2737d", "#c0a43c", "#f2510e", "#651be6", "#79806e", "#61da5e", "#cd2f00",
    "#9348af", "#01ac53", "#c5a4fb", "#996635", "#b11573", "#4bb473", "#75d89e",
    "#2f3f94", "#2f7b99", "#da967d", "#34891f", "#b0d87b", "#ca4751", "#7e50a8",
    "#c4d647", "#e0eeb8", "#11dec1", "#289812", "#566ca0", "#ffdbe1", "#2f1179",
    "#935b6d", "#916988", "#513d98", "#aead3a", "#9e6d71", "#4b5bdc", "#0cd36d",
    "#250662", "#cb5bea", "#228916", "#ac3e1b", "#df514a", "#539397", "#880977",
    "#f697c1", "#ba96ce", "#679c9d", "#c6c42c", "#5d2c52", "#48b41b", "#e1cf3b",
    "#5be4f0", "#57c4d8", "#a4d17a", "#be608b", "#96b00c", "#088baf", "#f158bf",
    "#e145ba", "#ee91e3", "#05d371", "#5426e0", "#4834d0", "#802234", "#6749e8",
    "#0971f0", "#8fb413", "#b2b4f0", "#c3c89d", "#c9a941", "#41d158", "#fb21a3",
    "#51aed9", "#5bb32d", "#21538e", "#89d534", "#d36647", "#7fb411", "#0023b8",
    "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3", "#79352c", "#521250",
    "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec", "#1bb699", "#6b2e5f",
    "#64820f", "#21538e", "#89d534", "#d36647", "#7fb411", "#0023b8", "#3b8c2a",
    "#986b53", "#f50422", "#983f7a", "#ea24a3", "#79352c", "#521250", "#c79ed2",
    "#d6dd92", "#e33e52", "#b2be57", "#fa06ec", "#1bb699", "#6b2e5f", "#64820f",
    "#9cb64a", "#996c48", "#9ab9b7", "#06e052", "#e3a481", "#0eb621", "#fc458e",
    "#b2db15", "#aa226d", "#792ed8", "#73872a", "#520d3a", "#cefcb8", "#a5b3d9",
    "#7d1d85", "#c4fd57", "#f1ae16", "#8fe22a", "#ef6e3c", "#243eeb", "#dd93fd",
    "#3f8473", "#e7dbce", "#421f79", "#7a3d93", "#635f6d", "#93f2d7", "#9b5c2a",
    "#15b9ee", "#0f5997", "#409188", "#911e20", "#1350ce", "#10e5b1", "#fff4d7",
    "#cb2582", "#ce00be", "#32d5d6", "#608572", "#c79bc2", "#00f87c", "#77772a",
    "#6995ba", "#fc6b57", "#f07815", "#8fd883", "#060e27", "#96e591", "#21d52e",
    "#d00043", "#b47162", "#1ec227", "#4f0f6f", "#1d1d58", "#947002", "#bde052",
    "#e08c56", "#28fcfd", "#36486a", "#d02e29", "#1ae6db", "#3e464c", "#a84a8f",
    "#911e7e", "#3f16d9", "#0f525f", "#ac7c0a", "#b4c086", "#c9d730", "#30cc49",
    "#3d6751", "#fb4c03", "#640fc1", "#62c03e", "#d3493a", "#88aa0b", "#406df9",
    "#615af0", "#2a3434", "#4a543f", "#79bca0", "#a8b8d4", "#00efd4", "#7ad236",
    "#7260d8", "#1deaa7", "#06f43a", "#823c59", "#e3d94c", "#dc1c06", "#f53b2a",
    "#b46238", "#2dfff6", "#a82b89", "#1a8011", "#436a9f", "#1a806a", "#4cf09d",
    "#c188a2", "#67eb4b", "#b308d3", "#fc7e41", "#af3101", "#71b1f4", "#a2f8a5",
    "#e23dd0", "#d3486d", "#00f7f9", "#474893", "#3cec35", "#1c65cb", "#5d1d0c",
    "#2d7d2a", "#ff3420", "#5cdd87", "#a259a4", "#e4ac44", "#1bede6", "#8798a4",
    "#d7790f", "#b2c24f", "#de73c2", "#d70a9c", "#88e9b8", "#c2b0e2", "#86e98f",
    "#ae90e2", "#1a806b", "#436a9e", "#0ec0ff", "#f812b3", "#b17fc9", "#8d6c2f",
    "#d3277a", "#2ca1ae", "#9685eb", "#8a96c6", "#dba2e6", "#76fc1b", "#608fa4",
    "#20f6ba", "#07d7f6", "#dce77a", "#77ecca"
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

  const tabs = ["Demographic", "BarChart", "RadarChart", "Color"]

  console.log("responses")
  console.log(responses)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState(props.selectedFilters)
  const { language } = useLanguageContext()

  function goToThanks() {


  }


  const download = function (data) {

    // Creating a Blob for having a csv file format
    // and passing the data with type
    const blob = new Blob([data], { type: 'text/csv' });

    // Creating an object for downloading url
    const url = window.URL.createObjectURL(blob)

    // Creating an anchor(a) tag of HTML
    const a = document.createElement('a')

    // Passing the blob downloading url
    a.setAttribute('href', url)

    // Setting the anchor tag attribute for downloading
    // and passing the download file name
    a.setAttribute('download', 'download.csv');

    // Performing a download with click
    a.click()
  }

  const csvmaker = function (data) {

    // Empty array for storing the values
    csvRows = [];

    // Headers is basically a keys of an
    // object which is id, name, and
    // profession
    const headers = Object.keys(data);

    // As for making csv format, headers
    // must be separated by comma and
    // pushing it into array
    csvRows.push(headers.join(','));

    // Pushing Object values into array
    // with comma separation
    const values = Object.values(data).join(',');
    csvRows.push(values)

    // Returning the array joining with new line
    return csvRows.join('\n')
  }

  function updateFilter(id, e) {
    console.log(id, e)

    var updatedFilters = Object.assign({}, selectedFilters);
    if (updatedFilters[id].includes(e)) {
      updatedFilters[id] = updatedFilters[id].filter(i => i != e)
    } else {
      updatedFilters[id].push(e)
    }

    console.log(updatedFilters[id])
    setSelectedFilters(updatedFilters)
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
          selectedUserData[filter.id][user[filter.id]] = selectedUserData[filter.id][user[filter.id]] + 1
        } else {
          selectedUserData[filter.id][user[filter.id]] = 1
        }
      }

    })
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
    var info = { name: categoryTitle(category), x: categoryValues[category.id] / categoryCountsMap[category.id] }
    return info
  })

  console.log(categoryValues)
  console.log(subCategoryValues)

  return (
    <Layout>
      <div className="prose">
        <Tab.Group>
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
                                  <span className="font-medium text-gray-900">{filterName(section)}</span>
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
                                        {optionName(option)}
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

            <main className="mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative z-10 flex items-baseline justify-between pt-6 pb-6 border-b border-gray-200">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{survey.title}</h1>

                <Tab.List className="flex p-1 space-x-5 bg-blue-900/20 rounded-xl">
                  {tabs.map((category) => (
                    <Tab
                      key={category}
                      className={({ selected }) =>
                        classNames(
                          'w-full py-2.5 text-sm leading-5 font-medium text-purple-700 rounded-lg',
                          'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 ring-white ring-opacity-60',
                          selected
                            ? 'bg-white shadow'
                            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                        )
                      }
                    >
                      {category}
                    </Tab>
                  ))}
                </Tab.List>
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
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10 ">
                  {/* Filters */}
                  <form className="hidden lg:block bg-white">
                    <h3 className="sr-only">Categories</h3>

                    {filters.map((filter) => (
                      <Disclosure as="div" key={filter.id} className="border-b border-gray-200 py-6">
                        {({ open }) => (

                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{filterName(filter)}</span>
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
                                {JSON.stringify(selectedUserData[filter.id])}
                                {JSON.stringify(selectedFilters[filter.id])}
                                <RadioGroup onChange={(value) => updateFilter(filter.id, value)} className="mt-4 flex mx-auto w-full">

                                  {filter.options.map((option, index) => (
                                    <RadioGroup.Option value={option.value} name={optionName(option)} >
                                      <input
                                        type="checkbox"
                                        checked={selectedFilters[filter.id]?.includes(option.value) ?? false}
                                        className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        className="ml-3 text-sm text-gray-600"
                                      >
                                        {optionName(option)}
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
                    <div className="w-full  px-2 sm:px-0">
                      <Tab.Panels className="mt-2">
                        {Object.values(tabs).map((posts, idx) => (
                          <Tab.Panel
                            key={idx}
                            className={classNames(
                              'rounded-xl p-3 w-full',
                              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
                            )}
                          >
                            {idx == 0 && <>
                              {/* {JSON.stringify(selectedFilters)} */}
                              <br></br>
                              {/* {JSON.stringify(selectedUserData)} */}
                              <br></br>
                              {filters.map((filter) => {
                                var barChartData = Object.entries(selectedUserData[filter.id]).map((e) => {
                                  return {
                                    value: e[0],
                                    count: selectedFilters[filter.id]?.includes(e[0]) && e[1],
                                  }
                                }
                                )

                                return (
                                  <div className='bg-white rounded-xl p-10 shadow-xl max-w-2xl m-2'>
                                    <h2 className='mx-auto'>{filterName(filter)}</h2>
                                    <ResponsiveContainer width="50%" height={300}>
                                      <BarChart
                                        data={barChartData}
                                      >
                                        <XAxis dataKey="value" width={10} height={15} interval={0} />

                                        {/* <YAxis /> */}
                                        <Tooltip />

                                        <Bar dataKey="count" fill="#30CDCD" barSize={50}>
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

                            </>}
                            {idx == 1 && <div className="bg-white rounded-xl p-5">Sub Category
                              {categories.map((category) => {
                                return (
                                  <div >
                                    <h2 className='text-2xl font-extrabold text-gray-900 sm:pr-12'>{subcategoryTitle(category)}</h2>

                                    {subcategories.filter((subcategory) => subcategory.categoryId == category.id).map((subcategory) => {
                                      return (
                                        <div>
                                          <br></br>
                                          <h2 className='text-2xl text-gray-900 sm:pr-12'>{subcategoryTitle(subcategory)}</h2>

                                          <BarChartSubCategoryComponent
                                            responses={responses}
                                            subcategory={subcategory}
                                            questionsMap={questionsMap}
                                          />

                                        </div>
                                      );
                                    })}
                                  </div>
                                );
                              })}</div>}
                            {idx == 2 && <>
                              <h2 className='text-2xl font-extrabold text-gray-900 sm:pr-12'>All Categories</h2>
                              <br />
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

                              {categories.map((category) => {
                                const subcategorySpiperData = subcategories.map((category) => {
                                  var info = { name: subcategoryTitle(category), x: subCategoryValues[category.id] / subcategoryCountsMap[category.id] }
                                  return info
                                })
                                var asd = (categoryValues[category.id] / categoryCountsMap[category.id])
                                return (
                                  <div className='py-6'>
                                    <h2 className='text-xl font-extrabold text-gray-900 sm:pr-12'>{subcategoryTitle(category)}</h2>

                                    <ResponsiveContainer width="100%" height={300}>
                                      <RadarChart height={500} width={500}
                                        outerRadius="80%" data={subcategorySpiperData}>
                                        <PolarGrid />
                                        <PolarAngleAxis dataKey="name" />
                                        <PolarRadiusAxis />
                                        <Radar dataKey="x" stroke="green"
                                          fill="green" fillOpacity={0.5} />
                                      </RadarChart>
                                    </ResponsiveContainer>

                                  </div>
                                );
                              })}
                            </>}

                            {idx == 3 && <>
                              {categories.map((category) => {
                                var asd = (categoryValues[category.id] / categoryCountsMap[category.id]).round(2)
                                return (
                                  <div>
                                    <h2 className='text-2xl font-extrabold text-gray-900 sm:pr-12'>{subcategoryTitle(category)}</h2>
                                    Value: {asd}

                                    {asd < 2.5 && <>  <div className='bg-red-500'><div className='w-12 h-8'></div></div></>}
                                    {asd >= 2.5 && asd < 4.5 && <>  <div className='bg-yellow-500'><div className='w-12 h-8'></div></div></>}
                                    {asd >= 4.5 && <>  <div className='bg-green-500'><div className='w-24 h-8'></div></div></>}

                                    {subcategories.filter((subcategory) => subcategory.categoryId == category.id).map((subcategory) => {
                                      var asd = (subCategoryValues[subcategory.id] / subcategoryCountsMap[subcategory.id]).round(2)
                                      return (
                                        <div>
                                          <br></br>
                                          <h2 className='text-2xl text-gray-900 sm:pr-12'>{subcategoryTitle(subcategory)}</h2>
                                          Value: {asd}
                                          {asd < 2.5 && <>  <div className='bg-red-500'><div className='w-24 h-8'></div></div></>}
                                          {asd >= 2.5 && asd < 4.5 && <>  <div className='bg-yellow-500'><div className='w-24 h-8'></div></div></>}
                                          {asd >= 4.5 && <>  <div className='bg-green-500'><div className='w-24 h-8'></div></div></>}
                                        </div>
                                      );
                                    })}
                                  </div>
                                );
                              })}
                            </>}
                          </Tab.Panel>
                        ))}
                      </Tab.Panels>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </Tab.Group>
      </div >
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

    var selectedFilters = {}

    for (var j = 0; j < users.length; j++) {
      var user = users[j]

      filters.forEach((filter) => {
        if (user[filter.id]) {
          if (selectedFilters[filter.id]) {
            if (!selectedFilters[filter.id].includes(user[filter.id])) {
              selectedFilters[filter.id].push(user[filter.id])
            }
          } else {
            selectedFilters[filter.id] = [user[filter.id]]
          }
        }

      })
    }
    console.log("Filters")
    console.log(selectedFilters)

    return {
      props: { slug, users, survey, questions, categories, subcategories, responses, selectedFilters }
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

