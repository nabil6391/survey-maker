
import Layout from '../components/Layout';

export default function thanks(props) {
  const loggedIn = props.loggedIn;

  return (
    <Layout>
      <div className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <h1>Thank you for submitting </h1>
        <h3>Let's keep in touch.</h3>
        <h4>You can contact us at asf@gmail.com</h4>
      </div>
    </Layout>
  );
}