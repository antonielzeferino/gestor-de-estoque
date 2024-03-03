export default function getDate() {
  const newDate = new Date();

  const getWeekDay = (newDate) => {
    const weekDays = ["Dom" ,"Seg" ,"Ter" ,"Qua" ,"Qui", "Sex", "Sáb"]
    return weekDays[newDate.getDay()]
  }

  const getMonth = (newDate) => {
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    const month = months[newDate.getMonth()]
    return month
  }

  const weekDay = getWeekDay(newDate)
  const day = newDate.getDate()
  const month = getMonth(newDate)
  const year = newDate.getFullYear()
  return `${weekDay} ${month} ${day} ${year}`
}