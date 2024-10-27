import { Box } from 'components/Box'
import { Button } from 'components/Button'
import { CharacterBox } from 'components/CharacterBox'
import {
  BellyIcon,
  DeleteIcon,
  NewsCooIcon,
  SearchBuilderIcon,
  TreasureIcon,
} from 'components/Icon'
import { Popup } from 'components/Popup'
import { SearchPanel } from 'components/SearchPanel'
import { SubTitle, Title } from 'components/Title'
import {
  DefaultSugoCleanerSearch,
  EmptySearch,
  useSavedSearch,
} from 'hooks/useSearch'
import { SugoCleanerListType, useSugoCleaner } from 'hooks/useSugoCleaner'
import { ExtendedUnit } from 'models/units'
import { UserUnit } from 'models/userBox'
import { Add } from 'pages/Add'
import { Detail } from 'pages/Detail'
import { RecapBoxLight } from 'pages/Detail/components/RecapBox'
import { SearchBuilder } from 'pages/SearchBuilder'
import { FilterContainer } from 'pages/SearchBuilder/components/Filters/FilterContainer'
import { useState } from 'react'

export type SugoCleanerProps = {
  units: ExtendedUnit[]
  userBox: UserUnit[]
  onClose: () => void
  onUpdateUnit: (userUnit: UserUnit) => void
  onAddUnit: (userUnit: ExtendedUnit) => void
}
export function SugoCleaner({
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
        name="toClean"
        title="To clean"
        list={toClean}
        action={action('toClean')}
        onClearAll={() => removeAll('toClean')}
        onAdd={() => setOpenAdd(true)}
        showOnEmpty
      />
      <SugoCleanerList
        name="toSell"
        title="Selling list"
        list={toSell}
        onClearAll={() => removeAll('toSell')}
        action={action('toSell')}
        showOnEmpty
      />
      <SugoCleanerList
        name="toWaiting"
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
                {"You don't possess this unit, you should keep it !"}
              </SubTitle>
            )}
            <hr />

            <SubTitle>What to do with it ?</SubTitle>
            <Button
              {...commonPopupButton}
              onClick={() => {
                onAddUnit(openChooser)
                if (currentList) {
                  remove(currentList, openChooser)
                }
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
                  if (currentList) {
                    move(currentList, 'toSell', openChooser)
                  }
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
                  if (currentList) {
                    move(currentList, 'toWaiting', openChooser)
                  }
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
                if (currentList) {
                  remove(currentList, openChooser)
                }
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
            if (currentList && openChooser) {
              remove(currentList, openChooser)
            }
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

function SugoCleanerList({
  name,
  title,
  list,
  action,
  showOnEmpty = false,
  onAdd,
  onClearAll,
}: {
  name: string
  title: string
  list: ExtendedUnit[]
  action: (unit: ExtendedUnit) => void
  actionLabel?: string
  onAdd?: () => void
  onClearAll: () => void
  showOnEmpty?: boolean
}) {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
  const [showSearchBuilder, setShowSearchBuilder] = useState<boolean>(false)
  const { search, setSearch } = useSavedSearch(
    `sugocleaner-${name}`,
    EmptySearch,
  )

  if (!list.length && !showOnEmpty) {
    return null
  }

  return (
    <FilterContainer
      title={title}
      customAction={
        <Button
          title="Sort"
          icon={SearchBuilderIcon}
          variant="secondary"
          disabled={!list.length}
          onClick={() => setShowSearchBuilder(true)}
        />
      }
      onReset={() => setShowConfirmation(true)}
      disableReset={list.length === 0}
    >
      <SearchPanel
        search={search}
        units={list}
        onUnitClick={action}
        size="3"
        onAdd={onAdd}
      />

      {showSearchBuilder && (
        <SearchBuilder
          unitOnly
          onCancel={() => setShowSearchBuilder(false)}
          search={search}
          resetSaveKey="sugocleaner"
          onSubmit={s => {
            setSearch(s)
            setShowSearchBuilder(false)
          }}
        />
      )}

      {showConfirmation && (
        <Popup
          title={`Are you sure to clear « ${title} » ?`}
          onValidate={() => {
            setShowConfirmation(false)
            onClearAll()
          }}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </FilterContainer>
  )
}
