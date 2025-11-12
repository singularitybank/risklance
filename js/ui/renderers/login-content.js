// Risk Lance - ログイン画面コンテンツレンダラー

class LoginContentRenderer {
    /**
     * ログイン画面のコンテンツを生成
     */
    static render() {
        return `
            <div class="login-container">
                <div class="login-form">
                    <div class="logo">
                        <i class="fas fa-shield-alt"></i>
                        <h1>Risk Lance</h1>
                        <p>データ駆動型リスクマネジメントプラットフォーム</p>
                    </div>
                    <form id="login-form">
                        <div class="input-group">
                            <i class="fas fa-user"></i>
                            <input type="text" id="username" placeholder="ユーザー名" required>
                        </div>
                        <div class="input-group">
                            <i class="fas fa-lock"></i>
                            <input type="password" id="password" placeholder="パスワード" required>
                        </div>
                        <button type="submit" class="login-btn">ログイン</button>
                    </form>
                    <div class="login-links">
                        <a href="#" class="forgot-password">パスワードを忘れた方</a>
                    </div>
                </div>
            </div>
        `;
    }
}

// グローバルに公開
window.LoginContentRenderer = LoginContentRenderer;

console.log('✅ LoginContentRenderer が読み込まれました');
