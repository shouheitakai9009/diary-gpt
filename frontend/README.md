# DiaryGPT

これは英語学習者のために、様々な性格を持つGPT-AIがあなたの書いた英日記に対して、文法・単語・ニュアンス・使い方等のフィードバックをもらうことのできるサービスです。

## なぜDiaryGPTなのか

GPT-3の出現により、英語学習者は日記を書いてChatGPTに読み込ませフィードバックをもらう、ということを経験したと思います。
私がそれを試した時、シンプルにChatGPTすごいなと感じましたが、基本的に一度きりのフィードバックは記憶に残りませんし、UIがわかりづらいなと感じました。
さらに、あなたの毎日の日記とフィードバックが必ずしも紐付いているわけではありません、なぜなら日記とChatGPTは別サービスだからです。

## 特徴
- 毎日の英日記を管理
   - 新規作成・編集・削除をワンクリックで。
   - 検索も早くて簡単
- AIによるフィードバック
   - 文法・単語・ニュアンス・使い方等のフィードバックが得られます。
   - 英日記に沿ったサムネイルを自動生成します。
   - 様々な性格・人格を持ったAIを選択できます。
- あなたに個別最適化

## 仕様

### DB設計

**User**
- id
- username
- email
- password
- ageGroup
- level
- registerStatus
- createdAt
- updatedAt
- deleted

**Diary**
- id
- userId
- title
- drafts
- histories
- feedbacks
- createdAt
- updatedAt
- deleted

**DiaryHistories**
- id
- diaryId
- content
- createdAt
- updatedAt
- deleted

**DiaryFeedbacks**
- id
- diaryId
- content
- me
- createdAt
- updatedAt
- deleted

**DiaryDrafts**
- id
- diaryId
- title
- content
- createdAt
- updatedAt
- deleted

### UI情報

- 日記一覧
   - 検索フィールド
   - ソートドロップダウン
   - タイトル
   - 作成日
   - サムネイル 1:1
   - チャット数
- 日記
   - タイトル入力フィールド
   - 本文入力フィールド
   - 保存してフィードバックをもらう
   - 下書きボタン
   - 下書きリスト
   - 下書きプレビューダイアログ
- フィードバック
   - AI名＋名前
   - AIチャット
   - ユーザチャット
   - ユーザ入力フィールド
   - 送信ボタン
- AI講師選択
   - アイコン
   - 名前
   - デモグラフィック
   - 特徴
- ユーザ登録
   - Email
   - Password
   - Password(confirm)
   - 英語レベル選択(radio)
   - 年齢層選択(radio)
   - 登録ボタン
- ユーザログイン
   - Email
   - Password
   - ログインボタン