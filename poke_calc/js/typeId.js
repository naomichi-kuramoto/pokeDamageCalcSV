//タイプリスト
var typeList = [
    "ノーマル", //0
    "かくとう", //1
    "ひこう",   //2
    "どく",     //3
    "じめん",   //4
    "いわ",     //5
    "むし",     //6
    "ゴースト", //7
    "はがね",   //8
    "ほのお",   //9
    "みず",     //10
    "くさ",     //11
    "でんき",   //12
    "エスパー", //13
    "こおり",   //14
    "ドラゴン", //15
    "あく",     //16
    "フェアリー",//17
    "",         //18
];

//タイプ相性リスト 効果抜群:1 効果いまひとつ:-1 等倍:0 効果なし:null
typeCompatibilityList = {
    ノーマル:[0,0,0,0,0,-1,0,null,-1,0,0,0,0,0,0,0,0,0,null],
    かくとう:[1,0,-1,-1,0,1,-1,null,1,0,0,0,0,-1,1,0,1,-1,null],
    ひこう:[0,1,0,0,0,-1,1,0,-1,0,0,1,-1,0,0,0,0,0,0,null],
    どく:[0,0,0,-1,-1,-1,0,-1,null,0,0,1,0,0,0,0,0,1,null],
    じめん:[0,0,null,1,0,1,-1,0,1,1,0,-1,1,0,0,0,0,0,null],
    いわ:[0,-1,1,0,-1,0,1,0,-1,1,0,0,0,0,1,0,0,0,null],
    むし:[0,-1,-1,-1,0,0,0,-1,-1,-1,0,1,0,1,0,0,1,-1,null],
    ゴースト:[null,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,-1,0,null],
    はがね:[0,0,0,0,0,1,0,0,-1,-1,-1,0,-1,0,1,0,0,1,null],
    ほのお:[0,0,0,0,0,-1,1,0,1,-1,-1,1,0,0,1,-1,0,0,null],
    みず:[0,0,0,0,1,1,0,0,0,1,-1,-1,0,0,0,-1,0,0,null],
    くさ:[0,0,-1,-1,1,1,-1,0,-1,-1,1,-1,0,0,0,-1,0,0,null],
    でんき:[0,0,1,0,null,0,0,0,0,0,1,-1,-1,0,0,-1,0,0,null],
    エスパー:[0,1,0,1,0,0,0,0,-1,0,0,0,0,-1,0,0,null,0,null],
    こおり:[0,0,1,0,1,0,0,0,-1,-1,-1,1,0,0,-1,1,0,0,null],
    ドラゴン:[0,0,0,0,0,0,0,0,-1,0,0,0,0,0,0,1,0,null,null],
    あく:[0,-1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,-1,-1,null],
    フェアリー:[0,1,0,-1,0,0,0,0,-1,-1,0,0,0,0,0,1,1,0,null],
    無し:[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    フライングプレス:[1,1,-1,-1,0,0,0,null,0,0,0,1,-1,-1,1,0,1,-1,null]
};

//ポケモン毎タイプリスト
var pokeTypeList = [
[],
//ニャオハ
[11],
//ニャローテ
[11],
//マスカーニャ
[11, 16],
//ホゲータ
[9],
//アチゲータ
[9],
//ラウドボーン
[9, 7],
//クワッス
[10],
//ウェルカモ
[10],
//ウェーニバル
[10, 1],
//グルトン
[0],
//パフュートン
[0],
//パフュートン
[0],
//タマンチュラ
[6],
//ワナイダー
[6],
//マメバッタ
[6],
//エクスレッグ
[6, 16],
//ハネッコ
[11, 2],
//ポポッコ
[11, 2],
//ワタッコ
[11, 2],
//ヤヤコマ
[0, 2],
//ヒノヤコマ
[9, 2],
//ファイアロー
[9, 2],
//パモ
[12],
//パモット
[12, 1],
//パーモット
[12, 1],
//デルビル
[16, 9],
//ヘルガー
[16, 9],
//ヤングース
[0],
//デカグース
[0],
//ホシガリス
[0],
//ヨクバリス
[0],
//ヒマナッツ
[11],
//キマワリ
[11],
//コロボーシ
[6],
//コロトック
[6],
//コフキムシ
[6],
//コフーライ
[6],
//ビビヨン
[6, 2],
//ミツハニー
[6, 2],
//ビークイン
[6, 2],
//ココガラ
[2],
//アオガラス
[2],
//アーマーガア
[2, 8],
//ピンプク
[0],
//ラッキー
[0],
//ハピナス
[0],
//ルリリ
[0, 17],
//マリル
[10, 17],
//マリルリ
[10, 17],
//アメタマ
[6, 10],
//アメモース
[6, 2],
//ブイゼル
[10],
//フローゼル
[10],
//ウパー
[3, 4],
//ドオー
[3, 4],
//コダック
[10],
//ゴルダック
[10],
//カムカメ
[10],
//カジリガメ
[10, 5],
//ププリン
[0, 17],
//プリン
[0, 17],
//プクリン
[0, 17],
//ラルトス
[13, 17],
//キルリア
[13, 17],
//サーナイト
[13, 17],
//エルレイド
[13, 1],
//スリープ
[13],
//スリーパー
[13],
//ゴース
[7, 3],
//ゴースト
[7, 3],
//ゲンガー
[7, 3],
//ワッカネズミ
[0],
//イッカネズミ
[0],
//ピチュー
[12],
//ピカチュウ
[12],
//ライチュウ
[12],
//パピモッチ
[17],
//バウッツェル
[17],
//ナマケロ
[0],
//ヤルキモノ
[0],
//ケッキング
[0],
//アマカジ
[11],
//アママイコ
[11],
//アマージョ
[11],
//ミニーブ
[11, 0],
//オリーニョ
[11, 0],
//オリーヴァ
[11, 0],
//ウソハチ
[5],
//ウソッキー
[5],
//イワンコ
[5],
//ルガルガン
[5],
//ルガルガン
[5],
//ルガルガン
[5],
//タンドン
[5],
//トロッゴン
[5, 9],
//セキタンザン
[5, 9],
//コリンク
[12],
//ルクシオ
[12],
//レントラー
[12],
//ムックル
[0, 2],
//ムクバード
[0, 2],
//ムクホーク
[0, 2],
//オドリドリ
[9, 2],
//オドリドリ
[12, 2],
//オドリドリ
[13, 2],
//オドリドリ
[7, 2],
//メリープ
[12],
//モココ
[12],
//デンリュウ
[12],
//チュリネ
[11],
//ドレディア
[11],
//キノココ
[11],
//キノガッサ
[11, 1],
//カジッチュ
[11, 15],
//アップリュー
[11, 15],
//タルップル
[11, 15],
//バネブー
[13],
//ブーピッグ
[13],
//イキリンコ
[0, 2],
//ムウマ
[7],
//ムウマージ
[7],
//マクノシタ
[1],
//ハリテヤマ
[1],
//マケンカニ
[1],
//ケケンカニ
[1, 14],
//ヤトウモリ
[3, 9],
//エンニュート
[3, 9],
//ゴマゾウ
[4],
//ドンファン
[4],
//ゾウドウ
[8],
//ダイオウドウ
[8],
//フカマル
[15, 4],
//ガバイト
[15, 4],
//ガブリアス
[15, 4],
//コジオ
[5],
//ジオヅム
[5],
//キョジオーン
[5],
//キャモメ
[10, 2],
//ペリッパー
[10, 2],
//コイキング
[10],
//ギャラドス
[10, 2],
//サシカマス
[10],
//カマスジョー
[10],
//バスラオ
[10],
//バスラオ
[10],
//ゴクリン
[3],
//マルノーム
[3],
//ニャース
[0],
//ペルシアン
[0],
//フワンテ
[7, 2],
//フワライド
[7, 2],
//フラベベ
[17],
//フラエッテ
[17],
//フラージェス
[17],
//ディグダ
[4],
//ダグトリオ
[4],
//コータス
[9],
//ドンメル
[9, 4],
//バクーダ
[9, 4],
//ドーミラー
[8, 13],
//ドータクン
[8, 13],
//キバゴ
[15],
//オノンド
[15],
//オノノクス
[15],
//マンキー
[1],
//オコリザル
[1],
//コノヨザル
[1, 7],
//アサナン
[1, 13],
//チャーレム
[1, 13],
//リオル
[1],
//ルカリオ
[1, 8],
//カルボウ
[9],
//グレンアルマ
[9, 13],
//ソウブレイズ
[9, 7],
//ドジョッチ
[10, 4],
//ナマズン
[10, 4],
//ズピカ
[12],
//ハラバリー
[12],
//ヌメラ
[15],
//ヌメイル
[15],
//ヌメルゴン
[15],
//グレッグル
[3, 1],
//ドクロッグ
[3, 1],
//カイデン
[12, 2],
//タイカイデン
[12, 2],
//イーブイ
[0],
//シャワーズ
[10],
//サンダース
[12],
//ブースター
[9],
//エーフィ
[13],
//ブラッキー
[16],
//リーフィア
[11],
//グレイシア
[14],
//ニンフィア
[17],
//ノコッチ
[0],
//ノココッチ
[0],
//シキジカ
[0, 11],
//メブキジカ
[0, 11],
//キリンリキ
[0, 13],
//リキキリン
[0, 13],
//ベトベター
[3],
//ベトベトン
[3],
//オラチフ
[16],
//マフィティフ
[16],
//エレズン
[12, 3],
//ストリンダー
[12, 3],
//ストリンダー
[12, 3],
//デデンネ
[12, 17],
//パチリス
[12],
//シルシュルー
[3, 0],
//タギングル
[3, 0],
//オドシシ
[0],
//タマゲタケ
[11, 3],
//モロバレル
[11, 3],
//ビリリダマ
[12],
//マルマイン
[12],
//コイル
[12, 8],
//レアコイル
[12, 8],
//ジバコイル
[12, 8],
//メタモン
[0],
//ガーディ
[9],
//ウインディ
[9],
//ヒメグマ
[0],
//リングマ
[0],
//ザングース
[0],
//ハブネーク
[3],
//チルット
[0, 2],
//チルタリス
[15, 2],
//メェークル
[11],
//ゴーゴート
[11],
//ケンタロス
[1],
//ケンタロス
[1, 9],
//ケンタロス
[1, 10],
//シシコ
[9, 0],
//カエンジシ
[9, 0],
//スカンプー
[3, 16],
//スカタンク
[3, 16],
//ゾロア
[16],
//ゾロアーク
[16],
//ニューラ
[16, 14],
//マニューラ
[16, 14],
//ヤミカラス
[16, 2],
//ドンカラス
[16, 2],
//ゴチム
[13],
//ゴチミル
[13],
//ゴチルゼル
[13],
//ヤバチャ
[7],
//ポットデス
[7],
//ミミッキュ
[7, 17],
//クレッフィ
[8, 17],
//イエッサン
[13, 0],
//イエッサン
[13, 0],
//アノクサ
[11, 7],
//アノホラグサ
[11, 7],
//ノノクラゲ
[4, 11],
//リククラゲ
[4, 11],
//トロピウス
[11, 2],
//カリキリ
[11],
//ラランテス
[11],
//ガケガニ
[5],
//カプサイジ
[11],
//スコヴィラン
[11, 9],
//サボネア
[11],
//ノクタス
[11, 16],
//シガロコ
[6],
//ベラカス
[6, 13],
//コンパン
[6, 3],
//モルフォン
[6, 3],
//クヌギダマ
[6],
//フォレトス
[6, 8],
//ストライク
[6, 2],
//ハッサム
[6, 8],
//ヘラクロス
[6, 1],
//ヒラヒナ
[13],
//クエスパトラ
[13],
//ヒポポタス
[4],
//カバルドン
[4],
//メグロコ
[4, 16],
//ワルビル
[4, 16],
//ワルビアル
[4, 16],
//スナヘビ
[4],
//サダイジャ
[4],
//ドロバンコ
[4],
//バンバドロ
[4],
//メラルバ
[6, 9],
//ウルガモス
[6, 9],
//タツベイ
[15],
//コモルー
[15],
//ボーマンダ
[15, 2],
//カヌチャン
[17, 8],
//ナカヌチャン
[17, 8],
//デカヌチャン
[17, 8],
//ミブリム
[13],
//テブリム
[13],
//ブリムオン
[13, 17],
//ベロバー
[16, 17],
//ギモー
[16, 17],
//オーロンゲ
[16, 17],
//ウミディグダ
[10],
//ウミトリオ
[10],
//オトシドリ
[2, 16],
//ナミイルカ
[10],
//イルカマン
[10],
//イルカマン
[10],
//ブロロン
[8, 3],
//ブロロローム
[8, 3],
//モトトカゲ
[15, 0],
//ミミズズ
[8],
//ヤミラミ
[16, 7],
//カゲボウズ
[7],
//ジュペッタ
[7],
//タイレーツ
[1],
//ルチャブル
[1, 2],
//ミカルゲ
[7, 16],
//オンバット
[2, 15],
//オンバーン
[2, 15],
//ドラメシヤ
[15, 7],
//ドロンチ
[15, 7],
//ドラパルト
[15, 7],
//キラーメ
[5, 3],
//キラフロル
[5, 3],
//ロトム
[12, 7],
//ロトム
[12, 9],
//ロトム
[12, 10],
//ロトム
[12, 14],
//ロトム
[12, 2],
//ロトム
[12, 11],
//ボチ
[7],
//ハカドッグ
[7],
//ヤレユータン
[0, 13],
//ナゲツケサル
[1],
//ネッコアラ
[0],
//ヨーギラス
[5, 4],
//サナギラス
[5, 4],
//バンギラス
[5, 16],
//イシヘンジン
[5],
//コオリッポ
[14],
//コオリッポ
[14],
//バチンウニ
[12],
//スナバァ
[7, 4],
//シロデスナ
[7, 4],
//ヤドン
[10, 13],
//ヤドラン
[10, 13],
//ヤドキング
[10, 13],
//カラナクシ
[10],
//トリトドン
[10, 4],
//シェルダー
[10],
//パルシェン
[10, 14],
//ハリーセン
[10, 3],
//ラブカス
[10],
//ケイコウオ
[10],
//ネオラント
[10],
//ハギギシリ
[10, 13],
//ママンボウ
[10],
//クズモー
[3, 10],
//ドラミドロ
[3, 15],
//ウデッポウ
[10],
//ブロスター
[10],
//シビシラス
[12],
//シビビール
[12],
//シビルドン
[12],
//ヒドイデ
[3, 10],
//ドヒドイデ
[3, 10],
//カラミンゴ
[2, 1],
//ミニリュウ
[15],
//ハクリュー
[15],
//カイリュー
[15, 2],
//ユキハミ
[14, 6],
//モスノウ
[14, 6],
//ユキカブリ
[11, 14],
//ユキノオー
[11, 14],
//デリバード
[14, 2],
//クマシュン
[14],
//ツンベアー
[14],
//ユキワラシ
[14],
//オニゴーリ
[14],
//ユキメノコ
[14, 7],
//フリージオ
[14],
//アルクジラ
[14],
//ハルクジラ
[14],
//カチコール
[14],
//クレベース
[14],
//ワシボン
[0, 2],
//ウォーグル
[0, 2],
//コマタナ
[16, 8],
//キリキザン
[16, 8],
//ドドゲザン
[16, 8],
//モノズ
[16, 15],
//ジヘッド
[16, 15],
//サザンドラ
[16, 15],
//ミガルーサ
[10, 13],
//ヘイラッシャ
[10],
//シャリタツ
[15, 10],
//イダイナキバ
[4, 1],
//サケブシッポ
[17, 13],
//アラブルタケ
[11, 16],
//ハバタクカミ
[7, 17],
//チヲハウハネ
[6, 1],
//スナノケガワ
[12, 4],
//テツノワダチ
[4, 8],
//テツノツツミ
[14, 10],
//テツノカイナ
[1, 12],
//テツノコウベ
[16, 2],
//テツノドクガ
[9, 3],
//テツノイバラ
[5, 12],
//セビエ
[15, 14],
//セゴール
[15, 14],
//セグレイブ
[15, 14],
//コレクレー
[7],
//サーフゴー
[8, 7],
//チオンジェン
[16, 11],
//パオジアン
[16, 14],
//ディンルー
[16, 4],
//イーユイ
[16, 9],
//トドロクツキ
[15, 16],
//テツノブジン
[17, 1],
//コライドン
[1, 15],
//ミライドン
[12, 15],
//ヒトカゲ
[9],
//リザード
[9],
//リザードン
[9, 2],
//ライチュウ
[12, 13],
//ディグダ
[4, 8],
//ダグトリオ
[4, 8],
//ニャース
[16],
//ニャース
[8],
//ペルシアン
[16],
//ガーディ
[9, 5],
//ウインディ
[9, 5],
//ヤドン
[13],
//ヤドラン
[3, 13],
//ベトベター
[3, 16],
//ベトベトン
[3, 16],
//ビリリダマ
[12, 11],
//マルマイン
[12, 11],
//ケンタロス
[0],
//フリーザー
[14, 2],
//フリーザー
[13, 2],
//サンダー
[12, 2],
//サンダー
[1, 2],
//ファイヤー
[9, 2],
//ファイヤー
[16, 2],
//ミュウツー
[13],
//ミュウ
[13],
//ヒノアラシ
[9],
//マグマラシ
[9],
//バクフーン
[9],
//バクフーン
[9, 7],
//ウパー
[10, 4],
//ヌオー
[10, 4],
//ヤドキング
[3, 13],
//ハリーセン
[16, 3],
//ニューラ
[1, 3],
//カイオーガ
[10],
//グラードン
[4],
//レックウザ
[15, 2],
//ユクシー
[13],
//エムリット
[13],
//アグノム
[13],
//ディアルガ
[8, 15],
//ディアルガ
[8, 15],
//パルキア
[10, 15],
//パルキア
[10, 15],
//ヒードラン
[9, 8],
//ギラティナ
[7, 15],
//ギラティナ
[7, 15],
//クレセリア
[13],
//アルセウス
[0],
//ミジュマル
[10],
//フタチマル
[10],
//ダイケンキ
[10],
//ダイケンキ
[10, 16],
//ドレディア
[11, 1],
//バスラオ
[10],
//ゾロア
[0, 7],
//ゾロアーク
[0, 7],
//ウォーグル
[13, 2],
//トルネロス
[2],
//トルネロス
[2],
//ボルトロス
[12, 2],
//ボルトロス
[12, 2],
//ランドロス
[4, 2],
//ランドロス
[4, 2],
//メロエッタ
[0, 13],
//メロエッタ
[0, 1],
//ハリマロン
[11],
//ハリボーグ
[11],
//ブリガロン
[11, 1],
//フォッコ
[9],
//テールナー
[9],
//マフォクシー
[9, 13],
//ケロマツ
[10],
//ゲコガシラ
[10],
//ゲッコウガ
[10, 16],
//メレシー
[5, 17],
//ヌメイル
[8, 15],
//ヌメルゴン
[8, 15],
//クレベース
[14, 5],
//ディアンシー
[5, 17],
//フーパ
[13, 7],
//フーパ
[13, 16],
//ボルケニオン
[9, 10],
//モクロー
[11, 2],
//フクスロー
[11, 2],
//ジュナイパー
[11, 7],
//ジュナイパー
[11, 1],
//マギアナ
[8, 17],
//サルノリ
[11],
//バチンキー
[11],
//ゴリランダー
[11],
//ヒバニー
[9],
//ラビフット
[9],
//エースバーン
[9],
//メッソン
[10],
//ジメレオン
[10],
//インテレオン
[10],
//ニャイキング
[8],
//ザシアン
[17],
//ザシアン
[17, 8],
//ザマゼンタ
[1],
//ザマゼンタ
[1, 8],
//ムゲンダイナ
[3, 15],
//ダクマ
[1],
//ウーラオス
[1, 16],
//ウーラオス
[1, 10],
//ザルード
[16, 11],
//レジエレキ
[12],
//レジドラゴ
[15],
//ブリザポス
[14],
//レイスポス
[7],
//バドレックス
[13, 11],
//バドレックス
[13, 14],
//バドレックス
[13, 7],
//アヤシシ
[0, 13],
//バサギリ
[6, 5],
//ガチグマ
[4, 0],
//イダイトウ
[10, 7],
//イダイトウ
[10, 7],
//オオニューラ
[1, 3],
//ハリーマン
[16, 3],
//ラブトロス
[17, 2],
//ラブトロス
[17, 2],
//ウネルミナモ
[10, 15],
//テツノイサハ
[11, 13],
];