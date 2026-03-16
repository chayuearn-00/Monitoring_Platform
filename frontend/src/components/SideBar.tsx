export default function SideBar() {
    return (
        <div className="flex flex-col w-25 ">
            <div className='w-16 aspect-square flex self-center justify-center bg-foreground rounded-full'>
                <Image src={ArrowBack} alt="go back"  />
            </div>
            <div className="flex flex-col h-screen justify-center self-center gap-8 ">
                {/* <Image src={CircleBG} alt="iconBG" /> */}
                <div className='icon bg-blue-500 rounded-full'>
                    <Image src={Home} alt="go to home" />
                </div>
                {/* <Image src={CircleBG} alt="iconBG" /> */}
                <div className='icon bg-foreground rounded-full'>
                    <Image src={LightMode} alt="light mode" />
                </div>
                    {/* <Image src={CircleBG} alt="iconBG" /> */}
                <div className='icon bg-foreground rounded-full'>
                    <Image src={Setting} alt="setting" />
                </div>
            </div>
        </div>
    )
}

import Image from 'next/image';
// import CircleBG from '@icons/CircleBG.svg';
import ArrowBack from '@icons/ArrowBack.svg';
import Home from '@icons/Home.svg';
import LightMode from '@icons/LightMode.svg';
import Setting from '@icons/Setting.svg';