export default function DetailCard() {
    return (
        <div className="card items-center place-content-between">
            <div className="font-bold text-4xl">
                ID: 0000000
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="font-bold text-4xl">
                    Pump
                </div>
                <div className="font-normal text-2xl">
                    Workshop_A, Floor 1, Building 1, Bangkok, Thailand.
                </div>
            </div>
            <button className="button flex gap-3 border font-normal border-gray-300 hover:bg-gray-50">
                <Image src={Export} alt="ExportIcon" />
                Report
            </button>
        </div>
    )
}    

import Image from 'next/image';
import Export from '@icons/Export.svg';
