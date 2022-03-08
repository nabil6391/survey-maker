import { useState } from 'react';
import { SubCategory, Survey } from '../util/types';

export default function AddQuestionComponent(props: { survey: Survey, subcategory: SubCategory }) {
  const [surveyId, setSurveyId] = useState(props.survey.id);
  const [title, setTitle] = useState('I found the content..');


  async function onSubmitFunction() {
    const response = await fetch('http://localhost:3080/api/v1/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        surveyId: surveyId,
        categoryId: props.subcategory.categoryId,
        subcategoryId: props.subcategory.id,
        order: 1,
        title: title,
        titleMy: title,
      }),
    });
    if (response.status == 201) {
      location.reload();
    }
  }

  return (
    <div className='bg-white m-2 rounded-xl p-5 '>
      <form
        onSubmit={(e) => {
          e.preventDefault, (onSubmitFunction());
        }}
      >
        <input
          placeholder="Question Title"
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />

        <button className='w-full mt-5 bg-gray-100 border-teal-400 border-2'
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
