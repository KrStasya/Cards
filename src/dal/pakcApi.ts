import axios from "axios";

const instance = axios.create({
   baseURL: "https://neko-back.herokuapp.com/2.0/",
   // baseURL: "http://localhost:7542/2.0/",
   withCredentials: true
})


export const packApi = {
   getPack(data: RequestGetPacksT) {
      return instance.get<GetPackResT>('cards/pack', {params: data})
         .then(res => res.data)
   },
   addPack(data: RequestAddPacksT) {
      return instance.post('cards/pack', {cardsPack: data})
   },
   deletePack(_id: string) {
      return instance.delete(`cards/pack/?id=${_id}`)
   },
   editPack(_id: string, name: string) {
      return instance.put(`cards/pack`, {cardsPack: {_id, name}})
   },

}

type GetPackResT = {
   cardPacks: CardPacksT[]
   cardPacksTotalCount: number
   maxCardsCount: number
   minCardsCount: number
   page: number
   pageCount: number
   token: string
   tokenDeathTime: number
}

export type CardPacksT = {
   cardsCount: number
   created: string
   grade: number
   more_id: string
   name: string
   path: string
   private: false
   rating: number
   shots: number
   type: string
   updated: string
   user_id: string
   user_name: string
   __v: number
   _id: string
}

export type RequestGetPacksT = {
   packName?: string
   min: number
   max: number
   sortPacks?: string
   page: number
   pageCount: number
   user_id?: string
}

type RequestAddPacksT = {
   name: string
   path?: string
   grade?: number
   shots?: number
   rating?: number
   deckCover?: string
   private?: boolean
   type?: string
}