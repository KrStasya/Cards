import React, {useState} from 'react';
import {Button} from "../common/Button";
import {Input} from '../common/Input';
import styles from '../../styles/Test.module.scss'
import {Checkbox} from "../common/Checkbox";
import {Radio} from "../common/Radio";
import {Link} from "react-router-dom";
import {PATH} from "../../router/Routes";
import {ModalTemplate} from "../common/ModalTemplate";
import {ButtonAddPack} from "../modal/ButtonAddPack";
import {ButtonDeletePack} from "../modal/ButtonDeletePack";

export const TestPage = () => {
   const options = ['1', '2', '3']
   const [value, setValue] = useState(options[0])

   const showModal = () => true

   return (
      <>
         <h2>Test page </h2>

         <ul className={styles.list}>
            <li className={styles.logo}><Link to={PATH.LOGIN}>It-incubator</Link></li>
            <li><Link to={PATH.LOGIN}>Login</Link></li>
            <li><Link to={PATH.REGISTRATION}>Registration</Link></li>
            <li><Link to={PATH.PROFILE}>Profile</Link></li>
            <li><Link to={PATH.FORGOT_PASS}>Recover password</Link></li>
            <li><Link to={PATH.SET_NEW_PASS}>Enter new password</Link></li>
            <li><Link to={PATH.TEST}>Test page</Link></li>
         </ul>


         <div style={{backgroundColor: 'white'}}>


            <div className={styles.wrapper}>
               <div style={{width: '200px', margin: '0 20px'}}>
                  <Button>
                     Button
                  </Button>
               </div>


               <Input/>

               <Checkbox>
                  Checkbox
               </Checkbox>

               <Radio value={value} onChangeOption={setValue} options={options}/>

            </div>


         </div>


      </>

   );
};

