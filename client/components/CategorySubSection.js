import { useStepperContext } from "../context/StepperContext";
import { Fragment, useState } from 'react'

export default function CategorySubSection(props) {
    console.log("cat")
    console.log(props.index)

    console.log(props.categories)
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

                <div className='bg-white rounded-xl max-w-2xl mx-auto'>
                    <h1>Category: {category.title}</h1>

                    {subcategories.filter(sc => sc.categoryId == category.id).map((subcategory) => {

                        return (
                            <div className='bg-gray-200 p-5 rounded-xl my-5'>
                                <h1>SubCategory: {subcategory.title}</h1>
                                <br />
                                {questions.filter(question => question.subcategoryId == subcategory.id).map((question) => {
                                    return (
                                        <div className='bg-white p-5 rounded-xl my-5'>
                                            {question.title}
                                            {question.id}
                                            <br></br>
                                            <form>
                                                {answers.map((name) => (
                                                    <label className="p-2">
                                                        <nobr>{name}
                                                            <input
                                                                className="m-2"
                                                                type="radio"
                                                                name={question.title}
                                                                value={name}
                                                                onChange={(e) => updateResponseValues(question.id, answers.indexOf(e.target.value) + 1)}
                                                            />
                                                        </nobr>
                                                    </label>
                                                ))}
                                            </form>
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