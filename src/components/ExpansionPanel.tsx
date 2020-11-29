import { themeGet } from '@styled-system/theme-get'
import useMeasure from 'hooks/useMeasure'
import { ReactNode, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { GridProps } from 'styled-system'
import Box, { BoxProps } from './Box'
import Button from './Button'
import { Icon } from './Icon'

const ExpandButton = styled(Button).attrs(() => ({
  fontSize: 1,
}))<{ isOpen: boolean }>`
  flex-direction: row-reverse;
  justify-content: space-between;
  > * {
    margin: 0;
  }
`

const Panel = styled(Box)<{ isOpen: boolean; innerHeight?: number }>`
  max-height: 0;
  max-height: ${p => p.isOpen && p.innerHeight + 'px'};
  overflow: ${p => !p.isOpen && 'hidden'};
  transition: max-height 0.25s ease;
  margin-bottom: ${p => p.isOpen && themeGet('space.2')};

  display: flex;
  flex-direction: column;
  place-items: stretch;
`

function ExpandedPanel ({
  isOpen,
  children,
  ...rest
}: {
  isOpen: boolean
  children: ReactNode
} & BoxProps) {
  const [bind, { height }] = useMeasure()

  return (
    <Panel innerHeight={height} isOpen={isOpen} {...rest}>
      <div ref={bind as any}>{children}</div>
    </Panel>
  )
}

type ExpansionPanelProps = {
  title: string
  icon?: Icon
  disabled?: boolean
  children: ReactNode
}

export default function ExpansionPanel ({
  title,
  icon,
  disabled = false,
  children,
  ...rest
}: ExpansionPanelProps & GridProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const boxRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (isOpen && boxRef.current) {
      boxRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isOpen])

  return (
    <Box
      ref={boxRef as any}
      display="flex"
      flexDirection="column"
      minWidth={isOpen ? '100%' : '50%'}
      flex="1"
      {...rest}
    >
      <ExpandButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} m="1" disabled={disabled} icon={icon}>
        {title}
      </ExpandButton>
      <ExpandedPanel isOpen={isOpen}>{children}</ExpandedPanel>
    </Box>
  )
}
