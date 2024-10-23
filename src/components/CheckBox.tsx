import { Flow } from '@leafer-in/flow'
import { PointerEvent, Rect } from 'leafer-ui'

interface CheckBoxProps {
  defaultValue?: boolean
  onChange?: (value: boolean) => void
}

export default function CheckBox(props: CheckBoxProps) {
  const { defaultValue, onChange } = props
  const state = { value: defaultValue }

  const Ui: Flow = (
    <Flow
      id="checkWrapper"
      cursor="pointer"
      width={20}
      height={20}
      flowAlign="center"
      stroke="#333"
      fill="transparent"
      event={{
        [PointerEvent.CLICK]: evt => {
          onChange?.(!state.value)
        }
      }}
    >
      {state.value ? <CheckIcon /> : null}
    </Flow>
  )

  const updateUi = (value: boolean) => {
    state.value = value

    Ui.removeAll()

    if (value) {
      Ui.add(<CheckIcon />)
    }
  }

  return { updateUi, Ui }
}

const CheckIcon = () => {
  return <Rect width={10} height={10} fill="#555"></Rect>
}
