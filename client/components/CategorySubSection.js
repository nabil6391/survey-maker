import { useStepperContext } from "../context/StepperContext";
import { Fragment, useState } from 'react'

export default function CategorySubSection(props) {
    console.log("cat")
    const index = props.index

    const category = props.categories[index]
    const subcategories = props.subcategories
    const questions = props.questions

    const answers = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]

    const { userData, setUserData } = useStepperContext();

    function updateResponseValues(questionId, responseValue) {
        if (userData["responses"] == undefined) {
            userData["responses"] = {}
        }
        userData["responses"][questionId] = responseValue

        var newData = { ...userData }
        setUserData(newData);
    }

    return (
        <div className="flex flex-col ">
            <div className="w-full flex-1">
                <div className='bg-white rounded-xl max-w-4xl mx-auto'>
                    <h1>Category: {category.title}</h1>

                    {subcategories.filter(sc => sc.categoryId == category.id).map((subcategory) => {

                        return (
                            <div className='bg-gray-200 p-5 rounded-xl my-5'>
                                <h1>SubCategory: {subcategory.title}</h1>
                                {questions.filter(question => question.subcategoryId == subcategory.id).map((question) => {
                                    return (
                                        <div className='bg-white p-5 rounded-xl my-5'>
                                            {question.title}
                                            <div className="flex mx-auto w-full">
                                                <div className="my-auto">Disagree</div>
                                                {answers.map((name, index) => (
                                                    <label className="p-2" key={"q" + index}>
                                                        <div className="p-2">{index + 1}</div>
                                                        <div><input
                                                            className="m-2"
                                                            type="radio"
                                                            name={question.title}
                                                            value={index}
                                                            onChange={(e) => updateResponseValues(question.id, answers.indexOf(e.target.value) + 1)}
                                                        /></div>
                                                    </label>
                                                ))}
                                                <div className="my-auto">Agree</div>
                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                        );

                    })}

                </div>
            </div>
        </div>
    );
}