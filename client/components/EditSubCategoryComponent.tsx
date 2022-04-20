
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Survey, Question, Category } from '../util/types';
import { ChevronDownIcon, FilterIcon, MinusSmIcon, PlusSmIcon, PlusCircleIcon, ViewGridIcon, PencilIcon, PencilAltIcon } from '@heroicons/react/solid'
import { Disclosure } from '@headlessui/react'
import { SERVER_URL } from '../pages/_app';

export default function EditQuestionComponent(props: { question: Category, index: number }) {
  const router = useRouter();
  const question = props.question;

  const questionId = question.id;
  const [title, setTitle] = useState(question.title);
  const [titleMy, setTitleMy] = useState(question.titleMy);
  const [itemOrder, setItemOrder] = useState(props.index);
  const [desc, setDesc] = useState('Description');
  const [error, setError] = useState('');
  const [descMy, setDescMy] = useState('Description');

  async function onDelete() {
    const response = await fetch(SERVER_URL + '/api/v1/subcategories/' + questionId, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status == 200) {
      location.reload();
    }
  }

  async function onSave() {
    const response = await fetch(SERVER_URL + '/api/v1/subcategories/' + questionId, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        surveyId: question.surveyId,
        title: title,
        titleMy: titleMy,
        order: itemOrder,
        desc: desc,
        descMy: descMy,
      }),
    });
    if (response.status == 200) {
      location.reload();
    }
  }

  return (
    <div>
      <Disclosure>
        {({ open }) => (
          <>
            <h3 className="-mx-2 -my-3 flow-root">
              <Disclosure.Button className="px-2 py-3 bg-gray-200 w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                <span className="font-medium text-gray-900">{question.title}</span>
                <span className="ml-6 flex items-center">
                  {open ? (
                    <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <div>
                      < PencilAltIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  )}
                </span>
              </Disclosure.Button>
            </h3>
            <Disclosure.Panel className="text-gray-500 py-5">

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

              <div className="col-span-6 sm:col-span-3">
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
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md outline outline-gray-300 p-2"
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
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

    </div>
  );
}
