import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@styles/globals.css';

export const metadata={
    title: 'Promptpedia',
    description:'Meet The AI Prompts',
    icons: {
      icon: "/favicon.ico", // can also be .png or .svg
    },
}

const RootLayout = ({children}) => {
  return (
    <html>

        <body>
          <Provider>

         
            
        
        <div className='main'>
            <div className='gradient' />
        </div>

        <main className='app'>
            <Nav />
        {children}
        </main>
        </Provider>

        </body>
    </html>
  )
}

export default RootLayout