export type CharacterRarity = 'common' | 'inner' | 'god';

export interface Dimensions {
  AGG: number; // Aggression 侵略性
  MEN: number; // Mental 心理韧性
  HUS: number; // Hustle 积极性
  TEC: number; // Technique 技术流
  CLU: number; // Clutch 关键时刻
  PRE: number; // Presence 存在感
  DUR: number; // Durability 出勤率
  FLA: number; // Flair 风格感
}

export interface Character {
  id: string;
  code: string;
  nickname: string;
  prototype: string;
  rarity: CharacterRarity;
  dimensions: Dimensions;
  tagline: string;
  description: string;
  tags: string[];
}

export const sbtiCharacters: Character[] = [
  // ─────────────────────────────────────────
  // 普通角色 Common (16人)
  // ─────────────────────────────────────────
  {
    id: 'mourinho',
    code: 'MOURINHO',
    nickname: '发布会大师',
    prototype: 'José Mourinho',
    rarity: 'common',
    dimensions: { AGG: 10, MEN: 14, HUS: 5, TEC: 5, CLU: 15, PRE: 16, DUR: 6, FLA: 2 },
    tagline: '我不想说话。如果我开口，我就有大麻烦了。',
    description: '你是那种哪怕球队在场上输了，也能在赛后发布会上强行绝杀对手的男人。你坚信防守才是最好的进攻，如果大巴停得不够稳，你会亲自上去帮他们把手刹拉死。你的人生字典里没有“妥协”，只有“Respect，Respect，Respect.”',
    tags: ['特别的一个', '洗衣筐潜入者', '抓内鬼专家']
  },
  {
    id: 'conte',
    code: 'CONTE',
    nickname: '植发大师',
    prototype: 'Antonio Conte',
    rarity: 'common',
    dimensions: { AGG: 15, MEN: 10, HUS: 16, TEC: 4, CLU: 6, PRE: 12, DUR: 8, FLA: 2 },
    tagline: '只要使用3-4-3阵型，防线和发际线都能重回巅峰。',
    description: '你是一个追求极致“苦难”的教练，坚信只要球员还没跑死，就应该起来接着跑。你有着极强的自我修护能力，不仅能让球队的三后卫体系焕发青春，也能让自己的发际线在斥巨资后重返巅峰。你的社交风格主打一个“高效且冷酷”：能用一条短信解决的转会，绝不浪费一秒钟见面，并且在发完短信后，你会顺手收走餐厅里所有的番茄酱。',
    tags: ['短信分手专家', '植发狂魔', '343宗师']
  },
  {
    id: 'tuchel',
    code: 'TUCHEL',
    nickname: '走秀大师',
    prototype: 'Thomas Tuchel',
    rarity: 'common',
    dimensions: { AGG: 3, MEN: 10, HUS: 5, TEC: 15, CLU: 8, PRE: 12, DUR: 4, FLA: 10 },
    tagline: '握手的时候，记得看着我的眼睛。',
    description: '你是误入足球界的德国名模，即便在战术板前熬到眼圈发黑，也要保持那种随时能上T台的清冷感。你能在短短四个月内把球队防线调教得比保险柜还硬，却始终搞不懂为什么老板非要你踢“4-4-3”。你不需要长篇大论的感情，你只需要对方在握手时，能像个男人一样死死盯着你的眼睛。',
    tags: ['握手战神', '菱形切割', '科巴姆首席男模']
  },
  {
    id: 'ancelotti',
    code: 'ANCELOTTI',
    nickname: '口香糖大师',
    prototype: 'Carlo Ancelotti',
    rarity: 'common',
    dimensions: { AGG: 1, MEN: 15, HUS: 3, TEC: 12, CLU: 12, PRE: 10, DUR: 8, FLA: 8 },
    tagline: '只要我的左眉毛向上跳 1 毫米，对方主帅就该写辞职信了。',
    description: '你是足坛最深不可测的“微表情专家”。当对手在场边疯狂咆哮时，你只是淡定地调整了一下眉毛的挑高。你不需要战术板，因为你的眉毛跳动频率就是最高级别的加密指令。你坚信没有什么局势是一盒口香糖化解不了的，如果有，那就再开一盒。',
    tags: ['顶级松弛感', '眉毛舞者', '口香糖消耗大户']
  },
  {
    id: 'pochettino',
    code: 'POCHETTINO',
    nickname: '折返跑大师',
    prototype: 'Mauricio Pochettino',
    rarity: 'common',
    dimensions: { AGG: 8, MEN: 6, HUS: 16, TEC: 6, CLU: 2, PRE: 5, DUR: 14, FLA: 3 },
    tagline: '跑起来，我的好大儿们。',
    description: '在你的字典里，足球是 1% 的控球加上 99% 的折返跑。你的理想型球员不仅要肺活量惊人，还得能在拉伤边缘疯狂试探。对你来说，没有什么是一顿周五BBQ解决不了的，如果有，那就再加两根香肠。你是球队氛围的保卫者，也是全伦敦最会烤肉的战术家。',
    tags: ['伦敦烧烤王', '波叔柠檬水', 'Gacon测试狂人']
  },
  {
    id: 'potter',
    code: 'POTTER',
    nickname: '尽力了大师',
    prototype: 'Graham Potter',
    rarity: 'common',
    dimensions: { AGG: 1, MEN: 2, HUS: 6, TEC: 10, CLU: 1, PRE: 1, DUR: 4, FLA: 5 },
    tagline: '小伙子们已经倾尽所有了，我也真的尽力了。',
    description: '你擅长把一套身价过亿的超跑开出老头乐的平稳感，并坚信进球只是足球运动中一个可有可无的意外。你拥有极高的情商，能让所有球员感到舒适，唯独让看台上的球迷感到窒息。即便球队滑向积分榜下半区，你依然能保持那份教科书般的淡定，并计划在下一次发布会上继续分享你那永远没有尽头的“过程”。',
    tags: ['解约金战神', '过程论', '高额学费收割机']
  },
  {
    id: 'dimatteo',
    code: 'DIMATTEO',
    nickname: '玄学大师',
    prototype: 'Roberto Di Matteo',
    rarity: 'common',
    dimensions: { AGG: 4, MEN: 8, HUS: 5, TEC: 4, CLU: 18, PRE: 6, DUR: 5, FLA: 5 },
    tagline: '临时工的最高境界，就是干掉正式工并顺手拿走奖杯。',
    description: '你深谙“科学的尽头是神学”这一真理。你不需要向球员解释战术，你只需要给他们开光。你成功地把斯坦福桥的坚韧转化成了慕尼黑夜晚的奇迹。那一晚，你不仅带走了欧冠奖杯，还带走了全欧洲主帅积累了一辈子的运气。你不需要什么长远规划，因为你出场即巅峰，巅峰即永恒。',
    tags: ['最强临时工', '天选之人', '老男孩领路人']
  },
  {
    id: 'cech',
    code: 'CECH',
    nickname: '架子鼓达人',
    prototype: 'Petr Cech',
    rarity: 'common',
    dimensions: { AGG: 4, MEN: 15, HUS: 6, TEC: 8, CLU: 10, PRE: 8, DUR: 16, FLA: 2 },
    tagline: '球门、冰球门、架子鼓，只要有门和节奏的地方，我就是神。',
    description: '你是足球界最好的鼓手，也是架子鼓界最好的守门员。你把防守看作一场精密计算的交响乐，对方前锋的每一次起脚都在你的节拍器预判之中。即便离开了足球场，你也要去冰场上继续享受那种“让对手吃闭门羹”的快感。你不需要华丽的扑救动作来抢镜，因为你只要戴着那个头盔往门前一站，对方就已经开始怀疑人生了。',
    tags: ['单赛季只丢15球', '被足球耽误的鼓手', '自带坦克装备']
  },
  {
    id: 'schurrle',
    code: 'SCHURRLE',
    nickname: '登山者',
    prototype: 'Andre Schurrle',
    rarity: 'common',
    dimensions: { AGG: 6, MEN: 8, HUS: 12, TEC: 7, CLU: 12, PRE: 4, DUR: 6, FLA: 5 },
    tagline: '球场太热，我先去零下二十度的雪山冷静一下。',
    description: '你是职场中那个最先悟透“内卷无意义”的精英。当别人还在为了合同拉扯时，你已经背上登山包去寻找生命的真谛了。你快如闪电，不仅是在说你的底线突破，更是在说你离开足球圈的速度。你证明了：只要跑得够快，生活的琐事就追不上你。',
    tags: ['许三多', '超级替补', '反卷第一人']
  },
  {
    id: 'terry',
    code: 'TERRY',
    nickname: '铁血队长',
    prototype: 'John Terry',
    rarity: 'common',
    dimensions: { AGG: 12, MEN: 16, HUS: 10, TEC: 4, CLU: 10, PRE: 15, DUR: 14, FLA: 1 },
    tagline: '在禁区里，我的头骨硬度仅次于斯坦福桥的横梁。',
    description: '你就是切尔西的化身，你的字典里没有“退后”，只有“拿命顶上”。你是防线上最稳固的移动长城，也是点球点上最悲情的雨中背影。但这一切都不重要，因为你用二十年的忠诚证明了：只要换上那套全套蓝军战袍，无论场上场下，你永远是那个举起奖杯的“Captain, Leader, Legend”（哦，还有，离你队友的家属远一点）。',
    tags: ['禁区铁头功', '莫斯科不信眼泪', '护腿板收集者']
  },
  {
    id: 'fabregas',
    code: 'FABREGAS',
    nickname: '魔术师',
    prototype: 'Cesc Fabregas',
    rarity: 'common',
    dimensions: { AGG: 1, MEN: 6, HUS: 2, TEC: 16, CLU: 10, PRE: 8, DUR: 5, FLA: 14 },
    tagline: '如果我的传球没穿透防线，那我就往教练脸上扔披萨。',
    description: '你是精准度的化身，无论是在 40 码外找迭戈·科斯塔，还是在球员通道精准命中弗格森的脸，你从未失手。你是前锋梦寐以求的“保姆”。你喂出的饼不仅温度适宜，甚至还贴心地去掉了边角料。你是那种能在散步时顺便拿走助攻王奖杯的天才，顺便还要嘲笑一下那些跑了 12 公里却连球都没碰到的队友。',
    tags: ['40码GPS', '披萨投弹手', '顶级喂饼匠']
  },
  {
    id: 'azpilicueta',
    code: 'AZPILICUETA',
    nickname: '疯狂的戴夫',
    prototype: 'César Azpilicueta',
    rarity: 'common',
    dimensions: { AGG: 8, MEN: 12, HUS: 14, TEC: 6, CLU: 6, PRE: 8, DUR: 16, FLA: 2 },
    tagline: '别研究战术了，直接给我首发十一个Dave。',
    description: '你是蓝桥最强“一块砖”，哪里需要往哪搬。不管是左后卫、右后卫还是中后卫，你都能完成得像机器人一样精准。你的名字发音对英国人来说太难，所以你大方地接受了那个像邻居大叔一样的外号。你外表儒雅随和，防守时却像个疯子。你是整条防线的“爹”，不仅要负责防守，还要负责给那些身价上亿却不爱防守的队友补位。',
    tags: ['耐磨100%', '补位综合症', '必胜定律：DAVE x11']
  },
  {
    id: 'sterling',
    code: 'STERLING',
    nickname: '快乐男孩',
    prototype: 'Raheem Sterling',
    rarity: 'common',
    dimensions: { AGG: 5, MEN: 5, HUS: 12, TEC: 8, CLU: 1, PRE: 5, DUR: 8, FLA: 14 },
    tagline: '进球只是意外，快乐才是永恒。',
    description: '你是绿茵场上的“自由灵魂”，主打一个“过人如麻，射门随缘”。你拥有英超最迷人的翘臀和最抽象的临门一脚，总能在晃过守门员后，优雅地把球传给场边的摄影师。你不在乎由于“快乐”而被做成表情包，因为在这个功利的足球世界里，只有你还在坚持用空门不进的方式，守护着那份最原始的幽默感。',
    tags: ['快乐足球代言人', '霸王龙跑姿', '单刀思考者']
  },
  {
    id: 'drogba',
    code: 'DROGBA',
    nickname: '非洲刘德华',
    prototype: 'Didier Drogba',
    rarity: 'common',
    dimensions: { AGG: 14, MEN: 12, HUS: 8, TEC: 6, CLU: 16, PRE: 14, DUR: 8, FLA: 6 },
    tagline: '如果你觉得撞不动我，那是正常的，因为我背上还挂着两个你的队友。',
    description: '你的足球风格充满了原始的暴力美学。你只需要把对方后卫像拎小鸡一样挂在背上，然后带着他们一起把球送进网窝。你是那个让全英超后卫都得买高额保险的男人，也是那个能在泥地里跳舞的非洲雄狮。你是斯坦福桥专为大场面而生的重型武器。你拥有毁灭性的对抗力量，却长了一张足以在科特迪瓦竞选总统的明星脸。',
    tags: ['三道杠草皮质检员', '大场面先生', '人形坦克']
  },
  {
    id: 'mata',
    code: 'MATA',
    nickname: '日记博主',
    prototype: 'Juan Mata',
    rarity: 'common',
    dimensions: { AGG: 1, MEN: 8, HUS: 5, TEC: 14, CLU: 7, PRE: 5, DUR: 6, FLA: 12 },
    tagline: '足球是粗鲁的对抗，但我的停球和博文永远体面。',
    description: '你是全英超防守球员最头疼的“慢节奏大师”，也是切尔西官方编辑部最喜欢的“编外主笔”。你用实际行动证明了：不会写日记的顶级中场不是好酒友。你的直塞球带有自动导航功能，而你的文字带有自动治愈功能。哪怕在场上遭遇了不公，你也会选择在周一的博客里优雅地表达不满，顺便再给全世界送上一万个“Abrazos”，让原本想喷人的球迷瞬间原地消气。',
    tags: ['红酒蜀黍', '文艺中场', '博客小王子']
  },
  {
    id: 'enzo',
    code: 'ENZO',
    nickname: '亿元giegie',
    prototype: 'Enzo Fernandez',
    rarity: 'common',
    dimensions: { AGG: 4, MEN: 7, HUS: 5, TEC: 12, CLU: 6, PRE: 10, DUR: 8, FLA: 12 },
    tagline: '如果你觉得我表现不好，我就把世界杯奖牌拿出来再擦一遍。',
    description: '你是伯利亲手买回来的“顶级奢侈品”，享受着全队最高的曝光度和最长的饭票；也是本菲卡主席鲁伊·科斯塔这辈子最想拉黑的男人。的人生主打一个“熬”，哪怕场上被嘘、场下被喷，只要看一眼合同上的到期日期，你就能继续保持那份淡定的微笑。你是那种能让主帅头秃、让老板心碎、却让经纪人笑醒的奇男子。你不需要向任何人证明自己，因为只要伯利还没还清分期付款，你就是这里永远的 VIP。',
    tags: ['长期饭票持有者', '2031钉子户', '长传发烧友']
  },

  // ─────────────────────────────────────────
  // 里模式角色 Inner (8人) — 维度全 0，由里模式答题解锁
  // ─────────────────────────────────────────
  {
    id: 'kante',
    code: 'KANTE',
    nickname: '老千',
    prototype: "N'Golo Kanté",
    rarity: 'inner',
    dimensions: { AGG: 0, MEN: 0, HUS: 0, TEC: 0, CLU: 0, PRE: 0, DUR: 0, FLA: 0 },
    tagline: '地球上 71% 是水，剩下那点儿归我管。',
    description: '你是足坛唯一能让对手被抢断后还想找你合影的男人，科学家至今无法解释你的体能来源。你拥有最残暴的覆盖范围和最温良的社交面孔，这种极致的反差让你成了蓝桥的真核。你从不换车，从不发火，甚至在被队友拆穿“打牌老千”的身份时，也只是羞涩地承认自己只是想赢。毕竟，连地球都挡不住你，区区一副牌又算得了什么？',
    tags: ['过不去的坎', '全网好感度100%', '地球覆盖者']
  },
  {
    id: 'hazard',
    code: 'HAZARD',
    nickname: '汉堡王',
    prototype: 'Eden Hazard',
    rarity: 'inner',
    dimensions: { AGG: 0, MEN: 0, HUS: 0, TEC: 0, CLU: 0, PRE: 0, DUR: 0, FLA: 0 },
    tagline: '如果汗水能换来进球，那汉堡一定能换来快乐。',
    description: '你完美诠释了什么叫“出道即巅峰，满级就下号”。你用实际行动证明了：与其去伯纳乌追梦，不如在伦敦多吃两个香辣鸡腿堡。在别人为了金球奖卷生卷死时，你只关心赛后的更衣室有没有热腾腾的汉堡。你不训练、不自律，甚至带着大肚腩回到训练场，却依然能靠着那全英超最稳的”底盘“和无解的天赋，把对方防线过成凌晨四点的马路。',
    tags: ['汉堡质检员', '天赋型摆烂', '翘臀防御系统']
  },
  {
    id: 'lampard',
    code: 'LAMPARD',
    nickname: '灯神',
    prototype: 'Frank Lampard',
    rarity: 'inner',
    dimensions: { AGG: 0, MEN: 0, HUS: 0, TEC: 0, CLU: 0, PRE: 0, DUR: 0, FLA: 0 },
    tagline: '智商高确实可以为所欲为，比如在中场抢前锋的饭碗。',
    description: '你是精英主义与铁血精神的终极缝合怪。拥有能碾压大多数人的精英大脑，却偏要干最累的活，在每一个禁区边缘完成逻辑闭环。你是主教练最不需要操心的资产，是对手最无法防御的“幽灵中场”。你从不迷信运气，因为在别人眼里的乱战折射，在你脑中不过是早已提前锁死死角的几何级数轨迹。',
    tags: ['全能B2B鼻祖', '高智商中场', '铁人劳模']
  },
  {
    id: 'werner',
    code: 'WERNER',
    nickname: '金色侦察机',
    prototype: 'Timo Werner',
    rarity: 'inner',
    dimensions: { AGG: 0, MEN: 0, HUS: 0, TEC: 0, CLU: 0, PRE: 0, DUR: 0, FLA: 0 },
    tagline: '我没有越位，我只是比球更早抵达现场。',
    description: '你是斯坦福桥首席“侦察兵”，用双脚精准丈量了每一寸越位线的宽度。你拥有瞬间直线超车的爆发力，却在面对空门时展现出圣人般的慈悲。你是让 VAR 裁判集体加班的男人，职业生涯的一半时间都定格在越位回放的帧数里。虽然你的射门像是在抽盲盒，但你那股踢丢后立刻回追 50 米防守的狠劲，让所有想黑你的人都只能含泪感叹：他真的，我哭死。',
    tags: ['VAR唯一指定受害者', '越位线舞者', '直线加速王中王']
  },
  {
    id: 'costa',
    code: 'COSTA',
    nickname: '盛世美颜',
    prototype: 'Diego Costa',
    rarity: 'inner',
    dimensions: { AGG: 0, MEN: 0, HUS: 0, TEC: 0, CLU: 0, PRE: 0, DUR: 0, FLA: 0 },
    tagline: '禁区里只有两种人：被我美色迷晕的，和被我撞飞的。',
    description: '你完美诠释了什么叫“明明可以靠颜值，却偏要靠武力”。冲突不是你的负担，而是你的燃油；如果你没在和对方后卫摔跤，那你一定是在去摔跤的路上。你拥有 30 岁的外表和 50 岁的履历，却带着 18 岁的暴脾气。你不需要优雅的过人，你只需要用身体撞开一条路。你是所有主教练梦寐以求的“反派英雄”，只要你在场上，斯坦福桥就永远充满了火药味和那种让人肾上腺素飙升的、野蛮的胜利逻辑。',
    tags: ['搞心态大师', 'DC大帝', '野兽派前锋']
  },
  {
    id: 'palmer',
    code: 'PALMER',
    nickname: '糖系青年',
    prototype: 'Cole Palmer',
    rarity: 'inner',
    dimensions: { AGG: 0, MEN: 0, HUS: 0, TEC: 0, CLU: 0, PRE: 0, DUR: 0, FLA: 0 },
    tagline: '先装糖骗他，再冰冷终结。',
    description: '你是瓜迪奥拉这辈子最想退货的“顶级二手工”，也是伯利乱买计划里唯一的奇迹。你是那种专门为大场面而生的“补时战神”。每当斯坦福桥的观众准备关掉电视、主教练准备写辞职信时，你就会从”冷气“中走出来，用一记搓射或点球把所有人从ICU里拉回来。你不需要向任何人证明你比那群亿元先生更强，因为比分牌和积分榜会替你告诉全世界：谁才是这里唯一的真大腿。',
    tags: ['半冰半糖', '十二码核爆', '冷']
  },
  {
    id: 'ivanovic',
    code: 'IVAN',
    nickname: '恐怖片导演',
    prototype: 'ivanovic',
    rarity: 'inner',
    dimensions: { AGG: 0, MEN: 0, HUS: 0, TEC: 0, CLU: 0, PRE: 0, DUR: 0, FLA: 0 },
    tagline: '导演还没进球呢，谁也不许杀青',
    description: '你是 90 分钟恐怖片的首席导演，擅长处理各种“片场意外”——比如被利物浦的前锋咬上一口。这种级别的疼痛甚至无法让你皱眉，因为你正忙着在补时阶段剪辑对手的死期。真正的绝杀永远藏在最后一格胶片里。你用全英超最扎实的底盘对抗世界，又在最黑暗的时刻用那副巨大的躯干撞碎防线。当你出现在对方小禁区的那一刻，对手的剧本就已经被无情撕毁。',
    tags: ['黑色90+', '窒息彩蛋', '影院级绝杀']
  },
  {
    id: 'lukaku',
    code: 'LUKAKU',
    nickname: '煲汤达人',
    prototype: 'lukaku',
    rarity: 'inner',
    dimensions: { AGG: 0, MEN: 0, HUS: 0, TEC: 0, CLU: 0, PRE: 0, DUR: 0, FLA: 0 },
    tagline: '球在我五米开外，但我的大拇指永远在你面前。',
    description: '你是“停球即乌龙助攻”流派的开山祖师，也是禁区内最不安分的顶级大厨。当你使出那记招牌“趟球过人”，整条防线便被迫加入了一场名为“煲汤”的生死时速。你从不在意传球是否到位，因为你总能用一次毫无道理的强行超车，把战术板撞成废纸，再顺便给看台送去一个充满爱意的点赞。你不是在踢球，你是在用 200 斤的吨位和 35km/h 的时速，强行给对手喂下一口滚烫的“绝望浓汤”。',
    tags: ['杵桩王', '停球五米', '点赞狂魔', '']
  },

  // ─────────────────────────────────────────
  // 神级角色 God (2人)
  // ─────────────────────────────────────────
  {
    id: 'abramovich',
    code: 'ROMAN',
    nickname: '俄罗斯寡头',
    prototype: 'Roman Abramovich',
    rarity: 'god',
    dimensions: { AGG: 10, MEN: 10, HUS: 10, TEC: 10, CLU: 10, PRE: 10, DUR: 10, FLA: 10 },
    tagline: '如果金钱买不到快乐，那一定是因为你买的顶级球星还不够多。',
    description: '你是足球史上最优雅的“破坏者”，开创了那个让老牌豪门颤抖的金元时代。你相信只要支票够厚，逻辑就能重构；只要爱得够深，奇迹就能买断。你用二十年的时间证明了，金钱如果带有灵魂，就能变成最坚固的冠军奖杯。你习惯坐在包厢里，像个初恋的孩子一样为进球欢呼。当你离开时，你带走了一个时代，却把所有的偏爱和那座奖杯堆满的博物馆，留给了每一个流着蓝色血液的人。',
    tags: ['游艇大亨', '金元足球创始人', '教练终结者']
  },
  {
    id: 'trump',
    code: 'TRUMP',
    nickname: '赢学家',
    prototype: 'Donald Trump',
    rarity: 'god',
    dimensions: { AGG: 10, MEN: 10, HUS: 10, TEC: 10, CLU: 10, PRE: 10, DUR: 10, FLA: 10 },
    tagline: '没有人比我更懂切尔西，我说我们会赢，那就是赢麻了。',
    description: '你的词典里只有赢。你是规则的破坏者，也是舞台的中心。你不需要逻辑，因为你本身就是最大的逻辑。你坚信如果奖杯不是金色的，那它就配不上切尔西，所有说切尔西陷入困境的报道都是FAKE NEWS。你不需要战术，你只需要指着金灿灿的世俱杯奖章说：看，没人比我更懂登顶世界之巅。“Make Chelsea Great Again！”',
    tags: ['MCGA', '赢麻了', '懂王']
  }
];
