import React, {ChangeEvent, useEffect, useState} from 'react';
import {CardsT} from "../../../dal/cardsApi";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../bll/store";
import {changeCardRating, fetchCardsForPacks, setCurrentCard} from "../../../bll/cards-reducer";
import {useDispatch} from "react-redux";
import styles from '../../styles/Learn.module.scss'
import {Button} from "../common/Button";
import {Spinner} from "../common/Spinner";

export const LearnCards = () => {
   const dispatch = useDispatch()
   const {cardsPack_id, cardsCount, packName} = useParams()

   const [showAnswer, setShowAnswer] = useState<boolean>(false)
   const [currentCardRating, setCurrentCardRating] = useState<number | null>(null)

   const cards = useAppSelector<CardsT[]>(state => state.cards.cards)
   const loading = useAppSelector<boolean>(state => state.app.loading)
   const currentCardQ = useAppSelector<string | undefined>(state => state.cards.currentCard?.question)
   const currentCardA = useAppSelector<string | undefined>(state => state.cards.currentCard?.answer)
   const currentCardId = useAppSelector<string | undefined>(state => state.cards.currentCard?._id)

   const getCard = (cards: CardsT[]): CardsT => {
      let length = cards.reduce((acc, card) => acc + (6 - card.grade) ** 2, 0);

      const rand = Math.random() * length;

      const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
         }
         , {sum: 0, id: -1});

      let id = 0
      let sum = 0

      while (sum < rand) {
         sum += (6 - cards[id].grade) ** 2
         id++
      }

      return cards[id - 1];
   }

   const onRadioChange = (e: ChangeEvent<HTMLInputElement>) => setCurrentCardRating(Number(e.currentTarget.value))

   const onNextCardClick = async () => {
      await dispatch(changeCardRating({card_id: currentCardId as string, grade: currentCardRating as number}))

      dispatch(setCurrentCard(getCard(cards)))
      setShowAnswer(false)
      setCurrentCardRating(null)
   }

   const onShowAnswerClick = () => {
      setShowAnswer(true)
   }

   useEffect(() => {
      !loading && dispatch(fetchCardsForPacks(cardsPack_id as string, Number(cardsCount)))
   }, [])

   useEffect(() => {
      cards.length && dispatch(setCurrentCard(getCard(cards)))
   }, [cards])

   return (
      <>
         {loading && <Spinner/>}

         <div className={loading ? `${styles.wrapper} ${styles.loading}` : styles.wrapper}>
            <div className={styles.learnCardContent}>
               <span className={styles.title}>Learn "{packName}"</span>

               <div className={styles.question}>
                  <b>Question:</b>
                  <span>{currentCardQ}</span>
               </div>

               {showAnswer &&
               <>
                  <div className={styles.answer}>
                     <b>Answer:</b>
                     <span>{currentCardA}</span>
                  </div>

                  <div className={styles.rate}>
                     <span>Rate yourself:</span>
                     <ul>
                        <li>
                           <label className={styles.checkbox}>
                              <input value={1} onChange={onRadioChange} name={'rate'} type="radio"/>
                              Did not know
                           </label>
                        </li>
                        <li>
                           <label className={styles.checkbox}>
                              <input value={2} onChange={onRadioChange} name={'rate'} type="radio"/>
                              Forgot
                           </label>
                        </li>
                        <li>
                           <label className={styles.checkbox}>
                              <input value={3} onChange={onRadioChange} name={'rate'} type="radio"/>
                              A lot of thought
                           </label>
                        </li>
                        <li>
                           <label className={styles.checkbox}>
                              <input value={4} onChange={onRadioChange} name={'rate'} type="radio"/>
                              Confused
                           </label>
                        </li>
                        <li>
                           <label className={styles.checkbox}>
                              <input value={5} onChange={onRadioChange} name={'rate'} type="radio"/>
                              Knew the answer
                           </label>
                        </li>
                     </ul>
                  </div>
               </>}

               <div className={styles.btnWrap}>
                  <Button>Cancel</Button>
                  {
                     showAnswer
                        ? <Button className={currentCardRating === null ? styles.disabled : ''}
                                  onClick={onNextCardClick}>Next</Button>
                        : <Button onClick={onShowAnswerClick}>Show answer</Button>
                  }
               </div>
            </div>
         </div>
      </>
   )
}

