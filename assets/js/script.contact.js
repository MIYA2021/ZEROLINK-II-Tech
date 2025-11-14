// =========================================
// Contact Form Handler (お問い合わせフォームの処理)
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formMessages = document.getElementById('form-messages');
    const subjectDropdown = document.getElementById('subject'); // 件名ドロップダウン
    const otherSubjectGroup = document.getElementById('otherSubjectGroup'); // その他の件名グループ
    const otherSubjectInput = document.getElementById('otherSubject'); // その他の件名入力フィールド

    // 件名ドロップダウンの変更イベントを監視
    if (subjectDropdown && otherSubjectGroup && otherSubjectInput) {
        subjectDropdown.addEventListener('change', () => {
            if (subjectDropdown.value === 'その他') {
                otherSubjectGroup.style.display = 'block'; // 「その他」が選択されたら表示
                otherSubjectInput.setAttribute('required', 'required'); // 必須にする
            } else {
                otherSubjectGroup.style.display = 'none'; // その他が選択されなければ非表示
                otherSubjectInput.removeAttribute('required'); // 必須を解除
                otherSubjectInput.value = ''; // 値をクリア
            }
        });
    }

    if (contactForm && formMessages) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // デフォルトのフォーム送信をキャンセル

            const formData = new FormData(contactForm);
            const params = new URLSearchParams();

            // 件名が「その他」の場合、ドロップダウンの値を「その他の件名」フィールドの値に置き換える
            if (subjectDropdown.value === 'その他') {
                formData.set('subject', otherSubjectInput.value);
            }

            for (const pair of formData.entries()) {
                params.append(pair[0], pair[1]);
            }

            // 送信中のメッセージとスタイル
            formMessages.textContent = '送信中...';
            formMessages.style.color = 'var(--neon-blue)';
            formMessages.classList.add('show');

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: params,
                    mode: 'no-cors'
                });

                formMessages.textContent = 'お問い合わせありがとうございます！送信が完了しました。';
                formMessages.style.color = 'var(--neon-green)';
                contactForm.reset();

                // フォームリセット後、件名入力欄を非表示にする
                if (otherSubjectGroup) {
                    otherSubjectGroup.style.display = 'none';
                }

                setTimeout(() => {
                    formMessages.classList.remove('show');
                    formMessages.textContent = '';
                }, 5000);
            } catch (error) {
                console.error('フォーム送信エラー:', error);
                formMessages.textContent = '送信中にエラーが発生しました。もう一度お試しください。';
                formMessages.style.color = 'var(--neon-pink)';
                formMessages.classList.add('show');

                setTimeout(() => {
                    formMessages.classList.remove('show');
                    formMessages.textContent = '';
                }, 5000);
            }
        });
    } else {
        console.warn('Contact form or message element not found.');
    }
});