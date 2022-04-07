import '../styles/globals.css'
import { AuthProvider } from "../util/authProvider"
import { UseContextProvider } from "../context/StepperContext";

export const SERVER_URL = process.env.NODE_ENV === 'production' ? "https://produrl.com" : "http://localhost:3080"
// export const SERVER_URL = process.env.NODE_ENV === 'production' ? "https://produrl.com" : "http://node_backend:3080"

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider >
      <UseContextProvider>
        <Component {...pageProps} />
      </UseContextProvider>
    </AuthProvider>
  )
}

export default MyApp

