function getFormattedTime(totalCentiseconds) {
  let centiseconds = totalCentiseconds % 100
  let seconds = Math.floor(totalCentiseconds / 100) % 60
  let minutes = Math.floor(totalCentiseconds / 100 / 60) % 60
  let hours = Math.floor(totalCentiseconds / 100 / 60 / 60)

  centiseconds = formatNumber(centiseconds, 2, '0')
  seconds = formatNumber(seconds, 2, '0')
  minutes = formatNumber(minutes, 2, '0')

  return hours
    ? `${hours}:${minutes}:${seconds}.${centiseconds}`
    : `${minutes}:${seconds}.${centiseconds}`
}

function formatNumber(num, length, character) {
  return num.toString().padStart(length, character)
}

const ACTIONS = {
  Increment: 0,
  AddLap: 1,
  Reset: 2,
}

export { getFormattedTime, ACTIONS }
