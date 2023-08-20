'use client';
import React from 'react';

function Counter() {
  // SSR、クライアントともに常にゼロ → ハイドレーションの不一致が生じない
  const [count, setCount] = React.useState(0);

  // useEffect を使い、クライアントのレンダリング後のみで実行させる
  React.useEffect(() => {
    const savedValue = window.localStorage.getItem('saved-count');

    // SSR では localStorage が存在しないため、null が返る
    if (savedValue === null) {
      return;
    }

    // クライアントで localStorage から値を取得
    setCount(Number(savedValue));
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem('saved-count', String(count));
  }, [count]);

  return (
    <button
      className="count-btn"
      onClick={() => setCount(count + 1)}
    >
      Count: {count}
    </button>
  );
}

export default Counter;
