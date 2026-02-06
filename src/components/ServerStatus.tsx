import { Server, Cpu, HardDrive } from 'lucide-react';

const ServerStatus = () => {
    return (
        <div className="h-full flex flex-col justify-around">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                    <Server size={20} />
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">System Online</p>
                    <p className="text-xs text-slate-500">Uptime: 24d 12h</p>
                </div>
                <div className="ml-auto">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400"><Cpu size={12} /> CPU Usage</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">42%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: '42%' }}></div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400"><HardDrive size={12} /> Memory</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">68%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full transition-all duration-500" style={{ width: '68%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServerStatus;
