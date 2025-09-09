import { getRestaurantByID } from '@/lib/hooks/getRestaurantByID';

interface HeaderProps {
    id: number
}

export default function Header({id}: HeaderProps){
    const restaurant = getRestaurantByID(id);

    return (
        <div className='text-white flex flex-col'>
            <span className="uppercase font-bold text-3xl">{restaurant.name}</span>
            <span className='text-gray-300'>{restaurant.adress}</span>
            
            <div className='flex flex-row'>
                <span className='pr-2'>{restaurant.drapeau}</span>
                <span>- 25€</span>
            </div>
        </div>
    )
}