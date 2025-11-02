interface PieChartProps {
  data: {
    label: string;
    value: number;
    color: string;
  }[];
  size?: number;
  showLegend?: boolean;
}

export default function PieChart({ data, size = 200, showLegend = true }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  if (total === 0) {
    return (
      <div className="flex items-center justify-center" style={{ width: size, height: size }}>
        <p className="text-sm text-slate-400">No data</p>
      </div>
    );
  }

  let currentAngle = -90;
  const segments = data.map(item => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;

    return {
      ...item,
      percentage,
      startAngle,
      endAngle: currentAngle,
    };
  });

  const createArcPath = (startAngle: number, endAngle: number, radius: number) => {
    const start = polarToCartesian(radius, radius, radius - 20, endAngle);
    const end = polarToCartesian(radius, radius, radius - 20, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      `M ${start.x} ${start.y}`,
      `A ${radius - 20} ${radius - 20} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
      `L ${radius} ${radius}`,
      'Z'
    ].join(' ');
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const radius = size / 2;

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={radius}
          cy={radius}
          r={radius - 20}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="40"
        />
        {segments.map((segment, index) => (
          <path
            key={index}
            d={createArcPath(segment.startAngle, segment.endAngle, radius)}
            fill={segment.color}
            stroke="white"
            strokeWidth="2"
          />
        ))}
        <circle
          cx={radius}
          cy={radius}
          r={radius - 60}
          fill="white"
        />
        <text
          x={radius}
          y={radius}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-2xl font-bold fill-slate-900"
        >
          {total}
        </text>
        <text
          x={radius}
          y={radius + 20}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xs fill-slate-500"
        >
          total
        </text>
      </svg>

      {showLegend && (
        <div className="flex flex-wrap gap-3 justify-center">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-sm text-slate-700 font-medium">
                {segment.label}: {segment.value} ({segment.percentage.toFixed(0)}%)
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
