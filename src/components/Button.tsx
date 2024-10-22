import { Box, Leafer, PointerEvent, Text } from 'leafer-ui'

interface ButtonProps {
  onClick?: () => void
  children?: Leafer
  id?: string
}

export default function Button(props: ButtonProps) {
  const { id, onClick, children } = props

  return (
    <Box
      id={id}
      x={100}
      y={100}
      fill="#0264dc"
      cornerRadius={20}
      event={{ [PointerEvent.CLICK]: onClick }}
      cursor="pointer"
    >
      <Text text={children} fill="white" padding={[10, 20]} />
    </Box>
  )
}
