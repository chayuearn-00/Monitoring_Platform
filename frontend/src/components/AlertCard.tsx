import Image from "next/image"
import Success from '@icons/Success.svg'

export default function AlertCard() {
    return (
        <div className="w-max flex bg-foreground border-2 border-success shadow-xl gap-10 px-10 py-13 rounded-2xl">
            <Image src={Success} alt="success icon"/>
            <p className="text-success text-3xl font-bold">Add Device Success</p>
        </div>
    )
}