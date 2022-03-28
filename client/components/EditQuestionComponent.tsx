
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import questions from '../pages/questions';
import { Survey, Question } from '../util/types';

export default function EditQuestionComponent(props: { question: Question }) {
  const router = useRouter();
  const question = props.question;

  const questionId = question.id;
  const [itemOrder, setItemOrder] = useState(question.itemOrder);
  const [title, setTitle] = useState(question.title);
  const [titleMy, setTitleMy] = useState(question.title);

  async function onSubmitFunction() {
    const response = await fetch('/api/deletequestion', {
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
      <form
        onSubmit={async (e) => {
          e.preventDefault, (onSubmitFunction());
        }}
      >
        <button

        >
          Delete
        </button>
      </form>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await fetch('/api/editquestion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              questionId: questionId,
              itemOrder: itemOrder,
              title: title,
              surveyId: question.surveyId,
              categoryId: question.categoryId,
              subcategoryId: question.subcategoryId,
              order: 1,
              titleMy: title,
            }),
          });
        }}
      >

        <input
          placeholder="Content relevancy"
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
        <br />

        <input
          placeholder="Content relevancy"
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />


        <div>
          <button>Save changes</button>
        </div>
      </form>
    </div>
  );
}
