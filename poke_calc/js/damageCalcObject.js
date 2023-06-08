function damageCalcObj(){
    this.attacker,
    this.defender,
    this.attackerIsGrounded = true,
    this.defenderIsGrounded = true,
    this.environment,
    this.move,
    this.movePower = 0,
    this.moveTypeId,
    //技メタタイプ　※技の特性などによるタイプ変化など
    this.metaMoveTypeId,
    //技の接触、非接触
    this.moveWithContact,
    this.damages = [],
    this.minDamage,
    this.maxDamage,
    this.minDamagePercent,
    this.maxDamagePercent,
    // タイプ相性
    this.typeCompatibility,
    // 詳細用タイプ相性
    this.typeCompatibilityDescription,
    // 威力補正
    this.powerCorrection,
    // 詳細用威力補正
    this.powerCorrectionDescription = [],
    // 攻撃力補正
    this.attackCorrection,
    // 詳細用攻撃力補正
    this.attackCorrectionDescription = [],
    // 防御力補正
    this.defenceCorrection,
    // 詳細用防御力補正
    this.defenceCorrectionDescription = [],
    // ダメージ補正
    this.damageCorrection,
    // 詳細用ダメージ補正
    this.damageCorrectionDescription = [],
    // 詳細用その他補正
    this.otherCorrectionDescription = [],
    //最終威力
    this.finalPower,
    //最終攻撃
    this.finalAttack,
    //最終防御
    this.finalDefence,
    //急所フラグ
    this.defenderCriticalFlag = false
};

