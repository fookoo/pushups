import React, { useCallback, useEffect, useState } from 'react'
import { subDays } from 'date-fns'
import { ProgressBar } from '../progress-bar/progress-bar.component'
import { LastDaysChart } from '../last-days-chart/last-days-chart.component'
import { IDayHistory, PushupsService } from '../../services/pushups/pushups.service'
import { Statistics } from '../statistics/statistics.component'
import { ActionBar } from '../action-bar/action-bar.component'
import { AppLayoutStyled } from './app.style'

export const App: React.FC = () => {
  const [today, setToday] = useState(PushupsService.getTodayPushups())
  const [current, setCurrent] = useState(0)
  const [history, setHistory] = useState<IDayHistory[]>([])
  const [historyAll, setHistoryAll] = useState<IDayHistory[]>([])
  const [average, setAverage] = useState(0)
  const [averageAll, setAverageAll] = useState(0)
  const handleAdd = useCallback(() => {
    PushupsService.setTodayPushups(today + 10)

    setToday((prev) => prev + 10)
  }, [today])
  const handleSub = useCallback(() => {
    if (today - 10 <= 0) {
      return
    }
    PushupsService.setTodayPushups(today - 10)
    setToday((prev) => prev - 10)
  }, [today])

  useEffect(() => {
    setHistory(PushupsService.getHistory(subDays(new Date(), 7)))
    setHistoryAll(PushupsService.getAllHistory())
    setCurrent(PushupsService.getAllPushups())
  }, [today, screen.orientation.type])

  useEffect(() => {
    setAverage(PushupsService.getAverage(history))
    setAverageAll(PushupsService.getAverage(historyAll))
  }, [history, historyAll])

  return (
    <AppLayoutStyled>
      <ProgressBar current={current} goal={5000} />
      <LastDaysChart data={history} averageAll={averageAll} average={average} />
      <Statistics average={average} averageAll={averageAll} />

      <ActionBar current={today} onIncrease={handleAdd} onDecrease={handleSub} />
    </AppLayoutStyled>
  )
}
