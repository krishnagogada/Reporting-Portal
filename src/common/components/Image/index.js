import React from 'react';
import { ImageComponent } from './styledComponent.js';

class Image extends React.Component {
   render() {
      const { source, alt, width, height, className, onClickImage ,dataId} = this.props;
      return (
         <ImageComponent src={source} alt={alt} width={width} height={height} className={className} onClick={onClickImage} data-testid={dataId}/>
      );
   }
}

export { Image };