function makeCalcDamageList(attacker,defender,environment){
    var calcDamageList = [];
    //攻撃側の攻撃技の分だけ計算する。
    Object.keys(attacker.moves).forEach(function(key) {
        var damageCalc = new damageCalcObj();
        damageCalc.attacker = attacker;
        damageCalc.defender = defender;
        damageCalc.environment = environment;
        damageCalc.move = key;
        damageCalc.moveTypeId = attacker.moves[key][0];
        damageCalc.defenderCriticalFlag = damageCalc.defender.conditions['被急所'];

        //接地判定
        damageCalc.attackerIsGrounded = setIsGrounded(attacker,environment);
        damageCalc.defenderIsGrounded = setIsGrounded(defender,environment);

        //接触技判定
        damageCalc.moveWithContact = setMoveWithContact(attacker.moves[key]);

        //メタタイプ取得
        setMetaTypeId(damageCalc);

        //めざめるダンス　タイプ1参照
        if(damageCalc.move == 'めざめるダンス'){
            if(attacker.teraTypeId === null){
                damageCalc.metaMoveTypeId = attacker.typeIds[0];
            }else if(attacker.teraTypeId != null){
                damageCalc.metaMoveTypeId = attacker.teraTypeId;
            }
            console.log(attacker.teraTypeId+":"+attacker.moves[key][0]);
        }
        
        //タイプ相性取得
        setTypeCompatibility(damageCalc);

        //補正値の初期値
        var initCorrection = 4096;

        //素早さ参照技用
        var attackerSpeed = getSpeed(attacker,environment);
        var defenderSpeed = getSpeed(defender,environment);

        //エレキボール（素早さ参照し威力を決定)
        if(damageCalc.move == 'エレキボール'){
            var speedRatio = attackerSpeed/defenderSpeed;
            
            if(speedRatio < 1){
                attacker.moves[key][2] = 40;
            }else if(speedRatio >= 1 && speedRatio < 2){
                attacker.moves[key][2] = 60;
            }else if(speedRatio >= 2 && speedRatio < 3){
                attacker.moves[key][2] = 80;
            }else if(speedRatio >= 3 && speedRatio < 4){
                attacker.moves[key][2] = 120;
            }else if(speedRatio >= 4){
                attacker.moves[key][2] = 120;
            }
        }

        //ジャイロボール（素早さ参照し威力を決定)
        if(damageCalc.move == 'ジャイロボール'){
            var roughPower = Math.floor(25 * defenderSpeed / attackerSpeed) + 1;
            if(roughPower <= 150){
                attacker.moves[key][2] = roughPower;
            }else{
                attacker.moves[key][2] = 150;
            }
        }

        //けたぐり くさむすび（相手の体重を参照し威力決定)
        if(damageCalc.move == 'けたぐり' || damageCalc.move == 'くさむすび'){
            if(defender.weight < 10){
                attacker.moves[key][2] = 20;
            }else if(defender.weight >= 10 && defender.weight < 25){
                attacker.moves[key][2] = 40;
            }else if(defender.weight >= 25 && defender.weight < 50){
                attacker.moves[key][2] = 60;
            }else if(defender.weight >= 50 && defender.weight < 100){
                attacker.moves[key][2] = 80;
            }else if(defender.weight >= 100 && defender.weight < 200){
                attacker.moves[key][2] = 100;
            }else if(defender.weight >= 200){
                attacker.moves[key][2] = 120;
            }
        }

        //ヒートスタンプ　ヘビーボンバー(相手と自分の体重を参照し、威力を決定)
        if(damageCalc.move == 'ヒートスタンプ' || damageCalc.move == 'ヘビーボンバー'){
            var weightRatio = defender.weight/attacker.weight

            if(weightRatio <= 0.2 ){
                attacker.moves[key][2] = 120;
            }else if(weightRatio <= 0.25){
                attacker.moves[key][2] = 100;
            }else if(weightRatio <= (1/3)){
                attacker.moves[key][2] = 80;
            }else if(weightRatio <= 0.5){
                attacker.moves[key][2] = 60;
            }else if(weightRatio > 0.5){
                attacker.moves[key][2] = 40;
            }
        }

        //ふんどのこぶし　被弾回数により威力を変更
        if(damageCalc.move == 'ふんどのこぶし'){
            if(attacker.countOfHits != 0){
                attacker.moves[key][2] = 50 + 50 * parseInt(attacker.countOfHits);
            }else{
                attacker.moves[key][2] = 50
            }
        }

        //おはかまいり　倒されたポケモン数により威力変更
        if(damageCalc.move == 'おはかまいり'){
            if(attacker.countOfFaintingPokes != 0){
                attacker.moves[key][2] = 50 + 50 * parseInt(attacker.countOfFaintingPokes);
            }else{
                attacker.moves[key][2] = 50
            }
        }

        // アシストパワー　つけあがる　ランクにより技の威力変動　※命中率　回避率上昇は未実装
        if(damageCalc.move == 'アシストパワー' || damageCalc.move == 'つけあがる'){
            var rankSum = 0;

            if(attacker.attackRank > 0){
                rankSum = rankSum + attacker.attackRank;
            }
            if(attacker.defenceRank > 0){
                rankSum = rankSum + attacker.defenceRank;
            }
            if(attacker.spAttackRank > 0){
                rankSum = rankSum + attacker.spAttackRank;
            }
            if(attacker.spDefenceRank > 0){
                rankSum = rankSum + attacker.spDefenceRank;
            }
            if(attacker.speedRank > 0){
                rankSum = rankSum + attacker.speedRank;
            }

            attacker.moves[key][2] = 20 + 20 * rankSum;
        }

        // アクロバットの威力変動　
        if(damageCalc.move == 'アクロバット'){
            if(attacker.item == ''){
                attacker.moves[key][2] = 110;
            }else{
                attacker.moves[key][2] = 55;
            }
        }

        //テラスタルタイプと技タイプが一致し、技威力６０未満、連続技、先制技じゃない場合　威力を６０にする。
        if(attacker.moves[key][2] < 60 && attacker.moves[key][0] == attacker.teraTypeId && attacker.moves[key][8] == 0 && attacker.moves[key][10] == 0){
            attacker.moves[key][2] = 60;
        }
        //技威力を格納
        damageCalc.movePower = attacker.moves[key][2];

        //急所対応 トリックフラワー　こおりのいぶきの場合常に被急所フラグtrue
        if(damageCalc.move == 'トリックフラワー' || damageCalc.move == 'こおりのいぶき'|| damageCalc.move == 'あんこくきょうだ'|| damageCalc.move == 'すいりゅうれんだ'){
            damageCalc.defenderCriticalFlag = true;
        }

        //急所対応　防御側特性がカブトアーマーの場合　被急所フラグを常にfalse
        if(defender.ability == 'カブトアーマー'){
            damageCalc.defenderCriticalFlag = false;
        }

        //テラバースト用
        var attackerAttack = Math.floor(attacker.attackActual * getrankCorrection(attacker.attackRank,'teraBlast','attacker',false));
        var attackerSpAttack = Math.floor(attacker.spAttackActual * getrankCorrection(attacker.spAttackRank,'teraBlast','attacker',false));

        //テラスタル＆テラバーストで攻撃高い場合　物理攻撃として扱う
        if(attacker.teraTypeId != null && (attackerAttack > attackerSpAttack) && damageCalc.move == 'テラバースト'){
            attacker.moves[key][1] = 1;
        }

        //威力の補正値設定
        setPowerCorrection(initCorrection,damageCalc);

        //最終威力の取得　TODOテラスタル時威力60以下の技を威力60にする　対象技要確認
        //TODO　、ダメおしの威力2倍は補正値ではなく、威力の部分が倍
        damageCalc.finalPower = fiveDropFiveExtra(attacker.moves[key][2] * damageCalc.powerCorrection/4096);
        
        //1以下の場合は1に設定
        // if(damageCalc.finalPower < 1){
        //     damageCalc.finalPower = 1;
        // }

        //攻撃の補正値設定
        setAttackCorrection(initCorrection,damageCalc);

        //最終攻撃を設定　
        //物理の場合・テラバーストで攻撃が高い場合
        if(attacker.moves[key][1] == 1){
            //ボディプレスは防御、防御ランクを参照
            if(damageCalc.move == 'ボディプレス'){
                damageCalc.finalAttack = fiveDropFiveExtra(Math.floor(attacker.defenceActual * getrankCorrection(attacker.defenceRank,'status','attacker',damageCalc.defenderCriticalFlag)) * damageCalc.attackCorrection/4096);
                damageCalc.attackCorrectionDescription.push('ボディプレス:防御の値で攻撃')
            }else if(damageCalc.move == 'イカサマ'){
                damageCalc.finalAttack = fiveDropFiveExtra(Math.floor(defender.attackActual * getrankCorrection(defender.attackRank,'status','attacker',damageCalc.defenderCriticalFlag)) * damageCalc.attackCorrection/4096);
                damageCalc.attackCorrectionDescription.push('イカサマ:相手の攻撃、攻撃ランクを参照')
            }else{
                damageCalc.finalAttack = fiveDropFiveExtra(Math.floor(attacker.attackActual * getrankCorrection(attacker.attackRank,'status','attacker',damageCalc.defenderCriticalFlag)) * damageCalc.attackCorrection/4096);
            }
            //張り切り補正
            if(attacker.ability == 'はりきり'){
                damageCalc.finalAttack = damageCalc.finalAttack * 6144/4096;
                damageCalc.attackCorrectionDescription.push('はりきり補正:攻撃1.5倍')
            }
        }else{  
        //特殊の場合
            damageCalc.finalAttack = fiveDropFiveExtra(Math.floor(attacker.spAttackActual * getrankCorrection(attacker.spAttackRank,'status','attacker',damageCalc.defenderCriticalFlag)) * damageCalc.attackCorrection/4096);
        }

        //1以下の場合は1に設定
        // if(damageCalc.finalAttack < 1){
        //     damageCalc.finalAttack = 1;
        // }

        // 防御の補正値設定
        setDefenceCorrection(initCorrection,damageCalc);

        //最終防御を設定
        //物理の場合・テラバーストで攻撃が高い場合・サイコショック・サイコブレイク・しんぴのつるぎ
        if((attacker.moves[key][1] == 1 || damageCalc.move == 'サイコショック'|| damageCalc.move == 'サイコブレイク'|| damageCalc.move == 'しんぴのつるぎ') &&!environment.condition["ワンダールーム"]){
            //雪でタイプが氷の場合
            if(((defender.typeIds.indexOf(14) > 0 && defender.teraTypeId == null) || defender.teraTypeId == 14) && environment.weather == 'snow'){
                if(damageCalc.move == 'せいなるつるぎ' || (attacker.ability == 'てんねん' && attacker.abilityActivated)){
                    damageCalc.finalDefence = fiveDropFiveExtra(Math.floor(Math.floor(defender.defenceActual) * 6144/4096)* damageCalc.defenceCorrection/4096);
                }else{
                    damageCalc.finalDefence = fiveDropFiveExtra(Math.floor(Math.floor(defender.defenceActual * getrankCorrection(defender.defenceRank,'status','defender',damageCalc.defenderCriticalFlag)) * 6144/4096)* damageCalc.defenceCorrection/4096);
                }
                damageCalcObj.defenceCorrectionDescription.push('天候補正:雪でタイプが氷の場合防御1.5倍');
            }else{
                if(damageCalc.move == 'せいなるつるぎ' || (attacker.ability == 'てんねん' && attacker.abilityActivated)){
                    damageCalc.finalDefence = fiveDropFiveExtra(Math.floor(defender.defenceActual) * damageCalc.defenceCorrection/4096);
                }else{
                    damageCalc.finalDefence = fiveDropFiveExtra(Math.floor(defender.defenceActual * getrankCorrection(defender.defenceRank,'status','defender',damageCalc.defenderCriticalFlag)) * damageCalc.defenceCorrection/4096);
                }
            }
        }else{  
            //特殊の場合
            if(((defender.typeIds.indexOf(5) > 0 && defender.teraTypeId == null) || defender.teraTypeId == 5) && environment.weather == 'sandstorm'){
                //砂でタイプが岩の場合
                if(attacker.ability == 'てんねん' && attacker.abilityActivated){
                    damageCalc.finalDefence = fiveDropFiveExtra(Math.floor(Math.floor(defender.spDefenceActual)* 6144/4096) * damageCalc.defenceCorrection/4096);
                }else{
                    damageCalc.finalDefence = fiveDropFiveExtra(Math.floor(Math.floor(defender.spDefenceActual * getrankCorrection(defender.spDefenceRank,'status','defender',damageCalc.defenderCriticalFlag))* 6144/4096) * damageCalc.defenceCorrection/4096);
                }
                    damageCalcObj.defenceCorrectionDescription.push('天候補正:砂でタイプが岩の場合特防1.5倍');
            }else{
                if(attacker.ability == 'てんねん' && attacker.abilityActivated){
                    damageCalc.finalDefence = fiveDropFiveExtra(Math.floor(defender.spDefenceActual) * damageCalc.defenceCorrection/4096);
                }else{
                    damageCalc.finalDefence = fiveDropFiveExtra(Math.floor(defender.spDefenceActual * getrankCorrection(defender.spDefenceRank,'status','defender',damageCalc.defenderCriticalFlag)) * damageCalc.defenceCorrection/4096);
                }
            }
        }

        //1以下の場合は1に設定
        // if(damageCalc.finalDefence < 1){
        //     damageCalc.finalDefence = 1;
        // }

        // ダメージの補正値設定
        setDamageCorrection(initCorrection,damageCalc);

        // ダメージ= 攻撃側のレベル×2÷5+2→切り捨て
        var damage = Math.floor(attacker.level * 2/5 + 2);

        // ×最終威力 × 最終攻撃 ÷ 最終防御→切り捨て
        damage = Math.floor(damage * damageCalc.finalPower * damageCalc.finalAttack / damageCalc.finalDefence);

        // ÷50+2→切り捨て
        damage = Math.floor(damage / 50 + 2);

        // ×複数対象3072÷4096→五捨五超入
        if(environment.battleRule == 'double' && (attacker.moves[key][7] == 4 || attacker.moves[key][7] == 5)){
            damage = fiveDropFiveExtra(damage * 3072 / 4096);
            damageCalc.otherCorrectionDescription.push('ダブルバトル補正:複数対象は0.75倍');
        }

        // ワイドフォース複数対象時
        if(environment.battleRule == 'double' && (damageCalc.move == 'ワイドフォース' && damageCalc.environment.terrain =='psycho' && damageCalc.attackerIsGrounded)){
            damage = fiveDropFiveExtra(damage * 3072 / 4096);
            damageCalc.otherCorrectionDescription.push('ダブルバトル補正:複数対象は0.75倍');
        }

        // ×天気弱化 2048÷4096→五捨五超入
        if((environment.weather == 'rain' && damageCalc.metaMoveTypeId == 9) || (environment.weather == 'sunny' && damageCalc.metaMoveTypeId == 10 && damageCalc.move != 'ハイドロスチーム')){
            damage = fiveDropFiveExtra(damage * 2048 / 4096);
            damageCalc.otherCorrectionDescription.push('天候弱化:0.5倍');
        }

        // ×天気強化 6144÷4096→五捨五超入
        if((environment.weather == 'rain' && damageCalc.metaMoveTypeId == 10) || environment.weather == 'sunny' && damageCalc.metaMoveTypeId == 9){
            damage = fiveDropFiveExtra(damage * 6144 / 4096);
            damageCalc.otherCorrectionDescription.push('天候強化:1.5倍');
        }

        //　×天気強化 ハイドロスチーム 6144÷4096→五捨五超入
        if(environment.weather == 'sunny' && damageCalc.move == 'ハイドロスチーム'){
            damage = fiveDropFiveExtra(damage * 6144 / 4096);
            damageCalc.otherCorrectionDescription.push('天候強化:1.5倍');
        }

        // きょけんとつげき後　8192÷4096→五捨五超入
        if(defender.afterGlaiveRush == true){
            damage = fiveDropFiveExtra(damage * 8192 / 4096);
            damageCalc.otherCorrectionDescription.push('きょけんとつげき後:2倍');
        }

        // ×急所 6144÷4096→五捨五超入
        if(damageCalc.defenderCriticalFlag){
            damage = fiveDropFiveExtra(damage * 6144 / 4096);
            if(attacker.ability != 'スナイパー'){
                damageCalc.otherCorrectionDescription.push('急所:1.5倍');
            }else{
                damage = Math.floor(damage * 6144 / 4096);
                damageCalc.otherCorrectionDescription.push('スナイパーかつ急所:2.25倍');
            }
        }

        //ふゆう
        if(damageCalc.metaMoveTypeId == 4 && damageCalc.defenderIsGrounded == false){
            damage = 0;
            damageCalc.otherCorrectionDescription.push('ふゆう:地面タイプ無効');
        }

        // 乱数(0.85, 0.86, …… 0.99, 1.00 の何れか)→切り捨て
        for(var i = 0; i < 16; i++){
            var new_damage = 0;
            new_damage = Math.floor(damage * (0.85 + i * 0.01));

            // てきおうりょく+テラスタル+タイプ一致　×9216÷4096 →五捨五超入
            if(attacker.ability == 'てきおうりょく' && attacker.typeIds.indexOf(parseInt(damageCalc.metaMoveTypeId)) >= 0 && damageCalc.metaMoveTypeId == attacker.teraTypeId){
                new_damage = fiveDropFiveExtra(new_damage * 9216 / 4096);
            // てきおうりょく+ タイプ一致　×8192÷4096→五捨五超入
            }else if(attacker.ability == 'てきおうりょく' && attacker.typeIds.indexOf(parseInt(damageCalc.metaMoveTypeId)) >= 0 && attacker.teraTypeId == null){
                new_damage = fiveDropFiveExtra(new_damage * 8192 / 4096);
            // てきおうりょく+ テラスタイプのみタイプ一致　×8192÷4096→五捨五超入
            }else if(attacker.ability == 'てきおうりょく' && attacker.typeIds.indexOf(parseInt(damageCalc.metaMoveTypeId)) < 0 && attacker.teraTypeId == damageCalc.metaMoveTypeId){
            new_damage = fiveDropFiveExtra(new_damage * 8192 / 4096);
            // タイプ一致+テラスタイプ一致 ×8192÷4096→五捨五超入
            }else if(attacker.typeIds.indexOf(parseInt(damageCalc.metaMoveTypeId)) >= 0 && damageCalc.metaMoveTypeId == attacker.teraTypeId){
                new_damage = fiveDropFiveExtra(new_damage * 8192 / 4096);
            // タイプ一致6144÷4096→五捨五超入
            }else if((attacker.typeIds.indexOf(parseInt(damageCalc.metaMoveTypeId)) >= 0) && attacker.typeIds.indexOf(attacker.teraTypeId) < 0){
                new_damage = fiveDropFiveExtra(new_damage * 6144 / 4096);
            // テラスタイプのみ一致6144÷4096→五捨五超入
            }else if(attacker.typeIds.indexOf(parseInt(damageCalc.metaMoveTypeId)) < 0 && attacker.teraTypeId == damageCalc.metaMoveTypeId){
                new_damage = fiveDropFiveExtra(new_damage * 6144 / 4096);
            }

            // ×タイプ相性→切り捨て
            if(damageCalc.typeCompatibility == null){
                new_damage = 0;
            }else{
                new_damage = Math.floor(new_damage * (2 ** damageCalc.typeCompatibility));
            }

            // ×やけど 2048÷4096→五捨五超入
            if(attacker.aliment == 'やけど' && attacker.moves[key][1] == 1 && !(attacker.ability == 'こんじょう' && attacker.abilityActivated)){
                new_damage = Math.floor(new_damage * 2048/4096);
            }

            // ダメージの補正値÷4096→五捨五超入
            new_damage = fiveDropFiveExtra(new_damage * damageCalc.damageCorrection / 4096);

            //定数ダメージ
            //ちきゅうなげ　ナイトヘッド　レベル参照
            if((damageCalc.move == 'ちきゅうなげ' || damageCalc.move == 'ナイトヘッド') && damageCalc.typeCompatibility != null){
                new_damage = attacker.level;
            }

            //いかりのまえば　カタストロフィ
            if((damageCalc.move == 'いかりのまえば' || damageCalc.move == 'カタストロフィ') && damageCalc.typeCompatibility != null){
                new_damage = Math.floor(defender.hpActual / 2);
            }

            //一撃技
            if(damageCalc.move == 'ハサミギロチン' && damageCalc.typeCompatibility != null && defender.ability != 'がんじょう'){
                new_damage = defender.hpActual;
            }

            if(damageCalc.move == 'じわれ' && damageCalc.typeCompatibility != null && defender.ability != 'がんじょう' && damageCalc.defenderIsGrounded){
                new_damage = defender.hpActual;
            }

            if(damageCalc.move == 'ぜったいれいど'  && defender.ability != 'がんじょう' && ((defender.typeIds.indexOf(14)> 0 && defender.teraTypeId == '') || defender.teraTypeId != 14)){
                new_damage = defender.hpActual;
            }


            //最小ダメージ
            if(i == 0){
                if(new_damage < 1){
                    damageCalc.minDamage = 0;
                    damageCalc.minDamagePercent = 0;
                }else{

                    damageCalc.minDamage = new_damage;

                    //連続技の場合はヒット回数を反映
                    //二回攻撃
                    if(damageCalc.move == 'ドラゴンアロー' && environment.battleRule == 'double'){
                        damageCalc.minDamage = damageCalc.minDamage;
                    }else if(attacker.moves[key][8] == 34){
                        damageCalc.minDamage = damageCalc.minDamage * 2;
                    //三回攻撃
                    }else if(attacker.moves[key][8] == 51){
                        damageCalc.minDamage = damageCalc.minDamage *3;
                    }else if(attacker.moves[key][8] == 82){
                        damageCalc.minDamage = damageCalc.minDamage * attacker.twoToFiveHits;
                    }else if(attacker.moves[key][8] == 103){
                        damageCalc.minDamage = damageCalc.minDamage * attacker.nezumiHits;
                    }

                    damageCalc.minDamagePercent = (damageCalc.minDamage/defender.hpActual * 100).toFixed(1);
                }


            }

            //最大ダメージ
            if(i == 15){
                if(new_damage < 1){
                    damageCalc.maxDamage = 0;
                    damageCalc.maxDamagePercent = 0;
                }else{
                    damageCalc.maxDamage = new_damage;

                    //連続技の場合はヒット回数を反映
                    //二回攻撃
                    if(damageCalc.move == 'ドラゴンアロー' && environment.battleRule == 'double'){
                        damageCalc.maxDamage = damageCalc.maxDamage;
                    }else if(attacker.moves[key][8] == 34){
                        damageCalc.maxDamage = damageCalc.maxDamage * 2;
                    //三回攻撃
                    }else if(attacker.moves[key][8] == 51){
                        damageCalc.maxDamage = damageCalc.maxDamage *3;
                    }else if(attacker.moves[key][8] == 82){
                        damageCalc.maxDamage = damageCalc.maxDamage * attacker.twoToFiveHits;
                    }else if(attacker.moves[key][8] == 103){
                        damageCalc.maxDamage = damageCalc.maxDamage * attacker.nezumiHits;
                    }

                    damageCalc.maxDamagePercent = (damageCalc.maxDamage/defender.hpActual * 100).toFixed(1);
                }
            }

            if(new_damage < 1){
                new_damage = 0;
            }
            //乱数幅毎のダメージ
            damageCalc.damages.push(new_damage);
        }

        //その他補正を追記
        // てきおうりょく+テラスタル+タイプ一致　×9216÷4096 →五捨五超入
        if(attacker.ability == 'てきおうりょく' && attacker.typeIds.indexOf(parseInt(damageCalc.metaMoveTypeId)) >= 0 && damageCalc.metaMoveTypeId == attacker.teraTypeId){
            damageCalc.otherCorrectionDescription.push('てきおうりょく+テラスタル+タイプ一致:2.25倍');
        // てきおうりょく+ タイプ一致　×8192÷4096→五捨五超入
        }else if(attacker.ability == 'てきおうりょく' && attacker.typeIds.indexOf(parseInt(damageCalc.metaMoveTypeId)) >= 0 && attacker.teraTypeId == null){
            damageCalc.otherCorrectionDescription.push('てきおうりょく+タイプ一致:2.0倍');
        // てきおうりょく+ テラスタイプのみタイプ一致　×8192÷4096→五捨五超入
        }else if(attacker.ability == 'てきおうりょく' && attacker.typeIds.indexOf(parseInt(damageCalc.metaMoveTypeId)) < 0 && attacker.teraTypeId == damageCalc.metaMoveTypeId){
            damageCalc.otherCorrectionDescription.push('てきおうりょく+テラスタイプ一致:2.0倍');
        // タイプ一致+テラスタイプ一致 ×8192÷4096→五捨五超入
        }else if(attacker.typeIds.indexOf(parseInt(damageCalc.metaMoveTypeId)) >= 0 && damageCalc.metaMoveTypeId == attacker.teraTypeId){
            damageCalc.otherCorrectionDescription.push('タイプ一致+テラスタル:2.0倍');
        // タイプ一致6144÷4096→五捨五超入
        }else if((attacker.typeIds.indexOf(parseInt(damageCalc.metaMoveTypeId)) >= 0) && attacker.typeIds.indexOf(attacker.teraTypeId) < 0){
            damageCalc.otherCorrectionDescription.push('タイプ一致:1.5倍');
        // テラスタイプのみ一致6144÷4096→五捨五超入
        }else if(attacker.typeIds.indexOf(parseInt(damageCalc.metaMoveTypeId)) < 0 && attacker.teraTypeId == damageCalc.metaMoveTypeId){
            damageCalc.otherCorrectionDescription.push('テラスタイプのみ一致:1.5倍');
        }
        // ×やけど 2048÷4096→五捨五超入
        if(attacker.aliment == 'やけど' && attacker.moves[key][1] == 1 && !(attacker.ability == 'こんじょう' && attacker.abilityActivated)){
            damageCalc.otherCorrectionDescription.push('やけど補正:0.5倍');
        }

        //返り値に格納
        calcDamageList.push(damageCalc);
    });

    return calcDamageList;
}

