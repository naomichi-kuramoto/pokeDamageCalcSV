function pokeInfoObj(name){
    this.name = name,
    this.pokeId = null,
    this.pokeName = null,
    this.level = 50,
    this.natureId = 4,
    this.currentHP = null,
    this.hpActual = null,
    this.hpIndividual  = 31,
    this.hpEffort  = 0,
    this.attackActual = null,
    this.attackIndividual = 31,
    this.attackEffort = 0,
    this.attackRank = 0,
    this.defenceActual  = null,
    this.defenceIndividual = 31,
    this.defenceEffort = 0,
    this.defenceRank = 0,
    this.spAttackActual  = null,
    this.spAttackIndividual = 31,
    this.spAttackEffort = 0,
    this.spAttackRank = 0,
    this.spDefenceActual  = null,
    this.spDefenceIndividual = 31,
    this.spDefenceEffort =  0,
    this.spDefenceRank = 0,
    this.speedActual  = null,
    this.speedIndividual = 31,
    this.speedEffort = 0,
    this.speedRank = 0,
    //命中率
    this.rACR = 0,
    //回避率
    this.rEVS = 0,
    //命中率
    this.rCHR = 0,
    this.ability = '',
    this.abilityActivated = true,
    this.item = '',
    this.itemActivated = true,
    //状態異常
    this.aliment = '',
    this.conditions = {
    てだすけ: false,
    きあいだめ: false,
    じゅうでん: false,
    はがねのせいしん: false,
    みずびたし: false,
    リフレクター: false,
    ひかりのかべ: false,
    フレンドガード: false,
    はねやすめ: false,
    うちおとす: false,
    でんじふゆう: false,
    パワースポット:false,
    おいかぜ:false,
    しつげん:false,
    被急所:false
    },
    this.moves = {},
    this.typeIds = [],
    this.teraTypeId = null,
    this.weight = 0,
    //被弾回数　ふんどのこぶし用
    this.countOfHits = 0,
    //倒れたポケモン数　おはかまいり用
    this.countOfFaintingPokes = 0,
    //きょけんとつげき後
    this.afterGlaiveRush = false,
    //へんげんじざい用
    this.typeIdsTmp = null,
    //連続技(2~5回)用
    this.twoToFiveHits = 5,
    //ネズミざん用
    this.nezumiHits = 10;
};

//ステータスを計算する
function calcStatus(){
    //性格補正リスト取得
    var natureCompensation = natureCompensationList[natureValueList.indexOf(this.natureId)];

    //種族値リスト取得
    var pokeBaseSutatus = pokeBaseSutatusList[this.pokeId];
    
    //pokeStatusParamList = ["hp","attack","defence","spAttack","spDefence","speed"]
    for(var i=0; i < pokeStatusParamList.length; i++){

        if(pokeStatusParamList[i] == 'hp'){
            this.hpActual = Math.floor((pokeBaseSutatus[i]*2+this.hpIndividual+this.hpEffort/4)*this.level/100+this.level+10);
        }else{
            this[(pokeStatusParamList[i] + 'Actual')] = Math.floor(Math.floor((Math.floor((pokeBaseSutatus[i]*2+this[(pokeStatusParamList[i] + 'Individual')]+this[(pokeStatusParamList[i] + 'Effort')]/4))*this.level/100+5))*natureCompensation[i - 1]);
        }
    }
};

pokeInfoObj.prototype.calcStatus = calcStatus;

//努力値を計算する
//引数:実数値 ステータス種別
//返り値:努力値
function calcEffort(StatusParamKind,Actual){
    var Effort = -1;

    //性格補正リスト取得
    var natureCompensation = natureCompensationList[natureValueList.indexOf(this.natureId)];

    //種族値リスト取得
    var pokeBaseSutatus = pokeBaseSutatusList[this.pokeId];

    //ステータス種別index
    var indexStatusParamKind = pokeStatusParamList.indexOf(StatusParamKind);
    
    //ステータス種別がHP（indexは0)の場合
    if(indexStatusParamKind == 0){
        Effort =((Actual -(this.level+10))/(this.level/100) - pokeBaseSutatus[indexStatusParamKind]*2 - this.hpIndividual) * 4;
    }else{
        Effort =Math.ceil(Math.ceil((Math.ceil((Actual/(natureCompensation[indexStatusParamKind - 1]) -5))/(this.level/100) -Math.ceil((pokeBaseSutatus[indexStatusParamKind]*2+this[(pokeStatusParamList[indexStatusParamKind] + 'Individual')]))))*4);
    }

    return Effort
};

pokeInfoObj.prototype.calcEffort = calcEffort;

