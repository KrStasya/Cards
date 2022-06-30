import React, {useCallback, useEffect, useState, useRef} from "react";
import styles from "../../styles/DoubleRangeInput.module.scss";

type DoubleRangeT = {
   min: number
   max: number
   onChange: (min: number, max: number) => void
}

export const DoubleRangeInput = React.memo(({min, max, onChange}: DoubleRangeT) => {
   const [minVal, setMinVal] = useState(min);
   const [maxVal, setMaxVal] = useState(max);
   const minValRef = useRef(min);
   const maxValRef = useRef(max);
   const range = useRef<HTMLInputElement>(null);

   const getPercent = useCallback(
      (value) => Math.round(((value - min) / (max - min)) * 100),
      [min, max]
   );

   useEffect(() => {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxValRef.current);

      if (range.current) {
         range.current.style.left = `${minPercent + 1}%`;
         range.current.style.width = `${maxPercent - minPercent}%`;
      }
   }, [minVal, getPercent, min]);

   useEffect(() => {
      const minPercent = getPercent(minValRef.current);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
         range.current.style.width = `${maxPercent - minPercent}%`;
      }
   }, [maxVal, getPercent, max]);

   useEffect(() => {
      onChange(minVal, maxVal);
   }, [minVal, maxVal]);

   return (
      <div className={styles.container}>
         <input
            type="range"
            min={min}
            max={max}
            value={minVal}
            onChange={(event) => {
               const value = Math.min(Number(event.target.value), maxVal - 1);
               setMinVal(value);
               minValRef.current = value;
            }}
            className={`${styles.thumb} ${styles.thumbLeft}`}
            style={{zIndex: minVal > max - 100 ? "5" : undefined}}
         />


         <input
            type="range"
            min={min}
            max={max}
            value={maxVal}
            onChange={(event) => {
               const value = Math.max(Number(event.target.value), minVal + 1);
               setMaxVal(value);
               maxValRef.current = value;
            }}
            className={`${styles.thumb} ${styles.thumbRight}`}
         />

         <div className={styles.slider}>
            <div className={styles.sliderTrack}/>
            <div ref={range} className={styles.sliderRange}/>
            <div className={`${styles.defaultStyle} ${styles.sliderLeftValue}`}>{minVal}</div>
            <div className={`${styles.defaultStyle} ${styles.sliderRightValue}`}>{maxVal}</div>
         </div>
      </div>
   )
})
