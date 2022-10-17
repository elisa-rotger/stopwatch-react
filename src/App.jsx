import React from 'react'
import LapDataProvider from './providers/LapDataProvider'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'
import TimeDataProvider from './providers/TimeProvider'

function App() {
  return (
    <div className={'App'}>
      <div className={'outer-wrapper'}>
        <LapDataProvider>
          <TimeDataProvider>
            <Main />
            <Footer />
          </TimeDataProvider>
        </LapDataProvider>
      </div>
    </div>
  )
}

export default App
