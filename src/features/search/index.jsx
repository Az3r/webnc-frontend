import React, { useEffect, useState } from 'react'
import {
  Typography,
  Tooltip,
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
import FilterDialog from '@/components/dialog/filter.dialog'
import { toCoursePropTypesV2 } from '@/utils/conversion'
import qs from 'qs'

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

export default function SearchPage() {
  const styles = useStyles()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const [paginationInfo, setPaginationInfo] = useState({
    totalpages: 1,
    pageNumber: 1,
    totalitems: 0,
    pageSize: 10
  })
  const [filterDialog, setFilterDialog] = useState(false)
  const [courses, setCourses] = useState([])
  const [searching, setSearching] = useState(false)
  const [query, setQuery] = useState({})

  async function search(query) {
    const {
      q,
      categoryId,
      topicId,
      minPrice,
      maxPrice,
      minRating,
      maxRating,
      pageNumber
    } = query
    setSearching(true)
    setQuery(query)

    try {
      const results = await fetchGET(
        resources.courses.search(
          qs.stringify(
            {
              Search: q,
              CategoryId: topicId,
              CategoryTypeId: categoryId,
              MinPrice: minPrice,
              MaxPrice: maxPrice,
              MinRating: minRating,
              MaxRating: maxRating,
              PageNumber: pageNumber
            },
            { skipNulls: true }
          )
        )
      )
      setCourses(results.courses.map(toCoursePropTypesV2))
      setPaginationInfo({
        totalpages: results.paginationStatus.totalPages,
        pageNumber: results.paginationStatus.pageNumber,
        totalitems: results.paginationStatus.totalItems,
        pageSize: results.paginationStatus.pageSize
      })
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    } finally {
      setSearching(false)
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const q = params.get('q')
    if (q) search({ q })
  }, [router])

  function changePage(e, value) {
    search({ ...query, pageNumber: value })
  }

  const { q } = query
  return (
    <DefaultLayout>
      <Tooltip title="Sort and Filter">
        <Fab
          className={styles.fab}
          color="secondary"
          onClick={() => setFilterDialog(true)}
        >
          <FilterList color="inherit" />
        </Fab>
      </Tooltip>
      <Container className={styles.root}>
        {searching ? (
          <Typography variant="h4">Searching for &quot;{q}&quot;...</Typography>
        ) : (
          <Typography variant="h4">
            {paginationInfo.totalitems || 'No search'} results for &quot;{q}
            &quot; (
            {paginationInfo.totalitems &&
              courses.length +
                (paginationInfo.pageNumber - 1) * paginationInfo.pageSize}
            /{paginationInfo.totalitems})
          </Typography>
        )}
        <GridCourses
          courses={searching ? [1, 2, 3, 4, 5, 6, 7, 8] : courses}
          skeleton={searching}
        />
        <Pagination
          size="large"
          count={paginationInfo.totalpages}
          color="standard"
          onChange={changePage}
          classes={{ ul: styles.pagination }}
        />
      </Container>
      <FilterDialog
        fullWidth
        maxWidth="xs"
        open={filterDialog}
        onClose={() => setFilterDialog(false)}
        onConfirm={(params) => search({ ...params, q })}
      />
    </DefaultLayout>
  )
}
