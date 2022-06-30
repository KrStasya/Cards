import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from 'redux-thunk'
import {PacksActionsT, packsReducer} from "./packs-reducer";
import {AuthActionsT, authReducer} from "./auth-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppActionsT, appReducer} from "./app-reducer";
import {CardsActionsT, cardsReducer} from "./cards-reducer";

const rootReducer = combineReducers({
   app: appReducer,
   auth: authReducer,
   packs: packsReducer,
   cards: cardsReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateT = ReturnType<typeof rootReducer>

export type ThunkActionT = ThunkAction<void, AppRootStateT, unknown, RootActionT>

export const useAppSelector: TypedUseSelectorHook<AppRootStateT> = useSelector

export type RootActionT = AppActionsT | PacksActionsT | AuthActionsT | CardsActionsT

// @ts-ignore
window.store = store;