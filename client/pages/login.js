import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useAuth } from "../util/authProvider";
import axios from 'axios';

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { auth } = useAuth()
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = JSON.stringify({
      email,
      password,
    });
    const options = {
      headers: { "content-type": "application/json" }
    }

    const res = await axios
      .post(`http://localhost:3080/login`, payload, options)
      .then((response) => {
        if (response.status = 200) {
          // setUser(data.user)

          console.log(response.data)

          Cookies.set('jwt', response.data, {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000),
          });

          router.push('/new')
        }
      })
      .catch((err) => {
        console.log(err)
        setError(err.response.data.message)
        // setUser(null)
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-div">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-div">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="form-div">
          <button className="button" type="submit">
            Login
          </button>
        </div>
        <div>
          <p>Donts have an account?</p>
          <a href="/signup"> Signup </a>
        </div>
        <p style={{ color: 'red' }}>{error}</p>
      </form>
    </div>
  );
};

export default login;