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
            // Glassmorphism Style
            className={`
                bg-slate-900/60 backdrop-blur-xl 
                rounded-2xl shadow-2xl 
                border border-white/5 
                flex flex-col overflow-hidden 
                transition-all duration-300 hover:shadow-indigo-500/10 hover:border-white/10
                ${className || ''}
            `}
            {...props}
        >
            <div className={`flex items-center justify-between px-5 py-4 border-b border-white/5 drag-handle cursor-move group ${title === 'Statistic' ? 'hidden' : ''}`}>
                <h3 className="font-semibold text-slate-200 text-sm truncate select-none flex items-center gap-2 tracking-wide">
                    {/* Add a subtle grab icon on hover later if needed */}
                    {title}
                </h3>
                {onRemove && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove();
                        }}
                        className="text-slate-400 hover:text-red-400 transition-colors bg-transparent p-1.5 rounded-lg hover:bg-white/5 opacity-0 group-hover:opacity-100"
                        aria-label="Remove widget"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
            <div className="flex-1 p-4 overflow-hidden relative text-slate-300">
                {children}
            </div>
        </div>
    );
});

Widget.displayName = 'Widget';

export default Widget;
