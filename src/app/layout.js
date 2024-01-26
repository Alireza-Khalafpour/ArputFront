// import { ThemeProvider, createTheme, experimental_sx as sx, } from '@mui/material';
import Header from '@/components/layout/Header'
import './globals.css'
import { Providers } from './GlobalRedux/provider'
import Footer from '@/components/layout/Footer'
import NavigationBarMobile from '@/components/layout/NavigationBarMobile'


export const metadata = {
  title: 'آرپوت مارکت',
  description: ' فروشگاه سرامیک و کاشی' ,
  other: {
    enamad: '161104',
  },
}




export default function RootLayout({ children }) {
  return (
    <html lang="fa" >
      <body >
        <Providers>
          <Header/>
            {children}
          <Footer/>
          <NavigationBarMobile/>
        </Providers>
      </body>
    </html>
  )
}
