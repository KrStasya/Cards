import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps} from 'react'
import s from '../../styles/Radio.module.scss'

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
   options?: string[]
   onChangeOption?: (option: string) => void
}

export const Radio: React.FC<SuperRadioPropsType> = (
   {
      type, name,
      options, value,
      onChange, onChangeOption,
      ...restProps
   }
) => {
   const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e)

      onChangeOption && onChangeOption(e.currentTarget.value)
      // onChange, onChangeOption
   }

   const onClickHandler = (value: string) => onChangeOption && onChangeOption(value)


   const mappedOptions: JSX.Element[] = options
      ? options.map((o, i) => ( // map options with key
         <div key={name + '-' + i} className={s.radio}>
            <input
               className={s.radioInput}
               type={'radio'}
               name={o}
               value={o}
               checked={value === o}
               onChange={onChangeCallback}
               // name, checked, value, onChange
            />
            <label onClick={() => onClickHandler(o)} className={s.radioLabel}>
               {o}</label>
         </div>

      ))
      : []

   return (
      <div className={s.wrapper}>
         {!options?.length && <div>Add options to props</div>}
         {mappedOptions}
      </div>
   )
}

