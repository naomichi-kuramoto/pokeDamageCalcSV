var pokeStatusJapaneseNameList = ["実数値","個体値","努力値","ランク","252/0","性格"],
    pokeStatusNameList         = ["Actual","Individual","Effort","Rank","Effort252","Effort0","buttonNature"],
    pokeStatusParamMinList     = ["H","A","B","C","D","S"],
    pokeStatusParamList        = ["hp","attack","defence","spAttack","spDefence","speed"],
    pokeStatusRankList         = ["-6","-5","-4","-3","-2","-1","0","+1","+2","+3","+4","+5","+6"];


//ステータステーブルのヘッダの<tr>要素を作成
function makeTableHeader(){
    var tr ='<tr>'
    tr = tr +'<th><br></th>';
    for(i=0;i < pokeStatusJapaneseNameList.length;i++){
        tr = tr + '<th>' + pokeStatusJapaneseNameList[i] +'</th>'
    }
    tr = tr +'</tr>';

    return tr;
}

//ステータステーブルのボディの<tr>要素を作成
function makeTableBody(pokeNo){
    var tr =''
    for(i=0;i < pokeStatusParamMinList.length;i++){
        tr = tr +'<tr>'
        tr = tr +   '<th>' + pokeStatusParamMinList[i] + '</th>'
        tr = tr +   '<td><input type="number" class="'+ pokeStatusParamList[i] + ' ' + pokeStatusNameList[0]+'" min = 1 max = 999>';
        tr = tr +   '<button type="button" class="'+ pokeStatusParamList[i] + ' ' + pokeStatusNameList[0]+'DisplayOnlySmallScreen plus">+</button>';
        tr = tr +   '<button type="button" class="'+ pokeStatusParamList[i] + ' ' + pokeStatusNameList[0]+'DisplayOnlySmallScreen minus">-</button></td>';
        tr = tr +   '<td><input type="number" class="'+ pokeStatusParamList[i] + ' ' + pokeStatusNameList[1]+'" value="31" min = 0 max = 31>';
        tr = tr +   '<button type="button" class="'+ pokeStatusParamList[i] + ' ' + pokeStatusNameList[1]+'DisplayOnlySmallScreen plus">+</button>';
        tr = tr +   '<button type="button" class="'+ pokeStatusParamList[i] + ' ' + pokeStatusNameList[1]+'DisplayOnlySmallScreen minus">-</button></td>';
        tr = tr +   '<td><input type="number" class="'+ pokeStatusParamList[i] + ' ' + pokeStatusNameList[2]+'" value="0" min = 0 max = 252>';
        tr = tr +   '<button type="button" class="'+ pokeStatusParamList[i] + ' ' + pokeStatusNameList[2]+'DisplayOnlySmallScreen plus">+</button>';
        tr = tr +   '<button type="button" class="'+ pokeStatusParamList[i] + ' ' + pokeStatusNameList[2]+'DisplayOnlySmallScreen minus">-</button></td>';
        if(pokeStatusParamList[i] == 'hp'){
            tr = tr + '<td></td>'
        }else{
            tr = tr +   '<td><select class="'+ pokeStatusParamList[i] + ' ' + pokeStatusNameList[3]+'">';
            tr = tr +       '<option value="6">+6</option>';
            tr = tr +       '<option value="5">+5</option>';
            tr = tr +       '<option value="4">+4</option>';
            tr = tr +       '<option value="3">+3</option>';
            tr = tr +       '<option value="2">+2</option>';
            tr = tr +       '<option value="1">+1</option>';
            tr = tr +       '<option value="0" selected>-</option>';
            tr = tr +       '<option value="-1">-1</option>';
            tr = tr +       '<option value="-2">-2</option>';
            tr = tr +       '<option value="-3">-3</option>';
            tr = tr +       '<option value="-4">-4</option>';
            tr = tr +       '<option value="-5">-5</option>';
            tr = tr +       '<option value="-6">-6</option>';
            tr = tr +   '</select></td>';
            
        }
        tr = tr +   '<td><button type="button" class="'+ pokeStatusParamList[i] + ' ' + pokeStatusNameList[4]+'">252</button>';
        tr = tr +   '<button type="button" class="'+ pokeStatusParamList[i] + ' ' + pokeStatusNameList[5]+'">0</button></td>';

        if(pokeStatusParamList[i] == 'hp'){
            tr = tr + '<td></td>'
        }else{
            tr = tr +   '<td><div class="'+ pokeStatusNameList[6] + '"><label><input type="radio" value="plus" name="buttonNature'+ pokeStatusParamList[i] + pokeNo +'" class="'+ pokeStatusNameList[6] + pokeStatusParamList[i]  + pokeNo + '"><span class="button">+</span></label>';
            tr = tr +   '<label><input type="radio" value="minus" name="buttonNature'+ pokeStatusParamList[i] + pokeNo +'" class="'+ pokeStatusNameList[6] + pokeStatusParamList[i] + pokeNo +'"><span class="button">-</span></label></div></td>';
        }
        tr = tr +'</tr>';

    }
    
    return tr;
}