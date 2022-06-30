import {CardsT, cardsApi, RequestGetCardsT, RequestAddCardsT, updateCardDataT} from "../dal/cardsApi";
import {RootActionT, ThunkActionT} from "./store";
import {CardPacksT} from "../dal/pakcApi";
import {setFeedback, setLoading} from "./app-reducer";
import {errorHandler} from "../utils/errorHandler";
import {feedbackHandler} from "../utils/feedbackHandler";
import {Dispatch} from "redux";



const initialState: InitialStateT = {
   requestCards: {
      cardsPack_id: '',
      pageCount: 5,
      cardQuestion: '',
      page: 0,
   },
   uiOptions: {
      maxPage: 0,
      cardsTotalCount: 0
   },
   cards: [],
   currentCard: null,
   currentCardRating: null
}

export const cardsReducer = (state: InitialStateT = initialState, action: CardsActionsT): InitialStateT => {
   switch (action.type) {
      case "cards/SET_PAGE":
      case "cards/SET_PAGE_COUNT":
      case "card/SET_CARDS_QUESTION":
         return {...state, requestCards: {...state.requestCards, ...action.payload}}

      case "cards/SET_CURRENT_CARD":
      case "cards/SET_CARDS":
         return {...state, ...action.payload}

      case "packs/SET_TOTAL_CARDS_COUNT":
         return {
            ...state,
            uiOptions: {
               ...state.uiOptions,
               ...action.payload,
               maxPage: Math.ceil(action.payload.cardsTotalCount / state.requestCards.pageCount)
            }
         }

      default:
         return state
   }
}


export const setCardPackPage = (page: number) => ({type: 'cards/SET_PAGE', payload: {page}} as const)
export const setCardPageCount = (pageCount: number) => ({type: 'cards/SET_PAGE_COUNT', payload: {pageCount}} as const)
export const setCards = (cards: CardsT[]) => ({type: 'cards/SET_CARDS', payload: {cards}} as const)
export const setCurrentCard = (currentCard: CardsT) => ({
   type: 'cards/SET_CURRENT_CARD',
   payload: {currentCard}
} as const)
export const setPack = (currentPack: CardPacksT) => ({type: 'cards/SET_PACK', payload: {currentPack}} as const)
export const setTotalCardsCount = (cardsTotalCount: number) => ({
   type: 'packs/SET_TOTAL_CARDS_COUNT',
   payload: {cardsTotalCount}
} as const)
export const setCardQuestion = (cardQuestion: string) => ({
   type: 'card/SET_CARDS_QUESTION',
   payload: {cardQuestion}
} as const)


export const fetchCardsForPacks = (cardsPack_id: string, pageCount?: number): ThunkActionT => async (dispatch, getState) => {
   try {
      if (getState().auth.userData !== null) {
         const state = getState().cards.requestCards

         dispatch(setLoading(true))

         const cards = await cardsApi.getCardsForPack({
            ...state,
            cardsPack_id,
            pageCount: pageCount ? pageCount : state.pageCount
         })
         dispatch(setCards(cards.cards))

         dispatch(setTotalCardsCount(cards.cardsTotalCount))

         dispatch(setLoading(false))
      }

   } catch (e: any) {
      errorHandler(e, dispatch)
   }
}

export const changeCardRating = (data: { grade: number, card_id: string }): ThunkActionT => async (dispatch) => {
   try {
      dispatch(setLoading(true))

      await cardsApi.changeCardRating(data)

      dispatch(setLoading(false))

      feedbackHandler('Rating sent!', dispatch)
   } catch (e) {
      errorHandler(e, dispatch)
   }
}

export const crudCard = async (dispatch: Dispatch<RootActionT> | any, apiMethod: () => Promise<any>, message: string,cardsPack_id:string) => {
   try {
      dispatch(setLoading(true))

      await apiMethod()

      dispatch(fetchCardsForPacks(cardsPack_id))

      dispatch(setFeedback(message, true))
      setTimeout(() => dispatch(setFeedback(message, false)), 2000)
   } catch (e) {
      errorHandler(e, dispatch)
   }
}

export const addCardForPack = (data: RequestAddCardsT): ThunkActionT => (dispatch) => {
   crudCard(dispatch, () => cardsApi.addCard(data), `Pack  added!`,data.cardsPack_id as string)
}

export const deleteCard = (cardsPack_id:string, id: string, question: string): ThunkActionT => (dispatch) => {
   crudCard(dispatch, () => cardsApi.deleteCard(id), `Pack '${question}' delete!`,cardsPack_id)
}

export const editCard = (cardsPack_id:string,id:string,question:string,answer:string): ThunkActionT => (dispatch) => {
   crudCard(dispatch, () => cardsApi.editCard({id,question,answer}), `Pack question changed to!`,cardsPack_id)
}


type uiOptionsT = {
   cardsTotalCount: number
   maxPage: number
}

export type InitialStateT = {
   requestCards: RequestGetCardsT
   uiOptions: uiOptionsT
   currentCard: null | CardsT
   currentCardRating: null | number
   cards: CardsT[]
}

export type CardsActionsT =
   ReturnType<typeof setCards>
   | ReturnType<typeof setTotalCardsCount>
   | ReturnType<typeof setCardPackPage>
   | ReturnType<typeof setCardPageCount>
   | ReturnType<typeof setCardQuestion>
   | ReturnType<typeof setCurrentCard>