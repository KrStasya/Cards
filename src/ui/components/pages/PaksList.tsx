import React, {MouseEvent, useCallback, useEffect} from 'react';
import styles from '../../styles/PacksList.module.scss'
import {Input} from "../common/Input";
import {Select} from "../common/Select";
import {CardPacksT, RequestGetPacksT} from "../../../dal/pakcApi";
import {useDispatch} from "react-redux";
import {
   fetchPacks,
   setPackPage,
   setPackPageCount,
   setPacksName,
   setSelectedMinMaxRange, setSortPacks,
   setUserID,
} from "../../../bll/packs-reducer";
import {useAppSelector} from "../../../bll/store";
import {Pagination} from "../common/Pagination";
import {Spinner} from "../common/Spinner";
import {debounce} from "../../../utils/debounce";
import {Link, Navigate} from "react-router-dom";
import {PATH} from "../../router/Routes";
import {authStatuses} from "../../../bll/auth-reducer";
import 'rc-slider/assets/index.css';
import {InputRange} from "../common/InputRange";
import {ResponseUserDataT} from "../../../dal/authApi";
import {ButtonDeletePack} from "../modal/ButtonDeletePack";
import {ButtonAddPack} from "../modal/ButtonAddPack";
import {ButtonEditPack} from "../modal/ButtonEditPack";
import arrow from '../../images/icons/sort.svg' 
import {ReactSVG} from "react-svg";

