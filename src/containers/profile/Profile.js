import styles from '../session/Session.module.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectSession } from '../session/sessionSlice';

export function Profile() {
  const user = useSelector(selectSession);
  return (
    <div>
      <div className={styles.row}>
        <span className={styles.value}>{user.name}</span>
      </div>
    </div>
  );
}
