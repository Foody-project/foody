import dataBars from '../data/Bars.json'
import { Bar } from '@/interfaces'

export function getBarByID(id: number): Bar {
  const restaurant = dataBars[id];
  return { id, ...restaurant } as Bar;
}