
import Link from 'next/link';
import React from 'react';

export default function Header(props) {
  const username = props.username;
  return (
    <header >
      <nav className="p-3 ">
        <Link href="/">
          <img
            alt=""
            src="../logo-white.svg"
            height="40"
          />
        </Link>

        {username ? (
          <Link href={`/`} >
            <a className="text-white">Dashboard</a>
          </Link>
        ) : (
          <div></div>
        )}

        {username === undefined ? (
          <Link href="/login">
            <a>Login</a>
          </Link>
        ) : (

          <Link href="/logout">
            <a>logout</a>
          </Link>
          // </div>
        )}
      </nav>
    </header>
  );
}
