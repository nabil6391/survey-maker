
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SERVER_URL } from '../pages/_app';
import { Survey, Question } from '../util/types';

export default function EditQuestionComponent(props: { question: Question, index: number }) {
  const router = useRouter();
  const question = props.question;

  const questionId = question.id;
  const [itemOrder, setItemOrder] = useState(props.index);
  const [title, setTitle] = useState(question.title);
  const [titleMy, setTitleMy] = useState(question.titleMy);

  async function onDelete() {
    const response = await fetch(SERVER_URL + '/api/v1/questions/' + questionId, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status == 200) {
      location.reload();
    }
  }

  async function onSave() {
    const response = await fetch(SERVER_URL + '/api/v1/questions/' + questionId, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questionId: questionId,
        itemOrder: itemOrder,
        title: title,
        surveyId: question.surveyId,
        categoryId: question.categoryId,
        subcategoryId: question.subcategoryId,
        order: itemOrder,
        titleMy: titleMy,
      }),
    });
    if (response.status == 200) {
      location.reload();
    }
  }


  async function onSubmitFunction() {
    const response = await fetch(SERVER_URL + '/api/v1/question/' + questionId, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questionId: questionId,
      }),
    });
    const { success } = await response.json();
    if (success) {
      location.reload();
    }
  }

  return (
    <div>

      <div className="col-span-6 sm:col-span-3">
        <h1>Question: {itemOrder + 1}</h1>
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
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  w-full shadow-sm border-gray-300 rounded-md outline outline-gray-300 p-2"
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
          Title in Bahasa
        </label>
        <input
          type="text"
          name="last-name"
          value={titleMy}
          id="last-name"
          onChange={(e) => {
            setTitleMy(e.currentTarget.value);
          }}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md outline outline-gray-300 p-2"
        />
      </div>


      <div className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => onSave()}
        >
          Save
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => onDelete()}
        >
          Delete
        </button>
      </div>

    </div >
  );
}
