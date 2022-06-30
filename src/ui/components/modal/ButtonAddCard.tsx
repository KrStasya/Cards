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
import {useDispatch} from "react-redux";
import {addCardForPack} from "../../../bll/cards-reducer";
import {useParams} from "react-router-dom";



export const ButtonAddCard = () => {
   const [open, setOpen] = useState<boolean>(false)
    const {cardsPack_id} = useParams()
   const openModal = () => setOpen(true)
   const closeModal = () => setOpen(false)

   const dispatch = useDispatch()

   const schema = yup.object().shape({
      question: yup
         .string()
         .required('Card name is a required field!'),
      answer: yup
          .string(),
   })

   const {register, reset, handleSubmit, formState: {errors}} = useForm<FormDataT>({
      mode: "onChange",
      resolver: yupResolver(schema),
      defaultValues: {
         question: '',
         answer:'',
      }
   })

   const onSubmit: SubmitHandler<FormDataT> = (data) => {
      dispatch(addCardForPack({...data, cardsPack_id}))
      reset()
      closeModal()
   }

   return (
      <>
         <Button width={'180px'} onClick={openModal}>
            Add new card
         </Button>

         <ModalTemplate animatePreset={'scaleCenter'} isOpen={open} onClose={setOpen}>

           <form onSubmit={handleSubmit(onSubmit)} className={styles.modalAddPack}>
              <div className={styles.addPackHeader}>
                  <span>Add new card</span>
                  <span onClick={closeModal} className={styles.close}><ReactSVG src={close}/></span>
               </div>


               <div className={styles.inputWrap}>
                  {!!errors.question && <div className={styles.errorMes}>{errors.question.message}</div>}

                  <Input
                      label={'Add question'}
                      {...register("question", {required: true})}/>
               </div>
               <div className={styles.inputWrap}>
                  {!!errors.answer && <div className={styles.errorMes}>{errors.answer.message}</div>}

                  <Input
                      label={'Add answer'}
                      {...register("answer", )}/>
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
   question: string,
   answer:string
}