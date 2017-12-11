import { VType, Component } from 'nerv-shared'
import {
  mountComponent,
  reRenderComponent,
  unmountComponent
} from './lifecycle'

class ComponentWrapper {
  vtype = VType.Composite
  type: any
  name: string
  _owner: any
  props: any
  component: Component<any, any>
  context: any
  key: any
  dom: Element | null

  constructor (type, props) {
    this.type = type
    this.name =
      type.name || type.toString().match(/^function\s*([^\s(]+)/)[1]
    type.displayName = this.name
    this._owner = props.owner
    delete props.owner
    this.props = props
    this.key = props.key
    this.dom = null
  }

  init (parentContext?) {
    return mountComponent(this, parentContext)
  }

  update (previous, current, parentContext, domNode?) {
    return reRenderComponent(previous, this)
  }

  destroy () {
    unmountComponent(this)
  }
}

export default ComponentWrapper
