import { Box } from 'components/Box'
import { useUserSettings } from 'hooks/useUserSettings'
import { GatherIslandType, GatherIslandTypes } from 'models/gatherIsland'
import { getGatherFacilityDb } from 'optc-gather-island/data'
import { GatherFacilityLevelEdit } from './components/GatherFacilityLevelEdit'

export function GatherIsland() {
  const { userSetting, setUserSetting } = useUserSettings()

  const update = (key: GatherIslandType) =>
    key === 'monumentOfFerocity' ||
    key === 'monumentOfHealing' ||
    key === 'monumentOfEndurance'
      ? (value: number) =>
          setUserSetting({
            ...userSetting,
            cottonCandiesMaximumLevel: {
              ...userSetting.cottonCandiesMaximumLevel,
              [GatherIslandTypesToCottonCandy[key]]:
                getGatherFacilityDb(key).levels[value - 1].value,
            },
            gatheringIsland: { ...userSetting.gatheringIsland, [key]: value },
          })
      : (value: number) =>
          setUserSetting({
            ...userSetting,
            gatheringIsland: { ...userSetting.gatheringIsland, [key]: value },
          })

  return (
    <Box display="flex" flexWrap="wrap">
      {GatherIslandTypes.map(type => (
        <GatherFacilityLevelEdit
          key={type}
          type={type}
          level={userSetting.gatheringIsland[type]}
          onChange={update(type)}
        />
      ))}
    </Box>
  )
}

const GatherIslandTypesToCottonCandy = {
  monumentOfFerocity: 'atk',
  monumentOfHealing: 'rcv',
  monumentOfEndurance: 'hp',
}
