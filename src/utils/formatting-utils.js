function getFormattedTime(totalCentiseconds) {
  let totalSeconds = Math.floor(totalCentiseconds / 100) % 60
  let totalMinutes = Math.floor(totalCentiseconds / 100 / 60) % 60
  let restingCentiseconds = Math.floor(totalCentiseconds % 100)

  restingCentiseconds = formatNumber(restingCentiseconds, 2, '0')
  totalSeconds = formatNumber(totalSeconds, 2, '0')
  totalMinutes = formatNumber(totalMinutes, 2, '0')

  return `${totalMinutes}:${totalSeconds}.${restingCentiseconds}`
}

function formatNumber(num, length, character) {
  return num.toString().padStart(length, character)
}

export { getFormattedTime }
