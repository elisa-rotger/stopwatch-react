import React from 'react'
import LapDataProvider from './providers/LapDataProvider'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'

function App() {
  return (
    <div className={'App'}>
      <div className={'outer-wrapper'}>
        <LapDataProvider>
          <Header />
          <Main />
          <Footer />
        </LapDataProvider>
      </div>
    </div>
  )
}

export default App
