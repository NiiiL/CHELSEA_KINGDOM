export interface InnerChoiceQuestion {
  type: 'choice';
  text: string;
  options: string[];
  correctIndex: number;
}

export interface InnerTextQuestion {
  type: 'text';
  text: string;
  correctAnswers: string[];
}

export interface InnerCharacterData {
  characterId: string;
  pool: InnerChoiceQuestion[];       // 随机抽 5 道
  finalQuestion: InnerTextQuestion;  // 第 6 题（文字输入）
}

// ============================================================
// 1. 坎特 (kante)
// ============================================================
const kanteData: InnerCharacterData = {
  characterId: 'kante',
  pool: [
    { type: 'choice', text: '坎特在加盟切尔西的第一个赛季穿几号？', options: ['7号', '8号', '10号'], correctIndex: 0 },
    { type: 'choice', text: '2021年欧冠淘汰赛阶段，坎特在哪几场比赛全部被评为全场最佳？', options: ['半决赛两回合+决赛全部MOTM', '决赛MOTM', '小组赛两场'], correctIndex: 0 },
    { type: 'choice', text: '坎特的转会费约为多少？', options: ['约3200万英镑', '约5000万英镑', '约6500万英镑'], correctIndex: 0 },
    { type: 'choice', text: '萨里执教时期，坎特的位置发生了什么改变？', options: ['位置前移参与进攻', '打中卫', '打边后卫'], correctIndex: 0 },
    { type: 'choice', text: '坎特曾因错过火车去了路人家里，做了什么？', options: ['吃咖喱&打FIFA', '看电影睡觉', '练习厨艺'], correctIndex: 0 },
    { type: 'choice', text: '2019年欧联决赛前，坎特曾遭遇什么伤病带伤出战？', options: ['膝盖伤势', '肌肉拉伤', '脚踝扭伤'], correctIndex: 0 },
    { type: 'choice', text: '"地球71%是水，剩下29%是？"', options: ['坎特覆盖的区域', '海洋', '陆地'], correctIndex: 0 },
    { type: 'choice', text: '坎特曾在训练中因为什么迟到而被罚款？', options: ['他从来不迟到（只有一次因为车祸）', '堵车', '睡过头'], correctIndex: 0 },
    { type: 'choice', text: '坎特离开切尔西后加盟了哪支球队？', options: ['吉达联合', '巴黎圣日耳曼', '拜仁慕尼黑'], correctIndex: 0 },
    { type: 'choice', text: '坎特在切尔西的首秀对阵的是哪支球队？', options: ['西汉姆联', '曼城', '阿森纳'], correctIndex: 0 },
  ],
  finalQuestion: {
    type: 'text',
    text: '虽然薪资极高，但坎特在切尔西效力多年一直坚持驾驶，甚至在发生小车祸后也只是简单修补后继续开的"最穷座驾"品牌型号是？',
    correctAnswers: ['mini cooper', 'mini', 'MINI COOPER', 'MINI', 'Mini Cooper', 'Mini', '迷你库珀', '迷你'],
  },
};

