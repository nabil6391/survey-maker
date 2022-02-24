import { useState } from 'react';
import { Survey } from '../util/types';

export default function AddQuestionComponent(props: { survey: Survey }) {
  const [surveyId, setSurveyId] = useState(props.survey.id);
  const [title, setTitle] = useState('I found the content..');


  async function onSubmitFunction() {
    const response = await fetch('http://localhost:3080/api/v1/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        surveyId: surveyId,
        title: title,
      }),
    });
    if (response.status == 201) {
      location.reload();
    }
  }

  return (
    <div className='bg-blue-500'>
      <form
        onSubmit={(e) => {
          e.preventDefault, (onSubmitFunction());
        }}
      >
        <input
          placeholder="What do you think?"
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
