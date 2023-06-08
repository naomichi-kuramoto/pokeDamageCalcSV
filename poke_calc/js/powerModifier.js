var powerModifier = [
    {
      trigger: "テクニシャン",
      category: "ability",
      holder: "attacker",
      modifier: 6144,
      condition: function (n) {
        return n.attacker.abilityActivated && n.attacker.moves[n.move][2] <= 60;
      },
      description: "技の威力が60以下のとき、威力1.5倍",
    },
    {
      trigger: "ねつぼうそう",
      category: "ability",
      holder: "attacker",
      modifier: 6144,
      condition: function (n) {
        return (
          2 === n.attacker.moves[n.move][1] &&
          (n.attacker.abilityActivated &&
            "やけど" === n.attacker.aliment)
        );
      },
      description: "やけど状態のとき、特殊技の威力1.5倍",
    },
    {
      trigger: "アナライズ",
      category: "ability",
      holder: "attacker",
      modifier: 5325,
      condition: function (n) {
        return (
          n.attacker.abilityActivated &&  
          n.move !="みらいよち" &&
          n.move !="はめつのねがい"
        );
      },
      description: "後攻のとき、威力1.3倍",
    },
    {
      trigger: "すてみ",
      category: "ability",
      holder: "attacker",
      modifier: 4915,
      condition: function (n) {
        return (
          n.attacker.abilityActivated &&
          ((n.attacker.moves[n.move][15] < 0) ||
          n.move =="とびげり" ||
          n.move == "とびひざげり"
        ));
      },
      description: "反動のある技の威力1.2倍",
    },
    {
      trigger: "てつのこぶし",
      category: "ability",
      holder: "attacker",
      modifier: 4915,
      condition: function (n) {
        return (
          n.attacker.abilityActivated &&
          n.attacker.moves[n.move][28] == 1
        );
      },
      description: "拳技の威力1.2倍",
    },
    {
      trigger: "がんじょうあご",
      category: "ability",
      holder: "attacker",
      modifier: 6144,
      condition: function (n) {
        return (
          n.attacker.abilityActivated &&
          n.attacker.moves[n.move][29] == 1
        );
      },
      description: "牙技の威力1.5倍",
    },
    {
      trigger: "メガランチャー",
      category: "ability",
      holder: "attacker",
      modifier: 6144,
      condition: function (n) {
        return (
          n.attacker.abilityActivated &&
          n.attacker.moves[n.move][30] == 1
        );
      },
      description: "波動技の威力1.5倍",
    },
    {
      trigger: "かたいツメ",
      category: "ability",
      holder: "attacker",
      modifier: 5325,
      condition: function (n) {
        return n.attacker.abilityActivated && n.moveWithContact;
      },
      description: "接触技の威力1.3倍",
    },
    {
      trigger: "フェアリーオーラ",
      category: "conditions",
      holder: "environment",
      modifier: 5448,
      condition: function (n) {
        return (
          !n.environment.condition["オーラブレイク"] &&
          17 === n.metaMoveTypeId
        );
      },
      description: "フェアリータイプの技の威力1.33倍",
    },
    {
      trigger: "フェアリーオーラ",
      category: "conditions",
      holder: "environment",
      modifier: 3072,
      condition: function (n) {
        return (
          n.environment.condition["オーラブレイク"] &&
          17 === n.metaMoveTypeId
        );
      },
      description: "フェアリータイプの技の威力0.75倍(オーラブレイク)",
    },
    {
      trigger: "ダークオーラ",
      category: "conditions",
      holder: "environment",
      modifier: 5448,
      condition: function (n) {
        return (
          !n.environment.condition["オーラブレイク"] &&
          16 === n.metaMoveTypeId
        );
      },
      description: "あくタイプの技の威力1.33倍",
    },
    {
      trigger: "ダークオーラ",
      category: "conditions",
      holder: "environment",
      modifier: 3072,
      condition: function (n) {
        return (
          n.environment.condition["オーラブレイク"] &&
          16 === n.metaMoveTypeId
        );
      },
      description: "あくタイプの技の威力0.75倍(オーラブレイク)",
    },
    {
      trigger: "grass",
      category: "terrain",
      holder: "environment",
      modifier: 5325,
      condition: function (n) {
        return (
          11 === n.metaMoveTypeId && n.attackerIsGrounded
        );
      },
      description: "地面にいるポケモンのくさタイプの技の威力1.3倍",
    },
    {
      trigger: "grass",
      category: "terrain",
      holder: "environment",
      modifier: 2048,
      condition: function (n) {
        var t = n.move;
        return (
          (t == "じしん" ||
            t == "じならし" ||
            t == "マグニチュード") &&
          n.defenderIsGrounded
        );
      },
      description:
        "地面にいるとき、じしん、じならし、マグニチュードの威力0.5倍",
    },
    {
      trigger: "electric",
      category: "terrain",
      holder: "environment",
      modifier: 5325,
      condition: function (n) {
        return (
          12 === n.metaMoveTypeId &&
          n.attackerIsGrounded
        );
      },
      description: "地面にいるポケモンのでんきタイプの技の威力1.3倍",
    },
    {
      trigger: "mist",
      category: "terrain",
      holder: "environment",
      modifier: 2048,
      condition: function (n) {
        return (
          15 === n.metaMoveTypeId &&
          (n.defenderIsGrounded ||
            n.move == "サウザンアロー")
        );
      },
      description: "地面にいるとき、ドラゴンタイプの技の威力0.5倍",
    },
    {
      trigger: "psycho",
      category: "terrain",
      holder: "environment",
      modifier: 5325,
      condition: function (n) {
        return (
          13 === n.metaMoveTypeId &&
          n.attackerIsGrounded
        );
      },
      description: "地面にいるポケモンのエスパータイプの技の威力1.3倍",
    },
    {
      trigger: "どくぼうそう",
      category: "ability",
      holder: "attacker",
      modifier: 6144,
      condition: function (n) {
        return (
          1 === n.attacker.moves[n.move][1] &&
          (n.attacker.abilityActivated ||
            "どく" === n.attacker.aliment
          )
        );
      },
      description: "どく状態のとき、物理技の威力1.5倍",
    },
    {
      trigger: "そうだいしょう(1体)",
      category: "ability",
      holder: "attacker",
      modifier: 4506,
      condition: function (n) {
        return n.attacker.abilityActivated;
      },
      description: "『ひんし』状態になった味方のポケモン数×10%だけ技の威力が上がる。(1.1倍)",
    },
    {
      trigger: "そうだいしょう(2体)",
      category: "ability",
      holder: "attacker",
      modifier: 4915,
      condition: function (n) {
        return n.attacker.abilityActivated;
      },
      description: "『ひんし』状態になった味方のポケモン数×10%だけ技の威力が上がる。(1.2倍)",
    },
    {
      trigger: "そうだいしょう(3体)",
      category: "ability",
      holder: "attacker",
      modifier: 5325,
      condition: function (n) {
        return n.attacker.abilityActivated;
      },
      description: "『ひんし』状態になった味方のポケモン数×10%だけ技の威力が上がる。(1.3倍)",
    },
    {
      trigger: "きれあじ",
      category: "ability",
      holder: "attacker",
      modifier: 6144,
      condition: function (n) {
        return n.attacker.abilityActivated && n.attacker.moves[n.move][11] == 1;
      },
      description: "切る技の威力が1.5倍",
    },
    {
      trigger: "とうそうしん(同性)",
      category: "ability",
      holder: "attacker",
      modifier: 5120,
      condition: function (n) {
        return n.attacker.abilityActivated;
      },
      description: "同性に対する技の威力1.25倍",
    },
    {
      trigger: "とうそうしん(異性)",
      category: "ability",
      holder: "attacker",
      modifier: 3072,
      condition: function (n) {
        return n.attacker.abilityActivated;
      },
      description: "異性に対する技の威力0.75倍",
    },
    {
      trigger: "すなのちから",
      category: "ability",
      holder: "attacker",
      modifier: 6144,
      condition: function (n) {
        var t = n.metaMoveTypeId;
        return (
          "sandstorm" === n.environment.weather &&
          (4 === t || 5 === t || 8 === t) &&
          n.attacker.abilityActivated
        );
      },
      description:
        "天候がすなあらしのとき、いわ、じめん、はがねタイプの技の威力1.5倍",
    },
    {
      trigger: "たいねつ",
      category: "ability",
      holder: "defender",
      modifier: 2048,
      condition: function (n) {
        return 9 === n.metaMoveTypeId && n.defender.abilityActivated;
      },
      description: "ほのおタイプの技の威力0.5倍",
    },
    {
      trigger: "かんそうはだ",
      category: "ability",
      holder: "defender",
      modifier: 5120,
      condition: function (n) {
        return  9 === n.metaMoveTypeId && n.defender.abilityActivated;
      },
      description: "ほのおタイプの技の威力1.25倍",
    },
    {
      trigger: "かんそうはだ",
      category: "ability",
      holder: "defender",
      modifier: -10000,
      condition: function (n) {
        return  10 === n.metaMoveTypeId && n.defender.abilityActivated;
      },
      description: "みずタイプの技無効",
    },
    {
      trigger: "もらいび",
      category: "ability",
      holder: "defender",
      modifier: -10000,
      condition: function (n) {
        return  9 === n.metaMoveTypeId && n.defender.abilityActivated;
      },
      description: "ほのおタイプの技無効",
    },
    {
      trigger: "よびみず",
      category: "ability",
      holder: "defender",
      modifier: -10000,
      condition: function (n) {
        return  10 === n.metaMoveTypeId && n.defender.abilityActivated;
      },
      description: "みずタイプの技無効",
    },
    {
      trigger: "ちょすい",
      category: "ability",
      holder: "defender",
      modifier: -10000,
      condition: function (n) {
        return  10 === n.metaMoveTypeId && n.defender.abilityActivated;
      },
      description: "みずタイプの技無効",
    },
    {
      trigger: "どしょく",
      category: "ability",
      holder: "defender",
      modifier: -10000,
      condition: function (n) {
        return  4 === n.metaMoveTypeId && n.defender.abilityActivated;
      },
      description: "じめんタイプの技無効",
    },
    {
      trigger: "パンクロック",
      category: "ability",
      holder: "attacker",
      modifier: 5325,
      condition: function (n) {
        return(n.attacker.abilityActivated && n.attacker.moves[n.move][31] == 1);
      },
      description: "音技のとき、威力1.3倍",
    },
    {
      trigger: "ちからずく",
      category: "ability",
      holder: "attacker",
      modifier: 5325,
      condition: function (n) {
        var t = n.attacker.moves[n.move];
        return (
          n.attacker.abilityActivated &&
          (Boolean(t) &&
            ((t[12] > 0 && t[12] <= 6) ||
              n.move =="トライアタック" ||
              t[14] > 0 ||
              (6 == t[11] && t[20] < 0) ||
              (7 == t[11] && t[20] > 0)))
        );
      },
      description: "追加効果がある技の効果がなくなり、威力1.3倍",
    },
    {
      trigger: "ノーマルスキン",
      category: "ability",
      holder: "attacker",
      modifier: 4915,
      condition: function (n) {
        return (
          0 !== n.moveTypeId && 0 === n.metaMoveTypeId && n.attacker.abilityActivated
        );
      },
      description: "ノーマルタイプに変化した技の威力1.2倍",
    },
    {
      trigger: "フェアリースキン",
      category: "ability",
      holder: "attacker",
      modifier: 4915,
      condition: function (n) {
        return (
          0 === n.moveTypeId &&
          17 === n.metaMoveTypeId && n.attacker.abilityActivated
        );
      },
      description:
        "ノーマルタイプの技がフェアリータイプになり、威力1.2倍",
    },
    {
      trigger: "スカイスキン",
      category: "ability",
      holder: "attacker",
      modifier: 4915,
      condition: function (n) {
        return (
          0 === n.moveTypeId && 2 === n.metaMoveTypeId && n.attacker.abilityActivated
        );
      },
      description: "ノーマルタイプの技がひこうタイプになり、威力1.2倍",
    },
    {
      trigger: "フリーズスキン",
      category: "ability",
      holder: "attacker",
      modifier: 4915,
      condition: function (n) {
        return (
          0 === n.moveTypeId && 14 === n.metaMoveTypeId && n.attacker.abilityActivated
        );
      },
      description: "ノーマルタイプの技がこおりタイプになり、威力1.2倍",
    },
    {
      trigger: "エレキスキン",
      category: "ability",
      holder: "attacker",
      modifier: 4915,
      condition: function (n) {
        return (
          0 === n.moveTypeId && 12 === n.metaMoveTypeId && n.attacker.abilityActivated
        );
      },
      description: "でんきタイプに変化した技の威力1.2倍",
    },
    {
      trigger: "タイプ強化系アイテム",
      category: "item",
      holder: "attacker",
      modifier: 4915,
      condition: function (n) {
        return n.attacker.itemActivated;
      },
      description: "対応するタイプの技の威力1.2倍",
    },
    {
      trigger: "ちからのハチマキ",
      category: "item",
      holder: "attacker",
      modifier: 4505,
      condition: function (n) {
        return 1 === n.attacker.moves[n.move][1] && n.attacker.itemActivated;
      },
      description: "物理技の威力1.1倍",
    },
    {
      trigger: "パンチグローブ",
      category: "item",
      holder: "attacker",
      modifier: 4506,
      condition: function (n) {
        return n.attacker.moves[n.move][28] == 1 && n.attacker.itemActivated;
      },
      description: "特殊技の威力1.1倍",
    },
    {
      trigger: "しらたま",
      category: "item",
      holder: "attacker",
      modifier: 4915,
      condition: function (n) {
        var t = n.metaMoveTypeId;
        return (
          n.attacker.pokeName =="パルキア") &&
          (10 === t || 15 === t) && n.attacker.itemActivated
        ;
      },
      description:
        "パルキアが持ったとき、ドラゴン及びみずタイプの技の威力1.2倍",
    },
    {
      trigger: "だいしらたま",
      category: "item",
      holder: "attacker",
      modifier: 4915,
      condition: function (n) {
        var t = n.metaMoveTypeId;
        return (
          n.attacker.pokeName =="パルキア(オリジン)") &&
          (10 === t || 15 === t) && n.attacker.itemActivated
        ;
      },
      description:
        "パルキアが持ったとき、ドラゴン及びみずタイプの技の威力1.2倍",
    },
    {
      trigger: "ものしりメガネ",
      category: "item",
      holder: "attacker",
      modifier: 4505,
      condition: function (n) {
        return 2 === n.attacker.moves[n.move][1] && n.attacker.itemActivated;
      },
      description: "特殊技の威力1.1倍",
    },
    {
      trigger: "はっきんだま",
      category: "item",
      holder: "attacker",
      modifier: 4915,
      condition: function (n) {
        var t = n.metaMoveTypeId;
        return (
          n.attacker.pokeName == "ギラティナ(オリジン)" &&
          (15 === t || 7 === t) && n.attacker.itemActivated
        );
      },
      description:
        "ギラティナ(オリジン)が持ったとき、ドラゴン及びゴーストタイプの技の威力1.2倍",
    },
    {
      trigger: "こんごうだま",
      category: "item",
      holder: "attacker",
      modifier: 4915,
      condition: function (n) {
        var t = n.metaMoveTypeId;
        return (
          n.attacker.pokeName == "ディアルガ" &&
          (8 === t || 15 === t) && n.attacker.itemActivated
        );
      },
      description:
        "ディアルガが持ったとき、ドラゴン及びはがねタイプの技の威力1.2倍",
    },
    {
      trigger: "だいこんごうだま",
      category: "item",
      holder: "attacker",
      modifier: 4915,
      condition: function (n) {
        var t = n.metaMoveTypeId;
        return (
          n.attacker.pokeName == "ディアルガ(オリジン)" &&
          (8 === t || 15 === t) && n.attacker.itemActivated
        );
      },
      description:
        "ディアルガが持ったとき、ドラゴン及びはがねタイプの技の威力1.2倍",
    },
    {
      trigger: "こころのしずく",
      category: "item",
      holder: "attacker",
      modifier: 4915,
      condition: function (n) {
        var t = n.metaMoveTypeId;
        return (
          (n.attacker.pokeName == "ラティオス" || n.attacker.pokeName == "ラティアス") &&
          (13 === t || 15 === t) && n.attacker.itemActivated
        );
      },
      description:
        "ラティオス・ラティアスが持ったとき、ドラゴン及びエスパータイプの技の威力1.2倍",
    },
  {
      trigger: "ノーマルジュエル",
      category: "item",
      holder: "attacker",
      modifier: 5325,
      condition: function (n) {
        return n.attacker.itemActivated && n.metaMoveTypeId == 0;
      },
      description: "対応するタイプの技の威力1.3倍",
    },
    {
      trigger: "からげんき",
      category: "name",
      holder: "move",
      modifier: 8192,
      condition: function (n) {
        var t = n.attacker.aliment;
        return (
          "どく" === t ||
          "もうどく" === t ||
          "やけど" === t ||
          "まひ" === t
        );
      },
      description: "どく、やけど、まひ状態のとき、威力2倍",
    },
  //   {
  //     trigger: "しおみず",
  //     category: "name",
  //     holder: "move",
  //     modifier: 8192,
  //     condition: function (n) {
  //       return !!h(n) || 2 * n.defender.currentHP <= n.defender.HP;
  //     },
  //     description: "HPが半分以下になったとき、威力2倍",
  //   },
    {
      trigger: "ベノムショック",
      category: "name",
      holder: "move",
      modifier: 8192,
      condition: function (n) {
        return (
          "どく" === n.defender.aliment ||
          "もうどく" === n.defender.aliment
        );
      },
      description: "相手がどく状態のとき、威力2倍",
    },
  //   {
  //     trigger: "かたきうち",
  //     category: "name",
  //     holder: "move",
  //     modifier: 8192,
  //     condition: function (n) {
  //       return n.move.activated;
  //     },
  //     description:
  //       "前のターンに味方が瀕死状態になっていた場合、威力2倍",
  //   },
  //   {
  //     trigger: "クロスサンダー",
  //     category: "name",
  //     holder: "move",
  //     modifier: 8192,
  //     condition: function (n) {
  //       return n.move.activated;
  //     },
  //     description: "クロスフレイムが使われたターンに使うと、威力2倍",
  //   },
  //   {
  //     trigger: "クロスフレイム",
  //     category: "name",
  //     holder: "move",
  //     modifier: 8192,
  //     condition: function (n) {
  //       return n.move.activated;
  //     },
  //     description: "クロスサンダーが使われたターンに使うと、威力2倍",
  //   },
    {
      trigger: "ソーラービーム",
      category: "name",
      holder: "move",
      modifier: 2048,
      condition: function (n) {
        return (
          "rain" == n.environment.weather || "sandstorm" == n.environment.weather || "snow" == n.environment.weather  
        );
      },
      description: "悪天候のとき、威力0.5倍",
    },
    {
      trigger: "ソーラーブレード",
      category: "name",
      holder: "move",
      modifier: 2048,
      condition: function (n) {
        return (
          "rain" == n.environment.weather || "sandstorm" == n.environment.weather || "snow" == n.environment.weather  
        );
      },
      description: "悪天候のとき、威力0.5倍",
    },
    {
      trigger: "はたきおとす",
      category: "name",
      holder: "move",
      modifier: 6144,
      condition: function(n){
        return(
          n.defender.item != ''
        )
      },
      description: "相手がアイテムを持っているとき、威力1.5倍",
    },
    {
      trigger: "Ｇのちから",
      category: "name",
      holder: "move",
      modifier: 6144,
      condition: function (n) {
        return n.environment.condition["じゅうりょく"];
      },
      description: "「じゅうりょく」状態のとき、威力1.5倍",
    },
    {
      trigger: "サイコブレイド",
      category: "name",
      holder: "move",
      modifier: 6144,
      condition: function (n) {
        return n.environment.terrain == 'electric';
      },
      description: "エレキフィールドの時、威力1.5倍",
    },
    {
      trigger: "ワイドフォース",
      category: "name",
      holder: "move",
      modifier: 6144,
      condition: function (n) {
        return n.environment.terrain =='psycho' && n.attackerIsGrounded;
      },
      description: "サイコフィールドで接地しているとき、威力1.5倍",
  },
  //   {
  //     trigger: "じだんだ",
  //     category: "name",
  //     holder: "move",
  //     modifier: 8192,
  //     condition: function (n) {
  //       return n.move.activated;
  //     },
  //     description: "前のターンに技が失敗していた場合、威力2倍",
  //   },
  //   {
  //     trigger: "ミストバースト",
  //     category: "name",
  //     holder: "move",
  //     modifier: 6144,
  //     condition: function (n) {
  //       return (
  //         "ミストフィールド" === n.environment.terrain &&
  //         u.isOnGround(n, "attacker", !0)
  //       );
  //     },
  //     description: "自分がミストフィールド上いるとき、威力1.5倍",
  //   },
    {
      trigger: "ライジングボルト",
      category: "name",
      holder: "move",
      modifier: 8192,
      condition: function (n) {
        return (
          "electric" === n.environment.terrain &&
          n.defenderIsGrounded
        );
      },
      description: "相手がエレキフィールド上にいるとき、威力2倍",
    },
    {
      trigger: "じゅうでん",
      category: "conditions",
      holder: "attacker",
      modifier: 8192,
      condition: function (n) {
        return 12 === n.metaMoveTypeId;
      },
      description: "電気タイプの技の威力2倍",
    },
    {
      trigger: "てだすけ",
      category: "conditions",
      holder: "attacker",
      modifier: 6144,
      condition: null,
      description: "威力1.5倍",
    },
    {
      trigger: "バッテリー",
      category: "conditions",
      holder: "attacker",
      modifier: 5325,
      condition: function (n) {
              return 2 == n.attacker.moves[n.move][28];
            },
      description: "味方の特殊技の威力が1.3倍",
    },
    {
      trigger: "パワースポット",
      category: "conditions",
      holder: "attacker",
      modifier: 5325,
      condition: null,
      description: "味方の技の威力が1.3倍",
    },
    {
      trigger: "はがねのせいしん",
      category: "ability",
      holder: "attacker",
      modifier: 6144,
      condition: function (n) {
        return 8 === n.metaMoveTypeId && n.attacker.abilityActivated;
      },
      description: "はがねタイプの技のとき、攻撃/特攻1.5倍",
    },
    {
      trigger: "はがねのせいしん",
      category: "conditions",
      holder: "attacker",
      modifier: 6144,
      condition: function (n) {
        return 8 === n.metaMoveTypeId;
      },
      description: "はがねタイプの技のとき、攻撃/特攻1.5倍",
    },
];