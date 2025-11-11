// script.common.js または script.home.js に追記

/**
 * Cookie同意バナーの表示・動作ロジック
 */
function setupCookieConsent() {
    const consentBox = document.getElementById('cookie-consent-banner');
    if (!consentBox) return; // バナー要素がない場合は終了

    const acceptBtn = document.getElementById('cookie-accept-btn');
    const rejectBtn = document.getElementById('cookie-reject-btn');
    const consentStatus = localStorage.getItem('cookie_consent_status');

    /**
     * Google Analyticsの同意状態を更新する
     * @param {string} status - 'granted' または 'denied'
     */
    function updateGaConsent(status) {
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'analytics_storage': status,
                'ad_storage': status
            });
            if (status === 'granted') {
                console.log('Cookie同意: 許可 (GAトラッキング有効)');
            } else {
                console.log('Cookie同意: 拒否 (GAトラッキング無効)');
            }
        }
    }

    /**
     * 同意状態をLocalStorageに保存し、GAを更新する
     * @param {string} status - 'accepted' または 'rejected'
     */
    function setConsent(status) {
        localStorage.setItem('cookie_consent_status', status);

        if (status === 'accepted') {
            updateGaConsent('granted');
        } else if (status === 'rejected') {
            updateGaConsent('denied');
        }
        consentBox.classList.remove('show');
    }

    // 1. 同意状態をチェック
    if (consentStatus === 'accepted') {
        updateGaConsent('granted');
        return;
    }

    if (consentStatus === 'rejected') {
        updateGaConsent('denied');
        return;
    }

    // 2. 初回アクセス時、バナーを表示
    setTimeout(() => {
        consentBox.classList.add('show');
    }, 1000); // ロード後に1秒遅延させて表示

    // 3. イベントリスナーを設定
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => setConsent('accepted'));
    }
    if (rejectBtn) {
        rejectBtn.addEventListener('click', () => setConsent('rejected'));
    }
}

// 既存のDOMContentLoadedまたはjQuery ready()イベント内で実行
document.addEventListener('DOMContentLoaded', setupCookieConsent);

// ※ jQueryを使用している場合は、以下のように置き換えてください
/*
$(document).ready(function () {
    // 既存の初期化処理
    // ...
    setupCookieConsent(); // ここで呼び出す
});
*/

/**
 * ZEROLINK 共通スクリプト
 * 依存関数（setupMobileMenuなど）はここで定義され、
 * 各ページ固有のスクリプト（script.home.jsなど）より先に読み込まれる必要がある。
 */

const APP_ELEMENT_SELECTOR = '#app';
const MENU_OPEN_CLASS = 'menu-open';


function setupMobileMenu() {
    const menuButton = document.querySelector('.js-mobile-menu-btn');
    const appElement = document.querySelector(APP_ELEMENT_SELECTOR);

    // 【★改善1: 堅牢性の向上】必要な要素が揃っているか厳密にチェック
    if (!menuButton || !appElement) {
        console.warn("モバイルメニューに必要な要素（ボタンまたは #app）が見つかりません。");
        return;
    }

    // 【★改善2: DOMセレクタをここで実行】モバイルメニュー内のリンク全て
    // ※ 注意: mobile-menu-inner は works.html には定義されていません。
    //   共通HTMLテンプレートで定義されている前提で処理を継続します。
    const mobileMenuLinks = appElement.querySelectorAll('.mobile-menu-inner a');

    // 1. 開閉ボタンクリック時の処理
    // script.common.js 内
    menuButton.addEventListener('click', () => {
        appElement.classList.toggle(MENU_OPEN_CLASS); // 'menu-open' クラスのON/OFF切り替え
    });

    // 2. リンククリック時にメニューを閉じる処理
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            const href = link.getAttribute('href');
            // 【★改善4: リンクチェックの厳格化】hrefを持ち、かつ空ではない場合に閉じる
            if (href && href.length > 0 && href !== '#') {
                appElement.classList.remove(MENU_OPEN_CLASS);
                menuButton.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // 3. 画面サイズ変更時（PCビューに戻った時）にクラスが残る不具合対策 (既存ロジックを維持)
    window.addEventListener('resize', () => {
        // 例: PCブレイクポイント 992px
        if (window.innerWidth >= 992 && appElement.classList.contains(MENU_OPEN_CLASS)) {
            appElement.classList.remove(MENU_OPEN_CLASS);
            menuButton.setAttribute('aria-expanded', 'false'); // ARIAも閉鎖状態に
        }
    });

    // 4. [改善] オーバーレイ部分のクリックで閉じる機能
    // クリックイベントはappElement全体で捕捉し、クリックされた場所を特定
    appElement.addEventListener('click', (event) => {
        // メニューが開いている かつ
        // クリックしたターゲットがメニューボタン、メニュー内のリンク、メニュー内部のDOMではない場合
        const isClickedOnMenuContent = event.target.closest('.mobile-menu-inner');

        if (appElement.classList.contains(MENU_OPEN_CLASS) && !isClickedOnMenuContent) {

            // 【★改善5: オーバーレイクリックによる閉鎖】
            // メニューボタン自身がクリックされた場合はロジック1が処理するため、ここではメニューの外側のみを想定
            if (event.target === appElement) { // app要素自身（メニューのオーバーレイ背景）がクリックされたと想定
                appElement.classList.remove(MENU_OPEN_CLASS);
                menuButton.setAttribute('aria-expanded', 'false');
            }
        }
    });
}

/**
 * グローバルヘッダーの動的制御 (スクロールでスタイル変化)
 */
function setupGlobalHeader() {
    const header = document.querySelector('#main-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // 50pxスクロールしたら
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * 動的グラデーションの初期化 (現時点ではコンソールログの出力のみ)
 */
function initializeDynamicGradient() {
    const canvas = document.querySelector('#gradient-canvas');
    if (!canvas) return;

    // 今後のWebGL/tsparticles実装のためのプレースホルダー
    console.log('Dynamic Gradient canvas initialized. Awaiting WebGL/tsparticles implementation.');
}

// 全ての共通セットアップ関数を実行
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupGlobalHeader();
    initializeDynamicGradient();
});

