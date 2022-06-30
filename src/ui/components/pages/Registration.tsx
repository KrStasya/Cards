import React from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {Link} from "react-router-dom";

import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {PATH} from '../../router/Routes';
import styles from '../../styles/Form.module.scss'

import {Input} from "../common/Input";
import {Button} from "../common/Button";
import {registrationNewUser} from '../../../bll/auth-reducer';
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../bll/store";


type FormValues = {
    email: string;
    password: string;
    repeatPassword: string;

};

export const Registration = () => {
    const feedbackMessage = useAppSelector<string>(state => state.auth.error)

    const dispatch = useDispatch()

    const schema = yup.object().shape({
        email: yup
            .string()
            .email('Email should have correct format!')
            .required('Email is a required field!'),
        password: yup
            .string()
            .required('Password is a required field!'),
        repeatPassword: yup
            .string()
            .required('Password is a required field!')
            .oneOf([yup.ref("password"), null], 'Passwords must match')
    })
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<FormValues>({
            mode: "onChange",
            resolver: yupResolver(schema),
            defaultValues: {
                email: '',
                password: '',
            }
        }
    );

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        dispatch(registrationNewUser(data))
    }

    return (
        <div className={styles.content}>

            <Link className={styles.linkForgot} to={PATH.FORGOT_PASS}>
                Forgot Password
            </Link>

            <h1>It-incubator</h1>

            <span>Registration page</span>

            <div style={{color: "red"}}>{feedbackMessage}</div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputWrap}>
                    {!!errors.email && <div className={styles.errorMes}>{errors.email.message}</div>}
                    <Input type="email"
                           label={"email"}
                           {...register("email")}/>
                </div>
                <div className={styles.inputWrap}>
                    {!!errors.password && <div className={styles.errorMes}>{errors.password.message}</div>}
                    <Input type={"password"}
                           label={"password"}
                           {...register("password", {required: true})}/>
                </div>
                <div className={styles.inputWrap}>
                    {!!errors.repeatPassword && <div className={styles.errorMes}>{errors.repeatPassword.message}</div>}
                    <Input type="password"
                           label={"repeatPassword"}
                           {...register("repeatPassword", {required: true})}/>
                </div>

                <div className={styles.btn}>
                    <Button disabled={!isValid} type={'submit'}>
                        Sign up
                    </Button>
                </div>
            </form>

        </div>
    );
}
