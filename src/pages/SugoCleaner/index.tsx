import Box from 'components/Box'
import Button from 'components/Button'
import CharacterBox from 'components/CharacterBox'
import {
  AddIcon,
  BellyIcon,
  DeleteIcon,
  NewsCooIcon,
  TreasureIcon,
} from 'components/Icon'
import Popup from 'components/Popup'
import { ResultList } from 'components/SearchPanel'
import { SubTitle, Title } from 'components/Title'
import { DefaultSugoCleanerSearch } from 'hooks/useSearch'
import useSugoCleaner, { SugoCleanerListType } from 'hooks/useSugoCleaner'
import { ExtendedUnit } from 'models/units'
import { UserUnit } from 'models/userBox'
import Add from 'pages/Add'
import Detail from 'pages/Detail'
import { RecapBoxLight } from 'pages/Detail/components/RecapBox'
import FilterContainer from 'pages/FilterSort/components/Filters/FilterContainer'
import { useState } from 'react'

export type SugoCleanerProps = {
  units: ExtendedUnit[]
  userBox: UserUnit[]
  onClose: () => void
  onUpdateUnit: (userUnit: UserUnit) => void
  onAddUnit: (userUnit: ExtendedUnit) => void
}
export default function SugoCleaner ({
  units,
  userBox,
  onUpdateUnit,
  onClose,
  onAddUnit,
}: SugoCleanerProps) {
  const { toClean, toSell, toWaiting, addTo, move, remove, removeAll } =
    useSugoCleaner(units)
  const [openAdd, setOpenAdd] = useState<boolean>(false)
  const [openChooser, setOpenChooser] = useState<ExtendedUnit>()
  const [openDetail, setOpenDetail] = useState<UserUnit>()
  const [currentList, setCurrentList] = useState<SugoCleanerListType>()

  const filteredUserUnit = openChooser
    ? userBox.filter(uu => openChooser.evolutionMap.includes(uu.unit.id))
    : []

  const commonPopupButton = {
    marginY: '1',
  }

  const action = (str: SugoCleanerListType) => (unit: ExtendedUnit) => {
    setCurrentList(str)
    setOpenChooser(unit)
  }

  return (
    <Popup title="Sugo Pull Cleaner" onClose={onClose} minHeightRequired>
      <SugoCleanerList
        title="To clean"
        list={toClean}
        action={action('toClean')}
        onClearAll={() => removeAll('toClean')}
        onAdd={() => setOpenAdd(true)}
        showOnEmpty
      />
      <SugoCleanerList
        title="Selling list"
        list={toSell}
        onClearAll={() => removeAll('toSell')}
        action={action('toSell')}
        showOnEmpty
      />
      <SugoCleanerList
        title="Waiting list"
        list={toWaiting}
        onClearAll={() => removeAll('toWaiting')}
        action={action('toWaiting')}
      />

      {openAdd && (
        <Add
          saveKey="sugoCleanerAddSearch"
          allowDuplicatedUnit
          defaultSearch={DefaultSugoCleanerSearch}
          onCancel={() => setOpenAdd(false)}
          onSubmit={units => {
            addTo('toClean', ...units)
            setOpenAdd(false)
          }}
          units={units}
        />
      )}

      {!!openChooser && (
        <Popup onClose={() => setOpenChooser(undefined)}>
          <Box display="grid">
            <Box display="flex" marginBottom="2" alignItems="center">
              <CharacterBox unit={openChooser} />
              <Title marginLeft="2">{openChooser.name}</Title>
            </Box>

            <hr />

            {/* eslint-disable-next-line multiline-ternary */}
            {filteredUserUnit.length ? (
              <>
                <SubTitle>On which unit do you want to use it ?</SubTitle>
                {filteredUserUnit.map(uu => (
                  <RecapBoxLight
                    key={uu.id}
                    userUnit={uu}
                    marginY="2"
                    onClick={uu => setOpenDetail(uu)}
                  />
                ))}
              </>
            ) : (
              <SubTitle>
                You don't possess this unit, you should keep it !
              </SubTitle>
            )}
            <hr />

            <SubTitle>What to do with it ?</SubTitle>
            <Button
              {...commonPopupButton}
              onClick={() => {
                onAddUnit(openChooser)
                currentList && remove(currentList, openChooser)
                setOpenChooser(undefined)
              }}
              icon={TreasureIcon}
            >
              Keep it
            </Button>

            {currentList !== 'toSell' && (
              <Button
                {...commonPopupButton}
                onClick={() => {
                  currentList && move(currentList, 'toSell', openChooser)
                  setOpenChooser(undefined)
                }}
                icon={BellyIcon}
              >
                Put on selling list
              </Button>
            )}

            {currentList !== 'toWaiting' && (
              <Button
                {...commonPopupButton}
                onClick={() => {
                  currentList && move(currentList, 'toWaiting', openChooser)
                  setOpenChooser(undefined)
                }}
                icon={NewsCooIcon}
              >
                Put on waiting list
              </Button>
            )}

            <Button
              {...commonPopupButton}
              onClick={() => {
                currentList && remove(currentList, openChooser)
                setOpenChooser(undefined)
              }}
              variant="danger"
              icon={DeleteIcon}
            >
              Dismiss (already used)
            </Button>
          </Box>
        </Popup>
      )}

      {!!openDetail && (
        <Detail
          onCancel={() => setOpenDetail(undefined)}
          onValidate={uu => {
            onUpdateUnit(uu)
            currentList && openChooser && remove(currentList, openChooser)
            setOpenDetail(undefined)
            setOpenChooser(undefined)
          }}
          userUnit={openDetail}
          units={units}
          isSugoCleaner
        />
      )}
    </Popup>
  )
}

function SugoCleanerList ({
  title,
  list,
  action,
  showOnEmpty = false,
  onAdd,
  onClearAll,
}: {
  title: string
  list: ExtendedUnit[]
  action: (unit: ExtendedUnit) => void
  actionLabel?: string
  onAdd?: () => void
  onClearAll: () => void
  showOnEmpty?: boolean
}) {
  if (!list.length && !showOnEmpty) {
    return null
  }

  return (
    <FilterContainer
      title={title}
      onReset={onClearAll}
      disableReset={list.length === 0}
    >
      <ResultList>
        {list.map((unit, i) => (
          <CharacterBox
            key={i}
            unit={unit}
            size="3"
            onClick={action}
          />
        ))}

        {!!onAdd && (
          <Button
            onClick={onAdd}
            icon={AddIcon}
            size="1"
            alignSelf="center"
            margin="2"
          />
        )}
      </ResultList>
    </FilterContainer>
  )
}
