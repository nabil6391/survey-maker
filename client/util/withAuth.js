import useSWR from 'swr'
import axios from 'axios'
import Cookies from 'js-cookie';
// const fetcher = url => axios.get(url).then(res => res.data)

// export default (GetServerSidePropsFunction) => async (ctx) => {
//   // 1. Check if there is a token.
//   const token = ctx.req.cookies?.jwt || null;

//   // 2. Perform an authorized HTTP GET request to the private API to get user data.
//   const { data } = await getAuth(`${process.env.PRIVATE_API_URL}/api/v1/users/me`, token);
//   const { data, error } = useSWR('/api/user', fetcher)

//   // 3. If there is no user, or the user is not an admin, then redirect to unauthorized.
//   if (!data) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   // 4. Return via closure: 'GetServerSidePropsFunction'.
//   return await GetServerSidePropsFunction(ctx);
// };

export async function getAuthSession(ctx) {
    const token = ctx.req.cookies.jwt;
    return token
}
