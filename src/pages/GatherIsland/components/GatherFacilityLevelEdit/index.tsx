import 'rc-slider/assets/index.css'
import { useTheme } from '@emotion/react'
import { Box } from 'components/Box'
import { ExpansionPanel } from 'components/ExpansionPanel'
import { Icon } from 'components/Icon'
import { Image } from 'components/Image'
import { Progression } from 'components/Progression'
import { Text } from 'components/Title'
import { GatherIslandType } from 'models/gatherIsland'
import { getGatherFacilityDb } from 'optc-gather-island/data'
import { InputLabel } from 'pages/Detail/components'
import Slider from 'rc-slider'
import { ReactNode, useMemo } from 'react'
import GradeRed from './images/icon_grade02_red.png'
import GradeRedStar from './images/icon_grade02_red_star.png'
import GradePlatine from './images/icon_grade03_platina.png'
import GradePlatineStar from './images/icon_grade03_platina_star.png'
import GradeSilver from './images/icon_grade05_silver.png'
import GradeSilverStar from './images/icon_grade05_silver_star.png'
import GradeCopper from './images/icon_grade06_copper.png'
import GradeCopperStar from './images/icon_grade06_copper_star.png'
import Ticket from './images/UI_PiratesArena_Shop_icon_ticket.png'

type GatherFacilityLevelEditProps = {
  type: GatherIslandType
  level: number
  onChange: (level: number) => void
}

const shortFormatter = new Intl.NumberFormat('en', { notation: 'compact' })
const formatter = new Intl.NumberFormat('en')

export function GatherFacilityLevelEdit({
  type,
  level,
  onChange,
}: GatherFacilityLevelEditProps) {
  const theme = useTheme()

  const { title, description, levels, icon } = getGatherFacilityDb(type)

  const marks = levels.reduce<Record<number, ReactNode>>((acc, { cost }, i) => {
    const { grade, star, starIcon } = requirements[i]
    acc[i + 1] = (
      <Box
        key={i + 1}
        display="flex"
        flexDirection={i % 2 ? 'column-reverse' : 'column'}
        style={{
          filter: level < i + 1 ? 'grayscale(0.6)' : undefined,
        }}
        gap="1"
        marginTop={i % 2 === 0 ? (grade ? '-11rem' : '-6rem') : '0px'}
        placeItems="center"
      >
        {grade && (
          <>
            <Box display="flex" placeItems="center">
              <Text color="primaryText">{star}</Text>
              <Image src={starIcon} alt="Star" size="0" />
            </Box>
            <Image src={grade} alt="Grade" style={{ width: '3rem' }} />
          </>
        )}
        <Text color="primaryText">{shortFormatter.format(cost)}</Text>
        <Image
          src={Ticket}
          alt="Ticket"
          title={formatter.format(cost)}
          size="1"
        />
      </Box>
    )
    return acc
  }, {})

  const descriptions = useMemo<string[]>(
    () =>
      levels.map(({ value }) =>
        typeof value === 'number'
          ? description.replace('{value}', formatter.format(value))
          : description
              .replace('{success}', formatter.format(value.success))
              .replace('{superSuccess}', formatter.format(value.superSuccess))
              .replace('{failure}', formatter.format(value.failure)),
      ),
    [levels, description],
  )

  const GatherIcon: Icon = () => (
    <Box
      display="flex"
      flexDirection={['column-reverse', 'row']}
      placeItems="center"
      gap="2"
    >
      <Progression value={level} max={35} color="primaryText" />
      <Image src={icon} alt={`${title} icon`} size="2" />
    </Box>
  )

  return (
    <ExpansionPanel title={title} icon={GatherIcon}>
      <InputLabel
        value={level}
        max={35}
        name={title}
        descriptions={descriptions}
      >
        <Slider
          min={1}
          max={35}
          value={level}
          onChange={v => onChange(Array.isArray(v) ? v[0] : v)}
          marks={marks}
          style={{
            margin: '10rem 2rem',
            width: 'auto',
          }}
          styles={{
            track: {
              backgroundColor: theme.colors.primaryText,
            },
            handle: {
              borderColor: theme.colors.primaryText,
            },
          }}
          activeDotStyle={{
            borderColor: theme.colors.primaryText,
          }}
        />
      </InputLabel>
    </ExpansionPanel>
  )
}

const requirements = [
  { grade: undefined, starIcon: undefined, star: 0 },
  { grade: undefined, starIcon: undefined, star: 0 },
  { grade: undefined, starIcon: undefined, star: 0 },
  { grade: undefined, starIcon: undefined, star: 0 },
  { grade: undefined, starIcon: undefined, star: 0 },
  { grade: GradeCopper, starIcon: GradeCopperStar, star: 1 },
  { grade: GradeCopper, starIcon: GradeCopperStar, star: 1 },
  { grade: GradeCopper, starIcon: GradeCopperStar, star: 1 },
  { grade: GradeCopper, starIcon: GradeCopperStar, star: 1 },
  { grade: GradeCopper, starIcon: GradeCopperStar, star: 1 },
  { grade: GradeSilver, starIcon: GradeSilverStar, star: 1 },
  { grade: GradeSilver, starIcon: GradeSilverStar, star: 1 },
  { grade: GradeSilver, starIcon: GradeSilverStar, star: 1 },
  { grade: GradeSilver, starIcon: GradeSilverStar, star: 1 },
  { grade: GradeSilver, starIcon: GradeSilverStar, star: 1 },
  { grade: GradeSilver, starIcon: GradeSilverStar, star: 1 },
  { grade: GradeSilver, starIcon: GradeSilverStar, star: 1 },
  { grade: GradeSilver, starIcon: GradeSilverStar, star: 1 },
  { grade: GradeSilver, starIcon: GradeSilverStar, star: 1 },
  { grade: GradeSilver, starIcon: GradeSilverStar, star: 1 },
  { grade: GradeSilver, starIcon: GradeSilverStar, star: 3 },
  { grade: GradeSilver, starIcon: GradeSilverStar, star: 3 },
  { grade: GradeSilver, starIcon: GradeSilverStar, star: 3 },
  { grade: GradeSilver, starIcon: GradeSilverStar, star: 3 },
  { grade: GradeSilver, starIcon: GradeSilverStar, star: 3 },
  { grade: GradePlatine, starIcon: GradePlatineStar, star: 1 },
  { grade: GradePlatine, starIcon: GradePlatineStar, star: 1 },
  { grade: GradePlatine, starIcon: GradePlatineStar, star: 1 },
  { grade: GradePlatine, starIcon: GradePlatineStar, star: 1 },
  { grade: GradePlatine, starIcon: GradePlatineStar, star: 1 },
  { grade: GradePlatine, starIcon: GradePlatineStar, star: 3 },
  { grade: GradePlatine, starIcon: GradePlatineStar, star: 4 },
  { grade: GradePlatine, starIcon: GradePlatineStar, star: 4 },
  { grade: GradeRed, starIcon: GradeRedStar, star: 1 },
  { grade: GradeRed, starIcon: GradeRedStar, star: 1 },
]
