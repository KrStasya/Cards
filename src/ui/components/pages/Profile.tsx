import React, {useEffect} from 'react';
import {authStatuses, fetchMe} from "../../../bll/auth-reducer";
import {useDispatch} from "react-redux";
import {Navigate} from "react-router-dom";
import {PATH} from "../../router/Routes";
import {useAppSelector} from "../../../bll/store";

export const Profile = () => {
   const dispatch = useDispatch()
   const authStatus = useAppSelector<authStatuses>(state => state.auth.authStatus)

   useEffect(() => {
      dispatch(fetchMe())
   }, [])

   if (authStatus === authStatuses.LOGIN) return <Navigate to={PATH.LOGIN}/>

   return (
      <div>
         Profile page
      </div>
   );
};

