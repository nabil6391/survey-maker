import { useStepperContext } from "../context/StepperContext";
import { Fragment, useState } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
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
        console.log(userData["responses"][questionId])
        var newData = { ...userData }
        setUserData(newData);
    }
    const questionValue = userData["responses"] ?? []
    console.log(questionValue)

    return (
        <div className={`w-full flex-1 rounded-2xl`} >
            <div className="max-w-4xl mx-auto  p-20">
                <h1 className="font-bold">Category: {category.title}</h1>
                {subcategories.filter(sc => sc.categoryId == category.id).map((subcategory) => {
                    return (
                        <div className='p-5 rounded-xl my-5 '>
                            <h1 className="font-bold">SubCategory: {subcategory.title}</h1>
                            {questions.filter(question => question.subcategoryId == subcategory.id).map((question) => {
                                return (
                                    <div className=' p-5 rounded-xl my-5' key={question.id}>
                                        {question.title}
                                        <div className="flex mx-auto w-full justify-center">
                                            <div className="my-auto">Disagree</div>

                                            <RadioGroup className="px-4 flex" value={questionValue[question.id]} onChange={(e) => updateResponseValues(question.id, parseInt(e))}>
                                                {answers.map((name, index) => (
                                                    <RadioGroup.Option value={index + 1} name={name} >
                                                        <label className="p-10" key={"q" + question.id}>
                                                            <div className="p-2">{index + 1}</div>
                                                            <div><input
                                                                className="m-2"
                                                                type="radio"
                                                            /></div>
                                                        </label>
                                                    </RadioGroup.Option>
                                                ))}
                                            </RadioGroup>
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
    );
}