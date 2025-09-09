import dataActivitiesJson from '../data/Activity.json'
import { Activity } from '@/interfaces'

export function getActivityData(): Activity[] {
  return dataActivitiesJson.map((activity, index) => ({
    id: index,
    ...activity
  }));
}