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

// page_view用のパラメータ
type PageParams = {
  page_title?: string;
  page_location?: string;
  page_path?: string;
};

// ページビューログの処理
function logPage(params: PageParams) {
  if (typeof window == 'undefined') return; // レンダリング後のみ有効

  const analytics = getAnalytics();
  log(analytics, 'page_view', params);
}

export { logEvent, logPage };
