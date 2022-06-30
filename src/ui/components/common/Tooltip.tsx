import React from 'react';
import styles from "../../styles/Form.module.scss";
import {useAppSelector} from "../../../bll/store";

export const Tooltip = () => {
   const showTooltip = useAppSelector<boolean>(state => state.app.showTooltip)
   const feedbackMessage = useAppSelector<string>(state => state.app.feedbackMessage)
   const className = showTooltip ? `${styles.errorFeedback} ${styles.errorFeedbackActive}` : styles.errorFeedback

   return (
      <div className={className}>
         <span>{feedbackMessage}</span>
      </div>
   );
};

