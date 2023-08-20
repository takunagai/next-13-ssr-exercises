'use client';
import React from 'react';
import Spinner from '../Spinner';

function Counter() {
  // SSR、クライアントともに常にnull → ハイドレーションの不一致が生じない
  const [count, setCount] = React.useState(null);

  // useEffect を使い、クライアントのレンダリング後のみで実行させる
  React.useEffect(() => {
    const savedValue = window.localStorage.getItem('saved-count');

    // 値が読み込めたらその値を(クライアント)。でなければ0を設定(SSR)
    setCount(savedValue ? Number(savedValue) : 0);
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem('saved-count', String(count));
  }, [count]);

  return (
    <button
      className="count-btn"
      onClick={() => setCount(count + 1)}
    >
      Count: {' ' /* number があれば値を、無ければスピナーを表示 */}
      {typeof count === 'number' ? count : <Spinner />}
    </button>
  );
}

export default Counter;
