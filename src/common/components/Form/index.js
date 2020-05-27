import React from 'react'

class Form extends React.Component {
   render() {
      const { children, styles, value } = this.props
      return (
         <form className={styles} value={value}>
            {children}
         </form>
      )
   }
}

export { Form }
