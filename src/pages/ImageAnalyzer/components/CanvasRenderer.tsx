import styled from '@emotion/styled'
import { Box } from 'components/Box'
import { useEffect, useRef } from 'react'
import { Analysis, CharacterFound, SquareSize } from 'services/image-cv-worker'
import { FadeIn } from 'styles/animation'

export type CanvasRendererProps = {
  analysis?: Analysis
  showFound: boolean
  onFoundClick: (found: CharacterFound) => void
}
export function CanvasRenderer({
  analysis,
  showFound,
  onFoundClick,
}: CanvasRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { squares, founds } = analysis ?? {}

  useEffect(() => {
    // update layout
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext('2d')

    if (!ctx) return

    if (!analysis) return

    const { image, squares, founds, done } = analysis
    canvasRef.current.width = image.width
    canvasRef.current.height = image.height
    ctx.putImageData(image, 0, 0)

    if (squares.length || done) {
      ctx.rect(0, 0, image.width, image.height)
      for (const square of squares) {
        ctx.moveTo(square.x, square.y)
        ctx.rect(square.x, square.y, square.width, square.height)
      }
      ctx.fillStyle = '#00000099'
      ctx.fill('evenodd')
    }

    for (const square of squares) {
      const rectangle = new Path2D()
      rectangle.rect(square.x, square.y, square.width, square.height)

      ctx.strokeStyle = 'white'
      ctx.lineWidth = 8
      ctx.stroke(rectangle)

      const founded = founds.find(f => f.squareId === square.id)
      if (founded) {
        ctx.strokeStyle = founded.unit ? 'green' : 'orange'
        ctx.lineWidth = 5
        ctx.stroke(rectangle)
      } else if (done) {
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 5
        ctx.stroke(rectangle)
      }
    }
  }, [analysis])

  useEffect(() => {
    // autoscroll in canvas feature
    if (!canvasRef.current || !squares?.length) {
      return
    }

    const yMin = Math.min(...squares.map(s => s.y))
    const yMax = Math.max(...squares.map(s => s.y)) + squares[0].height
    const panelHeight = canvasRef.current.parentElement?.clientHeight ?? 0
    const canvasRatio =
      canvasRef.current.height / canvasRef.current.clientHeight
    const panelratio = canvasRef.current.clientHeight / canvasRef.current.height

    canvasRef.current.parentElement?.scrollTo({
      top: Math.max(
        0,
        (yMin - (panelHeight * canvasRatio - (yMax - yMin)) / 2) * panelratio,
      ),
      behavior: 'smooth',
    })
  }, [squares])

  return (
    <Box
      display={analysis ? 'flex' : 'none'}
      flexDirection="column"
      overflowY="auto"
      justifyItems="stretch"
      position="relative"
    >
      <Canvas ref={canvasRef} />
      {!!squares?.length && (
        <Svg viewBox={`0 0 ${analysis?.image.width} ${analysis?.image.height}`}>
          {squares.map(square => (
            <SvgImage
              key={square.id}
              square={square}
              found={founds?.find(f => f.squareId === square.id)}
              showFound={showFound}
              onFoundClick={onFoundClick}
            />
          ))}
        </Svg>
      )}
    </Box>
  )
}

type SvgImageProps = {
  square: SquareSize
  found?: CharacterFound
  showFound: boolean
  onFoundClick: (found: CharacterFound) => void
}
function SvgImage({
  square: { id, x, y, width, height },
  found,
  showFound,
  onFoundClick,
}: SvgImageProps) {
  return found ? (
    <Image
      xlinkHref={found?.unit?.images.thumbnail}
      x={x}
      y={y}
      width={width}
      height={height}
      showFound={showFound}
      onClick={() => found && onFoundClick(found)}
    />
  ) : (
    <Rect x={x} y={y} width={width} height={height} showFound={showFound} />
  )
}

const Canvas = styled.canvas`
  min-width: 0;
`

const Svg = styled.svg`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
`

const Image = styled.image<{ showFound: boolean }>`
  opacity: ${p => (p.showFound ? 1 : 0)};
  animation: 1.5s ${FadeIn} infinite alternate
    cubic-bezier(0.68, -0.55, 0.27, 1.55);
  animation: ${p => (p.showFound ? '' : 'none')};
`

const Rect = styled.rect<{ showFound: boolean }>`
  fill: #00000099;
  display: ${p => !p.showFound && 'none'};
`
