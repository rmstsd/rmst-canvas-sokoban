import { Flow } from '@leafer-in/flow'
import Button from './Button'

export default function Modal({ width, height, children = null, onOk, onCancel }) {
  console.log('Modal', children)

  return (
    <Flow x={0} y={0} width={width} height={height} fill="rgba(0,0,0,0.5)" flowAlign="center">
      <Flow flow="y" width={width * 0.8} height={height * 0.8} fill="white" padding={10}>
        <Flow>{children}</Flow>

        <Flow flowAlign="right">
          <Button onClick={onCancel}>取消</Button>
          <Button onClick={onOk}>确定</Button>
        </Flow>
      </Flow>
    </Flow>
  )
}
