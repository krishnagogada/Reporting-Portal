import React ,{useState}from 'react'
import {observer} from 'mobx-react'
import {observable} from 'mobx'
import tw from 'tailwind.macro'

import './index.css'
@observer
class Page1 extends React.Component {
   @observable isShownContent=false
   listOfBlocks=["Block 1","Block 2","Block 3","Block 4","Block 5","Block 6","Block 7","Block 8","Block 9","Block 10"]

   onClickAddContent=()=>{
      this.isShownContent=true
   }
   onClickRemoveContent=()=>{
      this.isShownContent=false
   }
   renderBlocks=()=>{
      return(
         this.listOfBlocks.map((eachBlock)=>{
            return(
               <EachBlockHover blockContent={eachBlock} onClickAddContent={this.onClickAddContent}/>
            )
         })
      )
   }
   render() {
      return(
         <div className={'flex flex-col justify-center items-center h-screen'}>
            <div className={'flex justify-around items-center w-screen'}>{this.renderBlocks()}</div>
            {this.isShownContent?<div className={`flex flex-col justify-center items-center border border-solid border-black cursor-pointer mt-20`}>
               <p className={'my-12'}>Kurpaa konam lo chudala... Vadi meedha surya kiranallu nitaranga padutunay...</p>
               <img src={'https://lh3.googleusercontent.com/proxy/0MLfn6j_isd7W7AwOJGvrzDHP_mk5Ci7xvR2Juo6b9VMu37zvHVYyNsQzsXRD-ewZfRdL_VzRR5p2W25ipdYrFm2BPFkQIbm23N9f9HgYxylwyYgGOJw4YJopu6YdQ'}/>
               <button className={'flex justify-center items-center p-2 text-2xl my-12 bg-red-600 text-white w-12'} onClick={this.onClickRemoveContent}>x</button>
            </div>:
            null}
            
         
         </div>
      )
   }
}

type EachBlockHoverProps={
   blockContent:string
   onClickAddContent:()=>void
}
@observer
class EachBlockHover extends React.Component<EachBlockHoverProps>{
   @observable isShown:boolean=false
   
   whenMouseEnter=()=>{
      this.isShown=true
   }
   whenMouseLeave=()=>{
      this.isShown=false
   }
   onClickAddContent=()=>{
      this.props.onClickAddContent()
   }
   
   render(){
      const {blockContent}=this.props
      return(
         <div>
               {this.isShown?
               <div onMouseEnter={this.whenMouseEnter} onMouseLeave={this.whenMouseLeave} className={`flex justify-center items-center border border-solid border-black block-hover w-32 h-32`}>
                  <button className={'bg-blue-600 rounded p-2 text-white'} onClick={this.onClickAddContent}>Add Content</button>
               </div>:
               <p onMouseEnter={this.whenMouseEnter} onMouseLeave={this.whenMouseLeave} className={`flex justify-center items-center border border-solid border-black w-32 h-32 cursor-pointer`}>{blockContent}</p>}
            </div>
      )
   }
}
export default Page1
