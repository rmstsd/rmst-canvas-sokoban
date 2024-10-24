import { Box, Leafer, PointerEvent, Text } from 'leafer-ui'

interface ButtonProps {
  onClick?: () => void
  children?: Leafer
  id?: string
  className?: string
  stroke?: string
}

export default function Button(props: ButtonProps) {
  const { id, className, onClick, stroke, children } = props

  const ui: Box = (
    <Box
      id={id}
      className={className}
      x={100}
      y={100}
      fill="#0264dc"
      stroke={stroke}
      cornerRadius={20}
      event={{ [PointerEvent.CLICK]: onClick }}
      cursor="pointer"
    >
      <Text text={children} fill="white" padding={[10, 20]} />
    </Box>
  )

  ui.data = {}

  function update(p) {
    ui.set(p)
  }

  return ui
}
