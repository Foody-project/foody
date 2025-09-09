import dataBars from '../data/Bars.json'
import { Bar } from '@/interfaces'

export function getBarData(): Bar[] {
  return dataBars.map((bar, index) => ({
    id: index,
    ...bar
  })) as Bar[];
}