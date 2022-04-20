import '../styles/globals.css'
import { AuthProvider } from "../util/authProvider"
import { UseContextProvider } from "../context/StepperContext";
import { UseLanguageProvider } from "../context/LanguageContext";

export const SERVER_URL = process.env.NODE_ENV === 'production' ? "https://produrl.com" : "http://localhost:3080"
// export const SERVER_URL = process.env.NODE_ENV === 'production' ? "https://produrl.com" : "http://node_backend:3080"

Number.prototype.round = function (places) {
  return +(Math.round(this + "e+" + places) + "e-" + places);
}

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider >
      <UseContextProvider>
        <UseLanguageProvider>
          <Component {...pageProps} />
        </UseLanguageProvider>
      </UseContextProvider>
    </AuthProvider>
  )
}

export default MyApp

