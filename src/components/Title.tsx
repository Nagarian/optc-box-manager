import styled from 'styled-components'
import { SpaceProps, space, TypographyProps, typography } from 'styled-system'

export const Title = styled.h1<SpaceProps & TypographyProps>(space, typography)
Title.defaultProps = {
  fontSize: '4',
}

export const SubTitle = styled.h2<SpaceProps & TypographyProps>(space, typography)
SubTitle.defaultProps = {
  fontSize: '3',
}
