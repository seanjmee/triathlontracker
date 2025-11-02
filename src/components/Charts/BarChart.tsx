interface BarChartProps {
  data: {
    label: string;
    planned: number;
    completed: number;
    color: string;
  }[];
  height?: number;
  showValues?: boolean;
  unit?: string;
}

export default function BarChart({ data, height = 300, showValues = true, unit = '' }: BarChartProps) {
  const maxValue = Math.max(
    ...data.flatMap(item => [item.planned, item.completed]),
    1
  );

  const barWidth = 100 / (data.length * 2.5);

  return (
    <div className="w-full">
      <div className="flex items-end justify-around gap-4 px-4" style={{ height }}>
        {data.map((item, index) => {
          const plannedHeight = (item.planned / maxValue) * 100;
          const completedHeight = (item.completed / maxValue) * 100;

          return (
            <div key={index} className="flex flex-col items-center gap-2 flex-1">
              <div className="flex items-end justify-center gap-2 w-full h-full">
                <div className="flex flex-col items-center justify-end h-full flex-1">
                  {showValues && item.planned > 0 && (
                    <span className="text-xs font-semibold text-slate-600 mb-1">
                      {item.planned}{unit}
                    </span>
                  )}
                  <div
                    className="w-full rounded-t-lg bg-slate-300 transition-all duration-300 hover:opacity-80 relative group"
                    style={{ height: `${plannedHeight}%`, minHeight: item.planned > 0 ? '8px' : '0' }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      Planned: {item.planned}{unit}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-end h-full flex-1">
                  {showValues && item.completed > 0 && (
                    <span className="text-xs font-semibold text-white mb-1 mix-blend-difference">
                      {item.completed}{unit}
                    </span>
                  )}
                  <div
                    className="w-full rounded-t-lg transition-all duration-300 hover:opacity-80 relative group"
                    style={{
                      height: `${completedHeight}%`,
                      minHeight: item.completed > 0 ? '8px' : '0',
                      backgroundColor: item.color
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      Completed: {item.completed}{unit}
                    </div>
                  </div>
                </div>
              </div>

              <span className="text-sm font-semibold text-slate-700 capitalize mt-2">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-slate-300" />
          <span className="text-sm text-slate-600 font-medium">Planned</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-r from-emerald-500 to-emerald-600" />
          <span className="text-sm text-slate-600 font-medium">Completed</span>
        </div>
      </div>
    </div>
  );
}
