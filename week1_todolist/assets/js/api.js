const weeksMap = {
  0: '星期日',
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六'
}

const addZero = function (num) {
  if(!parseInt(num)) return
  return parseInt(num) < 10 ? `0${parseInt(num)}` : parseInt(num)
}

const getWeek = function (ww) {
  if (weeksMap[ww]) return weeksMap[ww]
}

const getDayFormate = function (format) {
  const d = new Date()
  const yy = d.getFullYear()
  const mm = addZero(d.getMonth() + 1)
  const dd = addZero(d.getDate())
  if (format === 'dayFormat') {
    const wDay = getWeek(d.getDay())
    return `${yy}-${mm}-${dd} ${wDay}`
  } else if (format === 'today') {
    return `${yy}-${mm}-${dd}`
  }
  
}



export { getDayFormate }