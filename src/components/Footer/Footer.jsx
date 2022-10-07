import React from 'react'
import globeIcon from '../../assets/globe.svg'
import alarmIcon from '../../assets/alarm.svg'
import stopwatchIcon from '../../assets/stopwatch.svg'
import timerIcon from '../../assets/timer.svg'
import './Footer.css'

function Footer() {
  return (
    <footer>
      <nav className={'icon-wrapper'}>
        <div className={'icon'}>
          <img src={globeIcon} alt={'globe icon'} />
          <p>World Clock</p>
        </div>
        <div className={'icon'}>
          <img src={alarmIcon} alt={'alarm clock icon'} />
          <p>Alarm</p>
        </div>
        <div className={'icon'}>
          <img src={stopwatchIcon} alt={'stopwatch icon'} />
          <p className={'stopwatch-text'}>Stopwatch</p>
        </div>
        <div className={'icon'}>
          <img src={timerIcon} alt={'timer icon'} />
          <p>Timer</p>
        </div>
      </nav>
      <div className={'bottom-wrapper'}>
        <div className={'bottom-line'}></div>
      </div>
    </footer>
  )
}

export default Footer
