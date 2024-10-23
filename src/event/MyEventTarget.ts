class MyEventTarget extends EventTarget {
  constructor() {
    super()
  }

  on(type: string, cb: (data: any) => void) {
    this.addEventListener(type, (evt: CustomEvent) => {
      cb(evt.detail)
    })
  }

  emit(type: string, data) {
    this.dispatchEvent(new CustomEvent(type, { detail: data }))
  }
}

export default MyEventTarget
