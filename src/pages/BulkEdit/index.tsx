import Box from 'components/Box'
import Button from 'components/Button'
import ChoiceInput from 'components/forms/ChoiceInput'
import CottonCandyInput from 'components/forms/CottonCandyInput'
import SupportInput from 'components/forms/SupportInput'
import { ArrowIcon } from 'components/Icon'
import Popup from 'components/Popup'
import { DefaultSearch } from 'hooks/useSearch'
import { useUserSettings } from 'hooks/useUserSettings'
import {
  Search,
  SearchFilterUserUnits,
  SearchSortCriteria,
} from 'models/search'
import {
  GameVersionIdConverter,
  GameVersionIdConverterKeys,
  UserUnit,
  UserUnitBulkEdit,
  UserUnitBulkEditLevelState,
  UserUnitBulkEditLevelStateKeys,
  UserUnitBulkEditLimitBreakState,
  UserUnitBulkEditLimitBreakStateKeys,
} from 'models/userBox'
import { SearchDisplayerCriteria } from 'pages/FilterSort/components/Displayers'
import { LevelDisplayerOption } from 'pages/FilterSort/components/Displayers/LevelDisplayer'
import FilterContainer from 'pages/FilterSort/components/Filters/FilterContainer'
import { ByUserLevelCriteria } from 'pages/FilterSort/components/Filters/UserUnits/ByUserLevel'
import { LevelSortOption } from 'pages/FilterSort/components/Sorts/UserUnits/ByLevel'
import { ReactNode, useState } from 'react'
import { gloToJapConverter } from 'scripts/glo-jap-remapper-proxy'
import BulkEditSelect from './components/BulkEditSelect'

type BulkEditProps = {
  userUnits: UserUnit[]
  onCancel: () => void
  onSubmit: (userUnits: UserUnit[], editValue: UserUnitBulkEdit) => void
}
export default function BulkEdit({
  userUnits,
  onCancel,
  onSubmit,
}: BulkEditProps) {
  const [edit, setEdit] = useState<UserUnitBulkEdit>()
  const [showStep2, setShowStep2] = useState<boolean>()
  const { ccLimit } = useUserSettings()

  return (
    <>
      {!showStep2 && (
        <Popup
          onClose={onCancel}
          customAction={
            <Button
              disabled={!edit}
              onClick={() => setShowStep2(true)}
              icon={ArrowIcon}
              title="Next step"
            />
          }
          title="Bulk Edit - Step 1"
        >
          <Box display="flex" flexDirection="column">
            <FilterContainer
              title="Level"
              onReset={() =>
                setEdit({
                  ...edit,
                  levelState: undefined,
                })
              }
              disableReset={!edit?.levelState}
            >
              <MultiChoiceInput<UserUnitBulkEditLevelState>
                name="lvl-state"
                values={UserUnitBulkEditLevelStateKeys}
                currentValue={edit?.levelState}
                labelMapper={levelStateToLabel}
                onChange={state =>
                  setEdit({
                    ...edit,
                    levelState: state,
                  })
                }
              />
            </FilterContainer>

            <FilterContainer
              title="Potential abilities"
              onReset={() =>
                setEdit({
                  ...edit,
                  limitBreakState: undefined,
                })
              }
              disableReset={!edit?.limitBreakState}
            >
              <MultiChoiceInput<UserUnitBulkEditLimitBreakState>
                name="lb-state"
                values={UserUnitBulkEditLimitBreakStateKeys}
                labelMapper={lbStateToLabel}
                currentValue={edit?.limitBreakState}
                onChange={state =>
                  setEdit({
                    ...edit,
                    limitBreakState: state,
                  })
                }
              />
            </FilterContainer>

            <FilterContainer
              title="Support"
              onReset={() =>
                setEdit({
                  ...edit,
                  supportLvl: undefined,
                })
              }
              disableReset={!edit?.supportLvl}
            >
              <BulkEditContainer value={edit?.supportLvl}>
                <SupportInput
                  name="support"
                  value={edit?.supportLvl ?? 0}
                  onChange={e =>
                    setEdit({
                      ...edit,
                      supportLvl: Number(e.target.value),
                    })
                  }
                />
              </BulkEditContainer>
            </FilterContainer>

            <FilterContainer
              title="Cotton Candies"
              onReset={() =>
                setEdit({
                  ...edit,
                  cottonCandies: undefined,
                })
              }
              disableReset={!edit?.cottonCandies}
            >
              <BulkEditContainer value={edit?.cottonCandies?.atk}>
                <CottonCandyInput
                  name="cc-atk"
                  variant="atk"
                  value={edit?.cottonCandies?.atk ?? 0}
                  max={ccLimit.atk}
                  hideAdders
                  onChange={v =>
                    setEdit({
                      ...edit,
                      cottonCandies: {
                        ...edit?.cottonCandies,
                        atk: v,
                      },
                    })
                  }
                />
              </BulkEditContainer>
              <BulkEditContainer value={edit?.cottonCandies?.hp}>
                <CottonCandyInput
                  name="cc-hp"
                  variant="hp"
                  value={edit?.cottonCandies?.hp ?? 0}
                  max={ccLimit.hp}
                  hideAdders
                  onChange={v =>
                    setEdit({
                      ...edit,
                      cottonCandies: {
                        ...edit?.cottonCandies,
                        hp: v,
                      },
                    })
                  }
                />
              </BulkEditContainer>
              <BulkEditContainer value={edit?.cottonCandies?.rcv}>
                <CottonCandyInput
                  name="cc-rcv"
                  variant="rcv"
                  value={edit?.cottonCandies?.rcv ?? 0}
                  max={ccLimit.rcv}
                  hideAdders
                  onChange={v =>
                    setEdit({
                      ...edit,
                      cottonCandies: {
                        ...edit?.cottonCandies,
                        rcv: v,
                      },
                    })
                  }
                />
              </BulkEditContainer>
            </FilterContainer>

            <FilterContainer
              title="Global-Japan Id Converter"
              onReset={() =>
                setEdit({
                  ...edit,
                  idConverter: undefined,
                })
              }
              disableReset={!edit?.idConverter}
            >
              <MultiChoiceInput<GameVersionIdConverter>
                name="lb-state"
                values={GameVersionIdConverterKeys}
                labelMapper={idConverterToLabel}
                currentValue={edit?.idConverter}
                onChange={state =>
                  setEdit({
                    ...edit,
                    idConverter: state,
                  })
                }
              />
            </FilterContainer>
          </Box>
        </Popup>
      )}

      {showStep2 && (
        <BulkEditSelect
          relatedSearch={computeSearch(edit)}
          userUnits={userUnits}
          onCancel={() => setShowStep2(false)}
          onSubmit={uu => edit && onSubmit(uu, edit)}
        />
      )}
    </>
  )
}

