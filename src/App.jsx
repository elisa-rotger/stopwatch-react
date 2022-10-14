import React from 'react'
import LapDataProvider from './providers/LapDataProvider'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'
import TimeDataProvider from './providers/TimeProvider'

function App() {
  return (
    <div className={'App'}>
      <main className={'main-wrapper'}>
        <LapDataProvider>
          <TimeDataProvider>
            <Main />
            <Footer />
          </TimeDataProvider>
        </LapDataProvider>
      </main>
    </div>
  )
}

export default App
