import { useRef, useEffect } from 'react'

import Experience from '../../experience'

import { Container } from './styles'

const Scene = () => {
  const targetRef = useRef<HTMLDivElement>(null)
  let experience = useRef<Experience>()

  useEffect(() => {
    if (targetRef?.current) {
      experience.current = new Experience({
        targetElement: targetRef.current,
      })
    }

    return () => experience.current?.stop()
  }, [targetRef])

  return <Container id="experience" ref={targetRef}></Container>
}

export default Scene
