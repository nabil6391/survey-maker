import {
  BarChart,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

export default function BarChartComponent(props) {
  const responses = props.responses;
  const question = props.question;

  const responseValues = responses.map((r) => {
    if (r.questionId === question.id) {
      return parseInt(r.responseValue);
    }
  });

  const countOccurrences = (responseValues, value) =>
    responseValues.reduce((a, v) => (v === value ? a + 1 : a), 0);

  const barChartData = [];

  // go through every possible value from min Value to MaxValue and count occurence each time:

  for (let step = 1; step <= 5; step++) {
    const countByValue = {
      value: step,
      n: countOccurrences(responseValues, step),
    };

    barChartData.push(countByValue);
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={barChartData}
        margin={{ top: 10, right: 10, left: 10, bottom: 50 }}
      >
        <XAxis dataKey="value" />

        <Tooltip />

        <Bar dataKey="n" fill="#30CDCD" />
      </BarChart>
    </ResponsiveContainer>
  );
}