// ============================================================
// 2. 帕尔默 (palmer)
// ============================================================
const palmerData: InnerCharacterData = {
  characterId: 'palmer',
  pool: [
    { type: 'choice', text: '帕尔默从曼城转会切尔西的转会费约为多少？', options: ['4250万英镑', '2000万英镑', '5500万英镑'], correctIndex: 0 },
    { type: 'choice', text: '帕尔默在23-24赛季对阵哪支球队时完成了单场"大四喜"？', options: ['埃弗顿', '热刺', '西汉姆联'], correctIndex: 0 },
    { type: 'choice', text: '帕尔默加盟切尔西首秀是对阵哪支球队？', options: ['诺丁汉森林', '阿森纳', '利物浦'], correctIndex: 0 },
    { type: 'choice', text: '帕尔默在切尔西的第一个"帽子戏法"是对阵谁时获得的？', options: ['曼联', '阿森纳', '热刺'], correctIndex: 0 },
    { type: 'choice', text: '帕尔默是切尔西队史首位在21岁以下单季进球超过多少个的球员？', options: ['20个', '15个', '25个'], correctIndex: 0 },
    { type: 'choice', text: '在23-24赛季，帕尔默在所有主罚的点球中保持了100%的命中率，请问他一共罚入了多少个点球？', options: ['9个', '6个', '12个'], correctIndex: 0 },
    { type: 'choice', text: '帕尔默与哪位足球博主有缘？', options: ['王楚淇', '小王闯广州', '橙色闪电'], correctIndex: 0 },
    {
      type: 'choice',
      text: '帕尔默在24-25赛季对阵布莱顿时，创造了英超历史上第一个什么纪录？',
      options: ['半场上演大四喜', '单场5次助攻', '开场5分钟梅开二度'],
      correctIndex: 0
    },
    {
      type: 'choice',
      text: '帕尔默在2024年欧洲杯决赛对阵西班牙时，他的进球方式是？',
      options: ['禁区外远射贴地斩', '头球破门', '点球'],
      correctIndex: 0
    },
    {
      type: 'choice',
      text: '在 23-24 赛季对阵老东家曼城的经典 4:4 大战中，帕尔默在第几分钟罚入了绝平点球？',
      options: ['第 90+5 分钟', '第 85 分钟', '第 90+10 分钟'],
      correctIndex: 0
    },
    {
      type: 'choice',
      text: '帕尔默在场上不仅能进球，还拥有极强的策动能力，他在 23-24 赛季的英超助攻数是多少？',
      options: ['11 次', '15 次', '8 次'],
      correctIndex: 0
    },
    {
      type: 'choice',
      text: '帕尔默从小就是哪支球队的忠实球迷（虽然他曾效力于该队的同城死敌）？',
      options: ['利物浦', '曼联', '切尔西'],
      correctIndex: 1
    },
    {
      type: 'choice',
      text: '当帕尔默对阵布莱顿上演“大四喜”时，这四个进球一共用了多少分钟？',
      options: ['20 分钟', '35 分钟', '10 分钟'],
      correctIndex: 0
    },
    {
      type: 'choice',
      text: '帕尔默的庆祝动作 "Cold" 走红后，耐克曾专门为他推出过一款限定配色球鞋，其主色调是？',
      options: ['冰蓝色', '纯白色', '切尔西蓝'],
      correctIndex: 0
    },
  ],
  finalQuestion: {
    type: 'text',
    text: '输入暗语以解锁：要（ ）没（ ） 要（ ）没（ ）',
    correctAnswers: ['突突传传', '突 突 传 传'],
  },
};

// ============================================================
// 3. 阿扎尔 (hazard)
// ============================================================
const hazardData: InnerCharacterData = {
  characterId: 'hazard',
  pool: [
    { type: 'choice', text: '阿扎尔加盟切尔西前在Twitter上的官宣词是？', options: ['我将加盟欧冠冠军', '期待新挑战', '伦敦我来了'], correctIndex: 0 },
    { type: 'choice', text: '阿扎尔在切尔西效力期间拿到过几次英超冠军？', options: ['2次', '1次', '3次'], correctIndex: 0 },
    { type: 'choice', text: '阿扎尔在切尔西时期穿过哪两个号码？', options: ['17号和10号', '7号和10号', '17号和11号'], correctIndex: 0 },
    { type: 'choice', text: '阿扎尔最喜欢的食物，且经常因此被调侃的是？', options: ['汉堡', '意大利面', '薯条'], correctIndex: 0 },
    { type: 'choice', text: '阿扎尔在2015年获得的英超个人最高荣誉是？', options: ['PFA年度最佳球员', '足球先生', '欧洲金靴'], correctIndex: 0 },
    { type: 'choice', text: '阿扎尔在切尔西最后一场正式比赛是对阵谁？', options: ['阿森纳', '马竞', '皇马'], correctIndex: 0 },
    { type: 'choice', text: '阿扎尔在切尔西的第一个英超进球是对阵谁打入的点球？', options: ['纽卡斯尔联', '赫尔城', '西布朗'], correctIndex: 0 },
    { type: 'choice', text: '阿扎尔曾在对阵斯旺西的比赛中因为什么被罚下？', options: ['踢球童', '战术犯规', '恶意犯规'], correctIndex: 0 },
    { type: 'choice', text: '阿扎尔在离队前的18-19巅峰赛季，打进了多少粒英超联赛进球？', options: ['16球', '12球', '20球'], correctIndex: 0 },
    { type: 'choice', text: '阿扎尔在整个切尔西生涯中，各项赛事合计打进约多少球？', options: ['110球', '85球', '130球'], correctIndex: 0 },
  ],
  finalQuestion: {
    type: 'text',
    text: '在2016年著名的"斯坦福桥之战"中，阿扎尔打入了那记亲手终结热刺冠军梦想的绝平弧线球，进球发生在第几分钟？',
    correctAnswers: ['83', '83分钟'],
  },
};

