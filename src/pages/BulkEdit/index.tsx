import Box from 'components/Box'
import Button from 'components/Button'
import CottonCandyInput from 'components/forms/CottonCandyInput'
import SupportInput from 'components/forms/SupportInput'
import { ArrowIcon } from 'components/Icon'
import Popup from 'components/Popup'
import { DefaultSearch } from 'hooks/useSearch'
import { Search, SearchSortCriteria } from 'models/search'
import { UserUnit, UserUnitBulkEdit } from 'models/userBox'
import FilterContainer from 'pages/FilterSort/components/Filters/FilterContainer'
import { SearchFilterUserUnits } from 'pages/FilterSort/components/Filters/UserUnits'
import React, { ReactNode, useState } from 'react'
import BulkEditSelect from './components/BulkEditSelect'

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

  const computeSearch = () : Search => {
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
        byUserPotential: {
          lbstate: 'locked',
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

    return {
      filters: {
        userUnits: {
          ...uuf,
        },
      },
      sorts: [...uus, ...DefaultSearch.sorts],
    }
  }

  return (
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
          <label>
            <input
              name="lb-state"
              type="radio"
              checked={edit?.limitBreakState === 'max'}
              onChange={e =>
                e.target.checked &&
                setEdit({
                  ...edit,
                  limitBreakState: 'max',
                })
              }
            />
            Is Limit Break maxed
          </label>
          <label>
            <input
              name="lb-state"
              type="radio"
              checked={edit?.limitBreakState === 'rainbow'}
              onChange={e =>
                e.target.checked &&
                setEdit({
                  ...edit,
                  limitBreakState: 'rainbow',
                })
              }
            />
            Is rainbow
          </label>
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
      </Box>

      {showStep2 && (
        <BulkEditSelect
          relatedSearch={computeSearch()}
          userUnits={userUnits}
          onCancel={() => setShowStep2(false)}
          onSubmit={uu => onSubmit(uu, edit!)}
        />
      )}
    </Popup>
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