import React from 'react'
import LapDataProvider from './providers/LapDataProvider'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'
import { TimeProvider } from './providers/TimeObsProvider'

function App() {
  return (
    <div className={'App'}>
      <div className={'outer-wrapper'}>
        <TimeProvider>
          <LapDataProvider>
            <Main />
            <Footer />
          </LapDataProvider>
        </TimeProvider>
      </div>
    </div>
  )
}

export default App
