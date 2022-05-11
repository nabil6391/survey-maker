import useSWR from 'swr'
import axios from 'axios'
import Cookies from 'js-cookie';

export async function getAuthSession(ctx) {



    const token = ctx.req.cookies.jwt;
    return token
}
