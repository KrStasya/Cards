import React, {
   ChangeEvent,
   CSSProperties,
   DetailedHTMLProps,
   forwardRef,
   InputHTMLAttributes,
   KeyboardEvent
} from 'react'
import s from '../../styles/Input.module.scss'


// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
   onChangeText?: (value: string) => void
   onEnter?: () => void
   error?: string
   spanClassName?: string
   label?: string
   variant?: 'standard' | 'outlined'
   margin?: 'none' | 'normal' | 'dense' | 'minimal'
   width?: string
}

export const Input = forwardRef<HTMLInputElement, SuperInputTextPropsType>(
   (props, ref) => {

      const {
         type,
         onChange, onChangeText,
         onKeyPress, onEnter,
         error,
         className, spanClassName,
         label,
         variant,
         margin,
         width,
         value,
         ...restProps
      } = props


      const labelTextDefault = label ? label : 'Enter text'
      const finalInputClassName = variant === undefined ? s.standard :
         variant === 'outlined' ? s.outlined : s.standard

      const finalLabelClassName = variant === undefined ? s.standardLabel :
         variant === 'outlined' ? s.outlinedLabel : s.standardLabel

      const marginStyle: CSSProperties = {
         margin: margin === undefined ? '20px 0'
            : margin === 'none' ? '0' :
               margin === 'minimal' ? '10px ' :
                  margin === 'normal' ? '20px 0' : '30px 0'
      }


      const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
         onChange // если есть пропс onChange
         && onChange(e) // то передать ему е (поскольку onChange не обязателен)

         onChangeText && onChangeText(e.currentTarget.value);

      }

      const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
         onKeyPress && onKeyPress(e);

         onEnter // если есть пропс onEnter
         && e.key === 'Enter' // и если нажата кнопка Enter
         && onEnter() // то вызвать его

      }

      return (
         <div style={{width, ...marginStyle}} className={`${s.inputWrap} ${className}`}>
            <input
               defaultValue={value}
               placeholder=' '
               onChange={onChangeCallback}
               onKeyPress={onKeyPressCallback}
               className={finalInputClassName}
               type={type}
               ref={ref}
               {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
            />
            <label className={finalLabelClassName}>{labelTextDefault}</label>
         </div>
      )
   })

