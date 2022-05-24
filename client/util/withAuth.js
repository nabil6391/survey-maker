import useSWR from 'swr'
import axios from 'axios'
import Cookies from 'js-cookie';

import { useRouter } from 'next/router';

export async function getAuthSession(ctx) {
    const token = ctx.req.cookies.jwt;
    return token
}

export function checkLanguage(ctx) {
    const router = useRouter();
    if (typeof window !== 'undefined') {
        if (!localStorage.getItem('language')) {
            router.push(`/welcome?redirect=${router.asPath}`);
        }
    }
}
