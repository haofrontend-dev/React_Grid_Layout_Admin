import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string;
    trend: string;
    trendUp: boolean;
    icon: LucideIcon;
    color: string;
}

const StatCard = ({ title, value, trend, trendUp, icon: Icon, color }: StatCardProps) => {
    return (
        <div className="h-full flex flex-col justify-between p-2">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{value}</h3>
                </div>
                <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
                    <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
                </div>
            </div>
            <div className="flex items-center mt-4">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${trendUp ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'}`}>
                    {trend}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">from last month</span>
            </div>
        </div>
    );
};

export default StatCard;
