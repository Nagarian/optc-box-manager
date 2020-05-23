import { useState } from 'react'

export default function usePagination (itemCount: number, itemPerPage: number) {
  const [page, setPage] = useState<number>(1)

  return {
    page: page,
    slice: [(page - 1) * itemPerPage, page * itemPerPage],
    paginationProps: {
      current: page,
      maxPage: Math.ceil(itemCount / itemPerPage),
    },
    reset: () => setPage(1),
    setPage,
  }
}
