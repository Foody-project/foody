'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import CardLanding from '@/components/CardSection/CardLanding';

export default function CardSectionLanding(){
    const router = useRouter()

    return (
        <div>
            <div className='flex flex-col items-center'>
                <span className='text-white text-3xl font-bold uppercase'>Don't want to miss anything in Paris ?</span>
                <Button variant="default" className='mt-5 cursor-pointer' onClick={() => {router.push('/register')}}>
                    Login
                </Button>
            </div>
            <div className='flex flex-row justify-around mt-[100px]'>
                <CardLanding type='User' gradient="from-purple-500 via-purple-300 to-blue-500" title='You want discover tips in Paris ?' color='#000000' textes={["You'll know all about the coolest places in Paris !", "Amazing offers !", "Discover others cultures"]}/>
                <CardLanding type='Professionnal' title='You want to work with us ?' textes={["You'll give your business a real boost with the community power !", "Unlimited new customers !", "Submit your own offers!"]}/>
            </div>
        </div>
    )
}