import { useState } from 'react';
import { Survey } from '../util/types';

export default function QuestionComponent(props: { survey: Survey }) {
  const [surveyId, setSurveyId] = useState(props.survey.id);
  const [itemOrder, setItemOrder] = useState(0);
  const [questionType, setQuestionType] = useState('x_slider');
  const [title, setTitle] = useState('Pace');
  const [valueMin, setValueMin] = useState(-5);
  const [valueMax, setValueMax] = useState(5);
  const [descriptionMin, setDescriptionMin] = useState('too slow');
  const [descriptionMax, setDescriptionMax] = useState('too fast');

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await fetch('/api/question', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              surveyId: surveyId,
              itemOrder: itemOrder,
              questionType: questionType,
              title: title,
              valueMin: valueMin,
              valueMax: valueMax,
              descriptionMin: descriptionMin,
              descriptionMax: descriptionMax,
            }),
          });
        }}
      >
        <input
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
        <input
          type="number"
          onChange={(e) => {
            setValueMin(e.currentTarget.valueAsNumber);
          }}
        />
        <input
          onChange={(e) => {
            setDescriptionMin(e.currentTarget.value);
          }}
        />
        <input
          type="number"
          onChange={(e) => {
            setValueMax(e.currentTarget.valueAsNumber);
          }}
        />
        <input
          onChange={(e) => {
            setDescriptionMax(e.currentTarget.value);
          }}
        />
        <button>Add question</button>
      </form>
      <button>+Question</button>
    </>
  );
}