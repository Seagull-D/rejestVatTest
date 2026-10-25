import { registers, type Doc, type RegisterType } from '../../data/demo'
import { inPeriod, type DemoMode, type Period } from './types'

export function fetchRegister(type: RegisterType, period: Period, mode: DemoMode): Promise<Doc[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mode === 'error') return reject(new Error('Network error'))
      if (mode === 'empty') return resolve([])
      resolve(registers[type].filter(d => inPeriod(d.date, period)))
    }, 700)
  })
}
