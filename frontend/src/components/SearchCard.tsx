import DropDown from "@icons/DropDown.svg";
import Search from "@icons/Search.svg";
import Add from "@icons/Add.svg";
import Image from "next/image";
import { useState } from "react";


export default function SearchCard() {
    const [zone,setZone] = useState("Zone");

    return (
        <div className="card">
            <div className="flex w-full gap-10">
                <input 
                    className="search-box w-[300px]" 
                    placeholder="Hardware ID.." 
                />
                <div className="search-box w-[250px]">
                    Floor
                    <Image src={DropDown} alt="Dropdown icon" width={16} height={16} />
                </div>
            </div>
            <div className="flex w-full place-content-between">
                <div className="flex gap-10 items-center">
                    <div className="search-box  w-[250px]">
                        Zone
                        <Image src={DropDown} alt="Dropdown icon" width={16} height={16} />
                    </div>
                    <div className="search-box  w-[250px]">
                        Building
                        <Image src={DropDown} alt="Dropdown icon" width={16} height={16} />
                    </div>
                    <div className="search-box  w-[250px]">
                        Location
                        <Image src={DropDown} alt="Dropdown icon" width={16} height={16} />
                    </div>
                    <button className="button flex gap-2 bg-blue-500 font-bold items-center text-foreground hover:bg-blue-500/90">
                        <Image src={Search} alt="Search icon" width={30} height={30}/>
                        search
                    </button>
                </div>
                <button className="button flex gap-3 border font-normal border-gray-300 hover:bg-gray-50">
                    <Image src={Add} alt="New button" />
                    Add Device
                </button>
            </div>
        </div>
    )
}