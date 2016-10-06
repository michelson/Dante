
React = require('react')
ReactDOM = require('react-dom')

{
  Entity,
  RichUtils
  AtomicBlockUtils
  EditorBlock
} = require('draft-js')


class embedBlock extends React.Component

  render: ->
    return(

      <figure contenteditable='false' 
        className='graf--figure graf--iframe graf--first' 
        name='504e' tabindex='0'>

        <div className='iframeContainer'>
          <iframe frameborder='0' width='700' height='393' 
            data-media-id='' 
            src='' 
            data-height='480' 
            data-width='854'>
          </iframe>
        </div>

        <figcaption contenteditable='true' className='imageCaption'>
          <a rel='nofollow' 
            className='markup--anchor markup--figure-anchor' 
            target='_blank'>
          </a>
        </figcaption>
      </figure>
    )