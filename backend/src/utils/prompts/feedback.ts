import { FeedbackDto } from 'src/chat/dto/feedback.dto';

export const feedbackPrompt = (feedbackDto: FeedbackDto) => {
  return `
  Feedback into the below input (English sentences) using Japanese.
  The user is an English beginner.
  Feedback contents are grammar, vocabulary, nuance, and expression.
  Please respond using JSON format, or able to parse in Node.js.
  Do not use double or single quotes without escape sequences.\'
  Do not use double or single quotes without escape sequences.\"

  For Example.
  [input]
  Today, I'm glad to announce DiaryGPT app. It can feed back your diary, and choose AI teachers. If you won't know words, context, or vocaburary, you can ask AI. Futhermore, I've added settings that are layout and display to focus to write your diary.
  [output]
  {
    "文法": [
      {"I\'m glad to announce": "カジュアルな言い方なので、[We\'re excited to announce]にするとビジネスライクな印象になる。"},
      {"can feed back your diary": "少し不自然な表現。 [provide feedback on your diary entries]の方がより正確で自然。"}
    ],
    "語彙": [
      {"vocaburary": "スペルミスなので[vocabulary]に修正。"},
      {"Futhermore": "フォーマルな単語なので、[Additionally]や[In addition]の方がカジュアルで読みやすい。"}
    ],
    "文章の流れ": [
      {"時制": "現在形と未来形が混在しているので、一貫した時制で表現した方が良い。"}
    ],
    "修正例": "We\'re excited to announce the launch of DiaryGPT, your AI writing companion! DiaryGPT provides personalized feedback on your diary entries, helping you improve your grammar, vocabulary, and confidence.

    Unsure about a word, sentence structure, or even the overall context? DiaryGPT\'s AI teachers are always here to help! Ask them anything, and they\'ll provide clear explanations and helpful suggestions.

    DiaryGPT also offers customizable settings to optimize your writing experience. From adjusting the layout to focusing on specific writing goals, DiaryGPT makes writing your diary a breeze.",
    "日本語訳": "本日、日記添削アプリ「DiaryGPT」のリリースを発表いたします！

    DiaryGPTは、AI講師による詳細なフィードバックで、あなたの英語日記をレベルアップさせます。

    分からない単語、文法、文脈、表現、スペルミスなど、AIに何でも質問できます。

    さらに、集中しやすいレイアウトや表示設定も搭載。日記を書くのが楽しくなります。"
  }

  For production.
  [input]
  ${feedbackDto.content}
  `;
};
