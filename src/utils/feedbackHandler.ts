import {Dispatch} from "redux";
import {setFeedback} from "../bll/app-reducer";

export const feedbackHandler = (message: any, dispatch: Dispatch) => {
   dispatch(setFeedback(message, true, true))
   setTimeout(() => dispatch(setFeedback(message, false, false)), 2000)
}