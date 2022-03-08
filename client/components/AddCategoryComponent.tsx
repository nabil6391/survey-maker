import { useState } from 'react';
import { Survey } from '../util/types';

export default function AddCategoryComponent(props: { survey: Survey }) {
  const [surveyId, setSurveyId] = useState(props.survey.id);
  const [title, setTitle] = useState('I found the content..');


  async function onSubmitFunction() {
    const response = await fetch('http://localhost:3080/api/v1/categories', {
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
    <div className='bg-white m-2 rounded-xl p-5 shadow-2xl max-w-2xl mx-auto'>
      <form
        onSubmit={(e) => {
          e.preventDefault, (onSubmitFunction());
        }}
      >
        <input
          placeholder="Category Title"
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />

        <button className='w-full mt-5 bg-gray-100 border-teal-400 border-2'
        // onClick={(e) => {
        //   location.reload(true);
        // }}
        >
          Add Category
        </button>
      </form>
    </div>
  );
}
