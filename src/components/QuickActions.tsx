import { Plus, Download, Mail, Settings } from 'lucide-react';

const QuickActions = () => {
    return (
        <div className="h-full grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                <Plus className="w-6 h-6 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">New Post</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                <Download className="w-6 h-6 text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Export</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                <Mail className="w-6 h-6 text-purple-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Invite</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                <Settings className="w-6 h-6 text-slate-400 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Settings</span>
            </button>
        </div>
    );
};

export default QuickActions;
