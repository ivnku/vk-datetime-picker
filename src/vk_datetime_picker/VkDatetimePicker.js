import React from 'react'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {VDPService} from './VDPService'
import './main.css'
import { ReactComponent as NextBtn } from'./img/next.svg'
import { ReactComponent as PreviousBtn } from './img/previous.svg'
import { ReactComponent as CalendarBtn } from './img/calendar.svg'
import { ReactComponent as TimeBtn } from './img/time.svg'

const VkDatetimePicker = props => {
    let vdp = new VDPService()
    let currentDate = vdp.currentDate
    const [chosenDate, setChosenDate] = useState(currentDate)

    return (
        <div id="vk-datetime-picker">
            <div className="vdp-wrapper">
                
                <div className="vdp-tabs-switcher">
                    <button className="vdp-btn calendar active">
                        <div><CalendarBtn /></div>
                        <span>Дата</span>                    
                    </button>
                    <button className="vdp-btn time">                        
                        <div><TimeBtn /></div>
                        <span>Время</span>
                    </button>
                </div>

                <div className="vdp-tabs">
                    <div className="calendar-tab active">
                        <div id="year-switcher">
                            <button className="vdp-btn previous"><PreviousBtn/></button>
                            <span>2020</span>
                            <button className="vdp-btn next"><NextBtn/></button>
                        </div>
                        <div id="month-switcher">
                            <button className="vdp-btn previous"><PreviousBtn /></button>
                            <span>Март</span>
                            <button className="vdp-btn next"><NextBtn /></button>
                        </div>
                        <table id="vdp-calendar">
                            <thead>
                                <tr>
                                    <td>ПН</td><td>ВТ</td><td>СР</td><td>ЧТ</td><td>ПТ</td><td>СБ</td><td>ВС</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>24</td><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td><td>1</td>
                                </tr>
                                <tr>
                                    <td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td>
                                </tr>
                                <tr>
                                    <td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td>
                                </tr>
                                <tr>
                                    <td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td><td>22</td>
                                </tr>
                                <tr>
                                    <td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td>
                                </tr>
                                <tr>
                                    <td>30</td><td>31</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="time-tab">
                        sidfj
                    </div>
                </div>
                <button id="submit-date" className="vdp-btn">Добавить дату</button>

                <br /><br />Current Date is {chosenDate} <br />
                Days in month {vdp.getWeekDay(2020, 3, 29)}
            </div>
        </div>
    )
}

VkDatetimePicker.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
}

export default VkDatetimePicker