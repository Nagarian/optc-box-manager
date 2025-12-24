import { useEffect, useMemo, useRef, useState } from 'react'

export function usePagination(itemCount: number, itemPerPage: number) {
  const [page, setPage] = useState<number>(1)
  const pageScrollRef = useRef<HTMLDivElement>(null)
  const maxPage = Math.ceil(itemCount / itemPerPage) || 1

  useEffect(() => {
    if (pageScrollRef.current) {
      pageScrollRef.current.scrollTo(0, 0)
    }
  }, [page])

  const memoizedSetPage = useMemo(
    () => (p: number) => setPage(p < 1 ? 1 : p > maxPage ? maxPage : p),
    [maxPage],
  )

  return {
    page,
    slice: [(page - 1) * itemPerPage, page * itemPerPage],
    paginationProps: {
      current: page,
      maxPage,
    },
    reset: () => setPage(1),
    setPage: memoizedSetPage,
    pageScrollRef,
  }
}
