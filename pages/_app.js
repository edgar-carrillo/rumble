import '../styles/reset.css'
import '../styles/globals.css'

// Components
import DesktopPage from './DesktopPage';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <div className="sm:block hidden">
        <DesktopPage />
      </div>
      <div className="sm:hidden block">
        <Component {...pageProps}  />
      </div>
    </div>
  )
}

export default MyApp
