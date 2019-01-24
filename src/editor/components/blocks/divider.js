
import React from 'react'

export default class DividerBlock extends React.Component {
  render() {
    return (
      <div>
        <hr/>
      </div>
    )
  }
}

export const DividerBlockConfig = (options={})=>{
  let config = {
    block: DividerBlock
  }
  return Object.assign(config, options)
}
