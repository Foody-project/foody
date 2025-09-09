import dataRestaurants from '../data/Restaurants.json'
import { Restaurant } from '@/interfaces'

export function getRestaurantData(): Restaurant[] {
  return dataRestaurants as Restaurant[]
}