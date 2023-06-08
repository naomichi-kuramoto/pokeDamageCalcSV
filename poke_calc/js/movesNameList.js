var movesNameList = [
    "",
    "3ぼんのや",
    "アーマーキャノン",
    "アームハンマー",
    "アイアンテール",
    "アイアンヘッド",
    "アイアンローラー",
    "アイススピナー",
    "アイスハンマー",
    "アクアカッター",
    "アクアジェット",
    "アクアステップ",
    "アクアテール",
    "アクアブレイク",
    "アクアリング",
    "あくうせつだん",
    "アクセルブレイク",
    "アクセルロック",
    "あくのはどう",
    "あくび",
    "アクロバット",
    "あさのひざし",
    "アシストパワー",
    "アシッドボム",
    "アストラルビット",
    "あなをほる",
    "あばれる",
    "あまいかおり",
    "あまえる",
    "あまごい",
    "あやしいひかり",
    "アロマミスト",
    "アンコール",
    "あんこくきょうだ",
    "いあいぎり",
    "いえき",
    "イカサマ",
    "いかりのこな",
    "いかりのまえば",
    "いじげんホール",
    "いじげんラッシュ",
    "いたみわけ",
    "いちゃもん",
    "いっちょうあがり",
    "いてつくしせん",
    "いとをはく",
    "イナズマドライブ",
    "いにしえのうた",
    "いのちがけ",
    "いのちのしずく",
    "いばる",
    "いびき",
    "いやしのすず",
    "いやしのねがい",
    "いやしのはどう",
    "いやなおと",
    "いわおとし",
    "いわくだき",
    "いわなだれ",
    "インファイト",
    "ウェーブタックル",
    "ウェザーボール",
    "うずしお",
    "うそなき",
    "うたう",
    "うちおとす",
    "ウッドハンマー",
    "ウッドホーン",
    "うっぷんばらし",
    "うつしえ",
    "うらみ",
    "うらみつらみ",
    "エアカッター",
    "エアスラッシュ",
    "エコーボイス",
    "えだづき",
    "エナジーボール",
    "エレキネット",
    "エレキフィールド",
    "エレキボール",
    "えんまく",
    "オーバードライブ",
    "オーバーヒート",
    "オーラウイング",
    "オーロラビーム",
    "オーロラベール",
    "おいかぜ",
    "おいわい",
    "おかたづけ",
    "おきみやげ",
    "おさきにどうぞ",
    "おたけび",
    "おだてる",
    "おちゃかい",
    "おどろかす",
    "おにび",
    "おはかまいり",
    "かいでんぱ",
    "かいりき",
    "カウンター",
    "かえんぐるま",
    "かえんほうしゃ",
    "かえんボール",
    "かかとおとし",
    "かげうち",
    "かげぬい",
    "かげぶんしん",
    "かぜおこし",
    "かたきうち",
    "かたくなる",
    "カタストロフィ",
    "かなしばり",
    "かふんだんご",
    "かみくだく",
    "かみつく",
    "かみなり",
    "かみなりあらし",
    "かみなりのキバ",
    "かみなりパンチ",
    "からげんき",
    "からにこもる",
    "からをやぶる",
    "かわらわり",
    "ガードシェア",
    "ガードスワップ",
    "がむしゃら",
    "ガリョウテンセイ",
    "がんせきアックス",
    "がんせきふうじ",
    "きあいだま",
    "きあいだめ",
    "きあいパンチ",
    "きしかいせい",
    "キノコのほうし",
    "きゅうけつ",
    "きょけんとつげき",
    "きょじゅうざん",
    "きょじゅうだん",
    "キラースピン",
    "きりさく",
    "きりばらい",
    "きんぞくおん",
    "ギアチェンジ",
    "ギガインパクト",
    "ギガドレイン",
    "クイックターン",
    "くさのちかい",
    "くさむすび",
    "くさわけ",
    "くすぐる",
    "くらいつく",
    "クラブハンマー",
    "クリアスモッグ",
    "くろいきり",
    "くろいまなざし",
    "クロスチョップ",
    "クロスポイズン",
    "クロロブラスト",
    "グラススライダー",
    "グラスフィールド",
    "けたぐり",
    "げきりん",
    "ゲップ",
    "げんしのちから",
    "コーチング",
    "コートチェンジ",
    "こうげきしれい",
    "こうごうせい",
    "こうそくいどう",
    "こうそくスピン",
    "こおりのいぶき",
    "こおりのキバ",
    "こおりのつぶて",
    "こがらしあらし",
    "こごえるかぜ",
    "コスモパワー",
    "コットンガード",
    "こなゆき",
    "このは",
    "このゆびとまれ",
    "コメットパンチ",
    "こらえる",
    "ころがる",
    "こわいかお",
    "こんげんのはどう",
    "ゴーストダイブ",
    "ゴールドラッシュ",
    "ゴッドバード",
    "さいきのいのり",
    "サイケこうせん",
    "サイコカッター",
    "サイコキネシス",
    "サイコショック",
    "サイコファング",
    "サイコフィールド",
    "サイコブレイク",
    "サイコブレイド",
    "サイドチェンジ",
    "さいはい",
    "さいみんじゅつ",
    "さきおくり",
    "さばきのつぶて",
    "さむいギャグ",
    "さわぐ",
    "サンダープリズン",
    "シェルアームズ",
    "シェルブレード",
    "しおづけ",
    "しおふき",
    "しおみず",
    "シザークロス",
    "したでなめる",
    "しっとのほのお",
    "しっぺがえし",
    "しっぽきり",
    "しっぽをふる",
    "しねんのずつき",
    "しびれごな",
    "しめつける",
    "シャドークロー",
    "シャドーダイブ",
    "シャドーパンチ",
    "シャドーボール",
    "しょうりのまい",
    "しろいきり",
    "しんくうは",
    "しんそく",
    "しんぴのちから",
    "しんぴのまもり",
    "シンプルビーム",
    "Gのちから",
    "ジェットパンチ",
    "じこあんじ",
    "じこさいせい",
    "じごくづき",
    "じしん",
    "じたばた",
    "じだんだ",
    "じならし",
    "じばく",
    "じばそうさ",
    "ジャイロボール",
    "じゃれつく",
    "ジャングルヒール",
    "じゅうでん",
    "10まんばりき",
    "10まんボルト",
    "じゅうりょく",
    "じわれ",
    "じんつうりき",
    "スイープビンタ",
    "すいとる",
    "すいりゅうれんだ",
    "スキルスワップ",
    "スケイルショット",
    "スチームバースト",
    "すてゼリフ",
    "すてみタックル",
    "ステルスロック",
    "ストーンエッジ",
    "すなあつめ",
    "すなあらし",
    "すなかけ",
    "すなじごく",
    "スパーク",
    "スピードスター",
    "スピードスワップ",
    "スマートホーン",
    "スモッグ",
    "すりかえ",
    "スレッドトラップ",
    "ずつき",
    "せいちょう",
    "せいなるつるぎ",
    "ぜったいれいど",
    "ソーラービーム",
    "ソーラーブレード",
    "ソウルクラッシュ",
    "そらをとぶ",
    "タールショット",
    "たいあたり",
    "たきのぼり",
    "たくわえる",
    "たたきつける",
    "たたりめ",
    "たつまき",
    "たてこもる",
    "タネばくだん",
    "タネマシンガン",
    "タマゴうみ",
    "だいちのちから",
    "だいちのはどう",
    "だいばくはつ",
    "ダイビング",
    "だいふんげき",
    "ダイマックスほう",
    "だいもんじ",
    "ダイヤストーム",
    "だくりゅう",
    "ダストシュート",
    "ダブルアタック",
    "ダブルウイング",
    "ダメおし",
    "だんがいのつるぎ",
    "ちいさくなる",
    "ちからをすいとる",
    "ちきゅうなげ",
    "チャージビーム",
    "チャームボイス",
    "ちょうおんぱ",
    "ちょうのまい",
    "ちょうはつ",
    "ついばむ",
    "ツインビーム",
    "つきのひかり",
    "つけあがる",
    "つじぎり",
    "つっぱり",
    "つつく",
    "つのでつく",
    "つのドリル",
    "つばさでうつ",
    "つばめがえし",
    "つぶらなひとみ",
    "つぼをつく",
    "つめとぎ",
    "つららおとし",
    "つららばり",
    "つるぎのまい",
    "つるのムチ",
    "てかげん",
    "てだすけ",
    "てっていこうせん",
    "てっぺき",
    "テラバースト",
    "テレポート",
    "てをつなぐ",
    "てんしのキッス",
    "であいがしら",
    "DDラリアット",
    "デカハンマー",
    "でんきショック",
    "でんげきは",
    "でんこうせっか",
    "でんこうそうげき",
    "でんじは",
    "でんじふゆう",
    "でんじほう",
    "トーチカ",
    "とおせんぼう",
    "とおぼえ",
    "ときのほうこう",
    "とぐろをまく",
    "とける",
    "とっしん",
    "とっておき",
    "とどめばり",
    "とびかかる",
    "とびつく",
    "とびはねる",
    "とびひざげり",
    "ともえなげ",
    "トライアタック",
    "トリック",
    "トリックフラワー",
    "トリックルーム",
    "トリプルアクセル",
    "トリプルダイブ",
    "トロピカルキック",
    "とんぼがえり",
    "どくガス",
    "どくづき",
    "どくどく",
    "どくどくのキバ",
    "どくのこな",
    "どくばり",
    "どくばりセンボン",
    "どくびし",
    "どげざつき",
    "ドゲザン",
    "ドラゴンアロー",
    "ドラゴンエナジー",
    "ドラゴンクロー",
    "ドラゴンダイブ",
    "ドラゴンテール",
    "ドラムアタック",
    "ドリルくちばし",
    "ドリルライナー",
    "ドレインキッス",
    "ドレインパンチ",
    "どろかけ",
    "どろぼう",
    "ドわすれ",
    "ないしょばなし",
    "ナイトバースト",
    "ナイトヘッド",
    "なかまづくり",
    "なかよくする",
    "なきごえ",
    "なげつける",
    "なまける",
    "なみだめ",
    "なみのり",
    "なやみのタネ",
    "なりきり",
    "ニードルガード",
    "ニトロチャージ",
    "にどげり",
    "にほんばれ",
    "にらみつける",
    "ねがいごと",
    "ねこだまし",
    "ネコにこばん",
    "ねごと",
    "ネズミざん",
    "ねっさのあらし",
    "ねっさのだいち",
    "ねっとう",
    "ねっぷう",
    "ねばねばネット",
    "ねむりごな",
    "ねむる",
    "ねらいうち",
    "ねをはる",
    "ねんりき",
    "のしかかり",
    "のみこむ",
    "のろい",
    "ハートスワップ",
    "ハードプラント",
    "はいすいのじん",
    "ハイドロカノン",
    "ハイドロスチーム",
    "ハイドロポンプ",
    "ハイパードリル",
    "ハイパーボイス",
    "はいよるいちげき",
    "はかいこうせん",
    "はがねのつばさ",
    "はきだす",
    "ハサミギロチン",
    "はさむ",
    "はたきおとす",
    "はたく",
    "はっけい",
    "はっぱカッター",
    "ハッピータイム",
    "はどうだん",
    "はなびらのまい",
    "はなふぶき",
    "はねやすめ",
    "はねる",
    "ハバネロエキス",
    "はらだいこ",
    "はるのあらし",
    "バークアウト",
    "ばかぢから",
    "ばくおんぱ",
    "ばくれつパンチ",
    "バトンタッチ",
    "バブルこうせん",
    "バリアーラッシュ",
    "バレットパンチ",
    "パラボラチャージ",
    "パワーウィップ",
    "パワーシェア",
    "パワーシフト",
    "パワージェム",
    "パワースワップ",
    "パワートリック",
    "ヒートスタンプ",
    "ひかりのかべ",
    "ひけん・ちえなみ",
    "ひっかく",
    "ひのこ",
    "ひゃっきやこう",
    "ひやみず",
    "ひょうざんおろし",
    "びりびりちくちく",
    "ビルドアップ",
    "ファストガード",
    "ふいうち",
    "ふういん",
    "フェアリーロック",
    "フェイタルクロー",
    "フェイント",
    "フェザーダンス",
    "ふきとばし",
    "ふくろだたき",
    "ふしょくガス",
    "ふぶき",
    "ふみつけ",
    "フライングプレス",
    "フラフラダンス",
    "フリーズドライ",
    "フルールカノン",
    "ふるいたてる",
    "フレアソング",
    "フレアドライブ",
    "ふんえん",
    "ふんか",
    "ふんどのこぶし",
    "Vジェネレート",
    "ぶきみなじゅもん",
    "ぶちかまし",
    "ブラストバーン",
    "ブリザードランス",
    "ブレイククロー",
    "ブレイズキック",
    "ブレイブバード",
    "ぶんまわす",
    "プレゼント",
    "ヘドロウェーブ",
    "ヘドロこうげき",
    "ヘドロばくだん",
    "ヘビーボンバー",
    "へびにらみ",
    "へんしん",
    "ベノムショック",
    "ホイールスピン",
    "ほうでん",
    "ほうふく",
    "ほえる",
    "ほおばる",
    "ほしがる",
    "ほっぺすりすり",
    "ほのおのうず",
    "ほのおのキバ",
    "ほのおのちかい",
    "ほのおのパンチ",
    "ほのおのまい",
    "ほのおのムチ",
    "ほろびのうた",
    "ボーンラッシュ",
    "ぼうぎょしれい",
    "ぼうふう",
    "ボディプレス",
    "ボルテッカー",
    "ボルトチェンジ",
    "ポイズンテール",
    "ポルターガイスト",
    "まきつく",
    "まきびし",
    "マグマストーム",
    "マジカルシャイン",
    "マジカルフレイム",
    "マジカルリーフ",
    "マジックルーム",
    "マッドショット",
    "マッハパンチ",
    "まとわりつく",
    "まねっこ",
    "まほうのこな",
    "まもる",
    "まるくなる",
    "みかづきのいのり",
    "みかづきのまい",
    "みがわり",
    "みきり",
    "ミサイルばり",
    "ミストバースト",
    "ミストフィールド",
    "みずしゅりけん",
    "みずでっぽう",
    "みずのちかい",
    "みずのはどう",
    "みずびたし",
    "みだれづき",
    "みだれひっかき",
    "みちづれ",
    "みねうち",
    "ミラーコート",
    "ミラータイプ",
    "みらいよち",
    "ミルクのみ",
    "みをけずる",
    "ムーンフォース",
    "むしくい",
    "むしのさざめき",
    "むしのていこう",
    "むねんのつるぎ",
    "めいそう",
    "メガトンキック",
    "メガトンパンチ",
    "メガドレイン",
    "メガホーン",
    "めざめるダンス",
    "メタルクロー",
    "メタルバースト",
    "メテオビーム",
    "メロメロ",
    "もえあがるいかり",
    "もえつきる",
    "ものまね",
    "もろはのずつき",
    "やきつくす",
    "やどりぎのタネ",
    "ゆきげしき",
    "ゆきなだれ",
    "ゆびをふる",
    "ゆめくい",
    "ようかいえき",
    "ようせいのかぜ",
    "ライジングボルト",
    "らいめいげり",
    "ラスターカノン",
    "リーフストーム",
    "リーフブレード",
    "リサイクル",
    "リフレクター",
    "りゅうせいぐん",
    "りゅうのいぶき",
    "りゅうのはどう",
    "りゅうのまい",
    "りんごさん",
    "りんしょう",
    "ルミナコリジョン",
    "レイジングブル",
    "れいとうパンチ",
    "れいとうビーム",
    "れんごく",
    "れんぞくぎり",
    "ローキック",
    "ロックオン",
    "ロックカット",
    "ロックブラスト",
    "ワイドガード",
    "ワイドフォース",
    "ワイドブレイカー",
    "ワイルドボルト",
    "わたほうし",
    "わるあがき",
    "わるだくみ",
    "ワンダールーム",
];