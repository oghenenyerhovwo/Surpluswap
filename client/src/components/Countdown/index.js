import React, { useState, useEffect } from 'react'
import moment from "moment"

import styles from "./countdown.module.css"

const Countdown = props => {

    const { timeTillDate, timeFormat } = props

    const [time, setTime] = useState({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    const [display, setDisplay] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            const then = moment( timeTillDate, timeFormat )
            const now = moment()
            then.isAfter(now) ? setDisplay(true) : setDisplay(false)
            const countdown = moment.duration(then.diff(now))
            setTime(prevTime => {
                return {
                    ...prevTime,
                    years: countdown.years(),
                    months: countdown.months(),
                    days: countdown.days(),
                    hours: countdown.hours(),
                    minutes: countdown.minutes(),
                    seconds: countdown.seconds(),
                }
            })
        }, 1000)
      return () => {
        if(interval){
            clearInterval(interval)
        }
      };
    }, [timeTillDate, timeFormat])

    const checkForPlural = (num, str) => {
        return num < 2 ? str : `${str}s`
    }

    const checkForSingleNumber = (num) => {
        return String(num).length > 1 ? num : `0${num}`
    }

    return (
        <div className={styles.countdown}>
            {
                display && (
                    <>
                        {
                            time.years > 0 &&
                            (
                                <div className={styles.countdown_item}>
                                    <h1>{checkForSingleNumber(time.years)}</h1> <p>{checkForPlural(time.years, "year")}</p>
                                </div>
                            )
                        }
                        {
                            (time.years > 0 || time.months > 0) &&
                            (
                                <div className={styles.countdown_item}>
                                    <h1>{checkForSingleNumber(time.months)}</h1> <p>{checkForPlural(time.months, "month")}</p>
                                </div>
                            )
                        }
                        
                        <div className={styles.countdown_item}>
                            <h1>{checkForSingleNumber(time.days)}</h1> <p>{checkForPlural(time.days, "day")}</p>
                        </div>
                        <div className={styles.countdown_item}>
                            <h1>{checkForSingleNumber(time.hours)}</h1> <p>{checkForPlural(time.hours, "hour")}</p>
                        </div>
                        <div className={styles.countdown_item}>
                            <h1>{checkForSingleNumber(time.minutes)}</h1> <p>{checkForPlural(time.minutes, "minute")}</p>
                        </div>
                        <div className={styles.countdown_item}>
                            <h1>{checkForSingleNumber(time.seconds)}</h1> <p>{checkForPlural(time.seconds, "second")}</p>
                        </div>
                    </>
                )
            }
            
        </div>
    )
}

export default Countdown