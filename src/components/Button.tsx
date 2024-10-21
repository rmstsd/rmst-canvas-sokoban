import { Box, Leafer, PointerEvent, Text } from 'leafer-ui'

interface ButtonProps {
  onClick?: () => void
  children?: Leafer
}

export default function Button(props: ButtonProps) {
  const { onClick, children } = props

  return (
    <Box x={100} y={100} fill="#0264dc" cornerRadius={20} event={{ [PointerEvent.CLICK]: onClick }} cursor="pointer">
      <Text text={children} fill="white" padding={[10, 20]} />
    </Box>
  )
}
