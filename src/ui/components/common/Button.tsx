import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from '../../styles/Button.module.scss'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
   red?: boolean
   onClick?: () => void
   style?: React.CSSProperties
   width?: string
}

export const Button: React.FC<SuperButtonPropsType> = (
   {
      red, className, style,
      onClick,
      width,
      ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
   }
) => {
   const finalClassName = `${red ? s.red : s.defaultBtn} ${className}`
   const onClickHandler = () => {
      if (onClick) onClick()
   }
   return (
      <button
         style={{width: width, ...style}}
         onClick={onClickHandler}
         className={finalClassName}
         {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
      />
   )
}

