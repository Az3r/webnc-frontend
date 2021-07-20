import React, {
  memo,
  useState,
  createContext,
  useContext,
  useEffect
} from 'react'
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
import SettingSection from './setting.component'

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
    position: 'relative',
    flexGrow: 1
  }
}))

const CreateCourseContext = createContext({
  thumbnail: '',
  info: {
    category: 0,
    topic: 0,
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
  setLectureDialog: () => {},
  onRemoveCourse: () => {},
  onStatusChange: () => {}
})

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ALL_SECTIONS = [
  { label: 'Info', icon: <LocalOffer />, component: InfoSection },
  { label: 'Thumbnail', icon: <ImageSearch />, component: ThumbnailSection },
  {
    label: 'Description',
    icon: <Description />,
    component: memo(DescriptionSection, () => true)
  },
  { label: 'Lectures', icon: <ListAlt />, component: LectureSection },
  {
    label: 'Settings',
    icon: <Settings />,
    component: SettingSection
  }
]

const CREATE_SECTION = ALL_SECTIONS.slice(0, 4)
const EDIT_SECTION = ALL_SECTIONS

export default function CreateCourseDialog({ onConfirm, onClose, ...props }) {
  const styles = useStyles()
  const theme = useTheme()

  const downXS = useMediaQuery(theme.breakpoints.down('sm'))
  const [value, setValue] = useState(0)

  const [thumbnail, setThumbnail] = useState('')
  const [info, setInfo] = useState({})
  const [detaildesc, setDetaildesc] = useState('')
  const [lectures, setLectures] = useState([])

  const status = useValidation({ thumbnail, info, detaildesc, lectures })

  async function onCreate() {
    // call api
    onConfirm?.({
      thumbnail,
      ...info,
      detaildesc,
      lectures
    })

    // reset to default state
    setThumbnail('')
    setInfo({})
    setDetaildesc('')
    setLectures([])
  }

  function onCloseDialog() {
    // purging undefined elements
    setLectures((prev) => prev.filter(Boolean))

    onClose?.()
  }

  return (
    <Dialog fullScreen TransitionComponent={Transition} {...props}>
      <TabContext value={value}>
        <AppBar position="fixed" className={styles.topAppBar}>
          <Toolbar>
            <ul className={styles.status}>
              {CREATE_SECTION.map((item, index) => (
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
            <Button
              color="primary"
              variant="contained"
              disabled={!status.every((item) => item)}
              onClick={onCreate}
            >
              Submit
            </Button>
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
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            minHeight="100%"
          >
            <Toolbar />
            <Box display="flex" alignItems="center" justifyContent="center">
              <IconButton
                color="inherit"
                onClick={() =>
                  setValue(value === 0 ? CREATE_SECTION.length - 1 : value - 1)
                }
              >
                <NavigateBefore />
              </IconButton>
              <Box minWidth={320}>
                <Typography align="center" variant="h5">
                  Create Course / <b>{CREATE_SECTION[value].label}</b>
                </Typography>
              </Box>
              <IconButton
                color="inherit"
                onClick={() =>
                  setValue(value === CREATE_SECTION.length - 1 ? 0 : value + 1)
                }
              >
                <NavigateNext />
              </IconButton>
            </Box>
            {CREATE_SECTION.map((item, index) => (
              <TabPanel className={styles.panel} key={item.label} value={index}>
                <item.component />
              </TabPanel>
            ))}
            <Box minHeight={48} />
          </Box>
        </CreateCourseContext.Provider>
        <AppBar position="fixed" className={styles.bottomAppBar}>
          <Tabs
            value={value}
            onChange={(e, i) => setValue(i)}
            variant={downXS ? 'fullWidth' : 'scrollable'}
          >
            {CREATE_SECTION.map((item, index) => (
              <Tab
                label={downXS ? undefined : item.label}
                icon={downXS ? item.icon : undefined}
                value={index}
                key={item.label}
              />
            ))}
          </Tabs>
        </AppBar>
      </TabContext>
    </Dialog>
  )
}

export function EditCourseDialog({
  course,
  index,
  onConfirm,
  onClose,
  ...props
}) {
  const styles = useStyles()
  const theme = useTheme()

  const downXS = useMediaQuery(theme.breakpoints.down('sm'))
  const [value, setValue] = useState(0)

  const [thumbnail, setThumbnail] = useState(undefined)
  const [info, setInfo] = useState({})
  const [detaildesc, setDetaildesc] = useState(undefined)
  const [lectures, setLectures] = useState(undefined)

  const status = useValidation({ thumbnail, info, detaildesc, lectures })

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

  async function onSave() {
    // call api
    onConfirm?.(
      {
        ...course,
        thumbnail,
        ...info,
        detaildesc,
        lectures
      },
      index
    )
  }

  function onRestore() {
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

  function onCloseDialog() {
    onClose?.()
  }

  function onStatusChange(value) {}
  function onRemoveCourse() {}

  return (
    <Dialog
      fullScreen
      TransitionComponent={Transition}
      open={index != undefined}
      {...props}
    >
      <TabContext value={value}>
        <AppBar position="fixed" className={styles.topAppBar}>
          <Toolbar>
            <ul className={styles.status}>
              {CREATE_SECTION.map((item, index) => (
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
            <Hidden smUp implementation="css">
              <IconButton onClick={onRestore}>
                <Restore />
              </IconButton>
              <IconButton onClick={onSave} disabled={!status.every(Boolean)}>
                <Save />
              </IconButton>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Button color="primary" onClick={onRestore}>
                Restore
              </Button>
              <Button
                color="primary"
                onClick={onSave}
                disabled={!status.every(Boolean)}
              >
                Save
              </Button>
            </Hidden>
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
            setLectures,
            onRemoveCourse,
            onStatusChange
          }}
        >
          <Toolbar />
          <Box display="flex" alignItems="center" justifyContent="center">
            <IconButton
              color="inherit"
              onClick={() =>
                setValue(value === 0 ? EDIT_SECTION.length - 1 : value - 1)
              }
            >
              <NavigateBefore />
            </IconButton>
            <Box minWidth={320}>
              <Typography align="center" variant="h5">
                Create Course / <b>{EDIT_SECTION[value].label}</b>
              </Typography>
            </Box>
            <IconButton
              color="inherit"
              onClick={() =>
                setValue(value === EDIT_SECTION.length - 1 ? 0 : value + 1)
              }
            >
              <NavigateNext />
            </IconButton>
          </Box>
          {EDIT_SECTION.map((item, index) => (
            <TabPanel className={styles.panel} key={item.label} value={index}>
              <item.component />
            </TabPanel>
          ))}
          <Box minHeight={48} />
        </CreateCourseContext.Provider>
        <AppBar position="fixed" className={styles.bottomAppBar}>
          <Tabs
            value={value}
            onChange={(e, i) => setValue(i)}
            variant={downXS ? 'fullWidth' : 'scrollable'}
          >
            {EDIT_SECTION.map((item, index) => (
              <Tab
                label={downXS ? undefined : item.label}
                icon={downXS ? item.icon : undefined}
                value={index}
                key={item.label}
              />
            ))}
          </Tabs>
        </AppBar>
      </TabContext>
    </Dialog>
  )
}

function useValidation({ thumbnail, info, detaildesc, lectures }) {
  const [status, setValidation] = useState(CREATE_SECTION.map(() => false))

  useEffect(() => {
    setValidation((prev) => {
      prev[0] =
        !isNaN(info.price) &&
        !isNaN(info.discount) &&
        Boolean(info.title) &&
        Boolean(info.category) &&
        Boolean(info.topic) &&
        Boolean(info.shortdesc)
      return prev.slice()
    })
  }, [info])

  useEffect(() => {
    setValidation((prev) => {
      prev[1] = Boolean(thumbnail)
      return prev.slice()
    })
  }, [thumbnail])

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
  return status
}

export function useCreateCourse() {
  return useContext(CreateCourseContext)
}
CreateCourseDialog.propTypes = {
  onConfirm: PropTypes.func,
  onClose: PropTypes.func
}

EditCourseDialog.propTypes = {
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
  course: CourseDetailPropTypes,
  index: PropTypes.number
}
