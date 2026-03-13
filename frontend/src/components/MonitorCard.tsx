export default function MonitorCard() {
    return (
        <div className="log-card max-h-140 h-full">
            <table className="w-full h-full">
                <thead>
                    <tr className="bond-text h-25 border-b border-gray-300">
                        <th>Start-time</th>
                        <th>End-time</th>
                        <th>Duration</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {Datas.map((data =>(
                        <tr key={data.id} className="text-center content-center border-b border-gray-300 hover:bg-gray-50">
                            <td className="normal-text">{data.start}</td>
                            <td className="normal-text">{data.end}</td>
                            <td className="normal-text">{data.Duration}</td>
                            <td className="normal-text">{data.Status}</td>
                        </tr>
                    )))}
                </tbody>
            </table>
        </div>
    )
}

const Datas = [
    {"id": 1, "start": '00:00', "end": '01:00', "Duration": '01:00', "Status": 'Running'},
    {"id": 2, "start": '00:00', "end": '01:00', "Duration": '01:00', "Status": 'Running'},
    {"id": 3, "start": '00:00', "end": '01:00', "Duration": '01:00', "Status": 'Running'},
    {"id": 4, "start": '00:00', "end": '01:00', "Duration": '01:00', "Status": 'Running'},
];