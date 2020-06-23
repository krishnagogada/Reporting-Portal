import React from 'react';
import { ImageComponent } from './styledComponent';

type imageProps={
   source:string
   alt:string
   className:any
   onClickImage?:()=>void
   dataId?:string
}

class Image extends React.Component<imageProps>{
   render() {
      const { source, alt, className, onClickImage ,dataId} = this.props;
      return (
         <ImageComponent src={source} alt={alt} className={className} onClick={onClickImage} data-testid={dataId}/>
      );
   }
}

export { Image };
