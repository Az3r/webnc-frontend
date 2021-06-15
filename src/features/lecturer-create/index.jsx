import React, { useState, useRef } from 'react'
import {
  Step,
  Box,
  Button,
  StepButton,
  Stepper,
  TextField,
  Grid
} from '@material-ui/core'
import StudentLayout from '@/components/layout/student'
import { useSpring } from 'react-spring'

const steps = [
  { id: '1', label: '1' },
  { id: '1', label: '2' },
  { id: '1', label: '3' }
]

export default function CreateCourse() {
  const inputFile = useRef(null)
  const [url, update] = useState(null)
  const [step, navigate] = useState(0)
  const stepEls = steps.map(() => useRef(null))
  const spring = useSpring({
    x: 0
  })

  return (
    <StudentLayout>
      <input
        onChange={(e) => update(e.target.files[0])}
        type="file"
        style={{ display: 'none' }}
        ref={inputFile}
        accept="image/png, image/jpeg, image/webp"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          console.log(stepEls)
        }}
      >
        Upload
      </Button>
      <Box border="1px solid white" minWidth={200} minHeight={200}>
        {url?.name}
      </Box>
      <Stepper nonLinear activeStep={step} alternativeLabel>
        {steps.map((item, i) => (
          <Step key={item.id}>
            <StepButton onClick={() => navigate(i)}>{item.label}</StepButton>
          </Step>
        ))}
      </Stepper>
      <Box bgcolor="red" height={200}>
        <div ref={stepEls[0]} />
      </Box>
      <Box bgcolor="blue" height={1000}>
        <div ref={stepEls[1]} />
      </Box>
      <Box bgcolor="green" height={600}>
        <div ref={stepEls[2]} />
      </Box>
    </StudentLayout>
  )
}