// ============================================================
// 4. 维尔纳 (werner)
// ============================================================
const wernerData: InnerCharacterData = {
  characterId: 'werner',
  pool: [
    { type: 'choice', text: '维尔纳的外号"金色侦察机"是因为他？', options: ['跑位风骚但经常越位且射门欠佳', '脚法出众', '速度极快'], correctIndex: 0 },
    { type: 'choice', text: '维尔纳在欧冠决赛对阵曼城时，他的跑位为谁拉开了空间？', options: ['哈弗茨', '芒特', '维尔纳自己进球'], correctIndex: 0 },
    { type: 'choice', text: '维尔纳在切尔西的第一场欧冠进球是对阵谁？', options: ['雷恩', '波尔图', '马竞'], correctIndex: 0 },
    { type: 'choice', text: '维尔纳在20-21赛季是队内的什么？', options: ['各项赛事总助攻王', '英超进球王', '全队跑动王'], correctIndex: 0 },
    { type: 'choice', text: '维尔纳加盟切尔西前效力于哪支球队？', options: ['RB莱比锡', '多特蒙德', '沃尔夫斯堡'], correctIndex: 0 },
    { type: 'choice', text: '维尔纳在对阵皇马的欧冠半决赛中打入了一个什么球？', options: ['头球补射空门', '远射', '点球'], correctIndex: 0 },
    { type: 'choice', text: '维尔纳加盟切尔西时的主教练是谁？', options: ['兰帕德', '图赫尔', '孔蒂'], correctIndex: 0 },
    { type: 'choice', text: '维尔纳在切尔西时期经常因为什么被取消进球？', options: ['越位', '进攻犯规', '手球'], correctIndex: 0 },
  ],
  finalQuestion: {
    type: 'text',
    text: '维尔纳在蓝桥处子赛季中，一共有多少个进球被判定越位在先而被取消？',
    correctAnswers: ['16', '16个'],
  },
};

// ============================================================
// 5. 科斯塔 (costa)
// ============================================================
const costaData: InnerCharacterData = {
  characterId: 'costa',
  pool: [
    { type: 'choice', text: '科斯塔的外号之一是？', options: ['盛世美颜', '战斗机', '疯子'], correctIndex: 0 },
    { type: 'choice', text: '科斯塔在14-15赛季首秀对阵谁打入了处子球？', options: ['伯恩利', '西布朗', '阿斯顿维拉'], correctIndex: 0 },
    { type: 'choice', text: '科斯塔在切尔西时期最好的中场搭档是？', options: ['法布雷加斯', '马蒂奇', '奥斯卡'], correctIndex: 0 },
    { type: 'choice', text: '科斯塔在切尔西穿几号？', options: ['19号', '9号', '18号'], correctIndex: 0 },
    { type: 'choice', text: '“短信门”的主帅是谁？', options: ['孔蒂', '穆里尼奥', '图赫尔'], correctIndex: 0 },
    { type: 'choice', text: '科斯塔在切尔西拿到了几次英超冠军？', options: ['2次', '1次', '3次'], correctIndex: 0 },
    {
      type: 'choice',
      text: '科斯塔在场上除了进球，最擅长的事情是？',
      options: ['激怒对方后卫', '优雅地带球', '禁区外远射'],
      correctIndex: 0
    },
    {
      type: 'choice',
      text: '哪位阿森纳后卫曾在对阵切尔西时被科斯塔“极限一换一”红牌罚下？',
      options: ['加布里埃尔', '科斯切尔尼', '默特萨克'],
      correctIndex: 0
    },
    {
      type: 'choice',
      text: '2016-17赛季夺冠后，科斯塔在更衣室试图用什么东西“攻击”孔蒂？',
      options: ['灭火器', '大香槟', '战术板'],
      correctIndex: 0
    },
    {
      type: 'choice',
      text: '科斯塔虽然代表西班牙国家队出战，但他其实出生在哪个国家？',
      options: ['巴西', '葡萄牙', '阿根廷'],
      correctIndex: 0
    },
    {
      type: 'choice',
      text: '科斯塔在切尔西的最后一个进球是在哪场比赛中打入的？',
      options: ['足总杯决赛对阵阿森纳', '英超对阵桑德兰', '欧冠对阵巴黎'],
      correctIndex: 0
    },
    {
      type: 'choice',
      text: '当科斯塔在场边热身却发现没有换人名额时，他曾对孔蒂做过什么？',
      options: ['扔背心', '直接回更衣室', '疯狂鼓掌'],
      correctIndex: 0
    },
  ],
  finalQuestion: {
    type: 'text',
    text: '科斯塔在14-15夺冠赛季，26场联赛一共累积了多少张黄牌？',
    correctAnswers: ['8', '8张'],
  },
};

