/* GASのデプロイURLをここに設定してください */
const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxTH30VUtCO3tj4h6a0_D8nhuiJeHXwcCVCJPmkSr95FDTiIC7g3-ltDOTujwwCpw9e/exec';

/**
 * 実績データ構造の例:
 * {
 * "category": "esports",
 * "year": "2025",
 * "image": "assets/img/dummy_work_1.jpg",
 * "altText": "Major League Championship project",
 * "tagText": "ESPORTS",
 * "tagClass": "tag-esports", // CSSで定義されたクラス名
 * "title": "Major League Championship チームブランディングと運営支援",
 * "date": "2025.07"
 * }
 */
let allWorksData = []; // 全実績データを格納する配列

// ------------------------------------------------
// DOM生成
// ------------------------------------------------

/**
 * 単一の実績カードのHTMLを生成する
 * @param {object} work - 実績データオブジェクト
 * @returns {string} - 実績カードのHTML文字列
 */
function createWorkCardHTML(work) {
    return `
        <article class="work-card js-work-card" data-category="${work.category}" data-year="${work.year}">
            <div class="work-image-wrapper"><img src="${work.image}" alt="${work.altText}"></div>
            <div class="work-info">
                <p class="work-category-tag ${work.tagClass}">${work.tagText}</p>
                <h3 class="work-title">${work.title}</h3>
                <p class="work-year font-thin">${work.date}</p>
            </div>
        </article>
    `;
}

/**
 * データを元に実績リストをDOMに描画する
 * @param {Array<object>} data - 描画する実績データ
 */
function renderWorks(data) {
    const container = $('#works-list-container');
    container.empty(); // 既存の内容をクリア

    if (data.length === 0) {
        container.append('<p>該当する実績が見つかりませんでした。</p>');
        return;
    }

    let html = data.map(createWorkCardHTML).join('');
    container.append(html);
}


// ------------------------------------------------
// データ取得
// ------------------------------------------------

/**
 * GASから実績データを取得する（JSONP方式に修正）
 */
function fetchWorksData() {
    $('#works-list-container').html('<p id="loading-message">実績データを読み込み中です...</p>');

    // JSONPはコールバック関数名を指定する必要があるため、パラメータに `callback=?` を追加
    // GAS側は `callback` パラメータで指定された関数名でデータをラップして応答する
    const url = `${GAS_WEB_APP_URL}?userId=web-client-001&callback=?`;

    $.ajax({
        url: url,
        method: 'GET',
        // ★修正点1: dataTypeを'jsonp'に変更
        dataType: 'jsonp',
        success: function (response) {
            console.log('GASからのレスポンス:', response);

            // 成功かつデータがあるか確認
            if (response.success && response.worksData && Array.isArray(response.worksData)) {
                allWorksData = response.worksData;
                renderWorks(allWorksData); // 初期表示は全件
            } else {
                // エラーまたはデータがない場合
                $('#works-list-container').html('<p>実績データの取得に失敗しました、またはデータがありません。</p>');
            }
        },
        error: function (xhr, status, error) {
            console.error('データ取得エラー:', status, error, xhr.responseText);
            $('#works-list-container').html('<p>サーバーとの通信中にエラーが発生しました。</p>');
        }
    });
}


// ------------------------------------------------
// フィルタリング処理
// ------------------------------------------------

let currentFilters = {
    category: 'all',
    year: 'all'
};

/**
 * フィルタボタンのクリックイベントハンドラ
 */
function handleFilterClick() {
    const $button = $(this);
    const filterType = $button.data('filter-type'); // 'category' or 'year'
    const filterValue = $button.data('filter-value');

    // アクティブなボタンの切り替え
    $(`.filter-type-${filterType} .filter-btn`).removeClass('is-active');
    $button.addClass('is-active');

    // フィルタ状態を更新
    currentFilters[filterType] = filterValue;

    // フィルタリングを実行
    applyFilters();
}

/**
 * 現在のフィルタを適用して実績データを絞り込む
 */
function applyFilters() {
    const { category, year } = currentFilters;

    const filteredData = allWorksData.filter(work => {
        const categoryMatch = (category === 'all' || work.category === category);
        const yearMatch = (year === 'all' || work.year === year);
        return categoryMatch && yearMatch;
    });

    renderWorks(filteredData);
}

// ------------------------------------------------
// 初期化
// ------------------------------------------------

$(document).ready(function () {
    // フィルタボタンにイベントリスナーを設定
    $('.filter-btn').on('click', handleFilterClick);

    // ページロード時にデータ取得を開始
    fetchWorksData();
});