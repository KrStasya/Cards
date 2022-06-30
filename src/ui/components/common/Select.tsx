import React, {useState} from 'react';
import styles from '../../styles/PacksList.module.scss'
import {ReactSVG} from "react-svg";
import arrow from "../../images/icons/selectArrow.svg";

type SelectT = {
   items: (string | number)[]
   defaultValue: number
   onChange: (pageCount: number) => void
}

export const Select: React.FC<SelectT> = ({items, defaultValue, onChange}) => {
   const [collapsed, setCollapsed] = useState<boolean>(false)
   const [selectedValue, setSelectedValue] = useState<number | string>(defaultValue)

   window.addEventListener('click', e => {
      const target = e.target as HTMLElement;

      if (target) {
         if (!target.closest(`.${styles.select}`)) {
            setCollapsed(false)
         }
      }
   })

   const onClickHandler = (el: number | string) => {
      setCollapsed(!collapsed)
      setSelectedValue(el)
      onChange(el as number)
   }

   const toggleSelect = () => setCollapsed(!collapsed)

   const ulClassName = collapsed ? `${styles.selectList} ${styles.selectListActive}` : `${styles.selectList}`
   const spanClassName = collapsed ? `${styles.selectedValue} ${styles.selectedValueActive}` : `${styles.selectedValue}`

   return (
      <div className={styles.select}>
         <div className={spanClassName}
              onClick={toggleSelect}>
            <span>
            {selectedValue}
            </span>
            <span className={styles.arrow}>
                 <ReactSVG src={arrow}/>
            </span>
         </div>

         <ul className={ulClassName}>
            {items.map((el, index) =>
               <li
                  onClick={() => onClickHandler(el)}
                  key={index}
                  className={styles.selectItem}>{el}</li>)}
         </ul>
      </div>
   );
};

