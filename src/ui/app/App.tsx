import React, {useEffect} from 'react';
import {Router} from "../router/Routes";
import {Tooltip} from "../components/common/Tooltip";
import {useAppSelector} from '../../bll/store';
import {authStatuses, firstFetchMe} from "../../bll/auth-reducer";
import {Spinner} from "../components/common/Spinner";
import {useDispatch} from "react-redux";

const App = () => {
   const authStatus = useAppSelector<authStatuses>(state => state.auth.authStatus)

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(firstFetchMe())
   }, [])

   if (authStatus === authStatuses.LOADING) return <Spinner center/>

   return (
      <main>
         <Tooltip/>
         <Router/>
      </main>
   )
}


export default App;
