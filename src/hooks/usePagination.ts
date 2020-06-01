import { useEffect, useState } from 'react'

export default function usePagination (itemCount: number, itemPerPage: number) {
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    const maxPage = Math.ceil(itemCount / itemPerPage) || 1
    if (page > maxPage) setPage(maxPage)
  }, [itemCount, itemPerPage, page])

  return {
    page: page,
    slice: [(page - 1) * itemPerPage, page * itemPerPage],
    paginationProps: {
      current: page,
      maxPage: Math.ceil(itemCount / itemPerPage) || 1,
    },
    reset: () => setPage(1),
    setPage,
  }
}
