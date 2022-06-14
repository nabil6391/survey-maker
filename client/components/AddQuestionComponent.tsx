import { useState } from 'react';
import { SERVER_URL } from '../pages/_app';
import { SubCategory, Survey } from '../util/types';

export default function AddQuestionComponent(props: { survey: Survey, subcategory: SubCategory, index: number }) {
  const [surveyId, setSurveyId] = useState(props.survey.id);
  const [title, setTitle] = useState('I found the content..');
  const [titleMy, setTitleMy] = useState('I found the content..');

  async function onSubmitFunction() {
    const response = await fetch(SERVER_URL + '/api/v1/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        surveyId: surveyId,
        categoryId: props.subcategory.categoryId,
        subcategoryId: props.subcategory.id,
        order: props.index,
        title: title,
        titleMy: titleMy,
      }),
    });
    if (response.status == 201) {
      location.reload();
    }
  }

  return (
    <div className='bg-white  rounded-xl p-5 '>
      <form
        onSubmit={(e) => {
          e.preventDefault, (onSubmitFunction());
        }}
      >
        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
            Title In English
          </label>
          <input
            type="text"
            name="first-name"
            id="first-name"
            value={title}
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  w-full shadow-sm border-gray-300 rounded-md outline outline-gray-300  p-2"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
            Title in Bahasa
          </label>
          <input
            type="text"
            name="last-name"
            id="last-name"
            value={title}
            onChange={(e) => {
              setTitleMy(e.currentTarget.value);
            }}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md outline outline-gray-300  p-2"
          />
        </div>


        <button className='w-full mt-5 border-teal-400 border-2 bg-gray-200 hover:bg-gray-300'
        // onClick={(e) => {
        //   location.reload(true);
        // }}
        >
          Add question
        </button>
      </form>
    </div>
  );
}
