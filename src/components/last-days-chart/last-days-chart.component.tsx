import React from 'react'
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ComposedChart,
  ReferenceLine
} from 'recharts'
import { format } from 'date-fns'
import { AutoSize } from 'react-autosize-container'
import { IDayHistory } from '../../services/pushups/pushups.service'

interface ILastDaysChartProps {
  data?: IDayHistory[]
  average?: number
  averageAll?: number
}

export const LastDaysChart: React.VFC<ILastDaysChartProps> = ({ data, average, averageAll }) => {
  return (
    <AutoSize style={{ maxHeight: '50vh' }}>
      {({ height, width }) => (
        <ComposedChart
          layout="vertical"
          width={width}
          height={height}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 0
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <YAxis
            dataKey="date"
            type={'category'}
            scale="band"
            tickFormatter={(value) => format(value, 'dd/MM')}
          />
          <XAxis type="number" />
          <Bar
            dataKey="value"
            fill="#1976d2"
            barSize={30}
            label={{ position: 'center', fill: '#fff' }}
          />
          {average && <ReferenceLine x={average} stroke={'red'} strokeDasharray="3 3" />}
          {averageAll && <ReferenceLine x={averageAll} stroke={'green'} strokeDasharray="3 3" />}
        </ComposedChart>
      )}
    </AutoSize>
  )
}
