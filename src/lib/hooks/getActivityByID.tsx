import dataActivities from '../data/Activity.json'
import { Activity } from '@/interfaces'

export function getActivityByID(id: number): Activity {
  const restaurant = dataActivities[id];
  return { id, ...restaurant } as Activity;
}