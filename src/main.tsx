import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { BrowserRouter } from 'react-router-dom'
import { StoreController } from './store';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <StoreController>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreController>
)
