"use client"

import { useMemo, useState } from 'react'

// Lightweight inline SVG line/area chart for retention rate over time.
// Expects data as decimals (e.g., 0.62 for 62%) or amounts.
// Optional labels array for X axis (e.g., month names).
export default function RetentionChart({
  data = [],
  labels = [],
  height = 160,
  stroke = '#2563eb',
  fill = 'rgba(37, 99, 235, 0.15)',
  seriesLabel = 'Monthly retention rate',
  formatValue = null, // Function to format values (e.g., for $ amounts)
  yTickValues = null // Custom Y-axis tick values (e.g., [0, 100, 500, 1000, 2000])
}) {
  if (!Array.isArray(data) || data.length === 0) {
    return <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-gray-400">No data</div>
  }

  const width = 600
  const h = height
  const max = Math.max(...data, 1)
  const min = Math.min(...data, 0)
  const padX = 24
  const padY = 24
  const innerW = width - padX * 2
  const innerH = h - padY * 2
  const stepX = innerW / (data.length - 1)

  const points = useMemo(() => data.map((v, i) => {
    const x = padX + i * stepX
    const y = padY + (1 - normalize(v, min, max)) * innerH
    return [x, y]
  }), [data, innerH, min, max, padX, stepX])

  const pathD = points.map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`)).join(' ')
  const areaD = `${pathD} L ${padX + innerW} ${padY + innerH} L ${padX} ${padY + innerH} Z`

  const yTicks = useMemo(() => {
    if (yTickValues) {
      // Use custom tick values
      return yTickValues.map(value => ({
        y: padY + (1 - normalize(value, min, max)) * innerH,
        label: formatValue ? formatValue(value) : `${value}`
      }))
    }
    // Default: 5 evenly spaced ticks
    return [0, 0.25, 0.5, 0.75, 1].map(t => {
      const value = min + (max - min) * t
      return {
        y: padY + (1 - t) * innerH,
        label: formatValue ? formatValue(value) : `${Math.round(100 * value)}%`
      }
    })
  }, [yTickValues, formatValue, min, max, padY, innerH])

  const xTicks = useMemo(() => {
    const out = []
    const tickEvery = Math.ceil(data.length / 6) // ~6 ticks max
    for (let i = 0; i < data.length; i += tickEvery) out.push(i)
    if (out[out.length - 1] !== data.length - 1) out.push(data.length - 1)
    return out
  }, [data.length])

  // Hover tooltip
  const [hover, setHover] = useState(null) // {i, x, y}
  function onMove(evt) {
    const rect = evt.currentTarget.getBoundingClientRect()
    const relX = (evt.clientX - rect.left) * (width / rect.width)
    const i = Math.max(0, Math.min(data.length - 1, Math.round((relX - padX) / stepX)))
    const [x, y] = points[i]
    setHover({ i, x, y })
  }
  function onLeave() { setHover(null) }

  return (
    <svg viewBox={`0 0 ${width} ${h}`} className="w-full h-full" role="img" aria-label={seriesLabel}
      onMouseMove={onMove} onMouseLeave={onLeave}
    >
      {/* Grid lines */}
      {yTicks.map((t, i) => (
        <line key={i} x1={padX} x2={padX + innerW} y1={t.y} y2={t.y} stroke="#e5e7eb" strokeWidth="1" />
      ))}
      {/* Y axis labels */}
      {yTicks.map((t, i) => (
        <text key={`yl-${i}`} x={padX - 8} y={t.y + 4} fontSize="10" fill="#6b7280" textAnchor="end">{t.label}</text>
      ))}
      {/* X axis ticks + labels */}
      {xTicks.map((idx, i) => (
        <g key={`x-${i}`}>
          <line x1={padX + idx * stepX} x2={padX + idx * stepX} y1={padY + innerH} y2={padY + innerH + 4} stroke="#9ca3af" />
          <text x={padX + idx * stepX} y={padY + innerH + 14} fontSize="10" fill="#6b7280" textAnchor="middle">
            {labels[idx] ?? `${idx + 1}`}
          </text>
        </g>
      ))}
      {/* Area fill */}
      <path d={areaD} fill={fill} stroke="none" />
      {/* Line */}
      <path d={pathD} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {/* Points */}
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill={stroke} />
      ))}

      {/* Legend */}
      <g>
        <circle cx={padX} cy={padY - 4} r="4" fill={stroke} />
        <text x={padX + 8} y={padY - 1} fontSize="11" fill="#374151">{seriesLabel}</text>
      </g>

      {/* Tooltip */}
      {hover && (
        <g>
          <line x1={hover.x} x2={hover.x} y1={padY} y2={padY + innerH} stroke="#9ca3af" strokeDasharray="4 4" />
          <circle cx={hover.x} cy={hover.y} r="4.5" fill="#fff" stroke={stroke} strokeWidth="2" />
          <Tooltip x={Math.min(hover.x + 8, padX + innerW - 100)} y={padY + 8}
                   title={labels[hover.i] ?? `Point ${hover.i + 1}`}
                   value={formatValue ? formatValue(data[hover.i]) : `${Math.round(data[hover.i] * 100)}%`} />
        </g>
      )}
    </svg>
  )
}

function normalize(v, min, max) {
  if (max === min) return 0
  return (v - min) / (max - min)
}

function Tooltip({ x, y, title, value }) {
  const w = 96, h = 40
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width={w} height={h} rx="6" ry="6" fill="#111827" opacity="0.9" />
      <text x={8} y={16} fontSize="11" fill="#d1d5db">{title}</text>
      <text x={8} y={30} fontSize="13" fill="#ffffff" fontWeight="600">{value}</text>
    </g>
  )
}
