import React, {ChangeEvent, useCallback, useEffect} from 'react';
import {Link, Navigate, useParams} from "react-router-dom";
import {Spinner} from "../common/Spinner";
import {useAppSelector} from "../../../bll/store";
import styles from "../../styles/CardList.module.scss";
import {Input} from "../common/Input";
import {useDispatch} from "react-redux";
import {

   fetchCardsForPacks,
   setCardPackPage,
   setCardPageCount,
   setCardQuestion
} from "../../../bll/cards-reducer";
import {CardsT,} from "../../../dal/cardsApi";
import {Rating} from "react-simple-star-rating";
import {PATH} from "../../router/Routes";
import {Pagination} from "../common/Pagination";
import {Select} from "../common/Select";
import {debounce} from "../../../utils/debounce";
import {authStatuses} from "../../../bll/auth-reducer";
import {ResponseUserDataT} from "../../../dal/authApi";
import {ButtonAddCard} from "../../components/modal/ButtonAddCard";
import {ButtonDeleteCard} from "../../components/modal/ButtonDeleteCard";
import {ButtonEditCard} from "../../components/modal/ButtonEditCard";


export const CardsList = () => {
   const dispatch = useDispatch()
   const {cardsPack_id, packName} = useParams()

   const userData = useAppSelector<ResponseUserDataT | null>(state => state.auth.userData)
   const loading = useAppSelector<boolean>(state => state.app.loading)
   const cards = useAppSelector<CardsT[]>(state => state.cards.cards)
   const myId = useAppSelector<string | undefined>(state => state.auth.userData?._id)
   const pageCount = useAppSelector<number>(state => state.cards.requestCards.pageCount)
   const maxPage = useAppSelector<number>(state => state.cards.uiOptions.maxPage)
   const cardQuestion = useAppSelector<string>(state => state.cards.requestCards.cardQuestion)
   const page = useAppSelector<number>(state => state.cards.requestCards.page)
   const authStatus = useAppSelector<authStatuses>(state => state.auth.authStatus)


   const onPageChange = useCallback((page: number) => dispatch(setCardPackPage(page)), [dispatch])
   const onSelectChange = useCallback((pageCount: number) => dispatch(setCardPageCount(pageCount)), [dispatch])
   const onChangeInputSearch = debounce((e: ChangeEvent<HTMLInputElement>) => dispatch(setCardQuestion(e.target.value)))
   const onStarClick = (rate: number) => {
   }


   const cardsList = cards.map((el, index) => (
      <Cards
         key={el._id}
         isOwner={myId === el.user_id}
         bgColor={index % 2 === 0 ? '#fff' : '#F8F7FD'}
         answer={el.answer}
         update={el.updated.split(':')[0].slice(0, -3)}
         grade={el.grade}
         _id={el._id}
         question={el.question}
         cardsPack_id={el.cardsPack_id}
         onStarClick={onStarClick}
      />
   ))


   useEffect(() => {
      if (!loading) dispatch(fetchCardsForPacks(cardsPack_id as string))

   }, [cardQuestion, maxPage, pageCount, page, userData])

   if (authStatus === authStatuses.LOGIN) return <Navigate to={PATH.LOGIN}/>

   return (
      <>
         {loading && <Spinner/>}

         <div className={loading ? `${styles.wrapper} ${styles.loading}` : styles.wrapper}>
            <div className={styles.linkBack}>
               <Link className={styles.linkCard} to={PATH.PACKS_LIST}>Packs</Link>
               / {packName}
            </div>

            <div className={styles.interaction}>
               <Input onChange={onChangeInputSearch}
                      variant={'outlined'}
                      label={'Search...'}/>

               <ButtonAddCard/>
            </div>

            <div className={styles.column}>
               <ul className={styles.cardsHeader}>
                  <li>Question</li>
                  <li>Answer</li>
                  <li>Last Updated</li>
                  <li>Grade</li>
                  <li>Actions</li>
               </ul>

               <div className={styles.cardsItem}>
                  {!cards.length && <div className={styles.noCards}>This pack is empty.</div>}
                  {cardsList}
               </div>
            </div>

            <div className={styles.cardFooter}>
               <Pagination initialPage={page} onPageChange={onPageChange} pageCount={maxPage}/>
               
               <div className={styles.showCard}>
                  Show
                  <Select onChange={onSelectChange} defaultValue={pageCount} items={[5, 10, 20]}/>
                  Cards per Page
               </div>
            </div>
         </div>
      </>
   )
}

const Cards: React.FC<PacksItemT> = React.memo((
   {
      answer, grade, update,cardsPack_id,
      isOwner, question, bgColor, _id, onStarClick,
   }) => (
   <ul style={{backgroundColor: bgColor}}>
      <li>{question}</li>
      <li>{answer}</li>
      <li>{update}</li>
      <li>
         <Rating
            emptyColor={'#D7D8EF'}
            transition
            fillColor={'#21268F'}
            size={20}
            onClick={onStarClick}
            ratingValue={grade * 20}/>
      </li>
      <li className={styles.cardsActionBtn}>
         {
            isOwner
               ? <>
                   <ButtonDeleteCard cardsPack_id={cardsPack_id} id={_id} question={question}/>
                   <ButtonEditCard cardsPack_id={cardsPack_id} id={_id} question={question} answer={answer}/>
                  <button>Learn</button>
               </>
               : <Link className={styles.cardsLink} to={'#'}>Learn</Link>
         }
      </li>
   </ul>
))

type PacksItemT = {
   question: string
   answer: string
   update: string
   grade: number
   bgColor: string
   isOwner: boolean
   _id: string
   onStarClick: (rate: number) => void
   cardsPack_id:string

}