// ============================================================
// 6. 兰帕德 (lampard)
// ============================================================
const lampardData: InnerCharacterData = {
  characterId: 'lampard',
  pool: [
    { type: 'choice', text: '兰帕德是切尔西队史射手王，他一共进了多少球？', options: ['211球', '178球', '234球'], correctIndex: 0 },
    { type: 'choice', text: '兰帕德作为球员获得的最高金球奖排名是？', options: ['第2名（2005年）', '第3名', '第1名'], correctIndex: 0 },
    { type: 'choice', text: '兰帕德连续多少场英超首发出战创下了当时纪录？', options: ['164场', '110场', '200场'], correctIndex: 0 },
    { type: 'choice', text: '兰帕德在对阵拜仁的欧冠决赛中，点球大战排在第几个？', options: ['第3个', '第1个', '第5个'], correctIndex: 0 },
    { type: 'choice', text: '兰帕德切尔西生涯唯一一次单场”大四喜”（进4球）是对阵哪支球队？', options: ['阿斯顿维拉', '德比郡', '曼城'], correctIndex: 0 },
    { type: 'choice', text: '兰帕德在切尔西效力期间，身披过几个号码？', options: ['1个 (8号)', '2个 (8号/11号)', '3个'], correctIndex: 0 },
    { type: 'choice', text: '兰帕德在哪一年正式超越坦布林，成为切尔西队史第一射手？', options: ['2012年', '2013年', '2014年'], correctIndex: 1 },
    { type: 'choice', text: '2012年欧冠决赛，特里停赛，切尔西场上的队长是谁？', options: ['德罗巴', '切赫', '兰帕德'], correctIndex: 2 },
  ],
  finalQuestion: {
    type: 'text',
    text: '兰帕德在门萨智商测试中的IQ得分高达多少？',
    correctAnswers: ['150', '150+'],
  },
};

// ============================================================
// 7. 伊万诺维奇 (ivanovic) - 新增
// ============================================================
const ivanovicData: InnerCharacterData = {
  characterId: 'ivanovic',
  pool: [
    { type: 'choice', text: "2013年欧联杯决赛对阵本菲卡，你在伤停补时第几分钟通过头球完成了绝杀？", options: ["第90分钟", "第91分钟", "第93分钟", "第95分钟"], correctIndex: 2 },
    { type: 'choice', text: "在切尔西效力期间，你以“带刀后卫”著称。你的切尔西生涯总进球数是？", options: ["22球", "34球", "41球", "15球"], correctIndex: 1 },
    { type: 'choice', text: "2013年对阵利物浦，你遭遇了震惊足坛的“咬人事件”，当时的肇事者是？", options: ["杰拉德", "苏亚雷斯", "斯特林", "卡拉格"], correctIndex: 1 },
    { type: 'choice', text: "穆里尼奥曾对你有着极高的评价，他形容你是：", options: ["球队灵魂", "两腿之间有钢铁的人", "右路大闸", "塞尔维亚之魂"], correctIndex: 1 },
    { type: 'choice', text: "2012年欧冠1/8决赛逆转那不勒斯的比赛中，绝杀进球者是谁？", options: ["德罗巴", "兰帕德", "特里", "伊万诺维奇"], correctIndex: 3 },
    { type: 'choice', text: "在加盟切尔西之前，你效力于哪支球队？", options: ["莫斯科火车头", "贝尔格莱德红星", "泽尼特", "顿涅茨克矿工"], correctIndex: 0 },
    { type: 'choice', text: "你在切尔西效力期间最常身披的是几号球衣？", options: ["2号", "27号", "28号", "6号"], correctIndex: 0 },
    { type: 'choice', text: "2009年欧冠1/4决赛，你在安菲尔德“梅开二度”击败利物浦，那两个进球的方式是？", options: ["都是头球", "一个头球一个抽射", "都是禁区外远射", "一个头球一个补射"], correctIndex: 0 },
    { type: 'choice', text: "在切尔西效力期间，你一共获得过几次英超联赛冠军？", options: ["1次", "2次", "3次", "4次"], correctIndex: 2 },
    { type: 'choice', text: "你曾在2014-15赛季入选了PFA年度最佳阵容，那一年的切尔西主帅是？", options: ["安切洛蒂", "迪马特奥", "贝尼特斯", "穆里尼奥"], correctIndex: 3 },
    { type: 'choice', text: "除了右后卫，你在球场上最常胜任的另一个位置是？", options: ["后腰", "中后卫", "左后卫", "影子前锋"], correctIndex: 1 },
  ],
  finalQuestion: {
    type: 'text',
    text: "系统识别：请输入该球员在车迷群体中最广为人知的四个字霸气绰号：",
    correctAnswers: ["恐怖伊万"]
  }
};

