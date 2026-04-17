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
  { id: "A3", country: "Australia", cn: "澳大利亚", firstName: "MARK", player: "BOSNICH", concept: "Southern Cross", conceptCN: "南十字守护者", color: "#C49858", accent: "#229954", cName: "Outback Ochre", cNameCN: "红土赭", apps: 50, goals: 0, yrs: "1996-03", pos: "GK", alts: [], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#012480ff" },
  { id: "A4", country: "Belgium", cn: "比利时", firstName: "EDEN", player: "HAZARD", concept: "Saxe-Coburg Duke", conceptCN: "萨克森-科堡公爵", color: "#937060", accent: "#423F3E", cName: "Chocolate", cNameCN: "巧克力棕", apps: 352, goals: 110, yrs: "2012-19", pos: "FW", alts: [], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#ffdf00ff" },
  { id: "A5", country: "Bosnia", cn: "波黑", firstName: "ASMIR", player: "BEGOVIĆ", concept: "Ottoman Noble", conceptCN: "奥斯曼贵族", color: "#8898B8", accent: "#F1C40F", cName: "Sarajevo Blue", cNameCN: "萨拉热窝蓝", apps: 33, goals: 0, yrs: "2015-17", pos: "GK", alts: [], hasImg: true, desc: "Bosnia is the meeting point of Eastern and Western civilizations, where Ottoman heritage and Balkan determination intertwine deeply. The minarets of Sarajevo and mountain mist have cultivated a national character of composure, restraint, and profound tolerance — the spirit of a true guardian.", descCN: "波黑是东西方文明的交汇之窗，奥斯曼遗风与巴尔干意志在这里深度交融。萨拉热窝的塔楼与深山薄雾共同孕育了其国民沉稳、内敛且极具包容性的守望者性格。", colorInspiration: "Drawn from the morning mist of Bosnia's mountain highlands, this composed grey-blue symbolizes the deep historical roots of the Balkans and the vast, quiet resilience of its people.", colorInspirationCN: "源自波黑山区清晨的薄雾，这种冷静的灰蓝色调象征着巴尔干半岛深邃的历史底蕴与博大而静谧的民族性格。", clothing: "A classic Ottoman-style noble's kaftan paired with an elaborate turban adorned with a crescent crest. This attire pays homage to Bosnia's multicultural history while giving the goalkeeper the commanding presence of a sage-like leader.", clothingCN: "采用了经典的奥斯曼风格贵族长袍（Kaftan），搭配饰有半月纹章的华丽头巾。这种装束不仅致敬了其多元文化历史，也赋予了门将一种如智者般的领袖气场。", texture: "Delicate Islamic arabesque patterns with gold-thread highlights. The flowing lines symbolize quiet, steadfast order persisting through turbulent history — a visually sacred decorative beauty.", textureCN: "细密的伊斯兰蔓草纹（Arabesque）与局部金线勾勒。流动的线条象征着在动荡历史中依然静谧守望的生命秩序，在视觉上呈现出一种神圣的装饰美感。", hasCopy: true, dotColor: "#2c3982ff" },
  { id: "A6", country: "Brazil", cn: "巴西", player: "T. SILVA", concept: "Amazon Chief", conceptCN: "亚马逊领袖", color: "#88BE70", accent: "#F4D35E", cName: "Amazon Green", cNameCN: "亚马逊绿", apps: 116, goals: 6, yrs: "2020-23", pos: "DF", alts: [], hasImg: false, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#009c3bff" },
  { id: "A7", country: "Burkina Faso", cn: "布基纳法索", player: "B. TRAORÉ", concept: "Mossi King", conceptCN: "莫西族王", color: "#C8A898", accent: "#922B21", cName: "Sahel Sand", cNameCN: "萨赫勒沙粉", apps: 16, goals: 2, yrs: "2014-17", pos: "FW", alts: [], hasImg: true, desc: "The 'Land of Incorruptible People' in the heart of the Sahel. Burkina Faso possesses the endurance of the sun-baked earth and the dignity of ancient Mossi traditions. It is a nation of unwavering resilience, standing proud in the vast Sahelian plains.", descCN: "布基纳法索坐落于萨赫勒荒原腹地。这片「正直者之乡」的人民拥有如烈日炙烤红土般的坚韧，与莫西族古老传统的尊严。这是一个在广阔萨赫勒平原上傲然屹立、绝不屈服的国度。", colorInspiration: "Sahel Sand mirrors the sun-baked clay of the Sahel landscape, representing the enduring spirit and grounded nature of the Burkinabé people.", colorInspirationCN: "源自被烈日炙烤的红土质感，这种沙粉色调象征着部族顽强的生命力以及对大地的深沉眷恋。", clothing: "A traditional Mossi grand boubou with a decorative Kufi hat, reflecting the cultural dignity and stature of the Mossi people within the Sahel.", clothingCN: "萨赫勒式刺绣大袍（Grand Boubou）搭配装饰性的库非帽（Kufi）。这种装束展现了莫西人特有的文化尊严与庄重感。", texture: "Geometric patterns that symbolize ancestral order and deep reverence for the earth, manifesting communal harmony and sacred connection.", textureCN: "交织的几何图腾。这些纹样代表了莫西文化（Mossi）对祖先秩序的遵循以及对自然秩序的尊崇。", hasCopy: true, dotColor: "#f02a2fff" },
  { id: "B1", country: "Cameroon", cn: "喀麦隆", player: "ETO'O", concept: "Bamoun King", conceptCN: "巴蒙王", color: "#68A468", accent: "#196F3D", cName: "Rainforest", cNameCN: "雨林绿", apps: 35, goals: 12, yrs: "2013-14", pos: "FW", alts: [], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#007a5eff" },
  { id: "B2", country: "Canada", cn: "加拿大", player: "FORREST", concept: "Northern King", conceptCN: "北境之王", color: "#D09070", accent: "#F4F6F7", cName: "Maple Orange", cNameCN: "枫叶橙红", apps: 3, goals: 0, yrs: "1996-97", pos: "MF", alts: [], hasImg: true, desc: "Canada — the Great White North — is defined by the conquest of vast wilderness and the steadfast maintenance of civilized order. Preserving the disciplined traditions of the Commonwealth while embracing the expansive spirit born of coexistence with glaciers and forests — pure and boundless.", descCN: "「大白北之地」加拿大，其精神核心在于对广袤荒野的征服与对文明秩序的坚守。这里既保留了英联邦的严谨传统，也拥有与冰原、森林共生的旷达性格，纯粹而宽广。", colorInspiration: "Inspired by the rich terracotta hue of maple forests just before they turn crimson — a blend of earth and woodland that conveys the vast vitality and warm spirit of the North American continent.", colorInspirationCN: "灵感源自秋季枫林转红前，那抹融合了大地与森林的陶土色。它传达出北美大陆广袤的生命力与特有的温厚情怀。", clothing: "Royal ceremonial robes fused with Arctic elements — the iconic maple leaf crown paired with a heavy snow-country fur mantle, projecting the unique authority of a northern lord and mastery over the harshest environments.", clothingCN: "结合了北极圈元素的王室礼服。标志性的枫叶王冠与厚重的雪地皮草披肩相称，展现出一种北方领主独有的威严与对极寒环境的掌控力。", texture: "Recurring heraldic maple leaf motifs woven throughout the crown and chest piece. Each leaf transformed into a coat-of-arms emblem — symbolizing an eternal flame of national spirit that will never be extinguished on this frozen land.", textureCN: "王冠与胸饰中反复出现的枫叶几何变体。每一片枫叶都经过了徽章化的艺术处理，象征着在这片冰封土地上永不熄灭的民族生命火焰。", hasCopy: true, dotColor: "#ff0000ff" },
  { id: "B3", country: "Colombia", cn: "哥伦比亚", player: "CUADRADO", concept: "Muisca Gold", conceptCN: "黄金酋长", color: "#D8C858", accent: "#5B2C6F", cName: "Gold Chief", cNameCN: "黄金酋长", apps: 15, goals: 2, yrs: "2015-17", pos: "MF", alts: [], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#fcd116ff" },
  { id: "B4", country: "Côte d'Ivoire", cn: "科特迪瓦", player: "D. DROGBA", concept: "Akan King", conceptCN: "阿坎族王", color: "#E3D1C1", accent: "#F18E1C", cName: "Savannah Ivory", cNameCN: "稀树草原象牙白", apps: 381, goals: 164, yrs: "2004-12, 14-15", pos: "FW", alts: ["African Andy Lau"], hasImg: true, desc: "A symbol of West African strength, Côte d'Ivoire thrives on Akan culture and the power of its legendary leaders. This is a land of vibrant traditions, where the courage of warriors meets the wisdom of kings, creating an eternal legacy of resilience.", descCN: "科特迪瓦是西非力量的象征。阿坎文化与传奇领袖的力量在这里交相辉映。这是一个充满活力的传统之地，战士的勇气与国王的智慧在这里相遇，铸就了永恒的坚韧传奇。", colorInspiration: "Inspired by the vast savannahs and serene lagoons of the Ivory Coast, this ivory-white symbolizes noble heritage and the tranquil prosperity of West Africa.", colorInspirationCN: "源自科特迪瓦广袤的稀树草原与宁静的潟湖，这种象牙白色调象征着西非大地的富庶、高贵与纯洁。", clothing: "Noble Akan Kente cloth with a crown of Adinkra symbols. The Kente cloth, draped in the traditional Akan manner, represents the wearer's high status and military leadership.", clothingCN: "尊贵的阿坎族肯特织物与饰有阿丁克拉符号的金质王冠。这种传统的斜肩披挂方式彰显了领袖般的威严。", texture: "Complex weaving patterns conveying a legacy of leadership. These intricate designs narrate the epic history of heroic leaders and the enduring strength of the community.", textureCN: "复杂的编织图案。这些纹路不仅是西非纺织艺术的瑰宝，也记录了部族历史中的英雄史诗与领导力传承。", hasCopy: true, dotColor: "#009e60ff" },
  { id: "B5", country: "Croatia", cn: "克罗地亚", firstName: "MATEO", player: "KOVAČIĆ", concept: "Adriatic King", conceptCN: "亚得里亚海之王", color: "#60B8C8", accent: "#EAEDED", cName: "Adriatic Teal", cNameCN: "亚得里亚青", apps: 221, goals: 4, yrs: "2018-23", pos: "MF", alts: [], hasImg: true, desc: "Situated along the Adriatic coast, Croatia boasts thousands of years of maritime history and a resilient Dalmatian spirit. It is a nation that blends Mediterranean elegance with Central European fortitude, possessing a national character of storm-like strength and an absolute pursuit of freedom.", descCN: "座落于亚得里亚海沿岸，克罗地亚拥有数千年的航海历史与坚韧的达尔马提亚精神。这是一个兼具地中海式优雅与中欧式刚毅的国度，其民族性格中自带一种如同风暴般强劲的力量与对自由的绝对追求。", colorInspiration: "Drawn from the crystal-clear waters of the Dalmatian coast and the lucid morning skies, this bright teal symbolizes the unyielding Croatian will and a vigilant outlook on infinite possibilities.", colorInspirationCN: "源自达尔马提亚海岸清澈的海水与清晨明净的天空，这种明亮的青色调象征着克罗地亚式的不屈意志与对无限可能的守望，视觉上干净利落且充满张力。", clothing: "A grand Croatian royal crown encrusted with jewels, paired with the iconic checkered robe (šahovnica). This attire merges aristocratic solemnity with the most recognizable visual symbol of the pitch, projecting a powerful national identity.", clothingCN: "镶嵌大量宝石的克罗地亚皇家冠冕，搭配典型的格纹袍服（shovnica）。这种装束将克罗地亚式的贵族庄重与赛场上的标志性视觉符号相融合，呈现出一种强烈的民族认同感。", texture: "The Croatian chequy (checkerboard) pattern woven into the fabric. More than just a national totem, this red-and-white grid symbolizes the unity of the people and the generational passing of honor.", textureCN: "袍服上的克罗地亚棋盘格（Chequy）。这种红白相间的格纹不仅是国家图腾，也象征着克罗地亚人的团结与对荣耀的代代传承。", hasCopy: true, dotColor: "#181797ff" },
  { id: "B6", country: "Czechia", cn: "捷克", firstName: "PETR", player: "ČECH", concept: "Bohemian King", conceptCN: "波希米亚国王", color: "#788A9F", accent: "#E74C3C", cName: "Bohemian Blue", cNameCN: "波希米亚灰蓝", apps: 494, goals: 0, yrs: "2004-15", pos: "GK", alts: [], hasImg: true, desc: "The heart of Central Europe and the cradle of Bohemian culture. Czechia possesses deep industrial roots and artistic mastery; its national character fuses rational precision with Bohemian romanticism—a land of ancient majesty and modern wisdom.", descCN: "中欧的心脏，波西米亚文化的摇篮。捷克拥有深厚的工业底蕴与艺术造诣，其民族性格融合了理性的精准与波西米亚式的浪漫，是一个兼具古老威严与现代智慧的国度。", colorInspiration: "This muted blue simulates the Vltava River at dusk beneath Prague Castle. Less brazen than vivid blue, it is composed and calm, honoring the profound historical depth and quiet resilience of this territory.", colorInspirationCN: "这种带有灰度的蓝色调模拟了布拉格城堡下，伏尔塔瓦河在黄昏时的水色。它不同于鲜蓝的张扬，更显沉稳、冷静，致敬这片土地深邃的历史底蕴与博大而静谧的民族性格。", clothing: "An incredibly lavish Bohemian royal crown paired with deep blue priestly robes adorned with lion heraldry. This heavy ceremonial dress projects the authority of a king and gives Cech an indestructible, fortress-like presence.", clothingCN: "极其奢华的波西米亚皇家冠冕与饰有狮子纹章的深蓝色祭司袍。这种重装礼服不仅彰显了波西米亚国王的威严，也赋予了门将切赫一种堡垒般不可摧毁的气场。", texture: "Intricate golden lion motifs. This double-tailed lion is not only the national totem but a symbol of the Czech people's steadfast belief in courage and absolute protection.", textureCN: "袍服上繁复的金色狮子纹章。这种双尾狮不仅是国家图腾，也象征着捷克人民对勇气与绝对守卫的坚定信念。", hasCopy: true, dotColor: "#11457eff" },
  { id: "B7", country: "Denmark", cn: "丹麦", player: "GRØNKJÆR", concept: "Viking King", conceptCN: "维京北欧王", color: "#A87075", accent: "#D5DBDB", cName: "Copenhagen", cNameCN: "哥本哈根砖", apps: 119, goals: 11, yrs: "2000-04", pos: "DF", alts: [], hasImg: true, desc: "As Scandinavia's guardian, Denmark is the emblem of ancient Nordic royal power. From the Viking Age that commanded the seas to its modern role as a beacon of minimalism, the Danish character fuses the adventurous blood of pirates with the austere restraint of royalty.", descCN: "作为斯堪的纳维亚的守卫者，丹麦是北欧古老王权的象征。从横行海上的维京时代到现代极简主义的灯塔，其民族性格完美融合了海盗的冒险血脉与皇家的冷峻克制。", colorInspiration: "A polar twilight hue tinged with grey — symbolizing the cold afterglow over the North Atlantic, adding an epic, weighty sense of nostalgia to the image.", colorInspirationCN: "这是一种带有灰度的极地晚霞色，象征着北大西洋海面上冰冷的余晖，为画面平添了一抹史诗般的厚重怀旧感。", clothing: "A silver chainmail bearing the Viking imprint, paired with a rugged fur cloak. A simple geometric crown stripped of excessive jewels — presenting Nordic kingship in its most modern epic form.", clothingCN: "带有维京烙印的银制锁子甲与粗粝的皮草斗篷。简约的几何王冠剔除了繁琐的宝石堆砌，用最干练的线条呈现出北欧王权的现代史诗感。", texture: "Ancient runic inscriptions (Runes) and Norse knotwork etched into clasps and leather straps. These mysterious symbols represent the wisdom passed down through the long polar nights, bestowing the player with a saga-like legendary identity.", textureCN: "饰扣与皮革带上刻有的古老卢恩文字（Runes）与北欧结纹样。这些神秘的符文象征着漫长极夜中传承的智慧，赋予了球员萨迦史诗般的身份背景。", hasCopy: true, dotColor: "#d80027ff" },
  { id: "C1", country: "DR Congo", cn: "刚果金", firstName: "GAËL", player: "KAKUTA", concept: "Congo River King", conceptCN: "刚果河之王", color: "#60A8A8", accent: "#F39C12", cName: "Congo Teal", cNameCN: "刚果河青", apps: 16, goals: 0, yrs: "2009-15", pos: "MF", alts: [], hasImg: true, desc: "Nestled in the heart of Africa, DR Congo possesses the mysterious tribal civilization of the deep rainforest and an art language pulsating with rhythm. This is a multi-ethnic nation brimming with primal vitality and complex historical tension.", descCN: "坐落于非洲心脏的刚果金，拥有雨林深处的神秘部落文明与极具节奏感的艺术语言。这是一个充满原始生命力与复杂历史张力的多民族国度。", colorInspiration: "Drawn from the rushing waters of the deep Congo River, this cool blue-green represents the mysterious yet magnificent primal vitality of rainforest civilization.", colorInspirationCN: "源自刚果河深处奔腾的水色，这种清冷的青绿色调代表了雨林文明神秘而磅礴的原始生命力。", clothing: "A traditional chief's long robe blended with a tribal crown rendered in modern metalwork. This design showcases the unique visual journey of African civilization transitioning from ancient tradition to modern power.", clothingCN: "采用了刚果酋长式的传统长袍，并融合了现代金属加工质感的部族王冠。这种设计展示了非洲文明从古老传统向现代力量过渡的独特视觉景观。", texture: "Geometric reconstructions inspired by Kuba cloth weaving. The mathematically precise arrangements convey a rhythmic pulse — symbolizing the unceasing bloodline of tribal society.", textureCN: "纹路灵感源自库巴织物（Kuba cloth）的几何重构。通过数学般的严谨排列呈现出律动感，象征着部族社会生生不息的血脉脉搏。", hasCopy: true, dotColor: "#007fffff" },
  { id: "C2", country: "Ecuador", cn: "厄瓜多尔", player: "CAICEDO", concept: "Sun King", conceptCN: "赤道阳光之王", color: "#78A888", accent: "#2E86C1", cName: "Galápagos", cNameCN: "加拉帕戈斯绿", apps: 130, goals: 5, yrs: "2022-", pos: "MF", alts: [], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#ffdd00ff" },
  { id: "C3", country: "Egypt", cn: "埃及", player: "M. SALAH", concept: "Pharaoh", conceptCN: "法老", color: "#C7AB8C", accent: "#000000", cName: "Sahara Sand", cNameCN: "撒哈拉金沙", apps: 19, goals: 2, yrs: "2014-16", pos: "FW", alts: [], hasImg: true, desc: "The cradle of civilization, Egypt is the home of the eternal Nile and the majestic Sahara.Millennia of history are etched into the desert sands, where ancient wisdom and modern ambition converge beneath the watchful eyes of the Great Sphinx.", descCN: "埃及是文明的摇篮。永恒的尼罗河与壮阔的撒哈拉在这里交汇。千年的历史深深烙印在荒漠的流沙中，古老的智慧与现代的抱负在大狮身人面像的注视下完美融合。", colorInspiration: "Sahara Sand captures the timeless hue of Giza, reflecting the eternal glow of the desert sun against ancient monuments and millennia of heritage.", colorInspirationCN: "源自撒哈拉大漠中金字塔映衬下的沙尘色调。这种金沙色象征着跨越千年的文明积淀，散发着永恒的时间光泽。", clothing: "Iconic Nemes headdress and golden pectoral plate, transforming the player into a modern-day Pharaoh, symbolizing divine leadership and authority.", clothingCN: "标志性的法老“奈姆斯”（Nemes）头巾与金质护胸。这种极具辨识度的王室装束赋予了球员如法老般统领全场的绝对权威。", texture: "The winged scarab motif representing rebirth and the eternal cycle, evoking the spiritual depth and mathematical brilliance of ancient Egyptian art.", textureCN: "圣甲虫图腾与象形文字。这些纹样在神圣的对称中象征着生命的轮回再生与不朽的民族荣耀。", hasCopy: true, dotColor: "#000000ff" },
  { id: "C4", country: "England", cn: "英格兰", player: "TERRY", concept: "Tudor King", conceptCN: "都铎王朝国王", color: "#985050", accent: "#EAD8C0", cName: "Tudor Red", cNameCN: "都铎深红", apps: 717, goals: 67, yrs: "1998-17", pos: "DF", alts: ["LAMPARD"], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#d01025ff" },
  { id: "C5", country: "Finland", cn: "芬兰", player: "FORSSELL", concept: "Sámi Leader", conceptCN: "萨米族领袖", color: "#98B8D8", accent: "#FDFEFE", cName: "Aurora Blue", cNameCN: "极光蓝", apps: 37, goals: 9, yrs: "1998-05", pos: "FW", alts: [], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#003580ff" },
  { id: "C6", country: "France", cn: "法国", player: "KANTÉ", concept: "Bourbon Noble", conceptCN: "波旁王朝贵族", color: "#9A98C8", accent: "#F1F1F1", cName: "Provence", cNameCN: "普罗旺斯紫", apps: 269, goals: 13, yrs: "2016-23", pos: "MF", alts: ["MAKELÉLÉ"], hasImg: false, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#0000ffff" },
  { id: "C7", country: "Gabon", cn: "加蓬", player: "AUBAMEYANG", concept: "Fang King", conceptCN: "方族雨林之王", color: "#3E886B", accent: "#27AE60", cName: "Rainforest Jade", cNameCN: "雨林翠", apps: 21, goals: 3, yrs: "2022-23", pos: "FW", alts: [], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#009e60ff" },
  { id: "D1", country: "Germany", cn: "德国", player: "BALLACK", concept: "Prussian Monarch", conceptCN: "普鲁士君主", color: "#7C8C9C", accent: "#D4AC0D", cName: "Prussian Iron", cNameCN: "普鲁士铁", apps: 167, goals: 25, yrs: "2006-10", pos: "MF", alts: ["SCHÜRRLE"], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#000000ff" },
  { id: "D2", country: "Ghana", cn: "加纳", player: "ESSIEN", concept: "Ashanti King", conceptCN: "阿散蒂王", color: "#D0A850", accent: "#1D8348", cName: "Ashanti Gold", cNameCN: "阿散蒂金", apps: 256, goals: 25, yrs: "2005-14", pos: "MF", alts: [], hasImg: true, desc: "Ghana, the pride of the Gold Coast, inherits the brilliance and courage of Ashanti civilization. A symbol of strength and wealth, Ghanaians carry in their character an intensity and resilience as fierce as the African sun.", descCN: "「黄金海岸」的骄傲加纳，传承了阿散蒂文明的辉煌与勇气。这里是力量与财富的象征，加纳人的性格中自带一种如同非洲骄阳般的炽热与坚毅。", colorInspiration: "Drawn from the raw ochre-gold of West African earth — less ostentatious than gilding, it feels more like a weighty medal of the land, honoring this territory's long history of wealth and civilization.", colorInspirationCN: "取自西非大地的赭金原矿色。它不同于浮夸的镀金，更像是一份厚重的大地勋章，致敬这片土地悠久的财富历史。", clothing: "The prestigious Kente cloth draped diagonally across the shoulder — reserved for the most significant ceremonies, paired with a crown bearing Adinkra symbols, a display of the African Buffalo's absolute dominance on the pitch.", clothingCN: "尊贵的肯特织物（Kente）斜肩礼服。这种仅用于重大仪式的盛装，配合饰有阿丁克拉符号的王冠，彰显了「非洲水牛」在场上的绝对统治力。", texture: "Adinkra symbols adorning the crown and garment — representing wisdom and resilience. Every woven thread is a record of honor, imbuing the garment with a narrative power that transcends decoration.", textureCN: "皇冠与衣饰上的阿丁克拉符号（Adinkra）。分别代表着智慧与刚毅，每一道织物纹路都像是对荣誉的记录，让服饰具备了叙事性的力量。", hasCopy: true, dotColor: "#fcd116ff" },
  { id: "D3", country: "Iceland", cn: "冰岛", firstName: "EIÐUR", player: "GUÐJOHNSEN", concept: "Ice Lord", conceptCN: "冰原领主", color: "#B0D0E0", accent: "#E74C3C", cName: "Glacier Blue", cNameCN: "冰川蓝", apps: 263, goals: 78, yrs: "2000-06", pos: "FW", alts: [], hasImg: true, desc: "This polar island of fire and ice is the birthplace of saga epics and glacier legends. On this isolated land, Icelanders have forged an unshakeable Viking spirit of competition — ice-cold in focus, immovable in will.", descCN: "冰火交织的极地岛屿，是萨迦史诗与冰川传说诞生的净土。在这片孤绝的土地上，冰岛人淬炼出了极度冷静且不可撼动的维京竞技精神。", colorInspiration: "A nearly translucent ice-blue that simulates the ethereal light refracted beneath ancient glaciers — lending the image an extreme crispness and purity that is distinctly of the far north.", colorInspirationCN: "近乎透明的冰蓝色调，模拟了万年冰川下折射出的幽光，使画面呈现出一种极致冷峻、纯净的北地质感。", clothing: "A minimalist silver headband crown supplemented by polar furs suited to withstand North Atlantic cold — emphasizing the unity of function and identity, the solitary elevated quality of a Nordic Arctic noble.", clothingCN: "简约的银质发带王冠，辅以适应北大西洋严寒的极地皮草。这种装束强调功能性与身份的统一，极具北欧极地贵族的孤高质感。", texture: "Thor's Hammer variants and Icelandic magic staves (Staves) engraved on accessories. These symbols allude to Gudjohnsen's role as a steadying beacon on the pitch — a symbol of shelter in the storm.", textureCN: "饰品上刻有的雷神之锤变体与冰岛魔法符文（Staves）。这些符号暗喻了古德约翰森在场上稳定军心的灯塔作用，象征着风暴中的庇护。", hasCopy: true, dotColor: "#003897ff" },
  { id: "D4", country: "Ireland", cn: "爱尔兰", player: "DUFF", concept: "Celtic King", conceptCN: "凯尔特国王", color: "#70B488", accent: "#EB984E", cName: "Emerald", cNameCN: "翡翠绿", apps: 125, goals: 13, yrs: "2003-06", pos: "FW", alts: [], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#009b48ff" },
  { id: "D5", country: "Israel", cn: "以色列", player: "BENAYOUN", concept: "Diamond King", conceptCN: "迪莫纳钻石王", color: "#B0BFD0", accent: "#F1C40F", cName: "Holy City Steel", cNameCN: "圣城钢蓝", apps: 24, goals: 1, yrs: "2010-13", pos: "MF", alts: [], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#0138b7ff" },
  { id: "D6", country: "Italy", cn: "意大利", player: "ZOLA", concept: "Renaissance Duke", conceptCN: "文艺复兴公爵", color: "#7898C0", accent: "#D5DBDB", cName: "Azzurri", cNameCN: "azzurri蓝", apps: 312, goals: 80, yrs: "1996-03", pos: "FW", alts: [], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#cf2d28ff" },
  { id: "D7", country: "Jamaica", cn: "牙买加", player: "SINCLAIR", concept: "Reggae King", conceptCN: "雷鬼之王", color: "#A8C868", accent: "#239B56", cName: "Tropical Lime", cNameCN: "热带青柠", apps: 16, goals: 2, yrs: "2003-07", pos: "FW", alts: [], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#009c3bff" },
  { id: "E1", country: "Morocco", cn: "摩洛哥", player: "ZIYECH", concept: "Alawi Dynasty", conceptCN: "阿拉维王朝", color: "#C89078", accent: "#EDBB99", cName: "Marrakech Clay", cNameCN: "马拉喀什陶", apps: 109, goals: 14, yrs: "2020-24", pos: "FW", alts: [], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#d80027ff" },
  { id: "E2", country: "Netherlands", cn: "荷兰", player: "ROBBEN", concept: "Prince of Orange", conceptCN: "奥兰治亲王", color: "#E0A050", accent: "#2E4053", cName: "Orange", cNameCN: "奥兰治橙", apps: 100, goals: 19, yrs: "2004-07", pos: "FW", alts: [], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#cf1027ff" },
  { id: "E3", country: "New Zealand", cn: "新西兰", player: "KEN", concept: "Cloud King", conceptCN: "长白云之王", color: "#607860", accent: "#BDC3C7", cName: "Silver Fern", cNameCN: "银蕨暗绿", apps: 3, goals: 0, yrs: "2005-06", pos: "MF", alts: [], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#012268ff" },
  { id: "E4", country: "Nigeria", cn: "尼日利亚", player: "MIKEL", concept: "Benin King", conceptCN: "贝宁王", color: "#58A078", accent: "#FBFCFC", cName: "Palm Green", cNameCN: "棕榈绿", apps: 374, goals: 6, yrs: "2006-17", pos: "MF", alts: [], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#008754ff" },
  { id: "E5", country: "N. Ireland", cn: "北爱尔兰", player: "DONAGHY", concept: "Linen King", conceptCN: "亚麻商国王", color: "#BCD0A0", accent: "#28B463", cName: "Linen Green", cNameCN: "亚麻草绿", apps: 78, goals: 3, yrs: "1992-94", pos: "DF", alts: [], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#cc0000ff" },
  { id: "E6", country: "Norway", cn: "挪威", player: "T. A. FLO", concept: "Viking King", conceptCN: "维京海盗王", color: "#80A8A0", accent: "#85929E", cName: "North Sea Moss", cNameCN: "北海苔绿", apps: 72, goals: 17, yrs: "1997-00", pos: "FW", alts: [], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#01407dff" },
  { id: "E7", country: "Peru", cn: "秘鲁", player: "PIZARRO", concept: "Inca Sun King", conceptCN: "印加太阳王", color: "#B87090", accent: "#FADBD8", cName: "Andes Pink", cNameCN: "安第斯粉", apps: 32, goals: 2, yrs: "2007-09", pos: "FW", alts: [], hasImg: true, desc: "Peru carries the legacy of the Inca Empire that once dominated the South American continent. The altitude of the Andes imbues Peruvians with a unique quality — the high-altitude resilience of mountain people combined with the elegant grace of South American knights.", descCN: "秘鲁拥有统治过南美大陆的印加帝国遗产。安第斯山脉的高度赋予了秘鲁人一种兼具高海拔坚韧与南美骑士优雅的特殊韵味。", colorInspiration: "An intensely exotic berry-purple — symbolizing the enduring legacy of the Inca Empire, like violet mist at dusk in the Andes: dispersed, yet eternally present.", colorInspirationCN: "一种异域感极强的浆果紫色，象征着安第斯山脉晚霞中消散却永存的印加帝国历史底蕴。", clothing: "A golden crown adorned with a grand solar disc, paired with layered Andean capes — restoring the exalted identity where ancient priest and king were one, a figure of singular divine presence among South American players.", clothingCN: "饰有大型太阳神圆盘的黄金冠冕，搭配典型的安第斯叠穿斗篷。还原了古代祭司与君王重合的尊贵身份，在南美球员中极具神性色彩。", texture: "Llama totems and Inca staircase patterns — representing reverence for nature and the divine, elegantly showcasing the highland civilization's mastery of weaving art and its cultural iconography.", textureCN: "美洲驼（Llama）图腾与印加阶梯纹。这些纹样代表了对自然与神灵的敬畏，巧妙地展示了高原文明精湛的编织艺术与文化图腾。", hasCopy: true, dotColor: "#d71024ff" },
  { id: "F1", country: "Portugal", cn: "葡萄牙", player: "CARVALHO", concept: "Explorer King", conceptCN: "大航海国王", color: "#508888", accent: "#CB4335", cName: "Maritime Teal", cNameCN: "航海深青", apps: 210, goals: 11, yrs: "2004-10", pos: "DF", alts: [], hasImg: false, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#006600ff" },
  { id: "F2", country: "Romania", cn: "罗马尼亚", player: "PETR", concept: "Carpathian Duke", conceptCN: "喀尔巴阡公爵", color: "#687898", accent: "#F5B041", cName: "Carpathian", cNameCN: "喀尔巴阡灰蓝", apps: 6, goals: 0, yrs: "2001-03", pos: "DF", alts: [], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#002b7fff" },
  { id: "F3", country: "Russia", cn: "俄罗斯", player: "ZHIRKOV", concept: "Tsar", conceptCN: "沙皇", color: "#785058", accent: "#8D6E63", cName: "Tsar Burgundy", cNameCN: "沙皇勃艮第", apps: 49, goals: 1, yrs: "2009-11", pos: "MF", alts: [], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#d52b1eff" },
  { id: "F4", country: "Scotland", cn: "苏格兰", player: "COOKE", concept: "Highland Chief", conceptCN: "高地氏族首领", color: "#9888B0", accent: "#5499C7", cName: "Thistle Purple", cNameCN: "蓟花紫", apps: 373, goals: 30, yrs: "1966-78", pos: "FW", alts: [], hasImg: true, desc: "Scotland is the embodiment of the Highland spirit — transmitted through bagpipes and an unyielding will to independence. Its national character holds both the raw, hot-blooded nature of Highland warriors and the melancholy, poetic elegance unique to the Gaels.", descCN: "苏格兰是高地精神的化身，在风笛与独立意志中传承至今。其国民性格中既有高地武士的粗犷热血，也有盖尔人特有的诗人般的忧郁优雅。", colorInspiration: "Drawn from the heather that blankets the Scottish Highlands — this soft purple symbolizes the national character found in Highland landscapes: gentle and resilient in equal measure.", colorInspirationCN: "取自苏格兰高地遍布的石南花色。这种柔和的紫色象征着高地自然风景中温婉与坚韧并存的民族风骨。", clothing: "A classic clan tartan sash paired with the quintessentially Scottish thistle brooch — presented in the manner of a gentleman warrior, transcending the heaviness of armour, embracing refined defiance.", clothingCN: "经典的家族格纹呢（Tartan）斜跨披肩，辅以最具民族代表性的苏格兰蓟花胸针。以一种「绅士战士」的姿态呈现，跳脱了沉重的铠甲感。", texture: "Delicate Celtic knotwork engraved on a silver circular brooch. These interlocking cyclical lines symbolize the inseparable bond between the Scottish people and their land — a signature of rebellious yet graceful character.", textureCN: "银制圆形胸针上刻有的精致凯尔特编织纹。这种交错循环的线条象征着苏格兰人民与土地之间不可割裂的连接，代表着一种叛逆而优雅的格调。", hasCopy: true, dotColor: "#0065bfff" },
  { id: "F5", country: "Senegal", cn: "塞内加尔", player: "MENDY", concept: "West African Sage", conceptCN: "西非智者", color: "#A8B068", accent: "#D4AC0D", cName: "Savanna Olive", cNameCN: "草原橄榄", apps: 136, goals: 0, yrs: "2020-23", pos: "GK", alts: [], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#00843fff" },
  { id: "F6", country: "Serbia", cn: "塞尔维亚", player: "IVANOVIĆ", concept: "Byzantine Monarch", conceptCN: "拜占庭君主", color: "#A07080", accent: "#ABB2B9", cName: "Byzantine Plum", cNameCN: "拜占庭梅", apps: 377, goals: 34, yrs: "2008-17", pos: "DF", alts: [], hasImg: true, desc: "Serbia is the ironclad fortress of Byzantine culture. Through the turbulent centuries on the Balkan Peninsula, Serbians have forged a guardian's spirit as resolute as steel — the indomitable stronghold of Eastern Europe.", descCN: "塞尔维亚是拜占庭文化的铁血要塞。在巴尔干半岛的激荡岁月中，塞尔维亚人磨砺出了如钢铁般的守卫者精神，是东欧大地上强悍的堡垒。", colorInspiration: "A composed, deep rose-red reminiscent of ancient church frescoes — symbolizing the near-religious steadfastness of Balkan history and the weighty accumulation of centuries of civilization.", colorInspirationCN: "如同教堂古老壁画般沉稳的暗玫瑰红色，象征着巴尔干历史中那份宗教般的坚贞守望感与厚重的历史积淀。", clothing: "An imperial crown encrusted with sapphires and pearls, paired with the most elaborate Orthodox court robe. This solemn martial attire embodies Ivanovic's role as defensive patriarch — a fortress in human form.", clothingCN: "镶嵌大量蓝宝石与珍珠的帝国皇冠，配以极尽繁复的东正教宫廷袍服。这套庄重的戎装展现了伊万诺维奇作为「后防老爹」的坚固威严。", texture: "The double-headed eagle and cross-bearing shield at the heart of the crest — symbolizing power, faith, and protection. These motifs unfold in layers against a deep blue ground, projecting a visual defensive fortification.", textureCN: "核心纹章为华丽的双头鹰与十字盾牌。象征着权力、信仰与守护，这些纹样在深蓝色底布上层层铺开，展现出堡垒般的视觉防御力。", hasCopy: true, dotColor: "#c7353dff" },
  { id: "F7", country: "Slovakia", cn: "斯洛伐克", player: "STOCH", concept: "Folk Hero", conceptCN: "民俗英雄", color: "#6898C0", accent: "#E74C3C", cName: "Tatra Blue", cNameCN: "塔特拉蓝", apps: 3, goals: 0, yrs: "2009-13", pos: "FW", alts: [], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#034ea2ff" },
  { id: "G1", country: "South Africa", cn: "南非", player: "TBD", concept: "TBD", conceptCN: "TBD", color: "#D0A880", accent: "#FFFFFF", cName: "Safari", cNameCN: "游猎", apps: 0, goals: 0, yrs: "TBD", pos: "TBD", alts: [], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#0a7b43ff" },
  { id: "G2", country: "Spain", cn: "西班牙", player: "AZPILICUETA", concept: "Habsburg Dynasty", conceptCN: "哈布斯堡王朝", color: "#B86858", accent: "#F7DC6F", cName: "Habsburg Vermilion", cNameCN: "哈布斯堡朱砂", apps: 507, goals: 17, yrs: "2012-23", pos: "DF", alts: [], hasImg: false, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#c60a1eff" },
  { id: "G3", country: "Switzerland", cn: "瑞士", player: "ZAKARIA", concept: "Swiss Guard", conceptCN: "阿尔卑斯卫队", color: "#D8908C", accent: "#FDFEFE", cName: "Alpine Red", cNameCN: "阿尔卑斯红", apps: 14, goals: 0, yrs: "2022-23", pos: "MF", alts: [], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#fe0000ff" },
  { id: "G4", country: "Ukraine", cn: "乌克兰", player: "MUDRYK", concept: "Cossack Hetman", conceptCN: "哥萨克首领", color: "#D8C870", accent: "#85C1E9", cName: "Wheat Gold", cNameCN: "麦田金", apps: 73, goals: 7, yrs: "2023-", pos: "FW", alts: [], hasImg: false, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#265facff" },
  { id: "G5", country: "Uruguay", cn: "乌拉圭", firstName: "GUS", player: "POYET", concept: "Gentleman King", conceptCN: "绅士国王", color: "#98B8C8", accent: "#FFFFFF", cName: "Montevideo Blue", cNameCN: "蒙得维的亚青", apps: 145, goals: 49, yrs: "1997-01", pos: "MF", alts: [], hasImg: true, desc: "The 'Switzerland of South America' on the banks of the Río de la Plata. Uruguay blends the wild spirit of the Gaucho grasslands with elegant coastal culture, merging rebellious freedom with the grace of South American football.", descCN: "拉普拉塔河畔的明珠，被誉为「南美瑞士」。乌拉圭拥有广袤的高卓人草原与地中海式的优雅沿海文化，其民族精神融合了草原高卓人的不羁与南美足球式的优雅。", colorInspiration: "A misty, grey-toned cyan simulating the dawn over the Río de la Plata and the clear skies of Asunción Bay. It conveys a deep, calm quality, symbolizing the vast and tranquil national character of the Uruguayan people.", colorInspirationCN: "这种带有灰度的青蓝色调模拟了拉普拉塔河清晨的迷雾与亚松森湾明净的天空。它不同于鲜蓝的张扬，更显深沉、冷静，象征着乌拉圭人博大而静谧的民族性格。", clothing: "A tall black top hat paired with a South American gentleman's poncho adorned with gold vine embroidery. This attire fuses Victorian-style British elegance with the wild nature of the Gauchos.", clothingCN: "高耸的黑色大礼帽（Top Hat）与飾有金色藤蔓刺绣的南美式绅士长袍（poncho/gabán）。这种装束融合了维多利亚时代的英式优雅与南美高卓人的草原野性，呈现出一种强烈的异域风情。", texture: "Intricate golden vine embroidery and breastplates featuring Adinkra-inspired symbols. This design pays tribute to the cultural diversity of Uruguay and its tenacious, boundless life force.", textureCN: "长袍上繁复的金色藤蔓刺绣与饰有阿丁克拉符号（Adinkra）的胸饰。这种设计融合了西非艺术元素，致敬了乌拉圭文化的多样性与博大而坚韧的民族生命力。", hasCopy: true, dotColor: "#0038a8ff" },
  { id: "G6", country: "USA", cn: "美国", player: "PULISIC", concept: "Founding Father", conceptCN: "建国者", color: "#485878", accent: "#E74C3C", cName: "Independence", cNameCN: "独立蓝", apps: 145, goals: 26, yrs: "2019-23", pos: "FW", alts: [], hasImg: true, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#ce2027ff" },
  { id: "G7", country: "Wales", cn: "威尔士", player: "M. HUGHES", concept: "Red Dragon King", conceptCN: "红龙王", color: "#B87860", accent: "#F7DC6F", cName: "Dragon Copper", cNameCN: "红龙铜", apps: 65, goals: 25, yrs: "1995-98", pos: "FW", alts: [], hasImg: false, desc: "[Placeholder] Heritage info for this country. Please update later.", descCN: "[占位符] 这里将包含该国国家与文化的详细描述，请在后续更新文案。", dotColor: "#d20f33ff" },
];

// ── IMAGE DISPLAY TOGGLE ─────────────────────────────────────────────────────
// 在这里添加国家名即可逐个开启人物图片显示。
// 前提：/public/THUMBNAIL/<国家名>.png 文件必须存在。
const SHOW_IMG = new Set([
  "Albania",
  "Bosnia",
  "Canada",
  "Denmark",
  "DR Congo",
  "Ghana",
  "Iceland",
  "Peru",
  "Scotland",
  "Serbia",
  "Croatia",
  "Czechia",
  "Uruguay",
  "Argentina",
  "Burkina Faso",
  "Côte d'Ivoire",
  "Egypt"
]);
// ─────────────────────────────────────────────────────────────────────────────

function tx(h: string) {
  const r = parseInt(h.slice(1, 3), 16) / 255;
  const g = parseInt(h.slice(3, 5), 16) / 255;
  const b = parseInt(h.slice(5, 7), 16) / 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 0.5 ? "#1a1a1a" : "#f0f0ee";
}

function sx(h: string) {
  const r = parseInt(h.slice(1, 3), 16) / 255;
  const g = parseInt(h.slice(3, 5), 16) / 255;
  const b = parseInt(h.slice(5, 7), 16) / 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 0.5 ? "#6a6a6a" : "#c0c0be";
}

export default function App() {
  const [lang, setLang] = useState<"en" | "zh">("en");
  const [cards, setCards] = useState(PLAYERS);
  const [sel, setSel] = useState<any>(null);
  const [dragI, setDragI] = useState<number | null>(null);
  const [overI, setOverI] = useState<number | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [modalImgError, setModalImgError] = useState(false);
  const [viewMode, setViewMode] = useState<1 | 2 | 3 | 4 | 7>(7);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = lang === "en";

  // 核心排序筛选逻辑：小网格展示前 N 名
  const currentDisplay = useMemo(() => {
    if (viewMode === 7) return cards;
    const limit = viewMode * viewMode;
    return cards.slice(0, limit);
  }, [cards, viewMode]);

  useEffect(() => {
    setModalImgError(false);
  }, [sel]);

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

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  const sortCards = () => {
    const sorted = [...PLAYERS];
    setCards(sorted);
  };

  const exportFile = async () => {
    const el = document.getElementById("export-area");
    if (!el) return;

    // Fix for html2canvas object-fit offset bug: reset scroll before capture
    const prevScrollY = window.scrollY;
    const prevScrollX = window.scrollX;
    window.scrollTo(0, 0);

    setIsExporting(true);
    // 给一些时间让 DOM 更新（移除动画、增加 Padding），并确保滚动重置生效
    await new Promise(r => setTimeout(r, 400));
    try {
      const canvas = await html2canvas(el, {
        backgroundColor: "#FFF9EB",
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement("a");
      link.download = "chelsea-kingdom.png";
      link.href = canvas.toDataURL("image/png", 0.9);
      link.click();
    } catch (err) { console.error(err); } finally {
      setIsExporting(false);
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
          {/* Left: Grid Hamburger Menu */}
          <div className="absolute top-0 left-0 z-50">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-inter border border-gray-300 bg-white hover:bg-black/5 transition-colors uppercase select-none"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                  className="absolute top-full left-0 mt-1 bg-white border border-gray-300 shadow-xl min-w-[120px] overflow-hidden"
                >
                  {[7, 4, 3, 2, 1].map((m) => (
                    <button
                      key={m}
                      onClick={() => { setViewMode(m as any); setIsMenuOpen(false); }}
                      className={`w-full px-4 py-2.5 text-[10px] text-left font-inter tracking-widest hover:bg-black hover:text-white transition-colors uppercase ${viewMode === m ? 'bg-black/5 font-bold' : ''}`}
                    >
                      {m}×{m}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute top-0 right-0 z-10">
            <button
              onClick={() => setLang((l) => (l === "en" ? "zh" : "en"))}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-inter font-normal border border-gray-300 rounded-none hover:bg-black/5 transition-colors tracking-[0.1em] uppercase cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              {t ? "中文" : "EN"}
            </button>
          </div>

          <h1 className="flex justify-center w-full">
            <img
              src="/Title_svg/Title.png"
              alt="Chelsea Kingdom"
              className="h-[22px] md:h-[34px] lg:h-[56px] object-contain"
            />
          </h1>
          <div className="flex justify-center w-full mt-3 lg:mt-4">
            <img
              src="/Title_svg/Subtitle.png"
              alt="49 NATIONS, 49 KINGS"
              className="h-[11px] md:h-[16px] lg:h-[22px] object-contain"
            />
          </div>
          <p className="text-[14px] text-gray-400 mt-3 tracking-[0.12em] uppercase font-inter font-light">
            {t ? "Click details · Drag to reorder" : "单击详情 · 拖拽排列"}
          </p>
        </div>

        {/* Display Area: Optimized for Marquee & Grid */}
        <div className="relative w-full overflow-hidden bg-[#f5f3ef]">

          <div
            id="export-area"
            className={`${isExporting ? 'pointer-events-none' : 'transition-all duration-500 pointer-events-auto'} ${isExporting ? 'p-[100px] bg-[#FFF9EB]' : 'bg-[#f5f3ef]'}
              ${(viewMode === 1 && !isExporting) ? 'flex flex-nowrap' : 'grid gap-0 w-full ' + (
                (viewMode === 7 || (viewMode === 1 && isExporting)) ? 'grid-cols-4 sm:grid-cols-5 md:grid-cols-7' :
                  viewMode === 4 ? 'grid-cols-4' :
                    viewMode === 3 ? 'grid-cols-3' :
                      'grid-cols-2'
              )}
            `}
            style={(viewMode === 1 && !isExporting) ? {
              width: 'max-content',
              animation: `marquee ${(cards.length) * 3}s linear infinite`
            } : {}}
          >
            {(viewMode === 1 ? [...cards, ...cards] : currentDisplay).map((c, idx) => {
              const tc = tx(c.color);
              return (
                <motion.div
                  layout
                  key={`${c.id}-${idx}`}
                  draggable={viewMode !== 1}
                  onDragStart={() => onDS(idx)}
                  onDragOver={(e: any) => onDO(e, idx)}
                  onDrop={() => onDr(idx)}
                  onDragEnd={() => { setDragI(null); setOverI(null); }}
                  onClick={() => setSel(c)}
                  whileHover={(!isExporting && viewMode !== 1) ? { scale: 1.05, zIndex: 10 } : {}}
                  whileTap={(!isExporting && viewMode !== 1) ? { scale: 0.95 } : {}}
                  animate={isExporting ? { scale: 1, zIndex: 1 } : undefined}
                  transition={isExporting ? { duration: 0 } : undefined}
                  className={`relative aspect-square flex-shrink-0 flex flex-col items-center justify-end cursor-pointer overflow-hidden shadow-sm hover:shadow-xl transition-shadow rounded-none select-none
                    ${(viewMode === 1 && !isExporting) ? 'w-[calc(100vw-32px)] max-w-5xl' : 'w-full'}
                  `}
                  style={{
                    background: c.color,
                    opacity: dragI === idx ? 0.4 : 1,
                    outline: overI === idx ? "2px solid #1a1a1a" : "none",
                  }}
                >
                  {!SHOW_IMG.has(c.country) && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] opacity-15 pointer-events-none z-0 crown-icon">
                      <img
                        src={crownSvg(tc)}
                        alt=""
                        className="w-[60%] min-w-[30px] max-w-[50px] mx-auto"
                      />
                    </div>
                  )}
                  {SHOW_IMG.has(c.country) && c.hasImg && (
                    <div className="absolute inset-0 z-10 pointer-events-none">
                      <img
                        src={`/THUMBNAIL/${c.country}.png`}
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
                          e.currentTarget.style.display = 'none';
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

      <footer className="w-full max-w-5xl mx-auto px-4 py-12 flex flex-wrap justify-center items-center gap-4">
        <button
          onClick={() => setCards([...cards].sort(() => Math.random() - 0.5))}
          className="flex items-center gap-2 px-6 py-3 text-[11px] font-inter font-normal border border-gray-300 rounded-none hover:bg-black/5 transition-colors tracking-[0.1em] uppercase cursor-pointer"
          style={{ fontFeatureSettings: '"ss01" on' }}
        >
          <Shuffle className="w-4 h-4" />
          <span className="hidden sm:inline">{t ? "Shuffle" : "随机打乱"}</span>
        </button>
        <button
          onClick={() => setCards([...PLAYERS])}
          className="flex items-center gap-2 px-6 py-3 text-[11px] font-inter font-normal border border-gray-300 rounded-none hover:bg-black/5 transition-colors tracking-[0.1em] uppercase cursor-pointer"
          style={{ fontFeatureSettings: '"ss01" on' }}
        >
          <ArrowDownAZ className="w-4 h-4" />
          <span className="hidden sm:inline">{t ? "Sort" : "字母排序"}</span>
        </button>
        <button
          onClick={exportFile}
          disabled={isExporting}
          className="flex items-center gap-2 px-6 py-3 text-[11px] font-inter font-normal border border-gray-300 rounded-none hover:bg-black/5 transition-colors tracking-[0.1em] uppercase cursor-pointer disabled:opacity-50"
          style={{ fontFeatureSettings: '"ss01" on' }}
        >
          <Download className="w-4 h-4" />
          {isExporting ? "..." : (t ? "Export PNG" : "导出图片")}
        </button>
      </footer>

      {/* CSS 动画：位移 -50% 配合两组内容实现无缝衔接 */}
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
      `}</style>

      <AnimatePresence>
        {sel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSel(null)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 md:p-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e: any) => e.stopPropagation()}
              className="bg-[#fbfaf9] w-full max-w-[650px] h-[90vh] max-h-[900px] shadow-2xl rounded-none flex flex-col relative"
            >
              {/* Close button */}
              <button
                onClick={() => setSel(null)}
                className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-none bg-white/50 backdrop-blur hover:bg-white/80 transition-colors cursor-pointer z-50 shadow-sm"
              >
                <X className="w-4 h-4 text-gray-900" />
              </button>

              {/* Scrollable Content */}
              <div className="custom-scrollbar flex-1 relative flex flex-col bg-[#fbfaf9]" style={{ overflowY: 'overlay' as any }}>

                {/* Hero Section */}
                <div className="relative w-full aspect-square shrink-0 flex items-center justify-center overflow-hidden" style={{ backgroundColor: sel.color }}>
                  {SHOW_IMG.has(sel.country) && (
                    <img
                      src={`/THUMBNAIL/${sel.country}.png`}
                      alt={sel.country}
                      className="w-full h-full object-cover absolute inset-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}

                  {/* Interactive Tags Overlay — only for countries with copy */}
                  {sel.hasCopy && (
                    <div className="absolute inset-0 pointer-events-none p-6">
                      {/* Tag 1: Player Stats */}
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.9)", color: "#000" }}
                        onClick={() => document.getElementById('section-stats')?.scrollIntoView({ behavior: 'smooth' })}
                        className="absolute top-[20%] left-[10%] pointer-events-auto bg-black/40 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-[12px] font-inter tracking-widest uppercase shadow-xl flex items-center gap-2 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: sel.color }} />
                        {t ? "Player Stats" : "球员数据"}
                      </motion.button>

                      {/* Tag 2: Color Story */}
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.9)", color: "#000" }}
                        onClick={() => document.getElementById('section-color')?.scrollIntoView({ behavior: 'smooth' })}
                        className="absolute bottom-[35%] right-[10%] pointer-events-auto bg-black/40 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-[12px] font-inter tracking-widest uppercase shadow-xl flex items-center gap-2 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: sel.color }} />
                        {t ? "Color Story" : "色彩故事"}
                      </motion.button>

                      {/* Tag 3: Heritage */}
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.9)", color: "#000" }}
                        onClick={() => document.getElementById('section-desc')?.scrollIntoView({ behavior: 'smooth' })}
                        className="absolute bottom-[15%] left-[15%] pointer-events-auto bg-black/40 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-[12px] font-inter tracking-widest uppercase shadow-xl flex items-center gap-2 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: sel.color }} />
                        {t ? "Heritage" : "历史传承"}
                      </motion.button>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-10 flex flex-col gap-10 z-20">

                  {/* Stats */}
                  <div id="section-stats" className="flex gap-4 scroll-mt-6 mb-2">
                    {[
                      { l: t ? "Appearances" : "出场", v: sel.apps },
                      { l: t ? "Period" : "效力", v: sel.yrs },
                      { l: t ? "Goals" : "进球", v: sel.goals },
                    ].map((s, i) => (
                      <div key={i} className="bg-[#ECEEF2] aspect-[2/1] px-2 flex-1 text-center rounded-none flex flex-col items-center justify-center">
                        {SHOW_IMG.has(sel.country) && (
                          <div className={`font-salo text-black leading-none ${(sel.cn === "科特迪瓦" && i === 1) ? 'text-[22px] tracking-[1px]' : 'text-[32px] tracking-[3.2px]'}`}>
                            {s.v}
                          </div>
                        )}
                        <div className="text-[10px] md:text-xs font-inter font-medium text-black tracking-[0.1em] uppercase mt-1">{s.l}</div>
                      </div>
                    ))}
                  </div>

                  {/* Color Info */}
                  <div id="section-color" className="flex gap-6 items-stretch scroll-mt-6">
                    {/* 1. 关键：稍微加大尺寸至 w-28，并使用 items-stretch 让容器高度自适应内容 */}
                    <div
                      className="w-24 md:w-28 aspect-square shrink-0 rounded-none shadow-inner"
                      style={{ backgroundColor: sel.color }}
                    />

                    {/* 2. 关键：使用 justify-between，它会自动拉开标题、十六进制值和描述的间距，
      确保第一行文字顶部和最后一行文字底部，分别与色块的顶边和底边完美对齐 */}
                    <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                      <div>
                        <h4
                          className="text-[20px] md:text-[24px] font-salo text-black uppercase tracking-[3.2px] leading-none"
                          style={{ fontFeatureSettings: '"ss01" on' }}
                        >
                          {t ? sel.cName : sel.cNameCN}
                        </h4>
                        <span className="text-gray-400 font-inter font-light text-[11px] md:text-[13px] uppercase leading-none mt-2 block">
                          {sel.color}
                        </span>
                      </div>

                      <p className="text-[10px] md:text-[11px] text-gray-800 leading-relaxed font-noto">
                        {sel.hasCopy
                          ? (t ? sel.colorInspiration : sel.colorInspirationCN)
                          : (t ? `The color ${sel.cName} is deeply rooted in the heritage of ${sel.country}.` : `${sel.cNameCN}是一种融合了该国历史与自然景观的复合色调。`)}
                      </p>
                    </div>
                  </div>

                  {sel.hasCopy && (
                    <>
                      <hr className="border-gray-200" />

                      {/* 国家介绍 / Country Introduction */}
                      <div id="section-desc" className="scroll-mt-6">
                        <div className="inline-flex items-center gap-2 bg-[#fbfaf9] px-3 py-1.5 rounded-full border border-gray-200 mb-4">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sel.dotColor || '#ff4d4f' }}></div>
                          <span className="text-sm font-bold text-gray-800 font-inter uppercase tracking-widest">{t ? "Country Introduction" : "国家介绍"}</span>
                        </div>
                        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line font-noto">
                          {t ? sel.desc : sel.descCN}
                        </p>
                      </div>

                      {/* 服饰灵感 / Clothing Inspiration */}
                      <div id="section-clothing" className="scroll-mt-6">
                        <div className="inline-flex items-center gap-2 bg-[#fbfaf9] px-3 py-1.5 rounded-full border border-gray-200 mb-4">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sel.dotColor || '#7b68ee' }}></div>
                          <span className="text-sm font-bold text-gray-800 font-inter uppercase tracking-widest">{t ? "Clothing Inspiration" : "服饰灵感"}</span>
                        </div>
                        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line font-noto">
                          {t ? sel.clothing : sel.clothingCN}
                        </p>
                      </div>

                      {/* 纹理灵感 / Texture Inspiration */}
                      <div id="section-texture" className="scroll-mt-6">
                        <div className="inline-flex items-center gap-2 bg-[#fbfaf9] px-3 py-1.5 rounded-full border border-gray-200 mb-4">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sel.dotColor || '#2ecc71' }}></div>
                          <span className="text-sm font-bold text-gray-800 font-inter uppercase tracking-widest">{t ? "Texture Inspiration" : "纹理灵感"}</span>
                        </div>
                        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line font-noto">
                          {t ? sel.texture : sel.textureCN}
                        </p>
                      </div>
                    </>
                  )}

                  {/* Footer */}
                  <div className="text-center mt-8 mb-4">
                    <p className="text-[13px] leading-[25px] tracking-normal text-gray-400 italic font-inter font-light">
                      Made by: @cjonthebeat
                    </p>
                  </div>

                </div> {/* 对应 Content Section (p-6 md:p-10) */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}