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
import { useSnackbar } from 'notistack'
import { fetchPOST, resources } from '@/utils/api'
import { useAuth } from '@/components/hooks/auth.provider'
import WaitingDialog from '../waiting.dialog'
import { useRouter } from 'next/router'

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
  statusId: 0,
  setThumbnail: () => {},
  setInfo: () => {},
  setLongdesc: () => {},
  setLectures: () => {},
  lectureDialog: undefined,
  setLectureDialog: () => {},
  onRemoveCourse: () => {},
  setStatusId: () => {}
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
  const { enqueueSnackbar } = useSnackbar()
  const { user } = useAuth((user) => user.role === 'Lecturer')

  const downXS = useMediaQuery(theme.breakpoints.down('sm'))
  const [value, setValue] = useState(0)

  const [thumbnail, setThumbnail] = useState('')
  const [info, setInfo] = useState({})
  const [detaildesc, setDetaildesc] = useState(markdowndemo)
  const [lectures, setLectures] = useState([])
  const [submitting, setSubmitting] = useState(false)

  const isValid = useValidation({ thumbnail, info, detaildesc, lectures })

  async function onCreate() {
    // call api
    setSubmitting(true)
    try {
      await fetchPOST(resources.courses.post, {
        courseViewModel: {
          name: info.title.trim(),
          categoryId: info.topic,
          lecturerId: user.id,
          imageUrl: thumbnail,
          price: info.price,
          discount: info.discount,
          shortDiscription: info.shortdesc.trim(),
          detailDiscription: detaildesc.trim(),
          statusId: 2
        },
        lectureViewModels: lectures.map((item, index) => ({
          id: 0,
          section: index + 1,
          name: item.title.trim(),
          videoUrl: item.url.trim(),
          duration: item.duration,
          isPreview: item.preview
        }))
      })
      enqueueSnackbar('Create course successfully', { variant: 'success' })
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
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
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
                  {isValid[index] ? (
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
              disabled={!isValid.every((item) => item)}
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
      <WaitingDialog open={submitting} />
    </Dialog>
  )
}

export function EditCourseDialog({
  course,
  index,
  onConfirm,
  onRemove,
  onClose,
  ...props
}) {
  const styles = useStyles()
  const theme = useTheme()
  const { enqueueSnackbar } = useSnackbar()
  const { user } = useAuth()

  const downXS = useMediaQuery(theme.breakpoints.down('sm'))
  const [value, setValue] = useState(0)

  const [thumbnail, setThumbnail] = useState('')
  const [info, setInfo] = useState({})
  const [detaildesc, setDetaildesc] = useState('')
  const [lectures, setLectures] = useState([])
  const [statusId, setStatusId] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  const isValid = useValidation({ thumbnail, info, detaildesc, lectures })

  useEffect(() => {
    if (course) {
      const {
        thumbnail,
        title,
        price,
        discount,
        shortdesc,
        detaildesc,
        categoryId,
        topicId,
        lectures
      } = course
      setThumbnail(thumbnail)
      setInfo({
        title,
        shortdesc,
        price,
        discount,
        category: categoryId,
        topic: topicId
      })
      setDetaildesc(detaildesc)
      setLectures(lectures || [])
      setStatusId(course.statusId)
    }
  }, [course])

  async function onSave() {
    // call api
    setSubmitting(true)
    try {
      await fetchPOST(
        resources.courses.post,
        {
          courseViewModel: {
            id: course.id,
            name: info.title,
            categoryId: info.topic,
            lecturerId: user.id,
            imageUrl: thumbnail,
            price: info.price,
            discount: info.discount,
            shortDiscription: info.shortdesc,
            detailDiscription: detaildesc,
            statusId
          },
          lectureViewModels: lectures.filter(Boolean).map((item, index) => ({
            id: item.id,
            courseId: course.id,
            section: index + 1,
            name: item.title,
            videoUrl: item.url,
            duration: item.duration,
            isPreview: item.preview
          }))
        },
        { method: 'PUT' }
      )

      enqueueSnackbar('Update course successfully', { variant: 'success' })
      onConfirm?.(
        {
          ...course,
          thumbnail,
          ...info,
          detaildesc,
          lectures,
          statusId
        },
        index
      )
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  function onRestore() {
    const {
      thumbnail,
      title,
      price,
      discount,
      shortdesc,
      detaildesc,
      categoryId,
      topicId,
      lectures
    } = course
    setThumbnail(thumbnail)
    setInfo({
      title,
      shortdesc,
      price,
      discount,
      category: categoryId,
      topic: topicId
    })
    setDetaildesc(detaildesc)
    setLectures(lectures || [])
    setStatusId(course.statusId)
  }

  function onCloseDialog() {
    onClose?.()
  }

  async function onRemoveCourse() {
    setSubmitting(true)
    try {
      await fetchPOST(resources.courses.get(course.id), undefined, {
        method: 'DELETE'
      })
      enqueueSnackbar('Delete course successfully', { variant: 'error' })
      onRemove?.(index)
      onClose?.()
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

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
                  {isValid[index] ? (
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
              <IconButton onClick={onSave} disabled={!isValid.every(Boolean)}>
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
                disabled={!isValid.every(Boolean)}
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
            statusId,
            setThumbnail,
            setInfo,
            setLongdesc: setDetaildesc,
            setLectures,
            onRemoveCourse,
            setStatusId
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
      <WaitingDialog open={submitting} />
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
  onRemove: PropTypes.func,
  course: CourseDetailPropTypes,
  index: PropTypes.number
}

const markdowndemo = `
An h1 header
============

Paragraphs are separated by a blank line.

2nd paragraph. *Italic*, **bold**, and \`monospace\`. Itemized lists
look like:

  * this one
  * that one
  * the other one

Note that --- not considering the asterisk --- the actual text
content starts at 4-columns in.

> Block quotes are
> written like so.
>
> They can span multiple paragraphs,
> if you like.

Use 3 dashes for an em-dash. Use 2 dashes for ranges (ex., "it's all
in chapters 12--14"). Three dots ... will be converted to an ellipsis.
Unicode is supported. ☺



An h2 header
------------

Here's a numbered list:

 1. first item
 2. second item
 3. third item

Note again how the actual text starts at 4 columns in (4 characters
from the left side). Here's a code sample:

    # Let me re-iterate ...
    for i in 1 .. 10 { do-something(i) }

As you probably guessed, indented 4 spaces. By the way, instead of
indenting the block, you can use delimited blocks, if you like:

~~~
define foobar() {
    print "Welcome to flavor country!";
}
~~~

(which makes copying & pasting easier). You can optionally mark the
delimited block for Pandoc to syntax highlight it:

~~~python
import time
# Quick, count to ten!
for i in range(10):
    # (but not *too* quick)
    time.sleep(0.5)
    print i
~~~



### An h3 header ###

Now a nested list:

 1. First, get these ingredients:

      * carrots
      * celery
      * lentils

 2. Boil some water.

 3. Dump everything in the pot and follow
    this algorithm:

        find wooden spoon
        uncover pot
        stir
        cover pot
        balance wooden spoon precariously on pot handle
        wait 10 minutes
        goto first step (or shut off burner when done)

    Do not bump wooden spoon or it will fall.

Notice again how text always lines up on 4-space indents (including
that last line which continues item 3 above).

Here's a link to [a website](http://foo.bar), to a [local
doc](local-doc.html), and to a [section heading in the current
doc](#an-h2-header). Here's a footnote [^1].

[^1]: Footnote text goes here.

Tables can look like this:

size  material      color
----  ------------  ------------
9     leather       brown
10    hemp canvas   natural
11    glass         transparent

Table: Shoes, their sizes, and what they're made of

(The above is the caption for the table.) Pandoc also supports
multi-line tables:

--------  -----------------------
keyword   text
--------  -----------------------
red       Sunsets, apples, and
          other red or reddish
          things.

green     Leaves, grass, frogs
          and other things it's
          not easy being.
--------  -----------------------

A horizontal rule follows.

***

Here's a definition list:

apples
  : Good for making applesauce.
oranges
  : Citrus!
tomatoes
  : There's no "e" in tomatoe.

Again, text is indented 4 spaces. (Put a blank line between each
term/definition pair to spread things out more.)

Here's a "line block":

| Line one
|   Line too
| Line tree

and images can be specified like so:

![example image](example-image.jpg "An exemplary image")

Inline math equations go in like so: $omega = dphi / dt$. Display
math should get its own line and be put in in double-dollarsigns:

$$I = int rho R^{2} dV$$

And note that you can backslash-escape any punctuation characters
which you wish to be displayed literally, ex.: \`foo\`, \\*bar\\*, etc.
`
