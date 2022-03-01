import React from 'react'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 45,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1976d2' : '#308fe8'
  }
}))

interface IProgressBarProps {
  current: number
  goal: number
}

export const ProgressBar: React.VFC<IProgressBarProps> = ({ current, goal }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" align="center">{`${current} / ${goal}`}</Typography>
      <BorderLinearProgress variant="determinate" value={(current / goal) * 100} />
    </Box>
  )
}
