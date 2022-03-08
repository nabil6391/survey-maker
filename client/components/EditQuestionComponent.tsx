
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import questions from '../pages/questions';
import { Survey, Question } from '../util/types';

// const saveButtonStyles = css`
//   background-color: #f7fcfc;
//   border: solid;
//   border-color: #30cdcd;
//   border-width: 2px;
//   margin-top: 10px;
//   width: 100%;
// `;

// const deleteFormStyles = css`
//   display: flex;
//   flex-direction: row;
//   align-content: flex-end;
//   button {
//     color: #e99393;
//     background-color: #f7fcfc;
//     height: 20px;
//     width: 20px;
//     text-align: end;
//   }
// `;

// const componentStyles = css`
//   display: flex;
//   flex-direction: column;
//   flex-wrap: wrap;
//   justify-content: center;
//   margin: 10px;
//   background-color: #f7fcfc;
//   padding: 20px;
//   border-radius: 10px;
//   // max-width: 400px;

//   form {
//     display: flex;
//     flex-direction: column;
//     flex-wrap: wrap;
//     input {
//       width: 100%;
//     }
//     select {
//       width: 80px;
//       margin-bottom: 20px;
//     }
//     // button {
//     //   width: 150px;
//     // }
//     div {
//       display: flex;
//       flex-direction: row;
//       justify-content: space-between;
//       margin-top: 10px;

//       input {
//         border-top-style: hidden;
//         border-right-style: hidden;
//         border-left-style: hidden;
//         border-bottom-style: solid;
//         border-radius: 0px;
//         border-color: #c1bfbf;
//         width: 120px;
//         height: 30px;
//       }
//     }
//   }
// `;

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
              surveyId: surveyId,
              categoryId: props.subcategory.categoryId,
              subcategoryId: props.subcategory.id,
              order: 1,
              title: title,
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
