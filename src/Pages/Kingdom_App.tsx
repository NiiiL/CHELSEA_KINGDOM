/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Globe, Download, Shuffle, ArrowDownAZ, LayoutGrid, ChevronDown } from "lucide-react";
import html2canvas from "html2canvas";

const PLAYERS = [
    { id: "A1", country: "Albania", cn: "阿尔巴尼亚", firstName: "ARMANDO", player: "BROJA", concept: "Skanderbeg Hero", conceptCN: "斯坎德培民族英雄", color: "#B87878", accent: "#17202A", cName: "Balkan Rose", cNameCN: "巴尔干玫瑰", apps: 38, goals: 3, yrs: "2020-24", pos: "FW", alts: [], hasImg: true, bgImg: "https://picsum.photos/seed/broja/400/400", colorSourceImg: "https://picsum.photos/seed/albania-rose/600/400", desc: "Known as the 'Land of the Eagles,' Albania's national spirit is etched with 'resilience' and 'resistance.' The spirit of national hero Skanderbeg is not merely a historical footnote — it is the absolute totem of defiance and homeland protection in the hearts of a new generation.", descCN: "被誉为「山鹰之国」的阿尔巴尼亚，其民族灵魂深处烙印着「坚韧」与「抵抗」。民族英雄斯坎德培的精神不仅是历史的注脚，更是当代青年心中永不屈服、守卫家园的绝对图腾。", colorInspiration: "This dried-rose hue symbolizes the lingering warmth of heroic deeds frozen in history — less brazen than vivid red, it lends the image a sophisticated and deeply narrative quality.", colorInspirationCN: "这种干燥玫瑰色象征英雄事迹凝固后的历史余温，不同于鲜红的张扬，赋予画面一种高级且深沉的叙事感。", clothing: "The iconic Skanderbeg helmet (crowned with a golden goat's head) paired with a red velvet noble's robe. The goat's head symbolizes military genius, presenting Broja as a national warrior standing firm on the battlefield.", clothingCN: "标志性的斯坎德培头盔（顶部带有金色山羊头）与红色丝绒贵族袍。山羊头象征着军事天才，使布罗亚呈现出一种横刀立马的「民族战士」姿态。", texture: "The double-headed eagle totem and Serma gold-thread embroidery. Intricate heavy-stitch goldwork blends Byzantine and Ottoman folk art, projecting an imperial sense of weight against a deep crimson backdrop.", textureCN: "双头鹰图腾与 Serma 金线刺绣。繁复的重工金线融合了拜占庭与奥斯曼时期的民间艺术元素，在暗红色背景下彰显出皇室级的厚重感。", hasCopy: true, dotColor: "#e41e20ff" },
    { id: "A2", country: "Argentina", cn: "阿根廷", firstName: "ENZO", player: "FERNÁNDEZ", concept: "Gaucho Leader", conceptCN: "高乔领袖", color: "#A8C8E8", accent: "#FDFEFE", cName: "Pampas Blue", cNameCN: "潘帕斯天蓝", apps: 120, goals: 12, yrs: "2023-", pos: "MF", alts: [], hasImg: true, bgImg: "https://picsum.photos/seed/enzo/400/400", colorSourceImg: "https://picsum.photos/seed/argentina-sky/600/400", desc: "Argentina is a massive South American nation with terrain encompassing Andes mountains, glacial lakes and Pampas grassland. 'Pampas Blue' reflects the clear skies over the vast Pampas and the iconic light blue of the national flag.", descCN: "阿根廷是一个巨大的南美洲国家，地形包括安第斯山脉、冰川湖泊和潘帕斯草原。“潘帕斯天蓝”反映了广阔潘帕斯草原上空晴朗的天空以及国旗标志性的浅蓝色。", dotColor: "#52afe0ff" },
    { id: "A3", country: "Australia", cn: "澳大利亚", firstName: "MARK", player: "SCHWARZER", concept: "Southern Cross Guardian", conceptCN: "南十字守护者", color: "#C49858", accent: "#229954", cName: "Outback Ochre", cNameCN: "红土赭", apps: 12, goals: 0, yrs: "2013-15", pos: "GK", alts: [], hasImg: true, desc: "Australia is a vast, ancient continent defined by the rugged beauty of the Outback and the guiding stars of the Southern Cross. Its heritage is a blend of pioneering spirit and a deep connection to a landscape that is as harsh as it is breathtaking.", descCN: "澳大利亚是一片辽阔而古老的大陆，以荒野原野（Outback）的崎岖美感和南十字星的指引为核心。其文化遗产融合了开拓精神，以及与这片既严酷又壮丽的土地之间深厚的联系。", colorInspiration: "Inspired by the iconic red soil of the Australian Red Center and the sun-scorched earth of the Outback. This 'Outback Ochre' represents the raw, enduring power of the continent's heartland.", colorInspirationCN: "这种“红土赭”灵感源自澳大利亚红土中心标志性的红色土壤与荒野被烈日灼烧的大地。它代表了这片大陆腹地原始而持久的力量感。", clothing: "Plate armor forged in sun-drenched bronze and ochre tones, featuring the stars of the Southern Cross and engravings of the Golden Wattle—Australia's national floral emblem.", clothingCN: "身披由沐浴阳光的青铜与赭石色锻造的板甲，盔甲上镶嵌着南十字星座的星辰，并刻有澳大利亚国花——金合欢（Golden Wattle）的枝叶纹样。", texture: "Features detailed engravings of Golden Wattle branches and the celestial alignment of the Southern Cross, symbolizing the eternal watch over the southern continent.", textureCN: "纹理包含金合欢枝叶的细腻雕刻与南十字星座的星象排列，象征着对南方大陆永恒的守望。", hasCopy: true, dotColor: "#012480ff" },
    { id: "A4", country: "Belgium", cn: "比利时", firstName: "EDEN", player: "HAZARD", concept: "Saxe-Coburg Duke", conceptCN: "萨克森-科堡公爵", color: "#937060", accent: "#423F3E", cName: "Chocolate", cNameCN: "巧克力棕", apps: 352, goals: 110, yrs: "2012-19", pos: "FW", alts: [], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#ffdf00ff" },
    { id: "A5", country: "Bosnia", cn: "波黑", firstName: "ASMIR", player: "BEGOVIĆ", concept: "Ottoman Noble", conceptCN: "奥斯曼贵族", color: "#8898B8", accent: "#F1C40F", cName: "Sarajevo Blue", cNameCN: "萨拉热窝蓝", apps: 33, goals: 0, yrs: "2015-17", pos: "GK", alts: [], hasImg: true, desc: "Bosnia is the meeting point of Eastern and Western civilizations, where Ottoman heritage and Balkan determination intertwine deeply. The minarets of Sarajevo and mountain mist have cultivated a national character of composure, restraint, and profound tolerance — the spirit of a true guardian.", descCN: "波黑是东西方文明的交汇之窗，奥斯曼遗风与巴尔干意志在这里深度交融。萨拉热窝的塔楼与深山薄雾共同孕育了其国民沉稳、内敛且极具包容性的守望者性格。", colorInspiration: "Drawn from the morning mist of Bosnia's mountain highlands, this composed grey-blue symbolizes the deep historical roots of the Balkans and the vast, quiet resilience of its people.", colorInspirationCN: "源自波黑山区清晨的薄雾，这种冷静的灰蓝色调象征着巴尔干半岛深邃的历史底蕴与博大而静谧的民族性格。", clothing: "A classic Ottoman-style noble's kaftan paired with an elaborate turban adorned with a crescent crest. This attire pays homage to Bosnia's multicultural history while giving the goalkeeper the commanding presence of a sage-like leader.", clothingCN: "采用了经典的奥斯曼风格贵族长袍（Kaftan），搭配饰有半月纹章的华丽头巾。这种装束不仅致敬了其多元文化历史，也赋予了门将一种如智者般的领袖气场。", texture: "Delicate Islamic arabesque patterns with gold-thread highlights. The flowing lines symbolize quiet, steadfast order persisting through turbulent history — a visually sacred decorative beauty.", textureCN: "细密的伊斯兰蔓草纹（Arabesque）与局部金线勾勒。流动的线条象征着在动荡历史中依然静谧守望的生命秩序，在视觉上呈现出一种神圣的装饰美感。", hasCopy: true, dotColor: "#2c3982ff" },
    { id: "A6", country: "Brazil", cn: "巴西", firstName: "THIAGO", player: "SILVA", concept: "Amazon Chief", conceptCN: "亚马逊领袖", color: "#88BE70", accent: "#F4D35E", cName: "Amazon Green", cNameCN: "亚马逊绿", apps: 155, goals: 9, yrs: "2020-24", pos: "DF", alts: [], hasImg: true, desc: "Brazil is the tropical heart of the world, home to the vast Amazon rainforest and a spirit as vibrant as the carnival. It is a land where ancient indigenous wisdom meets a rhythm that pulses through every coastline and jungle path.", descCN: "巴西是全球的热带心脏，拥有辽阔的亚马逊雨林和如狂欢节般灿烂的民族精神。在这片土地上，古老的原住民智慧与律动交织，回荡在每一条海岸线与丛林小径之中。", colorInspiration: "A deep, leafy green representing the 'Lungs of the Planet.' This 'Amazon Green' evokes the dense canopy of the rainforest and the primal energy of South America's untamed nature.", colorInspirationCN: "这种深邃的叶绿色代表了“地球之肺”。这种“亚马逊绿”勾勒出雨林浓密的林冠，以及南美洲荒野中原始且不羁的力量感。", clothing: "A magnificent indigenous headdress (Cocar) made of multi-colored feathers, paired with a jaguar-skin shoulder mantle and ancestral tribal body paint representing the warrior spirit.", clothingCN: "头戴一顶由五彩羽毛制成的华丽原住民头饰（Cocar），身披美洲豹皮肩甲，并涂有代表战士精神的祖传部落彩绘。", texture: "Features the raw texture of jaguar fur and layered parrot feathers, combined with geometric Tupi-Guarani body art patterns that signify strength and protection.", textureCN: "纹理展现了美洲豹毛皮的原始质感与鹦鹉羽毛的层叠感，并结合了象征力量与庇护的图皮-瓜拉尼（Tupi-Guarani）几何纹身图案。", hasCopy: true, dotColor: "#009c3bff" },
    { id: "A7", country: "Burkina Faso", cn: "布基纳法索", player: "B. TRAORÉ", concept: "Mossi King", conceptCN: "莫西族王", color: "#C8A898", accent: "#922B21", cName: "Sahel Sand", cNameCN: "萨赫勒沙粉", apps: 16, goals: 2, yrs: "2014-17", pos: "FW", alts: [], hasImg: true, desc: "The 'Land of Incorruptible People' in the heart of the Sahel. Burkina Faso possesses the endurance of the sun-baked earth and the dignity of ancient Mossi traditions. It is a nation of unwavering resilience, standing proud in the vast Sahelian plains.", descCN: "布基纳法索坐落于萨赫勒荒原腹地。这片「正直者之乡」的人民拥有如烈日炙烤红土般的坚韧，与莫西族古老传统的尊严。这是一个在广阔萨赫勒平原上傲然屹立、绝不屈服的国度。", colorInspiration: "Sahel Sand mirrors the sun-baked clay of the Sahel landscape, representing the enduring spirit and grounded nature of the Burkinabé people.", colorInspirationCN: "源自被烈日炙烤的红土质感，这种沙粉色调象征着部族顽强的生命力以及对大地的深沉眷恋。", clothing: "A traditional Mossi grand boubou with a decorative Kufi hat, reflecting the cultural dignity and stature of the Mossi people within the Sahel.", clothingCN: "萨赫勒式刺绣大袍（Grand Boubou）搭配装饰性的库非帽（Kufi）。这种装束展现了莫西人特有的文化尊严与庄重感。", texture: "Geometric patterns that symbolize ancestral order and deep reverence for the earth, manifesting communal harmony and sacred connection.", textureCN: "交织的几何图腾。这些纹样代表了莫西文化（Mossi）对祖先秩序的遵循以及对自然秩序的尊崇。", hasCopy: true, dotColor: "#f02a2fff" },
    { id: "B1", country: "Cameroon", cn: "喀麦隆", firstName: "SAMUEL", player: "ETO'O", concept: "Bamoun King", conceptCN: "巴蒙王", color: "#68A468", accent: "#196F3D", cName: "Rainforest", cNameCN: "雨林绿", apps: 35, goals: 12, yrs: "2013-14", pos: "FW", alts: [], hasImg: true, desc: "Often called 'Africa in Miniature,' Cameroon is a land of vast rainforests and diverse ethnic heritage. The Bamoun Kingdom represents a pinnacle of its royal history, where intricate craftsmanship and ancestral reverence form the bedrock of national identity.", descCN: "喀麦隆常被称为“微缩非洲”，是一片拥有广袤雨林和多元民族遗产的土地。巴蒙王国代表了其王室历史的巅峰，精湛的工艺与对祖先的崇敬构成了民族认同的基石。", colorInspiration: "Inspired by the lush, humid canopy of the Congo Basin rainforests. This 'Rainforest' green represents the dense vitality of the equatorial landscape and the enduring roots of the African heartland.", colorInspirationCN: "这种“雨林绿”灵感源自刚果盆地雨林茂密湿润的林冠。它代表了赤道景观浓郁的生命力，以及非洲腹地深厚的文化根基。", clothing: "A royal Bamoun ensemble featuring a beaded crown and a high-collared robe, traditionally adorned with vibrant patterns that signify lineage and status.", clothingCN: "一套奢华的巴蒙王室装束，包含一顶精美珠饰王冠和一件高领袍服，传统上饰有象征血统与地位的鲜艳纹样。", texture: "Intricate beadwork patterns and animal motifs, reflecting the artistic heritage of the western grasslands and the symbolic language of Bamoun royalty.", textureCN: "纹理包含复杂的珠饰图案与动物图腾，反映了西部草原的艺术遗产以及巴蒙王室的象征性语言。", hasCopy: true, dotColor: "#007a5eff" },
    { id: "B2", country: "Canada", cn: "加拿大", player: "FORREST", concept: "Northern King", conceptCN: "北境之王", color: "#D09070", accent: "#F4F6F7", cName: "Maple Orange", cNameCN: "枫叶橙红", apps: 3, goals: 0, yrs: "1996-97", pos: "MF", alts: [], hasImg: true, desc: "Canada — the Great White North — is defined by the conquest of vast wilderness and the steadfast maintenance of civilized order. Preserving the disciplined traditions of the Commonwealth while embracing the expansive spirit born of coexistence with glaciers and forests — pure and boundless.", descCN: "「大白北之地」加拿大，其精神核心在于对广袤荒野的征服与对文明秩序的坚守。这里既保留了英联邦的严谨传统，也拥有与冰原、森林共生的旷达性格，纯粹而宽广。", colorInspiration: "Inspired by the rich terracotta hue of maple forests just before they turn crimson — a blend of earth and woodland that conveys the vast vitality and warm spirit of the North American continent.", colorInspirationCN: "灵感源自秋季枫林转红前，那抹融合了大地与森林的陶土色。它传达出北美大陆广袤的生命力与特有的温厚情怀。", clothing: "Royal ceremonial robes fused with Arctic elements — the iconic maple leaf crown paired with a heavy snow-country fur mantle, projecting the unique authority of a northern lord and mastery over the harshest environments.", clothingCN: "结合了北极圈元素的王室礼服。标志性的枫叶王冠与厚重的雪地皮草披肩相称，展现出一种北方领主独有的威严与对极寒环境的掌控力。", texture: "Recurring heraldic maple leaf motifs woven throughout the crown and chest piece. Each leaf transformed into a coat-of-arms emblem — symbolizing an eternal flame of national spirit that will never be extinguished on this frozen land.", textureCN: "王冠与胸饰中反复出现的枫叶几何变体。每一片枫叶都经过了徽章化的艺术处理，象征着在这片冰封土地上永不熄灭的民族生命火焰。", hasCopy: true, dotColor: "#ff0000ff" },
    { id: "B3", country: "Colombia", cn: "哥伦比亚", firstName: "RADAMEL", player: "FALCAO", concept: "Muisca Sun Chief", conceptCN: "穆伊斯卡太阳酋长", color: "#D8C858", accent: "#5B2C6F", cName: "El Dorado Gold", cNameCN: "黄金国金", apps: 12, goals: 1, yrs: "2015-16", pos: "FW", alts: [], hasImg: true, desc: "Colombia is the mythic land of 'El Dorado,' where the Andean highlands meet tropical coasts and the Amazonian rainforest. Its heritage is a dazzling tapestry of pre-Columbian gold-working civilizations and a vibrant, indomitable mestizo spirit.", descCN: "哥伦比亚是神话中“黄金国”的所在地，安第斯高地在此与热带海岸和亚马逊雨林相交汇。其遗产是一幅由前哥伦布时期的黄金文明以及充满活力、不屈不挠的麦士蒂索精神编织而成的绚丽图卷。", colorInspiration: "A brilliant, sun-drenched gold inspired by the legend of El Dorado and the sacred artifacts of the Muisca people. It symbolizes the spiritual sun and the immense natural wealth of the South American continent.", colorInspirationCN: "这种明亮且充满阳光感的金色灵感源自“黄金国”的传说与穆伊斯卡（Muisca）民族的神圣文物。它象征着精神层面的太阳，以及南美大陆巨大的自然财富。", clothing: "An elaborate golden pectoral and shoulder mantle inspired by Muisca gold-work, featuring emerald-encrusted ornaments and a feathered crown that represents the king of the Andean peaks.", clothingCN: "一件灵感源自穆伊斯卡金工艺术的精美黄金胸饰与肩甲，镶嵌着祖母绿饰品，并配以象征安第斯山巅之王的羽毛冠冕。", texture: "Intricate pre-Columbian sun disks, jaguar motifs, and high-relief gold engravings, symbolizing the fusion of solar power and the raw strength of the tropical predators.", textureCN: "纹理包含复杂的前哥伦布太阳圆盘、美洲豹图腾以及高浮雕黄金雕刻，象征着太阳能量与热带掠食者原始力量的融合。", hasCopy: true, dotColor: "#fcd116ff" }, { id: "B4", country: "IvoryCoast", cn: "科特迪瓦", player: "D. DROGBA", concept: "Akan King", conceptCN: "阿坎族王", color: "#E3D1C1", accent: "#F18E1C", cName: "Savannah Ivory", cNameCN: "稀树草原象牙白", apps: 381, goals: 164, yrs: "2004-12, 14-15", pos: "FW", alts: ["African Andy Lau"], hasImg: true, desc: "A symbol of West African strength, Côte d'Ivoire thrives on Akan culture and the power of its legendary leaders. This is a land of vibrant traditions, where the courage of warriors meets the wisdom of kings, creating an eternal legacy of resilience.", descCN: "科特迪瓦是西非力量的象征。阿坎文化与传奇领袖的力量在这里交相辉映。这是一个充满活力的传统之地，战士的勇气与国王的智慧在这里相遇，铸就了永恒的坚韧传奇。", colorInspiration: "Inspired by the vast savannahs and serene lagoons of the Ivory Coast, this ivory-white symbolizes noble heritage and the tranquil prosperity of West Africa.", colorInspirationCN: "源自科特迪瓦广袤的稀树草原与宁静的潟湖，这种象牙白色调象征着西非大地的富庶、高贵与纯洁。", clothing: "Noble Akan Kente cloth with a crown of Adinkra symbols. The Kente cloth, draped in the traditional Akan manner, represents the wearer's high status and military leadership.", clothingCN: "尊贵的阿坎族肯特织物与饰有阿丁克拉符号的金质王冠。这种传统的斜肩披挂方式彰显了领袖般的威严。", texture: "Complex weaving patterns conveying a legacy of leadership. These intricate designs narrate the epic history of heroic leaders and the enduring strength of the community.", textureCN: "复杂的编织图案。这些纹路不仅是西非纺织艺术的瑰宝，也记录了部族历史中的英雄史诗与领导力传承。", hasCopy: true, dotColor: "#009e60ff" },
    { id: "B5", country: "Croatia", cn: "克罗地亚", firstName: "MATEO", player: "KOVAČIĆ", concept: "Adriatic King", conceptCN: "亚得里亚海之王", color: "#60B8C8", accent: "#EAEDED", cName: "Adriatic Teal", cNameCN: "亚得里亚青", apps: 221, goals: 4, yrs: "2018-23", pos: "MF", alts: [], hasImg: true, desc: "Situated along the Adriatic coast, Croatia boasts thousands of years of maritime history and a resilient Dalmatian spirit. It is a nation that blends Mediterranean elegance with Central European fortitude, possessing a national character of storm-like strength and an absolute pursuit of freedom.", descCN: "座落于亚得里亚海沿岸，克罗地亚拥有数千年的航海历史与坚韧的达尔马提亚精神。这是一个兼具地中海式优雅与中欧式刚毅的国度，其民族性格中自带一种如同风暴般强劲的力量与对自由的绝对追求。", colorInspiration: "Drawn from the crystal-clear waters of the Dalmatian coast and the lucid morning skies, this bright teal symbolizes the unyielding Croatian will and a vigilant outlook on infinite possibilities.", colorInspirationCN: "源自达尔马提亚海岸清澈的海水与清晨明净的天空，这种明亮的青色调象征着克罗地亚式的不屈意志与对无限可能的守望，视觉上干净利落且充满张力。", clothing: "A grand Croatian royal crown encrusted with jewels, paired with the iconic checkered robe (šahovnica). This attire merges aristocratic solemnity with the most recognizable visual symbol of the pitch, projecting a powerful national identity.", clothingCN: "镶嵌大量宝石的克罗地亚皇家冠冕，搭配典型的格纹袍服（shovnica）。这种装束将克罗地亚式的贵族庄重与赛场上的标志性视觉符号相融合，呈现出一种强烈的民族认同感。", texture: "The Croatian chequy (checkerboard) pattern woven into the fabric. More than just a national totem, this red-and-white grid symbolizes the unity of the people and the generational passing of honor.", textureCN: "袍服上的克罗地亚棋盘格（Chequy）。这种红白相间的格纹不仅是国家图腾，也象征着克罗地亚人的团结与对荣耀的代代传承。", hasCopy: true, dotColor: "#181797ff" },
    { id: "B6", country: "Czechia", cn: "捷克", firstName: "PETR", player: "ČECH", concept: "Bohemian King", conceptCN: "波希米亚国王", color: "#788A9F", accent: "#E74C3C", cName: "Bohemian Blue", cNameCN: "波希米亚灰蓝", apps: 494, goals: 0, yrs: "2004-15", pos: "GK", alts: [], hasImg: true, desc: "The heart of Central Europe and the cradle of Bohemian culture. Czechia possesses deep industrial roots and artistic mastery; its national character fuses rational precision with Bohemian romanticism—a land of ancient majesty and modern wisdom.", descCN: "中欧的心脏，波西米亚文化的摇篮。捷克拥有深厚的工业底蕴与艺术造诣，其民族性格融合了理性的精准与波西米亚式的浪漫，是一个兼具古老威严与现代智慧的国度。", colorInspiration: "This muted blue simulates the Vltava River at dusk beneath Prague Castle. Less brazen than vivid blue, it is composed and calm, honoring the profound historical depth and quiet resilience of this territory.", colorInspirationCN: "这种带有灰度的蓝色调模拟了布拉格城堡下，伏尔塔瓦河在黄昏时的水色。它不同于鲜蓝的张扬，更显沉稳、冷静，致敬这片土地深邃的历史底蕴与博大而静谧的民族性格。", clothing: "An incredibly lavish Bohemian royal crown paired with deep blue priestly robes adorned with lion heraldry. This heavy ceremonial dress projects the authority of a king and gives Cech an indestructible, fortress-like presence.", clothingCN: "极其奢华的波西米亚皇家冠冕与饰有狮子纹章的深蓝色祭司袍。这种重装礼服不仅彰显了波西米亚国王的威严，也赋予了门将切赫一种堡垒般不可摧毁的气场。", texture: "Intricate golden lion motifs. This double-tailed lion is not only the national totem but a symbol of the Czech people's steadfast belief in courage and absolute protection.", textureCN: "袍服上繁复的金色狮子纹章。这种双尾狮不仅是国家图腾，也象征着捷克人民对勇气与绝对守卫的坚定信念。", hasCopy: true, dotColor: "#11457eff" },
    { id: "B7", country: "Denmark", cn: "丹麦", player: "GRØNKJÆR", concept: "Viking King", conceptCN: "维京北欧王", color: "#A87075", accent: "#D5DBDB", cName: "Copenhagen", cNameCN: "哥本哈根砖", apps: 119, goals: 11, yrs: "2000-04", pos: "DF", alts: [], hasImg: true, desc: "As Scandinavia's guardian, Denmark is the emblem of ancient Nordic royal power. From the Viking Age that commanded the seas to its modern role as a beacon of minimalism, the Danish character fuses the adventurous blood of pirates with the austere restraint of royalty.", descCN: "作为斯堪的纳维亚的守卫者，丹麦是北欧古老王权的象征。从横行海上的维京时代到现代极简主义的灯塔，其民族性格完美融合了海盗的冒险血脉与皇家的冷峻克制。", colorInspiration: "A polar twilight hue tinged with grey — symbolizing the cold afterglow over the North Atlantic, adding an epic, weighty sense of nostalgia to the image.", colorInspirationCN: "这是一种带有灰度的极地晚霞色，象征着北大西洋海面上冰冷的余晖，为画面平添了一抹史诗般的厚重怀旧感。", clothing: "A silver chainmail bearing the Viking imprint, paired with a rugged fur cloak. A simple geometric crown stripped of excessive jewels — presenting Nordic kingship in its most modern epic form.", clothingCN: "带有维京烙印的银制锁子甲与粗粝的皮草斗篷。简约的几何王冠剔除了繁琐的宝石堆砌，用最干练的线条呈现出北欧王权的现代史诗感。", texture: "Ancient runic inscriptions (Runes) and Norse knotwork etched into clasps and leather straps. These mysterious symbols represent the wisdom passed down through the long polar nights, bestowing the player with a saga-like legendary identity.", textureCN: "饰扣与皮革带上刻有的古老卢恩文字（Runes）与北欧结纹样。这些神秘的符文象征着漫长极夜中传承的智慧，赋予了球员萨迦史诗般的身份背景。", hasCopy: true, dotColor: "#d80027ff" },
    { id: "C1", country: "DR Congo", cn: "刚果金", firstName: "GAËL", player: "KAKUTA", concept: "Congo River King", conceptCN: "刚果河之王", color: "#60A8A8", accent: "#F39C12", cName: "Congo Teal", cNameCN: "刚果河青", apps: 16, goals: 0, yrs: "2009-15", pos: "MF", alts: [], hasImg: true, desc: "Nestled in the heart of Africa, DR Congo possesses the mysterious tribal civilization of the deep rainforest and an art language pulsating with rhythm. This is a multi-ethnic nation brimming with primal vitality and complex historical tension.", descCN: "坐落于非洲心脏的刚果金，拥有雨林深处的神秘部落文明与极具节奏感的艺术语言。这是一个充满原始生命力与复杂历史张力的多民族国度。", colorInspiration: "Drawn from the rushing waters of the deep Congo River, this cool blue-green represents the mysterious yet magnificent primal vitality of rainforest civilization.", colorInspirationCN: "源自刚果河深处奔腾的水色，这种清冷的青绿色调代表了雨林文明神秘而磅礴的原始生命力。", clothing: "A traditional chief's long robe blended with a tribal crown rendered in modern metalwork. This design showcases the unique visual journey of African civilization transitioning from ancient tradition to modern power.", clothingCN: "采用了刚果酋长式的传统长袍，并融合了现代金属加工质感的部族王冠。这种设计展示了非洲文明从古老传统向现代力量过渡的独特视觉景观。", texture: "Geometric reconstructions inspired by Kuba cloth weaving. The mathematically precise arrangements convey a rhythmic pulse — symbolizing the unceasing bloodline of tribal society.", textureCN: "纹路灵感源自库巴织物（Kuba cloth）的几何重构。通过数学般的严谨排列呈现出律动感，象征着部族社会生生不息的血脉脉搏。", hasCopy: true, dotColor: "#007fffff" },
    { id: "C2", country: "Ecuador", cn: "厄瓜多尔", firstName: "MOISÉS", player: "CAICEDO", concept: "Equator Guardian", conceptCN: "赤道守护者", color: "#78A888", accent: "#2E86C1", cName: "Galápagos", cNameCN: "加拉帕戈斯绿", apps: 133, goals: 5, yrs: "2023-", pos: "MF", alts: [], hasImg: true, desc: "Perched on the Equator, Ecuador is a nation of celestial alignment, where the Andean peaks touch the sky. It is the guardian of the Galápagos—a living museum of evolution—and the ancestral home of sun-worshipping civilizations.", descCN: "厄瓜多尔坐落于赤道之上，是一个与天象契合的国家，安第斯山脉在此直指苍穹。它是加拉帕戈斯群岛（进化的活博物馆）的守护者，也是崇拜太阳的古代文明的祖居地。", colorInspiration: "Inspired by the unique coastal flora and the emerald waters of the Galápagos Islands. This desaturated green evokes a sense of ancient biological heritage and the pristine isolation of the Pacific.", colorInspirationCN: "灵感源自加拉帕戈斯群岛独特的海岸植被与翡翠般的海水。这种低饱和度的绿色勾勒出一种古老的生物遗产感以及太平洋深处原始的孤绝美感。", clothing: "A golden crown reflecting the rays of the Equator, paired with a ceremonial robe featuring Andean geometric patterns and hummingbirds—the jewels of the cloud forest.", clothingCN: "一顶反射赤道光芒的金制冠冕，搭配一件饰有安第斯几何纹样与蜂鸟（云雾林的宝石）的仪式袍服。", texture: "Complex geometric sun disks and intricate hummingbird embroidery, symbolizing the fusion of solar power and the delicate biodiversity of the tropics.", textureCN: "纹理包含复杂的几何太阳圆盘与精细的蜂鸟绣花，象征着太阳能量与热带地区精致生物多样性的融合。", hasCopy: true, dotColor: "#ffdd00ff" },
    { id: "C3", country: "Egypt", cn: "埃及", player: "M. SALAH", concept: "Pharaoh", conceptCN: "法老", color: "#C7AB8C", accent: "#000000", cName: "Sahara Sand", cNameCN: "撒哈拉金沙", apps: 19, goals: 2, yrs: "2014-16", pos: "FW", alts: [], hasImg: true, desc: "The cradle of civilization, Egypt is the home of the eternal Nile and the majestic Sahara.Millennia of history are etched into the desert sands, where ancient wisdom and modern ambition converge beneath the watchful eyes of the Great Sphinx.", descCN: "埃及是文明的摇篮。永恒的尼罗河与壮阔的撒哈拉在这里交汇。千年的历史深深烙印在荒漠的流沙中，古老的智慧与现代的抱负在大狮身人面像的注视下完美融合。", colorInspiration: "Sahara Sand captures the timeless hue of Giza, reflecting the eternal glow of the desert sun against ancient monuments and millennia of heritage.", colorInspirationCN: "源自撒哈拉大漠中金字塔映衬下的沙尘色调。这种金沙色象征着跨越千年的文明积淀，散发着永恒的时间光泽。", clothing: "Iconic Nemes headdress and golden pectoral plate, transforming the player into a modern-day Pharaoh, symbolizing divine leadership and authority.", clothingCN: "标志性的法老“奈姆斯”（Nemes）头巾与金质护胸。这种极具辨识度的王室装束赋予了球员如法老般统领全场的绝对权威。", texture: "The winged scarab motif representing rebirth and the eternal cycle, evoking the spiritual depth and mathematical brilliance of ancient Egyptian art.", textureCN: "圣甲虫图腾与象形文字。这些纹样在神圣的对称中象征着生命的轮回再生与不朽的民族荣耀。", hasCopy: true, dotColor: "#000000ff" },
    { id: "C4", country: "England", cn: "英格兰", player: "TERRY", concept: "Tudor King", conceptCN: "都铎王朝国王", color: "#985050", accent: "#EAD8C0", cName: "Tudor Red", cNameCN: "都铎深红", apps: 717, goals: 67, yrs: "1998-17", pos: "DF", alts: ["LAMPARD"], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#d01025ff" },
    { id: "C5", country: "Finland", cn: "芬兰", firstName: "MIKAEL", player: "FORSSELL", concept: "Sámi Sovereign", conceptCN: "萨米君主", color: "#98B8D8", accent: "#FDFEFE", cName: "Aurora Blue", cNameCN: "极光蓝", apps: 53, goals: 12, yrs: "1998-05", pos: "FW", alts: [], hasImg: true, desc: "Finland is the 'Land of a Thousand Lakes' and the gateway to the Arctic Circle. Home to the Sámi people and ancient northern folklore, its spirit is defined by 'Sisu'—a unique blend of stoic determination and resilience against the polar winter.", descCN: "芬兰被誉为“千湖之国”，也是通往北极圈的门户。作为萨米文化和古老北方民俗的家园，其民族精神由“Sisu”定义——这是一种在极地严寒中淬炼出的坚毅与不屈。", colorInspiration: "A soft, luminous blue reflecting the transition from twilight to the appearance of the Aurora Borealis. This 'Aurora Blue' represents the vast, silent beauty of the Finnish winter sky and the purity of its frozen lakes.", colorInspirationCN: "这种柔和而明亮的蓝色反映了从黄昏到北极光出现时的色彩过渡。这种“极光蓝”代表了芬兰冬日夜空的宁静之美，以及冰封湖泊的纯净质感。", clothing: "A heavy cloak adorned with celestial star and moon patterns, finished with a thick grey Arctic fox fur collar to withstand the sub-zero temperatures of the far north.", clothingCN: "身披饰有星辰与月亮图案的重质斗篷，搭配厚重的极地灰狐皮草领口，以抵御远北地区的极寒温度。", texture: "Features intricate celestial embroideries of stars, crescent moons, and constellations, reflecting the deep connection between northern people and the night sky.", textureCN: "纹理包含星辰、新月与星座的精细天象绣花，反映了北方民族与夜空之间深厚的精神联系。", hasCopy: true, dotColor: "#003580ff" },
    { id: "C6", country: "France", cn: "法国", player: "KANTÉ", concept: "Bourbon Noble", conceptCN: "波旁王朝贵族", color: "#9A98C8", accent: "#F1F1F1", cName: "Provence", cNameCN: "普罗旺斯紫", apps: 269, goals: 13, yrs: "2016-23", pos: "MF", alts: ["MAKELÉLÉ"], hasImg: false, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#0000ffff" },
    { id: "C7", country: "Gabon", cn: "加蓬", firstName: "PIERRE-EMERICK", player: "AUBAMEYANG", concept: "Fang King", conceptCN: "方族雨林之王", color: "#3E886B", accent: "#27AE60", cName: "Rainforest Jade", cNameCN: "雨林翠", apps: 21, goals: 3, yrs: "2022-23", pos: "FW", alts: [], hasImg: true, desc: "Gabon is a Central African sanctuary covered by dense equatorial rainforests. It is the heart of the Fang culture, where the forest is not just land but a sacred source of life and ancestral wisdom.", descCN: "加蓬是中非赤道雨林覆盖的圣地。这里是方族文化的核心，森林不仅是土地，更是生命与祖先智慧的神圣源泉。", colorInspiration: "Inspired by the deep, humid green of the Congo Basin. This 'Rainforest Jade' represents the vitality of the African lungs and the mystery hidden beneath the canopy.", colorInspirationCN: "灵感源自刚果盆地深邃湿润的绿色。这种“雨林翠”代表了非洲之肺的旺盛生命力，以及遮篷下隐藏的神秘感。", clothing: "A crown adorned with traditional Fang wooden masks and feathers, paired with a ceremonial robe made of raffia and animal fur, reflecting the authority of a forest monarch.", clothingCN: "头戴装饰有传统方族木雕面具与羽毛的王冠，身披由酒椰纤维和兽皮制成的仪式礼服，展现了丛林君主的威严。", texture: "Features ancestral Fang mask carvings and geometric raffia weaving patterns. These textures symbolize the connection between the physical world and the spirit of the forest.", textureCN: "纹理包含方族祖先面具雕刻与几何酒椰织纹。这些纹理象征着物质世界与森林之灵之间的联系。", hasCopy: true, dotColor: "#009e60ff" },
    { id: "D1", country: "Germany", cn: "德国", firstName: "ANDRÉ", player: "SCHÜRRLE", concept: "Prussian Monarch", conceptCN: "普鲁士君主", color: "#7C8C9C", accent: "#D4AC0D", cName: "Prussian Iron", cNameCN: "普鲁士铁", apps: 65, goals: 14, yrs: "2013-15", pos: "FW", alts: ["SCHURRLE"], hasImg: true, desc: "Central Europe’s industrial and cultural powerhouse, Germany is defined by a legacy of philosophical depth and engineering precision. Its spirit is one of discipline, unity, and a profound connection to its historical forests and castles.", descCN: "德国是中欧的工业与文化中心，其标志是深厚的哲学底蕴与工程般的严谨。其民族精神由纪律、统一以及与历史森林、城堡的深刻连接所定义。", colorInspiration: "A cold, steadfast grey inspired by Prussian iron and the overcast skies of the North German Plain. It conveys a sense of industrial strength and unwavering historical resolve.", colorInspirationCN: "这种冰冷而坚定的灰色灵感源自普鲁士钢铁与北德平原阴郁的天空。它传达出一种工业力量感和毫不动摇的历史决心。", clothing: "A Prussian-style military officer’s uniform with a Pickelhaube helmet featuring a silver eagle crest, symbolizing authority and a history of disciplined guardianship.", clothingCN: "一套普鲁士风格的军官制服，配有饰有银鹰纹章的尖顶盔（Pickelhaube），象征着权威与纪律严明的守护历史。", texture: "Features rows of military brass buttons, Iron Cross medals, and refined wool textures, reflecting the nation’s heritage of precision and order.", textureCN: "纹理包含排列整齐的军事黄铜纽扣、铁十字勋章以及精细的羊毛质感，反映了这个国家精准与秩序的遗产。", hasCopy: true, dotColor: "#000000ff" },
    { id: "D2", country: "Ghana", cn: "加纳", player: "ESSIEN", concept: "Ashanti King", conceptCN: "阿散蒂王", color: "#D0A850", accent: "#1D8348", cName: "Ashanti Gold", cNameCN: "阿散蒂金", apps: 256, goals: 25, yrs: "2005-14", pos: "MF", alts: [], hasImg: true, desc: "Ghana, the pride of the Gold Coast, inherits the brilliance and courage of Ashanti civilization. A symbol of strength and wealth, Ghanaians carry in their character an intensity and resilience as fierce as the African sun.", descCN: "「黄金海岸」的骄傲加纳，传承了阿散蒂文明的辉煌与勇气。这里是力量与财富的象征，加纳人的性格中自带一种如同非洲骄阳般的炽热与坚毅。", colorInspiration: "Drawn from the raw ochre-gold of West African earth — less ostentatious than gilding, it feels more like a weighty medal of the land, honoring this territory's long history of wealth and civilization.", colorInspirationCN: "取自西非大地的赭金原矿色。它不同于浮夸的镀金，更像是一份厚重的大地勋章，致敬这片土地悠久的财富历史。", clothing: "The prestigious Kente cloth draped diagonally across the shoulder — reserved for the most significant ceremonies, paired with a crown bearing Adinkra symbols, a display of the African Buffalo's absolute dominance on the pitch.", clothingCN: "尊贵的肯特织物（Kente）斜肩礼服。这种仅用于重大仪式的盛装，配合饰有阿丁克拉符号的王冠，彰显了「非洲水牛」在场上的绝对统治力。", texture: "Adinkra symbols adorning the crown and garment — representing wisdom and resilience. Every woven thread is a record of honor, imbuing the garment with a narrative power that transcends decoration.", textureCN: "皇冠与衣饰上的阿丁克拉符号（Adinkra）。分别代表着智慧与刚毅，每一道织物纹路都像是对荣誉的记录，让服饰具备了叙事性的力量。", hasCopy: true, dotColor: "#fcd116ff" },
    { id: "D3", country: "Iceland", cn: "冰岛", firstName: "EIÐUR", player: "GUÐJOHNSEN", concept: "Ice Lord", conceptCN: "冰原领主", color: "#B0D0E0", accent: "#E74C3C", cName: "Glacier Blue", cNameCN: "冰川蓝", apps: 263, goals: 78, yrs: "2000-06", pos: "FW", alts: [], hasImg: true, desc: "This polar island of fire and ice is the birthplace of saga epics and glacier legends. On this isolated land, Icelanders have forged an unshakeable Viking spirit of competition — ice-cold in focus, immovable in will.", descCN: "冰火交织的极地岛屿，是萨迦史诗与冰川传说诞生的净土。在这片孤绝的土地上，冰岛人淬炼出了极度冷静且不可撼动的维京竞技精神。", colorInspiration: "A nearly translucent ice-blue that simulates the ethereal light refracted beneath ancient glaciers — lending the image an extreme crispness and purity that is distinctly of the far north.", colorInspirationCN: "近乎透明的冰蓝色调，模拟了万年冰川下折射出的幽光，使画面呈现出一种极致冷峻、纯净的北地质感。", clothing: "A minimalist silver headband crown supplemented by polar furs suited to withstand North Atlantic cold — emphasizing the unity of function and identity, the solitary elevated quality of a Nordic Arctic noble.", clothingCN: "简约的银质发带王冠，辅以适应北大西洋严寒的极地皮草。这种装束强调功能性与身份的统一，极具北欧极地贵族的孤高质感。", texture: "Thor's Hammer variants and Icelandic magic staves (Staves) engraved on accessories. These symbols allude to Gudjohnsen's role as a steadying beacon on the pitch — a symbol of shelter in the storm.", textureCN: "饰品上刻有的雷神之锤变体与冰岛魔法符文（Staves）。这些符号暗喻了古德约翰森在场上稳定军心的灯塔作用，象征着风暴中的庇护。", hasCopy: true, dotColor: "#003897ff" },
    { id: "D4", country: "Ireland", cn: "爱尔兰", firstName: "DAMIEN", player: "DUFF", concept: "Celtic King", conceptCN: "凯尔特国王", color: "#70B488", accent: "#EB984E", cName: "Emerald", cNameCN: "翡翠绿", apps: 125, goals: 13, yrs: "2003-06", pos: "FW", alts: [], hasImg: true, desc: "Known as the 'Emerald Isle,' Ireland is a land of rolling misty hills and ancient Celtic legends. Its heritage is woven into the landscape, where nature and mythology are inseparable.", descCN: "被称为“翡翠岛”的爱尔兰，是一片充满薄雾丘陵和古老凯尔特传说的土地。这里的遗产融入了风景之中，自然与神话密不可分。", colorInspiration: "A soft, muted emerald green reflecting the moisture-rich meadows after a heavy mist. It symbolizes luck, growth, and the enduring resilience of the Irish spirit.", colorInspirationCN: "一种柔和、带有灰度的翡翠绿，反映了大雾后水汽充沛的草场。它象征着运气、成长以及爱尔兰精神中持久的韧性。", clothing: "Inspired by the High Kings of Ireland, featuring a heavy wool cloak fastened with a traditional Tara Brooch and a golden Celtic torc around the neck.", clothingCN: "灵感源自爱尔兰至高王，身披由传统塔拉胸针（Tara Brooch）固定的重质羊毛斗篷，颈部佩戴金色的凯尔特扭环（Torc）。", texture: "Intricate Celtic knots and interlace patterns derived from the Book of Kells. These endless lines represent the eternity of life and the deep artistic roots of the Gaelic people.", textureCN: "纹理源自《凯尔经》中复杂的凯尔特结和交错图案。这些无尽的线条代表了生命的永恒和盖尔人深厚的艺术根源。", hasCopy: true, dotColor: "#009b48ff" },
    { id: "D5", country: "Israel", cn: "以色列", firstName: "YOSSI", player: "BENAYOUN", concept: "Holy Land Priest", conceptCN: "圣地大祭司", color: "#B0BFD0", accent: "#F1C40F", cName: "Holy City Steel", cNameCN: "圣城钢蓝", apps: 24, goals: 1, yrs: "2010-13", pos: "MF", alts: [], hasImg: true, desc: "A land at the crossroads of history, Israel blends thousands of years of sacred heritage with modern pioneering innovation. It is a place where ancient stone walls meet the vast expanse of the desert and the clear blue of the Mediterranean.", descCN: "以色列是一片处于历史交汇点的土地，将数千年的神圣遗产与现代先锋创新融为一体。在这里，古老的石墙与广袤的沙漠及地中海的清澈蓝色相遇。", colorInspiration: "A muted, steel-toned blue inspired by the limestone of the Holy City under a clear noon sky. It symbolizes the fusion of ancient spiritual weight and the modern resilience of the desert nation.", colorInspirationCN: "这种带有钢灰色调的蓝色灵感源自正午晴空下圣城耶路撒冷的石灰岩色泽。它象征着古老精神底蕴与现代沙漠民族韧性的融合。", clothing: "A ceremonial robe inspired by the ancient High Priests, featuring the 'Hoshen' breastplate inlaid with twelve gemstones and a golden crown adorned with sapphires.", clothingCN: "身穿灵感源自古代大祭司的仪式礼服，配以镶嵌着十二颗宝石的“大祭司胸牌”（Hoshen），以及一顶饰有蓝宝石的金制冠冕。", texture: "The 'Hoshen' breastplate features twelve distinct gemstones representing the ancient tribes, paired with sacred blue-and-white textile patterns reflecting deep historical traditions.", textureCN: "“大祭司胸牌”上镶嵌着代表古代十二支派的宝石，搭配蓝白相间的神圣纺织纹理，反映了深远的历史传统。", hasCopy: true, dotColor: "#0138b7ff" },
    { id: "D6", country: "Italy", cn: "意大利", player: "ZOLA", concept: "Renaissance Duke", conceptCN: "文艺复兴公爵", color: "#7898C0", accent: "#D5DBDB", cName: "Azzurri", cNameCN: "azzurri蓝", apps: 312, goals: 80, yrs: "1996-03", pos: "FW", alts: [], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#cf2d28ff" },
    { id: "D7", country: "Jamaica", cn: "牙买加", firstName: "FRANK", player: "SINCLAIR", concept: "Reggae Guardian", conceptCN: "雷鬼守护者", color: "#A8C868", accent: "#239B56", cName: "Tropical Lime", cNameCN: "热带青柠", apps: 218, goals: 13, yrs: "1990-98", pos: "DF", alts: [], hasImg: true, desc: "Jamaica, the 'Land of Wood and Water,' is a vibrant Caribbean heartland defined by its lush interior and indomitable spirit. Its culture is a global lighthouse of rhythm and resilience, born from a history of maroons and freedom.", descCN: "牙买加被称为“林木与水源之地”，是加勒比海充满活力的核心地带，以其繁茂的内陆和不屈的精神著称。其文化是韵律与韧性的全球灯塔，诞生于马龙人追求自由的历史。", colorInspiration: "A vibrant, lime-toned green reflecting the sun-drenched vegetation and tropical citrus of the island. It represents the infectious energy and natural abundance of the Caribbean spirit.", colorInspirationCN: "一种充满活力的青柠绿色，反映了岛上阳光普照的植被与热带柑橘色彩。它代表了加勒比精神中极具感染力的能量与大自然的馈赠。", clothing: "A crown woven with tropical palm motifs, paired with a sleeveless vest featuring lush Monstera leaf prints, embodying the relaxed yet regal essence of the islands.", clothingCN: "头戴一顶编织有热带棕榈纹样的冠冕，身穿一件印有繁茂龟背竹叶片的无袖马甲，体现了海岛那种轻松而尊贵的本质。", texture: "Vibrant tropical leaf patterns and woven palm textures, symbolizing the organic growth and rhythmic pulse of life under the Caribbean sun.", textureCN: "纹理包含鲜艳的热带叶片图案与棕榈编织纹理，象征着加勒比阳光下有机增长的生命力与律动节奏。", hasCopy: true, dotColor: "#009c3bff" },
    { id: "E1", country: "Morocco", cn: "摩洛哥", firstName: "HAKIM", player: "ZIYECH", concept: "Alawi Dynasty", conceptCN: "阿拉维王朝", color: "#C89078", accent: "#EDBB99", cName: "Marrakech Clay", cNameCN: "马拉喀什陶", apps: 107, goals: 14, yrs: "2020-24", pos: "FW", alts: [], hasImg: true, desc: "Morocco is the 'Land of the Setting Sun,' a Maghreb pearl where the Atlantic, Mediterranean, and Sahara meet. This region blends Arab, Berber, and Andalusian civilizations, birthing a national soul of North African wildness and Islamic refinement.", descCN: "摩洛哥被称为“日落之地”，是亚特兰大、地中海与撒哈拉沙漠交汇的马格里布明珠。这里融合了阿拉伯、柏柏尔与安达卢西亚的多元文明，孕育出一种既有北非野性又具伊斯兰精致美学的民族灵魂。", colorInspiration: "Inspired by the ancient clay architecture of Marrakesh and the shifting Sahara sands at dusk. This warm, earthy tone symbolizes the defensive strength of ancient cities and a steadfast national spirit.", colorInspirationCN: "这种温润的陶土感源自马拉喀什古老的粘土建筑与黄昏时分撒哈拉的沙丘，象征着古老城市的防御力与这个国度坚韧不拔的守卫者精神。", clothing: "A traditional Fez (Tarboosh) with gold embroidery and tassels, paired with a deep blue Djellaba. This hooded robe is a hallmark of status and honor in Moroccan heritage.", clothingCN: "核心为著名的非斯帽（Fez/Tarboosh），饰有精美的金线刺绣与流苏；身披深蓝色杰拉巴（Djellaba）斗篷，这种带有兜帽的传统长袍在摩洛哥是身份与荣誉的象征。", texture: "Traditional Moroccan Maalam embroidery (Sfifa) featuring a central pentagram of the Seal of Solomon. It combines intricate Islamic arabesque patterns with master-level North African craftsmanship.", textureCN: "采用摩洛哥传统的Maalam手工刺绣（Sfifa）。胸前巨大的金色五角星源自国旗上的“苏莱曼之星”，搭配复杂的伊斯兰几何蔓草纹，体现了北非工匠艺术的巅峰造诣。", hasCopy: true, dotColor: "#c1272dff" },
    { id: "E2", country: "Netherlands", cn: "荷兰", firstName: "Ruud", player: "Gullit", concept: "Golden Age Voyager", conceptCN: "黄金时代航海家", color: "#E0A050", accent: "#2E4053", cName: "Oranje", cNameCN: "奥兰治橙", apps: 64, goals: 6, yrs: "1995-98", pos: "MD", alts: [], hasImg: true, desc: "The Netherlands is a land of maritime legends and the 'Golden Age,' defined by its mastery over the sea and the vibrant House of Orange-Nassau. Its culture celebrates a blend of merchant pragmatism and artistic brilliance that once reshaped the world's horizons.", descCN: "荷兰是航海传奇与“黄金时代”的故乡，以其对海洋的征服和辉煌的奥兰治-拿骚王室而闻名。其文化融合了商人的务实精神与艺术的灿烂光辉，曾一度重塑了世界的地平线。", colorInspiration: "Inspired by 'Oranje,' the national identity rooted in the House of Orange. This warm, golden-orange tone reflects the glow of sunset over the polders and the vibrant bloom of tulip fields.", colorInspirationCN: "灵感源自荷兰的灵魂色“奥兰治橙”。这种温暖的金橙色调反映了圩田上的落日余晖，以及郁金香花田盛开时的旺盛生命力。", clothing: "A 17th-century Dutch noble's flat cap with a decorative feather, paired with an intricate lace ruff collar and a vibrant orange sash of the House of Orange-Nassau.", clothingCN: "核心为17世纪荷兰贵族的平顶帽（带羽毛装饰），搭配精美的拉夫领（Ruff）与象征奥兰治-拿骚王室的鲜艳橙色绶带。", texture: "Features delicate Dutch needlepoint lace and golden medallions of the Dutch Lion (Leo Belgicus), symbolizing the nation's seafaring prosperity.", textureCN: "纹理包含精细的荷兰针刺蕾丝与金色的“比利时狮”（Dutch Lion）勋章，象征着大航海时代的繁荣与王室的威严。", hasCopy: true, dotColor: "#cf1027ff" },
    { id: "E3", country: "N. Zealand", cn: "新西兰", firstName: "KEN", player: "ARMSTRONG", concept: "Cloud Monarch", conceptCN: "长白云之王", color: "#607860", accent: "#BDC3C7", cName: "Silver Fern", cNameCN: "银蕨绿", apps: 402, goals: 30, yrs: "1946-57", pos: "MF", alts: [], hasImg: true, desc: "Aotearoa, the 'Land of the Long White Cloud,' is a Pacific sanctuary defined by its dramatic volcanic landscapes and deep Maori heritage. Its spirit is one of navigation, exploration, and a profound spiritual connection to the natural world.", descCN: "新西兰被称为“长白云之国”，是一个由壮丽的火山景观和深厚的毛利文化定义的太平洋圣地。其精神内核包含航行、探索以及与自然界深厚的神性连接。", colorInspiration: "A deep, verdant green inspired by the native Silver Fern understory and the ancient moss of the Fiordland rainforests. It symbolizes growth, endurance, and the primal mana of the land.", colorInspirationCN: "一种深邃的翠绿色，灵感源自原生的银蕨植被与峡湾国家公园雨林中古老的苔藓。它象征着成长、韧性以及这片土地原始的生命能量（Mana）。", clothing: "A Silver Fern circlet paired with a Korowai (traditional feathered cloak) and a greenstone Hei-Tiki pendant, reflecting the prestige and spiritual authority of a Maori chieftain.", clothingCN: "佩戴银蕨编织的头饰，身披毛利传统羽毛披风（Korowai），颈间悬挂绿玉（Pounamu）制成的 Hei-Tiki 吊坠，体现了毛利首领的声望与神圣权威。", texture: "Features the intricate layering of dark feathers and carved Koruru or Koru patterns, representing the unfurling of life and the ancestral lineage of the Pacific voyagers.", textureCN: "纹理展现了黑色羽毛的细腻层叠感，以及雕刻的 Koruru 或 Koru（银蕨芽）图案，代表了生命的绽放与太平洋航海者的祖先血脉。", hasCopy: true, dotColor: "#012268ff" },
    { id: "E4", country: "Nigeria", cn: "尼日利亚", firstName: "JOHN", player: "MIKEL", concept: "Benin King", conceptCN: "贝宁王", color: "#58A078", accent: "#FBFCFC", cName: "Palm Green", cNameCN: "棕榈绿", apps: 372, goals: 6, yrs: "2006-17", pos: "MF", alts: ["MIKEL JOHN OBI"], hasImg: true, desc: "Nigeria, the 'Giant of Africa,' is a cultural powerhouse home to ancient civilizations like the Benin Empire. Its spirit is defined by a vibrant tapestry of tradition and a resilient, rhythmic pulse that resonates across the continent.", descCN: "尼日利亚被称为“非洲巨人”，是拥有贝宁帝国等古老文明的文化强国。其民族精神由绚烂的传统底蕴和坚韧且富有律动的脉搏所定义，这种力量在整个非洲大陆回荡。", colorInspiration: "A lush, saturated green derived from the vast palm groves and tropical rainforests of the Niger Delta. It represents the natural abundance and the evergreen vitality of the West African heartland.", colorInspirationCN: "这种浓郁的饱和绿色源自尼日尔河三角洲广袤的棕榈林与热带雨林。它代表了西非腹地大自然的馈赠以及永恒的生命力。", clothing: "A majestic Benin royal ensemble featuring a crown and breastplate made of sacred coral beads, paired with a deep blue patterned robe signifying high nobility and ancestral authority.", clothingCN: "一套雄伟的贝宁王室装束，包含由神圣红珊瑚珠制成的王冠与胸饰，搭配一件深蓝色的纹样大袍，象征着高贵的地位与祖先的权威。", texture: "Intricate coral beadwork and traditional bronze-casting motifs, reflecting the centuries-old craftsmanship of the Guild of Bronze Casters and the sacred symbolism of the Benin court.", textureCN: "纹理包含复杂的红珊瑚珠饰与传统的青铜铸造图腾，反映了延续数世纪的青铜铸造工匠艺术以及贝宁宫廷的神圣象征语言。", hasCopy: true, dotColor: "#008754ff" },
    { id: "E5", country: "N. Ireland", cn: "北爱尔兰", firstName: "MAL", player: "DONAGHY", concept: "Linen King", conceptCN: "亚麻商国王", color: "#BCD0A0", accent: "#28B463", cName: "Linen Green", cNameCN: "亚麻草绿", apps: 78, goals: 3, yrs: "1992-94", pos: "DF", alts: [], hasImg: true, desc: "Northern Ireland is a land of rolling emerald landscapes and a rich industrial heritage, historically centered around the world-renowned linen trade. Its identity is forged between rugged coastlines, ancient monastic traditions, and the quiet resilience of its artisanal history.", descCN: "北爱尔兰是一片拥有绵延翠绿风景和深厚工业底蕴的土地，其历史以举世闻名的亚麻贸易为核心。其民族认同感锻造于崎岖的海岸线、古老的修道院传统以及手工艺人沉静而坚韧的品格之间。", colorInspiration: "Inspired by the pale, natural green of flax fields and raw linen fibers. This 'Linen Green' represents the soft yet enduring spirit of the Northern Irish countryside, reflecting a history of patience and artisanal pride.", colorInspirationCN: "这种“亚麻草绿”灵感源自亚麻花田的淡雅自然色调与未经染色的原初亚麻纤维。它代表了北爱尔兰乡村温和而持久的生命力，反映了耐心与工匠自豪感的历史。", clothing: "A wreath of blue flax flowers—the floral symbol of the nation's linen industry—paired with a simple linen-textured robe and a wooden Celtic cross necklace, reflecting early monastic simplicity.", clothingCN: "头戴由蓝色亚麻花（北爱尔兰亚麻工业的象征）编织而成的花环，身披具有亚麻质感的质朴长袍，颈间佩戴木制凯尔特十字架，致敬早期修道院时代的纯粹与质朴。", texture: "Features the organic weave of high-quality Irish linen and the delicate form of the flax flower, symbolizing a deep connection to the soil and the industrial heritage that once defined the province.", textureCN: "纹理展现了高品质爱尔兰亚麻的经纬交织感与亚麻花的有机形态，象征着与土地的深厚联系，以及曾定义这片土地的工业遗产。", hasCopy: true, dotColor: "#cc0000ff" },
    { id: "E6", country: "Norway", cn: "挪威", firstName: "TORE ANDRÉ", player: "T. A. FLO", concept: "Viking King", conceptCN: "维京海盗王", color: "#80A8A0", accent: "#85929E", cName: "North Sea Moss", cNameCN: "北海苔绿", apps: 72, goals: 17, yrs: "1997-00", pos: "FW", alts: [], hasImg: true, desc: "Norway is the land of majestic fjords and the Northern Lights, defined by its Viking legacy of exploration. Its culture is a testament to survival and majesty amidst the rugged Arctic environment.", descCN: "挪威是雄伟峡湾与北极光的国度，其探索精神深受维京遗产的影响。在崎岖的北极环境中，其文化是生存与威严的见证。", colorInspiration: "A desaturated green inspired by Arctic moss and the icy depths of the fjords. It conveys a sense of quiet power and the stoic calm of the Northern seas.", colorInspirationCN: "灵感源自北极苔藓与峡湾冰冷深处的低饱和度绿色。它传达出一种沉静的力量感，以及北海波澜不惊的冷静。", clothing: "A minimalist silver circlet inlaid with deep blue sapphires, paired with a heavy velvet mantle and a thick fur collar suited for the subarctic chill.", clothingCN: "银质王冠上镶嵌着深蓝宝石，搭配厚重的丝绒斗篷与适应北极严寒的宽大毛皮领口。", texture: "Features geometric engravings on the silver crown and a luxurious ermine fur texture, reflecting the balance between raw Viking strength and royal refinement.", textureCN: "纹理包含银质王冠上的几何雕刻与奢华的貂皮质感，反映了原始维京力量与皇家精致感之间的平衡。", hasCopy: true, dotColor: "#01407dff" },
    { id: "E7", country: "Peru", cn: "秘鲁", player: "PIZARRO", concept: "Inca Sun King", conceptCN: "印加太阳王", color: "#B87090", accent: "#FADBD8", cName: "Andes Pink", cNameCN: "安第斯粉", apps: 32, goals: 2, yrs: "2007-09", pos: "FW", alts: [], hasImg: true, desc: "Peru carries the legacy of the Inca Empire that once dominated the South American continent. The altitude of the Andes imbues Peruvians with a unique quality — the high-altitude resilience of mountain people combined with the elegant grace of South American knights.", descCN: "秘鲁拥有统治过南美大陆的印加帝国遗产。安第斯山脉的高度赋予了秘鲁人一种兼具高海拔坚韧与南美骑士优雅的特殊韵味。", colorInspiration: "An intensely exotic berry-purple — symbolizing the enduring legacy of the Inca Empire, like violet mist at dusk in the Andes: dispersed, yet eternally present.", colorInspirationCN: "一种异域感极强的浆果紫色，象征着安第斯山脉晚霞中消散却永存的印加帝国历史底蕴。", clothing: "A golden crown adorned with a grand solar disc, paired with layered Andean capes — restoring the exalted identity where ancient priest and king were one, a figure of singular divine presence among South American players.", clothingCN: "饰有大型太阳神圆盘的黄金冠冕，搭配典型的安第斯叠穿斗篷。还原了古代祭司与君王重合的尊贵身份，在南美球员中极具神性色彩。", texture: "Llama totems and Inca staircase patterns — representing reverence for nature and the divine, elegantly showcasing the highland civilization's mastery of weaving art and its cultural iconography.", textureCN: "美洲驼（Llama）图腾与印加阶梯纹。这些纹样代表了对自然与神灵的敬畏，巧妙地展示了高原文明精湛的编织艺术与文化图腾。", hasCopy: true, dotColor: "#d71024ff" },
    { id: "F1", country: "Portugal", cn: "葡萄牙", firstName: "RICARDO", player: "CARVALHO", concept: "Explorer King", conceptCN: "大航海国王", color: "#508888", accent: "#CB4335", cName: "Maritime Teal", cNameCN: "航海深青", apps: 210, goals: 11, yrs: "2004-10", pos: "DF", alts: [], hasImg: true, desc: "Portugal is the pioneer of the Age of Discovery, a seafaring nation that once charted the unknown horizons of the Atlantic. Its heritage is a blend of maritime prowess, melancholic Fado, and the ornate Manueline architectural style.", descCN: "葡萄牙是大航海时代的先驱，是一个曾测绘过大西洋未知地平线的航海民族。其遗产融合了卓越的航海技术、忧郁的法多音乐（Fado）以及华丽的曼努埃尔式建筑风格。", colorInspiration: "A deep, stormy teal inspired by the Atlantic depths and the vast horizons sought by 15th-century explorers. It represents the mystery of the deep sea and the legacy of the great navigators.", colorInspirationCN: "这种深邃且带有风暴感的深青色灵感源自大西洋深处，以及15世纪探险家们追寻的广阔地平线。它代表了深海的神秘与伟大航海家的遗产。", clothing: "A noble's robe in the Manueline style, featuring heavy golden chains and a prominent astrolabe pendant—the primary navigational tool of the great Portuguese voyagers.", clothingCN: "身穿曼努埃尔风格的贵族长袍，配以厚重的金链和显眼的星盘吊坠——这是葡萄牙伟大航海家们最核心的导航工具。", texture: "Features intricate compass rose (Rosa dos Ventos) embroideries and nautical chart engravings, symbolizing the precise art of navigation and the seafaring glory of the Order of Christ.", textureCN: "纹理包含精美的罗盘玫瑰（Rosa dos Ventos）绣花与航海图雕刻，象征着精准的航海艺术以及基督骑士团在大航海时代的荣耀。", hasCopy: true, dotColor: "#006600ff" },
    { id: "F2", country: "Romania", cn: "罗马尼亚", firstName: "DAN", player: "PETRESCU", concept: "Carpathian Duke", conceptCN: "喀尔巴阡公爵", color: "#687898", accent: "#F5B041", cName: "Carpathian Mist", cNameCN: "喀尔巴阡雾蓝", apps: 208, goals: 24, yrs: "1995-00", pos: "DF", alts: [], hasImg: true, desc: "Known for the rugged beauty of the Carpathian Mountains and the ancient legends of Transylvania. Romania’s spirit is one of quiet nobility and folklore, rooted in the traditions of the Wallachian and Moldavian princes.", descCN: "罗马尼亚以喀尔巴阡山脉的崎岖之美和特兰西瓦尼亚的古老传说而闻名。其民族精神蕴含着一种沉静的贵族气息与民俗底蕴，植根于瓦拉几亚和摩尔达维亚大公的传统之中。", colorInspiration: "A deep, misty blue-grey inspired by the limestone ridges of the Carpathians under a twilight sky. It symbolizes the stoic elegance and the mysterious history of the Balkan interior.", colorInspirationCN: "这种深邃且带有雾感的灰蓝色灵感源自暮色下喀尔巴阡山脉的石灰岩山脊。它象征着巴尔干内陆坚韧的优雅感以及神秘的历史沉淀。", clothing: "A Duke’s ceremonial robe made of heavy brocade with a luxurious fur collar, reflecting the historical attire of the Romanian Boyars—the high nobility of the past.", clothingCN: "一件由厚重织锦制成的公爵仪式袍，配有奢华的毛皮领口，反映了罗马尼亚波雅尔（Boyars）阶层传统的贵族装束。", texture: "Features intricate golden floral embroidery and damask patterns, representing the blend of Byzantine refinement and local artisanal heritage.", textureCN: "纹理包含繁复的金色花卉绣花与大马士革图案，代表了拜占庭的精致感与当地手工艺遗产的融合。", hasCopy: true, dotColor: "#002b7fff" },
    { id: "F3", country: "Russia", cn: "俄罗斯", firstName: "YURI", player: "ZHIRKOV", concept: "Tsardom of Russia", conceptCN: "俄罗斯沙皇国", color: "#785060", accent: "#95707A", cName: "Imperial Crimson", cNameCN: "帝国深紫红", apps: 49, goals: 1, yrs: "2009-11", pos: "DF/MF", alts: [], hasImg: true, desc: "A vast empire spanning two continents with deep Orthodox roots and a majestic Tsarist history. In the extreme cold, the Russian character has forged a steely composure and a heroic idealism imbued with tragic beauty.", descCN: "跨越亚欧大陆的冰原帝国，拥有深厚的东正教底蕴与辉煌的沙皇王权史。俄罗斯民族性格如同其土地一样广袤且严酷，在极端的寒冷中淬炼出了如同钢铁般沉稳且充满悲剧美学的英雄主义。", colorInspiration: "Derived from the dark shadows of court murals in the Grand Duchy of Moscow. It evokes the weight of power, religious devotion, and the enduring imperial ideal during long northern winters.", colorInspirationCN: "这种深红紫色调源自莫斯科大公国宫廷壁画的暗影，象征着权力的厚重、宗教的虔诚以及北国漫长冬夜中不熄的帝国理想。", clothing: "The legendary Monomakh's Cap—the central symbol of Tsarist power—trimmed with thick sable fur, paired with a royal mantle featuring an ermine collar.", clothingCN: "佩戴着传奇的莫诺马赫皇冠（Monomakh's Cap）——这是沙皇权力的核心象征，边缘镶嵌着厚重的貂皮；身披饰有白貂毛（Ermine）领口的皇室大氅，尽显极地君主的威严。", texture: "Intricate golden Fabergé egg elements embedded into the sleeves, combined with traditional Orthodox pinecone and vine filigree, showcasing extreme luxury and Russian aesthetic precision.", textureCN: "巧妙地在袖部嵌入了法贝热彩蛋（Fabergé egg）的装饰元素。这种极其精密的金工艺术结合东正教传统的松果与藤蔓花纹，展现了俄式美学中极致的奢华与对细节的偏执。", hasCopy: true, dotColor: "#0039a6ff" },
    { id: "F4", country: "Scotland", cn: "苏格兰", player: "COOKE", concept: "Highland Chief", conceptCN: "高地氏族首领", color: "#9888B0", accent: "#5499C7", cName: "Thistle Purple", cNameCN: "蓟花紫", apps: 373, goals: 30, yrs: "1966-78", pos: "FW", alts: [], hasImg: true, desc: "Scotland is the embodiment of the Highland spirit — transmitted through bagpipes and an unyielding will to independence. Its national character holds both the raw, hot-blooded nature of Highland warriors and the melancholy, poetic elegance unique to the Gaels.", descCN: "苏格兰是高地精神的化身，在风笛与独立意志中传承至今。其国民性格中既有高地武士的粗犷热血，也有盖尔人特有的诗人般的忧郁优雅。", colorInspiration: "Drawn from the heather that blankets the Scottish Highlands — this soft purple symbolizes the national character found in Highland landscapes: gentle and resilient in equal measure.", colorInspirationCN: "取自苏格兰高地遍布的石南花色。这种柔和的紫色象征着高地自然风景中温婉与坚韧并存的民族风骨。", clothing: "A classic clan tartan sash paired with the quintessentially Scottish thistle brooch — presented in the manner of a gentleman warrior, transcending the heaviness of armour, embracing refined defiance.", clothingCN: "经典的家族格纹呢（Tartan）斜跨披肩，辅以最具民族代表性的苏格兰蓟花胸针。以一种「绅士战士」的姿态呈现，跳脱了沉重的铠甲感。", texture: "Delicate Celtic knotwork engraved on a silver circular brooch. These interlocking cyclical lines symbolize the inseparable bond between the Scottish people and their land — a signature of rebellious yet graceful character.", textureCN: "银制圆形胸针上刻有的精致凯尔特编织纹。这种交错循环的线条象征着苏格兰人民与土地之间不可割裂的连接，代表着一种叛逆而优雅的格调。", hasCopy: true, dotColor: "#0065bfff" },
    { id: "F5", country: "Senegal", cn: "塞内加尔", firstName: "EDOUARD", player: "MENDY", concept: "West African Sage", conceptCN: "西非智者", color: "#A8B068", accent: "#D4AC0D", cName: "Savanna Olive", cNameCN: "草原橄榄", apps: 105, goals: 0, yrs: "2020-23", pos: "GK", alts: [], hasImg: true, desc: "Senegal is the 'Gateway to West Africa,' known for its spirit of 'Teranga' (hospitality) and its deep griot traditions. It is a land where the Sahel meets the Atlantic, blending a vibrant Wolof and Serer heritage with a modern, resilient pulse.", descCN: "塞内加尔被誉为“西非之门”，以其“Teranga”（待客之道）精神和深厚的口述历史传统而闻名。这是一片萨赫勒草原与大西洋相遇的土地，融合了充满活力的沃洛夫和谢雷尔民族遗产与现代坚韧的脉搏。", colorInspiration: "A warm, earthy olive tone inspired by the semi-arid savanna landscapes and the ancient Baobab groves of the interior. It represents the resilient spirit of Teranga and the enduring wisdom of the West African soil.", colorInspirationCN: "这种温润的橄榄色调灵感源自半干旱的稀树草原景观与腹地古老的猴面包树林。它代表了坚韧的“Teranga”精神，以及西非土地所承载的深邃智慧。", clothing: "A traditional West African Kufi cap with intricate embroidery, paired with a patterned Grand Boubou featuring golden accents that signify wisdom and spiritual prestige.", clothingCN: "头戴一顶饰有精美绣花的西非传统库菲帽（Kufi），身穿一件饰有金色纹样的传统大袍（Grand Boubou），象征着智者的身份与神圣的声望。", texture: "Features sacred cowrie shell necklaces and traditional wax-print geometric patterns, representing prosperity, spiritual protection, and the rich textile heritage of the Sahel.", textureCN: "纹理包含神圣的贝壳项链与传统的蜡染几何图案，象征着繁荣、精神庇护以及萨赫勒地区深厚的纺织遗产。", hasCopy: true, dotColor: "#00843fff" },
    { id: "F6", country: "Serbia", cn: "塞尔维亚", player: "IVANOVIĆ", concept: "Byzantine Monarch", conceptCN: "拜占庭君主", color: "#A07080", accent: "#ABB2B9", cName: "Byzantine Plum", cNameCN: "拜占庭梅", apps: 377, goals: 34, yrs: "2008-17", pos: "DF", alts: [], hasImg: true, desc: "Serbia is the ironclad fortress of Byzantine culture. Through the turbulent centuries on the Balkan Peninsula, Serbians have forged a guardian's spirit as resolute as steel — the indomitable stronghold of Eastern Europe.", descCN: "塞尔维亚是拜占庭文化的铁血要塞。在巴尔干半岛的激荡岁月中，塞尔维亚人磨砺出了如钢铁般的守卫者精神，是东欧大地上强悍的堡垒。", colorInspiration: "A composed, deep rose-red reminiscent of ancient church frescoes — symbolizing the near-religious steadfastness of Balkan history and the weighty accumulation of centuries of civilization.", colorInspirationCN: "如同教堂古老壁画般沉稳的暗玫瑰红色，象征着巴尔干历史中那份宗教般的坚贞守望感与厚重的历史积淀。", clothing: "An imperial crown encrusted with sapphires and pearls, paired with the most elaborate Orthodox court robe. This solemn martial attire embodies Ivanovic's role as defensive patriarch — a fortress in human form.", clothingCN: "镶嵌大量蓝宝石与珍珠的帝国皇冠，配以极尽繁复的东正教宫廷袍服。这套庄重的戎装展现了伊万诺维奇作为「后防老爹」的坚固威严。", texture: "The double-headed eagle and cross-bearing shield at the heart of the crest — symbolizing power, faith, and protection. These motifs unfold in layers against a deep blue ground, projecting a visual defensive fortification.", textureCN: "核心纹章为华丽的双头鹰与十字盾牌。象征着权力、信仰与守护，这些纹样在深蓝色底布上层层铺开，展现出堡垒般的视觉防御力。", hasCopy: true, dotColor: "#c7353dff" },
    { id: "F7", country: "Slovakia", cn: "斯洛伐克", firstName: "MIROSLAV", player: "STOCH", concept: "Tatra Highlander", conceptCN: "塔特拉高地英雄", color: "#6898C0", accent: "#E74C3C", cName: "Tatra Blue", cNameCN: "塔特拉蓝", apps: 5, goals: 0, yrs: "2008-10", pos: "FW", alts: [], hasImg: true, desc: "A land of dramatic peaks and deep valleys, Slovakia is the heart of the Tatra Mountains. Its culture is deeply connected to the land, celebrated through vibrant folk music and the resilient spirit of the mountain shepherds.", descCN: "斯洛伐克是一片拥有壮丽山峰与深邃山谷的土地，也是塔特拉山脉的心脏。其文化与土地深刻关联，通过充满活力的民间音乐和高山牧羊人坚韧的精神得以传承。", colorInspiration: "A clear, mountain-toned blue reflecting the glacial lakes and cold streams of the Tatras. It represents the purity of the landscape and the refreshing clarity of its high-altitude heritage.", colorInspirationCN: "这种清澈的高山蓝色反映了塔特拉山脉的冰川湖泊与冷冽溪流。它代表了景观的纯净以及高海拔文化遗产那种令人耳目一新的明晰感。", clothing: "A traditional highlander’s folk vest (Kroj) embellished with vibrant embroidery, paired with a heavy sheepskin cloak and a hand-carved shepherd’s staff featuring a ram’s head.", clothingCN: "一件饰有鲜艳绣花的传统高地民俗马甲（Kroj），搭配沉重的羊皮斗篷和一根手工雕刻有公羊头的牧羊人长杖。", texture: "Intricate geometric folk embroidery and the raw texture of carved wood and wool, symbolizing the artisanal roots and the organic warmth of Slovakian village life.", textureCN: "纹理包含复杂的几何民俗绣花以及雕刻木材与羊毛的原始质感，象征着斯洛伐克乡村生活的工匠根基与温厚的人文暖意。", hasCopy: true, dotColor: "#034ea2ff" },
    { id: "G1", country: "S. Africa", cn: "南非", firstName: "DEREK", player: "SMETHURST", concept: "Safari Monarch", conceptCN: "游猎领主", color: "#D0A880", accent: "#FFFFFF", cName: "Safari Sands", cNameCN: "游猎金", apps: 18, goals: 5, yrs: "1968-71", pos: "FW", alts: [], hasImg: true, desc: "South Africa, the 'Rainbow Nation,' is a land of breathtaking diversity, from the sun-drenched savannas to the vibrant tapestries of its urban hearts. It is a place where ancestral traditions and modern resilience meet under the vast African sky.", descCN: "南非被称为“彩虹之国”，是一个拥有惊人多样性的土地，从阳光普照的稀树草原到充满活力的城市图景。在这里，祖先的传统与现代的韧性在辽阔的非洲天空下交汇。", colorInspiration: "Inspired by the golden sands of the Kalahari and the sun-bleached grass of the savanna. This 'Safari Sands' tone reflects the warmth, openness, and natural abundance of the Southern African landscape.", colorInspirationCN: "灵感源自卡拉哈里沙漠的金沙与稀树草原被阳光晒干的草地。这种“游猎金”色调反映了南非景观的温暖、开阔与大自然的馈赠。", clothing: "A crown made of vibrant King Protea flowers—the national floral emblem—paired with a geometric patterned robe inspired by Ndebele beadwork and ancestral chieftain attire.", clothingCN: "头戴由鲜艳的帝王花（南非国花）组成的王冠，身穿一件受恩德贝莱族（Ndebele）珠饰艺术与祖先首领装束启发的几何纹样长袍。", texture: "Intricate geometric Ndebele beadwork and blooming King Protea motifs, symbolizing the vibrant cultural mosaic and the flourishing life force of the African soil.", textureCN: "纹理包含复杂的恩德贝莱几何珠饰与盛开的帝王花图腾，象征着充满活力的文化马赛克与非洲土地上繁茂的生命力。", hasCopy: true, dotColor: "#0a7b43ff" },
    { id: "G2", country: "Spain", cn: "西班牙", player: "AZPILICUETA", concept: "Habsburg Dynasty", conceptCN: "哈布斯堡王朝", color: "#B86858", accent: "#F7DC6F", cName: "Habsburg Vermilion", cNameCN: "哈布斯堡朱砂", apps: 507, goals: 17, yrs: "2012-23", pos: "DF", alts: [], hasImg: false, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#c60a1eff" },
    { id: "G3", country: "Switzerland", cn: "瑞士", firstName: "DENIS", player: "ZAKARIA", concept: "Swiss Guard", conceptCN: "瑞士卫队", color: "#C88888", accent: "#E8A8A8", cName: "Alpine Sunset", cNameCN: "高山落暮", apps: 11, goals: 1, yrs: "2022-23", pos: "MF", alts: [], hasImg: true, desc: "Defined by precision, vigilance, and a fortress-like neutrality at the foot of the Alps. Historically home to the most respected guards in Europe, the nation possesses an unshakeable spirit of commitment like the mountain rock.", descCN: "阿尔卑斯山脚下的中立国，以精准、守望与坚固的堡垒精神著称。瑞士人不仅是精密钟表的制造者，历史上更是整个欧洲最受尊敬的雇佣卫队，其民族性格中有着如同山岩般不可撼动的契约精神。", colorInspiration: "Reflecting the deep red tones of Alpine rock faces glowing in the twilight. It conveys a quiet, reliable sense of defense, representing a silent watch rather than the fire of war.", colorInspirationCN: "这种带有灰度的红色源自阿尔卑斯山岩在余晖下呈现的色调，传达出一种低调且可靠的防御感，代表着其不可撼动的契约精神。", clothing: "Inspired by the iconic Pontifical Swiss Guard uniform, maintaining the high collar and red-blue contrast tailoring, paired with a classic Swiss Halberd—a symbol of loyalty and valor.", clothingCN: "灵感源自著名的教廷瑞士卫队（Pontifical Swiss Guard）制服。保留了标志性的立领与红蓝撞色剪裁；手持的长柄兵器为经典的瑞士长戟（Halberd），它是近卫军忠诚与勇武的象征。", texture: "Braided patterns on the collar and shoulders mimicking traditional Swiss folk embroidery, with a white cross emblem serving as both an identity marker and a tribute to the precision of their defense.", textureCN: "护领与肩部的编织纹路模拟了瑞士传统的民间刺绣工艺，胸前的白十字勋章不仅是身份的标识，更是对其“精准守卫”天性的视觉礼赞。", hasCopy: true, dotColor: "#d52b1eff" },
    { id: "G4", country: "Ukraine", cn: "乌克兰", firstName: "MYKHAILO", player: "MUDRYK", concept: "Cossack Hetman", conceptCN: "哥萨克首领", color: "#D8C870", accent: "#85C1E9", cName: "Wheat Gold", cNameCN: "麦田金", apps: 128, goals: 18, yrs: "2023-", pos: "FW", alts: [], hasImg: true, desc: "Ukraine, the 'Breadbasket of Europe,' is a land of endless steppes and profound historical depth. Its identity is forged in the fierce, independent spirit of the Cossacks and a culture that finds beauty and strength in the golden harvest.", descCN: "乌拉圭被称为“欧洲粮仓”，是一片拥有无尽草原和深厚历史底蕴的土地。其民族认同锻造于哥萨克人勇猛、独立的精神，以及在金色麦浪中寻找美与力量的文化之中。", colorInspiration: "Inspired by the vast, sun-drenched wheat fields under a bright blue sky. This 'Wheat Gold' represents the nation's agricultural soul and the warmth of a bountiful, free land.", colorInspirationCN: "灵感源自明亮蓝天之下、阳光普照的广袤麦田。这种“麦田金”代表了这个国家的农业之魂，以及一片丰饶、自由土地的温暖感。", clothing: "A traditional Cossack officer's attire featuring a fur-trimmed 'Papaha' hat and a high-collared blue mantle, complemented by a 'Bulawa'—the ceremonial mace representing the Hetman's authority.", clothingCN: "一套传统的哥萨克军官装束，包含一顶毛皮滚边的“Papaha”高帽和一件高领蓝色斗篷，并配以象征首领权力的仪式权杖（Bulawa）。", texture: "Detailed 'Vyshyvanka' embroidery patterns along the collar and a weathered wood-and-metal texture on the ceremonial mace, symbolizing the hand-crafted heritage of the Ukrainian heartland.", textureCN: "纹理包含领口处精美的“Vyshyvanka”刺绣图案，以及权杖上饱经风霜的木材与金属质感，象征着乌克兰腹地代代相传的手工艺遗产。", hasCopy: true, dotColor: "#265facff" },
    { id: "G5", country: "Uruguay", cn: "乌拉圭", firstName: "GUS", player: "POYET", concept: "Gentleman King", conceptCN: "绅士国王", color: "#98B8C8", accent: "#FFFFFF", cName: "Montevideo Blue", cNameCN: "蒙得维的亚青", apps: 145, goals: 49, yrs: "1997-01", pos: "MF", alts: [], hasImg: true, desc: "The 'Switzerland of South America' on the banks of the Río de la Plata. Uruguay blends the wild spirit of the Gaucho grasslands with elegant coastal culture, merging rebellious freedom with the grace of South American football.", descCN: "拉普拉塔河畔的明珠，被誉为「南美瑞士」。乌拉圭拥有广袤的高卓人草原与地中海式的优雅沿海文化，其民族精神融合了草原高卓人的不羁与南美足球式的优雅。", colorInspiration: "A misty, grey-toned cyan simulating the dawn over the Río de la Plata and the clear skies of Asunción Bay. It conveys a deep, calm quality, symbolizing the vast and tranquil national character of the Uruguayan people.", colorInspirationCN: "这种带有灰度的青蓝色调模拟了拉普拉塔河清晨的迷雾与亚松森湾明净的天空。它不同于鲜蓝的张扬，更显深沉、冷静，象征着乌拉圭人博大而静谧的民族性格。", clothing: "A tall black top hat paired with a South American gentleman's poncho adorned with gold vine embroidery. This attire fuses Victorian-style British elegance with the wild nature of the Gauchos.", clothingCN: "高耸的黑色大礼帽（Top Hat）与飾有金色藤蔓刺绣的南美式绅士长袍（poncho/gabán）。这种装束融合了维多利亚时代的英式优雅与南美高卓人的草原野性，呈现出一种强烈的异域风情。", texture: "Intricate golden vine embroidery and breastplates featuring Adinkra-inspired symbols. This design pays tribute to the cultural diversity of Uruguay and its tenacious, boundless life force.", textureCN: "长袍上繁复的金色藤蔓刺绣与饰有阿丁克拉符号（Adinkra）的胸饰。这种设计融合了西非艺术元素，致敬了乌拉圭文化的多样性与博大而坚韧的民族生命力。", hasCopy: true, dotColor: "#0038a8ff" },
    { id: "G6", country: "USA", cn: "美国", firstName: "CHRISTIAN", player: "PULISIC", concept: "Liberty Pioneer", conceptCN: "自由先驱", color: "#485878", accent: "#E74C3C", cName: "Independence", cNameCN: "独立蓝", apps: 145, goals: 26, yrs: "2019-23", pos: "FW", alts: [], hasImg: true, desc: "Forged in the fires of revolution, the United States is defined by its pursuit of independence and the pioneering spirit. Its landscape spans from the Atlantic shores to the vast western frontier, embodying the ideals of liberty and individual determination.", descCN: "在革命烽火中锻造而成的美国，以对独立的追求和先驱精神为定义。其领土从大西洋沿岸延伸至广阔的西部边境，体现了自由与个人意志的理想。", colorInspiration: "A deep, steady blue derived from the uniforms of the Continental Army and the vastness of the Atlantic Ocean. This 'Independence' blue represents the unwavering strength and determination of a new nation's birth.", colorInspirationCN: "这种深邃而稳定的蓝色源自大陆军的制服色彩以及大西洋的广阔。这种“独立蓝”代表了一个新国家诞生时毫不动摇的力量与决心。", clothing: "A classic 18th-century Continental Army officer's uniform in navy blue with prominent red lapels, topped with a traditional tricorn hat featuring an embroidered eagle crest.", clothingCN: "身穿18世纪经典的蓝色大陆军军官制服，搭配鲜明的红色翻领，头戴饰有鹰纹绣标的传统三角帽。", texture: "Features military brass buttons and the 'Great Seal' eagle motif on the hat, symbolizing the vigilance and soaring spirit of a nation built on liberty.", textureCN: "纹理包含军事黄铜纽扣与帽子上的白头海雕图章，象征着建立在自由之上的国家的警觉与翱翔精神。", hasCopy: true, dotColor: "#ce2027ff" },
    { id: "G7", country: "Wales", cn: "威尔士", firstName: "MARK", player: "HUGHES", concept: "Red Dragon King", conceptCN: "红龙王", color: "#B87860", accent: "#F7DC6F", cName: "Dragon Copper", cNameCN: "红龙铜", apps: 123, goals: 39, yrs: "1995-98", pos: "FW", alts: [], hasImg: true, desc: "Wales, the 'Land of Castles,' is defined by its rugged Snowdonian peaks and the fierce spirit of the Celtic warriors. Its heritage is embodied by the Y Ddraig Goch (Red Dragon), a symbol of sovereignty and unyielding pride in the face of history.", descCN: "威尔士被称为“城堡之国”，以崎岖的斯诺多尼亚山峰和凯尔特战士的剽悍精神著称。其文化遗产以红龙（Y Ddraig Goch）为化身，那是主权的象征，也是在历史洪流中不屈自尊的体现。", colorInspiration: "A smouldering, metallic copper reflecting the sun-scorched ridges of the Welsh mountains and the ancient bronze-work of Celtic kings. It represents a history forged in fire and stone.", colorInspirationCN: "这种带有金属感的深铜色反映了威尔士山脉被烈日灼烧的背脊，以及凯尔特国王古老的青铜器皿。它代表了在烈火与岩石中锻造而出的历史。", clothing: "Dragon-embossed bronze plate armor paired with a royal maroon cape fastened by floral brooches, merging the raw power of the battlefield with Welsh courtly elegance.", clothingCN: "身披饰有红龙浮雕的青铜板甲，搭配由花卉胸针固定的王室深红斗篷，将战场的原始力量与威尔士宫廷的优雅完美融合。", texture: "Features intricate Celtic knotwork on the armor plates and delicate embroidery of Leeks and Daffodils—the national floral emblems—along the collar and cloak.", textureCN: "纹理包含装甲板上复杂的凯尔特结，以及领口和斗篷上精美的韭葱与水仙花（威尔士国花）绣花。", hasCopy: true, dotColor: "#d20f33ff" },
];

const SHOW_IMG = new Set([
    "Albania", "USA", "Israel", "Finland", "Bosnia", "Canada", "Denmark", "DR Congo", "Ghana", "Iceland", "Colombia", "Senegal",
    "Peru", "Scotland", "Serbia", "Croatia", "Czechia", "Uruguay", "Cameroon", "Jamaica", "Ecuador", "Germany", "Slovakia",
    "Burkina Faso", "Egypt", "IvoryCoast", "Switzerland", "Russia", "Gabon", "N. Zealand", "S. Africa", "Wales", "Romania",
    "Ireland", "Norway", "Morocco", "Netherlands", "N. Ireland", "Australia", "Ukraine", "Nigeria", "Brazil", "Portugal",
]);

function tx(h: string) {
    const r = parseInt(h.slice(1, 3), 16) / 255;
    const g = parseInt(h.slice(3, 5), 16) / 255;
    const b = parseInt(h.slice(5, 7), 16) / 255;
    return 0.299 * r + 0.587 * g + 0.114 * b > 0.5 ? "#1a1a1a" : "#f0f0ee";
}

export function SideNav() {
    const isSBTI = typeof window !== 'undefined' && window.location.pathname.includes('/sbti');
    const [activeIdx, setActiveIdx] = useState(isSBTI ? 1 : 0);
    const [isExpanded, setIsExpanded] = useState(false);

    const navItems = [
        { id: 'kingdom', label: 'KINGDOM', sup: '01', url: '/' },
        { id: 'sbti', label: 'SBTI', sup: '02', url: '/sbti/' }
    ];

    const handleNavClick = (e: React.MouseEvent, index: number, url: string) => {
        e.preventDefault();
        setActiveIdx(index);
        setTimeout(() => {
            setIsExpanded(false);
            setTimeout(() => {
                if (window.location.pathname !== url) {
                    window.location.href = url;
                }
            }, 400);
        }, 2000);
    };

    return (
        <div className="fixed left-4 lg:left-6 top-1/2 -translate-y-1/2 z-[9999] hidden md:block">
            <motion.nav
                initial={false}
                animate={{ width: isExpanded ? 124 : 64, height: isExpanded ? 220 : 64 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="relative flex flex-col items-center bg-[#1a1a1a]/95 backdrop-blur-md p-[2px] rounded-[30px] shadow-2xl border border-white/5 overflow-hidden"
            >
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="relative z-20 shrink-0 w-[60px] h-[60px] rounded-full flex items-center justify-center transition-transform hover:scale-105 outline-none cursor-pointer"
                >
                    <img src="/Title_svg/mylogo.png" alt="Logo" className="w-10 h-10 object-contain" />
                </button>

                <div className="flex flex-col gap-1 w-[108px] mt-1 shrink-0">
                    {navItems.map((item, index) => {
                        const isActive = activeIdx === index;
                        return (
                            <a
                                key={item.id} href={item.url} onClick={(e) => handleNavClick(e, index, item.url)}
                                className={`relative z-10 h-[48px] w-full flex items-center justify-center transition-colors duration-300 rounded-[24px] select-none cursor-pointer ${isActive ? 'text-[#1a1a1a]' : 'text-white/60 hover:text-white'}`}
                                style={{ fontFamily: '"Space Grotesk", sans-serif' }}
                            >
                                {isActive && <motion.div layoutId="vertical-island-pill" className="absolute inset-0 bg-[#e5e5e5] rounded-full -z-10 shadow-sm" transition={{ type: "spring", stiffness: 450, damping: 30 }} />}
                                <span className="font-bold tracking-tight text-[14px] uppercase">{item.label}</span>
                                <sup className="text-[9px] ml-[2px] opacity-70 font-medium tracking-normal -translate-y-[4px]">{item.sup}</sup>
                            </a>
                        );
                    })}

                    <motion.div animate={{ opacity: isExpanded ? 1 : 0 }} transition={{ duration: 0.2, delay: isExpanded ? 0.1 : 0 }} className="flex items-center justify-between w-full mt-1 gap-1">
                        <a href="https://weibo.com/u/6303450848" target="_blank" rel="noopener noreferrer" className="flex-1 h-[36px] p-1.5 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-white/15 hover:text-white transition-all cursor-pointer">
                            <span className="font-bold text-[10px] tracking-widest" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>微博</span>
                        </a>
                        <a href="https://www.xiaohongshu.com/user/profile/629504180000000021021d31" target="_blank" rel="noopener noreferrer" className="flex-1 h-[36px] p-1.5 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-[#ff2442]/80 hover:text-white hover:border-[#ff2442] transition-all cursor-pointer">
                            <span className="font-bold text-[10px] tracking-widest" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>小红书</span>
                        </a>
                    </motion.div>
                </div>
            </motion.nav>
        </div>
    );
}

export default function Kingdom_App() {
    const [lang, setLang] = useState<"en" | "zh">("zh");
    const [cards, setCards] = useState(PLAYERS);
    const [sel, setSel] = useState<any>(null);
    const [isExporting, setIsExporting] = useState(false);
    const [viewMode, setViewMode] = useState<1 | 2 | 3 | 4 | 7>(7);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [dragI, setDragI] = useState<number | null>(null);
    const [overI, setOverI] = useState<number | null>(null);
    const [exportImg, setExportImg] = useState<string | null>(null);

    const t = lang === "en";

    const currentDisplay = useMemo(() => {
        if (viewMode === 7) return cards;
        const limit = viewMode * viewMode;
        return cards.slice(0, limit);
    }, [cards, viewMode]);

    const onDS = (i: number) => { if (viewMode !== 1) setDragI(i); };
    const onDO = (e: React.DragEvent, i: number) => {
        e.preventDefault();
        setOverI(i);
    };
    const onDr = (i: number) => {
        if (dragI !== null && dragI !== i) {
            const c = [...cards];
            const [moved] = c.splice(dragI, 1);
            c.splice(i, 0, moved);
            setCards(c);
        }
        setDragI(null);
        setOverI(null);
    };

    const shuffleCards = () => setCards([...cards].sort(() => Math.random() - 0.5));
    const sortCards = () => setCards([...PLAYERS]);

    // 🌟 终极稳固版导出逻辑 (基于 html2canvas)
    const exportFile = async () => {
        const el = document.getElementById("export-area");
        if (!el) return;

        // 🛡️ 修复 html2canvas 的经典 Bug：如果页面往下滚了，截图会产生白边或偏移
        const prevScrollY = window.scrollY;
        const prevScrollX = window.scrollX;
        window.scrollTo(0, 0);

        setIsExporting(true);
        // 让 DOM 有 600ms 的时间变身 1200px 的大网格
        await new Promise(r => setTimeout(r, 600));

        try {
            const canvas = await html2canvas(el, {
                scale: window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio,
                useCORS: true,
                backgroundColor: "#FFF9EB",
                // 🌟 神级参数 1：欺骗 html2canvas，强行告诉它现在浏览器的窗口有 1200px 宽
                windowWidth: 1200,
                // 🌟 神级参数 2：锁死生成的画布宽度，彻底告别手机端被挤压的细长条！
                width: 1200,
            });

            // 转换成图片数据
            const dataUrl = canvas.toDataURL("image/png", 0.9);

            // 🌟 核心分流：如果是手机端，依然弹窗展示海报让用户长按保存；如果是电脑，直接下载
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
                setExportImg(dataUrl);
            } else {
                const link = document.createElement("a");
                link.download = `chelsea-kingdom-${Date.now()}.png`;
                link.href = dataUrl;
                link.click();
            }
        } catch (err: any) {
            console.error("图片导出失败:", err);
            alert(`生成失败: 请检查网络或刷新页面重试`);
        } finally {
            setIsExporting(false);
            // 🛡️ 截图完成后，把页面悄悄滚回用户之前看的位置
            window.scrollTo(prevScrollX, prevScrollY);
        }
    };

    const crownSvg = (color: string) =>
        `data:image/svg+xml,${encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 28" fill="none"><path d="M4 24L8 8L14 16L20 4L26 16L32 8L36 24H4Z" fill="${color}" fill-opacity="0.15"/><path d="M4 24L8 8L14 16L20 4L26 16L32 8L36 24" stroke="${color}" stroke-width="1.5" stroke-opacity="0.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`
        )}`;

    return (
        <div className="min-h-screen font-salo text-[#1a1a1a] selection:bg-black/10 flex flex-col">
            <header className="h-10 w-full"></header>

            <main className="px-4 py-2 w-full max-w-5xl mx-auto flex-1 flex flex-col relative mt-8">
                <div className="relative text-center mb-10 flex flex-col items-center w-full">
                    <div className="absolute top-0 left-0 z-50">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center gap-2 px-3 py-1.5 text-xs font-inter border border-gray-300 bg-white hover:bg-black/5 transition-colors uppercase select-none">
                            <LayoutGrid className="w-3.5 h-3.5" />
                            <span>Grid</span>
                            <ChevronDown className={`w-3 h-3 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="absolute top-full left-0 mt-1 bg-white border border-gray-300 shadow-xl min-w-[120px] overflow-hidden">
                                    {[7, 4, 3, 2, 1].map((m) => (
                                        <button key={m} onClick={() => { setViewMode(m as any); setIsMenuOpen(false); }} className={`w-full px-4 py-2.5 text-[10px] text-left font-inter tracking-widest hover:bg-black hover:text-white transition-colors uppercase ${viewMode === m ? 'bg-black/5 font-bold' : ''}`}>
                                            {m}×{m}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="absolute top-0 right-0 z-10">
                        <button onClick={() => setLang((l) => (l === "en" ? "zh" : "en"))} className="flex items-center gap-2 px-3 py-1.5 text-xs font-inter font-normal border border-gray-300 rounded-none hover:bg-black/5 transition-colors tracking-[0.1em] uppercase cursor-pointer">
                            <Globe className="w-3.5 h-3.5" />
                            {t ? "中文" : "EN"}
                        </button>
                    </div>

                    <h1 className="flex justify-center w-full">
                        <img src="/Title_svg/Title.png" alt="Chelsea Kingdom" className="h-[22px] md:h-[34px] lg:h-[56px] object-contain" />
                    </h1>
                    <div className="flex justify-center w-full mt-3 lg:mt-4">
                        <img src="/Title_svg/Subtitle.png" alt="49 NATIONS, 49 KINGS" className="h-[11px] md:h-[16px] lg:h-[22px] object-contain" />
                    </div>
                    <p className="text-[14px] text-gray-400 mt-3 tracking-[0.12em] uppercase font-inter font-light">
                        {t ? "Click details · Drag to reorder" : "单击详情 · 拖拽排列"}
                    </p>
                </div>

                <div className="relative w-full overflow-hidden bg-[#f5f3ef]">
                    <div
                        id="export-area"
                        className={`${isExporting ? 'pointer-events-none p-[80px] bg-[#FFF9EB]' : 'transition-all duration-500 pointer-events-auto bg-[#f5f3ef]'} ${(viewMode === 1 && !isExporting) ? 'flex flex-nowrap w-max' : 'grid gap-0 w-full'
                            } ${(viewMode === 7 || (viewMode === 1 && isExporting)) ? 'grid-cols-4 sm:grid-cols-5 md:grid-cols-7' : viewMode === 4 ? 'grid-cols-4' : viewMode === 3 ? 'grid-cols-3' : 'grid-cols-2'
                            }`}
                        style={
                            isExporting
                                ? { width: '1200px', gap: '0' }
                                : (viewMode === 1 ? { animation: `marquee ${(cards.length) * 3}s linear infinite` } : {})
                        }
                    >
                        {(viewMode === 1 ? [...cards, ...cards] : currentDisplay).map((c, idx) => {
                            const tc = tx(c.color);
                            const safeImgName = c.id === "B4" ? "IvoryCoast" : c.country;

                            return (
                                <motion.div
                                    layout
                                    key={`${c.id}-${idx}`}
                                    draggable={viewMode !== 1 && !isExporting}
                                    onDragStart={() => onDS(idx)}
                                    onDragOver={(e: any) => onDO(e, idx)}
                                    onDrop={() => onDr(idx)}
                                    onDragEnd={() => { setDragI(null); setOverI(null); }}
                                    onClick={() => setSel(c)}
                                    whileHover={(!isExporting && viewMode !== 1) ? { scale: 1.05, zIndex: 10 } : {}}
                                    whileTap={(!isExporting && viewMode !== 1) ? { scale: 0.95 } : {}}
                                    className={`relative aspect-square flex-shrink-0 flex flex-col items-center justify-end cursor-pointer overflow-hidden shadow-sm hover:shadow-xl transition-shadow rounded-none select-none ${(viewMode === 1 && !isExporting) ? 'w-[calc(100vw-32px)] max-w-5xl' : 'w-full'}`}
                                    style={{
                                        background: c.color,
                                        opacity: dragI === idx ? 0.4 : 1,
                                        outline: overI === idx ? "2px solid #1a1a1a" : "none",
                                    }}
                                >
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] opacity-15 pointer-events-none z-0 crown-icon">
                                        <img src={crownSvg(tc)} alt="" className="w-[60%] min-w-[30px] max-w-[50px] mx-auto" />
                                    </div>

                                    {SHOW_IMG.has(c.country) && c.hasImg && (
                                        <div className="absolute inset-0 z-10 pointer-events-none">
                                            <img
                                                src={`/THUMBNAIL/${safeImgName}.png`}
                                                alt={c.player}
                                                className="w-full h-full object-cover"
                                                crossOrigin="anonymous"
                                                onLoad={(e) => {
                                                    const crown = e.currentTarget.parentElement?.previousElementSibling as HTMLElement;
                                                    if (crown && crown.classList.contains('crown-icon')) {
                                                        crown.style.display = 'none';
                                                    }
                                                }}
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </main>

            <footer className="w-full max-w-5xl mx-auto px-4 pt-12 pb-28 md:pb-12 flex flex-wrap justify-center items-center gap-4">
                <button onClick={shuffleCards} className="flex items-center gap-2 px-6 py-3 text-[11px] font-inter font-normal border border-gray-300 rounded-none hover:bg-black/5 transition-colors tracking-[0.1em] uppercase cursor-pointer">
                    <Shuffle className="w-4 h-4" />
                    <span className="hidden sm:inline">{t ? "Shuffle" : "随机打乱"}</span>
                </button>
                <button onClick={sortCards} className="flex items-center gap-2 px-6 py-3 text-[11px] font-inter font-normal border border-gray-300 rounded-none hover:bg-black/5 transition-colors tracking-[0.1em] uppercase cursor-pointer">
                    <ArrowDownAZ className="w-4 h-4" />
                    <span className="hidden sm:inline">{t ? "Sort" : "字母排序"}</span>
                </button>
                <button onClick={exportFile} disabled={isExporting} className="flex items-center gap-2 px-6 py-3 text-[11px] font-inter font-normal border border-gray-300 rounded-none hover:bg-black/5 transition-colors tracking-[0.1em] uppercase cursor-pointer disabled:opacity-50">
                    <Download className="w-4 h-4" />
                    {isExporting ? "..." : (t ? "Export PNG" : "导出图片")}
                </button>
            </footer>

            <style>{`
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
            `}</style>

            <AnimatePresence>
                {sel && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSel(null)} className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 md:p-8">
                        <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} onClick={(e: any) => e.stopPropagation()} className="bg-[#fbfaf9] w-full max-w-[650px] h-[90vh] max-h-[900px] shadow-2xl rounded-none flex flex-col relative">
                            <button onClick={() => setSel(null)} className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-none bg-white/50 backdrop-blur hover:bg-white/80 transition-colors cursor-pointer z-50 shadow-sm">
                                <X className="w-4 h-4 text-gray-900" />
                            </button>

                            <div className="custom-scrollbar flex-1 relative flex flex-col bg-[#fbfaf9]" style={{ overflowY: 'overlay' as any }}>
                                <div className="relative w-full aspect-square shrink-0 flex items-center justify-center overflow-hidden" style={{ backgroundColor: sel.color }}>
                                    {SHOW_IMG.has(sel.country) && (
                                        <img src={`/THUMBNAIL/${sel.country === "Côte d'Ivoire" ? "IvoryCoast" : sel.country}.png`} alt={sel.country} className="w-full h-full object-cover absolute inset-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                    )}
                                    {sel.hasCopy && (
                                        <div className="absolute inset-0 pointer-events-none p-6">
                                            <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.9)", color: "#000" }} onClick={() => document.getElementById('section-stats')?.scrollIntoView({ behavior: 'smooth' })} className="absolute top-[20%] left-[10%] pointer-events-auto bg-black/40 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-[12px] font-inter tracking-widest uppercase shadow-xl flex items-center gap-2 transition-colors">
                                                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: sel.color }} />
                                                {t ? "Player Stats" : "球员数据"}
                                            </motion.button>
                                            <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.9)", color: "#000" }} onClick={() => document.getElementById('section-color')?.scrollIntoView({ behavior: 'smooth' })} className="absolute bottom-[35%] right-[10%] pointer-events-auto bg-black/40 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-[12px] font-inter tracking-widest uppercase shadow-xl flex items-center gap-2 transition-colors">
                                                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: sel.color }} />
                                                {t ? "Color Story" : "色彩故事"}
                                            </motion.button>
                                            <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.9)", color: "#000" }} onClick={() => document.getElementById('section-desc')?.scrollIntoView({ behavior: 'smooth' })} className="absolute bottom-[15%] left-[15%] pointer-events-auto bg-black/40 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-[12px] font-inter tracking-widest uppercase shadow-xl flex items-center gap-2 transition-colors">
                                                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: sel.color }} />
                                                {t ? "Heritage" : "历史传承"}
                                            </motion.button>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 md:p-10 flex flex-col gap-10 z-20">
                                    <div id="section-stats" className="flex gap-4 scroll-mt-6 mb-2">
                                        {[{ l: t ? "Appearances" : "出场", v: sel.apps }, { l: t ? "Period" : "效力", v: sel.yrs }, { l: t ? "Goals" : "进球", v: sel.goals }].map((s, i) => (
                                            <div key={i} className="bg-[#ECEEF2] aspect-[2/1] px-2 flex-1 text-center rounded-none flex flex-col items-center justify-center">
                                                {SHOW_IMG.has(sel.country) && <div className={`font-salo text-black leading-none ${(sel.cn === "科特迪瓦" && i === 1) ? 'text-[22px] tracking-[1px]' : 'text-[32px] tracking-[3.2px]'}`}>{s.v}</div>}
                                                <div className="text-[10px] md:text-xs font-inter font-medium text-black tracking-[0.1em] uppercase mt-1">{s.l}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div id="section-color" className="flex gap-6 items-stretch scroll-mt-6">
                                        <div className="w-24 md:w-28 aspect-square shrink-0 rounded-none shadow-inner" style={{ backgroundColor: sel.color }} />
                                        <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                                            <div>
                                                <h4 className="text-[20px] md:text-[24px] font-salo text-black uppercase tracking-[3.2px] leading-none" style={{ fontFeatureSettings: '"ss01" on' }}>{t ? sel.cName : sel.cNameCN}</h4>
                                                <span className="text-gray-400 font-inter font-light text-[11px] md:text-[13px] uppercase leading-none mt-2 block">{sel.color}</span>
                                            </div>
                                            <p className="text-[10px] md:text-[11px] text-gray-800 leading-relaxed font-noto">
                                                {sel.hasCopy ? (t ? sel.colorInspiration : sel.colorInspirationCN) : (t ? `The color ${sel.cName} is deeply rooted in the heritage of ${sel.country}.` : `${sel.cNameCN}是一种融合了该国历史与自然景观的复合色调。`)}
                                            </p>
                                        </div>
                                    </div>

                                    {sel.hasCopy && (
                                        <>
                                            <hr className="border-gray-200" />
                                            <div id="section-desc" className="scroll-mt-6">
                                                <div className="inline-flex items-center gap-2 bg-[#fbfaf9] px-3 py-1.5 rounded-full border border-gray-200 mb-4">
                                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sel.dotColor || '#ff4d4f' }}></div>
                                                    <span className="text-sm font-bold text-gray-800 font-inter uppercase tracking-widest">{t ? "Country Introduction" : "国家介绍"}</span>
                                                </div>
                                                <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line font-noto">{t ? sel.desc : sel.descCN}</p>
                                            </div>
                                            <div id="section-clothing" className="scroll-mt-6">
                                                <div className="inline-flex items-center gap-2 bg-[#fbfaf9] px-3 py-1.5 rounded-full border border-gray-200 mb-4">
                                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sel.dotColor || '#7b68ee' }}></div>
                                                    <span className="text-sm font-bold text-gray-800 font-inter uppercase tracking-widest">{t ? "Clothing Inspiration" : "服饰灵感"}</span>
                                                </div>
                                                <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line font-noto">{t ? sel.clothing : sel.clothingCN}</p>
                                            </div>
                                            <div id="section-texture" className="scroll-mt-6">
                                                <div className="inline-flex items-center gap-2 bg-[#fbfaf9] px-3 py-1.5 rounded-full border border-gray-200 mb-4">
                                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sel.dotColor || '#2ecc71' }}></div>
                                                    <span className="text-sm font-bold text-gray-800 font-inter uppercase tracking-widest">{t ? "Texture Inspiration" : "纹理灵感"}</span>
                                                </div>
                                                <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line font-noto">{t ? sel.texture : sel.textureCN}</p>
                                            </div>
                                        </>
                                    )}
                                    <div className="text-center mt-8 mb-4">
                                        <p className="text-[13px] leading-[25px] tracking-normal text-gray-400 italic font-inter font-light">Made by: @cjonthebeat</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {exportImg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8"
                        onClick={() => setExportImg(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="relative flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <p className="text-white/80 text-[12px] tracking-widest mb-4 uppercase font-inter flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                {t ? "Long press to save image" : "长按图片保存"}
                            </p>
                            <img
                                src={exportImg}
                                alt="Exported Kingdom"
                                className="max-h-[70vh] w-auto object-contain shadow-2xl border border-white/10"
                            />
                            <button
                                onClick={() => setExportImg(null)}
                                className="mt-8 px-8 py-2.5 border border-white/30 text-white text-[11px] uppercase tracking-widest rounded-none hover:bg-white/10 transition-colors"
                            >
                                {t ? "Close" : "关闭"}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}