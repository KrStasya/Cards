import React, {useState} from 'react';
import {ModalTemplate} from "../common/ModalTemplate";
import {Button} from "../common/Button";
import styles from "../../styles/Modal.module.scss";
import close from "../../images/icons/x.svg";
import {ReactSVG} from "react-svg";
import {useDispatch} from "react-redux";
import {deletePack} from "../../../bll/packs-reducer";

export const ButtonDeletePack: React.FC<{ id: string, packName: string }> = ({id, packName}) => {
   const [open, setOpen] = useState<boolean>(false)

   const openModal = () => setOpen(true)
   const closeModal = () => setOpen(false)

   const dispatch = useDispatch()

   const onDeletePackClick = () => {
      dispatch(deletePack(id, packName))
      closeModal()
   }

   return (
      <>
         <button className={styles.delete} onClick={openModal}>Delete</button>

         <ModalTemplate animatePreset={'scaleCenter'} isOpen={open} onClose={setOpen}>
            <div className={styles.modalDeletePack}>
               <div className={styles.deletePackHeader}>
                  <span>Delete Pack</span>

                  <span onClick={closeModal} className={styles.close}><ReactSVG src={close}/></span>
               </div>


               <p className={styles.deleteDesc}>
                  Do you really want to remove <span>Pack Name - {packName}</span>?
                  <br/>
                  All cards will be excluded from this course.
               </p>

               <div className={styles.deletePackBtn}>
                  <Button onClick={closeModal}>Cancel</Button>

                  <Button red onClick={onDeletePackClick}>Delete</Button>
               </div>
            </div>
         </ModalTemplate>
      </>
   );
};

