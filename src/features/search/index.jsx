import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
  Tooltip,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  Container,
  makeStyles,
  Fab
} from '@material-ui/core'
import { FilterList } from '@material-ui/icons'
import GridCourses from '@/components/list/course.grid'
import DefaultLayout from '@/components/layout'
import { useRouter } from 'next/router'
import { fetchGET, resources } from '@/utils/api'
import { useSnackbar } from 'notistack'
import { Pagination } from '@material-ui/lab'
import { FilterButton } from './search.style'
import FilterDialog from '@/components/dialog/filter.dialog'

const useStyles = makeStyles((theme) => ({
  root: {
    ['& > *']: {
      margin: theme.spacing(1, 0)
    }
  },
  pagination: {
    justifyContent: 'center'
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}))

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
  const styles = useStyles()
  const router = useRouter()
  const [filter, toggleFilter] = useState(false)
  const [courses, setCourses] = useState([])
  const [searching, setSearching] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const [q, setQ] = useState(undefined)

  async function search(q) {
    setSearching(true)
    try {
      const results = await fetchGET(resources.courses.search(q))
      setCourses(results)
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    } finally {
      setSearching(false)
    }
  }

  useEffect(() => {
    if (q) search(q)
  }, [q])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const q = params.get('q')
    setQ(q)
  }, [router])

  function changePage(e, value) {}

  return (
    <DefaultLayout>
      <Tooltip title="Sort and Filter">
        <Fab
          className={styles.fab}
          color="secondary"
          onClick={() => toggleFilter(true)}
        >
          <FilterList color="inherit" />
        </Fab>
      </Tooltip>
      <Container className={styles.root}>
        {searching ? (
          <Typography variant="h4">
            Searching for &quot;${q}&quot;...
          </Typography>
        ) : (
          <Typography variant="h4">
            {courses.length || 'No search'} results for &quot;{q}&quot;
          </Typography>
        )}
        <GridCourses
          courses={searching ? [1, 2, 3, 4, 5, 6, 7, 8] : courses}
          skeleton={searching}
        />
        <Pagination
          size="large"
          count={10}
          color="standard"
          onChange={changePage}
          page={1}
          classes={{ ul: styles.pagination }}
        />
      </Container>
      <FilterDialog
        fullWidth
        maxWidth="xs"
        open={filter}
        onClose={() => toggleFilter(false)}
      />
    </DefaultLayout>
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
