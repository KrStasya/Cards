import {setFeedback, setLoading} from "../bll/app-reducer";
import {Dispatch} from "redux";

export const errorHandler = (error: any, dispatch: Dispatch) => {
   const message = error.response ? error.response.data.error : `${error.message} more information in the console`

   dispatch(setFeedback(message, true, true))
   setTimeout(() => dispatch(setFeedback(message, false, false)), 2000)
   dispatch(setLoading(false))
}