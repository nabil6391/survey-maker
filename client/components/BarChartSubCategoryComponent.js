import {
  BarChart,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

export default function BarChartComponent({ responses, subcategory, questionsMap, colors }) {
  console.log(colors)
  const status = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]

  const responseValues = responses.filter((e) => questionsMap[e.questionId].subcategoryId == subcategory.id).map((r) => {
    return parseInt(r.responseValue);
  });

  const countOccurrences = (responseValues, value) =>
    responseValues.reduce((a, v) => (v === value ? a + 1 : a), 0);

  const barChartData = [];

  for (let step = 1; step <= 5; step++) {
    const countByValue = {
      value: status[step - 1],
      n: countOccurrences(responseValues, step),
    };

    barChartData.push(countByValue);
  }

  return <>
    <ResponsiveContainer width={600} height={400}>
      <BarChart
        data={barChartData}
        margin={{ top: 10, right: 10, left: 10, bottom: 50 }}
      >
        <XAxis dataKey="value" width={10} height={12} interval={0} />

        <Tooltip />

        <Bar dataKey="n" fill={colors} />
      </BarChart>
    </ResponsiveContainer>
  </>
}
