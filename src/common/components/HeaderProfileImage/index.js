import React from 'react'
import { ImageComponent } from './styledComponent.js'

class HeaderProfileImage extends React.Component {
   render() {
      const { styles, source, alt } = this.props
      return <ImageComponent className={styles} src={source} alt={alt} />
   }
}

export { HeaderProfileImage }
