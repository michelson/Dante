
import React from 'react'

export default class DividerBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      enabled: false,
      data: this.props.blockProps.data.toJS()
    }
  }

  componentDidMount() {}


  render() {
    return (
      <hr/>
    )
  }
}

