import { getAnalytics, logEvent as log } from 'firebase/analytics';

// タスク関連イベントシグネチャ
function logEvent(key: 'add_task'): void;
function logEvent(key: 'update_task'): void;
function logEvent(key: 'delete_task'): void;

// ログイン関連イベントシグネチャ
function logEvent(key: 'login', value: { method: 'email' | 'google' }): void;
function logEvent(key: 'sign_up', value: { method: 'email' | 'google' }): void;
function logEvent(key: 'logout'): void;

// イベントログの処理
function logEvent(key: string, value?: object) {
  if (typeof window == 'undefined') return; // レンダリング後のみ有効

  const analytics = getAnalytics();
  log(analytics, key, value);
}

export { logEvent };
