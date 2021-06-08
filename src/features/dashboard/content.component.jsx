import React, { useState } from 'react'
import {
  Box,
  Collapse,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Tooltip,
  Typography
} from '@material-ui/core'
import { Sort, FilterList } from '@material-ui/icons'
import { Skeleton, ToggleButton } from '@material-ui/lab'
import clsx from 'clsx'
import useStyles from './content.style'
import { useDashboard } from './dashboard.context'
import { currency } from '@/utils/intl'

export default function DashboardContent() {
  const { drawer } = useDashboard()
  const styles = useStyles()
  const [filter, toggle] = useState(false)
  return (
    <main
      className={clsx(styles.root, {
        [styles.shift]: drawer
      })}
    >
      <div className={styles.toolbar} />
      <Box display="flex" alignItems="center">
        <Typography variant="h5">Search results (15)</Typography>
        <Tooltip title="Filter results" placement="top">
          <IconButton onClick={() => toggle((prev) => !prev)}>
            <FilterList />
          </IconButton>
        </Tooltip>
      </Box>
      <Collapse in={filter}>
        <Grid container spacing={1}>
          <Grid item>
            <Box display="flex" flexDirection="column">
              <ToggleButton>difficulty</ToggleButton>
              <FormControl component="fieldset">
                <RadioGroup aria-label="quiz" name="quiz">
                  <FormControlLabel
                    value="1-week"
                    control={<Radio />}
                    label="beginner"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>
          <Grid item>
            <ToggleButton>rating</ToggleButton>
            <RadioGroup aria-label="quiz" name="quiz">
              <FormControlLabel
                value="1-week"
                control={<Radio />}
                label="above 5 stars"
              />
            </RadioGroup>
          </Grid>
          <Grid item>
            <ToggleButton>price</ToggleButton>
            <RadioGroup aria-label="quiz" name="quiz">
              <FormControlLabel
                value="1-week"
                control={<Radio />}
                label={`< ${currency(100)}`}
              />
            </RadioGroup>
          </Grid>
          <Grid item>
            <ToggleButton>date</ToggleButton>
            <RadioGroup aria-label="quiz" name="quiz">
              <FormControlLabel
                value="1-week"
                control={<Radio />}
                label="Last week"
              />
              <FormControlLabel
                value="1-month"
                control={<Radio />}
                label="Last month"
              />
              <FormControlLabel
                value="6-month"
                control={<Radio />}
                label="Last 6 months"
              />
              <FormControlLabel
                value="1-year"
                control={<Radio />}
                label="Last year"
              />
            </RadioGroup>
          </Grid>
          <Grid item>
            <Typography variant="button">SORT</Typography>
            <RadioGroup aria-label="quiz" name="quiz">
              <FormControlLabel
                value="1-week"
                control={<Radio />}
                label="Views"
              />
              <FormControlLabel
                value="1-week"
                control={<Radio />}
                label="Rating"
              />
            </RadioGroup>
          </Grid>
        </Grid>
      </Collapse>
      <Grid container spacing={2}>
        <Grid item>
          <SkeletonCourse />
        </Grid>
        <Grid item>
          <SkeletonCourse />
        </Grid>
        <Grid item>
          <SkeletonCourse />
        </Grid>
        <Grid item>
          <SkeletonCourse />
        </Grid>
        <Grid item>
          <SkeletonCourse />
        </Grid>
        <Grid item>
          <SkeletonCourse />
        </Grid>
      </Grid>
    </main>
  )
}

function SkeletonCourse() {
  return (
    <Box width={384} display="flex" flexDirection="column">
      <Skeleton variant="rect" width={384} height={216} />
      <Box paddingY={1} display="flex">
        <Skeleton variant="circle" width={48} height={48}></Skeleton>
        <Box flexGrow={1} paddingLeft={1} display="flex" flexDirection="column">
          <Skeleton width="100%" variant="text">
            <Typography variant="subtitle1">.</Typography>
            <Typography variant="subtitle1">.</Typography>
          </Skeleton>
          <Skeleton width="100%" variant="text">
            <Typography variant="subtitle2">.</Typography>
          </Skeleton>
          <Skeleton width="100%" variant="text">
            <Typography variant="h6">.</Typography>
          </Skeleton>
        </Box>
      </Box>
    </Box>
  )
}
