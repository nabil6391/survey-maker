import '../styles/globals.css'
import { AuthProvider } from "../util/authProvider"

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider >
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp