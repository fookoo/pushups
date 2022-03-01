import { format, subDays } from 'date-fns'
import { StorageService } from '../storage/storage.service'

export interface IDayHistory {
  date: Date
  value: number
}

export class PushupsService {
  public static getTodayPushups(): number {
    const key = `pushups.day.${format(new Date(), 'MM/dd/yyyy')}`
    const val = parseInt(StorageService.getValue(key, '0'))

    return isNaN(val) ? 0 : val
  }

  public static setTodayPushups(quantity: number): void {
    const key = `pushups.day.${format(new Date(), 'MM/dd/yyyy')}`
    console.log(key, quantity)
    StorageService.setValue(key, quantity.toString())
  }

  public static getAllPushups(): number {
    const allValues = StorageService.getAllValues('pushups.day.')

    return allValues.reduce((prev, curr) => prev + parseInt(curr[1]), 0)
  }

  public static getAllHistory(): IDayHistory[] {
    const allValues = StorageService.getAllValues('pushups.day.')

    return allValues
      .map(PushupsService.parseToTimestampArray)
      .map(PushupsService.parseToDayHistory)
      .sort(PushupsService.sort)
  }

  public static getHistory(from: Date, to: Date = new Date()): IDayHistory[] {
    const fromTS = from.getTime()
    const toTS = to.getTime()
    const days = (toTS - fromTS) / (24 * 60 * 60 * 1000)
    const allValues = StorageService.getAllValues('pushups.day.')

    const output = allValues
      .map(PushupsService.parseToTimestampArray)
      .filter((item) => item[0] >= fromTS && item[0] <= toTS)
      .map(PushupsService.parseToDayHistory)
      .sort(PushupsService.sort)

    if (output.length < days) {
      const tmp = new Array(days).fill({})

      return tmp
        .map((vale, index) => {
          const dateObj = subDays(new Date(), days - (index + 1))
          const dateStr = format(dateObj, 'MM/dd/yyyy')
          const existingValue = output.find(({ date }) => format(date, 'MM/dd/yyyy') === dateStr)
          console.log(dateStr, existingValue)

          return {
            date: dateObj,
            value: existingValue ? existingValue.value : 0
          }
        })
        .sort(PushupsService.sort)
    }

    return output
  }

  public static getAverage(subject: IDayHistory[]): number {
    const sum = subject.reduce((prev, curr) => prev + curr.value, 0)

    return sum / subject.length
  }

  private static parseToTimestampArray([key, value]: [string, string]): [number, string] {
    const date = new Date(key.split('.').reverse()[0])

    return [date.getTime(), value]
  }

  private static parseToDayHistory([key, value]: [number, string]): IDayHistory {
    return {
      date: new Date(key),
      value: parseInt(value as string)
    }
  }

  private static sort(a: IDayHistory, b: IDayHistory): number {
    return a.date.getTime() - b.date.getTime()
  }
}