function BulkEditContainer({
  value,
  children,
}: {
  value: number | undefined
  children: ReactNode
}) {
  return (
    <Box display="flex" alignItems="center">
      {children}
      {value ?? 0}
    </Box>
  )
}

function MultiChoiceInput<T extends string>({
  name,
  values,
  currentValue,
  onChange,
  labelMapper,
}: {
  name: string
  values: readonly T[] | T[]
  labelMapper?: (str: T) => string
  currentValue: T | undefined
  onChange: (state: T) => void
}) {
  return (
    <Box display="grid" gridTemplateColumns="auto auto" gap="2">
      {values.map(state => (
        <ChoiceInput
          key={state}
          type="radio"
          name={name}
          checked={currentValue === state}
          onChange={e => e.target.checked && onChange(state)}
        >
          {labelMapper?.(state) ?? state}
        </ChoiceInput>
      ))}
    </Box>
  )
}

function lbStateToLabel(lbState: UserUnitBulkEditLimitBreakState) {
  switch (lbState) {
    case 'max':
      return 'Is Limit Break maxed'
    case 'rainbow':
      return 'Is Rainbow'
    case 'max+':
      return 'Is Limit Break key unlocked'
    case 'rainbow+':
      return 'Is Rainbow + (key unlocked and max+)'
    default:
      return ''
  }
}

function idConverterToLabel(state: GameVersionIdConverter) {
  switch (state) {
    case 'toGlobal':
      return 'Japan to Global'
    case 'toJapan':
      return 'Global to Japan'
    default:
      return ''
  }
}

function levelStateToLabel(state: UserUnitBulkEditLevelState) {
  switch (state) {
    case 'max':
      return 'Level max'
    case 'postlbmax':
      return 'Level max (post LLB)'
    case 'lbmax':
      return 'Level Limit Break max'
    default:
      return ''
  }
}

function computeSearch(edit: UserUnitBulkEdit | undefined): Search {
  let uuf: SearchFilterUserUnits = {}
  let displayer: SearchDisplayerCriteria | undefined
  const uus: SearchSortCriteria[] = []
  if (edit?.levelState) {
    uuf = {
      ...uuf,
      byUserLevel: {
        state: edit.levelState === 'max' ? 'ongoing' : undefined,
        lbState: edit.levelState === 'lbmax' ? 'unmaxed' : undefined,
        postLbState: edit.levelState === 'postlbmax' ? 'ongoing' : undefined,
      } as ByUserLevelCriteria,
    }
    uus.push({
      by: 'byLevel',
      order: 'desc',
      options: {
        type: edit.levelState === 'lbmax' ? 'lvl LB' : 'lvl',
      } as LevelSortOption,
    })
    displayer = {
      type: 'level',
      options: {
        type: edit.levelState === 'lbmax' ? 'level LB' : 'progression',
      } as LevelDisplayerOption,
    }
  }

  if (edit?.supportLvl) {
    uuf = {
      ...uuf,
      byUserSupport: {
        state: 'unmaxed',
      },
    }
    displayer = { type: 'support' }
  }

  if (edit?.limitBreakState) {
    uuf = {
      ...uuf,
      byUserLimitBreak: {
        lbState: edit.limitBreakState.includes('+') ? 'maxed' : 'locked',
      },
    }
    uus.push({
      by: 'byLBLvlMax',
      order: 'desc',
    })
  }

  if (edit?.cottonCandies) {
    uuf = {
      ...uuf,
      byUserCottonCandy: {
        atk: (edit.cottonCandies.atk ?? 0) > 0 ? 'unmaxed' : undefined,
        hp: (edit.cottonCandies.hp ?? 0) > 0 ? 'unmaxed' : undefined,
        rcv: (edit.cottonCandies.rcv ?? 0) > 0 ? 'unmaxed' : undefined,
      },
    }
    displayer = { type: 'cottonCandy' }
  }

  if (edit?.idConverter === 'toGlobal') {
    return {
      filters: {
        units: {
          bySearchBox: {
            value: Object.values(gloToJapConverter).filter(Boolean).join(','),
          },
        },
      },
      sorts: [{ by: 'byId', order: 'desc' }],
    }
  }

  if (edit?.idConverter === 'toJapan') {
    return {
      filters: {
        units: {
          bySearchBox: {
            value: Object.entries(gloToJapConverter)
              .filter(([glo, jap]) => !!jap)
              .map(([glo, jap]) => Number.parseInt(glo))
              .join(','),
          },
        },
      },
      sorts: [{ by: 'byId', order: 'desc' }],
    }
  }

  return {
    filters: {
      userUnits: {
        ...uuf,
      },
    },
    sorts: [...uus, ...DefaultSearch.sorts],
    displayer,
  }
}
