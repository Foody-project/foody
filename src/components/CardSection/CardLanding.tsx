import { useRouter } from "next/navigation"

import { Button } from "../ui/button"
import { Check } from "@phosphor-icons/react"

interface CardLandingProps {
  type: string
  gradient?: string
  title: string
  color?: string
  textes: string[]
}

export default function CardLanding({ type, gradient, title, color, textes }: CardLandingProps) {
  const colorButtons = color ? color : "#8B5CF6"

  const router = useRouter()

  return (
    <div className="relative w-[40%] h-[600px] flex flex-col justify-center items-center rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.5)]">
      {/* Fond animé */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-60 animate-gradient`} />

      <div className="relative z-10 flex flex-col items-center text-center gap-6 px-10">
        <span className="text-white font-medium text-2xl">
          {title}
        </span>

        <div className="flex flex-row flex-wrap justify-center gap-4">
            {textes.map((item, index) => (
                <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-purple-200 font-light text-[0.75rem]"
                >
                <Check className="mr-2" color={colorButtons} /> {item}
                </Button>
            ))}
        </div>
        {type === 'User' ? (
            <Button variant="default" className='mt-5 font-normal cursor-pointer' onClick={() => {router.push('/register')}}>
                Register
            </Button>
        ) : <Button variant="outline" className='mt-5 text-white font-normal cursor-pointer'> Register as professional </Button> }
      </div>
    </div>
  )
}