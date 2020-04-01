import React from 'react'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {VDPService} from './VDPService'
import '@vkontakte/vkui/dist/vkui.css'
import './main.css'
import { ReactComponent as NextBtn } from'./img/next.svg'
import { ReactComponent as PreviousBtn } from './img/previous.svg'
import { ReactComponent as CalendarIcon } from './img/calendar.svg'
import { ReactComponent as TimeIcon } from './img/time.svg'
import Slider from '@vkontakte/vkui/dist/components/Slider/Slider'

const VkDatetimePicker = ({ onSave }) => {
    let vdp = new VDPService()
    
    const [activeTab, setActiveTab]         = useState('calendar')
    const [chosenYear, setChosenYear]       = useState(vdp.currentYear())
    const [chosenMonth, setChosenMonth]     = useState(vdp.currentMonth(true))
    const [chosenDay, setChosenDay]         = useState(vdp.currentDay())
    const [chosenHours, setChosenHours]     = useState(0)
    const [chosenMinutes, setChosenMinutes] = useState(0)
    const [calendarMonth, setCalendarMonth] = useState(vdp.generateCalendarMonth(chosenYear, vdp.getMonthOrdinal(chosenMonth)))
    const [chosenDate, setChosenDate]       = useState(vdp.createFullDate(chosenDay, vdp.getMonthOrdinal(chosenMonth), chosenYear, chosenHours, chosenMinutes))

    useEffect(() => {
        setCalendarMonth(vdp.generateCalendarMonth(chosenYear, vdp.getMonthOrdinal(chosenMonth)))
        setChosenDate(vdp.createFullDate(chosenDay, vdp.getMonthOrdinal(chosenMonth), chosenYear, chosenHours, chosenMinutes))
    }, [chosenYear, chosenMonth, chosenDay])

    useEffect(() => {
        setChosenDate(vdp.createFullDate(chosenDay, vdp.getMonthOrdinal(chosenMonth), chosenYear, chosenHours, chosenMinutes))
    }, [chosenHours, chosenMinutes])

    const handleTabSwitch = (tabName) => {
        setActiveTab(tabName)
    }

    const handleDayChange = (day) => {
        if (day.className === 'prev-month') {
            setChosenMonth(vdp.getMonthOffset(chosenMonth, -1))
        } else if (day.className === 'next-month') {
            setChosenMonth(vdp.getMonthOffset(chosenMonth, 1))
        }
        setChosenDay(day.day)
    }

    const handleMonthChange = (direction) => {
        let month = vdp.getMonthOffset(chosenMonth, direction)
        setChosenMonth(month)
    }

    const handleYearChange = (direction) => {
        setChosenYear(chosenYear + direction)
    }

    const handleSave = () => {
        onSave()
    }

    return (
        <div id="vk-datetime-picker">
            <div className="vdp-wrapper">
                
                <div className="vdp-tabs-switcher">
                    <button onClick={() => handleTabSwitch('calendar')} className={"vdp-btn calendar" + ((activeTab === 'calendar') ? ' active' : '')}>
                        <div><CalendarIcon /></div>
                        <span>Дата</span>
                    </button>
                    <button onClick={() => handleTabSwitch('time')} className={"vdp-btn time" + ((activeTab === 'time') ? ' active' : '')}>
                        <div><TimeIcon /></div>
                        <span>Время</span>
                    </button>
                </div>

                <div className="vdp-tabs">
                    {
                        activeTab === 'calendar' ? 
                        <div className="calendar-tab">
                            <div id="year-switcher">
                                <button onClick={() => { handleYearChange(-1) }} className="vdp-btn previous"><PreviousBtn/></button>
                                <span>{chosenYear}</span>
                                <button onClick={() => { handleYearChange(1) }} className="vdp-btn next"><NextBtn/></button>
                            </div>
                            <div id="month-switcher">
                                <button onClick={() => { handleMonthChange(-1) }} className="vdp-btn previous"><PreviousBtn /></button>
                                <span>{chosenMonth}</span>
                                <button onClick={() => { handleMonthChange(1) }} className="vdp-btn next"><NextBtn /></button>
                            </div>
                            <table id="vdp-calendar">
                                <thead>
                                    <tr>
                                        <td>ПН</td><td>ВТ</td><td>СР</td><td>ЧТ</td><td>ПТ</td><td>СБ</td><td>ВС</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        calendarMonth &&
                                        calendarMonth.map((week, i) => {
                                            return(
                                                <tr key={i}>
                                                    {                                        
                                                        week.map((day) => 
                                                            <td 
                                                                key={day.className + day.day}
                                                                className={(day.day === chosenDay) && day.className === 'curr-month' ? day.className + ' selected-date' : day.className}
                                                                onClick={() => handleDayChange(day)}
                                                            >
                                                                {day.day}
                                                            </td>
                                                        )
                                                    }
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        : ''
                    }

                    {
                        activeTab === 'time' ? 
                        <div className="time-tab">
                            <div className="clock">
                                <div id="hours" className="clock-block">{chosenHours < 10 ? '0' + chosenHours : chosenHours}</div>
                                <div className="clock-separator">:</div>
                                <div id="minutes" className="clock-block">{chosenMinutes < 10 ? '0' + chosenMinutes : chosenMinutes}</div>
                            </div>
                            <div id="hours-slider" className="slider">
                                <label> Часы: </label>
                                <Slider defaultValue={0} onChange={hours => setChosenHours(hours)} max={23} min={0} step={1} />
                            </div>
                            <div id="minutes-slider" className="slider">
                                <label> Минуты: </label>
                                <Slider defaultValue={0} onChange={minutes => setChosenMinutes(minutes)} max={55} min={0} step={5} />
                            </div>
                        </div>
                        : ''
                    }

                </div>
                
                <button onClick={() => handleSave()} id="submit-date" className="vdp-btn">Добавить дату</button>

            </div>
        </div>
        
    )
}

VkDatetimePicker.propTypes = {
    onSave: PropTypes.func.isRequired
}

export default VkDatetimePicker