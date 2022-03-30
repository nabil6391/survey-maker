import { useStepperContext } from "../context/StepperContext";
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export const DemographicInfos = {
    gender: [
        { name: 'Male', value: 'male' },
        { name: 'Female', value: 'female' }
    ],
    age: [
        { name: '30 Below', value: 1 },
        { name: '31-40', value: 2 },
        { name: '41-50', value: 3 },
        { name: '51 and Above', value: 4 },
    ],
    maritalStatus: [
        { name: 'Single', value: 's' },
        { name: 'Married', value: 'm' },
        { name: 'Widowed', value: 'w' },
        { name: 'Divorced', value: 'd' },
    ],
    qualification: [
        { name: 'PhD', value: 'Phd' },
        { name: 'Master', value: 'MSc' },
        { name: 'Bachelor', value: 'BSc' },
        { name: 'Diploma', value: 'Dip' },
        { name: 'SPM/STPM', value: 'SPM' },
        { name: 'Other', value: 'other' },
    ],
    rank: [
        { name: 'Col - Lt Col', value: 'Col' },
        { name: 'Maj - Capt', value: 'Maj' },
        { name: 'Enlisted Rank', value: 'Enl' },
    ],
    service: [
        { name: 'Malaysian Army', value: 'Mar' },
        { name: 'Royal Malaysian Air Force (RMAF)', value: 'RMAF' },
        { name: 'Royal Malaysian Navy (RMN)', value: 'RMN' },
    ],
    dutyArea: [
        { name: 'Base/Formation', value: 'base' },
        { name: 'Unit', value: 'unit' },
        { name: 'Operations (Base)', value: 'Ops(base)' },
        { name: 'Operations (Vessel)', value: 'Ops (vessel)' },
        { name: 'Support', value: 'support' },
        { name: 'Training', value: 'training' }
    ],
    locationDuty: [
        { name: 'Alor Setar', value: 'str' },
        { name: 'Butterworth', value: 'btr' },
        { name: 'Perak', value: 'perak' },
        { name: 'Pahang', value: 'pahang' },
        { name: 'Selangor', value: 'slg' },
        { name: 'Kuala Lumpur', value: '' },
        { name: 'Labuan', value: 'lbn' },
        { name: 'Sabah', value: 'sabh' },
        { name: 'Sarawak', value: 'srk' },
    ],
    serviceYear: [
        { name: 'Below 10 Years', value: '1' },
        { name: '11 - 15 Years', value: '2' },
        { name: '16 - 20 Years', value: '3' },
        { name: 'More than 21 Years', value: '4' },
    ],
    accomodation: [
        { name: 'Mess/Wisma', value: 'asd' },
        { name: 'Family Home', value: 'ad' },
        { name: 'Rented House', value: 'add' },
        { name: 'Owned House', value: 'dad' },
    ]
}

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

            {Object.entries(DemographicInfos).map(([e, v]) => {
                return <div className="mt-10">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm text-gray-900 font-medium">{e.toUpperCase()}</h4>
                    </div>

                    <RadioGroup value={userData[e]} onChange={a => handleChange(a, e)} className="mt-4 ">
                        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                        <div className="grid grid-cols-4 gap-4">
                            {v.map((size) => (
                                <RadioGroup.Option
                                    value={size.value}
                                    name={e}
                                    className={({ active, checked }) =>
                                        classNames(
                                            'bg-white shadow-sm text-gray-900 cursor-pointer',
                                            active ? 'ring-2 ring-green-500' : '',
                                            checked ? 'ring-2 ring-green-500' : '',
                                            'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                                        )
                                    }
                                >
                                    <RadioGroup.Label as="p">{size.name}</RadioGroup.Label>
                                </RadioGroup.Option>
                            ))}
                        </div>
                    </RadioGroup>
                </div>
            })}

        </div >
    );
}