//5捨5超入を行う関数
function fiveDropFiveExtra(param){
    var integerPart = Math.trunc(param)
    var minorityPart = param - integerPart

    if(integerPart == 0){
        return 0
    }
    else if (minorityPart > 0.5){
        return integerPart + 1
    }else{
        return integerPart
    }
}

//ランク補正の倍率を返す関数
function getrankCorrection(rank,kind,holder,critical){
    if(kind == 'teraBlast'){
        //テラバーストの場合特に何も考慮なくランク補正を返す
        if(rank >=0){
            return (2 + rank)/2
        }else{
            return 2/(2+ Math.abs(rank))
        }
    //ダメージ計算途中のステータス考慮の場合
    }else{
        //攻撃側が保持している場合
        if(holder == 'attacker'){
            //急所の場合
            if(critical){
                if(rank >=0){
                    return (2 + rank)/2
                }else{
                    return 1    //ランク下降は無視する。
                }
            //急所じゃない場合
            }else{
                if(rank >=0){
                    return (2 + rank)/2
                }else{
                    return 2/(2+ Math.abs(rank))
                }
            }
        }else{
            //防御側が保持
            //急所の場合
            if(critical){
                if(rank >=0){
                    return 1    //ランク上昇を無視する。
                }else{
                    return 2/(2+ Math.abs(rank))
                }
            //急所じゃない場合
            }else{
                if(rank >=0){
                    return (2 + rank)/2
                }else{
                    return 2/(2+ Math.abs(rank))
                }
            }
        }

    }
}

