import React, {useState} from 'react';
import styles from "../../styles/Form.module.scss";
import {Input} from "../common/Input";
import {Button} from "../common/Button";
import {ReactSVG} from "react-svg";
import emailSvg from "../../images/icons/email.svg";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {forgotPassSendInst} from "../../../bll/auth-reducer";
import * as yup from "yup";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {PATH} from "../../router/Routes";

export const ForgotPass = () => {
   const [successfulSending, setSuccessfulSending] = useState<boolean>(false)
   const [email, setEmail] = useState<string>('')


   const dispatch = useDispatch()

   const schema = yup.object().shape({
      email: yup
         .string()
         .email('Email should have correct format!')
         .required('Email is a required field!'),
   })

   const {register, handleSubmit, formState: {errors}} = useForm<FormDataT>({
      mode: "onChange",
      resolver: yupResolver(schema),
      defaultValues: {
         email: '',
      }
   })

   const onSubmit: SubmitHandler<FormDataT> = async (data) => {
      dispatch(forgotPassSendInst(data.email))
      setSuccessfulSending(true)
      setEmail(data.email)
   }


   return (
      <div className={styles.contentForgot}>
         {successfulSending
            ? <div className={styles.email}>
               <h2>It-incubator</h2>
               {/*<ReactSVG src={emailSvg}/>*/}
               <span>Check Email</span>
               <div className={styles.sent}>We’ve sent an Email with instructions to {email}</div>
            </div>
            : <div className={styles.formWrap}>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <h2>It-incubator</h2>
                  <span className={styles.forgot}>Forgot your password?</span>

                  <div className={styles.inputWrap}>
                     {!!errors.email && <div className={styles.errorMes}>{errors.email.message}</div>}

                     <Input
                        type={'text'}
                        label={'Email'}
                        {...register("email", {required: true})}/>
                  </div>

                  <p>
                     Enter your email address and we will send you further instructions
                  </p>

                  <Button type={'submit'}>Send Instructions</Button>

                  <span className={styles.remember}>Did you remember your password?</span>

                  <Link className={styles.try} to={PATH.LOGIN}>Try logging in</Link>
               </form>
            </div>
         }
      </div>
   );
};

type FormDataT = {
   email: string
}