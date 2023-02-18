import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChatStreamingApp } from "./ChatStreamingApp";
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChatStreamingApp />
  </React.StrictMode>,
)