//接地判定
function setIsGrounded(pokeInfoObj,environment){
    if(environment.condition["じゅうりょく"]){
        return true;
    }else if(pokeInfoObj.item == "くろいてっきゅう" && pokeInfoObj.itemActivated){
        return true;
    }else if(pokeInfoObj.ability == "ふゆう" && pokeInfoObj.abilityActivated){
        return false;
    }else if(pokeInfoObj.teraTypeId == 2){
        return false;
    }else if(pokeInfoObj.typeIds[0] == 2 ||pokeInfoObj.typeIds[1] == 2){
        return false;
    }else{
        return true;
    }
}

//接触判定 
function setMoveWithContact(attackerMove){
    if(attackerMove[5]== 0){
        return false;
    }else{
        return true;
    }
}

//メタタイプ取得
function setMetaTypeId(damageCalcObj){
    if(damageCalcObj.attacker.teraTypeId != null && damageCalcObj.move == "テラバースト"){
        //テラスタルしている場合はテラスタルタイプに変更
        damageCalcObj.metaMoveTypeId = damageCalcObj.attacker.teraTypeId
    }else if(damageCalcObj.attacker.ability == "ノーマルスキン"){
        //メタタイプをノーマルに設定
        damageCalcObj.metaMoveTypeId = 0;
    }else if(damageCalcObj.attacker.ability == "フェアリースキン"){
        //メタタイプをフェアリーに設定
        damageCalcObj.metaMoveTypeId = 17;
    }else if(damageCalcObj.attacker.ability == "スカイスキン"){
        //メタタイプを飛行に設定
        damageCalcObj.metaMoveTypeId = 2;
    }else if(damageCalcObj.attacker.ability == "フリーズスキン"){
        //メタタイプを氷に設定
        damageCalcObj.metaMoveTypeId = 14;
    }else if(damageCalcObj.attacker.ability == "エレキスキン"){
        //メタタイプを電気に設定
        damageCalcObj.metaMoveTypeId = 12;
    }else{
        damageCalcObj.metaMoveTypeId = damageCalcObj.moveTypeId;
    }
}

