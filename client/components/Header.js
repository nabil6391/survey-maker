
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export default function Header(props) {
  const username = props.username;
  return (
    <header >
      <nav className="p-3 ">
        <Link href="/">
          <Image
            alt=""
            src="/logo.png"
            height={40}
            width={40}
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
