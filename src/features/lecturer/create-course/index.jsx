import React, { useRef, forwardRef } from 'react'
import {
  Container,
  Box,
  Button,
  Divider,
  Stepper,
  Step,
  StepButton,
  StepContent,
  StylesProvider
} from '@material-ui/core'
import CreateCourseProvider from './create-course.context'
import UploadThumbnail from './thumbnail.component'
import UpdateInfo from './info.component'
import CourseContent from './content.component'
import UpdateDetail from './detail.component'
import { useSpring } from 'react-spring'
import useStyles from './create-course.style'

export default function CourseDetail() {
  const styles = useStyles()
  const info = useRef(null)
  const thumbnail = useRef(null)
  const [, api] = useSpring(() => ({
    scroll: 0,
    onChange: ({ value }) => window.scroll(0, value.scroll)
  }))
  return (
    <CreateCourseProvider>
      <Box display="flex">
        <Box flexGrow={1} maxWidth={320}>
          <Stepper orientation="vertical" nonLinear className={styles.stepper}>
            <Step>
              <StepButton
                onClick={() => {
                  const top =
                    info.current.getBoundingClientRect().top + window.scrollY
                  api.start({
                    scroll: top - 16,
                    from: { scroll: window.scrollY }
                  })
                }}
              >
                hello
              </StepButton>
              <StepContent>
                <Button>Back</Button>
                <Button>Next</Button>
              </StepContent>
            </Step>
            <Step>
              <StepButton>hello</StepButton>
              <StepContent>
                <Button>Back</Button>
                <Button>Next</Button>
              </StepContent>
            </Step>
            <Step>
              <StepButton>hello</StepButton>
            </Step>
            <Step>
              <StepButton>hello</StepButton>
            </Step>
          </Stepper>
        </Box>
        <Container maxWidth="md">
          <ForwardThumbnail ref={thumbnail} />
          <Box paddingY={2}>
            <ForwardInfo ref={info} />
            <Button fullWidth variant="contained" color="primary">
              add to cart
            </Button>
          </Box>
          <Divider />
          <Box paddingTop={1} />
          <CourseContent />
          <Box paddingTop={1} />
          <UpdateDetail />
        </Container>
      </Box>
    </CreateCourseProvider>
  )
}

const ForwardInfo = forwardRef(UpdateInfo)
const ForwardThumbnail = forwardRef(UploadThumbnail)