//タイプ相性取得
function setTypeCompatibility(damageCalcObj){
    var typeCompatibility = 0
    if(damageCalcObj.move != 'フライングプレス'){
        if(damageCalcObj.defender.teraTypeId == null){
            for(var i =0;i < damageCalcObj.defender.typeIds.length;i++){
                if(typeCompatibilityList[typeList[damageCalcObj.metaMoveTypeId]][damageCalcObj.defender.typeIds[i]] != null){
                    typeCompatibility = typeCompatibility + typeCompatibilityList[typeList[damageCalcObj.metaMoveTypeId]][damageCalcObj.defender.typeIds[i]]
                }else{
                    typeCompatibility = null;
                    damageCalcObj.typeCompatibilityDescription = '×0'
                    break;
                }
            }
        }else{
            typeCompatibility = typeCompatibilityList[typeList[damageCalcObj.metaMoveTypeId]][damageCalcObj.defender.teraTypeId]
        }
    }else{
        if(damageCalcObj.defender.teraTypeId == null){
            for(var i =0;i < damageCalcObj.defender.typeIds.length;i++){
                if(typeCompatibilityList['フライングプレス'][damageCalcObj.defender.typeIds[i]] != null){
                    typeCompatibility = typeCompatibility + typeCompatibilityList['フライングプレス'][damageCalcObj.defender.typeIds[i]]
                }else{
                    typeCompatibility = null;
                    damageCalcObj.typeCompatibilityDescription = '×0'
                    break;
                }
            }
        }else{
            typeCompatibility = typeCompatibilityList['フライングプレス'][damageCalcObj.defender.teraTypeId]
        }
    }
    damageCalcObj.typeCompatibility = typeCompatibility;
    damageCalcObj.typeCompatibilityDescription = '×' + String(2**typeCompatibility);

}

//威力の補正値
function setPowerCorrection(initCorrection,damageCalcObj){
    //初期値設定
    damageCalcObj.powerCorrection = initCorrection;

    //攻撃する側の特性・道具・技で補正がないか確認
    for(var i=0 ;i<powerModifier.length;i++){
        //特性確認
        if(damageCalcObj.attacker.ability == powerModifier[i].trigger && powerModifier[i].holder == 'attacker' && powerModifier[i].category == 'ability'){
            //powerModifierのconditionがtrueの時のみ補正
            if(powerModifier[i].condition(damageCalcObj)){
                damageCalcObj.powerCorrection = Math.round(damageCalcObj.powerCorrection*powerModifier[i].modifier/4096);
                damageCalcObj.powerCorrectionDescription.push(powerModifier[i].trigger+':'+powerModifier[i].description);
            }
            //道具確認
        }else if(damageCalcObj.attacker.item == powerModifier[i].trigger && powerModifier[i].holder == 'attacker' && powerModifier[i].category == 'item'){
            if(powerModifier[i].condition(damageCalcObj)){
                damageCalcObj.powerCorrection = Math.round(damageCalcObj.powerCorrection*powerModifier[i].modifier/4096);
                damageCalcObj.powerCorrectionDescription.push(powerModifier[i].trigger+':'+powerModifier[i].description);
            }
            //技確認
        }else if(damageCalcObj.move == powerModifier[i].trigger && powerModifier[i].holder == 'move' && powerModifier[i].category == 'name'){
            if(powerModifier[i].condition(damageCalcObj)){
                damageCalcObj.powerCorrection = Math.round(damageCalcObj.powerCorrection*powerModifier[i].modifier/4096);
                damageCalcObj.powerCorrectionDescription.push(powerModifier[i].trigger+':'+powerModifier[i].description);
            }
        }
    };
    
    //攻撃する側の環境で補正がないか確認
    Object.keys(damageCalcObj.attacker.conditions).forEach(function(key) {
        if(damageCalcObj.attacker.conditions[key]){
            for(var i=0 ;i<powerModifier.length;i++){
                if(key == powerModifier[i].trigger && powerModifier[i].holder == 'attacker' && powerModifier[i].category == 'conditions'){
                    if(typeof powerModifier[i].condition === 'function' ){
                        //powerModifierのconditionがtrueの時のみ補正
                        if(powerModifier[i].condition(damageCalcObj)){
                            damageCalcObj.powerCorrection = Math.round(damageCalcObj.powerCorrection*powerModifier[i].modifier/4096);
                            damageCalcObj.powerCorrectionDescription.push(powerModifier[i].trigger+':'+powerModifier[i].description);
                        }
                    }else if(powerModifier[i].condition == null){
                        damageCalcObj.powerCorrection = Math.round(damageCalcObj.powerCorrection*powerModifier[i].modifier/4096);
                        damageCalcObj.powerCorrectionDescription.push(powerModifier[i].trigger+':'+powerModifier[i].description);
                    }
                }
            }
        }
    });

    //防御する側の特性で補正がないか確認
    for(var i=0 ;i<powerModifier.length;i++){
        if(damageCalcObj.defender.ability == powerModifier[i].trigger && powerModifier[i].holder == 'defender' && powerModifier[i].category == 'ability'){
            //powerModifierのconditionがtrueの時のみ補正
            if(powerModifier[i].condition(damageCalcObj)){
                damageCalcObj.powerCorrection = Math.round(damageCalcObj.powerCorrection*powerModifier[i].modifier/4096);
                damageCalcObj.powerCorrectionDescription.push(powerModifier[i].trigger+':'+powerModifier[i].description);
            }
        }
    };

    //環境で補正がないか確認
    Object.keys(damageCalcObj.environment.condition).forEach(function(key) {
        if(damageCalcObj.environment.condition[key]){
            for(var i=0 ;i<powerModifier.length;i++){
                if(key == powerModifier[i].trigger && powerModifier[i].holder == 'environment' && powerModifier[i].category == 'conditions'){
                    //powerModifierのconditionがtrueの時のみ補正
                    if(powerModifier[i].condition(damageCalcObj)){
                        damageCalcObj.powerCorrection = Math.round(damageCalcObj.powerCorrection*powerModifier[i].modifier/4096);
                        damageCalcObj.powerCorrectionDescription.push(powerModifier[i].trigger+':'+powerModifier[i].description);
                    }
                }
            }
        }
    });

    //フィールドの補正がないか確認
    if(damageCalcObj.environment.terrain != 'none'){
        var terrainOfNihongo = '';
        if(damageCalcObj.environment.terrain == 'electric'){
            terrainOfNihongo = 'エレキフィールド';
        }else if(damageCalcObj.environment.terrain == 'grass'){
            terrainOfNihongo = 'グラスフィールド';
        }else if(damageCalcObj.environment.terrain == 'psycho'){
            terrainOfNihongo = 'サイコフィールド';
        }else if(damageCalcObj.environment.terrain == 'mist'){
            terrainOfNihongo = 'ミストフィールド';
        }
        for(var i=0 ;i<powerModifier.length;i++){
            if(damageCalcObj.environment.terrain == powerModifier[i].trigger && powerModifier[i].holder == 'environment' && powerModifier[i].category == 'terrain'){
                //powerModifierのconditionがtrueの時のみ補正
                if(powerModifier[i].condition(damageCalcObj)){
                    damageCalcObj.powerCorrection = Math.round(damageCalcObj.powerCorrection*powerModifier[i].modifier/4096);
                    damageCalcObj.powerCorrectionDescription.push(terrainOfNihongo+':'+powerModifier[i].description);
                }
            }
        }
    };
}

