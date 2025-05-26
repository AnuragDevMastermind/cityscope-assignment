import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'leaflet/dist/leaflet.css'
import App from './App.tsx'
import { Toaster } from './components/shadcn/toaster.tsx'
import LinearProgressIndicator from './components/custom/LinearProgressIndicator.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <div className="h-screen relative">
        <div className="absolute h-screen w-full">
          <App />
        </div>
        <LinearProgressIndicator />
      </div>
      <Toaster />
    </Provider>
  </StrictMode>
)
