/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import Layout from '../components/Layout.js';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import Cookies from "js-cookie";
import { useAuth } from "../util/authProvider";
import axios from 'axios';

const formStyles = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    margin: 50px;
    max-width: 500px;
    align-content: center;

    h1 {
      color: #d5d4d4;
      margin-bottom: 10px;
    }
    div {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      p {
        color: #f7fcfc;
        font-weight: 500;
        margin-right: 5px;
      }

      a {
        font-weight: 600;
        color: #14a9a9;
      }
    }

    input {
      border-radius: 10px;
      padding-left: 5px;
      margin: 5px 0px;
      // width: 100%;
      // height: 20px;
      font-size: 18px;
      width: 100%;
    }
    button {
      width: none;
      color: #f7fcfc;
      border-color: #f7fcfc;
      font-size: 16px;
      font-weight: 550;
      border: none;
      padding: 0px 0px 0px 5px;
      margin-top: 5px;
    }
  }
`;

export default function Signup() {
  // console.log('log redirectDestination', props.redirectDestination);
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <Layout>
      <div css={formStyles}>
        <form
          onSubmit={async (e) => {
            // if (props.redirectDestination !== '/') {
            //   console.log('props.redirectDest !=== /');

            e.preventDefault();


            const payload = JSON.stringify({
              email,
              password,
            });
            const options = {
              headers: { "content-type": "application/json" }
            }

            const res = await axios.post(`http://localhost:3080/register`, payload, options)
              .then((response) => {
                if (response.status == 200) {
                  // setUser(data.user)
                  router.push(`/login`);
                }
              })
              .catch((err) => {
                console.log(err)
                setErrorMessage(err.response.data.message)
                // setUser(null)
                // if (response.status === 403) {
                // setErrorMessage('User already exists!');
                // } else setErrorMessage('That Failed!');
              });

            // const response = await fetch('/api/signup', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({
            //     email: email,
            //     password: password,
            //   }),
            // });
            // const { success } = await response.json();
            // if (success) {
            //   // console.log('success');

            //   router.push(`/login`);
            // } else {
            //   if (response.status === 403) {
            //     setErrorMessage('User already exists!');
            //   } else setErrorMessage('That Failed!');
            // }
          }}
        >
          <h1>Signup</h1>

          <input
            placeholder="email"
            value={email}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          ></input>

          <button>SIGNUP</button>

          <br />
          <div>
            <p>Already have an account?</p>
            <a href="/login"> Login </a>
          </div>
          <p style={{ color: 'red' }}>{errorMessage}</p>
        </form>
      </div>
    </Layout >
  );
}