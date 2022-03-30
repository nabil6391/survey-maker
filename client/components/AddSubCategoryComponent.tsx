import { useState } from 'react';
import { Category, Survey } from '../util/types';

export default function AddSubCategoryComponent(props: { survey: Survey, category: Category }) {
  const [surveyId, setSurveyId] = useState(props.survey.id);
  const [title, setTitle] = useState('I found the content..');
  const [titleMy, setTitleMy] = useState('I found the content..');

  async function onSubmitFunction() {
    const response = await fetch('http://localhost:3080/api/v1/subcategories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        surveyId: surveyId,
        categoryId: props.category.id,
        title: title,
        titleMy: titleMy,
        order: 1,
      }),
    });
    if (response.status == 201) {
      location.reload();
    }
  }

  return (
    <div className='bg-gray-100 p-5 my-5 rounded-xl'>

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
            value={titleMy}
            onChange={(e) => {
              setTitleMy(e.currentTarget.value);
            }}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md outline outline-gray-300  p-2"
          />
        </div>

        {/* <div className="col-span-6 sm:col-span-3">
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
              Description in English
            </label>
            <textarea
              name="last-name"
              id="last-name"
              value={desc}
              onChange={(e) => {
                setDesc(e.currentTarget.value);
              }}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md outline outline-gray-300"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
              Description in Bahasa
            </label>
            <textarea
              name="last-name"
              id="last-name"
              value={descMy}
              onChange={(e) => {
                setDescMy(e.currentTarget.value);
              }}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md outline outline-gray-300"
            />
          </div> */}

        <button className='w-full mt-5 bg-gray-200 hover:bg-gray-300 border-teal-400 border-2'>
          Add Sub Category
          {/* <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> */}
        </button>
      </form >

    </div>
  );
}
