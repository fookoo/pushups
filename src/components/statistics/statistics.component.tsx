import React from 'react'
import { Box } from '@mui/material'

interface ISStatisticsProps {
  average: number
  averageAll: number
}

export const Statistics: React.VFC<ISStatisticsProps> = ({ average, averageAll }) => {
  return (
    <Box>
      <Box>Last 5 day avg: {average.toFixed(2)}</Box>
      <Box>Average from all days: {averageAll.toFixed(2)}</Box>
    </Box>
  )
}
