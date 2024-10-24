import { Flow } from '@leafer-in/flow'
import { PointerEvent, Rect } from 'leafer-ui'

interface CheckBoxProps {
  defaultValue?: boolean
  onChange?: (value: boolean) => void
}

export default function CheckBox(props: CheckBoxProps) {
  const { defaultValue, onChange } = props

  const checkIcon = <Rect width={10} height={10} fill="#555"></Rect>

  const ui: Flow = (
    <Flow
      cursor="pointer"
      width={20}
      height={20}
      flowAlign="center"
      stroke="#333"
      fill="transparent"
      event={{
        [PointerEvent.CLICK]: evt => {
          const nb = !ui.data.value
          update(nb)
          onChange?.(nb)
        }
      }}
    ></Flow>
  )

  ui.data = { update, value: defaultValue }

  update(ui.data.value)
  function update(bool) {
    ui.data.value = bool
    ui.removeAll()

    if (bool) {
      ui.add(checkIcon)
    }
  }

  return ui
}
