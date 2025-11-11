/**
 * ZEROLINK CREATORS固有スクリプト
 * HTMLの構造 (#horizontal-scroll-container > #horizontal-content-wrapper) に従って、
 * 全部門コンテンツの自動横スライドを制御します。（全デバイスで有効）
 */
function setupAutoHorizontalScroll() {
    const container = document.getElementById('horizontal-scroll-container');
    const contentWrapper = document.getElementById('horizontal-content-wrapper');

    // ★修正: IDを持つ親要素の子要素であることを明示し、セレクタの正確性を高めます。
    const departmentBoxes = document.querySelectorAll('#horizontal-content-wrapper > .department-content-box');

    const departmentCount = departmentBoxes.length;

    // --- デバッグ用のログ ---
    // ブラウザの開発者ツール（F12キーなどで開けます）の「Console」タブで確認してください。
    // 値が 0 の場合、HTMLの部門構造に問題があります。
    console.log(`[AutoSlide Debug] 部門コンテンツの数: ${departmentCount}`);
    // --- デバッグ用のログ ---

    // 必須要素がない場合は処理を終了
    if (!container || !contentWrapper || departmentCount === 0) {
        if (departmentCount === 0) {
            console.error("【エラー】自動スライド：部門コンテンツ（.department-content-box）が見つかりません。HTMLを確認してください。");
        } else {
            console.error("【エラー】自動スライドに必要な親要素（#horizontal-scroll-container / #horizontal-content-wrapper）が見つかりません。");
        }
        return;
    }

    let currentDepartmentIndex = 0;
    const slideIntervalTime = 5000; // 5秒ごとにスライド
    let intervalId;

    /**
     * 指定した部門にスムーズにスライドする関数
     */
    function scrollToDepartment(index) {
        if (index >= departmentCount) {
            index = 0; // 最後のスライドから最初のスライドへループ
        } else if (index < 0) {
            index = departmentCount - 1;
        }

        // スライド距離は部門インデックス * 画面幅 (window.innerWidth)
        const targetScrollLeft = index * window.innerWidth;

        // --- デバッグ用のログ ---
        // ログが出力されていれば、JavaScriptの制御は動作しています。
        console.log(`[AutoSlide Debug] ${currentDepartmentIndex} -> ${index} へスライド。移動距離: -${targetScrollLeft}px`);
        // --- デバッグ用のログ ---

        // CSSの transform と transition を利用してスムーズに移動させる
        contentWrapper.style.transform = `translateX(-${targetScrollLeft}px)`;

        currentDepartmentIndex = index;
    }

    // 初期化と開始
    scrollToDepartment(0);
    startAutoSlide();

    /**
     * 自動スライドを開始する関数
     */
    function startAutoSlide() {
        if (intervalId) return;

        intervalId = setInterval(() => {
            scrollToDepartment(currentDepartmentIndex + 1);
        }, slideIntervalTime);
    }

    /**
     * ウィンドウサイズ変更時のリセットと再開処理
     */
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);

        // 自動スライドを一時停止
        clearInterval(intervalId);
        intervalId = null;

        // サイズ変更完了後、自動スライドをリセットし再開
        resizeTimer = setTimeout(() => {
            currentDepartmentIndex = 0;
            // リセット時はアニメーションなし
            contentWrapper.style.transition = `none`;
            contentWrapper.style.transform = `translateX(0px)`;

            // 処理を少し遅らせてtransitionを再適用し、自動スライドを再開
            setTimeout(() => {
                // CSSで設定されたtransitionを再適用
                contentWrapper.style.transition = `transform 1s ease-in-out`;
                startAutoSlide();
            }, 50);
        }, 300); // 300ms後に実行
    });
}


// jQueryのdocument ready内で実行
$(document).ready(function () {
    // --- デバッグ用のログ ---
    console.log("[AutoSlide Debug] jQuery DOM Ready: setupAutoHorizontalScrollを開始します。");
    // --- デバッグ用のログ ---

    setupAutoHorizontalScroll();

    // 共通のメニュー、ヘッダー機能も実行 (script.common.jsが先に読み込まれている前提)
    if (typeof setupMobileMenu === 'function') {
        setupMobileMenu();
    }
    if (typeof setupGlobalHeader === 'function') {
        setupGlobalHeader();
    }
});