import Page from '../../components/Page';
import ColorValue from '../../components/ColorValue';
import BarChartSubCategoryComponent from '../../components/BarChartSubCategoryComponent';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { useLanguageContext, filters, filterName, optionName, categoryTitle, subcategoryTitle, content } from "../../context/LanguageContext";
import { Dialog, Disclosure, Menu, RadioGroup, Transition, Tab } from '@headlessui/react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Bar, BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Pie,
  PieChart,
  Cell,
  Global
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

export default function pdf_review(props) {
  Global.isSsr = true
  const router = useRouter()
  console.log(Global.isSsr)
  const survey = props.survey;
  const questions = props.questions;
  const categories = props.categories;
  const subcategories = props.subcategories;
  const responses = props.responses;
  const users = props.users;

  const { DBar, DPie, mmBar, mmRadar, Color, print } = router.query

  console.log(router.query, DBar, DPie, mmBar)

  const [mDBar, setDBar] = useState(DBar === 'true')
  const [mDPie, setDPie] = useState(DPie === 'true' ?? true)
  const [mBar, setMBar] = useState(mmBar === 'true' ?? true)
  const [mRadar, setMRadar] = useState(mmRadar === 'true' ?? true)
  const [mColor, setColor] = useState(Color === 'true' ?? true)


  const [dialogOpen, setDialogOpen] = useState(false)

  console.log(mDBar, mBar, mDPie)

  const [selectedFilters, setSelectedFilters] = useState(props.selectedFilters)
  const { language } = useLanguageContext()

  function closeModal() {
    setDialogOpen(false)
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
    var info = { name: categoryTitle(category), x: (categoryValues[category.id] / categoryCountsMap[category.id]).toFixed(2) }
    return info
  })
  console.log(categorySpiperData)

  return (
    <Page >

      <Transition appear show={dialogOpen} as={Fragment}>
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
              <div className="bg-white inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl">

                <div className="mb-6 pt-3 rounded flec flex-col">

                  <div class="form-check">
                    <input
                      type="checkbox"
                      checked={mDBar || mDPie}
                      onChange={() => {
                        console.log('Set ', mDBar)
                        setDBar(!mDBar);
                        setDPie(!mDBar);
                      }}
                      className="inline-block h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                    >

                    </input>
                    <label
                      className="ml-3 text-sm text-gray-600 pr-1"
                    >
                      Demographic
                    </label>
                  </div>

                  <div class="form-check pl-5">
                    <input
                      type="checkbox"
                      checked={mDBar}
                      onChange={() => {
                        console.log('Set ', mDBar)
                        setDBar(!mDBar);
                      }}
                      className="inline-block h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                    >

                    </input>
                    <label
                      className="ml-3 text-sm text-gray-600 pr-1"
                    >
                      Bar Chart
                    </label>
                  </div>

                  <div class="form-check pl-5">
                    <input
                      type="checkbox"
                      checked={mDPie}
                      onChange={() => {
                        setDPie(!mDPie);
                      }}
                      className="inline-block h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                    >

                    </input>
                    <label
                      className="ml-3 text-sm text-gray-600 pr-1"
                    >
                      Pie Chart
                    </label>
                  </div>

                  <div class="form-check">
                    <input
                      type="checkbox"
                      checked={mBar || mRadar}
                      onChange={() => {
                        setMBar(!mBar);
                        setMRadar(!mRadar);
                      }}
                      className="inline-block h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                    >

                    </input>
                    <label
                      className="ml-3 text-sm text-gray-600 pr-1"
                    >
                      Module
                    </label>
                  </div>

                  <div class="form-check pl-5">
                    <input
                      type="checkbox"
                      checked={mBar}
                      onChange={() => {
                        setMBar(!mBar);
                      }}
                      className="inline-block h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                    >

                    </input>
                    <label
                      className="ml-3 text-sm text-gray-600 pr-1"
                    >
                      Bar Chart
                    </label>
                  </div>
                  <div class="form-check pl-5">
                    <input
                      type="checkbox"
                      checked={mRadar}
                      onChange={() => {
                        setMRadar(!mRadar);
                      }}
                      className="inline-block h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                    >

                    </input>
                    <label
                      className="ml-3 text-sm text-gray-600 pr-1"
                    >
                      Radar Chart
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      type="checkbox"
                      checked={mColor}
                      onChange={() => {
                        setColor(!mColor);
                      }}
                      className="inline-block h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                    >

                    </input>
                    <label
                      className="ml-3 text-sm text-gray-600 pr-1"
                    >
                      Color
                    </label>
                  </div>

                  <a href={`/api/pdf?url=${encodeURIComponent(`${router.asPath}?DBar=${mDBar}&DPie=${mDPie}&mmBar=${mBar}&mmRadar=${mRadar}&Color=${mColor}&print=true`)}`} download="generated_pdf.pdf" className="block text-black" id=''>Generate</a>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog >
      </Transition >

      <div className="bg-white pl-5 pr-5" width="210mm">
        {print != 'true' && <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 print:hidden"
          onClick={() => { setDialogOpen(true) }}
        >
          Print
        </button>}
        <Tab.Group>
          <div>

            <main className="mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative z-10 flex items-baseline justify-between pt-6 pb-6 ">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">{survey.title}</h1>
              </div>

              <div>Date of output generated : {new Date().toLocaleString()}</div>
              <div>Total Responses: {users.length}</div>
              <br></br>
              <h2 className='mx-auto text-xl font-bold'>Statistics Results</h2>

              <section aria-labelledby="products-heading" className="pt-6 pb-24">
                <div >
                  {(mDBar || mDPie) && <>
                    <h2 className='mx-auto text-xl'>Part A: Demographics</h2>
                    {filters.map((filter, index) => {
                      var barChartData = Object.entries(selectedUserData[filter.id]).map((e) => {
                        return {
                          value: optionName(filter.options.find(f => f.value == e[0])),
                          count: selectedFilters[filter.id]?.includes(e[0]) ? e[1] : 0,
                        }
                      }
                      )

                      return (
                        <div className='break-inside-avoid' >
                          <h2 className='mx-auto text-xl font-bold'>A{index + 1}. {filterName(filter)}</h2>
                          <div className='grid grid-flow-row' width={600} height={550} >
                            {mDBar && <div className='' >
                              <BarChart
                                data={barChartData}
                                width={600} height={250}
                              >
                                <YAxis />
                                <XAxis dataKey="value" width={10} height={15} interval={0} style={{
                                  fontSize: '1rem',
                                  fontFamily: 'Times New Roman',
                                }} />

                                <Tooltip />
                                <Bar dataKey="count" barSize={50} isAnimationActive={false} label>
                                  {
                                    barChartData.map((entry, index) => {
                                      return <Cell fill={barColors[index]} />;
                                    })
                                  }
                                </Bar>

                                {/* <Bar dataKey="count" barSize={50} fill={barColors[index]} isAnimationActive={false} label>

                                </Bar> */}
                              </BarChart>

                            </div>}

                            <br></br>

                            {mDPie && < PieChart width={600} height={250} >
                              <Legend verticalAlign="bottom" height={36} />
                              <br></br>
                              <Tooltip />
                              <Pie data={barChartData} dataKey="count" nameKey="value" fill="#8884d8" isAnimationActive={false} label >
                                {
                                  barChartData.map((entry, index) => {
                                    return <Cell fill={barColors[index]} />;
                                  })
                                }
                              </Pie>

                            </PieChart>}
                          </div>
                        </div>
                      );
                    })}

                  </>}
                  {(mBar || mRadar) && <div >
                    <h2 className='text-2xl font-extrabold text-gray-900 '>Part B. Results by Module</h2>
                    {mBar && categories.map((category, catIndex) => {
                      return (
                        <div className="bg-white rounded-xl">
                          <h2 className='text-2xl font-extrabold text-gray-900 sm:pr-12'>B{catIndex + 1}. {subcategoryTitle(category)}</h2>


                          {subcategories.filter((subcategory) => subcategory.categoryId == category.id).map((subcategory, subCIndex) => {
                            return (
                              <div className='break-inside-avoid'>
                                <br></br>
                                <h2 className='text-2xl text-gray-900 sm:pr-12'>B{catIndex + 1}.{subCIndex + 1}. {subcategoryTitle(subcategory)}</h2>

                                <BarChartSubCategoryComponent
                                  responses={responses}
                                  subcategory={subcategory}
                                  questionsMap={questionsMap}
                                  colors={barColors[Math.floor(Math.random() * 101)]}
                                />

                              </div>
                            );
                          })}
                        </div>
                      );
                    })}

                    <br />
                    {mRadar && <div className="bg-white rounded-xl break-inside-avoid">
                      <h2 className='text-xl font-extrabold text-gray-900 sm:pr-12'>Radar Chart for All Categories</h2>
                      <RadarChart height={300} width={500}
                        outerRadius="80%" data={categorySpiperData}>
                        <PolarGrid />
                        <Tooltip />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis angle={45} domain={[0, 5]} tick={1} type='number' tickCount={5} />
                        <Radar dataKey="x" stroke="green" isAnimationActive={false} label
                          fill="green" fillOpacity={0.5} />
                      </RadarChart>
                    </div>}

                    {mRadar && categories.map((category) => {

                      const subC = subcategories.filter(f => f.categoryId == category.id)

                      if (subC.length < 2) {
                        return null
                      }


                      const subcategorySpiperData = subC.map((category) => {
                        var info = { name: subcategoryTitle(category), x: (subCategoryValues[category.id] / subcategoryCountsMap[category.id]).toFixed(2) }
                        return info
                      })
                      return (
                        <div className="bg-white rounded-xl break-inside-avoid">
                          <h2 className='text-xl font-extrabold text-gray-900 sm:pr-12'>Radar Chart: {subcategoryTitle(category)}</h2>

                          <RadarChart height={300} width={500}
                            outerRadius="80%" data={subcategorySpiperData}>
                            <PolarGrid />
                            <Tooltip />
                            <PolarAngleAxis dataKey="name" />
                            <PolarRadiusAxis angle={45} domain={[0, 5]} tick={1} type='number' tickCount={5} />
                            <Radar dataKey="x" stroke="green" isAnimationActive={false} label
                              fill="green" fillOpacity={0.5} />
                          </RadarChart>

                        </div>
                      );
                    })}
                  </div>}

                  {mColor && <div className="bg-white rounded-xl break-inside-avoid">
                    <h2 className='text-xl font-extrabold text-gray-900 sm:pr-12'>Color Chart</h2>
                    {categories.map((category) => {
                      var asd = (categoryValues[category.id] / categoryCountsMap[category.id]).round(2)
                      return (
                        <div>
                          <div className='flex p-2'>
                            < ColorValue className='w-1/10' value={asd} />

                            <h2 className='text-2xl pl-4 font-extrabold text-gray-900 sm:pr-12 w-5/6'>{subcategoryTitle(category)}</h2>
                            <div className='w-2/10'>{(asd / 5 * 100).round(2)} %</div>
                          </div>

                          {
                            subcategories.filter((subcategory) => subcategory.categoryId == category.id).map((subcategory) => {
                              var asd = (subCategoryValues[subcategory.id] / subcategoryCountsMap[subcategory.id]).round(2)
                              return (
                                <div >
                                  <div className='flex p-2'>
                                    < ColorValue className='w-1/10' value={asd} />
                                    <h2 className='text-2xl  pl-4  text-gray-900 sm:pr-12 w-5/6'>{subcategoryTitle(subcategory)}</h2>
                                    <div className='w-2/10'>{(asd / 5 * 100).round(2)} %</div>
                                  </div>
                                </div>
                              );
                            })
                          }
                        </div>
                      );
                    })}
                  </div>}
                </div>
              </section>
            </main>
          </div >
        </Tab.Group >
      </div >
    </Page >
  )
}


export async function getServerSideProps(context) {
  console.log("stats")

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

  const responsesres = await axios.get(SERVER_URL + `/api/v1/responses/`, {
    params: { surveyId: survey.id }
  })

  var questions = questionsres.data
  var categories = categoriesres.data
  var subcategories = subcategoriesres.data
  var responses = responsesres.data

  var res = await axios.get(SERVER_URL + `/api/v1/demographics`, {
    params: { surveyId: survey.id }
  }
  )

  var users = res.data
  // console.log("demographics")
  // console.log(users)

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
  // console.log(selectedFilters)
  return {
    props: { slug, users, survey, questions, categories, subcategories, responses, selectedFilters }
  };

}



Date.prototype.today = function () {
  return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear();
}
