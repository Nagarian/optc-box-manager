import Box from 'components/Box'
import Button from 'components/Button'
import CottonCandyInput from 'components/forms/CottonCandyInput'
import SupportInput from 'components/forms/SupportInput'
import { ArrowIcon } from 'components/Icon'
import Popup from 'components/Popup'
import { UserUnitBulkEdit } from 'models/userBox'
import FilterContainer from 'pages/FilterSort/components/Filters/FilterContainer'
import React, { ReactNode, useState } from 'react'

type BulkEditProps = {
  onClose: () => void
  onNextStep: (editValue: UserUnitBulkEdit) => void
}
export default function BulkEdit ({ onClose, onNextStep }: BulkEditProps) {
  const [edit, setEdit] = useState<UserUnitBulkEdit>()

  return (
    <Popup
      onClose={onClose}
      customAction={
        <Button
          disabled={!edit}
          onClick={() => onNextStep(edit!)}
          icon={ArrowIcon}
          title="Next step"
        />
      }
      title="Bulk Edit"
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
          disableReset={Number.isNaN(Number(edit?.supportLvl))}
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
      {value ?? 'as is'}
    </Box>
  )
}
