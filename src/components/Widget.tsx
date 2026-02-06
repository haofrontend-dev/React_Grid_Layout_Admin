import React, { type ReactNode } from 'react';
// clsx is not installed, I should stick to template literals or install clsx. 
// Actually lodash is installed, but clsx is better. Or just simple string concat.
// I'll stick to simple strings or install clsx if complex. For now simple.

interface WidgetProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    title?: string;
    onRemove?: () => void;
    className?: string;
    // Props passed by React Grid Layout
    style?: React.CSSProperties;
    onMouseDown?: React.MouseEventHandler;
    onMouseUp?: React.MouseEventHandler;
    onTouchEnd?: React.TouchEventHandler;
}

// React Grid Layout passes style, onMouseDown, etc. to the child.
// We need to forward ref as well for optimal performance, though RGL works without it (with ReactDOM.findDOMNode fallback),
// forwardRef is recommended.

const Widget = React.forwardRef<HTMLDivElement, WidgetProps>(({
    children,
    title,
    onRemove,
    className,
    style,
    onMouseDown,
    onMouseUp,
    onTouchEnd,
    ...props
}, ref) => {
    return (
        <div
            ref={ref}
            style={style}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onTouchEnd={onTouchEnd}
            className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden transition-shadow hover:shadow-md ${className || ''}`}
            {...props}
        >
            <div className={`flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700/50 drag-handle cursor-move group ${title === 'Statistic' ? 'hidden' : ''}`}>
                <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-sm truncate select-none flex items-center gap-2">
                    {/* Add a subtle grab icon on hover later if needed */}
                    {title}
                </h3>
                {onRemove && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove();
                        }}
                        className="text-slate-300 hover:text-red-500 transition-colors bg-transparent p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 opacity-0 group-hover:opacity-100"
                        aria-label="Remove widget"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
            <div className="flex-1 p-4 overflow-auto relative">
                {children}
            </div>
        </div>
    );
});

Widget.displayName = 'Widget';

export default Widget;
