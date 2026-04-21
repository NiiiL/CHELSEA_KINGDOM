export type DimensionType = 'AGG' | 'MEN' | 'HUS' | 'TEC' | 'CLU' | 'PRE' | 'DUR' | 'FLA';

export interface DimensionWeight {
  dimension: DimensionType;
  value: number;
}

export interface QuestionOption {
  text: string;
  weights: DimensionWeight[];
}

export interface Question {
  id: string;
  text: string;
  triggerChar?: string;       // 触发角色 id（如 'kante'）
  triggerOption?: number;     // 触发选项下标 0/1/2
  triggerMechanism?: string;  // 'blueDot'|'drift'|'lampard'|'whitespace'|'rapidClick'|'centerZone'
  options: QuestionOption[];
}

// ============================================================
// 20 道主测试题
// 触发题的触发选项含普通权重（未触发时作为正常选项计分）
// ============================================================
export const allQuestions: Question[] = [
  // Q01 ─────────────────────────────────────────
  {
    id: 'q01',
    text: '进球了，下一秒，你？',
    options: [
      { text: '扑向最近的队友，然后被一堆人压在最底下', weights: [{ dimension: 'MEN', value: 1 }, { dimension: 'HUS', value: 1 }] },
      { text: '往角旗狂冲，跪到球裤磨穿', weights: [{ dimension: 'FLA', value: 2 }, { dimension: 'AGG', value: 1 }] },
      { text: '指着队徽，深情眺望远方，配合一个标准英雄微笑', weights: [{ dimension: 'PRE', value: 1 }, { dimension: 'FLA', value: 1 }] },
    ]
  },

  // Q02 ─────────────────────────────────────────
  {
    id: 'q02',
    text: '落后三球，更衣室中场。你是？',
    options: [
      { text: '在脑子里已经开始预设失败后的新闻发布会措辞了', weights: [{ dimension: 'MEN', value: -2 }, { dimension: 'CLU', value: -1 }] },
      { text: '第一个开口，声音不大，但每个人都听清了', weights: [{ dimension: 'MEN', value: 2 }, { dimension: 'PRE', value: 2 }] },
      { text: '等教练说完，顺手给旁边最慌的队友递了块橙子', weights: [{ dimension: 'MEN', value: 1 }, { dimension: 'HUS', value: 1 }] },
    ]
  },

  // Q03 ─────────────────────────────────────────
  {
    id: 'q03',
    text: '对方有个速度突出的边锋，你已经被过了两次。怎么调整？',
    options: [
      { text: '叫人来夹击，我负责封堵路线', weights: [{ dimension: 'TEC', value: 2 }, { dimension: 'MEN', value: 1 }] },
      { text: '下次他一拿球我就冲，体力的事先不管', weights: [{ dimension: 'HUS', value: 3 }, { dimension: 'AGG', value: 1 }] },
      { text: '第二次被过之后，我已经看穿他起步时的重心习惯了', weights: [{ dimension: 'TEC', value: 2 }, { dimension: 'MEN', value: 2 }] },
    ]
  },

  // Q04 ─────────────────────────────────────────
  {
    id: 'q04',
    text: '你这赛季跑动全队最高，但只进了3球。你怎么看？',
    options: [
      { text: '老实说，我宁愿少跑点、多进几个', weights: [{ dimension: 'CLU', value: 2 }, { dimension: 'FLA', value: 1 }] },
      { text: '跑动路线需要调整，要更多出现在球路的终点', weights: [{ dimension: 'TEC', value: 2 }, { dimension: 'HUS', value: 1 }] },
      { text: '跑动数据就是我的贡献，进球不是衡量我的唯一标准', weights: [{ dimension: 'HUS', value: 3 }, { dimension: 'MEN', value: 2 }] },
    ]
  },

  // Q05 ────────────────────────────
  {
    id: 'q05',
    text: '教练问你对本场部署的看法。你？',
    options: [
      { text: '说了，但说得很间接，让他觉得这个想法是你自己的', weights: [{ dimension: 'TEC', value: 1 }, { dimension: 'FLA', value: 1 }] },
      { text: '没有意见，按照教练安排执行就好', weights: [{ dimension: 'HUS', value: 1 }, { dimension: 'MEN', value: 1 }] },
      { text: '直接说，哪里不合理，理由是什么', weights: [{ dimension: 'PRE', value: 2 }, { dimension: 'AGG', value: 1 }] },
    ]
  },


  // Q06 ─────────────────────────────────────────
  {
    id: 'q06',
    text: '赛季末了，你踢了55场，膝盖开始有异响。教练问你下周能否出场。你说？',
    options: [
      { text: '「要看训练恢复情况。」', weights: [{ dimension: 'DUR', value: 1 }, { dimension: 'MEN', value: 2 }] },
      { text: '「先让我去扫个核磁。」', weights: [{ dimension: 'DUR', value: -2 }, { dimension: 'MEN', value: 1 }] },
      { text: '「能。」', weights: [{ dimension: 'DUR', value: 3 }, { dimension: 'AGG', value: 1 }] },
    ]
  },

  // Q07 坎特触发题──────────────────────────
  {
    id: 'q07',
    text: '补时第三分钟，你们落后一球。中场出现了一个刀山球',
    triggerChar: 'kante',
    triggerOption: 0,
    triggerMechanism: 'blueDot',
    options: [
      { text: '让后腰去，他覆盖面积本来就比所有人大', weights: [{ dimension: 'MEN', value: 1 }, { dimension: 'HUS', value: 1 }] },
      { text: '先看清局势再决定要不要出脚', weights: [{ dimension: 'CLU', value: -1 }, { dimension: 'MEN', value: 1 }] },
      { text: '上，这种球就是我的', weights: [{ dimension: 'CLU', value: 2 }, { dimension: 'HUS', value: 3 }] },
    ]
  },
  // Q08 ⚡ 兰帕德触发题 ──────────────────────────
  {
    id: 'q08',
    text: '被对方中场狠铲了一脚，裁判没吹。你的反应？',
    triggerChar: 'lampard',
    triggerOption: 0,
    triggerMechanism: 'lampard',
    options: [
      { text: '直接插入禁区，用进球把这一脚还回去', weights: [{ dimension: 'CLU', value: 2 }, { dimension: 'AGG', value: 2 }] },
      { text: '站起来继续跑，等机会来的时候再说', weights: [{ dimension: 'MEN', value: 2 }, { dimension: 'HUS', value: 1 }] },
      { text: '看了他一眼，什么都没说，后面找了个合理冲撞补了回去', weights: [{ dimension: 'AGG', value: 2 }, { dimension: 'CLU', value: 1 }] },
    ]
  },

  // Q09 ⚡ 卢卡库触发题 ──────────────────────────
  {
    id: 'q09',
    text: '拿球被两人夹击，没有空间出路。你？',
    triggerChar: 'lukaku',
    triggerOption: 1,
    triggerMechanism: 'makeSoup', // 机制标识符：煲汤
    options: [
      { text: '先假动作骗开一个，再找出球点', weights: [{ dimension: 'TEC', value: 2 }, { dimension: 'FLA', value: 2 }] },
      { text: '硬闯+爆趟，靠身体和速度冲过去', weights: [{ dimension: 'AGG', value: 2 }, { dimension: 'HUS', value: 1 }] },
      { text: '直接回传，这球没有好的路线', weights: [{ dimension: 'TEC', value: 1 }, { dimension: 'MEN', value: 1 }] },
    ]
  },

  // Q10 ⚡ 阿扎尔触发题 ──────────────────────────
  {
    id: 'q10',
    text: '主教练布置了一套极其复杂的新战术。你的态度是？',
    triggerChar: 'hazard',
    triggerOption: 2,
    triggerMechanism: 'drift',
    options: [
      { text: '只记两三个关键点，其他靠临场发挥', weights: [{ dimension: 'FLA', value: 2 }, { dimension: 'HUS', value: 1 }] },
      { text: '认真记，比赛中严格执行每一个细节', weights: [{ dimension: 'TEC', value: 2 }, { dimension: 'MEN', value: 1 }] },
      { text: '战术太复杂了，把球给我，我把他们全过了', weights: [{ dimension: 'FLA', value: 2 }, { dimension: 'MEN', value: -1 }] },
    ]
  },

  // Q11 维尔纳触发题  ─────────────────────────────────────────
  {
    id: 'q11',
    text: '你有没有过这种经历——明明累了，但还是冲进了禁区——',
    triggerChar: 'werner',
    triggerOption: 2,
    triggerMechanism: 'whitespace',
    options: [
      { text: '有，那次冲进去就进了', weights: [{ dimension: 'CLU', value: 3 }, { dimension: 'HUS', value: 2 }] },
      { text: '这种情况我会提前判断，不做无结论的冲跑', weights: [{ dimension: 'TEC', value: 2 }, { dimension: 'MEN', value: 1 }] },
      { text: '有，但那次越位了，我错过了近在咫尺的射门', weights: [{ dimension: 'HUS', value: 2 }, { dimension: 'CLU', value: -1 }] },
    ]
  },

  // Q12 ─────────────────────────────────────────
  {
    id: 'q12',
    text: '任意球，距门25米。你？',
    options: [
      { text: '传给禁区里的高中锋', weights: [{ dimension: 'TEC', value: 1 }, { dimension: 'MEN', value: 1 }] },
      { text: '射，这个角度我练了一万次了', weights: [{ dimension: 'TEC', value: 2 }, { dimension: 'CLU', value: 2 }] },
      { text: '假装要射，把注意力吸引过来，再斜传右路插上的队友', weights: [{ dimension: 'TEC', value: 2 }, { dimension: 'FLA', value: 2 }] },
    ]
  },

  // Q13 ─────────────────────────────────────────
  {
    id: 'q13',
    text: '欧冠决赛，点球大战。你是第5顺位。你在想什么？',
    options: [
      { text: '反复确认踢的方向，越想越觉得应该换', weights: [{ dimension: 'CLU', value: -2 }, { dimension: 'MEN', value: -1 }] },
      { text: '盯着守门员的重心，看他有没有规律', weights: [{ dimension: 'TEC', value: 2 }, { dimension: 'CLU', value: 1 }] },
      { text: '脑子空白。因为我在心里已经踢了一千次了', weights: [{ dimension: 'CLU', value: 3 }, { dimension: 'MEN', value: 3 }] },
    ]
  },

  // Q14 ──────────────────────────
  {
    id: 'q20',
    text: '最后一分钟，反击机会。你？',
    options: [
      { text: '传球，旁边那人位置更好，这球不是我的', weights: [{ dimension: 'TEC', value: 2 }, { dimension: 'CLU', value: 1 }] },
      { text: '保这个平局就好，这球太冒险了', weights: [{ dimension: 'CLU', value: -2 }, { dimension: 'MEN', value: 1 }] },
      { text: '出脚，等不来更好的时机了', weights: [{ dimension: 'CLU', value: 3 }, { dimension: 'AGG', value: 2 }] },
    ]
  },

  // Q15 ─────────────────────────────────────────
  {
    id: 'q15',
    text: '你做了一个高难度动作，结果失误让对方反击。你下一步？',
    options: [
      { text: '脸不红心不跳，摊手并走回位置，好像什么都没发生', weights: [{ dimension: 'FLA', value: 2 }, { dimension: 'MEN', value: 2 }] },
      { text: '下次换个更稳健的处理方式，这个场景记住了', weights: [{ dimension: 'TEC', value: 1 }, { dimension: 'MEN', value: 1 }] },
      { text: '立刻全速追，能追几个追几个', weights: [{ dimension: 'HUS', value: 2 }, { dimension: 'AGG', value: 2 }] },
    ]
  },

  // Q16 ─────────────────────────────────────────
  {
    id: 'q16',
    text: '短时间连续打满全场，身体在预警。现在的状态是？',
    options: [
      { text: '越踢越对，比赛节奏本身就是最好的恢复', weights: [{ dimension: 'DUR', value: 3 }, { dimension: 'AGG', value: 1 }] },
      { text: '腿是麻的，我会主动跟教练申请轮换', weights: [{ dimension: 'DUR', value: -1 }, { dimension: 'MEN', value: 2 }] },
      { text: '肌肉疲劳，头脑还清醒，能打', weights: [{ dimension: 'DUR', value: 2 }, { dimension: 'MEN', value: 1 }] },
    ]
  },

  // Q17 ─────────────────────────────────────────
  {
    id: 'q17',
    text: '比赛中球队失去节奏，场上乱成一锅。你？',
    options: [
      { text: '等下一次死球，趁机提醒队友重新整理站位', weights: [{ dimension: 'MEN', value: 2 }, { dimension: 'TEC', value: 1 }] },
      { text: '大喊一声，强行把所有人的注意力拉回来', weights: [{ dimension: 'PRE', value: 3 }, { dimension: 'AGG', value: 1 }] },
      { text: '找到拿球最混乱的队友，和他沟通帮他稳住节奏', weights: [{ dimension: 'HUS', value: 1 }, { dimension: 'TEC', value: 1 }] },
    ]
  },

  // Q18 ─────────────────────────────────────────
  {
    id: 'q18',
    text: '你的球风更接近哪种？',
    options: [
      { text: '实用，每个动作都只为一个目的', weights: [{ dimension: 'TEC', value: 2 }, { dimension: 'HUS', value: 1 }] },
      { text: '华丽，对方永远猜不到我的下一步', weights: [{ dimension: 'FLA', value: 3 }, { dimension: 'TEC', value: 1 }] },
      { text: '爆发性的，在关键时刻突然出现', weights: [{ dimension: 'CLU', value: 2 }, { dimension: 'FLA', value: 1 }] },
    ]
  },

  // Q19 科斯塔触发题 ─────────────────────────────────────────
  {
    id: 'q19',
    text: '训练结束，更衣室里大家无所事事。你最可能在做什么？',
    triggerChar: 'costa',
    triggerOption: 0,
    triggerMechanism: 'rapidClick',
    options: [
      { text: '找队内按摩师练练拳击，顺便解压', weights: [{ dimension: 'AGG', value: 2 }, { dimension: 'FLA', value: 1 }] },
      { text: '倒在沙发上刷手机，该休息的时候就休息', weights: [{ dimension: 'DUR', value: 1 }, { dimension: 'FLA', value: 1 }] },
      { text: '看下一场对手的录像，提前做准备', weights: [{ dimension: 'TEC', value: 2 }, { dimension: 'MEN', value: 1 }] },
    ]
  },

  // Q20 帕尔默触发题 ─────────────────────────────────────────
  {
    id: 'q20',
    text: '常规时间最后一个决胜点球，你选谁去踢？',
    triggerChar: 'palmer',
    triggerOption: 2,
    triggerMechanism: 'centerZone',
    options: [
      { text: '队长来，这是他的职责', weights: [{ dimension: 'PRE', value: 2 }, { dimension: 'MEN', value: 1 }] },
      { text: '这场发挥最亮眼的那个，状态才是王道', weights: [{ dimension: 'CLU', value: 1 }, { dimension: 'HUS', value: 1 }] },
      { text: '队内点球命中率最高的那个——他最靠谱', weights: [{ dimension: 'CLU', value: 2 }, { dimension: 'TEC', value: 1 }] },
    ]
  },
];
