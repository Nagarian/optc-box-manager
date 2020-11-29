import styled from 'styled-components'
import Button from './Button'

const Container = styled.div`
  display: flex;
  overflow-x: auto;
  flex: 0 0 auto;
`

type PaginationProps = {
  current: number
  maxPage: number
  onPageChange: (page: number) => void
}

export default function Pagination ({
  current,
  maxPage,
  onPageChange,
}: PaginationProps) {
  if (maxPage === 1) {
    return null
  }

  return (
    <Container>
      {[...Array(maxPage)].map((_, i) => (
        <Button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          disabled={i + 1 === current}
          m="1"
        >
          {i + 1}
        </Button>
      ))}
    </Container>
  )
}
