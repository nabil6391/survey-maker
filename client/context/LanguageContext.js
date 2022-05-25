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
            { label: 'Tentera Darat Malaysia', labelMy: 'Malaysian Army', value: 'MAF', checked: false },
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
            { label: 'Operations (Vessel)', labelMy: 'Operasi (Kapal)', value: 'Ops(vessel)', checked: false },
            { label: 'Support', labelMy: 'Bantuan', value: 'support', checked: false },
            { label: 'Training', labelMy: 'Latihan', value: 'training' }
        ],
    },
    {
        id: 'locationDuty',
        name: 'Location Duty',
        nameMy: 'Lokasi (Negeri) Bertugas',
        options: [
            { label: 'Alor Setar', labelMy: 'Alor Setar', value: 'aor', checked: false },
            { label: 'Butterworth', labelMy: 'Butterworth', value: 'bwh', checked: false },
            { label: 'Perak', labelMy: 'Perak', value: 'prk', checked: false },
            { label: 'Pahang', labelMy: 'Pahang', value: 'phg', checked: false },
            { label: 'Selangor', labelMy: 'Selangor', value: 'sgr', checked: false },
            { label: 'Kuala Lumpur', labelMy: 'Kuala Lumpur', value: 'kul', checked: false },
            { label: 'Labuan', labelMy: 'Labuan', value: 'lbn', checked: false },
            { label: 'Sabah', labelMy: 'Sabah', value: 'sbh', checked: false },
            { label: 'Sarawak', labelMy: 'Sarawak', value: 'swk', checked: false },
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
            { label: 'Mess/Wisma', labelMy: 'Mes/Wisma', value: 'mess', checked: false },
            { label: 'Family Home', labelMy: 'Rumah Keluarga', value: 'fam', checked: false },
            { label: 'Rented House', labelMy: 'Rumah Sewa', value: 'rented', checked: false },
            { label: 'Owned House', labelMy: 'Rumah Sendiri', value: 'owned', checked: false },
        ],
    },
]


export const content = {
    en: {
        welcome: 'WELCOME TO COMBAT CLIMATE READINESS SYSTEM (CCRES)',
        userrole: 'You are here as',
        choose_language: 'Choose your prefferred Language',
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
        about_study_desc: 'You are invited to participate in a web-app online survey on Measurement of Intangible Human Dimension of Soldiers Leading Towards Military Command Climate Readiness conducted by the National Defence University of Malaysia (NDUM). This is a research project being conducted to examine the intangible human dimensions of soldiers. For this purpose, we would appreciate it if you could respond to the following questionnaire relating to morale, quality of life, and psychological factors. It should take approximately 20-30 minutes to complete. The Ministry of Education (MOE) has funded this study under the Fundamental Research Grant Scheme(FRGS/1/ 2019/SS03/UPNM/02/2).',
        confidentiality: 'CONFIDENTIALITY',
        confidentiality_desc: '   We would like to assure you that your response would be treated as private and CONFIDENTIAL and would only be used for this academic study. We thank you very much for responding to our questionnaire despite your hectic workload.',
        consent: 'ELECTRONIC CONSENT: Please select your choice below. Clicking on the “Agree” button indicates that :',
        agree_read_info: 'You have read the above information.',
        agree_voluntary: 'You voluntarily agree to participate.',
        project_leader: 'Project Leader: ',
        name_researchers: 'Name of co-researchers',
        name_uni: 'National Defence University of Malaysia, Sg Besi Camp hasanalbanna@upnm.edu.my',
        research_field: 'Research Field: Social Science',
        research_duration: 'Duration : 1 September 2019 – 31 May 2022',
        demographic: 'Demographic',
        export: 'Export',
        print: 'Print',
        input_information: 'Please input your information',
        value: 'Value',
        thanks: 'Thank you for your cooperation',

    },
    bm: {
        welcome: 'Selamat Datang ke COMBAT CLIMATE READINESS SYSTEM (CCRES)',
        userrole: 'Anda berada di sini sebagai',
        choose_language: 'Pilih Bahasa pilihan anda',
        logout: 'Log keluar',
        login: 'Log masuk',
        no_access: 'Maaf, anda tidak mempunyai akses',
        dashboard: 'Papan pemuka',
        current_surveys: 'Tinjauan semasa',
        no_surveys: 'Tiada',
        view_survey: 'Lihat tinjauan',
        view_responses: 'Lihat respons',
        view_stats: 'Lihat statistik',
        edit: 'Edit',
        new_survey: 'Tinjaun baharu',
        delete: 'Padam',
        save: 'Simpan',
        new_category: 'Kategori baharu',
        add_category: 'Tambah kategori',
        new_sub_category: 'Sub kategori baharu',
        add_sub_category: 'Tambah sub kategori',
        new_question: 'Soalan baharu',
        add_question: 'Tambah soalan',
        project_details: 'Butiran projek',
        agree: 'Setuju',
        profile_information: 'Maklumat profil',
        complete: 'Lengkap',
        page_not_exist: 'Oops..Halaman ini tidak wujud',
        okay: 'Ok',
        about_study: 'Tentang penyelidikan',
        about_study_desc: 'You are invited to participate in a web-app online survey on Measurement of Intangible Human Dimension of Soldiers Leading Towards Military Command Climate Readiness conducted by the National Defence University of Malaysia (NDUM). This is a research project being conducted to examine the intangible human dimensions of soldiers. For this purpose, we would appreciate it if you could respond to the following questionnaire relating to morale, quality of life, and psychological factors. It should take approximately 20-30 minutes to complete. The Ministry of Education (MOE) has funded this study under the Fundamental Research Grant Scheme(FRGS/1/ 2019/SS03/UPNM/02/2).',
        confidentiality_desc: '   We would like to assure you that your response would be treated as private and CONFIDENTIAL and would only be used for this academic study. We thank you very much for responding to our questionnaire despite your hectic workload.',
        consent: 'ELECTRONIC CONSENT: Please select your choice below. Clicking on the “Agree” button indicates that :',
        agree_read_info: 'You have read the above information.',
        agree_voluntary: 'You voluntarily agree to participate.',
        project_leader: 'Project Leader: ',
        name_researchers: 'Name of co-researchers',
        name_uni: 'National Defence University of Malaysia, Sg Besi Camp hasanalbanna@upnm.edu.my',
        research_field: 'Bidang Penyelidikan: Sains Sosial',
        research_duration: 'Tempoh : 1 September 2019 – 31 Mei 2022',
        confidentiality: 'SULIT',
        consent: 'PERSETUJUAN ELEKTRONIK',
        demographic: 'Demografi',
        export: 'Eksport',
        print: 'Cetak',
        input_information: 'Sila masukkan maklumat anda',
        value: 'Value',
        thanks: 'Terima kasih atas kerjasama anda',
    }
}
