import dataRestaurants from '../data/Restaurants.json'
import { Restaurant } from '@/interfaces'

export function getRestaurantByID(id: number): Restaurant {
  return dataRestaurants[id] as Restaurant
}