var pokeAbilityList = [
    [],
    //ニャオハ
    [97, 241],
    //ニャローテ
    [97, 241],
    //マスカーニャ
    [97, 241],
    //ホゲータ
    [275, 155],
    //アチゲータ
    [275, 155],
    //ラウドボーン
    [275, 155],
    //クワッス
    [75, 99],
    //ウェルカモ
    [75, 99],
    //ウェーニバル
    [75, 99],
    //グルトン
    [12, 67, 5],
    //パフュートン
    [165, 67, 5],
    //パフュートン
    [12, 67, 5],
    //タマンチュラ
    [229, 196],
    //ワナイダー
    [229, 196],
    //マメバッタ
    [269, 20],
    //エクスレッグ
    [269, 20],
    //ハネッコ
    [284, 290, 120],
    //ポポッコ
    [284, 290, 120],
    //ワタッコ
    [284, 290, 120],
    //ヤヤコマ
    [189, 193],
    //ヒノヤコマ
    [246, 193],
    //ファイアロー
    [246, 193],
    //パモ
    [126, 89, 150],
    //パモット
    [144, 89, 150],
    //パーモット
    [144, 89, 150],
    //デルビル
    [192, 278, 63],
    //ヘルガー
    [192, 278, 63],
    //ヤングース
    [196, 50, 148],
    //デカグース
    [196, 50, 148],
    //ホシガリス
    [245, 67],
    //ヨクバリス
    [245, 67],
    //ヒマナッツ
    [284, 87, 192],
    //キマワリ
    [284, 87, 192],
    //コロボーシ
    [140, 174],
    //コロトック
    [269, 149],
    //コフキムシ
    [294, 222, 234],
    //コフーライ
    [140, 234],
    //ビビヨン
    [294, 222, 234],
    //ミツハニー
    [266, 195],
    //ビークイン
    [239, 63],
    //ココガラ
    [121, 63, 189],
    //アオガラス
    [121, 63, 189],
    //アーマーガア
    [239, 63, 267],
    //ピンプク
    [89, 156, 234],
    //ラッキー
    [89, 156, 18],
    //ハピナス
    [89, 156, 18],
    //ルリリ
    [5, 143, 128],
    //マリル
    [5, 143, 128],
    //マリルリ
    [5, 143, 128],
    //アメタマ
    [107, 9],
    //アメモース
    [13, 63],
    //ブイゼル
    [107, 265],
    //フローゼル
    [107, 265],
    //ウパー
    [168, 146, 155],
    //ドオー
    [168, 146, 155],
    //コダック
    [90, 181, 107],
    //ゴルダック
    [90, 181, 107],
    //カムカメ
    [50, 88, 107],
    //カジリガメ
    [50, 88, 107],
    //ププリン
    [273, 44, 234],
    //プリン
    [273, 44, 234],
    //プクリン
    [273, 44, 32],
    //ラルトス
    [96, 164, 153],
    //キルリア
    [96, 164, 153],
    //サーナイト
    [96, 164, 153],
    //エルレイド
    [223, 61, 124],
    //スリープ
    [229, 286, 125],
    //スリーパー
    [229, 286, 125],
    //ゴース
    [230],
    //ゴースト
    [230],
    //ゲンガー
    [183],
    //ワッカネズミ
    [174, 276, 254],
    //イッカネズミ
    [234, 245, 149],
    //ピチュー
    [126, 210],
    //ピカチュウ
    [126, 210],
    //ライチュウ
    [126, 210],
    //パピモッチ
    [254, 235],
    //バウッツェル
    [79, 12],
    //ナマケロ
    [173],
    //ヤルキモノ
    [279],
    //ケッキング
    [173],
    //アマカジ
    [290, 171, 106],
    //アママイコ
    [290, 171, 106],
    //アマージョ
    [290, 103, 106],
    //ミニーブ
    [192, 91],
    //オリーニョ
    [192, 91],
    //オリーヴァ
    [78, 91],
    //ウソハチ
    [49, 16, 213],
    //ウソッキー
    [49, 16, 213],
    //イワンコ
    [121, 279, 223, 254],
    //ルガルガン
    [121, 116, 223],
    //ルガルガン
    [121, 279, 180],
    //ルガルガン
    [42],
    //タンドン
    [102, 135, 278],
    //トロッゴン
    [102, 246, 278],
    //セキタンザン
    [102, 246, 278],
    //コリンク
    [160, 161, 13, 80],
    //ルクシオ
    [160, 161, 13, 80],
    //レントラー
    [160, 161, 13, 80],
    //ムックル
    [121, 113],
    //ムクバード
    [13, 113],
    //ムクホーク
    [13, 113],
    //オドリドリ
    [31],
    //オドリドリ
    [31],
    //オドリドリ
    [31],
    //オドリドリ
    [31],
    //メリープ
    [126, 237],
    //モココ
    [126, 237],
    //デンリュウ
    [126, 237],
    //チュリネ
    [284, 254, 290],
    //ドレディア
    [284, 254, 290],
    //キノココ
    [244, 251, 191],
    //キノガッサ
    [244, 251, 149],
    //カジッチュ
    [101, 67, 250],
    //アップリュー
    [101, 67, 195],
    //タルップル
    [101, 67, 5],
    //バネブー
    [5, 254, 67],
    //ブーピッグ
    [5, 254, 67],
    //イキリンコ
    [13, 195, 80, 142],
    //ムウマ
    [230],
    //ムウマージ
    [230],
    //マクノシタ
    [5, 80, 142],
    //ハリテヤマ
    [5, 80, 142],
    //マケンカニ
    [36, 150, 15],
    //ケケンカニ
    [36, 150, 15],
    //ヤトウモリ
    [227, 171],
    //エンニュート
    [227, 171],
    //ゴマゾウ
    [276, 117],
    //ドンファン
    [49, 117],
    //ゾウドウ
    [142, 243],
    //ダイオウドウ
    [142, 243],
    //フカマル
    [117, 86],
    //ガバイト
    [117, 86],
    //ガブリアス
    [117, 86],
    //コジオ
    [60, 49, 72],
    //ジオヅム
    [60, 49, 72],
    //キョジオーン
    [60, 49, 72],
    //キャモメ
    [121, 24, 9],
    //ペリッパー
    [121, 10, 9],
    //コイキング
    [107, 213],
    //ギャラドス
    [13, 99],
    //サシカマス
    [107, 111],
    //カマスジョー
    [107, 111],
    //バスラオ
    [113, 148, 43],
    //バスラオ
    [16, 148, 43],
    //ゴクリン
    [240, 179, 67],
    //マルノーム
    [240, 179, 67],
    //ニャース
    [276, 149, 63],
    //ペルシアン
    [100, 149, 63],
    //フワンテ
    [280, 46, 178],
    //フワライド
    [280, 46, 178],
    //フラベベ
    [232, 59],
    //フラエッテ
    [232, 59],
    //フラージェス
    [232, 59],
    //ディグダ
    [117, 11, 118],
    //ダグトリオ
    [117, 11, 118],
    //コータス
    [94, 207, 88],
    //ドンメル
    [171, 137, 254],
    //バクーダ
    [255, 184, 15],
    //ドーミラー
    [230, 135, 243],
    //ドータクン
    [230, 135, 243],
    //キバゴ
    [160, 161, 43, 63],
    //オノンド
    [160, 161, 43, 63],
    //オノノクス
    [160, 161, 43, 63],
    //マンキー
    [279, 15, 256],
    //オコリザル
    [279, 15, 256],
    //コノヨザル
    [279, 125, 256],
    //アサナン
    [285, 153],
    //チャーレム
    [285, 153],
    //リオル
    [223, 125, 17],
    //ルカリオ
    [223, 125, 124],
    //カルボウ
    [278, 246],
    //グレンアルマ
    [278, 71],
    //ソウブレイズ
    [278, 71],
    //ドジョッチ
    [171, 52, 24],
    //ナマズン
    [171, 52, 24],
    //ズピカ
    [254, 126, 90],
    //ハラバリー
    [159, 126, 90],
    //ヌメラ
    [128, 24, 176],
    //ヌメイル
    [128, 24, 176],
    //ヌメルゴン
    [128, 24, 176],
    //グレッグル
    [52, 48, 167],
    //ドクロッグ
    [52, 48, 167],
    //カイデン
    [218, 144, 44],
    //タイカイデン
    [218, 144, 44],
    //イーブイ
    [174, 148, 52],
    //シャワーズ
    [146, 24],
    //サンダース
    [144, 191],
    //ブースター
    [278, 80],
    //エーフィ
    [96, 259],
    //ブラッキー
    [96, 125],
    //リーフィア
    [290, 284],
    //グレイシア
    [282, 3],
    //ニンフィア
    [273, 220],
    //ノコッチ
    [156, 174, 213],
    //ノココッチ
    [156, 174, 213],
    //シキジカ
    [284, 128, 156],
    //メブキジカ
    [284, 128, 156],
    //キリンリキ
    [125, 192, 128],
    //リキキリン
    [197, 147, 128],
    //ベトベター
    [4, 179, 167],
    //ベトベトン
    [4, 179, 167],
    //オラチフ
    [13, 174, 196],
    //マフィティフ
    [13, 202, 196],
    //エレズン
    [213, 126, 235],
    //ストリンダー
    [205, 237, 149],
    //ストリンダー
    [205, 253, 149],
    //デデンネ
    [245, 276, 237],
    //パチリス
    [174, 276, 144],
    //シルシュルー
    [46, 301, 17],
    //タギングル
    [46, 167, 17],
    //オドシシ
    [13, 32, 128],
    //タマゲタケ
    [244, 84],
    //モロバレル
    [244, 84],
    //ビリリダマ
    [248, 126, 280],
    //マルマイン
    [248, 126, 280],
    //コイル
    [104, 49, 7],
    //レアコイル
    [104, 49, 7],
    //ジバコイル
    [104, 49, 7],
    //メタモン
    [100, 47],
    //ガーディ
    [13, 278, 124],
    //ウインディ
    [13, 278, 124],
    //ヒメグマ
    [276, 191, 266],
    //リングマ
    [80, 191, 63],
    //ザングース
    [274, 169],
    //ハブネーク
    [140, 120],
    //チルット
    [89, 181],
    //チルタリス
    [89, 181],
    //メェークル
    [128, 70],
    //ゴーゴート
    [128, 70],
    //ケンタロス
    [13, 15, 197],
    //ケンタロス
    [13, 15, 197],
    //ケンタロス
    [13, 15, 197],
    //シシコ
    [160, 161, 63, 99],
    //カエンジシ
    [160, 161, 63, 99],
    //スカンプー
    [4, 280, 121],
    //スカタンク
    [4, 280, 121],
    //ゾロア
    [19],
    //ゾロアーク
    [19],
    //ニューラ
    [125, 121, 301],
    //マニューラ
    [239, 301],
    //ヤミカラス
    [229, 57, 17],
    //ドンカラス
    [229, 57, 99],
    //ゴチム
    [32, 44, 39],
    //ゴチミル
    [32, 44, 39],
    //ゴチルゼル
    [32, 44, 39],
    //ヤバチャ
    [71, 183],
    //ポットデス
    [71, 183],
    //ミミッキュ
    [198],
    //クレッフィ
    [17, 257],
    //イエッサン
    [125, 96, 83],
    //イエッサン
    [254, 96, 83],
    //アノクサ
    [40, 120],
    //アノホラグサ
    [40, 120],
    //ノノクラゲ
    [62],
    //リククラゲ
    [62],
    //トロピウス
    [284, 87, 91],
    //カリキリ
    [290, 8],
    //ラランテス
    [290, 8],
    //ガケガニ
    [14, 88, 84],
    //カプサイジ
    [284, 229, 235],
    //スコヴィラン
    [284, 229, 270],
    //サボネア
    [117, 146],
    //ノクタス
    [117, 146],
    //シガロコ
    [222, 140],
    //ベラカス
    [96, 153],
    //コンパン
    [222, 20, 174],
    //モルフォン
    [294, 20, 268],
    //クヌギダマ
    [49, 249],
    //フォレトス
    [49, 249],
    //ストライク
    [269, 149, 223],
    //ハッサム
    [269, 149, 289],
    //ヘラクロス
    [269, 80, 99],
    //ヒラヒナ
    [52, 32, 41],
    //クエスパトラ
    [214, 32, 41],
    //ヒポポタス
    [115, 118],
    //カバルドン
    [115, 118],
    //メグロコ
    [13, 99, 15],
    //ワルビル
    [13, 99, 15],
    //ワルビアル
    [13, 99, 15],
    //スナヘビ
    [119, 140, 117],
    //サダイジャ
    [119, 140, 117],
    //ドロバンコ
    [254, 98, 125],
    //バンバドロ
    [254, 98, 125],
    //メラルバ
    [246, 269],
    //ウルガモス
    [246, 269],
    //タツベイ
    [16, 142],
    //コモルー
    [16, 249],
    //ボーマンダ
    [13, 99],
    //カヌチャン
    [43, 254, 301],
    //ナカヌチャン
    [43, 254, 301],
    //デカヌチャン
    [43, 254, 301],
    //ミブリム
    [18, 52, 259],
    //テブリム
    [18, 52, 259],
    //ブリムオン
    [18, 52, 259],
    //ベロバー
    [17, 32, 301],
    //ギモー
    [17, 32, 301],
    //オーロンゲ
    [17, 32, 301],
    //ウミディグダ
    [176, 213, 117],
    //ウミトリオ
    [176, 213, 117],
    //オトシドリ
    [189, 121, 21],
    //ナミイルカ
    [265],
    //イルカマン
    [252],
    //イルカマン
    [252],
    //ブロロン
    [249, 122],
    //ブロロローム
    [249, 217],
    //モトトカゲ
    [140, 84],
    //ミミズズ
    [170, 117],
    //ヤミラミ
    [121, 6, 17],
    //カゲボウズ
    [229, 32, 183],
    //ジュペッタ
    [229, 32, 183],
    //タイレーツ
    [45, 256],
    //ルチャブル
    [100, 46, 43],
    //ミカルゲ
    [239, 120],
    //オンバット
    [32, 120, 153],
    //オンバーン
    [32, 120, 153],
    //ドラメシヤ
    [72, 120, 183],
    //ドロンチ
    [72, 120, 183],
    //ドラパルト
    [72, 120, 183],
    //キラーメ
    [166, 227],
    //キラフロル
    [166, 227],
    //ロトム
    [230],
    //ロトム
    [230],
    //ロトム
    [230],
    //ロトム
    [230],
    //ロトム
    [230],
    //ロトム
    [230],
    //ボチ
    [276, 277],
    //ハカドッグ
    [116, 277],
    //ヤレユータン
    [125, 153, 59],
    //ナゲツケサル
    [295, 256],
    //ネッコアラ
    [127],
    //ヨーギラス
    [80, 117],
    //サナギラス
    [140],
    //バンギラス
    [115, 63],
    //イシヘンジン
    [204],
    //コオリッポ
    [2],
    //コオリッポ
    [2],
    //バチンウニ
    [210, 27],
    //スナバァ
    [264, 117],
    //シロデスナ
    [264, 117],
    //ヤドン
    [171, 254, 84],
    //ヤドラン
    [171, 254, 84],
    //ヤドキング
    [171, 254, 84],
    //カラナクシ
    [179, 287, 118],
    //トリトドン
    [179, 287, 118],
    //シェルダー
    [88, 110, 249],
    //パルシェン
    [88, 110, 249],
    //ハリーセン
    [168, 107, 13],
    //ラブカス
    [107, 24],
    //ケイコウオ
    [107, 287, 265],
    //ネオラント
    [107, 287, 265],
    //ハギギシリ
    [212, 50, 268],
    //ママンボウ
    [18, 24, 84],
    //クズモー
    [168, 167, 148],
    //ドラミドロ
    [168, 167, 148],
    //ウデッポウ
    [271],
    //ブロスター
    [271],
    //シビシラス
    [230],
    //シビビール
    [230],
    //シビルドン
    [230],
    //ヒドイデ
    [208, 100, 84],
    //ドヒドイデ
    [208, 100, 84],
    //カラミンゴ
    [55, 145, 58],
    //ミニリュウ
    [140, 225],
    //ハクリュー
    [140, 225],
    //カイリュー
    [125, 260],
    //ユキハミ
    [294, 76],
    //モスノウ
    [294, 76],
    //ユキカブリ
    [283, 248],
    //ユキノオー
    [283, 248],
    //デリバード
    [279, 195, 229],
    //クマシュン
    [282, 281, 213],
    //ツンベアー
    [282, 281, 107],
    //ユキワラシ
    [125, 3, 270],
    //オニゴーリ
    [125, 3, 270],
    //ユキメノコ
    [282, 183],
    //フリージオ
    [230],
    //アルクジラ
    [5, 282, 142],
    //ハルクジラ
    [5, 281, 142],
    //カチコール
    [254, 3, 49],
    //クレベース
    [254, 3, 49],
    //ワシボン
    [121, 142, 195],
    //ウォーグル
    [121, 142, 256],
    //コマタナ
    [256, 125, 239],
    //キリキザン
    [256, 125, 239],
    //ドドゲザン
    [256, 129, 130, 131, 132, 239],
    //モノズ
    [195],
    //ジヘッド
    [195],
    //サザンドラ
    [230],
    //ミガルーサ
    [43, 61],
    //ヘイラッシャ
    [155, 171, 265],
    //シャリタツ
    [93, 287],
    //イダイナキバ
    [77],
    //サケブシッポ
    [77],
    //アラブルタケ
    [77],
    //ハバタクカミ
    [77],
    //チヲハウハネ
    [77],
    //スナノケガワ
    [77],
    //テツノワダチ
    [69],
    //テツノツツミ
    [69],
    //テツノカイナ
    [69],
    //テツノコウベ
    [69],
    //テツノドクガ
    [69],
    //テツノイバラ
    [69],
    //セビエ
    [177, 3],
    //セゴール
    [177, 3],
    //セグレイブ
    [177, 3],
    //コレクレー
    [213],
    //サーフゴー
    [30],
    //チオンジェン
    [297],
    //パオジアン
    [299],
    //ディンルー
    [296],
    //イーユイ
    [298],
    //トドロクツキ
    [77],
    //テツノブジン
    [69],
    //コライドン
    [209],
    //ミライドン
    [190],
    //ヒトカゲ
    [275, 87],
    //リザード
    [275, 87],
    //リザードン
    [275, 87],
    //ライチュウ
    [82],
    //ディグダ
    [117, 35, 118],
    //ダグトリオ
    [117, 35, 118],
    //ニャース
    [276, 149, 213],
    //ニャース
    [276, 42, 63],
    //ペルシアン
    [215, 149, 213],
    //ガーディ
    [13, 278, 16],
    //ウインディ
    [13, 278, 16],
    //ヤドン
    [67, 254, 84],
    //ヤドラン
    [68, 254, 84],
    //ベトベター
    [167, 67, 37],
    //ベトベトン
    [167, 67, 37],
    //ビリリダマ
    [248, 126, 280],
    //マルマイン
    [248, 126, 280],
    //ケンタロス
    [13, 15, 142],
    //フリーザー
    [239, 282],
    //フリーザー
    [44],
    //サンダー
    [239, 126],
    //サンダー
    [256],
    //ファイヤー
    [239, 246],
    //ファイヤー
    [65],
    //ミュウツー
    [239, 63],
    //ミュウ
    [96],
    //ヒノアラシ
    [275, 278],
    //マグマラシ
    [275, 278],
    //バクフーン
    [275, 278],
    //バクフーン
    [275, 32],
    //ウパー
    [90, 146, 155],
    //ヌオー
    [90, 146, 155],
    //ヤドキング
    [54, 254, 84],
    //ハリーセン
    [168, 107, 13],
    //ニューラ
    [125, 121, 301],
    //カイオーガ
    [10],
    //グラードン
    [207],
    //レックウザ
    [25],
    //ユクシー
    [230],
    //エムリット
    [230],
    //アグノム
    [230],
    //ディアルガ
    [239, 153],
    //ディアルガ
    [239, 153],
    //パルキア
    [239, 153],
    //パルキア
    [239, 153],
    //ヒードラン
    [278, 246],
    //ギラティナ
    [239, 153],
    //ギラティナ
    [230],
    //クレセリア
    [230],
    //アルセウス
    [261],
    //ミジュマル
    [75, 88],
    //フタチマル
    [75, 88],
    //ダイケンキ
    [75, 88],
    //ダイケンキ
    [75, 61],
    //ドレディア
    [284, 195, 290],
    //バスラオ
    [213, 148, 43],
    //ゾロア
    [19],
    //ゾロアーク
    [19],
    //ウォーグル
    [121, 142, 20],
    //トルネロス
    [17, 256],
    //トルネロス
    [84],
    //ボルトロス
    [17, 256],
    //ボルトロス
    [144],
    //ランドロス
    [118, 142],
    //ランドロス
    [13],
    //メロエッタ
    [156],
    //メロエッタ
    [156],
    //ハリマロン
    [97, 250],
    //ハリボーグ
    [97, 250],
    //ブリガロン
    [97, 250],
    //フォッコ
    [275, 257],
    //テールナー
    [275, 257],
    //マフォクシー
    [275, 257],
    //ケロマツ
    [75, 241],
    //ゲコガシラ
    [75, 241],
    //ゲッコウガ
    [75, 241, 53],
    //メレシー
    [72, 49],
    //ヌメイル
    [128, 88, 176],
    //ヌメルゴン
    [128, 88, 176],
    //クレベース
    [50, 3, 49],
    //ディアンシー
    [72],
    //フーパ
    [257],
    //フーパ
    [257],
    //ボルケニオン
    [146],
    //モクロー
    [97, 28],
    //フクスロー
    [97, 28],
    //ジュナイパー
    [97, 28],
    //ジュナイパー
    [97, 55],
    //マギアナ
    [133],
    //サルノリ
    [97, 74],
    //バチンキー
    [97, 74],
    //ゴリランダー
    [97, 74],
    //ヒバニー
    [275, 291],
    //ラビフット
    [275, 291],
    //エースバーン
    [275, 291],
    //メッソン
    [75, 114],
    //ジメレオン
    [75, 114],
    //インテレオン
    [75, 114],
    //ニャイキング
    [45, 42, 186],
    //ザシアン
    [228],
    //ザシアン
    [228],
    //ザマゼンタ
    [224],
    //ザマゼンタ
    [224],
    //ムゲンダイナ
    [239],
    //ダクマ
    [125, 180],
    //ウーラオス
    [221],
    //ウーラオス
    [221],
    //ザルード
    [290],
    //レジエレキ
    [163],
    //レジドラゴ
    [293],
    //ブリザポス
    [95],
    //レイスポス
    [73],
    //バドレックス
    [63],
    //バドレックス
    [105],
    //バドレックス
    [105],
    //アヤシシ
    [13, 32, 128],
    //バサギリ
    [269, 142, 61],
    //ガチグマ
    [80, 250, 63],
    //イダイトウ
    [107, 148, 43],
    //イダイトウ
    [107, 148, 43],
    //オオニューラ
    [239, 46, 167],
    //ハリーマン
    [168, 107, 13],
    //ラブトロス
    [273, 8],
    //ラブトロス
    [249],
    //ウネルミナモ
    [77],
    //テツノイサハ
    [69],
];