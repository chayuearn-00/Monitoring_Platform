export default function Status({ machine_status }: {machine_status: string}) {
    const statusColors: Record<string, [string,string]> = {
        'Running': ['bg-success/30 border-2 border-success','text-success'],
        'Maintenance': ['bg-warning/30 border-2 border-warning','text-warning'],
        'Down': ['bg-down/30 border-2 border-down','text-down']
    };
    const color = statusColors[machine_status] || 'bg-success border border-success';
    return (
        <div className={`${color[0]} w-max h-max px-4 py-3 rounded-full`}>
            <p className={`${color[1]} font-semibold`}>{machine_status}</p>
        </div>
    )
}
