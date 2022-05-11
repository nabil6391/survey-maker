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

export let filterName = (filter) => useContext(LanguageContext).language == "en" ? filter.name : filter.nameMy
export let optionName = (filter) => useContext(LanguageContext).language == "en" ? filter.label : filter.labelMy
export let categoryTitle = (category) => useContext(LanguageContext).language == "en" ? category.title : category.titleMy
export let subcategoryTitle = (subcategory) => useContext(LanguageContext).language == "en" ? subcategory.title : subcategory.titleMy

export const filters = [
    {
        id: 'gender',
        name: 'Gender',
        nameMy: 'Jantina',
        options: [
            { label: 'Male', labelMy: 'Lelaki', value: 'male', checked: false },
            { label: 'Female', labelMy: 'Perempuan', value: 'female', checked: false },
        ],
    },
    {
        id: 'age',
        name: 'Age',
        nameMy: 'Umur',
        options: [
            { label: '30 Below', labelMy: '30 Ke Bawah', value: 1, checked: false },
            { label: '31-40', labelMy: '31-40', value: 2, checked: false },
            { label: '41-50', labelMy: '41-50', value: 3, checked: false },
            { label: '51 and Above', labelMy: '51 Ke Atas', value: 4, checked: false },
        ],
    },
    {
        id: 'maritalStatus',
        name: 'Marital Status',
        nameMy: 'Taraf Perkahwinan',
        options: [
            { label: 'Single', labelMy: 'Bujang', value: 's', checked: false },
            { label: 'Married', labelMy: 'Kahwin', value: 'm', checked: false },
            { label: 'Widowed', labelMy: 'Janda/Duda', value: 'w', checked: false },
            { label: 'Divorced', labelMy: 'Bercerai', value: 'd', checked: false },
        ],
    },
    {
        id: 'qualification',
        name: 'Qualification',
        nameMy: 'Kelulusan Akademik',
        options: [
            { label: 'PhD', labelMy: 'PhD', value: 'Phd', checked: false },
            { label: 'Master', labelMy: 'Sarjana', value: 'MSc', checked: false },
            { label: 'Bachelor', labelMy: 'Sarjana Muda', value: 'BSc', checked: false },
            { label: 'Diploma', labelMy: 'Diploma', value: 'Dip', checked: false },
            { label: 'SPM/STPM', labelMy: 'SPM/STPM', value: 'SPM', checked: false },
            { label: 'Other', labelMy: 'Lain-lain', value: 'other', checked: false },
        ],
    },
    {
        id: 'rank',
        name: 'Rank',
        nameMy: 'Pangkat',
        options: [
            { label: 'Col - Lt Col', labelMy: 'Kol - Lt Kol', value: 'Col', checked: false },
            { label: 'Maj - Capt', labelMy: 'Mej - Kapt', value: 'Maj', checked: false },
            { label: 'Enlisted Rank', labelMy: 'Lain-lain Pangkat (LLP)', value: 'Enl', checked: false },
        ],
    },


    {
        id: 'service',
        name: 'Service',
        nameMy: 'Perkhidmatan',
        options: [
            { label: 'Tentera Darat Malaysia', labelMy: 'Malaysian Army', value: 'Mar', checked: false },
            { label: 'Tentera Udara Diraja Malaysia (TUDM)', labelMy: 'Royal Malaysian Air Force (RMAF)', value: 'RMAF', checked: false },
            { label: 'Tentera Laut Diraja Malaysia (TLDM)', labelMy: 'Royal Malaysian Navy (RMN)', value: 'RMN', checked: false },
        ],
    },
    {
        id: 'dutyArea',
        name: 'Duty Area',
        nameMy: 'Tempat Bertugas',
        options: [
            { label: 'Base/Formation', labelMy: 'Formasi/Pangkalan', value: 'base', checked: false },
            { label: 'Unit', label: 'Unit', labelMy: 'Pasukan', value: 'unit', checked: false },
            { label: 'Operations (Base)', labelMy: 'Operasi (Pangkalan)', value: 'Ops(base)', checked: false },
            { label: 'Operations (Vessel)', labelMy: 'Operasi (Kapal)', value: 'Ops (vessel)', checked: false },
            { label: 'Support', labelMy: 'Bantuan', value: 'support', checked: false },
            { label: 'Training', labelMy: 'Latihan', value: 'training' }
        ],
    },
    {
        id: 'locationDuty',
        name: 'Location Duty',
        nameMy: 'Lokasi (Negeri) Bertugas',
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
        nameMy: 'Tempoh Perkhidmatan',
        options: [
            { label: 'Below 10 Years', labelMy: 'Bawah 10 Tahun', value: '1', checked: false },
            { label: '11 - 15 Years', labelMy: '11 – 15 Tahun', value: '2', checked: false },
            { label: '16 - 20 Years', labelMy: '16 – 20 Tahun', value: '3', checked: false },
            { label: 'More than 21 Years', labelMy: '20 Tahun Ke Atas', value: '4', checked: false },
        ],
    },
    {
        id: 'accomodation',
        name: 'Accomodation',
        nameMy: 'Kemudahan Tempat Tinggal',
        options: [
            { label: 'Mess/Wisma', labelMy: 'Mes/Wisma', value: 'asd', checked: false },
            { label: 'Family Home', labelMy: 'Rumah Keluarga', value: 'ad', checked: false },
            { label: 'Rented House', labelMy: 'Rumah Sewa', value: 'add', checked: false },
            { label: 'Owned House', labelMy: 'Rumah Sendiri', value: 'dad', checked: false },
        ],
    },
]


