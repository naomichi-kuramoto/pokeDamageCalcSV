var environment = {
    battleRule:'single',
    weather:'none',
    terrain:'none',
    condition:{
        じゅうりょく: false,
        ワンダールーム: false,
        フェアリーオーラ: false,
        ダークオーラ: false,
        オーラブレイク: false,
        わざわいのおふだ: false,
        わざわいのつるぎ: false,
        わざわいのうつわ: false,
        わざわいのたま: false
    }
};

var battleRules = {
    シングル:'single',
    ダブル:'double'
};

var weathers = {
    なし:'none',
    雨:'rain',
    晴:'sunny',
    砂嵐:'sandstorm',
    雪:'snow'
};

var terrains ={
    なし:'none',
    エレキ:'electric',
    グラス:'grass',
    サイコ:'psycho',
    ミスト:'mist'
};

var conditions = {
    じゅうりょく: 'gravity',
    ワンダールーム: 'wanderRoom',
    わざわいのおふだ:'tabletsOfRuin',
    わざわいのつるぎ:'swordOfRuin',
    わざわいのうつわ:'vesselOfRuin',
    わざわいのたま:'beadsOfRuin'
};

//環境（ポケモンの状態じゃなく場全体に影響するやつ）の入力欄HTML文字列を戻す
function makeEnvironmentHTML(){
    var environmentInfoHTML = '<div class="environmentInfo">'
    environmentInfoHTML =  environmentInfoHTML + '<div class="environmentTitle">環境</div>';
    //var environmentInfoHTML = '<div class="environmentInfo">';
    //対戦ルール選択ラジオボタン追加
    environmentInfoHTML = environmentInfoHTML + '<div class="battleRules">';
    Object.keys(battleRules).forEach(key => 
        environmentInfoHTML = environmentInfoHTML + '<label><input type="radio" value="'+ battleRules[key] +'" name="battleRule" class="battleRule"><span class="button">'+ key +'</span></label>'
        );
    environmentInfoHTML = environmentInfoHTML + '</div>';

    //天候選択ラジオボタン追加
    environmentInfoHTML = environmentInfoHTML + '<div class="weathers">';
    Object.keys(weathers).forEach(key => 
        environmentInfoHTML = environmentInfoHTML + '<label><input type="radio" value="'+ weathers[key] +'" name="weathers" class="weather"><span class="button">'+ key +'</span></label>'
        );
    environmentInfoHTML = environmentInfoHTML + '</div>';

    //フィールドラジオボタン追加
    environmentInfoHTML = environmentInfoHTML + '<div class="terrains">';
    Object.keys(terrains).forEach(key => 
        environmentInfoHTML = environmentInfoHTML + '<label><input type="radio" value="'+ terrains[key] +'" name="terrains" class="terrain"><span class="button">'+ key +'</span></label>'
        );
    environmentInfoHTML = environmentInfoHTML + '</div>';

    //その他条件チェックボックス追加
    environmentInfoHTML = environmentInfoHTML + '<div class="conditions">';
    Object.keys(conditions).forEach(key => 
        environmentInfoHTML = environmentInfoHTML + '<label><input type="checkbox" name="conditions" class="condition"><span class="button">'+ key +'</span></label>'
        );
    environmentInfoHTML = environmentInfoHTML + '</div>';

    return environmentInfoHTML;
}