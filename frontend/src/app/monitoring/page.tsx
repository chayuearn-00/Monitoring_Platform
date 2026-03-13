export default function monitoring() {
    return (
        <div className="container">
            <div className="flex flex-col h-full w-full place-content-between">
                <div className="header">
                    Machine Monitoring
                </div>
                <DetailCard />
                <MonitorCard />
            </div>
        </div>
    );
} 

import DetailCard from '@/components/DetailCard';
import MonitorCard from '@/components/MonitorCard';