import { User, ShoppingCart, Mail, Star } from 'lucide-react';

const activities = [
    { id: 1, user: 'Alice Smith', action: 'subscribed to Plan Pro', time: '2 min ago', icon: Star, color: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30' },
    { id: 2, user: 'Bob Jones', action: 'placed a new order', time: '15 min ago', icon: ShoppingCart, color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30' },
    { id: 3, user: 'Charlie Day', action: 'sent a message', time: '1 hour ago', icon: Mail, color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30' },
    { id: 4, user: 'Diana Prince', action: 'created a new account', time: '3 hours ago', icon: User, color: 'text-green-500 bg-green-100 dark:bg-green-900/30' },
    { id: 5, user: 'Evan Wright', action: 'placed a new order', time: '5 hours ago', icon: ShoppingCart, color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30' },
];

const ActivityFeed = () => {
    return (
        <div className="h-full flex flex-col">
            <div className="mb-4">
                <h4 className="text-lg font-bold text-slate-800 dark:text-white">Recent Activity</h4>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <ul className="space-y-4">
                    {activities.map((activity) => (
                        <li key={activity.id} className="flex items-start gap-3">
                            <div className={`p-2 rounded-full flex-shrink-0 ${activity.color}`}>
                                <activity.icon size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                                    {activity.user}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                    {activity.action}
                                </p>
                            </div>
                            <div className="text-xs text-slate-400 whitespace-nowrap">
                                {activity.time}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ActivityFeed;
