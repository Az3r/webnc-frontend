import React, { useRef } from 'react'
import {
  Container,
  Box,
  Button,
  Stepper,
  Step,
  StepButton,
  StepContent
} from '@material-ui/core'
import UploadThumbnail from './thumbnail.component'
import UpdateInfo from './info.component'
import CourseContent from './content.component'
import UpdateDetail from './detail.component'
import { config, useSpring } from 'react-spring'
import useStyles from './create-course.style'

const CreateCourseContext = React.createContext({
  course: {
    thumbnail: '',
    price: 0,
    discount: 0,
    title: '',
    shortdesc: '',
    lectures: [],
    detail: ''
  },
  update: () => {}
})

export default function CreateCourse() {
  const styles = useStyles()

  const [course, update] = React.useState({
    thumbnail: '',
    price: 0,
    discount: 0,
    title: '',
    shortdesc: '',
    lectures: [],
    detail: ''
  })
  const [active, setActive] = React.useState(0)

  const info = useRef(null)
  const thumbnail = useRef(null)
  const lecture = useRef(null)
  const detail = useRef(null)

  const steps = [
    { label: 'Upload Thumbnail', ref: thumbnail },
    { label: 'Enter Information', ref: info },
    { label: 'Add Lectures', ref: lecture },
    { label: 'Explain In Detail', ref: detail }
  ]

  const [, api] = useSpring(() => ({
    scroll: 0,
    config: config.stiff,
    onChange: ({ value }) => window.scroll(0, value.scroll)
  }))

  async function submit() {
    console.log('submitting course...', course)
  }

  React.useEffect(() => {
    function onScroll() {
      for (let i = 0; i < steps.length; i++) {
        const item = steps[i].ref.current
        if (!item.rect) item.rect = getBound(item)
        const { top, bottom } = item.rect
        if (window.scrollY > top - 64 && window.scrollY < bottom - 64)
          setActive(i)
      }
    }
    function onResize() {
      for (let i = 0; i < steps.length; i++) {
        const item = steps[i].ref.current
        item.rect = getBound(item)
        const { top, bottom } = item.rect
        if (window.scrollY > top - 64 && window.scrollY < bottom - 64)
          setActive(i)
      }
    }
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])
  return (
    <CreateCourseContext.Provider
      value={{
        course,
        update: (props) => update((prev) => ({ ...prev, ...props }))
      }}
    >
      <Box display="flex" justifyContent="space-around" minHeight="280vh">
        <Box flexGrow={1} maxWidth={320}>
          <Stepper
            orientation="vertical"
            nonLinear
            className={styles.stepper}
            activeStep={active}
          >
            {steps.map((item, index) => (
              <Step key={item.label}>
                <StepButton
                  orientation="vertical"
                  onClick={() =>
                    animate(item.ref.current, api, () => setActive(index))
                  }
                >
                  {item.label}
                </StepButton>
                <StepContent>
                  {index > 0 && (
                    <Button
                      color="primary"
                      onClick={() => {
                        animate(steps[index - 1].ref.current, api, () =>
                          setActive(index - 1)
                        )
                      }}
                    >
                      Back
                    </Button>
                  )}
                  {index === steps.length - 1 && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={submit}
                    >
                      Submit
                    </Button>
                  )}
                  {index < steps.length - 1 && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        animate(steps[index + 1].ref.current, api, () =>
                          setActive(index + 1)
                        )
                      }
                    >
                      Next
                    </Button>
                  )}
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Container maxWidth="md">
          <Box paddingY={2}>
            <div ref={thumbnail}>
              <UploadThumbnail />
            </div>
            <div ref={info}>
              <UpdateInfo />
            </div>
            <Box paddingTop={1} />
            <div ref={lecture}>
              <CourseContent />
            </div>
            <Box paddingTop={1} />
            <div ref={detail}>
              <UpdateDetail />
            </div>
          </Box>
        </Container>
      </Box>
    </CreateCourseContext.Provider>
  )
}

export function useCreateCourse() {
  return React.useContext(CreateCourseContext)
}

function animate(item, animator) {
  if (!item.rect) item.rect = getBound(item)
  animator.start({
    scroll: item.rect.top - 16,
    from: { scroll: window.scrollY }
  })
}

function getBound(item) {
  return {
    top: item.getBoundingClientRect().top + window.scrollY,
    bottom:
      item.getBoundingClientRect().top + window.scrollY + item.offsetHeight
  }
}
