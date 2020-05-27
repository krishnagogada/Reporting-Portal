import React from 'react'
import ButtonComponent from './styledComponent.js'

class SecondaryButton extends React.Component {
   render() {
      const { children, styles, value } = this.props
      return (
         <ButtonComponent className={styles} value={value}>
            {children}
         </ButtonComponent>
      )
   }
}

export { SecondaryButton }
