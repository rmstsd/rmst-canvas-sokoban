import { Text } from 'leafer-ui'
import Modal from './Modal'
import { Flow } from '@leafer-in/flow'

export default function WonUi({ width, height }) {
  const m: Flow = (
    <Modal width={width} height={height} onOk={() => m.remove()} onCancel>
      <Text text="won"></Text>
    </Modal>
  )
  return m
}
