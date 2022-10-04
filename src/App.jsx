import ButtonDisplay from './components/timerControls'
import './App.css'

function App() {
  return (
    <div className={'App'}>
      <main className={'main-wrapper'}>
        {/* TODO: Split timer into component */}
        <div id={'timer'} className={'crontab'}>
          <time>00:00.00</time>
        </div>

        {/* <div>{subscribe}</div> */}

        <ButtonDisplay />

        {/* TODO: Divide lap table into components */}
        <section className={'lap-container'}>
          <table className={'lap-table'}>
            <tbody id={'lap-list'}></tbody>
          </table>
        </section>

        {/* TODO: Add footer */}
      </main>
    </div>
  )
}

export default App