export const PacksList = () => {
   const dispatch = useDispatch()

   const {
      page,
      min,
      max,
      user_id,
      pageCount,
      packName,
      sortPacks
   } = useAppSelector<RequestGetPacksT>(state => state.packs.requestPacks)

   const userData = useAppSelector<ResponseUserDataT | null>(state => state.auth.userData)
   const maxPage = useAppSelector<number>(state => state.packs.uiOptions.maxPage)
   const maxRangeRes = useAppSelector<number>(state => state.packs.uiOptions.maxRangeRes)
   const minRangeRes = useAppSelector<number>(state => state.packs.uiOptions.minRangeRes)
   const packs = useAppSelector<CardPacksT[]>(state => state.packs.packs)
   const loading = useAppSelector<boolean>(state => state.app.loading)
   const authStatus = useAppSelector<authStatuses>(state => state.auth.authStatus)
   const myId = useAppSelector<string | undefined>(state => state.auth.userData?._id)

   const onChangeInputSearch = debounce((value: string) => dispatch(setPacksName(value)))
   const onChangeInputRange = useCallback(debounce((value: number[]) => dispatch(setSelectedMinMaxRange(value[0], value[1]))), [dispatch])
   const onPageChange = useCallback((page: number) => dispatch(setPackPage(page)), [dispatch])
   const onSelectChange = useCallback((pageCount: number) => dispatch(setPackPageCount(pageCount)), [dispatch])

   const onClickMyPacks = () => dispatch(setUserID(myId as string))
   const onClickAllPacks = () => dispatch(setUserID(''))
   const onSortPackCLik = (e: MouseEvent<HTMLSpanElement>) => e.target instanceof HTMLSpanElement && dispatch(setSortPacks(e.target.dataset.sort as string))

   useEffect(() => {
      if (!loading) dispatch(fetchPacks())
   }, [packName, page, pageCount, min, max, user_id, userData, sortPacks])


   useEffect(() => {
      return () => {
         dispatch(setSelectedMinMaxRange(0, 0))
      }
   }, [])

   const packsList = packs.map((el, index) => (
      <PacksItem
         cardsCount={el.cardsCount}
         key={el._id}
         packId={el._id}
         bgColor={index % 2 === 0 ? '#fff' : '#F8F7FD'}
         name={el.name}
         cards={el.cardsCount}
         update={el.updated.split(':')[0].slice(0, -3)}
         created={el.user_name}
         isOwner={el.user_id === myId}/>))

   if (authStatus === authStatuses.LOGIN) return <Navigate to={PATH.LOGIN}/>

   return (
      <>
         {loading && <Spinner/>}

         <div className={loading ? `${styles.wrapper} ${styles.loading}` : styles.wrapper}>
            <div className={styles.leftColumn}>
               <span>Show packs cards</span>

               <div className={styles.btnWrap}>
                  <button onClick={onClickMyPacks} className={user_id && styles.activeBtn}>My</button>
                  <button onClick={onClickAllPacks} className={!user_id ? styles.activeBtn : undefined}>All</button>
               </div>

               <span>Number of cards</span>

               {!user_id && <InputRange onChange={onChangeInputRange} max={maxRangeRes} min={minRangeRes}/>}
               {user_id && <InputRange onChange={onChangeInputRange} max={maxRangeRes} min={minRangeRes}/>}
            </div>

            <div className={styles.rightColumn}>
               <h3>Packs list</h3>

               <div className={styles.interaction}>
                  <Input
                     value={packName}
                     onChangeText={onChangeInputSearch}
                     className={styles.inputSearch}
                     variant={'outlined'}
                     label={'Search...'}/>

                  <ButtonAddPack/>
               </div>

               <div className={styles.packs}>
                  <ul className={styles.packsHeader}>
                     <li className={styles.sort}>
                        Name <span className={styles.arrowSort}> <ReactSVG src={arrow}/></span>

                        <div className={styles.sortList}>
                           <span onClick={onSortPackCLik} data-sort={'0name'}
                                 className={sortPacks === '0name' ? `${styles.sortItem} ${styles.active}` : styles.sortItem}>In descending order</span>
                           <span onClick={onSortPackCLik}
                                 data-sort={'1name'}
                                 className={sortPacks === '1name' ? `${styles.sortItem} ${styles.active}` : styles.sortItem}>In ascending order</span>
                        </div>
                     </li>
                     <li className={styles.sort}>
                        Cards <span className={styles.arrowSort}> <ReactSVG src={arrow}/></span>

                        <div className={styles.sortList}>
                           <span onClick={onSortPackCLik} data-sort={'0cardsCount'}
                                 className={sortPacks === '0cardsCount' ? `${styles.sortItem} ${styles.active}` : styles.sortItem}>In descending order</span>
                           <span onClick={onSortPackCLik}
                                 data-sort={'1cardsCount'}
                                 className={sortPacks === '1cardsCount' ? `${styles.sortItem} ${styles.active}` : styles.sortItem}>In ascending order</span>
                        </div>
                     </li>
                     <li className={styles.sort}>
                        Last Updated <span className={styles.arrowSort}> <ReactSVG src={arrow}/></span>

                        <div className={styles.sortList}>
                           <span onClick={onSortPackCLik} data-sort={'0updated'}
                                 className={sortPacks === '0updated' ? `${styles.sortItem} ${styles.active}` : styles.sortItem}>In descending order</span>
                           <span onClick={onSortPackCLik}
                                 data-sort={'1updated'}
                                 className={sortPacks === '1updated' ? `${styles.sortItem} ${styles.active}` : styles.sortItem}>In ascending order</span>
                        </div>
                     </li>
                     <li>Created by</li>
                     <li>Actions</li>
                  </ul>

                  <div className={styles.packsItem}>
                     {packsList}
                     {!packs.length && <div className={styles.noPacks}>There are no packages here yet.</div>}
                  </div>
               </div>

               <div className={styles.packsFooter}>
                  <Pagination initialPage={page} onPageChange={onPageChange} pageCount={maxPage}/>

                  <div className={styles.showCard}>
                     Show
                     <Select onChange={onSelectChange} defaultValue={pageCount} items={[10, 20, 30]}/>
                     Cards per Page
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}


const PacksItem: React.FC<PacksItemT> = React.memo((
   {
      created, cards, update,
      isOwner, name, bgColor, packId, cardsCount
   }) => (
   <ul style={{backgroundColor: bgColor}}>
      <li><Link className={styles.packsName} to={`/packs-list/${name}/${packId}`}>{name}</Link></li>
      <li>{cards}</li>
      <li>{update}</li>
      <li>{created}</li>
      <li className={styles.packsActionBtn}>
         {
            isOwner
               ? <>
                  <ButtonDeletePack id={packId} packName={name}/>
                  <ButtonEditPack id={packId} name={name}/>
                  <button className={styles.btn}>Learn</button>
               </>
               : <Link to={`/learn-cards/${name}/${cardsCount}/${packId}`} className={styles.btn}>Learn</Link>
         }
      </li>
   </ul>
))

type PacksItemT = {
   name: string
   cards: number
   update: string
   created: string
   bgColor: string
   isOwner: boolean
   packId: string
   cardsCount: number
}