//攻撃の補正値
function setAttackCorrection(initCorrection,damageCalcObj){
    //初期値設定
    damageCalcObj.attackCorrection = initCorrection;

    //攻撃する側の特性・道具・技で補正がないか確認
    for(var i=0 ;i<attackModifier.length;i++){
        //特性確認
        if(damageCalcObj.attacker.ability == attackModifier[i].trigger && attackModifier[i].holder == 'attacker' && attackModifier[i].category == 'ability'){
            //attackModifierのconditionがtrueの時のみ補正
            if(attackModifier[i].condition(damageCalcObj)){
                damageCalcObj.attackCorrection = Math.round(damageCalcObj.attackCorrection*attackModifier[i].modifier/4096);
                damageCalcObj.attackCorrectionDescription.push(attackModifier[i].trigger+':'+ attackModifier[i].description);
            }
            //道具確認
        }else if(damageCalcObj.attacker.item == attackModifier[i].trigger && attackModifier[i].holder == 'attacker' && attackModifier[i].category == 'item'){
            if(attackModifier[i].condition(damageCalcObj)){
                damageCalcObj.attackCorrection = Math.round(damageCalcObj.attackCorrection*attackModifier[i].modifier/4096);
                damageCalcObj.attackCorrectionDescription.push(attackModifier[i].trigger+':'+ attackModifier[i].description);
            }
            //技確認
        }else if(damageCalcObj.move == attackModifier[i].trigger && attackModifier[i].holder == 'move' && attackModifier[i].category == 'name'){
            if(attackModifier[i].condition(damageCalcObj)){
                damageCalcObj.attackCorrection = Math.round(damageCalcObj.attackCorrection*attackModifier[i].modifier/4096);
                damageCalcObj.attackCorrectionDescription.push(attackModifier[i].trigger+':'+ attackModifier[i].description);
            }
        }
    };
    
    //攻撃する側の環境で補正がないか確認
    Object.keys(damageCalcObj.attacker.conditions).forEach(function(key) {
        if(damageCalcObj.attacker.conditions[key]){
            for(var i=0 ;i<attackModifier.length;i++){
                if(key == attackModifier[i].trigger && attackModifier[i].holder == 'attacker' && attackModifier[i].category == 'conditions'){
                    if(typeof attackModifier[i].condition === 'function' ){
                        //attackModifierのconditionがtrueの時のみ補正
                        if(attackModifier[i].condition(damageCalcObj)){
                            damageCalcObj.attackCorrection = Math.round(damageCalcObj.attackCorrection*attackModifier[i].modifier/4096);
                            damageCalcObj.attackCorrectionDescription.push(attackModifier[i].trigger+':'+ attackModifier[i].description);
                        }
                    }else if(attackModifier[i].condition == null){
                        damageCalcObj.attackCorrection = Math.round(damageCalcObj.attackCorrection*attackModifier[i].modifier/4096);
                        damageCalcObj.attackCorrectionDescription.push(attackModifier[i].trigger+':'+ attackModifier[i].description);
                    }
                }
            }
        }
    });

    //防御する側の特性で補正がないか確認
    for(var i=0 ;i<attackModifier.length;i++){
        if(damageCalcObj.defender.ability == attackModifier[i].trigger && attackModifier[i].holder == 'defender' && attackModifier[i].category == 'ability'){
            //attackModifierのconditionがtrueの時のみ補正
            if(attackModifier[i].condition(damageCalcObj)){
                damageCalcObj.attackCorrection = Math.round(damageCalcObj.attackCorrection*attackModifier[i].modifier/4096);
                damageCalcObj.attackCorrectionDescription.push(attackModifier[i].trigger+':'+ attackModifier[i].description);
            }
        }
    };

    //環境で補正がないか確認
    Object.keys(damageCalcObj.environment.condition).forEach(function(key) {
        if(damageCalcObj.environment.condition[key]){
            for(var i=0 ;i<attackModifier.length;i++){
                if(key == attackModifier[i].trigger && attackModifier[i].holder == 'environment' && attackModifier[i].category == 'conditions'){
                    //attackModifierのconditionがtrueの時のみ補正
                    if(attackModifier[i].condition(damageCalcObj)){
                        damageCalcObj.attackCorrection = Math.round(damageCalcObj.attackCorrection*attackModifier[i].modifier/4096);
                        damageCalcObj.attackCorrectionDescription.push(attackModifier[i].trigger+':'+ attackModifier[i].description);
                    }
                }
            }
        }
    });

    //フィールドの補正がないか確認
    if(damageCalcObj.environment.terrain != 'none'){
        var terrainOfNihongo = '';
        if(damageCalcObj.environment.terrain == 'electric'){
            terrainOfNihongo = 'エレキフィールド';
        }else if(damageCalcObj.environment.terrain == 'grass'){
            terrainOfNihongo = 'グラスフィールド';
        }else if(damageCalcObj.environment.terrain == 'psycho'){
            terrainOfNihongo = 'サイコフィールド';
        }else if(damageCalcObj.environment.terrain == 'mist'){
            terrainOfNihongo = 'ミストフィールド';
        }
        for(var i=0 ;i<attackModifier.length;i++){
            if(damageCalcObj.environment.terrain == attackModifier[i].trigger && attackModifier[i].holder == 'environment' && attackModifier[i].category == 'terrain'){
                //attackModifierのconditionがtrueの時のみ補正
                if(attackModifier[i].condition(damageCalcObj)){
                    damageCalcObj.attackCorrection = Math.round(damageCalcObj.attackCorrection*attackModifier[i].modifier/4096);
                    damageCalcObj.attackCorrectionDescription.push(attackModifier[i].trigger+':'+ attackModifier[i].description);
                }
            }
        }
    };
}

