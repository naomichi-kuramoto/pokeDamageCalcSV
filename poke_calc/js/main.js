$(function () {
    $('.calc-main').each(function(){
        var $container = $(this);
        var trHeader = makeTableHeader();
        var pokeConditionsHTML = makePokeConditionsHTML();
        var pokeIdChangeFlag = false;

        //ポケモン情報オブジェクトを二匹分準備
        poke1obj = new pokeInfoObj("poke1");
        poke2obj = new pokeInfoObj("poke2");
        pokeObjList = [poke1obj,poke2obj];

        //テンポラリオブジェクト:コピー、編集用
        var pokeTempObj;

        //initcalc関数を実行
        initcalc();

        //計算機を初期化する
        function initcalc(){
            //最初の計算機の状態を表示

            var elements = [];

            //入力情報部
            var inputInfoHTML = '<div class= "inputInfo"></div>';

            //HTML文字列をＤＯＭ要素化し配列に追加
            elements.push($(inputInfoHTML).get(0));

            //DOMを挿入
            $container.append(elements);

            var $inputInfoHTML = $container.find('.inputInfo');
            
            //環境情報を表示
            addEnvInfo();

            //シングルバトルにチェックを入れる
            $('input[value="single"]').prop('checked', true);

            //なしにチェックを入れる
            $('input[value="none"]').prop('checked', true);

            //小さい画面用　タブを挿入
            var tabHTML = '               <div class = "tabPokeInfo">';
                tabHTML = tabHTML +         '<ul>'
                tabHTML = tabHTML +           '<li class="active"><a href="#tab-poke1">自分のポケモン1</a></li>';
                tabHTML = tabHTML +           '<li><a href="#tab-poke2">相手のポケモン</a></li>';
                tabHTML = tabHTML +         '</ul>';
                tabHTML = tabHTML +       '</div>';

            //HTML文字列をＤＯＭ要素化し配列に追加
            elements.push($(tabHTML).get(0));
            
            //ポケモン情報ラッパーを挿入
            pokeInfoHTML = '<div class= "pokeInfoWrapper"></div>';
            
            //HTML文字列をＤＯＭ要素化し配列に追加
            elements.push($(pokeInfoHTML).get(0));

            //DOMを挿入
            $inputInfoHTML.append(elements);

            //ポケモン情報２匹分を表示
            for(var i = 1; i <= 2; i++){
                addPokeInfo('poke'+ i);
            }

            //初期値は「がんばりや」を選択
            $("select.nature option[value='4']").prop('selected', true);

            //初期値はレベル50
            $(":input[name='pokeLevel']").val("50");

            //努力値残りは510
            $(":input[name='pokeRemainingEffort']").val("510");

            //テラスタイプは無しを選択
            $("select.pokeTeraType option[value='18']").prop('selected', true);

        }

        //環境情報のHTMLを生成しドキュメントに挿入する
        function addEnvInfo(){
            var $inputInfo = $container.find('.inputInfo')
            var elements = [];

            var envInfoHTML = makeEnvironmentHTML();

            //HTML文字列をＤＯＭ要素化し配列に追加
            elements.push($(envInfoHTML).get(0));

            //DOMを挿入
            $inputInfo.append(elements);
        }

        //環境情報に変更があった時の処理
        $('.environmentInfo').each(function(){
            var $environmentInfo = $(this);
            var $battleRule = $environmentInfo.find('.battleRule');
            var $weather = $environmentInfo.find('.weather');
            var $terrain = $environmentInfo.find('.terrain');
            var $condition = $environmentInfo.find('.condition');

            //対戦ルール
            $battleRule.change(function(){
                environment.battleRule = $(this).val();
            });

            //天候
            $weather.change(function(){
                environment.weather = $(this).val();
            });

            //フィールド
            $terrain.change(function(){
                environment.terrain = $(this).val();
            });

            //その他環境
            $condition.change(function(){
                environment.condition[$(this).parent().text()] = $(this).prop('checked');
            });
        });

        //ポケモン情報のHTMLを生成しドキュメントに挿入する
        function addPokeInfo(pokeNo){
            var $pokeInfoWrapper = $container.find('.pokeInfoWrapper')
            var elements = [];
            var pokeNameListTmp = pokeNameList.concat().sort();
            pokeNameListTmp.unshift('');
            var trbody = makeTableBody(pokeNo);



            var pokeInfoHTML =      '<div class="'+ pokeNo +' pokeInfo">';
            if(pokeNo == 'poke1'){
                pokeInfoHTML = pokeInfoHTML + '<div class="'+ pokeNo +' pokeInfoTitle">自分のポケモン1</div>';
            }else if (pokeNo == 'poke2'){
                pokeInfoHTML = pokeInfoHTML + '<div class="'+ pokeNo +' pokeInfoTitle">相手のポケモン</div>';
            }else if (pokeNo == 'poke3'){
                pokeInfoHTML = pokeInfoHTML + '<div class="'+ pokeNo +' pokeInfoTitle">自分のポケモン2</div>';
            }

            //ポケモン情報ヘッダ部:ポケモン名、性格、レベル　努力値残り
            pokeInfoHTML = pokeInfoHTML +   '<div class="'+ pokeNo +' pokeInfoHeader">' +
                                        '<input type="text" autocomplete="off" name="pokeName" class="pokeName ' + pokeNo + '" placeholder="ポケモン名">' +
                                        '<select class="nature ' + pokeNo + '">' +'</select>' +
                                        '<label class="level">Lv.' +
                                            '<input type="number" name="pokeLevel" min = 1 max = 100 class="pokeLevel ' + pokeNo + '">'+
                                        '</label><br class="displayOnlySmallScreen">' +
                                        '<label class="remainingEffort">努力値残り' +
                                            '<input type="number" name="pokeRemainingEffort" class="pokeRemainingEffort ' + pokeNo + '" disabled>'+
                                        '</label>' +
                                    '</div>';
            //ポケモン情報ステータス部:実数値、個体値、努力値、ランク
            pokeInfoHTML = pokeInfoHTML +   '<div class="'+ pokeNo +' pokeInfoStatus">' +
                                        '<table class="'+ pokeNo +' pokeInfoStatusTable">' +
                                            '<thead>' + trHeader +
                                            '</thead>' + trbody +
                                            '<tbody>' +
                                            '</tbody>' +
                                        '</table>' +
                                    '</div>';
            //ポケモン情報フッター部:特性、道具、状態異常、テラスタイプ、その他状態
            pokeInfoHTML = pokeInfoHTML +   '<div class="'+ pokeNo +' pokeInfoFooter">' +
                                        '<label class="ability">特性:' +
                                            '<select class="pokeAbility ' + pokeNo + '">' +'</select>' +
                                        '</label class="abilityActivated">' +
                                        '<label>' +
                                            '<input type="checkbox" name="pokeAbilityActivated" class="pokeAbilityActivated ' + pokeNo + '" checked>特性発動' +
                                        '</label><br>'+
                                        '<label class="item">道具:' +
                                            '<select class="pokeItem ' + pokeNo + '">' +'</select>' +
                                        '</label>' +
                                        '<label>' +
                                            '<input type="checkbox" name="pokeItemActivated" class="pokeItemActivated ' + pokeNo + '" checked>道具発動' +
                                        '</label><br>'+
                                        '<label class="aliments">状態異常:' +
                                            '<select class="pokeAliments ' + pokeNo + '">' +'</select>' +
                                        '</label><br class="displayOnlyBigScreen">' +
                                        '<label class="teraType">テラスタイプ:' +
                                            '<select class="pokeTeraType ' + pokeNo + '">' +'</select>' +
                                        '</label><br>' +
                                        '<label class="twoToFiveHits" style = "display:none">連続技回数(2~5):' +
                                            '<select class="twoToFive ' + pokeNo + '">' +
                                                '<option value="5" selected>5</option>' +
                                                '<option value="4">4</option>' +
                                                '<option value="3">3</option>' +
                                                '<option value="2">2</option>' +
                                            '</select>' +
                                        '</label>' +
                                        '<label class="nezumiHits" style = "display:none">連続技回数(ネズミざん):' +
                                            '<select class="nezumi ' + pokeNo + '">' +
                                                '<option value="10" selected>10</option>' +
                                                '<option value="9">9</option>' +
                                                '<option value="8">8</option>' +
                                                '<option value="7">7</option>' +
                                                '<option value="6">6</option>' +
                                                '<option value="5">5</option>' +
                                                '<option value="4">4</option>' +
                                                '<option value="3">3</option>' +
                                                '<option value="2">2</option>' +
                                                '<option value="1">1</option>' +
                                            '</select>' +
                                        '</label>' +
                                        '<label class="countOfHits" style = "display:none">被弾回数:' +
                                            '<select class="hits ' + pokeNo + '">' +
                                                '<option value="6">6</option>' +
                                                '<option value="5">5</option>' +
                                                '<option value="4">4</option>' +
                                                '<option value="3">3</option>' +
                                                '<option value="2">2</option>' +
                                                '<option value="1">1</option>' +
                                                '<option value="0" selected>0</option>' +
                                            '</select>' +
                                        '</label>' +
                                        '<label class="countOfFaintingPokes" style = "display:none">倒されたポケモン数:' +
                                            '<select class="faintingPokes ' + pokeNo + '">' +
                                                '<option value="3">3</option>' +
                                                '<option value="2">2</option>' +
                                                '<option value="1">1</option>' +
                                                '<option value="0" selected>0</option>' +
                                            '</select>' +
                                        '</label>' +
                                        '<label class="glaiveRush" style = "display:none">' +
                                            '<input type="checkbox" name="afterGlaiveRush" class="afterGlaiveRush ' + pokeNo + '">きょけんとつげき後' +
                                        '</label>' +
                                        '<label class="protean" style = "display:none">へんげんじざい:' +
                                            '<select class="proteanType ' + pokeNo + '">' +'</select>' +
                                        '</label><br>' +
                                        '<div class="pokeConditionsInfo '+ pokeNo +'">' + pokeConditionsHTML +
                                        '</div>' +
                                    '</div>';

            pokeInfoHTML = pokeInfoHTML +'</div>';

            //HTML文字列をＤＯＭ要素化し配列に追加
            elements.push($(pokeInfoHTML).get(0));

            //DOMを挿入
            $pokeInfoWrapper.append(elements);

            //性格selectboxに性格名、性格値を設定
            for(var i =1; i < natureName.length; i++){
                $('select.nature.' + pokeNo).append($('<option>').html(natureName[i]).val(natureValueList[i]));
            }

            //道具selectboxに道具とvalueの設定
            for(var i =0; i < pokeItems.length; i++){
                $('select.pokeItem.' + pokeNo).append($('<option>').html(pokeItems[i]).val(i));
            }

            //状態異常selectboxに状態異常とvalueの設定
            for(var i =0; i < aliments.length; i++){
                $('select.pokeAliments.' + pokeNo).append($('<option>').html(aliments[i]).val(i));
            }

            //テラスタイプselectboxにタイプとタイプvalueの設定
            for(var i =0; i < typeList.length; i++){
                $('select.pokeTeraType.' + pokeNo).append($('<option>').html(typeList[i]).val(i));
            }
        }

        //ポケモン１、ポケモン２それぞれの入力値で変更があった時の処理
        $('.pokeInfo').each(function(){
            var $pokeInfo = $(this);                                                //ポケモン１、ポケモン２の入力枠
            var $pokeInfoName = $pokeInfo.attr('class').replace(' pokeInfo','');    //poke1 poke2どちらかが入る

            //ポケモン情報ヘッダ部
            var $pokeName = $pokeInfo.find('.pokeName');                        //ポケモン名
            var $pokeNature = $pokeInfo.find('.nature');                        //性格
            var $pokeLevel = $pokeInfo.find('.pokeLevel');                      //レベル
            var $pokeRemainingEffort = $pokeInfo.find('.pokeRemainingEffort');  //努力値残り

            //ポケモン情報ステータス部
            var $Actual = $pokeInfo.find('.Actual');                                                            //実数値
            var $Individual = $pokeInfo.find('.Individual');                                                    //個体値
            var $Effort = $pokeInfo.find('.Effort');                                                            //努力値
            var $Rank = $pokeInfo.find('.Rank');                                                                //ランク
            var $Effort252 = $pokeInfo.find('.Effort252');                                                      //252ボタン
            var $Effort0 = $pokeInfo.find('.Effort0');                                                          //0ボタン
            var $buttonActualSmallDisplay = $pokeInfo.find('button.ActualDisplayOnlySmallScreen');              //小さい画面でのみ表示するボタン(+-ボタン)
            var $buttonEffortSmallDisplay = $pokeInfo.find('button.EffortDisplayOnlySmallScreen');              //小さい画面でのみ表示するボタン(+-ボタン)
            var $buttonIndividualSmallDisplay = $pokeInfo.find('button.IndividualDisplayOnlySmallScreen');      //小さい画面でのみ表示するボタン(+-ボタン)
            var $buttonNature = $pokeInfo.find('.buttonNature');                                                //性格＋－ボタン


            //ポケモン情報フッター部
            var $pokeInfoFooter = $pokeInfo.find('.pokeInfoFooter');                    //ポケモン情報フッター部
            var $Ability = $pokeInfo.find('.pokeAbility');                              //特性
            var $AbilityActivated = $pokeInfo.find('.pokeAbilityActivated');            //特性発動
            var $Item = $pokeInfo.find('.pokeItem');                                    //道具
            var $ItemActivated = $pokeInfo.find('.pokeItemActivated');                  //道具発動
            var $Aliment = $pokeInfo.find('.pokeAliments');                             //状態異常
            var $TeraType = $pokeInfo.find('.pokeTeraType');                            //テラスタイプ
            var $PokeCondition = $pokeInfo.find('.pokeCondition');                      //その他状態
            var $countOfHits = $pokeInfoFooter.find('.countOfHits');                    //被弾回数 ふんどのこぶし用
            var $countOfFaintingPokes = $pokeInfoFooter.find('.countOfFaintingPokes');  //倒れたポケモン数　おはかまいり用
            var $glaiveRush = $pokeInfoFooter.find('.glaiveRush');                      //きょけんとつげき後
            var $protean = $pokeInfoFooter.find('.protean');                            //へんげんじざい
            var $twoToFiveHits = $pokeInfoFooter.find('.twoToFiveHits');                //連続技攻撃回数用
            var $nezumiHits = $pokeInfoFooter.find('.nezumiHits');                      //ネズミざん用

            //ポケモン名が変更されたとき
            function pokeNameChange(autocompletePokeName) {
                //編集するポケモン情報オブジェクトを選択
                selectPokeObj = selectEditPokeInfoObject();

                //技リストを空にする。
                selectPokeObj.moves = {};

                //一斉にプロパティを変更するため新しいオブジェクト作成
                pokeTempObj = new pokeInfoObj(selectPokeObj.name);

                //変更前情報をコピー
                Object.assign(pokeTempObj, selectPokeObj);

                //ポケモン名を格納
                var pokeName = $pokeName.val();

                if(pokeName == ''){
                    pokeName = autocompletePokeName;
                }
                //ポケモン名がpokeNameListに存在する場合、ポケモン情報オブジェクトを更新し、ステータス計算。画面に反映
                if(pokeNameList.indexOf(pokeName) >0){
                    //ポケモン情報オブジェクトのポケモンIDと名前を変更
                    pokeTempObj.pokeId = pokeNameList.indexOf(pokeName);
                    pokeTempObj.pokeName = pokeNameList[pokeTempObj.pokeId];

                    //ポケモン情報オブジェクトのステータスを計算
                    pokeTempObj.calcStatus();
                    
                    //タイプIDをポケモン情報オブジェクトに追加。
                    pokeTempObj.typeIds = pokeTypeList[pokeTempObj.pokeId];

                    //特性selectboxに特性と特性valueの設定
                    //前回選択したポケモンの特性リストを削除
                    $('select.pokeAbility.' + pokeTempObj.name).children().remove();

                    //未発動の選択肢を入れておく
                    //$('select.pokeAbility.' + pokeTempObj.name).append($('<option>').html('未発動').val(0));

                    for(var i =0; i < pokeAbilityList[pokeTempObj.pokeId].length; i++){
                        $('select.pokeAbility.' + pokeTempObj.name).append($('<option>').html(pokeAbilityNameList[pokeAbilityList[pokeTempObj.pokeId][i]]).val(pokeAbilityList[pokeTempObj.pokeId][i]));
                    }
            
                    //１つ目の特性を選択した状態にする
                    pokeTempObj.ability = pokeAbilityNameList[pokeAbilityList[pokeTempObj.pokeId][0]];

                    //ポケモン情報オブジェクトの体重を変更
                    pokeTempObj.weight = pokeWeightList[pokeTempObj.pokeId];
                    
                    //テーブルの実数値を変更
                    changeTableActualStatus(pokeTempObj);

                    //ポケモンの技リストを取得 技名をキーにした連想配列でオブジェクトに保存
                    pokeMoves =  pokeMovesList[pokeTempObj.pokeId];
                    for(var i=0;i<pokeMoves.length;i++){
                        pokeTempObj.moves[movesNameList[pokeMoves[i]]] = movesInfoList[pokeMoves[i]] ;
                    }

                    // ふんどのこぶし用入力欄
                    if(pokeName == 'オコリザル'|| pokeName == 'コノヨザル'){
                        $countOfHits.show();
                    }else{
                        $countOfHits.hide();
                    }

                    // おはかまいり用入力欄
                    if(pokeName == 'ハカドッグ'|| pokeName == 'イダイトウ♂'|| pokeName == 'イダイトウ♀'){
                        $countOfFaintingPokes.show();
                    }else{
                        $countOfFaintingPokes.hide();
                    }

                    // きょけんとつげき後
                    if(pokeName == 'セグレイブ'){
                        $glaiveRush.show();
                    }else{
                        $glaiveRush.hide();
                    }
                    var twoToFiveFlag = 0;

                    // 連続技回数(2~5)
                    Object.keys(pokeTempObj.moves).forEach(function (key) {
                        if(pokeTempObj.moves[key][8] == 82){
                            twoToFiveFlag = 1;
                        }                    
                    });

                    if(twoToFiveFlag == 1){
                        $twoToFiveHits.show();
                    }else{
                        $twoToFiveHits.hide();
                    }

                    //ネズミざん
                    if(pokeName == 'イッカネズミ'){
                        $nezumiHits.show();
                    }else{
                        $nezumiHits.hide();
                    }

                    //変更時被弾回数を0にする
                    pokeTempObj.countOfHits = 0;

                    //倒されたポケモン数を0にする
                    pokeTempObj.countOfFaintingPokes = 0;

                    //きょけんとつげき後をfalseにする
                    pokeTempObj.afterGlaiveRush = false;

                    //連続技(2~5回)用
                    pokeTempObj.twoToFiveHits = 5;

                    //ネズミざん用
                    pokeTempObj.nezumiHits = 10;

                    //オブジェクトをコピーする。
                    Object.assign(selectPokeObj, pokeTempObj);
                }
            };

            //ポケモン名が変更されたとき
            $pokeName.change(function () {
                pokeNameChange();
                $(this).blur;
            });

            $pokeName.keyup(function(){
                pokeNameChange();
                $(this).blur;
            });

            $pokeName.blur(function(){
                pokeNameChange();
                $(this).blur;
            });

            //性格が変更されたとき
            $pokeNature.change(function(){
                //編集するポケモン情報オブジェクトを選択
                pokeTempObj = selectEditPokeInfoObject();

                //ポケモン情報オブジェクトのポケモン名、ポケモンIDがない場合は計算しない
                if(pokeNameChack()){
                    return;
                }

                //性格値を変更しステータス計算。画面に反映
                pokeTempObj.natureId = parseInt($pokeNature.val());
                pokeTempObj.calcStatus();
                changeTableActualStatus(pokeTempObj)
            });

            //レベルが変更されたとき
            $pokeLevel.change(function(){
                //編集するポケモン情報オブジェクトを選択
                pokeTempObj = selectEditPokeInfoObject();

                //ポケモン情報オブジェクトのポケモン名、ポケモンIDがない場合は計算しない
                if(pokeNameChack()){
                    return;
                }

                //レベルが空欄の場合は計算しない
                if($pokeLevel.val() == ''){
                    return;
                }

                //レベルを変更しステータス計算。画面に反映
                pokeTempObj.level = parseInt($pokeLevel.val());
                pokeTempObj.calcStatus();
                changeTableActualStatus(pokeTempObj)
            });

            //実数値が変更されたとき
            $Actual.change(function(){
                //編集するポケモン情報オブジェクトを選択
                pokeTempObj = selectEditPokeInfoObject();

                //ポケモン情報オブジェクトのポケモン名、ポケモンIDがない場合は計算しない
                if(pokeNameChack()){
                    return;
                }

                //HABCDSのどのステータスか特定
                $ActualInfo = $(this).attr('class').replace(' Actual','');

                //努力値を計算
                var Effort = pokeTempObj.calcEffort($ActualInfo,parseInt($(this).val()));

                //努力値が-4以上252以下の場合 ※努力値4降った実数値を1減らすと　努力値の計算結果が‐4になるため
                if(-4 <= Effort && 252 >= Effort){
                    
                    //努力値の入力欄を変更
                    if(Effort >= 0){
                        $Effort.filter('.'+$ActualInfo).val(Effort);
                    }else{
                        //計算結果が負の場合は0をセット
                        $Effort.filter('.'+$ActualInfo).val(0);
                    }

                    //努力値の合計を算出
                    var effortSum = effortSumCalc();

                    if(effortSum > 510){
                        //努力値510を超えたら表示をもとに戻す
                        backTableEffort(pokeTempObj);
                        changeTableActualStatus(pokeTempObj);
                        return;
                    }else{
                        //実数値をポケモン情報オブジェクトにセット
                        if(pokeTempObj[$ActualInfo + 'Actual'] !=  $(this).val()){
                            pokeTempObj[$ActualInfo + 'Actual'] = $(this).val();
                        }
                        //ポケモン情報オブジェクトの努力値に画面努力値をセット
                        if(pokeTempObj[$ActualInfo + 'Effort'] != parseInt($('.'+$ActualInfo + '.'+'Effort').val())){
                            pokeTempObj[$ActualInfo + 'Effort'] = parseInt($('.'+$ActualInfo + '.'+'Effort').val())
                        }
                        //努力値合計の値を変更
                        $pokeRemainingEffort.val(510 - effortSum);
                    }
                }else{
                    backTableEffort(pokeTempObj);
                    changeTableActualStatus(pokeTempObj);
                }
            });

            //個体値が変更されたとき
            $Individual.change(function(){
                //編集するポケモン情報オブジェクトを選択
                pokeTempObj = selectEditPokeInfoObject();

                //変更後の努力値が0未満253以上の場合、変更前の表示をする。
                var IndividualInput = parseInt($(this).val());
                if(IndividualInput < 0 || IndividualInput > 252){
                    backTableEffort(pokeTempObj);
                    return;
                }

                //HABCDSのどのステータスか特定
                $IndividualInfo = $(this).attr('class').replace(' ','');

                //個体値を変更
                pokeTempObj[$IndividualInfo] = IndividualInput;

                //ポケモン情報オブジェクトのポケモン名、ポケモンIDがない場合は計算しない
                if(pokeNameChack()){
                    return;
                }else{
                    //ステータス計算。画面に反映
                    pokeTempObj.calcStatus();
                    changeTableActualStatus(pokeTempObj);
                }
            });

            //努力値が変更されたとき
            $Effort.change(function(){
                //編集するポケモン情報オブジェクトを選択
                pokeTempObj = selectEditPokeInfoObject();

                //変更後の努力値が0未満253以上の場合、変更前の表示をする。
                var effortInput = parseInt($(this).val());
                if(effortInput < 0 || effortInput > 252){
                    backTableEffort(pokeTempObj);
                    return;
                }

                //変更後の努力値合計が511以上の場合、変更前の表示をする
                var effortSum = effortSumCalc();

                if(effortSum > 510){
                    backTableEffort(pokeTempObj);
                    return;
                }

                //HABCDSのどのステータスか特定
                $EffortInfo = $(this).attr('class').replace(' ','');

                //努力値を変更
                pokeTempObj[$EffortInfo] = effortInput;

                //努力値合計の値を変更
                $pokeRemainingEffort.val(510 - effortSum);

                //ポケモン情報オブジェクトのポケモン名、ポケモンIDがない場合は計算しない
                if(pokeNameChack()){
                    return;
                }else{
                    //ステータス計算。画面に反映
                    pokeTempObj.calcStatus();
                    changeTableActualStatus(pokeTempObj)
                }
            });

            //252ボタンがおされたとき
            $Effort252.on('click',function(){
                //編集するポケモン情報オブジェクトを選択
                pokeTempObj = selectEditPokeInfoObject();

                //HABCDSのどのステータスか特定
                $EffortInfo = $(this).attr('class').replace(' ','').replace('252','').replace('Effort','');

                //テーブルの努力値を252に変更
                var $tableEffort = $pokeInfo.find('.' + $EffortInfo + '.Effort');
                $tableEffort.val(252);

                var effortSum = effortSumCalc();

                //変更後の努力値合計が511以上の場合、変更前の表示をする
                if(effortSum > 510){
                    backTableEffort(pokeTempObj);
                    return;
                }

                //ポケモン情報オブジェクトの名前に合わせる
                $EffortInfo = $EffortInfo+ 'Effort';

                //努力値を変更
                pokeTempObj[$EffortInfo] = 252;

                //努力値合計の値を変更
                $pokeRemainingEffort.val(510 - effortSum);

                //ポケモン情報オブジェクトのポケモン名、ポケモンIDがない場合は計算しない
                if(pokeNameChack()){
                    return;
                }else{
                    //ステータス計算。画面に反映
                    pokeTempObj.calcStatus();
                    changeTableActualStatus(pokeTempObj)
                }
            });

            //0ボタンがおされたとき
            $Effort0.on('click',function(){
                //編集するポケモン情報オブジェクトを選択
                pokeTempObj = selectEditPokeInfoObject();

                //HABCDSのどのステータスか特定
                $EffortInfo = $(this).attr('class').replace(' ','').replace('0','').replace('Effort','');

                //テーブルの努力値を0に変更
                var $tableEffort = $pokeInfo.find('.' + $EffortInfo + '.Effort');
                $tableEffort.val(0);

                var effortSum = effortSumCalc();

                //ポケモン情報オブジェクトの名前に合わせる
                $EffortInfo = $EffortInfo+ 'Effort';

                //努力値を変更
                pokeTempObj[$EffortInfo] = 0;

                //努力値合計の値を変更
                $pokeRemainingEffort.val(510 - effortSum);

                //ポケモン情報オブジェクトのポケモン名、ポケモンIDがない場合は計算しない
                if(pokeNameChack()){
                    return;
                }else{
                    //ステータス計算。画面に反映
                    pokeTempObj.calcStatus();
                    changeTableActualStatus(pokeTempObj)
                }
            });

            // 小さい画面で;+-ボタンが押されたとき(実数値)
            $buttonActualSmallDisplay.on('click',function(){
                // 編集するポケモン情報オブジェクトを選択
                pokeTempObj = selectEditPokeInfoObject();

                // 押されたボタンのクラスを取得
                var $classInfo = $(this).attr('class').replace('ActualDisplayOnlySmallScreen ','');
                // 区切り文字としての空白位置を取得
                var delimiter = $classInfo.indexOf(' ');

                //HP・攻撃・防御・特攻・特防・素早さか　実数値・個体値・努力値か　＋かーかを確認 
                var statusInfo = $classInfo.substring(0,delimiter).replace(' ','');
                var plusOrMinus = $classInfo.substring(delimiter,$classInfo.length).replace(' ','');

                //変化量
                var amountOfChange = 0;

                //ポケモン情報オブジェクトのポケモン名、ポケモンIDがない場合は計算しない
                if(pokeNameChack()){
                    return;
                }

                //変化量を設定
                if(plusOrMinus == 'plus'){
                    amountOfChange = 1;
                }else if(plusOrMinus == 'minus'){
                    amountOfChange = -1;
                }

                //テーブルの値を変更
                $Actual.filter('.'+statusInfo).val(parseInt($Actual.filter('.'+statusInfo).val()) + amountOfChange);

                //変更後テーブルの値を保存
                var Actual = parseInt($Actual.filter('.'+statusInfo).val());

                //努力値を計算
                var Effort = pokeTempObj.calcEffort(statusInfo,Actual);

                //努力値が-4以上252以下の場合 ※努力値4降った実数値を1減らすと　努力値の計算結果が‐4になるため
                if(-4 <= Effort && 252 >= Effort){
                    
                    //努力値の入力欄を変更
                    if(Effort >= 0){
                        $Effort.filter('.'+statusInfo).val(Effort);
                    }else{
                        //計算結果が負の場合は0をセット
                        $Effort.filter('.'+statusInfo).val(0);
                    }

                    //努力値の合計を算出
                    var effortSum = effortSumCalc();

                    if(effortSum > 510){
                        //努力値510を超えたら表示をもとに戻す
                        backTableEffort(pokeTempObj);
                        changeTableActualStatus(pokeTempObj);
                        return;
                    }else{
                        //実数値をポケモン情報オブジェクトにセット
                        if(pokeTempObj[statusInfo + 'Actual'] !=  Actual){
                            pokeTempObj[statusInfo + 'Actual'] = Actual;
                        }
                        //ポケモン情報オブジェクトの努力値に画面努力値をセット
                        if(pokeTempObj[statusInfo + 'Effort'] != parseInt($('.'+statusInfo + '.'+'Effort').val())){
                            pokeTempObj[statusInfo + 'Effort'] = parseInt($('.'+statusInfo + '.'+'Effort').val())
                        }
                        //努力値合計の値を変更
                        $pokeRemainingEffort.val(510 - effortSum);
                    }
                }else{
                    backTableEffort(pokeTempObj);
                    changeTableActualStatus(pokeTempObj);
                }
            });

            // 小さい画面で;+-ボタンが押されたとき(個体値)
            $buttonIndividualSmallDisplay.on('click',function(){
                // 編集するポケモン情報オブジェクトを選択
                pokeTempObj = selectEditPokeInfoObject();

                // 押されたボタンのクラスを取得
                var $classInfo = $(this).attr('class').replace('IndividualDisplayOnlySmallScreen ','');
                // 区切り文字としての空白位置を取得
                var delimiter = $classInfo.indexOf(' ');

                //HP・攻撃・防御・特攻・特防・素早さか　実数値・個体値・努力値か　＋かーかを確認 
                var statusInfo = $classInfo.substring(0,delimiter).replace(' ','');
                var plusOrMinus = $classInfo.substring(delimiter,$classInfo.length).replace(' ','');

                //変化量
                var amountOfChange = 0;

                //変化量を設定
                if(plusOrMinus == 'plus'){
                    amountOfChange = 1;
                }else if(plusOrMinus == 'minus'){
                    amountOfChange = -1;
                }

                //テーブルの値を変更
                if((parseInt($Individual.filter('.'+statusInfo).val()) == 31 && amountOfChange == 1) ||
                (parseInt($Individual.filter('.'+statusInfo).val()) == 0 && amountOfChange == -1)){
                    return;
                }

                $Individual.filter('.'+statusInfo).val(parseInt($Individual.filter('.'+statusInfo).val()) + amountOfChange);

                //変更後テーブルの値を保存
                var Individual = parseInt($Individual.filter('.'+statusInfo).val());

                //個体値を変更
                pokeTempObj[statusInfo+'Individual'] = Individual;

                //ポケモン情報オブジェクトのポケモン名、ポケモンIDがない場合は計算しない
                if(pokeNameChack()){
                    return;
                }else{

                //ステータス計算。画面に反映
                pokeTempObj.calcStatus();
                changeTableActualStatus(pokeTempObj);
                }
            });

            // 小さい画面で;+-ボタンが押されたとき(努力値)
            $buttonEffortSmallDisplay.on('click',function(){
                // 編集するポケモン情報オブジェクトを選択
                pokeTempObj = selectEditPokeInfoObject();

                // 押されたボタンのクラスを取得
                var $classInfo = $(this).attr('class').replace('EffortDisplayOnlySmallScreen ','');
                // 区切り文字としての空白位置を取得
                var delimiter = $classInfo.indexOf(' ');

                //HP・攻撃・防御・特攻・特防・素早さか　実数値・個体値・努力値か　＋かーかを確認 
                var statusInfo = $classInfo.substring(0,delimiter).replace(' ','');
                var plusOrMinus = $classInfo.substring(delimiter,$classInfo.length).replace(' ','');

                //変化量
                var amountOfChange = 0;

                //変化量を設定
                if(plusOrMinus == 'plus'){
                    amountOfChange = 4;
                }else if(plusOrMinus == 'minus'){
                    amountOfChange = -4;
                }

                //テーブルの値を変更
                if((parseInt($Effort.filter('.'+statusInfo).val()) == 252 && amountOfChange == 4) ||
                (parseInt($Effort.filter('.'+statusInfo).val()) == 0 && amountOfChange == -4)){
                    return;
                }

                $Effort.filter('.'+statusInfo).val(parseInt($Effort.filter('.'+statusInfo).val()) + amountOfChange);

                var effortSum = effortSumCalc();

                //変更後の努力値合計が511以上の場合、変更前の表示をする
                if(effortSum > 510){
                    backTableEffort(pokeTempObj);
                    return;
                }

                //努力値合計の値を変更
                $pokeRemainingEffort.val(510 - effortSum);

                //変更後テーブルの値を保存
                var Effort = parseInt($Effort.filter('.'+statusInfo).val());

                //努力値を変更
                pokeTempObj[statusInfo+'Effort'] = Effort;

                //ポケモン情報オブジェクトのポケモン名、ポケモンIDがない場合は計算しない
                if(pokeNameChack()){
                    return;
                }else{

                //ステータス計算。画面に反映
                pokeTempObj.calcStatus();
                changeTableActualStatus(pokeTempObj);
                }
            });

            //ランクが変更されたとき
            $Rank.change(function(){
                //編集するポケモン情報オブジェクトを選択
                pokeTempObj = selectEditPokeInfoObject();

                //HABCDSのどのステータスか特定
                $RankInfo = $(this).attr('class').replace(' ','');

                //ランクを変更
                pokeTempObj[$RankInfo] = parseInt($(this).val());
            });

            //性格＋ーボタンが押されたとき
            $buttonNature.change(function(){
                //編集するポケモン情報オブジェクトを選択
                pokeTempObj = selectEditPokeInfoObject();

                var chackedButtonAttr = $(this).children().children().attr('class');
                var chackedButtonVal = $(this).parents('.' + pokeTempObj.name).find('input[name='+chackedButtonAttr+']:checked').val();
                var chackedKindStatus = chackedButtonAttr.replace('buttonNature','').replace(pokeTempObj.name,'');
                var checkedPlusStatus = '';
                var checkedMinusStatus = '';
                var natureCompensationListTmp = [];
                var $checkedPlusMinus = '';
                //操作したボタンのステータスを保存
                if(chackedButtonVal == 'plus'){
                    checkedPlusStatus = chackedKindStatus;
                }else{
                    checkedMinusStatus = chackedKindStatus;
                }

                // ほかのステータスで押した値が同じもので押されている場合は外す 
                for(var i = 1;i < pokeStatusParamList.length;i++){
                    if(pokeStatusParamList[i] == chackedKindStatus){
                        continue;
                    }else{
                        $checkedPlusMinus = $(this).parents('.' + pokeTempObj.name).find('input[name=buttonNature'+pokeStatusParamList[i]+ pokeTempObj.name +']:checked');
                        
                        if($checkedPlusMinus.val() == chackedButtonVal && $checkedPlusMinus.val() != ''){
                            $checkedPlusMinus.prop("checked", false);
                        //押した値と反対の値が押されていたらそのステータスを保存
                        }else if($checkedPlusMinus.val() != null){
                            if(chackedButtonVal == 'plus'){
                                var checkedMinusStatus = pokeStatusParamList[i];
                            }else{
                                var checkedPlusStatus = pokeStatusParamList[i];
                            }
                        
                        }
                    }
                }

                //+ -が両方チェックされている場合、ポケモン情報オブジェクトを変更
                if(checkedPlusStatus != '' && checkedMinusStatus != ''){
                    // 性格補正比較用配列を作成
                    for(var j = 1;j < pokeStatusParamList.length;j++){
                        if(pokeStatusParamList[j] == checkedPlusStatus){
                            natureCompensationListTmp.push(1.1); 
                        }else if(pokeStatusParamList[j] == checkedMinusStatus){
                            natureCompensationListTmp.push(0.9);
                        }else{
                            natureCompensationListTmp.push(1);
                        }
                    }

                    // 性格補正比較用配列と一致する性格を探し、ポケモン情報オブジェクトおよび計算機の性格セレクトボックスを変更
                    for(var k=0; k < natureCompensationList.length; k++){
                        if(natureCompensationList[k].toString() == natureCompensationListTmp.toString()){
                            pokeTempObj.natureId = natureValueList[k];
                            $pokeNature.val(natureValueList[k]);
                            if(pokeNameChack()){
                                return;
                            }
                            pokeTempObj.calcStatus();
                            changeTableActualStatus(pokeTempObj)

                            break;
                        }
                    }
                }
            });

            //特性が変更されたとき
            $Ability.change(function(){
                //編集するポケモン情報オブジェクトを選択
                pokeTempObj = selectEditPokeInfoObject();

                //特性を変更
                if ($(this).val() == 0){
                    pokeTempObj.ability = '';
                }else{
                    pokeTempObj.ability = $('option:selected',this).text();
                }

                //へんげんじざいの場合はタイプ変更欄を表示する。
                if(pokeTempObj.ability == 'へんげんじざい'){
                    for(var i =0; i < typeList.length; i++){
                        $('select.proteanType.' + pokeTempObj.name).append($('<option>').html(typeList[i]).val(i));
                        $('select.proteanType.' + pokeTempObj.name + " option[value='18']").prop('selected', true);
                    }
                    $protean.show();
                    pokeTempObj.typeIdsTmp = pokeTempObj.typeIds;
                }else{
                    $protean.hide();
                }
            });

            //特性発動が変更されたとき
            $AbilityActivated.change(function(){
                //編集するポケモン情報オブジェクトを選択
                pokeTempObj = selectEditPokeInfoObject();
                
                //特性発動を変更
                pokeTempObj.abilityActivated = $(this).prop('checked');
            });

            //道具が変更されたとき
            $Item.change(function(){
                //編集するポケモン情報オブジェクトを選択
                pokeTempObj = selectEditPokeInfoObject();

                //道具を変更
                if ($(this).val() == 0){
                    pokeTempObj.item = '';
                }else{
                    pokeTempObj.item = $('option:selected',this).text();
                }
            });

            //道具発動が変更されたとき
            $ItemActivated.change(function(){
                //編集するポケモン情報オブジェクトを選択
                pokeTempObj = selectEditPokeInfoObject();
                
                //道具発動を変更
                pokeTempObj.itemActivated = $(this).prop('checked');
            });
            
            //状態異常が変更されたとき
            $Aliment.change(function(){
                //編集するポケモン情報オブジェクトを選択
                pokeTempObj = selectEditPokeInfoObject();

                //状態異常を変更
                if ($(this).val() == 0){
                    pokeTempObj.aliment = '';
                }else{
                    pokeTempObj.aliment = $('option:selected',this).text();
                }
            });

            //テラスタイプが変更されたとき
            $TeraType.change(function(){
                //編集するポケモン情報オブジェクトを選択
                pokeTempObj = selectEditPokeInfoObject();

                //テラスタイプを変更
                if ($(this).val() == 18){
                    pokeTempObj.teraTypeId = null;
                }else{
                    pokeTempObj.teraTypeId = $('option:selected',this).val();
                }
            });

            //その他状態が変更されたとき
            $PokeCondition.change(function(){
                //編集するポケモン情報オブジェクトを選択
                pokeTempObj = selectEditPokeInfoObject();

                //その他状態を変更
                pokeTempObj.conditions[$(this).parent().text()] = $(this).prop('checked');
                
                //オブジェクトのつくりが悪いのかdefinePropertyで変化を拾えない
                calcDamage()
            });

            //被弾回数が更新されたとき
            $countOfHits.change(function(){
                //編集するポケモン情報オブジェクトを選択
                pokeTempObj = selectEditPokeInfoObject();

                //被弾回数を変更
                pokeTempObj.countOfHits = $('option:selected',this).val();
            });

            //倒されたポケモン数が更新されたとき
            $countOfFaintingPokes.change(function(){
                //編集するポケモン情報オブジェクトを選択
                pokeTempObj = selectEditPokeInfoObject();

                //倒されたポケモン数を変更
                pokeTempObj.countOfFaintingPokes = $('option:selected',this).val();
            });

            //きょけんとつげき後が変更されたとき
            $glaiveRush.change(function(){
                //編集するポケモン情報オブジェクトを選択
                pokeTempObj = selectEditPokeInfoObject();

                //倒されたポケモン数を変更
                pokeTempObj.afterGlaiveRush = $(this).children().prop('checked');
            });

            //へんげんじざいが変更されたとき
            $protean.change(function(){
                //編集するポケモン情報オブジェクトを選択
                pokeTempObj = selectEditPokeInfoObject();

                //タイプIDを変更
                if($(this).children().val() != 18){
                    pokeTempObj.typeIds = [parseInt($(this).children().val())];
                }else{
                    pokeTempObj.typeIds = pokeTempObj.typeIdsTmp;
                }
            });

            // 連続技回数(2~5)が変更されたとき
            $twoToFiveHits.change(function(){
                //編集するポケモン情報オブジェクトを選択
                pokeTempObj = selectEditPokeInfoObject();

                pokeTempObj.twoToFiveHits = parseInt($(this).children().val());
            });

            // ネズミざんが変更されたとき
            $nezumiHits.change(function(){
                //編集するポケモン情報オブジェクトを選択
                pokeTempObj = selectEditPokeInfoObject();

                pokeTempObj.nezumiHits = parseInt($(this).children().val());
            });

            //ポケモン情報オブジェクトのnameが一致するpokeTempObjに格納、　参照なので直接編集できる。
            function selectEditPokeInfoObject(){
                for(var i =0; i < pokeObjList.length;i++){
                    if(pokeObjList[i].name == $pokeInfoName){
                        return pokeObjList[i];
                    }
                }
            }

            //ポケモン情報オブジェクトのポケモン名、ポケモンID入力チェック
            function pokeNameChack(){
                if(pokeTempObj.pokeId == null || pokeTempObj.pokeName == null){
                    return true;
                }
            }

            //実数値の変更に伴うテーブルの更新
            function changeTableActualStatus(pokeTempObj){
                for(var i=0; i < pokeStatusParamList.length;i++){
                    var $tableActual = $pokeInfo.find('.' + pokeStatusParamList[i] + '.Actual');
                    $tableActual.val(pokeTempObj[pokeStatusParamList[i] + 'Actual']);
                }
            };

            //変更後の努力値合計を算出
            function effortSumCalc(){
                var sum = 0;

                //変更後の努力値合計を算出
                for(var i=0;i < $Effort.length;i++){
                    sum += parseInt($Effort[i].value);
                }

                return sum;
            }

            //努力値が510を超えた時、表示を戻す
            function backTableEffort(pokeTempObj){
                for(var i=0; i < pokeStatusParamList.length;i++){
                    var $tableEffort = $pokeInfo.find('.' + pokeStatusParamList[i] + '.Effort');
                    $tableEffort.val(pokeTempObj[pokeStatusParamList[i] + 'Effort']);
                }
            };

            //auto
            $pokeName.autocomplete({
                source: function(request, response) {
                            var searchStr = request.term; /* 入力文字列取得 */
                            var suggest = new Array();
                            $.each(pokeNameAutoComplete, function(index, value){
                                if ( value[0].match(searchStr)        /* カタカナで検索 */
                                    || value[1].match(searchStr)      /* ひらがなで検索 */
                                    || value[2].toUpperCase().match(searchStr.toUpperCase()) /* ローマ字で検索 */
                                ) {
                                    /* カタカナを入力候補として表示させるために配列に設定 */
                                    suggest.push(value[0]);
                                }
                        });
                        response(suggest);  /* 結果を設定 */
                },
                //オートコンプリートのオプション
                messages: {
                    noResults: '',
                    results: function() {}
                },
                focus: function (event, ui) {
                    $(".ui-helper-hidden-accessible").hide();
                    event.preventDefault();
                },
                select: function( event, ui ) {
                    $(this).val(ui.item.value);

                    pokeNameChange(ui.item.value);

                    // フォーカスを外す
                    $(this).blur();                    
                }        
            });
        });

        //タブ回り　参考https://dezanari.com/jquery-swipe-tab/
        var $tabAnchorsPokeInfo = $(this).find('.tabPokeInfo a'),//タブのaタグ
        $panelInnerPokeInfo = $(this).find('.pokeInfoWrapper'),//スライドする部分
        panelWidthPokeInfo = $panelInnerPokeInfo.find('.pokeInfo').width();//パネルのwidth
        
        //タブがクリックされたらタブのインデックス番号を取得し、
        //$panelInnerをタブのwidth*インデックス番号分leftを移動
        $tabAnchorsPokeInfo.click(function(event){
            //デフォルトのaタグの動作をキャンセル
            event.preventDefault();
    
            var index = $(this).closest('li').index();//クリックされたタブのインデックス番号
            $panelInnerPokeInfo.animate({
                scrollLeft:panelWidthPokeInfo * index + 'px'
            },300,'swing');

            $(this).parents('ul').children().removeClass('active');
            $(this).parent().addClass('active');
        });

        //スクロール時タブのアクティブ非アクティブをつけたり外したり
        $panelInnerPokeInfo.scroll(function () {
            const el = $(this).scrollLeft(); //スクロール量
            if(el < 1){
                $('div.tabPokeInfo > ul > li').removeClass('active');
                $('div.tabPokeInfo > ul > li:nth-child(1)').addClass('active');
            }else if(el > panelWidthPokeInfo - 10){
                $('div.tabPokeInfo > ul > li').removeClass('active');
                $('div.tabPokeInfo > ul > li:nth-child(2)').addClass('active');
            }
        });

        // オブジェクトのプロパティを監視,変更があったらダメージ計算を行う（入力チェックはダメージ計算部で行う）
        Object.getOwnPropertyNames(pokeObjList[0]).forEach(propName => watchAll(pokeObjList[0], calcDamageCheck));
        Object.getOwnPropertyNames(pokeObjList[1]).forEach(propName => watchAll(pokeObjList[1], calcDamageCheck));
        Object.getOwnPropertyNames(environment).forEach(propName => watchAll(environment, calcDamageCheck));

        // 重い処理対策
        function calcDamageCheck(propName,index){
            //ポケモン名変更時、45個のオブジェクトが変更され、その毎にダメージ計算を行っている
            //最後のオブジェクト変更時のみダメージ計算を行う
            if(propName ==='name'){
                return;
            }else if(propName ==='pokeId'){
                pokeIdChangeFlag = true;
                return;
            }

            //ポケモン名変更時
            if(pokeIdChangeFlag){
                if(index === 45){
                    calcDamage();
                    pokeIdChangeFlag = false;
                }
            //その他変更時
            }else{
                calcDamage();
            }
        }

        // 画面でパラメータ変更時にダメージ計算を行い表示する。
        function calcDamage(){
            var attecker,defender;
            var poke1ToPoke2 = [];
            var poke2ToPoke1 = [];
            var poke1ToPoke2HTML = ''
            var poke2ToPoke1HTML = ''
            var damageCalcHTML = '';
            var $damageCalc = $container.find('.damageCalc');

            //poke1→poke2のダメージリストを作成
            attecker = poke1obj;
            defender = poke2obj;

            //ポケモン二匹の技が決定していない場合は計算しない
            if((Object.keys(attecker.moves).length == 0) || Object.keys(defender.moves).length == 0){
                return;
            }

            poke1ToPoke2 = makeCalcDamageList(attecker,defender,environment);

            //poke2→poke1のダメージリストを作成
            attecker = poke2obj;
            defender = poke1obj;
            poke2ToPoke1 = makeCalcDamageList(attecker,defender,environment);
            
            //HTML用に文字列形成
            poke1ToPoke2HTML = makeDamageCalcHTML(poke1ToPoke2);
            poke2ToPoke1HTML = makeDamageCalcHTML(poke2ToPoke1);
            
            //前の計算結果を削除
            $damageCalc.remove();

            damageCalcHTML = damageCalcHTML + '<div class="damageCalc">';
            damageCalcHTML = damageCalcHTML + '<div class="tabDamageCalc">';
            damageCalcHTML = damageCalcHTML +     '<ul>'
            damageCalcHTML = damageCalcHTML +       '<li class="active"><a href="#tab-calc1">自分→相手</a></li>';
            damageCalcHTML = damageCalcHTML +       '<li><a href="#tab-calc2">相手→自分</a></li>';
            damageCalcHTML = damageCalcHTML +     '</ul>';
            damageCalcHTML = damageCalcHTML + '</div>';
            damageCalcHTML = damageCalcHTML + '<div class="damageCalcWrapper">';
            damageCalcHTML = damageCalcHTML + poke1ToPoke2HTML;
            damageCalcHTML = damageCalcHTML + poke2ToPoke1HTML;
            damageCalcHTML = damageCalcHTML + '</div>';

            damageCalcHTML = damageCalcHTML + '</div>';

            var elements = [];
            // HTML文字列をＤＯＭ要素化し配列に追加
            elements.push($(damageCalcHTML).get(0));

            // DOMを挿入
            $container.append(elements);

            // 前の計算結果を削除しているので改めてfind
            var $damageCalcDisplayed = $container.find('.damageCalc');
            var $moveCell = $damageCalcDisplayed.find('.moveCell');
            var $allMoveDisplay = $damageCalcDisplayed.find('.allMoveDisplay');
            var $damageCalclist = $damageCalcDisplayed.find('.pokeDamageCalcList');

            // 技セル毎の処理
            $moveCell.each(function(){
                var $modalContainer = $(this).find('.modal-container');
                var $modalContent = $(this).find('.modal-content');
                var $modalClose = $modalContainer.find('.modal-close');
                var $copyHtml = $modalContainer.find('.copyHtml');
                var $details = $modalContainer.find('details');
                var $copyImage = $modalContainer.find('.copyImage')

                //技を10件だけ表示
                var moveNo = parseInt($(this).attr('class').replace(' moveCell','').replace('moveNo',''));
                if(moveNo > 10){
                    $(this).hide();
                }

                //各技をクリックするとモーダルが開く
                $(this).click(function(){
                    $modalContainer.addClass('active');
                    return false;
                });

                //閉じるボタンをクリックしたらモーダルを閉じる
                $modalClose.on('click',function(){	
                    $modalContainer.removeClass('active');
                    return false;
                });

                // HTMLコピーボタン押下時
                $copyHtml.on('click',function(){
                    if (navigator.clipboard == undefined) {
                        window.clipboardData.setData("Text", $modalContent.html());
                    } else {
                        navigator.clipboard.writeText($modalContent.html());
                    }
                });

                // 画像コピーボタン押下時
                // 参考 https://blog.kimizuka.org/entry/2021/11/10/114021
                $copyImage.on('click', function(){
                    //ディープコピーしているつもりだけどどうやっても参照している。
                    var copyObj =  $.extend(true,copyObj, $modalContent);
                    //var copyObj =  Object.assign({}, $modalContent);
                    //var copyObj = JSON.parse(JSON.stringify($modalContent));
                    var modalContentTmp = copyObj.get(0);

                    //画像にするとき、display:'list-item'の場合summaryの横に数字が表示され邪魔なため削除
                    //そのままだと表示している画面の▼もきえるので力技で対処している。
                    var summaryCollection = modalContentTmp.getElementsByTagName('summary');
                    for(var i = 0;i < summaryCollection.length;i++){
                        summaryCollection[i].style.display = 'block';
                    }

                    html2canvas(modalContentTmp,{
                        // オプションはなし
                        
                        }).then(function(canvas){
                            //pngにしてダウンロードはこちら
                            //downloadImage(canvas.toDataURL());
                            
                            // Canvas から Blob オブジェクトを生成
                            canvas.toBlob(async (blob) => {
                                // 画像データをクリップボードに書き込む
                                const item = new ClipboardItem({
                                'image/png': blob
                                });
                                await navigator.clipboard.write([item]);
                                //window.alert('クリップボードにコピーしました。');
                            });
                    })

                    //力技でdisplay:'list-item'にもどす。
                    for(var i = 0;i < summaryCollection.length;i++){
                        summaryCollection[i].style.display = 'list-item';
                    }

                });

                //pngにしてダウンロード　要望あったら追加
                function downloadImage(dataUrl) {
                    const name = 'screenshot.png';
                    const a = document.createElement('a');
                
                    a.href = dataUrl;
                    a.download = name;
                    a.click();
                }

                //コンテナ内ではdetails,summaryが効かないためjs側で処理
                $details.on('click',function(){
                    if(!$(this).attr('open')){
                        $(this).attr('open',true);
                    }else{
                        $(this).removeAttr('open');
                    }
                });
            });

            // 全ての技を表示ボタン押下時
            $allMoveDisplay.click(function(){
                $parentMoveCell = $(this).parent().find('.moveCell');
                $parentMoveCell.show();
                $(this).hide();
                $damageCalclist.css('height','90%');
                $damageCalclist.css('backgrond-color','inherit');
            });

            var $tabAnchorsDamageCalc = $damageCalcDisplayed.find('.tabDamageCalc a'),//タブのaタグ
            $panelInnerDamageCalc = $damageCalcDisplayed.find('.damageCalcWrapper'),//スライドする部分
            panelWidthDamageCalc = $panelInnerDamageCalc.children().width();//パネルのwidth
            
            //タブがクリックされたらタブのインデックス番号を取得し、
            //$panelInnerをタブのwidth*インデックス番号分leftを移動
            $tabAnchorsDamageCalc.click(function(event){
                //デフォルトのaタグの動作をキャンセル
                event.preventDefault();
        
                var index = $(this).closest('li').index();//クリックされたタブのインデックス番号
                $panelInnerDamageCalc.animate({
                    scrollLeft:panelWidthDamageCalc * index + 'px'
                },300,'swing');
    
                $(this).parents('ul').children().removeClass('active');
                $(this).parent().addClass('active');
            });
    
            //スクロール時タブのアクティブ非アクティブをつけたり外したり
            $panelInnerDamageCalc.scroll(function () {
                const el = $(this).scrollLeft(); //スクロール量
                if(el < 1){
                    $('div.tabDamageCalc > ul > li').removeClass('active');
                    $('div.tabDamageCalc > ul > li:nth-child(1)').addClass('active');
                }else if(el > panelWidthDamageCalc){
                    $('div.tabDamageCalc > ul > li').removeClass('active');
                    $('div.tabDamageCalc > ul > li:nth-child(2)').addClass('active');
                }
            });
        }

        function makeDamageCalcHTML(pokeToPoke){
            var pokeToPokeHTML = '';
            var maxDamageColor = '';
            var minDamageColor = '';

            pokeToPokeHTML = pokeToPokeHTML + '<div class="' + pokeToPoke[0].attacker.name +'To'+pokeToPoke[0].defender.name +'">';

            if(pokeToPoke[0].attacker.name== 'poke1'){
                pokeToPokeHTML = pokeToPokeHTML + '<div class="pokeDamageCalcTitle">自分のポケモン1→相手のポケモン</div>';
            }else if(pokeToPoke[0].attacker.name == 'poke2'){
                pokeToPokeHTML = pokeToPokeHTML + '<div class="pokeDamageCalcTitle">相手のポケモン→自分のポケモン1</div>';
            }

            pokeToPokeHTML = pokeToPokeHTML + '<div class="pokeDamageCalcList">';

            //ダメージの多い順でソート
            pokeToPoke.sort((a,b) =>{
                return a.maxDamage > b.maxDamage ? -1:1; 
            });

            for(var i = 0;i <pokeToPoke.length; i++){
                    //HPバーの色を決める
                    if(pokeToPoke[i].maxDamagePercent >= 80){
                        maxDamageColor = '#ff7f7f';
                        minDamageColor = '#ffdbdb';
                    }else if(pokeToPoke[i].maxDamagePercent > 50 && 80 > pokeToPoke[i].maxDamagePercent){
                        maxDamageColor = '#ffff7f';
                        minDamageColor = '#ffffdb';
                    }else{
                        maxDamageColor = '#7fff7f';
                        minDamageColor = '#dbffdb';
                    }

                    pokeToPokeHTML = pokeToPokeHTML + '<div class="moveNo'+ (i+1) + ' moveCell">';
                    pokeToPokeHTML = pokeToPokeHTML +       '<div class="moveName">';
                    pokeToPokeHTML = pokeToPokeHTML +           pokeToPoke[i].move;
                    pokeToPokeHTML = pokeToPokeHTML +       '</div>' 
                    pokeToPokeHTML = pokeToPokeHTML +       '<div class="damagePercent">';
                    pokeToPokeHTML = pokeToPokeHTML +           pokeToPoke[i].minDamagePercent + '%～' + pokeToPoke[i].maxDamagePercent+'%';
                    pokeToPokeHTML = pokeToPokeHTML +       '</div>' 
                    pokeToPokeHTML = pokeToPokeHTML +       '<div class= "hpBar maxHp" style="background-color: #e0e0e0;height:6px;width:100%;position:relative;border-radius: 10px;">'
                    pokeToPokeHTML = pokeToPokeHTML +           '<div class= "hpBar maxDamage" style="background-color: '+ maxDamageColor+';height:6px;width:'+ (100 - parseInt(pokeToPoke[i].maxDamagePercent)) +'%;position:absolute;top:0px;left:0px;z-index:2;border-radius:10px 0px 0px 10px;"></div>'
                    pokeToPokeHTML = pokeToPokeHTML +           '<div class= "hpBar minDamage" style="background-color: '+ minDamageColor +';height:6px;width:'+ (100 - parseInt(pokeToPoke[i].minDamagePercent)) +'%;position:absolute;top:0px;left:0px;z-index:1;border-radius:10px 0px 0px 10px;"></div>'
                    pokeToPokeHTML = pokeToPokeHTML +       '</div>'
                    pokeToPokeHTML = pokeToPokeHTML +       '<div class="modal-container">'
                    pokeToPokeHTML = pokeToPokeHTML +           '<div class="modal-body">'
                    pokeToPokeHTML = pokeToPokeHTML +               '<div class="copyHtml">HTMLコピー</div>'
                    pokeToPokeHTML = pokeToPokeHTML +               '<div class="copyImage">画像コピー</div>'
                    pokeToPokeHTML = pokeToPokeHTML +               '<!-- 閉じるボタン -->'
                    pokeToPokeHTML = pokeToPokeHTML +               '<div class="modal-close">×</div>'
                    pokeToPokeHTML = pokeToPokeHTML +               '<!-- モーダル内のコンテンツ -->'
                    pokeToPokeHTML = pokeToPokeHTML +               '<div class="modal-content">'
                    pokeToPokeHTML = pokeToPokeHTML +               '<div class="copy-content" style = "width:90%;font-size:0.8rem;border:outset 3px;border-radius: 10px;background-color:#fff;padding:10px;">'
                    pokeToPokeHTML = pokeToPokeHTML +                   '<div class = "modal-title" style="border-bottom:dashed 2px #cccccc;padding:2px 0;">' + pokeToPoke[i].attacker.pokeName + '→' + pokeToPoke[i].defender.pokeName + '</div>'
                    pokeToPokeHTML = pokeToPokeHTML +                   '<div class="moveName" style = "padding:5px 0;">';
                    pokeToPokeHTML = pokeToPokeHTML +                       pokeToPoke[i].move+'(威力:' + pokeToPoke[i].movePower + ')';
                    //二回攻撃
                    if(pokeToPoke[i].move == 'ドラゴンアロー' && pokeToPoke[i].environment.battleRule == 'double'){
                        pokeToPokeHTML = pokeToPokeHTML + '×1';
                    }else if(pokeToPoke[i].attacker.moves[pokeToPoke[i].move][8] == 34){
                        pokeToPokeHTML = pokeToPokeHTML + '×2';
                    //三回攻撃
                    }else if(pokeToPoke[i].attacker.moves[pokeToPoke[i].move][8] == 51){
                        pokeToPokeHTML = pokeToPokeHTML + '×3';
                    }else if(pokeToPoke[i].attacker.moves[pokeToPoke[i].move][8] == 82){
                        pokeToPokeHTML = pokeToPokeHTML + '×' + String(pokeToPoke[i].attacker.twoToFiveHits);
                    }else if(pokeToPoke[i].attacker.moves[pokeToPoke[i].move][8] == 103){
                        pokeToPokeHTML = pokeToPokeHTML + '×' + String(pokeToPoke[i].attacker.nezumiHits);
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                   '</div>' 
                    pokeToPokeHTML = pokeToPokeHTML +                   '<div class="damagePercent">';
                    pokeToPokeHTML = pokeToPokeHTML +                       pokeToPoke[i].minDamage + '～' + pokeToPoke[i].maxDamage +'('+ pokeToPoke[i].minDamagePercent + '%～' + pokeToPoke[i].maxDamagePercent+'%' + ')';
                    pokeToPokeHTML = pokeToPokeHTML +                   '</div>' 
                    pokeToPokeHTML = pokeToPokeHTML +                   '<div class= "hpBar maxHp" style="background-color: #e0e0e0;height:6px;width:100%;position:relative;border-radius: 10px;margin-bottom:15px;">'
                    pokeToPokeHTML = pokeToPokeHTML +                       '<div class= "hpBar maxDamage" style="background-color: '+ maxDamageColor+';height:6px;width:'+ (100 - parseInt(pokeToPoke[i].maxDamagePercent)) +'%;position:absolute;top:0px;left:0px;z-index:2;border-radius:10px 0px 0px 10px;"></div>'
                    pokeToPokeHTML = pokeToPokeHTML +                       '<div class= "hpBar minDamage" style="background-color: '+ minDamageColor +';height:6px;width:'+ (100 - parseInt(pokeToPoke[i].minDamagePercent)) +'%;position:absolute;top:0px;left:0px;z-index:1;border-radius:10px 0px 0px 10px;"></div>'
                    pokeToPokeHTML = pokeToPokeHTML +                   '</div>'
                    //乱数幅
                    pokeToPokeHTML = pokeToPokeHTML +                   '<details open style="border:outset 2px;border-radius: 10px;padding:5px;margin-bottom:5px;">'
                    pokeToPokeHTML = pokeToPokeHTML +                   '<summary style="display:list-item;cursor:pointer;border-bottom:solid 1px #cccccc;padding-bottom:1px;">乱数幅</summary>'
                    pokeToPokeHTML = pokeToPokeHTML +                   '<div class= "randomDamageRange" style="margin-bottom:15px;">';
                    pokeToPokeHTML = pokeToPokeHTML +                   '[';
                    for(var j = 0;j < pokeToPoke[i].damages.length;j++){
                        if(pokeToPoke[i].damages[j] >= pokeToPoke[i].defender.hpActual){
                            pokeToPokeHTML = pokeToPokeHTML +           '<font color="red">'+pokeToPoke[i].damages[j]+'</font>,';
                        }else{
                            pokeToPokeHTML = pokeToPokeHTML +           pokeToPoke[i].damages[j] +',';
                        }
                        if(j==7){
                            pokeToPokeHTML = pokeToPokeHTML +           '<br>  ';
                        }
                    }
                    pokeToPokeHTML = pokeToPokeHTML.slice(0,-1);
                    pokeToPokeHTML = pokeToPokeHTML +                   ']</div>'
                    pokeToPokeHTML = pokeToPokeHTML +                   '</details>'                    
                    pokeToPokeHTML = pokeToPokeHTML +                   '<details open style="border:outset 2px;border-radius: 10px;padding:5px;margin-bottom:5px;">'
                    pokeToPokeHTML = pokeToPokeHTML +                   '<summary style="display:list-item;cursor:pointer;border-bottom:solid 1px #cccccc;padding-bottom:1px;">ステータス・ランク・テラスタル </summary>'
                    //アタッカー情報
                    pokeToPokeHTML = pokeToPokeHTML +                   '<div class="attackerInfo" style="margin-top:2px;">'
                    pokeToPokeHTML = pokeToPokeHTML +                       '<p style="margin:0;padding:2px;border-bottom:dashed 1px #7fffbf;">■攻撃側情報</p>'
                    pokeToPokeHTML = pokeToPokeHTML +                       '<p style="margin:1px 0 1px 20px;">ステータス：' + pokeToPoke[i].attacker.hpActual + '('+ pokeToPoke[i].attacker.hpEffort +')-';
                    //アタッカー攻撃・努力値
                    if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].attacker.natureId)][0] == 1.1){
                        pokeToPokeHTML = pokeToPokeHTML +                        '<font color = "red">';
                    }else if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].attacker.natureId)][0] == 0.9){
                        pokeToPokeHTML = pokeToPokeHTML +                        '<font color = "blue">';
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                        pokeToPoke[i].attacker.attackActual ;
                    if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].attacker.natureId)][0] != 1){
                        pokeToPokeHTML = pokeToPokeHTML +                        '</font>';
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                       '('+ pokeToPoke[i].attacker.attackEffort +')-'
                    //アタッカー防御・努力値
                    if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].attacker.natureId)][1] == 1.1){
                        pokeToPokeHTML = pokeToPokeHTML +                        '<font color = "red">';
                    }else if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].attacker.natureId)][1] == 0.9){
                        pokeToPokeHTML = pokeToPokeHTML +                        '<font color = "blue">';
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                        pokeToPoke[i].attacker.defenceActual;
                    if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].attacker.natureId)][1] != 1){
                        pokeToPokeHTML = pokeToPokeHTML +                        '</font>';
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                        '('+ pokeToPoke[i].attacker.defenceEffort +')-';
                    //アタッカー特功
                    if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].attacker.natureId)][2] == 1.1){
                        pokeToPokeHTML = pokeToPokeHTML +                        '<font color = "red">';
                    }else if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].attacker.natureId)][2] == 0.9){
                        pokeToPokeHTML = pokeToPokeHTML +                        '<font color = "blue">';
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                        pokeToPoke[i].attacker.spAttackActual;
                    if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].attacker.natureId)][2] != 1){
                        pokeToPokeHTML = pokeToPokeHTML +                        '</font>';
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                        '('+ pokeToPoke[i].attacker.spAttackEffort +')-';
                    //アタッカー特防
                    if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].attacker.natureId)][3] == 1.1){
                        pokeToPokeHTML = pokeToPokeHTML +                        '<font color = "red">';
                    }else if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].attacker.natureId)][3] == 0.9){
                        pokeToPokeHTML = pokeToPokeHTML +                        '<font color = "blue">';
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                        pokeToPoke[i].attacker.spDefenceActual;
                    if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].attacker.natureId)][3] != 1){
                        pokeToPokeHTML = pokeToPokeHTML +                        '</font>';
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                        '('+ pokeToPoke[i].attacker.spDefenceEffort +')-';
                    //アタッカー素早さ
                    if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].attacker.natureId)][4] == 1.1){
                        pokeToPokeHTML = pokeToPokeHTML +                        '<font color = "red">';
                    }else if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].attacker.natureId)][4] == 0.9){
                        pokeToPokeHTML = pokeToPokeHTML +                        '<font color = "blue">';
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                        pokeToPoke[i].attacker.speedActual;
                    if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].attacker.natureId)][4] != 1){
                        pokeToPokeHTML = pokeToPokeHTML +                        '</font>';
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                        '('+ pokeToPoke[i].attacker.speedEffort +')';
                    pokeToPokeHTML = pokeToPokeHTML +                       '</p>'
                    pokeToPokeHTML = pokeToPokeHTML +                       '<p style="margin:1px 0 1px 20px;">テラスタイプ：'
                    if(pokeToPoke[i].attacker.teraTypeId == null){
                        pokeToPokeHTML = pokeToPokeHTML +                   'なし'
                    }else{
                        pokeToPokeHTML = pokeToPokeHTML +                   typeList[pokeToPoke[i].attacker.teraTypeId]
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                       '</p>'
                    pokeToPokeHTML = pokeToPokeHTML +                       '<p style="margin:1px 0 1px 20px;">ランク:'
                    if(pokeToPoke[i].attacker.moves[pokeToPoke[i].move][1] == 1 && pokeToPoke[i].move != 'ボディプレス'){
                        if(pokeToPoke[i].attacker.attackRank > 0){
                            pokeToPokeHTML = pokeToPokeHTML +                       '攻撃 +' + pokeToPoke[i].attacker.attackRank ;
                        }else if(pokeToPoke[i].attacker.attackRank == 0){
                            pokeToPokeHTML = pokeToPokeHTML +                       '攻撃 ±' + pokeToPoke[i].attacker.attackRank ;
                        }else{
                            pokeToPokeHTML = pokeToPokeHTML +                       '攻撃 ' + pokeToPoke[i].attacker.attackRank ;
                        }
                    }else if(pokeToPoke[i].move == 'ボディプレス'){
                        if(pokeToPoke[i].attacker.defenceRank > 0){
                            pokeToPokeHTML = pokeToPokeHTML +                       '防御 +' + pokeToPoke[i].attacker.defenceRank ;
                        }else if(pokeToPoke[i].attacker.defenceRank == 0){
                            pokeToPokeHTML = pokeToPokeHTML +                       '防御 ±' + pokeToPoke[i].attacker.defenceRank ;
                        }else{
                            pokeToPokeHTML = pokeToPokeHTML +                       '防御 ' + pokeToPoke[i].attacker.defenceRank ;
                        }
                    }else{
                        if(pokeToPoke[i].attacker.spAttackRank > 0){
                            pokeToPokeHTML = pokeToPokeHTML +                       '特攻 +' + pokeToPoke[i].attacker.spAttackRank ;
                        }else if(pokeToPoke[i].attacker.spAttackRank == 0){
                            pokeToPokeHTML = pokeToPokeHTML +                       '特攻 ±' + pokeToPoke[i].attacker.spAttackRank ;
                        }else{
                            pokeToPokeHTML = pokeToPokeHTML +                       '特攻 ' + pokeToPoke[i].attacker.spAttackRank ;
                        }
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                       '</p>'
                    pokeToPokeHTML = pokeToPokeHTML +                   '</div>'
                    //ディフェンダー情報
                    pokeToPokeHTML = pokeToPokeHTML +                   '<div class="defenderInfo" style="margin-top:2px;">'
                    pokeToPokeHTML = pokeToPokeHTML +                       '<p style="margin:0;padding:2px;border-bottom:dashed 1px #ffc1c1;">■防御側情報</p>'
                    pokeToPokeHTML = pokeToPokeHTML +                       '<p style="margin:1px 0 1px 20px;">ステータス：' + pokeToPoke[i].defender.hpActual + '('+ pokeToPoke[i].defender.hpEffort +')-';
                    //ディフェンダー攻撃・努力値
                    if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].defender.natureId)][0] == 1.1){
                        pokeToPokeHTML = pokeToPokeHTML +                        '<font color = "red">';
                    }else if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].defender.natureId)][0] == 0.9){
                        pokeToPokeHTML = pokeToPokeHTML +                        '<font color = "blue">';
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                        pokeToPoke[i].defender.attackActual ;
                    if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].defender.natureId)][0] != 1){
                        pokeToPokeHTML = pokeToPokeHTML +                        '</font>';
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                       '('+ pokeToPoke[i].defender.attackEffort +')-'
                    //ディフェンダー防御・努力値
                    if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].defender.natureId)][1] == 1.1){
                        pokeToPokeHTML = pokeToPokeHTML +                        '<font color = "red">';
                    }else if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].defender.natureId)][1] == 0.9){
                        pokeToPokeHTML = pokeToPokeHTML +                        '<font color = "blue">';
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                        pokeToPoke[i].defender.defenceActual;
                    if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].defender.natureId)][1] != 1){
                        pokeToPokeHTML = pokeToPokeHTML +                        '</font>';
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                        '('+ pokeToPoke[i].defender.defenceEffort +')-';
                    //ディフェンダー特功
                    if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].defender.natureId)][2] == 1.1){
                        pokeToPokeHTML = pokeToPokeHTML +                        '<font color = "red">';
                    }else if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].defender.natureId)][2] == 0.9){
                        pokeToPokeHTML = pokeToPokeHTML +                        '<font color = "blue">';
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                        pokeToPoke[i].defender.spAttackActual;
                    if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].defender.natureId)][2] != 1){
                        pokeToPokeHTML = pokeToPokeHTML +                        '</font>';
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                        '('+ pokeToPoke[i].defender.spAttackEffort +')-';
                    //ディフェンダー特防
                    if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].defender.natureId)][3] == 1.1){
                        pokeToPokeHTML = pokeToPokeHTML +                        '<font color = "red">';
                    }else if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].defender.natureId)][3] == 0.9){
                        pokeToPokeHTML = pokeToPokeHTML +                        '<font color = "blue">';
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                        pokeToPoke[i].defender.spDefenceActual;
                    if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].defender.natureId)][3] != 1){
                        pokeToPokeHTML = pokeToPokeHTML +                        '</font>';
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                        '('+ pokeToPoke[i].defender.spDefenceEffort +')-';
                    //ディフェンダー素早さ
                    if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].defender.natureId)][4] == 1.1){
                        pokeToPokeHTML = pokeToPokeHTML +                        '<font color = "red">';
                    }else if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].defender.natureId)][4] == 0.9){
                        pokeToPokeHTML = pokeToPokeHTML +                        '<font color = "blue">';
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                        pokeToPoke[i].defender.speedActual;
                    if(natureCompensationList[natureValueList.indexOf(pokeToPoke[i].defender.natureId)][4] != 1){
                        pokeToPokeHTML = pokeToPokeHTML +                        '</font>';
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                        '('+ pokeToPoke[i].defender.speedEffort +')';
                    pokeToPokeHTML = pokeToPokeHTML +                       '<p style="margin:1px 0 1px 20px;">テラスタイプ：'
                    if(pokeToPoke[i].defender.teraTypeId == null){
                        pokeToPokeHTML = pokeToPokeHTML +                   'なし'
                    }else{
                        pokeToPokeHTML = pokeToPokeHTML +                   typeList[pokeToPoke[i].defender.teraTypeId]
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                       '</p>'
                    pokeToPokeHTML = pokeToPokeHTML +                       '<p style="margin:1px 0 1px 20px;">ランク:'
                    if(pokeToPoke[i].attacker.moves[pokeToPoke[i].move][1] == 1){
                        if(pokeToPoke[i].defender.defenceRank > 0){
                            pokeToPokeHTML = pokeToPokeHTML +                       '防御 +' + pokeToPoke[i].defender.defenceRank ;
                        }else if(pokeToPoke[i].defender.defenceRank == 0){
                            pokeToPokeHTML = pokeToPokeHTML +                       '防御 ±' + pokeToPoke[i].defender.defenceRank ;
                        }else{
                            pokeToPokeHTML = pokeToPokeHTML +                       '防御 ' + pokeToPoke[i].defender.defenceRank ;
                        }
                    }else{
                        if(pokeToPoke[i].defender.spDefenceRank > 0){
                            pokeToPokeHTML = pokeToPokeHTML +                       '特防 +' + pokeToPoke[i].defender.spDefenceRank ;
                        }else if(pokeToPoke[i].defender.spDefenceRank == 0){
                            pokeToPokeHTML = pokeToPokeHTML +                       '特防 ±' + pokeToPoke[i].defender.spDefenceRank ;
                        }else{
                            pokeToPokeHTML = pokeToPokeHTML +                       '特防 ' + pokeToPoke[i].defender.spDefenceRank ;
                        }
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                       '</p>'
                    pokeToPokeHTML = pokeToPokeHTML +                   '</div>'
                    pokeToPokeHTML = pokeToPokeHTML +                   '</details>'
                    pokeToPokeHTML = pokeToPokeHTML +                   '<details open style="border:outset 2px;border-radius:10px;padding:5px;">'
                    pokeToPokeHTML = pokeToPokeHTML +                   '<summary style="display:list-item;cursor:pointer;border-bottom:solid 1px #cccccc;padding-bottom:1px;">補正詳細</summary>'
                    //タイプ相性
                    pokeToPokeHTML = pokeToPokeHTML +                   '<div class="typeCompatibilityDescription"><p style="margin:4px 0 2px 2px;">タイプ相性：' + pokeToPoke[i].typeCompatibilityDescription + '</p>'
                    pokeToPokeHTML = pokeToPokeHTML +                   '</div>'
                    //威力補正
                    pokeToPokeHTML = pokeToPokeHTML +                   '<div class="powerCorrectionDescription"><p style="margin:2px 0 2px 2px;">威力補正</p>'
                    pokeToPokeHTML = pokeToPokeHTML +                       '<ul style="margin:0;">'
                    if(pokeToPoke[i].powerCorrectionDescription.length == 0){
                        pokeToPokeHTML = pokeToPokeHTML +                       '<li style="margin:0;">なし</li>'
                    }else{
                        for(var j =0;j < pokeToPoke[i].powerCorrectionDescription.length;j++){
                            pokeToPokeHTML = pokeToPokeHTML +                       '<li style="margin:0;">'+pokeToPoke[i].powerCorrectionDescription[j]+'</li>'
                        }
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                       '</ul>'
                    pokeToPokeHTML = pokeToPokeHTML +                   '</div>'
                    //攻撃補正
                    pokeToPokeHTML = pokeToPokeHTML +                   '<div class="attackCorrectionDescription"><p style="margin:2px 0 2px 2px;">攻撃補正</p>'
                    pokeToPokeHTML = pokeToPokeHTML +                       '<ul style="margin:0;">'
                    if(pokeToPoke[i].attackCorrectionDescription.length == 0){
                        pokeToPokeHTML = pokeToPokeHTML +                       '<li style="margin:0;">なし</li>'
                    }else{
                        for(var j =0;j < pokeToPoke[i].attackCorrectionDescription.length;j++){
                            pokeToPokeHTML = pokeToPokeHTML +                       '<li style="margin:0;">'+pokeToPoke[i].attackCorrectionDescription[j]+'</li>'
                        }
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                       '</ul>'
                    pokeToPokeHTML = pokeToPokeHTML +                   '</div>'
                    //防御補正
                    pokeToPokeHTML = pokeToPokeHTML +                   '<div class="defenceCorrectionDescription"><p style="margin:2px 0 2px 2px;">防御補正</p>'
                    pokeToPokeHTML = pokeToPokeHTML +                       '<ul style="margin:0;">'
                    if(pokeToPoke[i].defenceCorrectionDescription.length == 0){
                        pokeToPokeHTML = pokeToPokeHTML +                       '<li style="margin:0;">なし</li>'
                    }else{
                        for(var j =0;j < pokeToPoke[i].defenceCorrectionDescription.length;j++){
                            pokeToPokeHTML = pokeToPokeHTML +                       '<li style="margin:0;">'+pokeToPoke[i].defenceCorrectionDescription[j]+'</li>'
                        }
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                       '</ul>'
                    pokeToPokeHTML = pokeToPokeHTML +                   '</div>'
                    //ダメージ補正
                    pokeToPokeHTML = pokeToPokeHTML +                   '<div class="damageCorrectionDescription"><p style="margin:2px 0 2px 2px;">ダメージ補正</p>'
                    pokeToPokeHTML = pokeToPokeHTML +                       '<ul style="margin:0;">'
                    if(pokeToPoke[i].damageCorrectionDescription.length == 0){
                        pokeToPokeHTML = pokeToPokeHTML +                       '<li style="margin:0;">なし</li>'
                    }else{
                        for(var j =0;j < pokeToPoke[i].damageCorrectionDescription.length;j++){
                            pokeToPokeHTML = pokeToPokeHTML +                       '<li style="margin:0;">'+pokeToPoke[i].damageCorrectionDescription[j]+'</li>'
                        }
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                       '</ul>'
                    pokeToPokeHTML = pokeToPokeHTML +                   '</div>'
                    //ダメージ補正
                    pokeToPokeHTML = pokeToPokeHTML +                   '<div class="otherCorrectionDescription"><p style="margin:2px 0 2px 2px;">その他補正</p>'
                    pokeToPokeHTML = pokeToPokeHTML +                       '<ul style="margin:0;">'
                    if(pokeToPoke[i].otherCorrectionDescription.length == 0){
                        pokeToPokeHTML = pokeToPokeHTML +                       '<li style="margin:0;">なし</li>'
                    }else{
                        for(var j =0;j < pokeToPoke[i].otherCorrectionDescription.length;j++){
                            pokeToPokeHTML = pokeToPokeHTML +                       '<li style="margin:0;">'+pokeToPoke[i].otherCorrectionDescription[j]+'</li>'
                        }
                    }
                    pokeToPokeHTML = pokeToPokeHTML +                       '</ul>'
                    pokeToPokeHTML = pokeToPokeHTML +                   '</div>'
                    pokeToPokeHTML = pokeToPokeHTML +                   '</details>'
                    pokeToPokeHTML = pokeToPokeHTML +                   '</div>'
                    pokeToPokeHTML = pokeToPokeHTML +               '</div>'
                    pokeToPokeHTML = pokeToPokeHTML +           '</div>'
                    pokeToPokeHTML = pokeToPokeHTML +       '</div>'
                    pokeToPokeHTML = pokeToPokeHTML + '</div>'
            }
            pokeToPokeHTML = pokeToPokeHTML + '</div>';
            pokeToPokeHTML = pokeToPokeHTML + '<button class="allMoveDisplay" type="button">全ての技を表示</button>';
            pokeToPokeHTML = pokeToPokeHTML + '</div>';
            

            return pokeToPokeHTML;
        }
    });

    /**※参考（https://qiita.com/ymgd-a/items/5a6bb79e90aa5633d026）
    * 値の変更を監視します
    * @param {Object} obj 監視対象のオブジェクト
    * @param {String} propName 監視対象のプロパティ名
    * @param {function(Object, Object)} func 値が変更された際に実行する関数
    */
    function watchValue(obj, propName, func, index) {
        let value = obj[propName];
        Object.defineProperty(obj, propName, {
            get: () => value,
            set: newValue => {
                //const oldValue = value;
                value = newValue;
                func(propName,index);
                //console.log(oldValue + '=>' +newValue + ':index='+ String(index)+ '  '+propName);
            },
            configurable: true
        });
    }

    /**
     * 与えられたオブジェクトのプロパティを監視します
     * @param {Object} obj 監視対象のオブジェクト
     * @param {function(Object, Object)} func 値が変更された際に実行する関数
     */
    function watchAll(obj, func) {
        Object.getOwnPropertyNames(obj).forEach((propName,index) => {
            const val = obj[propName];
            if ((val instanceof Object) && !Array.isArray(val)) {
                // オブジェクトの場合
                watchAll(val, func);
            } else {
                // その他の場合
                watchValue(obj, propName, func, index);
            }
        });
    }

    //ポケモン名入力時　オートコンプリート使用　TODO：今のままでは不便なので改良必要
    // $( ".pokeName" ).autocomplete({
    //     source: function(request, response) {
    //                 var searchStr = request.term; /* 入力文字列取得 */
    //                 var suggest = new Array();
    //                 $.each(pokeNameAutoComplete, function(index, value){
    //                     if ( value[0].match(searchStr)        /* カタカナで検索 */
    //                         || value[1].match(searchStr)      /* ひらがなで検索 */
    //                         || value[2].toUpperCase().match(searchStr.toUpperCase()) /* ローマ字で検索 */
    //                     ) {
    //                         /* カタカナを入力候補として表示させるために配列に設定 */
    //                         suggest.push(value[0]);
    //                     }
    //             });
    //                response(suggest);  /* 結果を設定 */
    //     },
    //     //オートコンプリートのオプション
    //     messages: {
    //         noResults: '',
    //         results: function() {}
    //     },
    //     focus: function (event, ui) {
    //         $(".ui-helper-hidden-accessible").hide();
    //         event.preventDefault();
    //     },
    //     select: function( event, ui ) {
    //         $(this).val(ui.item.name);
    //         // フォーカスを外す
    //         //$(this).blur();
    //     }        
    // });
});