import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Typography,
  Grid,
  Tooltip,
  IconButton,
  Collapse,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel
} from '@material-ui/core'
import { FilterList } from '@material-ui/icons'
import { FilterButton } from './search.style'
import GridCourses from '@/components/list/course.grid'

const filters = [
  {
    title: 'difficulty',
    options: [
      { value: 1, label: 'beginner' },
      { value: 2, label: 'advanced' },
      { value: 3, label: 'expert' }
    ]
  },
  {
    title: 'rating',
    options: [
      { value: 4, label: '> 4 stars' },
      { value: 3, label: '> 3 stars' },
      { value: 2, label: '> 2 stars' },
      { value: 1, label: '> 1 star' },
      { value: 0, label: '< 1 star' }
    ]
  },
  {
    title: 'upload',
    options: [
      { value: 3600 * 24 * 7, label: 'last week' },
      { value: 3600 * 24 * 30, label: 'last month' },
      { value: 3600 * 24 * 30 * 6, label: 'last 6 months' },
      { value: 3600 * 24 * 30 * 12, label: 'last year' }
    ]
  }
]

const sort = [
  { value: 'view', label: 'views' },
  { value: 'rating', label: 'ratings' }
]

export default function SearchPage() {
  const [filter, toggle] = useState(false)
  return (
    <>
      <Box display="flex" alignItems="center">
        <Typography variant="h5">Search results (15)</Typography>
        <Tooltip title="Filter results" placement="top">
          <IconButton onClick={() => toggle((prev) => !prev)}>
            <FilterList />
          </IconButton>
        </Tooltip>
      </Box>
      <Collapse in={filter}>
        <Box paddingY={2}>
          <Grid container spacing={4} justify="center">
            {filters.map((e) => (
              <Grid item key={e.title}>
                <FilterGroup title={e.title} options={e.options} />
              </Grid>
            ))}
            <Grid item>
              <FilterGroup title="sort" options={sort} selected={0} />
            </Grid>
          </Grid>
        </Box>
      </Collapse>
      <GridCourses courses={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} skeleton />
    </>
  )
}

function FilterGroup({ toggled, onToggled, title, options, selected }) {
  return (
    <FormControl component="fieldset" disabled={!toggled}>
      <FilterButton
        selected={toggled}
        onClick={(e) => onToggled(e.target.checked)}
      >
        {title}
      </FilterButton>
      <RadioGroup
        aria-label={title}
        name={title}
        defaultValue={options[selected]?.value}
      >
        {options.map((item, index) => (
          <FormControlLabel
            key={index}
            value={item.value}
            control={<Radio />}
            label={item.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}

FilterGroup.propTypes = {
  toggled: PropTypes.bool,
  onToggled: PropTypes.func,
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  selected: PropTypes.number
}

FilterGroup.defaultProps = {
  toggled: false,
  onToggled: () => {},
  options: [],
  selected: 9999
}
