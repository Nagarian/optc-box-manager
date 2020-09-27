import { themeGet } from '@styled-system/theme-get'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Box, { BoxProps } from './Box'
import Button from './Button'
import { ArrowIcon } from './Icon'

const ExpandButton = styled(Button).attrs(() => ({
  icon: ArrowIcon,
  placeContent: 'start',
})) <{ isOpen: boolean }>`
  ${ArrowIcon} {
    transform: rotate(0deg);
    transition: all 0.25s ease;
    ${p => p.isOpen && 'transform: rotate(90deg);'}
  }
  flex: 0 0 auto;
`

const Panel = styled(Box) <{ isOpen: boolean; innerHeight?: number }>`
  max-height: 0;
  max-height: ${p => p.isOpen && p.innerHeight + 'px'};
  overflow: ${p => !p.isOpen && 'hidden'};
  transition: max-height .25s ease;
  margin-bottom: ${p => p.isOpen && themeGet('space.2')};

  display: flex;
  flex-direction: column;
  place-items: stretch;
  flex: 0 0 auto;
`

function ExpandedPanel ({
  isOpen,
  children,
  ...rest
}: {
  isOpen: boolean
  children: ReactNode
} & BoxProps) {
  const boxRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (isOpen && boxRef.current) {
      boxRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isOpen])

  return (
    <Panel
      innerHeight={
        boxRef.current
          ? Array.from(boxRef.current.children).reduce(
            (acc, el) => acc + el.scrollHeight,
            0,
          )
          : undefined
      }
      isOpen={isOpen}
      ref={boxRef as any}
      {...rest}
    >
      {children}
    </Panel>
  )
}

type ExpansionPanelProps = {
  title: string
  children: ReactNode
}

export default function ExpansionPanel ({
  title,
  children,
}: ExpansionPanelProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <ExpandButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} my="1">
        {title}
      </ExpandButton>
      <ExpandedPanel isOpen={isOpen}>{children}</ExpandedPanel>
    </>
  )
}