// ============================================================
// 8. 卢卡库 (lukaku) - 新增
// ============================================================
const lukakuData: InnerCharacterData = {
  characterId: 'lukaku',
  pool: [
    { type: 'choice', text: '当卢卡库在禁区前沿准备接一个毫无难度的传球时，球通常会飞向哪里？', options: ['稳稳停在脚下', '反弹至五米开外送给对手反击', '直接漏给门将'], correctIndex: 1 },
    { type: 'choice', text: '在切尔西时期，卢卡库曾在接受意大利天空体育采访时表达了什么意愿导致舆论爆炸？', options: ['想回国米', '想涨工资', '想当队长'], correctIndex: 0 },
    { type: 'choice', text: '卢卡库在场上鼓励队友最标志性的动作是？', options: ['愤怒摊手', '原地伸出大拇指并点赞', '抱头痛哭'], correctIndex: 1 },
    { type: 'choice', text: '以下哪个外号通常被用来形容卢卡库在禁区内防守队友射门的奇特现象？', options: ['禁区之王', '杵桩王', '重炮手'], correctIndex: 1 },
    { type: 'choice', text: '卢卡库在切尔西第二次效力时，他穿的是几号球衣？', options: ['18号', '9号', '29号'], correctIndex: 1 },
    { type: 'choice', text: '卢卡库曾在接受采访时自称是谁的“接班人”？', options: ['德罗巴', '克林斯曼', '亨利'], correctIndex: 0 },
    { type: 'choice', text: '卢卡库在 2021 年回归切尔西的首秀对阵阿森纳时，他的表现如何？', options: ['进球并展现统治力', '全场隐身', '因伤提前退场'], correctIndex: 0 },
    { type: 'choice', text: '卢卡库的体重在巅峰时期大约是多少？', options: ['约100KG以上', '约80KG', '约120KG'], correctIndex: 0 },
    { type: 'choice', text: '2017年加盟切尔西（第二次）时的转会费大约是？', options: ['9750万英镑', '5000万英镑', '3200万英镑'], correctIndex: 0 },
    { type: 'choice', text: '卢卡库在切尔西进球后最常用的庆祝动作（除了点赞）是？', options: ['闭嘴手势', '滑跪', '翻跟头'], correctIndex: 0 },
  ],
  finalQuestion: {
    type: 'text',
    text: '虽然技术细节备受争议，但由于其惊人的吨位和生吃后卫的能力，切尔西球迷常把卢卡库这种“大力出奇迹”的强行超车突破戏称为？（两个字）',
    correctAnswers: ['煲汤'],
  },
};

// ============================================================
// 汇总导出
// ============================================================
export const innerCharacterData: InnerCharacterData[] = [
  kanteData,
  palmerData,
  hazardData,
  wernerData,
  costaData,
  lampardData,
  ivanovicData,
  lukakuData, // 👈 确保新角色在这里
];

export function getInnerCharacterData(characterId: string): InnerCharacterData | undefined {
  return innerCharacterData.find(d => d.characterId === characterId);
}