import Box from 'components/Box'
import Button from 'components/Button'
import CottonCandyInput from 'components/forms/CottonCandyInput'
import SupportInput from 'components/forms/SupportInput'
import { ArrowIcon } from 'components/Icon'
import Popup from 'components/Popup'
import { DefaultSearch } from 'hooks/useSearch'
import {
  Search,
  SearchFilterUserUnits,
  SearchSortCriteria,
} from 'models/search'
import {
  UserUnit,
  UserUnitBulkEdit,
  UserUnitBulkEditLimitBreakState,
  UserUnitBulkEditLimitBreakStateKeys,
} from 'models/userBox'
import FilterContainer from 'pages/FilterSort/components/Filters/FilterContainer'
import { ReactNode, useState } from 'react'
import BulkEditSelect from './components/BulkEditSelect'
import { useUserSettings } from 'hooks/useUserSettings'
import ChoiceInput from 'components/forms/ChoiceInput'
import { gloToJapConverter } from 'scripts/glo-jap-remapper-proxy'

type BulkEditProps = {
  userUnits: UserUnit[]
  onCancel: () => void
  onSubmit: (userUnits: UserUnit[], editValue: UserUnitBulkEdit) => void
}
export default function BulkEdit ({
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
              title="Potential abilities"
              onReset={() =>
                setEdit({
                  ...edit,
                  limitBreakState: undefined,
                })
              }
              disableReset={!edit?.limitBreakState}
            >
              {UserUnitBulkEditLimitBreakStateKeys.map(lbState => (
                <LbStateEdit
                  key={lbState}
                  state={lbState}
                  label={lbStateToLabel(lbState)}
                  currentValue={edit?.limitBreakState}
                  onChange={state =>
                    setEdit({
                      ...edit,
                      limitBreakState: state,
                    })
                  }
                />
              ))}
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
                  onChange={e =>
                    setEdit({
                      ...edit,
                      cottonCandies: {
                        ...edit?.cottonCandies,
                        atk: Number(e.target.value),
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
                  onChange={e =>
                    setEdit({
                      ...edit,
                      cottonCandies: {
                        ...edit?.cottonCandies,
                        hp: Number(e.target.value),
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
                  onChange={e =>
                    setEdit({
                      ...edit,
                      cottonCandies: {
                        ...edit?.cottonCandies,
                        rcv: Number(e.target.value),
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
              <ChoiceInput
                type="radio"
                name="gameVersionIdConverter"
                checked={edit?.idConverter === 'toGlobal'}
                onChange={e =>
                  setEdit({
                    idConverter: 'toGlobal',
                  })
                }
              >
                Japan to Global
              </ChoiceInput>

              <ChoiceInput
                type="radio"
                name="gameVersionIdConverter"
                checked={edit?.idConverter === 'toJapan'}
                onChange={e =>
                  setEdit({
                    idConverter: 'toJapan',
                  })
                }
              >
                Global to Japan
              </ChoiceInput>
            </FilterContainer>
          </Box>
        </Popup>
      )}

      {showStep2 && (
        <BulkEditSelect
          relatedSearch={computeSearch(edit!)}
          userUnits={userUnits}
          onCancel={() => setShowStep2(false)}
          onSubmit={uu => onSubmit(uu, edit!)}
        />
      )}
    </>
  )
}

function BulkEditContainer ({
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

function LbStateEdit ({
  state,
  currentValue,
  onChange,
  label,
}: {
  state: UserUnitBulkEditLimitBreakState
  currentValue: UserUnitBulkEditLimitBreakState | undefined
  onChange: (state: UserUnitBulkEditLimitBreakState) => void
  label: string
}) {
  return (
    <label>
      <input
        name={`lb-state-${state}`}
        type="radio"
        checked={currentValue === state ?? false}
        onChange={e => e.target.checked && onChange(state)}
      />
      {label}
    </label>
  )
}

function lbStateToLabel (lbState: UserUnitBulkEditLimitBreakState) {
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

function computeSearch (edit: UserUnitBulkEdit): Search {
  let uuf: SearchFilterUserUnits = {}
  const uus: SearchSortCriteria[] = []
  if (edit?.supportLvl) {
    uuf = {
      ...uuf,
      byUserSupport: {
        state: 'unmaxed',
      },
    }
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
  }

  if (edit.idConverter === 'toGlobal') {
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

  if (edit.idConverter === 'toJapan') {
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
  }
}
