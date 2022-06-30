import React from 'react';
import styles from '../../styles/Form.module.scss'
import {Input} from "../common/Input";
import {Button} from "../common/Button";
import {Navigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {authStatuses, setNewPassword} from "../../../bll/auth-reducer";
import {useAppSelector} from "../../../bll/store";
import {PATH} from "../../router/Routes";

export const SetNewPass = () => {
   const authStatus = useAppSelector<authStatuses>(state => state.auth.authStatus)

   const {token} = useParams()

   const dispatch = useDispatch()

   const schema = yup.object().shape({
      password: yup
         .string()
         .required('Password is a required field!'),
   })

   const {register, handleSubmit, formState: {errors}} = useForm<FormDataT>({
      mode: "onChange",
      resolver: yupResolver(schema),
      defaultValues: {
         password: '',
      }
   })

   const onSubmit: SubmitHandler<FormDataT> = async (data) => dispatch(setNewPassword(data.password, token as string))

   if (authStatus === authStatuses.PASS_CHANGED) return <Navigate to={PATH.LOGIN}/>

   return (
      <form onSubmit={handleSubmit(onSubmit)} className={styles.contentNewPass}>
         <h2>It-incubator</h2>
         <span> Create new password</span>

         <div className={styles.inputWrap}>
            {!!errors.password && <div className={styles.errorMes}>{errors.password.message}</div>}

            <Input
               type={'password'}
               label={'Password'}
               {...register("password", {required: true})}/>
         </div>

         <p>
            Create new password and we will send you further instructions to email
         </p>

         <Button type={'submit'}>Create new password</Button>
      </form>
   )
}

type FormDataT = {
   password: string
}