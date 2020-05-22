import styled from 'styled-components'
import { space, SpaceProps, typography, TypographyProps } from 'styled-system'
import { cleanStyledSystem } from 'styles'

export const Title = styled('h1').withConfig(cleanStyledSystem)<SpaceProps & TypographyProps>(space, typography)
Title.defaultProps = {
  fontSize: '4',
  textAlign: 'center',
}

export const SubTitle = styled('h2').withConfig(cleanStyledSystem)<SpaceProps & TypographyProps>(space, typography)
SubTitle.defaultProps = {
  fontSize: '3',
  textAlign: 'center',
}
