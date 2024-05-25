import { Suspense, useState } from 'react'
import './App.css'
import 'rsuite/dist/rsuite-no-reset.min.css';
import { LoadingContext } from './objects/loading_context'
import { CustomProvider } from 'rsuite'
import idID from "@/objects/id_ID";
import { AppRoute } from './routes/AppRoute';


function App() {
  const [loading, setLoading] = useState<boolean>(false)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoadingContext.Provider value={{ isLoading: loading, setIsLoading: setLoading }}>
        <CustomProvider locale={idID}>
         
            <AppRoute />
        </CustomProvider>
      </LoadingContext.Provider>
    </Suspense>
  )
}

export default App
