const weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
const monthNames = ['Декабрь', 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь']

export class VDPService {
    
    constructor(options) {
        if (options) {
            this.options = options
        }
    }

    options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }

    get currentDate() {
        return new Date().toLocaleTimeString('ru-ru', this.options);
    }

    currentDay() {
        return new Date().getDay()
    }

    currentMonth(stringify = false) {
        let month = new Date().getMonth() + 1
        return stringify ? monthNames[month] : ''
    }

    currentYear() {
        return new Date().getFullYear()
    }

    getMonth(stringify = false) {
        let month = new Date().getMonth() + 1
        month = stringify ? monthNames[month] : month

        return month
    }

    getWeekDay(year, month, day) {
        year  = year  ? year  : new Date().getFullYear()
        month = month ? month - 1 : new Date().getMonth() - 1
        day   = day   ? day   : new Date().getDay()

        let weekDay = new Date(year, month, day).getDay()

        return weekDays[weekDay]
    }

    /**
     * Get the number of days in a certain month
     * 
     * @param {number} year - number, e.g. 2020
     * @param {number} month - number from 1 to 12
     * @returns {number} - the number of days in provided month
     */
    daysInMonth(year, month) {
        if (month < 1 || month > 12) {
            return undefined
        }
        let date = new Date()
        let yearToCheck = year ? year : date.getFullYear()
        let monthToCheck = month ? month : date.getMonth()

        return new Date(yearToCheck, monthToCheck, 0).getDate()
    }

    monthName() {

    }

}