import React, {useState} from 'react';
import {Range} from "rc-slider";
import styles from "../../styles/Range.module.scss";

export const InputRange: React.FC<InputRangeT> = React.memo(({min, max, onChange}) => {
   const [minVal, setMinVal] = useState(min);
   const [maxVal, setMaxVal] = useState(max);

   const oChangeHandler = (value: number[]) => {
      setMinVal(value[0])
      setMaxVal(value[1])
      onChange(value)
   }

   return (
      <div className={styles.wrap}>
         <Range
            railStyle={{backgroundColor: '#9A91C8', height: '6px'}}
            trackStyle={[{backgroundColor: '#21268F', height: '6px'}]}
            defaultValue={[min, max]}
            onChange={oChangeHandler}
            max={max}
            min={min}/>

         <div className={styles.wrapValue}>
            <div className={styles.minRange}>{minVal}</div>
            <div className={styles.maxRange}>{maxVal}</div>
         </div>
      </div>
   )
})

type InputRangeT = {
   max: number
   min: number
   onChange: (value: number[]) => void
}