//防御の補正値
function setDefenceCorrection(initCorrection,damageCalcObj){
    //初期値設定
    damageCalcObj.defenceCorrection = initCorrection;

    //防御する側の特性で補正がないか確認
    for(var i=0 ;i<defenceModifier.length;i++){
        //特性確認
        if(damageCalcObj.defender.ability == defenceModifier[i].trigger && defenceModifier[i].holder == 'defender' && defenceModifier[i].category == 'ability'){
            //defenceModifierのconditionがtrueの時のみ補正
            if(defenceModifier[i].condition(damageCalcObj)){
                damageCalcObj.defenceCorrection = Math.round(damageCalcObj.defenceCorrection*defenceModifier[i].modifier/4096);
                damageCalcObj.defenceCorrectionDescription.push(defenceModifier[i].trigger+':'+ defenceModifier[i].description);
            }        
            //道具確認
        }else if(damageCalcObj.defender.item == defenceModifier[i].trigger && defenceModifier[i].holder == 'defender' && defenceModifier[i].category == 'item'){
            if(defenceModifier[i].condition(damageCalcObj)){
                damageCalcObj.defenceCorrection = Math.round(damageCalcObj.defenceCorrection*defenceModifier[i].modifier/4096);
                damageCalcObj.defenceCorrectionDescription.push(defenceModifier[i].trigger+':'+ defenceModifier[i].description);
            }
        }
    };

    //環境で補正がないか確認
    Object.keys(damageCalcObj.environment.condition).forEach(function(key) {
        if(damageCalcObj.environment.condition[key]){
            for(var i=0 ;i<defenceModifier.length;i++){
                if(key == defenceModifier[i].trigger && defenceModifier[i].holder == 'environment' && defenceModifier[i].category == 'conditions'){
                    //defenceModifierのconditionがtrueの時のみ補正
                    if(defenceModifier[i].condition(damageCalcObj)){
                        damageCalcObj.defenceCorrection = Math.round(damageCalcObj.defenceCorrection*defenceModifier[i].modifier/4096);
                        damageCalcObj.defenceCorrectionDescription.push(defenceModifier[i].trigger+':'+ defenceModifier[i].description);
                    }
                }
            }
        }
    });

    //フィールドの補正がないか確認
    if(damageCalcObj.environment.terrain != 'none'){
        var terrainOfNihongo = '';
        if(damageCalcObj.environment.terrain == 'electric'){
            terrainOfNihongo = 'エレキフィールド';
        }else if(damageCalcObj.environment.terrain == 'grass'){
            terrainOfNihongo = 'グラスフィールド';
        }else if(damageCalcObj.environment.terrain == 'psycho'){
            terrainOfNihongo = 'サイコフィールド';
        }else if(damageCalcObj.environment.terrain == 'mist'){
            terrainOfNihongo = 'ミストフィールド';
        }
        for(var i=0 ;i<defenceModifier.length;i++){
            if(damageCalcObj.environment.terrain == defenceModifier[i].trigger && defenceModifier[i].holder == 'environment' && defenceModifier[i].category == 'terrain'){
                //defenceModifierのconditionがtrueの時のみ補正
                if(defenceModifier[i].condition(damageCalcObj)){
                    damageCalcObj.defenceCorrection = Math.round(damageCalcObj.defenceCorrection*defenceModifier[i].modifier/4096);
                    damageCalcObj.defenceCorrectionDescription.push(defenceModifier[i].trigger+':'+ defenceModifier[i].description);
                }
            }
        }
    };
}

//ダメージの補正値
function setDamageCorrection(initCorrection,damageCalcObj){
    //初期値設定
    damageCalcObj.damageCorrection = initCorrection;

    //攻撃する側の特性・道具・技で補正がないか確認
    for(var i=0 ;i<damageModifier.length;i++){
        //特性確認
        if(damageCalcObj.attacker.ability == damageModifier[i].trigger && damageModifier[i].holder == 'attacker' && damageModifier[i].category == 'ability'){
            //damageModifierのconditionがtrueの時のみ補正
            if(damageModifier[i].condition(damageCalcObj)){
                damageCalcObj.damageCorrection = Math.round(damageCalcObj.damageCorrection*damageModifier[i].modifier/4096);
                damageCalcObj.damageCorrectionDescription.push(damageModifier[i].trigger+':'+ damageModifier[i].description);
            }
            //道具確認
        }else if(damageCalcObj.attacker.item == damageModifier[i].trigger && damageModifier[i].holder == 'attacker' && damageModifier[i].category == 'item'){
            if(typeof damageModifier[i].condition === 'function' ){
                if(damageModifier[i].condition(damageCalcObj)){
                    damageCalcObj.damageCorrection = Math.round(damageCalcObj.damageCorrection*damageModifier[i].modifier/4096);
                    damageCalcObj.damageCorrectionDescription.push(damageModifier[i].trigger+':'+ damageModifier[i].description);
                }
            }else if(damageModifier[i].condition == null){
                damageCalcObj.damageCorrection = Math.round(damageCalcObj.damageCorrection*damageModifier[i].modifier/4096);
                damageCalcObj.damageCorrectionDescription.push(damageModifier[i].trigger+':'+ damageModifier[i].description);
            }
            //技確認
        }else if(damageCalcObj.move == damageModifier[i].trigger && damageModifier[i].holder == 'move' && damageModifier[i].category == 'name'){
            if(damageModifier[i].condition(damageCalcObj)){
                damageCalcObj.damageCorrectionDescription.push(damageModifier[i].trigger+':'+ damageModifier[i].description);
                damageCalcObj.damageCorrection = Math.round(damageCalcObj.damageCorrection*damageModifier[i].modifier/4096);
            }
        }
    };
    
    //攻撃する側の環境で補正がないか確認
    Object.keys(damageCalcObj.attacker.conditions).forEach(function(key) {
        if(damageCalcObj.attacker.conditions[key]){
            for(var i=0 ;i<damageModifier.length;i++){
                if(key == damageModifier[i].trigger && damageModifier[i].holder == 'attacker' && damageModifier[i].category == 'conditions'){
                    if(typeof damageModifier[i].condition === 'function' ){
                        //damageModifierのconditionがtrueの時のみ補正
                        if(damageModifier[i].condition(damageCalcObj)){
                            damageCalcObj.damageCorrection = Math.round(damageCalcObj.damageCorrection*damageModifier[i].modifier/4096);
                            damageCalcObj.damageCorrectionDescription.push(damageModifier[i].trigger+':'+ damageModifier[i].description);
                        }
                    }else if(damageModifier[i].condition == null){
                        damageCalcObj.damageCorrection = Math.round(damageCalcObj.damageCorrection*damageModifier[i].modifier/4096);
                        damageCalcObj.damageCorrectionDescription.push(damageModifier[i].trigger+':'+ damageModifier[i].description);
                    }
                }
            }
        }
    });

    //防御する側の環境で補正がないか確認
    Object.keys(damageCalcObj.defender.conditions).forEach(function(key) {
        if(damageCalcObj.defender.conditions[key]){
            for(var i=0 ;i<damageModifier.length;i++){
                if(key == damageModifier[i].trigger && damageModifier[i].holder == 'defender' && damageModifier[i].category == 'conditions'){
                    if(typeof damageModifier[i].condition === 'function' ){
                        //damageModifierのconditionがtrueの時のみ補正
                        if(damageModifier[i].condition(damageCalcObj)){
                            damageCalcObj.damageCorrection = Math.round(damageCalcObj.damageCorrection*damageModifier[i].modifier/4096);
                            damageCalcObj.damageCorrectionDescription.push(damageModifier[i].trigger+':'+ damageModifier[i].description);
                        }
                    }else if(damageModifier[i].condition == null){
                        damageCalcObj.damageCorrection = Math.round(damageCalcObj.damageCorrection*damageModifier[i].modifier/4096);
                        damageCalcObj.damageCorrectionDescription.push(damageModifier[i].trigger+':'+ damageModifier[i].description);
                    }
                }
            }
        }
    });

    //防御する側の特性で補正がないか確認
    for(var i=0 ;i<damageModifier.length;i++){
        if(damageCalcObj.defender.ability == damageModifier[i].trigger && damageModifier[i].holder == 'defender' && damageModifier[i].category == 'ability'){
            //damageModifierのconditionがtrueの時のみ補正
            if(damageModifier[i].condition(damageCalcObj)){
                damageCalcObj.damageCorrection = Math.round(damageCalcObj.damageCorrection*damageModifier[i].modifier/4096);
                damageCalcObj.damageCorrectionDescription.push(damageModifier[i].trigger+':'+ damageModifier[i].description);
            }
        }else if(damageCalcObj.defender.item == damageModifier[i].trigger && damageModifier[i].holder == 'defender' && damageModifier[i].category == 'item'){
            if(damageModifier[i].condition(damageCalcObj)){
                damageCalcObj.damageCorrection = Math.round(damageCalcObj.damageCorrection*damageModifier[i].modifier/4096);
                damageCalcObj.damageCorrectionDescription.push(damageModifier[i].trigger+':'+ damageModifier[i].description);
            }
        }
    };

    //環境で補正がないか確認
    Object.keys(damageCalcObj.environment.condition).forEach(function(key) {
        if(damageCalcObj.environment.condition[key]){
            for(var i=0 ;i<damageModifier.length;i++){
                if(key == damageModifier[i].trigger && damageModifier[i].holder == 'environment' && damageModifier[i].category == 'conditions'){
                    //damageModifierのconditionがtrueの時のみ補正
                    if(damageModifier[i].condition(damageCalcObj)){
                        damageCalcObj.damageCorrection = Math.round(damageCalcObj.damageCorrection*damageModifier[i].modifier/4096);
                        damageCalcObj.damageCorrectionDescription.push(damageModifier[i].trigger+':'+ damageModifier[i].description);
                    }
                }
            }
        }
    });

    //フィールドの補正がないか確認
    if(damageCalcObj.environment.terrain != 'none'){
        var terrainOfNihongo = '';
        if(damageCalcObj.environment.terrain == 'electric'){
            terrainOfNihongo = 'エレキフィールド';
        }else if(damageCalcObj.environment.terrain == 'grass'){
            terrainOfNihongo = 'グラスフィールド';
        }else if(damageCalcObj.environment.terrain == 'psycho'){
            terrainOfNihongo = 'サイコフィールド';
        }else if(damageCalcObj.environment.terrain == 'mist'){
            terrainOfNihongo = 'ミストフィールド';
        }
        for(var i=0 ;i<damageModifier.length;i++){
            if(damageCalcObj.environment.terrain == damageModifier[i].trigger && damageModifier[i].holder == 'environment' && damageModifier[i].category == 'terrain'){
                //damageModifierのconditionがtrueの時のみ補正
                if(damageModifier[i].condition(damageCalcObj)){
                    damageCalcObj.damageCorrection = Math.round(damageCalcObj.damageCorrection*damageModifier[i].modifier/4096);
                    damageCalcObj.damageCorrectionDescription.push(damageModifier[i].trigger+':'+ damageModifier[i].description);
                }
            }
        }
    };
}

