var pokeNameList = [
    "",
    "ニャオハ",
    "ニャローテ",
    "マスカーニャ",
    "ホゲータ",
    "アチゲータ",
    "ラウドボーン",
    "クワッス",
    "ウェルカモ",
    "ウェーニバル",
    "グルトン",
    "パフュートン♂",
    "パフュートン♀",
    "タマンチュラ",
    "ワナイダー",
    "マメバッタ",
    "エクスレッグ",
    "ハネッコ",
    "ポポッコ",
    "ワタッコ",
    "ヤヤコマ",
    "ヒノヤコマ",
    "ファイアロー",
    "パモ",
    "パモット",
    "パーモット",
    "デルビル",
    "ヘルガー",
    "ヤングース",
    "デカグース",
    "ホシガリス",
    "ヨクバリス",
    "ヒマナッツ",
    "キマワリ",
    "コロボーシ",
    "コロトック",
    "コフキムシ",
    "コフーライ",
    "ビビヨン",
    "ミツハニー",
    "ビークイン",
    "ココガラ",
    "アオガラス",
    "アーマーガア",
    "ピンプク",
    "ラッキー",
    "ハピナス",
    "ルリリ",
    "マリル",
    "マリルリ",
    "アメタマ",
    "アメモース",
    "ブイゼル",
    "フローゼル",
    "ウパー(パルデア)",
    "ドオー",
    "コダック",
    "ゴルダック",
    "カムカメ",
    "カジリガメ",
    "ププリン",
    "プリン",
    "プクリン",
    "ラルトス",
    "キルリア",
    "サーナイト",
    "エルレイド",
    "スリープ",
    "スリーパー",
    "ゴース",
    "ゴースト",
    "ゲンガー",
    "ワッカネズミ",
    "イッカネズミ",
    "ピチュー",
    "ピカチュウ",
    "ライチュウ",
    "パピモッチ",
    "バウッツェル",
    "ナマケロ",
    "ヤルキモノ",
    "ケッキング",
    "アマカジ",
    "アママイコ",
    "アマージョ",
    "ミニーブ",
    "オリーニョ",
    "オリーヴァ",
    "ウソハチ",
    "ウソッキー",
    "イワンコ",
    "ルガルガン(まひる)",
    "ルガルガン(まよなか)",
    "ルガルガン(たそがれ)",
    "タンドン",
    "トロッゴン",
    "セキタンザン",
    "コリンク",
    "ルクシオ",
    "レントラー",
    "ムックル",
    "ムクバード",
    "ムクホーク",
    "オドリドリ(めらめら)",
    "オドリドリ(ぱちぱち)",
    "オドリドリ(ふらふら)",
    "オドリドリ(まいまい)",
    "メリープ",
    "モココ",
    "デンリュウ",
    "チュリネ",
    "ドレディア",
    "キノココ",
    "キノガッサ",
    "カジッチュ",
    "アップリュー",
    "タルップル",
    "バネブー",
    "ブーピッグ",
    "イキリンコ",
    "ムウマ",
    "ムウマージ",
    "マクノシタ",
    "ハリテヤマ",
    "マケンカニ",
    "ケケンカニ",
    "ヤトウモリ",
    "エンニュート",
    "ゴマゾウ",
    "ドンファン",
    "ゾウドウ",
    "ダイオウドウ",
    "フカマル",
    "ガバイト",
    "ガブリアス",
    "コジオ",
    "ジオヅム",
    "キョジオーン",
    "キャモメ",
    "ペリッパー",
    "コイキング",
    "ギャラドス",
    "サシカマス",
    "カマスジョー",
    "バスラオ(赤)",
    "バスラオ(青)",
    "ゴクリン",
    "マルノーム",
    "ニャース",
    "ペルシアン",
    "フワンテ",
    "フワライド",
    "フラベベ",
    "フラエッテ",
    "フラージェス",
    "ディグダ",
    "ダグトリオ",
    "コータス",
    "ドンメル",
    "バクーダ",
    "ドーミラー",
    "ドータクン",
    "キバゴ",
    "オノンド",
    "オノノクス",
    "マンキー",
    "オコリザル",
    "コノヨザル",
    "アサナン",
    "チャーレム",
    "リオル",
    "ルカリオ",
    "カルボウ",
    "グレンアルマ",
    "ソウブレイズ",
    "ドジョッチ",
    "ナマズン",
    "ズピカ",
    "ハラバリー",
    "ヌメラ",
    "ヌメイル",
    "ヌメルゴン",
    "グレッグル",
    "ドクロッグ",
    "カイデン",
    "タイカイデン",
    "イーブイ",
    "シャワーズ",
    "サンダース",
    "ブースター",
    "エーフィ",
    "ブラッキー",
    "リーフィア",
    "グレイシア",
    "ニンフィア",
    "ノコッチ",
    "ノココッチ",
    "シキジカ",
    "メブキジカ",
    "キリンリキ",
    "リキキリン",
    "ベトベター",
    "ベトベトン",
    "オラチフ",
    "マフィティフ",
    "エレズン",
    "ストリンダー(ハイ)",
    "ストリンダー(ロー)",
    "デデンネ",
    "パチリス",
    "シルシュルー",
    "タギングル",
    "オドシシ",
    "タマゲタケ",
    "モロバレル",
    "ビリリダマ",
    "マルマイン",
    "コイル",
    "レアコイル",
    "ジバコイル",
    "メタモン",
    "ガーディ",
    "ウインディ",
    "ヒメグマ",
    "リングマ",
    "ザングース",
    "ハブネーク",
    "チルット",
    "チルタリス",
    "メェークル",
    "ゴーゴート",
    "ケンタロス(パルデア単)",
    "ケンタロス(パルデア炎)",
    "ケンタロス(パルデア水)",
    "シシコ",
    "カエンジシ",
    "スカンプー",
    "スカタンク",
    "ゾロア",
    "ゾロアーク",
    "ニューラ",
    "マニューラ",
    "ヤミカラス",
    "ドンカラス",
    "ゴチム",
    "ゴチミル",
    "ゴチルゼル",
    "ヤバチャ",
    "ポットデス",
    "ミミッキュ",
    "クレッフィ",
    "イエッサン♂",
    "イエッサン♀",
    "アノクサ",
    "アノホラグサ",
    "ノノクラゲ",
    "リククラゲ",
    "トロピウス",
    "カリキリ",
    "ラランテス",
    "ガケガニ",
    "カプサイジ",
    "スコヴィラン",
    "サボネア",
    "ノクタス",
    "シガロコ",
    "ベラカス",
    "コンパン",
    "モルフォン",
    "クヌギダマ",
    "フォレトス",
    "ストライク",
    "ハッサム",
    "ヘラクロス",
    "ヒラヒナ",
    "クエスパトラ",
    "ヒポポタス",
    "カバルドン",
    "メグロコ",
    "ワルビル",
    "ワルビアル",
    "スナヘビ",
    "サダイジャ",
    "ドロバンコ",
    "バンバドロ",
    "メラルバ",
    "ウルガモス",
    "タツベイ",
    "コモルー",
    "ボーマンダ",
    "カヌチャン",
    "ナカヌチャン",
    "デカヌチャン",
    "ミブリム",
    "テブリム",
    "ブリムオン",
    "ベロバー",
    "ギモー",
    "オーロンゲ",
    "ウミディグダ",
    "ウミトリオ",
    "オトシドリ",
    "ナミイルカ",
    "イルカマン(ナイーブ)",
    "イルカマン(マイティ)",
    "ブロロン",
    "ブロロローム",
    "モトトカゲ",
    "ミミズズ",
    "ヤミラミ",
    "カゲボウズ",
    "ジュペッタ",
    "タイレーツ",
    "ルチャブル",
    "ミカルゲ",
    "オンバット",
    "オンバーン",
    "ドラメシヤ",
    "ドロンチ",
    "ドラパルト",
    "キラーメ",
    "キラフロル",
    "ロトム",
    "ロトム(ヒート)",
    "ロトム(ウォッシュ)",
    "ロトム(フロスト)",
    "ロトム(スピン)",
    "ロトム(カット)",
    "ボチ",
    "ハカドッグ",
    "ヤレユータン",
    "ナゲツケサル",
    "ネッコアラ",
    "ヨーギラス",
    "サナギラス",
    "バンギラス",
    "イシヘンジン",
    "コオリッポ(アイス)",
    "コオリッポ(ナイス)",
    "バチンウニ",
    "スナバァ",
    "シロデスナ",
    "ヤドン",
    "ヤドラン",
    "ヤドキング",
    "カラナクシ",
    "トリトドン",
    "シェルダー",
    "パルシェン",
    "ハリーセン",
    "ラブカス",
    "ケイコウオ",
    "ネオラント",
    "ハギギシリ",
    "ママンボウ",
    "クズモー",
    "ドラミドロ",
    "ウデッポウ",
    "ブロスター",
    "シビシラス",
    "シビビール",
    "シビルドン",
    "ヒドイデ",
    "ドヒドイデ",
    "カラミンゴ",
    "ミニリュウ",
    "ハクリュー",
    "カイリュー",
    "ユキハミ",
    "モスノウ",
    "ユキカブリ",
    "ユキノオー",
    "デリバード",
    "クマシュン",
    "ツンベアー",
    "ユキワラシ",
    "オニゴーリ",
    "ユキメノコ",
    "フリージオ",
    "アルクジラ",
    "ハルクジラ",
    "カチコール",
    "クレベース",
    "ワシボン",
    "ウォーグル",
    "コマタナ",
    "キリキザン",
    "ドドゲザン",
    "モノズ",
    "ジヘッド",
    "サザンドラ",
    "ミガルーサ",
    "ヘイラッシャ",
    "シャリタツ",
    "イダイナキバ",
    "サケブシッポ",
    "アラブルタケ",
    "ハバタクカミ",
    "チヲハウハネ",
    "スナノケガワ",
    "テツノワダチ",
    "テツノツツミ",
    "テツノカイナ",
    "テツノコウベ",
    "テツノドクガ",
    "テツノイバラ",
    "セビエ",
    "セゴール",
    "セグレイブ",
    "コレクレー(はこ)",
    "サーフゴー",
    "チオンジェン",
    "パオジアン",
    "ディンルー",
    "イーユイ",
    "トドロクツキ",
    "テツノブジン",
    "コライドン",
    "ミライドン",
    "ヒトカゲ",
    "リザード",
    "リザードン",
    "ライチュウ(アローラ)",
    "ディグダ(アローラ)",
    "ダグトリオ(アローラ)",
    "ニャース(アローラ)",
    "ニャース(ガラル)",
    "ペルシアン(アローラ)",
    "ガーディ(ヒスイ)",
    "ウインディ(ヒスイ)",
    "ヤドン(ガラル)",
    "ヤドラン(ガラル)",
    "ベトベター(アローラ)",
    "ベトベトン(アローラ)",
    "ビリリダマ(ヒスイ)",
    "マルマイン(ヒスイ)",
    "ケンタロス",
    "フリーザー",
    "フリーザー(ガラル)",
    "サンダー",
    "サンダー(ガラル)",
    "ファイヤー",
    "ファイヤー(ガラル)",
    "ミュウツー",
    "ミュウ",
    "ヒノアラシ",
    "マグマラシ",
    "バクフーン",
    "バクフーン(ヒスイ)",
    "ウパー",
    "ヌオー",
    "ヤドキング(ガラル)",
    "ハリーセン(ヒスイ)",
    "ニューラ(ヒスイ)",
    "カイオーガ",
    "グラードン",
    "レックウザ",
    "ユクシー",
    "エムリット",
    "アグノム",
    "ディアルガ",
    "ディアルガ(オリジン)",
    "パルキア",
    "パルキア(オリジン)",
    "ヒードラン",
    "ギラティナ(アナザー)",
    "ギラティナ(オリジン)",
    "クレセリア",
    "アルセウス",
    "ミジュマル",
    "フタチマル",
    "ダイケンキ",
    "ダイケンキ(ヒスイ)",
    "ドレディア(ヒスイ)",
    "バスラオ(白)",
    "ゾロア(ヒスイ)",
    "ゾロアーク(ヒスイ)",
    "ウォーグル(ヒスイ)",
    "トルネロス(化身)",
    "トルネロス(霊獣)",
    "ボルトロス(化身)",
    "ボルトロス(霊獣)",
    "ランドロス(化身)",
    "ランドロス(霊獣)",
    "メロエッタ(ボイス)",
    "メロエッタ(ステップ)",
    "ハリマロン",
    "ハリボーグ",
    "ブリガロン",
    "フォッコ",
    "テールナー",
    "マフォクシー",
    "ケロマツ",
    "ゲコガシラ",
    "ゲッコウガ",
    "メレシー",
    "ヌメイル(ヒスイ)",
    "ヌメルゴン(ヒスイ)",
    "クレベース(ヒスイ)",
    "ディアンシー",
    "フーパ(いましめ)",
    "フーパ(ときはな)",
    "ボルケニオン",
    "モクロー",
    "フクスロー",
    "ジュナイパー",
    "ジュナイパー(ヒスイ)",
    "マギアナ",
    "サルノリ",
    "バチンキー",
    "ゴリランダー",
    "ヒバニー",
    "ラビフット",
    "エースバーン",
    "メッソン",
    "ジメレオン",
    "インテレオン",
    "ニャイキング",
    "ザシアン",
    "ザシアン(王)",
    "ザマゼンタ",
    "ザマゼンタ(王)",
    "ムゲンダイナ",
    "ダクマ",
    "ウーラオス(いちげき)",
    "ウーラオス(れんげき)",
    "ザルード",
    "レジエレキ",
    "レジドラゴ",
    "ブリザポス",
    "レイスポス",
    "バドレックス",
    "バドレックス(はくば)",
    "バドレックス(こくば)",
    "アヤシシ",
    "バサギリ",
    "ガチグマ",
    "イダイトウ♂",
    "イダイトウ♀",
    "オオニューラ",
    "ハリーマン",
    "ラブトロス(化身)",
    "ラブトロス(霊獣)",
    "ウネルミナモ",
    "テツノイサハ",    
];
