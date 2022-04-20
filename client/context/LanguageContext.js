import { createContext, useContext, useState } from "react";

const LanguageContext = createContext({ language: "en", setLanguage: null });

export function UseLanguageProvider({ children }) {
    const [language, setLanguage] = useState("en");

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguageContext() {
    const { language, setLanguage } = useContext(LanguageContext);

    return { language, setLanguage };
}

export const filters = [
    {
        id: 'gender',
        name: 'Gender',
        nameMy: 'Gendera',
        options: [
            { label: 'Male', labelMy: 'Male', value: 'male', checked: false },
            { label: 'Female', labelMy: 'FeMale', value: 'female', checked: false },
        ],
    },
    {
        id: 'age',
        name: 'Age',
        nameMy: 'Age',
        options: [
            { label: '30 Below', labelMy: '30 Below', value: 1, checked: false },
            { label: '31-40', labelMy: '31-40', value: 2, checked: false },
            { label: '41-50', labelMy: '41-50', value: 3, checked: false },
            { label: '51 and Above', labelMy: '51 and Above', value: 4, checked: false },
        ],
    },
    {
        id: 'maritalStatus',
        name: 'Marital Status',
        nameMy: 'Marital Status',
        options: [
            { label: 'Single', labelMy: 'Single', value: 's', checked: false },
            { label: 'Married', labelMy: 'Married', value: 'm', checked: false },
            { label: 'Widowed', labelMy: 'Widowed', value: 'w', checked: false },
            { label: 'Divorced', labelMy: 'Divorced', value: 'd', checked: false },
        ],
    },
    {
        id: 'qualification',
        name: 'Qualification',
        nameMy: 'Qualification',
        options: [
            { label: 'PhD', labelMy: 'PhD', value: 'Phd', checked: false },
            { label: 'Master', labelMy: 'Master', value: 'MSc', checked: false },
            { label: 'Bachelor', labelMy: 'Bachelor', value: 'BSc', checked: false },
            { label: 'Diploma', labelMy: 'Diploma', value: 'Dip', checked: false },
            { label: 'SPM/STPM', labelMy: 'SPM/STPM', value: 'SPM', checked: false },
            { label: 'Other', labelMy: 'Other', value: 'other', checked: false },
        ],
    },
    {
        id: 'rank',
        name: 'Rank',
        nameMy: 'Rank',
        options: [
            { label: 'Col - Lt Col', labelMy: 'Col - Lt Col', value: 'Col', checked: false },
            { label: 'Maj - Capt', labelMy: 'Maj - Capt', value: 'Maj', checked: false },
            { label: 'Enlisted Rank', labelMy: 'Enlisted Rank', value: 'Enl', checked: false },
        ],
    },
    {
        id: 'service',
        name: 'Service',
        nameMy: 'Service',
        options: [
            { label: 'Malaysian Army', labelMy: 'Malaysian Army', value: 'Mar', checked: false },
            { label: 'Royal Malaysian Air Force (RMAF)', labelMy: 'Royal Malaysian Air Force (RMAF)', value: 'RMAF', checked: false },
            { label: 'Royal Malaysian Navy (RMN)', labelMy: 'Royal Malaysian Navy (RMN)', value: 'RMN', checked: false },
        ],
    },
    {
        id: 'dutyArea',
        name: 'Duty Area',
        nameMy: 'Duty Area',
        options: [
            { label: 'Base/Formation', labelMy: 'Base/Formation', value: 'base', checked: false },
            { label: 'Unit', label: 'Unit', labelMy: 'Unit', value: 'unit', checked: false },
            { label: 'Operations (Base)', labelMy: 'Operations (Base)', value: 'Ops(base)', checked: false },
            { label: 'Operations (Vessel)', labelMy: 'Operations (Vessel)', value: 'Ops (vessel)', checked: false },
            { label: 'Support', labelMy: 'Support', value: 'support', checked: false },
            { label: 'Training', labelMy: 'Training', value: 'training' }
        ],
    },
    {
        id: 'locationDuty',
        name: 'Location Duty',
        nameMy: 'Location Duty',
        options: [
            { label: 'Alor Setar', labelMy: 'Alor Setar', value: 'str', checked: false },
            { label: 'Butterworth', labelMy: 'Butterworth', value: 'btr', checked: false },
            { label: 'Perak', labelMy: 'Perak', value: 'perak', checked: false },
            { label: 'Pahang', labelMy: 'Pahang', value: 'pahang', checked: false },
            { label: 'Selangor', labelMy: 'Selangor', value: 'slg', checked: false },
            { label: 'Kuala Lumpur', labelMy: 'Kuala Lumpur', value: '', checked: false },
            { label: 'Labuan', labelMy: 'Labuan', value: 'lbn', checked: false },
            { label: 'Sabah', labelMy: 'Sabah', value: 'sabh', checked: false },
            { label: 'Sarawak', labelMy: 'Sarawak', value: 'srk', checked: false },
        ],
    },
    {
        id: 'serviceYear',
        name: 'Service Year',
        nameMy: 'Service Year',
        options: [
            { label: 'Below 10 Years', labelMy: 'Below 10 Years', value: '1', checked: false },
            { label: '11 - 15 Years', labelMy: '11 - 15 Years', value: '2', checked: false },
            { label: '16 - 20 Years', labelMy: '16 - 20 Years', value: '3', checked: false },
            { label: 'More than 21 Years', labelMy: 'More than 21 Years', value: '4', checked: false },
        ],
    },
    {
        id: 'accomodation',
        name: 'Accomodation',
        nameMy: 'Accomodation',
        options: [
            { label: 'Mess/Wisma', labelMy: 'Mess/Wisma', value: 'asd', checked: false },
            { label: 'Family Home', labelMy: 'Family Home', value: 'ad', checked: false },
            { label: 'Rented House', labelMy: 'Rented House', value: 'add', checked: false },
            { label: 'Owned House', labelMy: 'Owned House', value: 'dad', checked: false },
        ],
    },
]

export let filterName = (filter) => useContext(LanguageContext).language == "en" ? filter.name : filter.nameMy
export let optionName = (filter) => useContext(LanguageContext).language == "en" ? filter.label : filter.labelMy
export let categoryTitle = (filter) => useContext(LanguageContext).language == "en" ? filter.title : filter.titleMy
export let subcategoryTitle = (filter) => useContext(LanguageContext).language == "en" ? filter.title : filter.titleMy