export const content = {
    en: {
        welcome: 'Welcome',
        logout: 'logout',
        login: 'login',
        no_access: 'Sorry you do not have access',
        dashboard: 'Dashboard',
        current_surveys: 'Current Surveys',
        no_surveys: 'Nothing available',
        view_survey: 'View Survey',
        view_responses: 'View Responses',
        view_stats: 'View Stats',
        edit: 'Edit',
        new_survey: 'New Survey',
        delete: 'Delete',
        save: 'Save',
        new_category: 'New Category',
        add_category: 'Add Category',
        new_sub_category: 'New Sub Category',
        add_sub_category: 'Add Sub Category',
        new_question: 'New Question',
        add_question: 'Add Question',
        project_details: 'Project Details',
        agree: 'Agree',
        profile_information: 'Profile Information',
        complete: 'Complete',
        page_not_exist: 'Oops..This page does not exist',
        okay: 'Okay',
        about_study: 'About Study',
        confidentiality: 'CONFIDENTIALITY',
        consent: 'ELECTRONIC CONSENT',
        demographic: 'Demographic',
        export: 'Export',
        print: 'Print',
        input_information: 'Please input your information',
        value: 'Value'
    },
    bm: {
        welcome: 'Salamat',
        logout: 'logout',
        login: 'login',
        no_access: 'Sorry you do not have access',
        dashboard: 'Dashboard',
        current_surveys: 'Current Surveys',
        no_surveys: 'Nothing available',
        view_survey: 'View Survey',
        view_responses: 'View Responses',
        view_stats: 'View Stats',
        edit: 'Edit',
        new_survey: 'New Survey',
        delete: 'Delete',
        save: 'Save',
        new_category: 'New Category',
        add_category: 'Add Category',
        new_sub_category: 'New Sub Category',
        add_sub_category: 'Add Sub Category',
        new_question: 'New Question',
        add_question: 'Add Question',
        project_details: 'Project Details',
        agree: 'Agree',
        profile_information: 'Profile Information',
        complete: 'Complete',
        page_not_exist: 'Oops..This page does not exist',
        okay: 'Okay',
        about_study: 'About Study',
        confidentiality: 'CONFIDENTIALITY',
        consent: 'ELECTRONIC CONSENT',
        demographic: 'Demographic',
        export: 'Export',
        print: 'Print',
        input_information: 'Please input your information',
        value: 'Value'
    }
}
