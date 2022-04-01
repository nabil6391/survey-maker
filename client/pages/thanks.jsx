
import Layout from '../components/Layout';

export default function thanks(props) {
  const loggedIn = props.loggedIn;

  return (
    <Layout>
      <div >
        <form
        >
          <h1>Thanks :) </h1>
          <img alt="" src="logo-black.svg" />
          <h3>Let's keep in touch.</h3>
          <h4>You can find me an my projects on</h4>
          <div>
            <button
              onClick={(e) => {
                window.open(
                  'https://www.linkedin.com/in/judith-kuneth',
                  '_blank',
                );
              }}
              style={{
                color: '#f7fcfc',
                backgroundColor: '#30CDCD',
                width: '120px',
                borderColor: '#30CDCD',
                fontSize: '16px',
                fontWeight: '500',
              }}
            >
              Linkedin
            </button>
            <button
              onClick={(e) => {
                window.open('https://www.github.com/judithkuneth', '_blank');
              }}
              style={{
                color: '#30CDCD',
                backgroundColor: '#f7fcfc',
                width: '120px',
                borderStyle: 'solid',
                borderColor: '#30CDCD',
                fontSize: '16px',
                fontWeight: '500',
              }}
            >
              Github
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const slug = context.query.slug;
  // const { session } = nextCookies(context);

  // /* console.log('check', await isTokenValid(session)); */

  // if (await isTokenValid(session)) {
  //   /* console.log('token valid'); */
  //   const { auth } = useAuth()

  //   const user = auth.user
  //   return {
  //     props: {
  //       user,
  //       loggedIn: true,
  //     },
  //   };
  // }


  return {
    props: {
      loggedIn: false,
    },
  };
}
