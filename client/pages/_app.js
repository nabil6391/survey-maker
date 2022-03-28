import '../styles/globals.css'
import { AuthProvider } from "../util/authProvider"
import { UseContextProvider } from "../context/StepperContext";

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