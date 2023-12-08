// import { ThemeProvider, createTheme, experimental_sx as sx, } from '@mui/material';
import Header from '@/components/layout/Header'
import './globals.css'
import { Providers } from './GlobalRedux/provider'


export const metadata = {
  title: 'آرپوت سرام',
  description: ' فروشگاه سرامیک و کاشی' ,
}

// const customTheme = createTheme({
//   components: {
//     MuiTextField: {
//       styleOverrides: {
//         root: sx({
//           "& .MuiOutlinedInput-root": {
//             "& > fieldset": {
//               borderColor: "orange",
//             },
//           },
//         }),
//       },
//     },
//   },
// });

export default function RootLayout({ children }) {
  return (
    <html lang="fa" >
      <body>
        <Providers>
          <Header/>
            {children}
        </Providers>
      </body>
    </html>
  )
}