function getSpeed(pokeInfoObj,environment){
    //攻撃側の素早さ
    var pokeInfoObjSpeed = Math.floor(pokeInfoObj.speedActual * getrankCorrection(pokeInfoObj.speedRank));

    //おいかぜの場合は素早さ倍

    if(pokeInfoObj.conditions['おいかぜ']){
        pokeInfoObjSpeed = pokeInfoObjSpeed * 2;
    }
    //しつげんの場合1/4 少数部が0.75の場合切り上げ
    if(pokeInfoObj.conditions['しつげん']){
        pokeInfoObjSpeed = pokeInfoObjSpeed / 4;
        var integerPart = Math.trunc(pokeInfoObjSpeed);     //実数部
        var minorityPart = pokeInfoObjSpeed - integerPart;  //少数部

        pokeInfoObjSpeed = Math.floor(pokeInfoObjSpeed);

        if(minorityPart == 0.75){
            pokeInfoObjSpeed = pokeInfoObjSpeed + 1;
        }
    }

    //まひの場合すばやさ半減 小数点以下はきりすて
    if(pokeInfoObj.aliment == 'まひ'){
        pokeInfoObjSpeed = Math.floor(pokeInfoObjSpeed / 2);
    }
    //はやあしの場合素早さ二倍
    if(pokeInfoObj.ability == 'はやあし' && (pokeInfoObj.abilityActivated == true && pokeInfoObj.aliment != '')){
        pokeInfoObjSpeed = pokeInfoObjSpeed * 2;
    }
    //こだいかっせいですばやさが上がる場合1.5倍　小数点は切り捨て
    if(pokeInfoObj.ability == 'こだいかっせい' && pokeInfoObj.abilityActivated == true 
        && (pokeInfoObj.item == 'ブーストエナジー' || environment.weather == 'sunny')
        && pokeInfoObj.speedActual > pokeInfoObj.attackActual
        && pokeInfoObj.speedActual > pokeInfoObj.defenceActual
        && pokeInfoObj.speedActual > pokeInfoObj.spAttackActual
        && pokeInfoObj.speedActual > pokeInfoObj.spDefenceActual){
            pokeInfoObjSpeed = Math.floor(pokeInfoObjSpeed * 1.5); 
    }
    
    //クォークチャージですばやさが上がる場合1.5倍　小数点は切り捨て
    if(pokeInfoObj.ability == 'クォークチャージ' && pokeInfoObj.abilityActivated == true 
        && (pokeInfoObj.item == 'ブーストエナジー' || environment.terrain == 'electric')
        && pokeInfoObj.speedActual > pokeInfoObj.attackActual
        && pokeInfoObj.speedActual > pokeInfoObj.defenceActual
        && pokeInfoObj.speedActual > pokeInfoObj.spAttackActual
        && pokeInfoObj.speedActual > pokeInfoObj.spDefenceActual){
            pokeInfoObjSpeed = Math.floor(pokeInfoObjSpeed * 1.5); 
    }

    //各天候・フィールドで素早さ二倍の特性
    if(pokeInfoObj.ability == 'ようりょくそ' && pokeInfoObj.abilityActivated == true && environment.weather == 'sunny'){
        pokeInfoObjSpeed = pokeInfoObjSpeed * 2;
    } else if(pokeInfoObj.ability == 'すいすい' && pokeInfoObj.abilityActivated == true && environment.weather == 'rain'){
        pokeInfoObjSpeed = pokeInfoObjSpeed * 2;
    }else if(pokeInfoObj.ability == 'すなかき' && pokeInfoObj.abilityActivated == true && environment.weather == 'sandstorm'){
        pokeInfoObjSpeed = pokeInfoObjSpeed * 2;
    }else if(pokeInfoObj.ability == 'ゆきかき' && pokeInfoObj.abilityActivated == true && environment.weather == 'snow'){
        pokeInfoObjSpeed = pokeInfoObjSpeed * 2;
    }else if(pokeInfoObj.ability == 'サーフテール' && pokeInfoObj.abilityActivated == true && environment.terrain == 'electric'){
        pokeInfoObjSpeed = pokeInfoObjSpeed * 2;
    }

    //こだわりスカーフ1.5倍　小数点は切り捨て
    if(pokeInfoObj.item == 'こだわりスカーフ'){
        pokeInfoObjSpeed = Math.floor(pokeInfoObjSpeed * 1.5); 
    //くろいてっきゅうの場合素早さ半減　小数点は切り捨て
    }else if(pokeInfoObj.item == 'くろいてっきゅう'){
        pokeInfoObjSpeed = Math.floor(pokeInfoObjSpeed / 2);
    }

    return pokeInfoObjSpeed;
}