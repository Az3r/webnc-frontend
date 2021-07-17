import React, { useState, createContext, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  AppBar,
  Box,
  Button,
  Dialog,
  Hidden,
  IconButton,
  makeStyles,
  Slide,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@material-ui/core'
import {
  Check,
  Close,
  Description,
  ImageSearch,
  ListAlt,
  LocalOffer,
  NavigateBefore,
  NavigateNext,
  Restore,
  Save,
  Settings
} from '@material-ui/icons'
import { TabContext, TabPanel } from '@material-ui/lab'
import ThumbnailSection from './thumbnail.component'
import InfoSection from './info.component'
import DescriptionSection from './description.component'
import LectureSection from './lecture.component'
import { CourseDetailPropTypes } from '@/utils/typing'

const useStyles = makeStyles((theme) => ({
  bottomAppBar: {
    top: 'auto',
    bottom: 0
  },
  topAppBar: {
    backgroundColor: theme.palette.background.paper
  },
  actions: {
    alignItems: 'stretch',
    padding: 0
  },
  complete: { color: theme.palette.success.main },
  incomplete: { color: theme.palette.error.main },
  status: {
    display: 'flex',
    ['& > li']: {
      margin: theme.spacing(0, 1)
    }
  },
  panel: {
    position: 'relative'
  }
}))

const CreateCourseContext = createContext({
  thumbnail: '',
  info: {
    price: 0,
    discount: 0,
    title: '',
    shortdesc: ''
  },
  longdesc: '',
  lectures: [],
  setThumbnail: () => {},
  setInfo: () => {},
  setLongdesc: () => {},
  setLectures: () => {},
  lectureDialog: undefined,
  setLectureDialog: () => {}
})

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const tabs = [
  { label: 'Thumbnail', icon: <ImageSearch /> },
  { label: 'Info', icon: <LocalOffer /> },
  { label: 'Description', icon: <Description /> },
  { label: 'Lectures', icon: <ListAlt /> }
]

export default function CourseDialog({ onConfirm, onClose, course, ...props }) {
  const styles = useStyles()
  const theme = useTheme()

  const downXS = useMediaQuery(theme.breakpoints.down('sm'))
  const [value, setValue] = useState(0)
  const [status, setValidation] = useState(tabs.map(() => false))

  const [thumbnail, setThumbnail] = useState(undefined)
  const [info, setInfo] = useState({})
  const [detaildesc, setDetaildesc] = useState(undefined)
  const [lectures, setLectures] = useState(undefined)

  useEffect(() => {
    if (course) {
      const {
        thumbnail,
        title,
        price,
        discount,
        shortdesc,
        detaildesc,
        lectures
      } = course
      setThumbnail(thumbnail)
      setInfo({ title, shortdesc, price, discount })
      setDetaildesc(detaildesc)
      setLectures(lectures || [])
    }
  }, [course])

  useEffect(() => {
    setValidation((prev) => {
      prev[0] = Boolean(thumbnail)
      return prev.slice()
    })
  }, [thumbnail])

  useEffect(() => {
    setValidation((prev) => {
      prev[1] =
        !isNaN(info.price) &&
        !isNaN(info.discount) &&
        Boolean(info.title) &&
        Boolean(info.shortdesc)
      return prev.slice()
    })
  }, [info])

  useEffect(() => {
    setValidation((prev) => {
      prev[2] = Boolean(detaildesc)
      return prev.slice()
    })
  }, [detaildesc])

  useEffect(() => {
    setValidation((prev) => {
      const length = lectures?.reduce(
        (prev, current) => prev + (current ? 1 : 0),
        0
      )
      prev[3] = Boolean(length)
      return prev.slice()
    })
  }, [lectures])

  function onCreate() {
    // call api
  }

  function onCloseDialog() {
    // purging undefined elements
    setLectures((prev) => prev.filter(Boolean))
    onClose?.()
  }

  return (
    <Dialog
      fullScreen
      TransitionComponent={Transition}
      open={Boolean(course)}
      {...props}
    >
      <TabContext value={value}>
        <AppBar position="fixed" className={styles.topAppBar}>
          <Toolbar>
            <ul className={styles.status}>
              {tabs.map((item, index) => (
                <li key={item.label}>
                  {status[index] ? (
                    <Check className={styles.complete} />
                  ) : (
                    <Close color="error" />
                  )}
                </li>
              ))}
            </ul>
            <Box flexGrow={1} />
            {course === {} ? (
              <Button
                color="primary"
                variant="contained"
                disabled={!status.every((item) => item)}
                onClick={onCreate}
              >
                Submit
              </Button>
            ) : (
              <>
                <Hidden smUp implementation="css">
                  <IconButton>
                    <Restore />
                  </IconButton>
                  <IconButton>
                    <Save />
                  </IconButton>
                </Hidden>
                <Hidden xsDown implementation="css">
                  <Button>Restore</Button>
                  <Button>Save</Button>
                </Hidden>
              </>
            )}
            <Tooltip title="Close dialog">
              <IconButton onClick={onCloseDialog}>
                <Close />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <CreateCourseContext.Provider
          value={{
            thumbnail,
            info,
            longdesc: detaildesc,
            lectures,
            setThumbnail,
            setInfo,
            setLongdesc: setDetaildesc,
            setLectures
          }}
        >
          <Toolbar />
          <Box paddingY={1} />
          <Box display="flex" alignItems="center" justifyContent="center">
            <IconButton
              color="inherit"
              onClick={() =>
                setValue(value === 0 ? tabs.length - 1 : value - 1)
              }
            >
              <NavigateBefore />
            </IconButton>
            <Box minWidth={320}>
              <Typography align="center" variant="h5">
                Create Course / <b>{tabs[value].label}</b>
              </Typography>
            </Box>
            <IconButton
              color="inherit"
              onClick={() =>
                setValue(value === tabs.length - 1 ? 0 : value + 1)
              }
            >
              <NavigateNext />
            </IconButton>
          </Box>
          <TabPanel className={styles.panel} value={0}>
            <ThumbnailSection />
          </TabPanel>
          <TabPanel className={styles.panel} value={1}>
            <InfoSection />
          </TabPanel>
          <TabPanel className={styles.panel} value={2}>
            <DescriptionSection />
          </TabPanel>
          <TabPanel className={styles.panel} value={3}>
            <LectureSection />
          </TabPanel>
          <Box minHeight={48} />
        </CreateCourseContext.Provider>
        <AppBar position="fixed" className={styles.bottomAppBar}>
          <Tabs
            value={value}
            onChange={(e, i) => setValue(i)}
            variant={downXS ? 'fullWidth' : 'scrollable'}
          >
            {tabs.map((item, index) => (
              <Tab
                label={downXS ? undefined : item.label}
                icon={downXS ? item.icon : undefined}
                value={index}
                key={item.label}
              />
            ))}
            {course === 'update' && (
              <Tab
                label={downXS ? undefined : 'Settings'}
                icon={downXS ? <Settings /> : undefined}
                value={tabs.length}
                key={'Settings'}
              />
            )}
          </Tabs>
        </AppBar>
      </TabContext>
    </Dialog>
  )
}

CourseDialog.propTypes = {
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
  course: CourseDetailPropTypes
}

export function useCreateCourse() {
  return useContext(CreateCourseContext)
}
