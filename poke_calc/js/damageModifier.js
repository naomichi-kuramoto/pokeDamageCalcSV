var damageModifier = [
    {
      trigger: "リフレクター",
      category: "conditions",
      holder: "defender",
      modifier: 2048,
      condition: function (n) {
        var t = n.move;
        return (
          n.environment.battleRule == 'single' &&
          1 === n.attacker.moves[n.move][1] &&
          t != "かわらわり" &&
          t != "サイコファング" &&
          "すりぬけ" !== n.attacker.ability &&
          !n.defenderCriticalFlag
        );
      },
      description: "物理ダメージ0.5倍",
    },
    {
      trigger: "リフレクター",
      category: "conditions",
      holder: "defender",
      modifier: 2703,
      condition: function (n) {
        var t = n.move;
        return (
          n.environment.battleRule == 'double' &&
          1 === n.attacker.moves[n.move][1] &&
          t != "かわらわり" &&
          t != "サイコファング" &&
          "すりぬけ" !== n.attacker.ability &&
          !n.defenderCriticalFlag
        );
      },
      description: "物理ダメージ0.66倍",
    },
    {
      trigger: "ひかりのかべ",
      category: "conditions",
      holder: "defender",
      modifier: 2048,
      condition: function (n) {
        var t = n.move;
        return (
          n.environment.battleRule == 'single' &&
          2 === n.attacker.moves[n.move][1] &&
          t != "かわらわり" &&
          t != "サイコファング" &&
          "すりぬけ" !== n.attacker.ability &&
          !n.defenderCriticalFlag
        );
      },
      description: "特殊ダメージ0.5倍",
    },
    {
      trigger: "ひかりのかべ",
      category: "conditions",
      holder: "defender",
      modifier: 2703,
      condition: function (n) {
        var t = n.move;
        return (
          n.environment.battleRule == 'double' &&
          2 === n.attacker.moves[n.move][1] &&
          t != "かわらわり" &&
          t != "サイコファング" &&
          "すりぬけ" !== n.attacker.ability &&
          !n.defenderCriticalFlag
        );
      },
      description: "急所に命中しなかったとき、特殊ダメージ0.66倍",
    },
    {
      trigger: "マルチスケイル",
      category: "ability",
      holder: "defender",
      modifier: 2048,
      condition: function (n) {
        return (
          n.defender.abilityActivated
        );
      },
      description: "HPが最大のとき、ダメージ0.5倍",
    },
    {
      trigger: "いろめがね",
      category: "ability",
      holder: "attacker",
      modifier: 8192,
      condition: function (n) {
        return n.typeCompatibility < 0 && n.attacker.abilityActivated;
      },
      description: "効果が今ひとつのとき、ダメージ2倍",
    },
    {
      trigger: "ブレインフォース",
      category: "ability",
      holder: "attacker",
      modifier: 5120,
      condition: function (n) {
        return n.typeCompatibility >= 1 && n.attacker.abilityActivated;
      },
      description: "効果抜群のとき、ダメージ1.25倍",
    },
    {
      trigger: "フレンドガード",
      category: "conditions",
      holder: "defender",
      modifier: 3072,
      condition: null,
      description: "ダメージ0.75倍",
    },
    // {
    //   trigger: "スナイパー",
    //   category: "ability",
    //   holder: "attacker",
    //   modifier: 6144,
    //   condition: function (n) {
    //     return n.annotations.CH;
    //   },
    //   description: "急所ダメージが更に1.5倍",
    // },
    {
      trigger: "ハードロック",
      category: "ability",
      holder: "defender",
      modifier: 3072,
      condition: function (n) {
        return n.typeCompatibility >= 1 && n.defender.abilityActivated;
      },
      description: "効果が抜群のとき、ダメージ0.75倍",
    },
    {
      trigger: "フィルター",
      category: "ability",
      holder: "defender",
      modifier: 3072,
      condition: function (n) {
        return n.typeCompatibility >= 1 && n.defender.abilityActivated;
      },
      description: "効果が抜群のとき、ダメージ0.75倍",
    },
    {
      trigger: "もふもふ",
      category: "ability",
      holder: "defender",
      modifier: 2048,
      condition: function (n) {
        return n.moveWithContact && n.defender.abilityActivated;
      },
      description: "直接攻撃技のとき、ダメージ0.5倍",
    },
    {
      trigger: "もふもふ",
      category: "ability",
      holder: "defender",
      modifier: 8192,
      condition: function (n) {
        return 9 === n.attacker.moves[n.move][0] && n.defender.abilityActivated;
      },
      description: "ほのおタイプの技のとき、ダメージ2倍",
    },
    {
      trigger: "こおりのりんぷん",
      category: "ability",
      holder: "defender",
      modifier: 2048,
      condition: function (n) {
        return 2 === n.attacker.moves[n.move][1] && n.defender.abilityActivated;
      },
      description: "特殊技のとき、ダメージ0.5倍",
    },
    {
      trigger: "パンクロック",
      category: "ability",
      holder: "defender",
      modifier: 2048,
      condition: function (n) {
        return n.attacker.moves[n.move][31] == 1 &&  n.defender.abilityActivated;
      },
      description: "音技のとき、ダメージ0.5倍",
    },
    {
      trigger: "メトロノーム(2回目)",
      category: "item",
      holder: "attacker",
      modifier: 4915,
      condition: function (n) {
        return n.attacker.itemActivated;
      },
      description: "ダメージ1.2倍",
    },
    {
      trigger: "メトロノーム(3回目)",
      category: "item",
      holder: "attacker",
      modifier: 5734,
      condition: function (n) {
        return n.attacker.itemActivated;
      },
      description: "ダメージ1.4倍",
    },
    {
      trigger: "メトロノーム(4回目)",
      category: "item",
      holder: "attacker",
      modifier: 6553,
      condition: function (n) {
        return n.attacker.itemActivated;
      },
      description: "ダメージ1.6倍",
    },
    {
      trigger: "メトロノーム(5回目)",
      category: "item",
      holder: "attacker",
      modifier: 7372,
      condition: function (n) {
        return n.attacker.itemActivated;
      },
      description: "ダメージ1.8倍",
    },
    {
      trigger: "メトロノーム(6回目以降)",
      category: "item",
      holder: "attacker",
      modifier: 8192,
      condition: function (n) {
        return n.attacker.itemActivated;
      },
      description: "ダメージ2倍",
    },
    {
      trigger: "たつじんのおび",
      category: "item",
      holder: "attacker",
      modifier: 4915,
      condition: function (n) {
        return n.typeCompatibility >= 1 && n.attacker.itemActivated;
      },
      description: "効果が抜群のとき、ダメージ1.2倍",
    },
    {
      trigger: "いのちのたま",
      category: "item",
      holder: "attacker",
      modifier: 5324,
      condition: function (n) {
        return n.attacker.itemActivated;
      },
      description: "ダメージ1.3倍",
    },
    {
      trigger: "タイプ半減系きのみ",
      category: "item",
      holder: "defender",
      modifier: 2048,
      condition: function (n) {
        return (
          n.defender.itemActivated &&
          (n.typeCompatibility >= 1)
        );
      },
      description: "ダメージ0.5倍",
    },
    {
      trigger: "アクセルブレイク",
      category: "name",
      holder: "move",
      modifier: 5461,
      condition: function (n) {
        return (
          n.typeCompatibility >= 1
        );
      },
      description: "効果抜群の時、威力1.33倍",
    },
    {
      trigger: "イナズマドライブ",
      category: "name",
      holder: "move",
      modifier: 5461,
      condition: function (n) {
        return (
          n.typeCompatibility >= 1
        );
      },
      description: "効果抜群の時、威力1.33倍",
    },
  ];