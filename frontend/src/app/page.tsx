import LogCard from "@/components/LogCard";
import SearchCard from "@components/SearchCard";

export default function Search() {
  return (
    <div className="container">
        <div className="flex flex-col h-screen gap-12">
            <h1 className="header">Search</h1>
            <SearchCard />
            <LogCard />
        </div>
    </div>
  );
}
