import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import { SpaceProps, SizeProps, space, size } from 'styled-system'
import { clean } from 'styles'

import { ReactComponent as Add } from './add.svg'

export const AddSvg = styled(Add).withConfig(clean('fill'))<SpaceProps & SizeProps>`
  ${space}
  ${size}
  fill: ${p => themeGet(`colors.${p.fill ?? 'inherit'}`)};
  color: ${p => themeGet(`colors.${p.color ?? 'inherit'}`)};
`
