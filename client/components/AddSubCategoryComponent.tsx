import { useState } from 'react';
import { Category, Survey } from '../util/types';

export default function AddSubCategoryComponent(props: { survey: Survey, category: Category }) {
  const [surveyId, setSurveyId] = useState(props.survey.id);
  const [title, setTitle] = useState('I found the content..');


  async function onSubmitFunction() {
    const response = await fetch('http://localhost:3080/api/v1/subcategories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        surveyId: surveyId,
        categoryId: props.category.id,
        title: title,
      }),
    });
    if (response.status == 201) {
      location.reload();
    }
  }

  return (
    <div className='bg-white m-2 rounded-xl'>
      <form
        onSubmit={(e) => {
          e.preventDefault, (onSubmitFunction());
        }}
      >
        <input
          placeholder="Sub Category Title"
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />

        <button className='w-full mt-5 bg-gray-100 border-teal-400 border-2'>
          Add Sub Category
        </button>
      </form>
    </div>
  );
}
