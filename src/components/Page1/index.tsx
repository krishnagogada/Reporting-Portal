import React ,{useState}from 'react'
import {observer} from 'mobx-react'
import {observable} from 'mobx'
import tw from 'tailwind.macro'
@observer
class Page1 extends React.Component {
   @observable isShown:boolean=false
   @observable isShownContent=false
   whenMouseEnter=()=>{
      this.isShown=true
   }
   whenMouseLeave=()=>{
      this.isShown=false
   }
   onClickAddContent=()=>{
      this.isShownContent=true
   }
   onClickRemoveContent=()=>{
      this.isShownContent=false
   }
   render() {
      return(
         <div className={'flex flex-col justify-center items-center h-screen'}>
            <div>
               {this.isShown?
               <div onMouseEnter={this.whenMouseEnter} onMouseLeave={this.whenMouseLeave} className={`flex justify-center items-center border border-solid border-black w-64 h-64 cursor-pointer`}>
                  <button className={'bg-blue-600 rounded p-2 text-white'} onClick={this.onClickAddContent}>Add Content</button>
               </div>:
               <p onMouseEnter={this.whenMouseEnter} onMouseLeave={this.whenMouseLeave} className={`flex justify-center items-center border border-solid border-black w-32 h-32 cursor-pointer`}>Page 1</p>}
            </div>
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
export default Page1
