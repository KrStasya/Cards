import React, {MouseEvent} from 'react';
import styles from '../../styles/Modal.module.scss'
import {useAppSelector} from "../../../bll/store";

type ModalTemplateT = {
   isOpen: boolean
   onClose: (show: boolean) => void
   animatePreset?: 'slideInTop' | 'scaleCenter'
}

export const ModalTemplate: React.FC<ModalTemplateT> = (props) => {
   const {onClose, isOpen, children, animatePreset} = props

   const loading = useAppSelector<boolean>(state => state.app.loading)

   const closeModal = () => onClose(false)
   const stopPropagation = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation()
   
   const modalAnimate = animatePreset === undefined ? styles.slideInTop :
      animatePreset === 'scaleCenter' ? styles.scaleCenter : styles.slideInTop;

   const contentClassName = isOpen ? `${styles.content} ${modalAnimate} ${styles.active}` : `${styles.content} ${modalAnimate}`
   const modalClassName = isOpen ? `${styles.wrapperDefault}  ${styles.active}` : styles.wrapperDefault

   return (
      <div
         onClick={closeModal}
         className={`${modalClassName} ${loading ? styles.loading : ''}`}>
         <div
            onClick={stopPropagation}
            className={contentClassName}>
            {children}
         </div>
      </div>
   )
}