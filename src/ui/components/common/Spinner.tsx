import style from '../../styles/Spinner.module.scss'
import {ReactSVG} from "react-svg";
import spinner from '../../images/spinner.svg'
import React from "react";


export const Spinner: React.FC<{ center?: boolean }> = ({center}) => {
   return (
      <div className={center ? `${style.wrap} ${style.center}` : style.wrap}>
         <div className={style.spinner}>
            <ReactSVG src={spinner}/>
         </div>
      </div>
   )
}