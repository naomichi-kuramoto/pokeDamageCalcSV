var defenceModifier = [
    {
      trigger: "わざわいのたま",
      category: "conditions",
      holder: "environment",
      modifier: 3072,
      condition: function (n) {
        return (
          2 === n.attacker.moves[n.move][1] &&
          'わざわいのたま' != n.defender.ability
        );
      },
      description: "自分以外のポケモンの『とくぼう』が3/4倍(0.75倍)になる。",
    },
    {
      trigger: "わざわいのつるぎ",
      category: "conditions",
      holder: "environment",
      modifier: 3072,
      condition: function (n) {
        return (
          1 === n.attacker.moves[n.move][1] &&
          'わざわいのつるぎ' != n.defender.ability
        );
      },
      description: "自分以外のポケモンの『ぼうぎょ』が3/4倍(0.75倍)になる。",
    },
    {
      trigger: "ふしぎなうろこ",
      category: "ability",
      holder: "defender",
      modifier: 6144,
      condition: function (n) {
        return (
          1 === n.attacker.moves[n.move][1] &&
          (n.defender.abilityActivated && Boolean(n.defender.aliment))
        );
      },
      description: "状態異常のとき、防御1.5倍",
    },
    {
      trigger: "くさのけがわ",
      category: "ability",
      holder: "defender",
      modifier: 6144,
      condition: function (n) {
        return (
          1 === n.attacker.moves[n.move][1] &&
          "grass" === n.environment.terrain &&
          n.defender.abilityActivated
        );
      },
      description: "グラスフィールドのとき、防御1.5倍?",
    },
    {
      trigger: "ファーコート",
      category: "ability",
      holder: "defender",
      modifier: 8192,
      condition: function (n) {
        return 1 === n.attacker.moves[n.move][1] &&
        n.defender.abilityActivated;
      },
      description: "防御2倍",
    },
    {
      trigger: "フラワーギフト",
      category: "conditions",
      holder: "defender",
      modifier: 6144,
      condition: function (n) {
        return (
          2 === n.attacker.moves[n.move][1] &&
          ("sunny" === n.environment.weather && n.defender.abilityActivated)
        );
      },
      description: "天候がはれのとき、特防1.5倍",
    },
    {
      trigger: "とつげきチョッキ",
      category: "item",
      holder: "defender",
      modifier: 6144,
      condition: function (n) {
        return 2 === n.attacker.moves[n.move][1];
      },
      description: "特防1.5倍",
    },
    {
      trigger: "しんかいのウロコ",
      category: "item",
      holder: "defender",
      modifier: 8192,
      condition: function (n) {
        return (
          2 === n.attacker.moves[n.move][1] &&
          (n.defender.pokeName =="パールル")
        );
      },
      description: "パールルの特防2倍",
    },
    {
      trigger: "メタルパウダー",
      category: "item",
      holder: "defender",
      modifier: 8192,
      condition: function (n) {
        return (
          1 === n.attacker.moves[n.move][1] &&
          (n.defender==="メタモン")
        );
      },
      description: "メタモンの防御2倍",
    },
    {
      trigger: "しんかのきせき",
      category: "item",
      holder: "defender",
      modifier: 6144,
      condition: function (n) {
        return n.defender.itemActivated;
      },
      description: "進化前のポケモンの防御/特防1.5倍",
    },
    {
      trigger: "こだいかっせい",
      category: "ability",
      holder: "defender",
      modifier: 5325,
      condition: function (n) {
        return 1 === n.attacker.moves[n.move][1] 
        && ((n.defender.item == 'ブーストエナジー' && n.defender.itemActivated) || (n.environment.weather == 'sunny' && n.defender.abilityActivated))
        && n.defender.defenceActual > n.defender.attackActual
        && n.defender.defenceActual >= n.defender.spAttackActual
        && n.defender.defenceActual >= n.defender.spDefenceActual
        && n.defender.defenceActual >= n.defender.speedActual;
      },
      description: "『ブーストエナジー』を持たせるか、天気が『にほんばれ』状態のとき、自分の一番高い能力が上がる。（防御1.3倍）",
    },
    {
      trigger: "こだいかっせい",
      category: "ability",
      holder: "defender",
      modifier: 5325,
      condition: function (n) {
        return 2 === n.attacker.moves[n.move][1] 
        && ((n.defender.item == 'ブーストエナジー' && n.defender.itemActivated) || (n.environment.weather == 'sunny' && n.defender.abilityActivated))
        && n.defender.spDefenceActual > n.defender.attackActual
        && n.defender.spDefenceActual > n.defender.defenceActual
        && n.defender.spDefenceActual > n.defender.spAttackActual
        && n.defender.spDefenceActual >= n.defender.speedActual;
      },
      description: "『ブーストエナジー』を持たせるか、天気が『にほんばれ』状態のとき、自分の一番高い能力が上がる。（特防1.3倍）",
    },
    {
      trigger: "クォークチャージ",
      category: "ability",
      holder: "defender",
      modifier: 5325,
      condition: function (n) {
        return 1 === n.attacker.moves[n.move][1] 
        && ((n.defender.item == 'ブーストエナジー' && n.defender.itemActivated) || (n.environment.terrain == 'electric' && n.defender.abilityActivated))
        && n.defender.defenceActual > n.defender.attackActual
        && n.defender.defenceActual >= n.defender.spAttackActual
        && n.defender.defenceActual >= n.defender.spDefenceActual
        && n.defender.defenceActual >= n.defender.speedActual;
      },
      description: "『ブーストエナジー』を持たせるか、フィールドが『エレキフィールド』のとき、自分の一番高い能力が上がる。（防御1.3倍）",
    },
    {
      trigger: "クォークチャージ",
      category: "ability",
      holder: "defender",
      modifier: 5325,
      condition: function (n) {
        return 2 === n.attacker.moves[n.move][1] 
        && ((n.defender.item == 'ブーストエナジー' && n.defender.itemActivated) || (n.environment.terrain == 'electric' && n.defender.abilityActivated))
        && n.defender.spDefenceActual > n.defender.attackActual
        && n.defender.spDefenceActual > n.defender.defenceActual
        && n.defender.spDefenceActual > n.defender.spAttackActual
        && n.defender.spDefenceActual >= n.defender.speedActual;
      },
      description: "『ブーストエナジー』を持たせるか、フィールドが『エレキフィールド』のとき、自分の一番高い能力が上がる。（特防1.3倍）",
    },
  ];