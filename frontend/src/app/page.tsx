import LogCard from "@/components/LogCard";
import SearchCard from "@components/SearchCard";
import SideBar from "@/components/SideBar";

export default function Search() {
  return (
    <div className="flex">
      <div className="py-19 flex h-screen overflow-hidden">
        <SideBar />
      </div>
      <div className="container">
        <div className="flex flex-col h-full place-content-between ">
            <h1 className="header">Search</h1>
            <SearchCard />
            <LogCard />
        </div>
      </div>
    </div>
  );
}
