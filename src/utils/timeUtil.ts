export const getCurrentTimeDiff = (currentTime: Date) => {
  let diff = (Date.now() - currentTime.getTime()) / 1000 / 60 / 60
  if (diff > 24 * 30 * 12) {
    return `${Math.floor(diff / 24 / 30 / 12)} năm`
  } else if (diff > 30 * 24) {
    return `${Math.floor(diff / 24 / 30)} tháng`
  } else if (diff > 24) {
    return `${Math.floor(diff / 24)} ngày`
  } else {
    return `${Math.floor(diff)} giờ`
  }
}

export const convertMonthToYear = (month: number) => {
  if (month > 12) {
    return `${Math.floor(month / 12)} năm`
  } else {
    return `${month} tháng`
  }
}
