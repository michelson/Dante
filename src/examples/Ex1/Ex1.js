import React from 'react'
import PropTypes from 'prop-types'
import {default as Wrapper} from '../../editor/components/Dante/Dante'
//import Dante from '../../editor/components/Dante/Dante'

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
 
class Dante2 extends React.Component {

  render() {
    return <Wrapper {...this.props}/>
  }
}

//Dante2.propTypes = Wrapper.propTypes

Dante2.propTypes = {
  onClickCreate: PropTypes.number,
}

export default Dante2