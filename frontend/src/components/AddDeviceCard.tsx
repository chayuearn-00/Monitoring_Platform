import Image from 'next/image';
import AddWhite from '@icons/AddWhite.svg';
import DropDown from '@icons/DropDown.svg';

export default function AddDeviceCard() {
    return (
        <div className="log-card bg-white p-17.5 max-w-175 h-190 items-center place-content-between">
            <p className="text-heading font-bold">Your Device</p>
            <div className="flex flex-col w-full gap-8 place-content-between">
                <input type="text" placeholder="Hardware Name..." className="input" />
                <div className="flex place-content-between gap-8">
                    <div className="relative input flex items-center">
                        <input type="text" placeholder="Zone" readOnly={true}/>
                        <span>
                            <Image src={DropDown} alt='more deteil' className='absolute right-4 self-center'/>
                        </span>
                    </div>
                    <Input placeholder="Floor" />
                </div>
                <div className="flex place-content-between gap-8">
                    <Input placeholder="Building" />
                    <Input placeholder="Province" />
                    {/* <input type="text" placeholder="Building" className="input" readOnly={true}/> */}
                    {/* <input type="text" placeholder="Province" className="input" readOnly={true} /> */}
                </div>
                <Input placeholder="Country" />
                {/* <input type="text" placeholder="Country" className="input" readOnly={true}/> */}
            </div>
            <div className="flex gap-4">
                <button className="button font-bold border border-gray-300 hover:bg-gray-50">Cancle</button>
                <div className="flex button px-2 py-4 font-bold bg-blue-500 text-foreground gap-2.5 hover:bg-blue-600">
                    <Image src={AddWhite} alt="add device" />
                    <button>Add Device</button>
                </div>
            </div>
        </div>
    )
};

function Input({ placeholder }: { placeholder: string }) {
    return (
        <div className="relative input flex items-center">
            <input type="text" placeholder={placeholder} readOnly={true}/>
            <span>
                <Image src={DropDown} alt='more deteil' className='absolute right-4 self-center'/>
            </span>
        </div>
    )
};


