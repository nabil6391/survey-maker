
import Layout from '../components/Layout';
import { content, useLanguageContext } from "../context/LanguageContext"

export default function thanks(props) {
  const { language, setLanguage } = useLanguageContext()
  return (
    <Layout>
      <div className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <h1>{content[language]['thanks']} </h1>
      </div>
    </Layout>
  );
}