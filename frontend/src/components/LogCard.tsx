export default function LogTable () {
    return (
        <div className="log-card w-full max-h-140 h-full overflow-y-auto">
            <table className="table-fixed w-full">
                <thead>
                    <tr className="font-bold text-2xl h-25 border-b border-gray-300">
                        <th className="">No.</th>
                        <th className="w-1/4">Name</th>
                        <th>Zone</th>
                        <th>Station</th>
                        <th>Location</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody className="log-box">
                    {devices.map((device) => (
                        <tr key={device.id} className="text-center content-center h-25 border-b border-gray-300 hover:bg-gray-50">
                            <td className="normal-text">{device.id}</td>
                            <td className="bond-text">{device.name}</td>
                            <td className="normal-text">{device.zone}</td>
                            <td className="normal-text">{device.station}</td>
                            <td className="normal-text">{device.location}</td>
                            <td className="normal-text">{device.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const devices = [
    { id: 1, name: "Pump", zone: "Workshop_A", station: "A", location: "Thailand", status: "Running" },
    { id: 2, name: "Motor", zone: "Workshop_B", station: "A", location: "Thailand", status: "Stopped" },
    { id: 3, name: "Fan", zone: "Workshop_C", station: "A", location: "Thailand", status: "Running" },
    { id: 4, name: "Fan", zone: "Workshop_C", station: "A", location: "Thailand", status: "Running" },
    { id: 5, name: "Fan", zone: "Workshop_C", station: "A", location: "Thailand", status: "Running" },
    { id: 6, name: "Fan", zone: "Workshop_C", station: "A", location: "Thailand", status: "Running" },
    { id: 7, name: "Fan", zone: "Workshop_C", station: "A", location: "Thailand", status: "Running" },
];