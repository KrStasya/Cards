import React, {useState} from 'react';
import {ModalTemplate} from "../common/ModalTemplate";
import {Button} from "../common/Button";
import {Input} from "../common/Input";
import styles from "../../styles/Modal.module.scss";
import close from "../../images/icons/x.svg";
import {ReactSVG} from "react-svg";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {editPack} from "../../../bll/packs-reducer";
import {useDispatch} from "react-redux";

export const ButtonEditPack: React.FC<{ id: string, name: string }> = ({name, id}) => {
   const [open, setOpen] = useState<boolean>(false)

   const openModal = () => setOpen(true)
   const closeModal = () => setOpen(false)

   const dispatch = useDispatch()

   const schema = yup.object().shape({
      name: yup
         .string()
         .required('Pack name is a required field!'),
   })

   const {register, reset, handleSubmit, formState: {errors}} = useForm<FormDataT>({
      mode: "onChange",
      resolver: yupResolver(schema),
      defaultValues: {
         name: '',
      }
   })

   const onSubmit: SubmitHandler<FormDataT> = (data) => {
      dispatch(editPack(id,data.name))
      reset()
      closeModal()
   }

   return (
      <>
         <button className={styles.btnEdit} onClick={openModal}>Edit</button>

         <ModalTemplate animatePreset={'scaleCenter'} isOpen={open} onClose={setOpen}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.modalAddPack}>
               <div className={styles.addPackHeader}>
                  <span>Change pack: <b>{name}</b></span>
                  <span onClick={closeModal} className={styles.close}><ReactSVG src={close}/></span>
               </div>


               <div className={styles.inputWrap}>
                  {!!errors.name && <div className={styles.errorMes}>{errors.name.message}</div>}

                  <Input
                     label={'New pack name'}
                     {...register("name", {required: true})}/>
               </div>

               <div className={styles.addPackBtn}>
                  <Button onClick={closeModal}>Cancel</Button>
                  <Button type={'submit'} onClick={openModal}>Save</Button>
               </div>
            </form>
         </ModalTemplate>
      </>
   );
};

type FormDataT = {
   name: string
}