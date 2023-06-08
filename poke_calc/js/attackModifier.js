var attackModifier = [
    {
      trigger: "わざわいのうつわ",
      category: "conditions",
      holder: "environment",
      modifier: 3072,
      condition: function (n) {
        return (
          2 === n.attacker.moves[n.move][1] &&
          'わざわいのうつわ' != n.attacker.ability
        );
      },
      description: "自分以外のポケモンの『とくこう』が3/4倍(0.75倍)になる。",
    },
    {
      trigger: "わざわいのおふだ",
      category: "conditions",
      holder: "environment",
      modifier: 3072,
      condition: function (n) {
        return (
          1 === n.attacker.moves[n.move][1] &&
          'わざわいのおふだ' != n.attacker.ability
        );
      },
      description: "自分以外のポケモンの『こうげき』が3/4倍(0.75倍)になる。",
    },
    {
      trigger: "あついしぼう",
      category: "ability",
      holder: "defender",
      modifier: 2048,
      condition: function (n) {
        return (
          (14 === n.metaMoveTypeId || 9 === n.metaMoveTypeId) && n.defender.abilityActivated
        );
      },
      description: "技のタイプがほのお又はこおりのとき、攻撃/特攻0.5倍",
    },
    {
      trigger: "きよめのしお",
      category: "ability",
      holder: "defender",
      modifier: 2048,
      condition: function (n) {
        return (
          7 === n.metaMoveTypeId && n.defender.abilityActivated
        );
      },
      description: "技のタイプがゴーストのとき、攻撃/特攻0.5倍",
    },
    {
      trigger: "げきりゅう",
      category: "ability",
      holder: "attacker",
      modifier: 6144,
      condition: function (n) {
        var t = n.attacker;
        return (
          10 === n.metaMoveTypeId &&
          (t.abilityActivated)
        );
      },
      description:
        "技のタイプがみずで、HPが1/3以下のとき、攻撃/特攻1.5倍",
    },
    {
      trigger: "こんじょう",
      category: "ability",
      holder: "attacker",
      modifier: 6144,
      condition: function (n) {
        return (
          1 === n.attacker.moves[n.move][1] &&
          (n.attacker.abilityActivated && Boolean(n.attacker.aliment))
        );
      },
      description: "状態異常のとき、攻撃1.5倍",
    },
    {
      trigger: "むしのしらせ",
      category: "ability",
      holder: "attacker",
      modifier: 6144,
      condition: function (n) {
        var t = n.attacker;
        return (
          6 === n.metaMoveTypeId &&
          (t.abilityActivated)
        );
      },
      description:
        "技のタイプがむしで、HPが1/3以下のとき、攻撃/特攻1.5倍",
    },
    {
      trigger: "しんりょく",
      category: "ability",
      holder: "attacker",
      modifier: 6144,
      condition: function (n) {
        var t = n.attacker;
        return (
          11 === n.metaMoveTypeId &&
          (t.abilityActivated)
        );
      },
      description:
        "技のタイプがくさで、HPが1/3以下のとき、攻撃/特攻1.5倍",
    },
    {
      trigger: "プラス",
      category: "ability",
      holder: "attacker",
      modifier: 6144,
      condition: function (n) {
        return (
          n.attacker.abilityActivated && 2 === n.attacker.moves[n.move][1]
        );
      },
      description: "仲間の特性がマイナスのとき、特攻1.5倍",
    },
    {
      trigger: "マイナス",
      category: "ability",
      holder: "attacker",
      modifier: 6144,
      condition: function (n) {
        return (
          n.attacker.abilityActivated && 2 === n.attacker.moves[n.move][1]
        );
      },
      description: "仲間の特性がプラスのとき、特攻1.5倍",
    },
    {
      trigger: "もうか",
      category: "ability",
      holder: "attacker",
      modifier: 6144,
      condition: function (n) {
        var t = n.attacker;
        return (
          9 === n.metaMoveTypeId &&
          (t.abilityActivated)
        );
      },
      description:
        "技のタイプがほのおで、HPが1/3以下のとき、攻撃/特攻1.5倍",
    },
    {
      trigger: "よわき",
      category: "ability",
      holder: "attacker",
      modifier: 2048,
      condition: function (n) {
        var t = n.attacker;
        return t.abilityActivated;
      },
      description: "HPが半分以下のとき、攻撃/特攻0.5倍",
    },
    {
      trigger: "ヨガパワー",
      category: "ability",
      holder: "attacker",
      modifier: 8192,
      condition: function (n) {
        return 1 === n.attacker.moves[n.move][1] && n.attacker.abilityActivated;
      },
      description: "攻撃2倍",
    },
    {
      trigger: "はりこみ",
      category: "ability",
      holder: "attacker",
      modifier: 8192,
      condition: function (n) {
        return n.attacker.abilityActivated;
      },
      description: "相手交換時、攻撃特攻2倍",
    },
    {
      trigger: "ちからもち",
      category: "ability",
      holder: "attacker",
      modifier: 8192,
      condition: function (n) {
        return 1 === n.attacker.moves[n.move][1] && n.attacker.abilityActivated;;
      },
      description: "攻撃2倍",
    },
    {
      trigger: "すいほう",
      category: "ability",
      holder: "attacker",
      modifier: 8192,
      condition: function (n) {
        return 10 === n.metaMoveTypeId && n.attacker.abilityActivated;
      },
      description: "みずタイプの技のとき、攻撃・特攻2倍",
    },
    {
      trigger: "すいほう",
      category: "ability",
      holder: "defender",
      modifier: 2048,
      condition: function (n) {
        return 9 === n.metaMoveTypeId && n.defender.abilityActivated;
      },
      description: "ほのおタイプの技のとき、相手の攻撃・特攻0.5倍",
    },
    {
      trigger: "サンパワー",
      category: "ability",
      holder: "attacker",
      modifier: 6144,
      condition: function (n) {
        return (
          2 === n.attacker.moves[n.move][1] &&
          ("sunny" === n.environment.weather && n.attacker.abilityActivated)
        );
      },
      description: "天候がはれのとき、特攻1.5倍",
    },
    {
      trigger: "ひひいろのこどう",
      category: "ability",
      holder: "attacker",
      modifier: 5461,
      condition: function (n) {
        return (
          1 === n.attacker.moves[n.move][1] &&
          ("sunny" === n.environment.weather && n.attacker.abilityActivated)
        );
      },
      description: "天候がはれのとき、攻撃4/3倍(1.33倍)",
    },
    {
      trigger: "ハドロンエンジン",
      category: "ability",
      holder: "attacker",
      modifier: 5461,
      condition: function (n) {
        return (
          2 === n.attacker.moves[n.move][1] &&
          ("electric" === n.environment.terrain && n.attacker.abilityActivated)
        );
      },
      description: "『エレキフィールド』の時、『とくこう』が4/3倍(1.33倍)",
    },
    {
      trigger: "もらいび",
      category: "ability",
      holder: "attacker",
      modifier: 6144,
      condition: function (n) {
        return (
          n.attacker.abilityActivated && 9 === n.metaMoveTypeId
        );
      },
      description:
        "技のタイプがほのおで、ほのおタイプの技を受けている場合、攻撃/特攻1.5倍",
    },
    {
      trigger: "スロースタート",
      category: "ability",
      holder: "attacker",
      modifier: 2048,
      condition: function (n) {
        return (
          1 === n.attacker.moves[n.move][1] && n.attacker.abilityActivated
        );
      },
      description: "場に出てから5ターンの間、攻撃0.5倍",
    },
    {
      trigger: "はがねつかい",
      category: "ability",
      holder: "attacker",
      modifier: 6144,
      condition: function (n) {
        return 8 === n.metaMoveTypeId && n.attacker.abilityActivated;
      },
      description: "はがねタイプの技のとき、攻撃/特攻1.5倍",
    },
    {
      trigger: "いわはこび",
      category: "ability",
      holder: "attacker",
      modifier: 6144,
      condition: function (n) {
        return 5 === n.metaMoveTypeId && n.attacker.abilityActivated;
      },
      description: "いわタイプの技のとき、攻撃/特攻1.5倍",
    },
    {
      trigger: "トランジスタ",
      category: "ability",
      holder: "attacker",
      modifier: 5325,
      condition: function (n) {
        return 12 === n.metaMoveTypeId && n.attacker.abilityActivated;
      },
      description: "でんきタイプの技のとき、攻撃/特攻1.5倍",
    },
    {
      trigger: "りゅうのあぎと",
      category: "ability",
      holder: "attacker",
      modifier: 6144,
      condition: function (n) {
        return 15 === n.metaMoveTypeId && n.attacker.abilityActivated;
      },
      description: "ドラゴンタイプの技のとき、攻撃/特攻1.5倍",
    },
    {
      trigger: "ごりむちゅう",
      category: "ability",
      holder: "attacker",
      modifier: 6144,
      condition: function (n) {
        return 1 === n.attacker.moves[n.move][1] && n.attacker.abilityActivated;
      },
      description: "攻撃1.5倍",
    },
    {
      trigger: "フラワーギフト",
      category: "conditions",
      holder: "attacker",
      modifier: 6144,
      condition: function (n) {
        return (
          1 === n.attacker.moves[n.move][1] &&
          "sunny" === n.environment.weather 
        );
      },
      description: "天候がはれのとき、攻撃1.5倍",
    },
    {
      trigger: "ふといホネ",
      category: "item",
      holder: "attacker",
      modifier: 8192,
      condition: function (n) {
        var t = n.attacker.pokeName;
        return (
          1 === n.attacker.moves[n.move][1] &&
          (
            "ガラガラ" === t ||
            "ガラガラ(アローラ)" === t ||
            "カラカラ" === t)
        );
      },
      description: "カラカラ及びガラガラの攻撃2倍",
    },
    {
      trigger: "しんかいのキバ",
      category: "item",
      holder: "attacker",
      modifier: 8192,
      condition: function (n) {
        return (
          2 === n.attacker.moves[n.move][1] &&
          n.attacker.pokeName === "パールル"
        );
      },
      description: "パールルの特攻2倍",
    },
    {
      trigger: "でんきだま",
      category: "item",
      holder: "attacker",
      modifier: 8192,
      condition: function (n) {
        return n.attacker.pokeName === "ピカチュウ";
      },
      description: "ピカチュウの攻撃/特攻2倍",
    },
    {
      trigger: "こだわりハチマキ",
      category: "item",
      holder: "attacker",
      modifier: 6144,
      condition: function (n) {
        return 1 === n.attacker.moves[n.move][1];
      },
      description: "攻撃1.5倍",
    },
    {
      trigger: "こだわりメガネ",
      category: "item",
      holder: "attacker",
      modifier: 6144,
      condition: function (n) {
        return 2 === n.attacker.moves[n.move][1];
      },
      description: "特攻1.5倍",
    },
    {
      trigger: "こだいかっせい",
      category: "ability",
      holder: "attacker",
      modifier: 5325,
      condition: function (n) {
        return 1 === n.attacker.moves[n.move][1] 
        && ((n.attacker.item == 'ブーストエナジー' && n.attacker.itemActivated) || (n.environment.weather == 'sunny' && n.attacker.abilityActivated))
        && n.attacker.attackActual >= n.attacker.defenceActual
        && n.attacker.attackActual >= n.attacker.spAttackActual
        && n.attacker.attackActual >= n.attacker.spDefenceActual
        && n.attacker.attackActual >= n.attacker.speedActual;
      },
      description: "『ブーストエナジー』を持たせるか、天気が『にほんばれ』状態のとき、自分の一番高い能力が上がる。（攻撃1.3倍）",
    },
    {
      trigger: "こだいかっせい",
      category: "ability",
      holder: "attacker",
      modifier: 5325,
      condition: function (n) {
        return 2 === n.attacker.moves[n.move][1] 
        && ((n.attacker.item == 'ブーストエナジー' && n.attacker.itemActivated) || (n.environment.weather == 'sunny' && n.attacker.abilityActivated))
        && n.attacker.spAttackActual > n.attacker.attackActual
        && n.attacker.spAttackActual > n.attacker.defenceActual
        && n.attacker.spAttackActual >= n.attacker.spDefenceActual
        && n.attacker.spAttackActual >= n.attacker.speedActual;
      },
      description: "『ブーストエナジー』を持たせるか、天気が『にほんばれ』状態のとき、自分の一番高い能力が上がる。（特攻1.3倍）",
    },
    {
      trigger: "クォークチャージ",
      category: "ability",
      holder: "attacker",
      modifier: 5325,
      condition: function (n) {
        return 1 === n.attacker.moves[n.move][1] 
        && ((n.attacker.item == 'ブーストエナジー' && n.attacker.itemActivated) || (n.environment.terrain == 'electric' && n.attacker.abilityActivated))
        && n.attacker.attackActual >= n.attacker.defenceActual
        && n.attacker.attackActual >= n.attacker.spAttackActual
        && n.attacker.attackActual >= n.attacker.spDefenceActual
        && n.attacker.attackActual >= n.attacker.speedActual;
      },
      description: "『ブーストエナジー』を持たせるか、フィールドが『エレキフィールド』のとき、自分の一番高い能力が上がる。（攻撃1.3倍）",
    },
    {
      trigger: "クォークチャージ",
      category: "ability",
      holder: "attacker",
      modifier: 5325,
      condition: function (n) {
        return 2 === n.attacker.moves[n.move][1] 
        && ((n.attacker.item == 'ブーストエナジー' && n.attacker.itemActivated) || (n.environment.terrain == 'electric' && n.attacker.abilityActivated))
        && n.attacker.spAttackActual > n.attacker.attackActual
        && n.attacker.spAttackActual > n.attacker.defenceActual
        && n.attacker.spAttackActual >= n.attacker.spDefenceActual
        && n.attacker.spAttackActual >= n.attacker.speedActual;
      },
      description: "『ブーストエナジー』を持たせるか、フィールドが『エレキフィールド』のとき、自分の一番高い能力が上がる。（特攻1.3倍）",
    },
  ];