var pokeConditions = {
    てだすけ: 'helpingHand',
    //きあいだめ: 'focusEnergy',
    じゅうでん: 'charge',
    はがねのせいしん: 'steelySpirit',
    //みずびたし: 'soak',
    リフレクター: 'reflect',
    ひかりのかべ: 'lightScreen',
    フレンドガード: 'friendGuard',
    //はねやすめ: 'roost',
    // うちおとす: 'smackDown',
    // でんじふゆう: 'magnetRise',
    パワースポット:'powerSpot',
    おいかぜ:'tailwind',
    しつげん:'wetlands',
    被急所:'critical'
};

var pokeItems =[
    '',
    'タイプ強化系アイテム',
    'ノーマルジュエル',
    'タイプ半減系きのみ',
    'いのちのたま',
    'こころのしずく',
    'こだわりハチマキ',
    'こだわりメガネ',
    'こんごうだま',
    'だいこんごうだま',
    'しらたま',
    'だいしらたま',
    'しんかいのキバ',
    'たつじんのおび',
    'ちからのハチマキ',
    'でんきだま',
    'はっきんだま',
    'ふといホネ',
    'メトロノーム',
    'メトロノーム(2回目)',
    'メトロノーム(3回目)',
    'メトロノーム(4回目)',
    'メトロノーム(5回目)',
    'メトロノーム(6回目以降)',
    'ものしりメガネ',
    'くろいてっきゅう',
    'しんかいのウロコ',
    'しんかのきせき',
    'たべのこし',
    'とつげきチョッキ',
    'パンチグローブ',
    'ブーストエナジー',
    'こだわりスカーフ'
];

var aliments =[
    '',
    'どく',
    'まひ',
    'やけど',
    'ねむり'
];

function makePokeConditionsHTML(){
    var pokeConditionsInfoHTML = '';

    //対戦ルール選択ラジオボタン追加
    Object.keys(pokeConditions).forEach(key => 
        pokeConditionsInfoHTML = pokeConditionsInfoHTML + '<label><input type="checkbox" value="'+ pokeConditions[key] +'" name="pokeCondition" class="pokeCondition">'+ key +'</label>'
        );
    return pokeConditionsInfoHTML;
}