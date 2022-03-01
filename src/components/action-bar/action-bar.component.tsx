import React from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'

interface IActionBarProps {
  current?: number
  onIncrease?: () => void
  onDecrease?: () => void
}

export const ActionBar: React.VFC<IActionBarProps> = ({ current = 50, onIncrease, onDecrease }) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center" p={2}>
      <Button variant="contained" size="large" onClick={onDecrease}>
        -
      </Button>
      <Box border={1} borderRadius={2} p={4}>
        <Typography variant="h4">{current}</Typography>
      </Box>
      <Button variant="contained" size="large" onClick={onIncrease}>
        +
      </Button>
    </Grid>
  )
}
