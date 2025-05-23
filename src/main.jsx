import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import './index.css'
import "./components/ui/carousel/carousel.css";
import "./components/ui/calendar/calendar.css";
import "./components/ui/carousel/photos/carouselPhotos.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./components/ui/categories/categories.css";


import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
