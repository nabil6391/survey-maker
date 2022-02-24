/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import React from 'react';
import Layout from '../components/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { getAuthSession } from '../util/withAuth';
import axios from 'axios';

const componentStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  h1 {
    color: #f7fcfc;
    font-weight: normal;
    margin: 10px 0px;
    text-align: center;
  }

  form {
    width: 80%;
    max-width: 500px;
    height: 220px;
    background-color: #f7fcfc;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
    padding-left: 20px;
    padding: 20px;
    margin-top: 20px;
    justify-content: space-evenly;
    border-style: solid;
    border-width: 3px;

    input {
      width: 100%;
    }

    button {
      width: 100%;
      color: #f7fcfc;
      font-size: 16px;
      font-weight: 550;
      border: none;
    }
    div {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      p {
        margin-top: 5px;
      }
      input {
        font-size: 13px;
        width: 150px;
        height: 20px;
      }
    }
  }
`;

export default function New(props) {
  const user = props.user;
  console.log('user data ')
  console.log(user)
  const [errorMessage, setErrorMessage] = useState('');

  const [title, setTitle] = useState('');

  const [slug, setSlug] = useState(title);
  const router = useRouter();

  return (
    //TODO input URL: make sure no spaces allowed
    <React.Fragment>
      <Layout username={user.username}>
        <div css={componentStyles}>
          <img src="logo.svg" alt="" height="120" />
          <h1>a quick survey for honest feedback</h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const response = await fetch('http://localhost:3080/api/v1/surveys', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  userId: user.id,
                  title: title,
                  title_my: title,
                  slug: slug,
                }),
              });
              console.log(response)
              if (response.status === 201) {
                router.push(`/${slug}/edit`);
              } else {
                if (response.status === 403) {
                  setErrorMessage('Slug not available!');
                } else setErrorMessage('That Failed!');
              }
            }}
          >
            <input
              onChange={(e) => {
                setTitle(e.currentTarget.value), setSlug(e.currentTarget.value.replace(/ /g, "-"));
              }}
              placeholder="My first Quicksy"
            ></input>
            <div>
              <p>www.survey.com/</p>
              <input
                placeholder={slug}
                onChange={(e) => {
                  setSlug(e.currentTarget.value);
                }}
              />
            </div>

            <button
            >
              CREATE SURVEY
            </button>
          </form>
        </div>
        {errorMessage}
      </Layout>
    </React.Fragment>
  );
}

export async function getServerSideProps(ctx) {
  const token = await getAuthSession(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  try {
    var res = await axios.get(`http://localhost:3080/user`, {
      headers: { Authorization: `Bearer ${token}` },
    }
    )
  } catch (e) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  if (res.status = 200) {
    var user = res.data
    console.log(user)
    return {
      props: { user },
    }
  }

  return {
    props: { token },
  }
}