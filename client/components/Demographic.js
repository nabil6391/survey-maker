import { useStepperContext } from "../context/StepperContext";
import { RadioGroup } from '@headlessui/react'
import { filters, filterName, optionName, categoryTitle, subcategoryTitle } from '../context/LanguageContext'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function Demographic() {
    const { userData, setUserData } = useStepperContext();

    const handleChange = (a, e) => {
        setUserData({ ...userData, [e]: a });
    };

    return (
        <div className="flex flex-col ">
            {/* <div className="mt-10 sm:mt-0">
                <form action="#" method="POST">
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                            Country
                        </label>
                        <select
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                        </select>
                    </div>
                </form>
            </div> */}

            {filters.map((filter) => {
                return <div className="mt-3">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm text-gray-900 font-medium">{filterName(filter)}</h4>
                    </div>

                    <RadioGroup value={userData[filter.id]} onChange={option => handleChange(option.value, filter.id)} className="mt-2 ">
                        <div className="grid grid-cols-4 gap-4">
                            {filter.options.map((option) => (
                                <RadioGroup.Option
                                    value={option}
                                    name={optionName(option)}
                                    className={({ active, checked }) =>
                                        classNames(
                                            'bg-white shadow-sm text-gray-900 cursor-pointer',
                                            active ? 'ring-2 ring-green-500' : '',
                                            checked ? 'ring-2 ring-green-500' : '',
                                            'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                                        )
                                    }
                                >
                                    <RadioGroup.Label as="p">{optionName(option)}</RadioGroup.Label>
                                </RadioGroup.Option>
                            ))}
                        </div>
                    </RadioGroup>
                </div>
            })}

        </div >
    );
}