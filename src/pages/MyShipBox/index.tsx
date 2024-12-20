import { BoatBox } from 'components/BoatBox'
import { Pagination } from 'components/Pagination'
import { ResultList } from 'components/SearchPanel'
import { usePagination } from 'hooks/usePagination'
import { ShipBox, UserShip } from 'models/shipBox'
import { FlexProps, SpaceProps } from 'styled-system'

type ShipBoxProps = {
  shipBox: ShipBox
  onShowDetail: (userShip: UserShip) => void
}

export function MyShipBox({
  shipBox,
  onShowDetail,
  ...rest
}: ShipBoxProps & SpaceProps & FlexProps) {
  const { slice, paginationProps, setPage, pageScrollRef } = usePagination(
    shipBox.length,
    100,
  )

  return (
    <>
      <ResultList ref={pageScrollRef} gap="1" {...rest}>
        {shipBox
          .sort(
            (x, y) =>
              (y.obtained ? y.id + 1000 : y.id) -
              (x.obtained ? x.id + 1000 : x.id),
          )
          .slice(...slice)
          .map(userShip => (
            <BoatBox
              key={userShip.id}
              userShip={userShip}
              onClick={onShowDetail}
            />
          ))}
      </ResultList>
      <Pagination {...paginationProps} onPageChange={page => setPage(page)} />
    </>
  )
}
