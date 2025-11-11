/**
 * ZEROLINK HOME固有スクリプト
 * 共通機能（setupMobileMenu, setupGlobalHeaderなど）は
 * script.common.jsで定義され、ここで実行される。
 */

$(document).ready(function () {
    // 共通機能の初期化
    if (typeof setupMobileMenu === 'function') {
        setupMobileMenu();
    }
    if (typeof setupGlobalHeader === 'function') {
        setupGlobalHeader();
    }
    // initializeDynamicGradient(); // 必要であれば、今後実装

    /**
     * HOMEページ固有の処理をここに記述
     */

    // Activityパネルのホバー時の追加処理など（現在はCSSで十分）

    // ヒーローセクションへのスクロールアニメーション (もし必要であれば)
    $('.cta-button').on('click', function (e) {
        if ($(this).attr('href').startsWith('#')) {
            e.preventDefault();
            const target = $(this).attr('href');
            $('html, body').animate({
                scrollTop: $(target).offset().top - 90 // ヘッダーの高さ分調整
            }, 500);
        }
    });

});