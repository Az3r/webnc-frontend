import React from 'react'
import { useRouter } from 'next/router'
import { LinearProgress } from '@material-ui/core'

export default function PageLoading() {
  const router = useRouter()

  const [loading, toggle] = React.useState(false)

  React.useEffect(() => {
    router.events.on('routeChangeStart', (url, { shallow }) => {
      if (shallow) return
      toggle(true)
    })

    router.events.on('routeChangeComplete', (url, { shallow }) => {
      if (shallow) return
      toggle(false)
    })

    return () => {
      router.events.off('routeChangeStart')
      router.events.off('routeChangeComplete')
    }
  }, [])

  return (
    <LinearProgress
      style={{
        visibility: loading ? 'visible' : 'hidden',
        backgroundColor: '#ffc30f',
        height: 2,
        zIndex: 3000,
        width: '100%',
        position: 'fixed'
      }}
    />
  )
}
