import { useEffect, useRef, useState } from 'react'

export default function usePagination (itemCount: number, itemPerPage: number) {
  const [page, setPage] = useState<number>(1)
  const pageScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const maxPage = Math.ceil(itemCount / itemPerPage) || 1
    if (page > maxPage) setPage(maxPage)
  }, [itemCount, itemPerPage, page])

  useEffect(() => {
    if (pageScrollRef.current) {
      pageScrollRef.current.scrollTo(0, 0)
    }
  }, [page])

  return {
    page: page,
    slice: [(page - 1) * itemPerPage, page * itemPerPage],
    paginationProps: {
      current: page,
      maxPage: Math.ceil(itemCount / itemPerPage) || 1,
    },
    reset: () => setPage(1),
    setPage,
    pageScrollRef,
  }
}
