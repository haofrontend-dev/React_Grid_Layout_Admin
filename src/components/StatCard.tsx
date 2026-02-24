import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string;
    trend: string;
    trendUp: boolean;
    icon: LucideIcon;
    variant: 'emerald' | 'blue' | 'purple' | 'orange';
}

const styles = {
    emerald: {
        bg: 'bg-emerald-100 dark:bg-emerald-500/10',
        text: 'text-emerald-600 dark:text-emerald-400',
    },
    blue: {
        bg: 'bg-blue-100 dark:bg-blue-500/10',
        text: 'text-blue-600 dark:text-blue-400',
    },
    purple: {
        bg: 'bg-purple-100 dark:bg-purple-500/10',
        text: 'text-purple-600 dark:text-purple-400',
    },
    orange: {
        bg: 'bg-orange-100 dark:bg-orange-500/10',
        text: 'text-orange-600 dark:text-orange-400',
    },
};

const StatCard = ({ title, value, trend, trendUp, icon: Icon, variant }: StatCardProps) => {
    const style = styles[variant] || styles.blue;

    return (
        <div className="h-full flex flex-col justify-between p-2">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{value}</h3>
                </div>
                <div className={`p-2.5 rounded-xl ${style.bg} transition-colors`}>
                    <Icon className={`w-5 h-5 ${style.text}`} />
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
