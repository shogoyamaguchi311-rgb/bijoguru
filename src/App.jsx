import { useState, useEffect, useRef } from "react";

const CATEGORIES = [
  { id: "lips", emoji: "💄", label: "リップ" },
  { id: "skincare", emoji: "🧴", label: "スキンケア" },
  { id: "foundation", emoji: "✨", label: "ファンデ" },
  { id: "hair_acc", emoji: "🎀", label: "ヘアアクセ" },
  { id: "eye", emoji: "👁️", label: "アイメイク" },
  { id: "gift", emoji: "🎁", label: "プレゼント" },
  { id: "summer", emoji: "🌺", label: "夏グッズ" },
  { id: "glasses", emoji: "👓", label: "メガネ" },
  { id: "hair_color", emoji: "🎨", label: "セルフカラー" },
];

const SKIN_TONES = [
  { id: "fair", label: "色白", color: "#FDEBD0" },
  { id: "light", label: "明るめ", color: "#F5CBA7" },
  { id: "medium", label: "標準", color: "#E8B88A" },
  { id: "tan", label: "健康的", color: "#D4A574" },
  { id: "dark", label: "褐色", color: "#B8865C" },
];

const HAIR_COLORS = [
  { id: "black", label: "黒髪", color: "#1a1a1a" },
  { id: "dark_brown", label: "ダークブラウン", color: "#3d2314" },
  { id: "brown", label: "ブラウン", color: "#7b4b2a" },
  { id: "light_brown", label: "ライトブラウン", color: "#a67b5b" },
  { id: "blonde", label: "金髪", color: "#d4a843" },
  { id: "ash", label: "アッシュ", color: "#8a8a7a" },
  { id: "pink", label: "ピンク", color: "#e8a0b8" },
];

const FACE_SHAPES = [
  { id: "oval", label: "たまご型", icon: "🥚" },
  { id: "round", label: "丸顔", icon: "🔵" },
  { id: "long", label: "面長", icon: "📏" },
  { id: "square", label: "ベース型", icon: "⬜" },
  { id: "heart", label: "ハート型", icon: "💜" },
  { id: "diamond", label: "ひし形", icon: "💎" },
];

const AGE_RANGES = ["10代", "20代前半", "20代後半", "30代", "40代+"];
const PRICE_RANGES = [
  { id: "budget", label: "〜1,000円", icon: "🪙" },
  { id: "mid", label: "1,000〜3,000円", icon: "💰" },
  { id: "high", label: "3,000〜5,000円", icon: "💎" },
  { id: "luxury", label: "5,000円〜", icon: "👑" },
];

// Mock product database
const PRODUCTS = {
  lips: {
    fair: [
      { name: "rom&nd ジューシーラスティングティント #06", price: 1320, img: "🩷", color: "#e8788a", shop: "Qoo10", shopUrl: "#", rating: 4.8, desc: "色白肌にぴったりの青みピンク。透明感UP" },
      { name: "CLIO メルティングシアーリップ #01", price: 1650, img: "💗", color: "#d4627a", shop: "Amazon", shopUrl: "#", rating: 4.6, desc: "シアーな発色で肌なじみ抜群" },
      { name: "CANMAKE メルティールミナスルージュ", price: 880, img: "🌸", color: "#f0a0b0", shop: "楽天", shopUrl: "#", rating: 4.5, desc: "プチプラで高発色！ローズピンク" },
      { name: "Dior アディクトリップグロウ #001", price: 4620, img: "✨", color: "#e88a9a", shop: "公式", shopUrl: "#", rating: 4.9, desc: "唇の水分に反応して自分だけのピンクに" },
    ],
    light: [
      { name: "rom&nd ジューシーラスティングティント #09", price: 1320, img: "🧡", color: "#e8956a", shop: "Qoo10", shopUrl: "#", rating: 4.7, desc: "コーラルピンクで明るい印象に" },
      { name: "KATE リップモンスター #05", price: 1540, img: "🔥", color: "#c87060", shop: "Amazon", shopUrl: "#", rating: 4.8, desc: "ダークフィグ、大人っぽい仕上がり" },
      { name: "CEZANNE ウォータリーティントリップ", price: 660, img: "💧", color: "#d48070", shop: "楽天", shopUrl: "#", rating: 4.4, desc: "ナチュラルコーラルで普段使いに" },
    ],
    medium: [
      { name: "NARS パワーマットリップピグメント", price: 3960, img: "💋", color: "#b85050", shop: "公式", shopUrl: "#", rating: 4.7, desc: "マットな質感で肌色を引き立てる" },
      { name: "rom&nd ゼロベルベットティント #14", price: 1320, img: "🍷", color: "#a04848", shop: "Qoo10", shopUrl: "#", rating: 4.6, desc: "テラコッタカラーで顔色がパッと明るく" },
      { name: "MAC リップスティック CHILI", price: 3300, img: "🌶️", color: "#c04830", shop: "Amazon", shopUrl: "#", rating: 4.8, desc: "オレンジレッドの定番！標準肌に最高" },
    ],
    tan: [
      { name: "NARS オーデイシャスリップスティック", price: 4400, img: "👄", color: "#8b3a3a", shop: "公式", shopUrl: "#", rating: 4.7, desc: "ディープローズで健康的な肌に映える" },
      { name: "rom&nd ゼロマットリップスティック", price: 1320, img: "🍫", color: "#904040", shop: "Qoo10", shopUrl: "#", rating: 4.5, desc: "ブラウンレッドでこなれ感" },
    ],
    dark: [
      { name: "MAC リップスティック DIVA", price: 3300, img: "💜", color: "#6b2040", shop: "Amazon", shopUrl: "#", rating: 4.8, desc: "ディープベリーで褐色肌に華やかさ" },
      { name: "NYX スエードマットリップ", price: 990, img: "🍇", color: "#5a2838", shop: "楽天", shopUrl: "#", rating: 4.4, desc: "プラムカラーでリッチな仕上がり" },
    ],
  },
  skincare: {
    fair: [
      { name: "IPSA ザ・タイムR アクア", price: 4400, img: "💧", color: "#a0d8ef", shop: "公式", shopUrl: "#", rating: 4.9, desc: "敏感な色白肌にやさしい保湿" },
      { name: "無印良品 敏感肌用化粧水", price: 780, img: "🫧", color: "#c0e8f0", shop: "無印", shopUrl: "#", rating: 4.6, desc: "コスパ最強！毎日たっぷり使える" },
      { name: "Anua ドクダミ77%トナー", price: 1980, img: "🌿", color: "#90c8a0", shop: "Qoo10", shopUrl: "#", rating: 4.7, desc: "鎮静ケアに。赤み肌にも◎" },
    ],
    light: [
      { name: "ONE THING ガラクトミセス化粧水", price: 1650, img: "✨", color: "#f0e8d0", shop: "Qoo10", shopUrl: "#", rating: 4.6, desc: "ツヤ肌に導く発酵化粧水" },
      { name: "メラノCC 薬用しみ集中対策美容液", price: 1210, img: "🍋", color: "#f8e060", shop: "Amazon", shopUrl: "#", rating: 4.7, desc: "ビタミンCで透明感キープ" },
    ],
    medium: [
      { name: "SK-II フェイシャルトリートメントエッセンス", price: 11990, img: "💎", color: "#e8d8c8", shop: "公式", shopUrl: "#", rating: 4.9, desc: "クリアな肌印象に整える名品" },
      { name: "魔女工場 ガラクナイアシン2.0エッセンス", price: 2480, img: "🧪", color: "#d8c8f0", shop: "Qoo10", shopUrl: "#", rating: 4.7, desc: "くすみケアに最適" },
    ],
    tan: [
      { name: "LANEIGE ウォータースリーピングマスク", price: 2970, img: "🌙", color: "#a8c8f0", shop: "Amazon", shopUrl: "#", rating: 4.6, desc: "寝ている間にうるおいチャージ" },
    ],
    dark: [
      { name: "Fenty Skin トータルクレンザー", price: 3300, img: "🫧", color: "#c0a888", shop: "公式", shopUrl: "#", rating: 4.7, desc: "全肌色対応の優秀クレンザー" },
    ],
  },
  hair_acc: {
    fair: [
      { name: "パステルリボンヘアバンド", price: 890, img: "🎀", color: "#f8c0d0", shop: "楽天", shopUrl: "#", rating: 4.5, desc: "淡いピンクで色白肌を引き立てる" },
      { name: "サテンシュシュ ラベンダー", price: 550, img: "💜", color: "#c8a8e0", shop: "Amazon", shopUrl: "#", rating: 4.3, desc: "上品なラベンダーカラー" },
      { name: "パールカチューシャ", price: 1290, img: "🤍", color: "#f0e8e0", shop: "Qoo10", shopUrl: "#", rating: 4.7, desc: "パール付きで華やかに" },
      { name: "ベロアリボンバレッタ", price: 780, img: "🩵", color: "#a0c8e0", shop: "楽天", shopUrl: "#", rating: 4.4, desc: "くすみブルーが今っぽい" },
    ],
    light: [
      { name: "ゴールドメタルカチューシャ", price: 1590, img: "✨", color: "#d4a843", shop: "Amazon", shopUrl: "#", rating: 4.6, desc: "ゴールドが明るい肌にマッチ" },
      { name: "ツイードシュシュ ベージュ", price: 680, img: "🧸", color: "#d4b896", shop: "楽天", shopUrl: "#", rating: 4.5, desc: "秋冬の定番！上品カジュアル" },
    ],
    medium: [
      { name: "べっ甲風バンスクリップ", price: 990, img: "🍯", color: "#b87830", shop: "Amazon", shopUrl: "#", rating: 4.7, desc: "どんな肌色にも合う万能アイテム" },
      { name: "シルクサテンヘアバンド", price: 1480, img: "🌟", color: "#c8a878", shop: "Qoo10", shopUrl: "#", rating: 4.6, desc: "髪にやさしいシルク素材" },
    ],
    tan: [
      { name: "ターコイズビーズシュシュ", price: 880, img: "💠", color: "#40b0b0", shop: "楽天", shopUrl: "#", rating: 4.5, desc: "健康的な肌色に映えるカラー" },
    ],
    dark: [
      { name: "ゴールドチェーンカチューシャ", price: 1890, img: "⭐", color: "#c8a030", shop: "Amazon", shopUrl: "#", rating: 4.7, desc: "ゴールドが褐色肌にゴージャス" },
    ],
  },
  foundation: {
    fair: [
      { name: "CLIO キルカバーファンウェアクッション #02", price: 2640, img: "🫧", color: "#f5e0cc", shop: "Qoo10", shopUrl: "#", rating: 4.8, desc: "色白さん向けライトベージュ" },
      { name: "MISSHA Mクッション #13", price: 1100, img: "✨", color: "#f0d8c0", shop: "Amazon", shopUrl: "#", rating: 4.5, desc: "ミルクベージュ、プチプラ優秀" },
    ],
    light: [
      { name: "LANEIGE ネオクッション #21N", price: 2970, img: "💫", color: "#ebd0b8", shop: "公式", shopUrl: "#", rating: 4.7, desc: "自然なツヤ感のナチュラルベージュ" },
    ],
    medium: [
      { name: "CLIO キルカバーファンウェアクッション #04", price: 2640, img: "🌟", color: "#dcc0a0", shop: "Qoo10", shopUrl: "#", rating: 4.7, desc: "ジンジャー、標準肌にぴったり" },
    ],
    tan: [
      { name: "MAC スタジオフィックス #NC35", price: 5280, img: "🍯", color: "#c8a880", shop: "公式", shopUrl: "#", rating: 4.8, desc: "健康的な肌色に自然にフィット" },
    ],
    dark: [
      { name: "Fenty Beauty プロフィルトファンデ #385", price: 5720, img: "💛", color: "#b08860", shop: "公式", shopUrl: "#", rating: 4.9, desc: "50色展開で完璧にマッチ" },
    ],
  },
  eye: {
    fair: [
      { name: "rom&nd ベターザンパレット #01", price: 2750, img: "🎨", color: "#e0b8a0", shop: "Qoo10", shopUrl: "#", rating: 4.8, desc: "ピンクブラウン系、色白さんの定番" },
      { name: "CLIO プロアイパレット #01", price: 2970, img: "✨", color: "#c8a090", shop: "Amazon", shopUrl: "#", rating: 4.9, desc: "シンプリーピンク、万能パレット" },
    ],
    light: [
      { name: "CANMAKE パーフェクトスタイリストアイズ", price: 858, img: "🌸", color: "#d8a888", shop: "楽天", shopUrl: "#", rating: 4.5, desc: "5色パレットで簡単グラデ" },
    ],
    medium: [
      { name: "LUNASOL スキンモデリングアイズ", price: 5500, img: "💎", color: "#c89870", shop: "公式", shopUrl: "#", rating: 4.8, desc: "ヌーディベージュで上品に" },
    ],
    tan: [
      { name: "tom ford アイカラークォード", price: 10780, img: "👑", color: "#a07848", shop: "公式", shopUrl: "#", rating: 4.9, desc: "ゴールド系で華やかに" },
    ],
    dark: [
      { name: "Urban Decay NAKED パレット", price: 7150, img: "🔥", color: "#987050", shop: "Amazon", shopUrl: "#", rating: 4.7, desc: "ウォーム系で深みのある目元に" },
    ],
  },
  gift: {
    fair: [
      { name: "JILL STUART ミックスブラッシュ", price: 4180, img: "🎁", color: "#f0c0d0", shop: "公式", shopUrl: "#", rating: 4.9, desc: "見た目も可愛いギフトに最適" },
      { name: "ディオール ミスディオール ミニセット", price: 5500, img: "🌹", color: "#e8a0b0", shop: "公式", shopUrl: "#", rating: 4.9, desc: "香水ミニセット、絶対喜ばれる" },
      { name: "Aesop リザレクションハンドバーム", price: 3080, img: "🫒", color: "#a0b888", shop: "Amazon", shopUrl: "#", rating: 4.7, desc: "おしゃれさん定番のハンドクリーム" },
    ],
    light: [
      { name: "SABON ボディスクラブ", price: 3740, img: "🛁", color: "#c8d8a0", shop: "公式", shopUrl: "#", rating: 4.8, desc: "ローズの香りで特別感" },
    ],
    medium: [
      { name: "THREE ハンド&アームクリーム", price: 3300, img: "🌿", color: "#98b888", shop: "公式", shopUrl: "#", rating: 4.6, desc: "ナチュラル派に喜ばれるギフト" },
    ],
    tan: [
      { name: "Jo Malone ハンドクリームセット", price: 6600, img: "🎀", color: "#d8c8a0", shop: "公式", shopUrl: "#", rating: 4.9, desc: "高級感たっぷりのギフトセット" },
    ],
    dark: [
      { name: "TOM FORD リップセット", price: 8800, img: "💄", color: "#a06050", shop: "公式", shopUrl: "#", rating: 4.9, desc: "憧れブランドのリップギフト" },
    ],
  },
  summer: {
    fair: [
      { name: "ANESSA パーフェクトUV スキンケアミルク", price: 2480, img: "☀️", color: "#f8e060", shop: "Amazon", shopUrl: "#", rating: 4.9, desc: "SPF50+最強UV！色白肌を守る必須アイテム" },
      { name: "サボリーノ 朝用マスク ひんやりタイプ", price: 1540, img: "🧊", color: "#a0d8f0", shop: "楽天", shopUrl: "#", rating: 4.5, desc: "朝60秒で洗顔〜スキンケア完了、ひんやり気持ちいい" },
      { name: "ビオレ UV アクアリッチ ウォータリーエッセンス", price: 878, img: "💧", color: "#80c8e8", shop: "Amazon", shopUrl: "#", rating: 4.7, desc: "軽い付け心地でトーンアップ効果も" },
      { name: "フリーズテック 冷感ネックリング", price: 1980, img: "❄️", color: "#b0e0f0", shop: "楽天", shopUrl: "#", rating: 4.4, desc: "28℃以下で自然凍結！繰り返し使える" },
      { name: "UVカット フェイスカバー", price: 1290, img: "🎭", color: "#f0d0d8", shop: "Qoo10", shopUrl: "#", rating: 4.3, desc: "息がしやすい冷感素材。顔の日焼け防止に" },
    ],
    light: [
      { name: "ALLIE クロノビューティ ジェルUV EX", price: 2310, img: "🌊", color: "#88c0d8", shop: "Amazon", shopUrl: "#", rating: 4.8, desc: "摩擦・水に強いジェルタイプUV" },
      { name: "ハンディファン ミスト機能付き", price: 2480, img: "🌬️", color: "#c0e0f0", shop: "楽天", shopUrl: "#", rating: 4.6, desc: "ミスト+風のダブルクール。USB充電式" },
      { name: "UVカットアームカバー 冷感", price: 990, img: "💪", color: "#d8c8e0", shop: "Amazon", shopUrl: "#", rating: 4.5, desc: "接触冷感素材で腕の日焼け防止" },
    ],
    medium: [
      { name: "SKIN AQUA トーンアップUVエッセンス", price: 810, img: "✨", color: "#e0c8f0", shop: "Amazon", shopUrl: "#", rating: 4.6, desc: "ラベンダーカラーで透明感UP" },
      { name: "制汗ミスト Ban プレシャスロール", price: 770, img: "🌸", color: "#f0b8c8", shop: "楽天", shopUrl: "#", rating: 4.4, desc: "汗のにおいケアにフローラルの香り" },
    ],
    tan: [
      { name: "コパトーン タンニングウォーター", price: 880, img: "🏖️", color: "#d8b080", shop: "Amazon", shopUrl: "#", rating: 4.3, desc: "きれいに焼きたい人向け。SPF4" },
      { name: "ニベア UV ウォータージェル", price: 998, img: "💦", color: "#90c8e0", shop: "楽天", shopUrl: "#", rating: 4.5, desc: "化粧水感覚で使えるUVジェル" },
    ],
    dark: [
      { name: "ニュートロジーナ ウルトラシアーUV", price: 1980, img: "🛡️", color: "#c8a870", shop: "Amazon", shopUrl: "#", rating: 4.6, desc: "白浮きしない！褐色肌でも自然" },
    ],
  },
  glasses: {
    fair: [
      { name: "Zoff CLASSIC クリアピンクフレーム", price: 5500, img: "👓", color: "#f0b8c8", shop: "Zoff公式", shopUrl: "#", rating: 4.6, desc: "透明感のあるピンクが色白肌に優しくなじむ" },
      { name: "JINS ライトブラウン ボストン", price: 5500, img: "🤎", color: "#c8a080", shop: "JINS公式", shopUrl: "#", rating: 4.7, desc: "やわらかいブラウンで顔まわりを明るく" },
      { name: "GU ブルーライトカットメガネ ゴールド", price: 1990, img: "✨", color: "#d4a843", shop: "GU", shopUrl: "#", rating: 4.2, desc: "細フレームゴールドで上品な印象" },
      { name: "Zoff UV クリアサングラス", price: 3300, img: "🕶️", color: "#e0d0c0", shop: "Zoff公式", shopUrl: "#", rating: 4.5, desc: "透明レンズでUV99%カット。普段使いに" },
    ],
    light: [
      { name: "JINS べっ甲風 ウェリントン", price: 8800, img: "🐢", color: "#b87830", shop: "JINS公式", shopUrl: "#", rating: 4.8, desc: "定番べっ甲柄で知的な印象に" },
      { name: "Zoff SMART スリムオーバル", price: 7700, img: "🔵", color: "#6080a8", shop: "Zoff公式", shopUrl: "#", rating: 4.6, desc: "軽量フレームで長時間でも疲れない" },
    ],
    medium: [
      { name: "JINS エアフレーム ブラウン", price: 5500, img: "🍂", color: "#a08060", shop: "JINS公式", shopUrl: "#", rating: 4.7, desc: "超軽量！ダークブラウンで落ち着いた印象" },
      { name: "3COINS 伊達メガネ ラウンド", price: 550, img: "🪙", color: "#d0c0a0", shop: "3COINS", shopUrl: "#", rating: 4.0, desc: "プチプラで試せる丸メガネ" },
    ],
    tan: [
      { name: "Ray-Ban ウェイファーラー風 サングラス", price: 15800, img: "🕶️", color: "#2a2a2a", shop: "楽天", shopUrl: "#", rating: 4.9, desc: "健康的な肌にブラックフレームが映える" },
      { name: "JINS カラーレンズ アンバー", price: 5500, img: "🟤", color: "#c89050", shop: "JINS公式", shopUrl: "#", rating: 4.5, desc: "アンバーレンズで目元をおしゃれに" },
    ],
    dark: [
      { name: "Zoff CLASSIC ゴールドメタル", price: 7700, img: "⭐", color: "#c8a030", shop: "Zoff公式", shopUrl: "#", rating: 4.7, desc: "ゴールドフレームが褐色肌にゴージャス" },
      { name: "OWNDAYS カラフルフレーム", price: 6600, img: "🌈", color: "#e06080", shop: "OWNDAYS", shopUrl: "#", rating: 4.4, desc: "ビビッドカラーで個性を出して" },
    ],
  },
  hair_color: {
    fair: [
      { name: "リーゼ 泡カラー ミルクティベージュ", price: 698, img: "🥛", color: "#d8c0a0", shop: "Amazon", shopUrl: "#", rating: 4.3, desc: "色白肌に透明感プラスのミルクティ系" },
      { name: "ビューティーン トーンダウンカラー アッシュ", price: 548, img: "🩶", color: "#8a8a7a", shop: "楽天", shopUrl: "#", rating: 4.2, desc: "くすみアッシュで儚げな雰囲気に" },
      { name: "リーゼ 泡カラー ラベンダーアッシュ", price: 698, img: "💜", color: "#b098c8", shop: "Amazon", shopUrl: "#", rating: 4.4, desc: "ブルベ色白さんにぴったりのラベンダー" },
      { name: "エブリ カラートリートメント パープル", price: 1540, img: "🔮", color: "#9070b0", shop: "楽天", shopUrl: "#", rating: 4.1, desc: "トリートメントで手軽にパープルに。ダメージレス" },
    ],
    light: [
      { name: "リーゼ 泡カラー マシュマロブラウン", price: 698, img: "🧸", color: "#b89070", shop: "Amazon", shopUrl: "#", rating: 4.5, desc: "やわらかブラウンで万人受け◎" },
      { name: "ビューティラボ ホイップヘアカラー ベージュ", price: 598, img: "🍯", color: "#c8a878", shop: "楽天", shopUrl: "#", rating: 4.3, desc: "ホイップタイプで塗りやすい" },
      { name: "パルティ カラーリングミルク ヘーゼルナッツ", price: 648, img: "🌰", color: "#a07848", shop: "Amazon", shopUrl: "#", rating: 4.2, desc: "深みのあるナッツブラウン" },
    ],
    medium: [
      { name: "リーゼ 泡カラー ダークショコラ", price: 698, img: "🍫", color: "#5a3828", shop: "Amazon", shopUrl: "#", rating: 4.5, desc: "落ち着いたダークブラウン。オフィスもOK" },
      { name: "ビューティーン ポイントカラークリーム ピンク", price: 448, img: "🩷", color: "#e088a0", shop: "楽天", shopUrl: "#", rating: 4.0, desc: "インナーカラーに！ポイント使いで遊ぶ" },
      { name: "LUCIDO-L ミルクジャムヘアカラー キャラメル", price: 698, img: "🍬", color: "#c89060", shop: "Amazon", shopUrl: "#", rating: 4.4, desc: "ミルクジャムのようになめらかテクスチャ" },
    ],
    tan: [
      { name: "リーゼ 泡カラー ニューヨークアッシュ", price: 698, img: "🏙️", color: "#787068", shop: "Amazon", shopUrl: "#", rating: 4.3, desc: "クールなアッシュで健康肌にこなれ感" },
      { name: "ビューティラボ バニティカラー ダークアッシュ", price: 598, img: "🖤", color: "#484848", shop: "楽天", shopUrl: "#", rating: 4.2, desc: "暗めアッシュで大人っぽく" },
    ],
    dark: [
      { name: "リーゼ 泡カラー ブリティッシュアッシュ", price: 698, img: "🇬🇧", color: "#606058", shop: "Amazon", shopUrl: "#", rating: 4.4, desc: "グレーアッシュで透明感を出す" },
      { name: "エンシェールズ カラーバター オーシャンブルー", price: 2667, img: "🌊", color: "#4088b0", shop: "Amazon", shopUrl: "#", rating: 4.3, desc: "ビビッドブルーで褐色肌に映えるカラー" },
    ],
  },
};

const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span style={{ color: "#f0a0b0", fontSize: 12, letterSpacing: 1 }}>
      {"★".repeat(full)}
      {half ? "☆" : ""}
      <span style={{ color: "#ccc" }}>{"★".repeat(5 - full - (half ? 1 : 0))}</span>
      <span style={{ marginLeft: 4, color: "#999", fontSize: 11 }}>{rating}</span>
    </span>
  );
};

export default function BeautyApp() {
  const [screen, setScreen] = useState("splash");
  const [profile, setProfile] = useState({
    skinTone: null,
    hairColor: null,
    faceShape: null,
    age: null,
    priceRange: null,
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavs, setShowFavs] = useState(false);
  const [animIn, setAnimIn] = useState(false);
  const [profileStep, setProfileStep] = useState(0);

  useEffect(() => {
    if (screen === "splash") {
      setTimeout(() => {
        setAnimIn(true);
      }, 300);
      setTimeout(() => {
        setScreen("profile");
        setAnimIn(false);
        setTimeout(() => setAnimIn(true), 100);
      }, 2200);
    }
  }, []);

  const navigate = (s) => {
    setAnimIn(false);
    setTimeout(() => {
      setScreen(s);
      setTimeout(() => setAnimIn(true), 50);
    }, 200);
  };

  const toggleFav = (product) => {
    setFavorites((prev) =>
      prev.find((f) => f.name === product.name)
        ? prev.filter((f) => f.name !== product.name)
        : [...prev, product]
    );
  };

  const isFav = (product) => favorites.some((f) => f.name === product.name);

  const getProducts = () => {
    if (!selectedCategory || !profile.skinTone) return [];
    let prods = PRODUCTS[selectedCategory]?.[profile.skinTone] || [];
    if (profile.priceRange === "budget") prods = prods.filter((p) => p.price <= 1000);
    else if (profile.priceRange === "mid") prods = prods.filter((p) => p.price > 1000 && p.price <= 3000);
    else if (profile.priceRange === "high") prods = prods.filter((p) => p.price > 3000 && p.price <= 5000);
    else if (profile.priceRange === "luxury") prods = prods.filter((p) => p.price > 5000);
    if (prods.length === 0) prods = PRODUCTS[selectedCategory]?.[profile.skinTone] || [];
    return prods;
  };

  const font = `'Zen Maru Gothic', 'Hiragino Maru Gothic ProN', 'Kosugi Maru', sans-serif`;

  const styles = {
    app: {
      fontFamily: font,
      maxWidth: 430,
      margin: "0 auto",
      minHeight: "100vh",
      background: "linear-gradient(180deg, #FFF5F7 0%, #FFF0F5 30%, #FFF8FA 60%, #F8F0FF 100%)",
      position: "relative",
      overflow: "hidden",
    },
    splash: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #FFE0EC 0%, #FFD0E8 30%, #E8D0FF 70%, #D0E8FF 100%)",
      opacity: animIn ? 1 : 0,
      transform: animIn ? "scale(1)" : "scale(0.9)",
      transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
    },
    header: {
      background: "linear-gradient(135deg, #ff8faf 0%, #ffa0c0 50%, #e0a0ff 100%)",
      padding: "52px 20px 18px",
      borderRadius: "0 0 28px 28px",
      boxShadow: "0 4px 20px rgba(255,143,175,0.3)",
      position: "relative",
      zIndex: 10,
    },
    card: {
      background: "white",
      borderRadius: 20,
      padding: "16px",
      marginBottom: 12,
      boxShadow: "0 2px 16px rgba(255,150,180,0.12)",
      border: "1px solid rgba(255,200,220,0.3)",
      transition: "all 0.3s ease",
    },
    btn: {
      background: "linear-gradient(135deg, #ff8faf 0%, #ffa0c8 50%, #e0a0ff 100%)",
      color: "white",
      border: "none",
      borderRadius: 50,
      padding: "14px 32px",
      fontSize: 16,
      fontWeight: 700,
      fontFamily: font,
      cursor: "pointer",
      boxShadow: "0 4px 16px rgba(255,143,175,0.4)",
      transition: "all 0.3s ease",
      letterSpacing: 1,
    },
    chip: (selected) => ({
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "8px 16px",
      borderRadius: 50,
      border: selected ? "2px solid #ff8faf" : "2px solid #f0e0e8",
      background: selected ? "linear-gradient(135deg, #fff0f5, #ffe8f5)" : "white",
      fontSize: 13,
      fontWeight: selected ? 700 : 400,
      color: selected ? "#d05080" : "#888",
      cursor: "pointer",
      transition: "all 0.25s ease",
      fontFamily: font,
      boxShadow: selected ? "0 2px 12px rgba(255,143,175,0.2)" : "none",
    }),
    navBar: {
      position: "fixed",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: 430,
      background: "rgba(255,255,255,0.95)",
      backdropFilter: "blur(20px)",
      borderTop: "1px solid rgba(255,200,220,0.3)",
      display: "flex",
      justifyContent: "space-around",
      padding: "10px 0 28px",
      zIndex: 100,
    },
    fadeIn: {
      opacity: animIn ? 1 : 0,
      transform: animIn ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.5s cubic-bezier(0.34, 1.2, 0.64, 1)",
    },
  };

  // === SPLASH ===
  if (screen === "splash") {
    return (
      <div style={styles.app}>
        <div style={styles.splash}>
          <div style={{ fontSize: 72, marginBottom: 16, filter: "drop-shadow(0 4px 8px rgba(255,100,150,0.3))" }}>💖</div>
          <h1 style={{ fontSize: 32, fontWeight: 900, background: "linear-gradient(135deg, #ff6090, #d060c0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 8 }}>
            BijoGuru
          </h1>
          <p style={{ color: "#c080a0", fontSize: 14, letterSpacing: 2 }}>あなただけの美容ガイド</p>
          <div style={{ marginTop: 40, display: "flex", gap: 8 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "#ff8faf",
                animation: `bounce 1.2s ease-in-out ${i * 0.15}s infinite`,
              }} />
            ))}
          </div>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;700;900&display=swap');
            @keyframes bounce {
              0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
              40% { transform: translateY(-12px); opacity: 1; }
            }
          `}</style>
        </div>
      </div>
    );
  }

  // === PROFILE SETUP ===
  if (screen === "profile") {
    const steps = [
      {
        title: "肌の色は？",
        subtitle: "あなたにぴったりのカラーを見つけよう",
        content: (
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
            {SKIN_TONES.map((s) => (
              <div key={s.id} onClick={() => setProfile({ ...profile, skinTone: s.id })} style={{
                cursor: "pointer", textAlign: "center", transition: "all 0.3s ease",
                transform: profile.skinTone === s.id ? "scale(1.1)" : "scale(1)",
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: s.color,
                  border: profile.skinTone === s.id ? "3px solid #ff8faf" : "3px solid transparent",
                  boxShadow: profile.skinTone === s.id ? "0 4px 16px rgba(255,143,175,0.4)" : "0 2px 8px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                }} />
                <div style={{ fontSize: 11, marginTop: 6, color: profile.skinTone === s.id ? "#d05080" : "#999", fontWeight: profile.skinTone === s.id ? 700 : 400 }}>{s.label}</div>
              </div>
            ))}
          </div>
        ),
      },
      {
        title: "髪色は？",
        subtitle: "ヘアアクセ選びの参考に",
        content: (
          <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginTop: 20 }}>
            {HAIR_COLORS.map((h) => (
              <div key={h.id} onClick={() => setProfile({ ...profile, hairColor: h.id })} style={{
                cursor: "pointer", textAlign: "center", transition: "all 0.3s ease",
                transform: profile.hairColor === h.id ? "scale(1.1)" : "scale(1)",
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: h.color,
                  border: profile.hairColor === h.id ? "3px solid #ff8faf" : "3px solid transparent",
                  boxShadow: profile.hairColor === h.id ? "0 4px 16px rgba(255,143,175,0.4)" : "0 2px 8px rgba(0,0,0,0.1)",
                }} />
                <div style={{ fontSize: 10, marginTop: 5, color: profile.hairColor === h.id ? "#d05080" : "#999", fontWeight: profile.hairColor === h.id ? 700 : 400 }}>{h.label}</div>
              </div>
            ))}
          </div>
        ),
      },
      {
        title: "顔の骨格は？",
        subtitle: "似合うアイテムが見つかる",
        content: (
          <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", marginTop: 20 }}>
            {FACE_SHAPES.map((f) => (
              <div key={f.id} onClick={() => setProfile({ ...profile, faceShape: f.id })} style={styles.chip(profile.faceShape === f.id)}>
                <span>{f.icon}</span> {f.label}
              </div>
            ))}
          </div>
        ),
      },
      {
        title: "年齢は？",
        subtitle: "年代に合ったおすすめを",
        content: (
          <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", marginTop: 20 }}>
            {AGE_RANGES.map((a) => (
              <div key={a} onClick={() => setProfile({ ...profile, age: a })} style={styles.chip(profile.age === a)}>
                {a}
              </div>
            ))}
          </div>
        ),
      },
      {
        title: "予算は？",
        subtitle: "お財布に合わせて提案するよ",
        content: (
          <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", marginTop: 20 }}>
            {PRICE_RANGES.map((p) => (
              <div key={p.id} onClick={() => setProfile({ ...profile, priceRange: p.id })} style={styles.chip(profile.priceRange === p.id)}>
                <span>{p.icon}</span> {p.label}
              </div>
            ))}
          </div>
        ),
      },
    ];

    const canNext =
      (profileStep === 0 && profile.skinTone) ||
      (profileStep === 1 && profile.hairColor) ||
      (profileStep === 2 && profile.faceShape) ||
      (profileStep === 3 && profile.age) ||
      (profileStep === 4 && profile.priceRange);

    return (
      <div style={styles.app}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;700;900&display=swap');`}</style>
        <div style={{ padding: "60px 24px 24px", ...styles.fadeIn }}>
          {/* Progress */}
          <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
            {steps.map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 4, borderRadius: 2,
                background: i <= profileStep ? "linear-gradient(90deg, #ff8faf, #e0a0ff)" : "#f0e0e8",
                transition: "all 0.4s ease",
              }} />
            ))}
          </div>

          <h2 style={{ fontSize: 26, fontWeight: 900, color: "#4a3040", marginBottom: 4 }}>
            {steps[profileStep].title}
          </h2>
          <p style={{ color: "#b090a0", fontSize: 13, marginBottom: 8 }}>
            {steps[profileStep].subtitle}
          </p>

          {steps[profileStep].content}

          <div style={{ display: "flex", gap: 12, marginTop: 36, justifyContent: "center" }}>
            {profileStep > 0 && (
              <button onClick={() => { setAnimIn(false); setTimeout(() => { setProfileStep(profileStep - 1); setAnimIn(true); }, 150); }}
                style={{ ...styles.btn, background: "white", color: "#d05080", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", border: "2px solid #ffe0ec" }}>
                戻る
              </button>
            )}
            <button
              onClick={() => {
                if (profileStep < 4) {
                  setAnimIn(false);
                  setTimeout(() => { setProfileStep(profileStep + 1); setAnimIn(true); }, 150);
                } else {
                  navigate("home");
                }
              }}
              disabled={!canNext}
              style={{ ...styles.btn, opacity: canNext ? 1 : 0.4, cursor: canNext ? "pointer" : "default" }}
            >
              {profileStep === 4 ? "はじめる 🎀" : "つぎへ →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // === HOME ===
  if (screen === "home" && !selectedCategory && !showFavs) {
    return (
      <div style={styles.app}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;700;900&display=swap');`}</style>
        <div style={styles.header}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h1 style={{ color: "white", fontSize: 24, fontWeight: 900, margin: 0, textShadow: "0 2px 8px rgba(200,80,120,0.3)" }}>BijoGuru 💖</h1>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, margin: "4px 0 0" }}>あなただけの美容ガイド</p>
            </div>
            <div onClick={() => navigate("profile")} style={{
              background: "rgba(255,255,255,0.25)", borderRadius: "50%",
              width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", backdropFilter: "blur(10px)",
            }}>
              <span style={{ fontSize: 18 }}>⚙️</span>
            </div>
          </div>
          {/* Profile summary */}
          <div style={{
            marginTop: 14, background: "rgba(255,255,255,0.2)", borderRadius: 14, padding: "10px 14px",
            display: "flex", gap: 8, flexWrap: "wrap", backdropFilter: "blur(10px)",
          }}>
            <span style={{ background: "rgba(255,255,255,0.3)", padding: "3px 10px", borderRadius: 20, fontSize: 11, color: "white" }}>
              {SKIN_TONES.find(s => s.id === profile.skinTone)?.label}肌
            </span>
            <span style={{ background: "rgba(255,255,255,0.3)", padding: "3px 10px", borderRadius: 20, fontSize: 11, color: "white" }}>
              {HAIR_COLORS.find(h => h.id === profile.hairColor)?.label}
            </span>
            <span style={{ background: "rgba(255,255,255,0.3)", padding: "3px 10px", borderRadius: 20, fontSize: 11, color: "white" }}>
              {profile.age}
            </span>
            <span style={{ background: "rgba(255,255,255,0.3)", padding: "3px 10px", borderRadius: 20, fontSize: 11, color: "white" }}>
              {PRICE_RANGES.find(p => p.id === profile.priceRange)?.label}
            </span>
          </div>
        </div>

        <div style={{ padding: "20px 18px 100px", ...styles.fadeIn }}>
          <h3 style={{ fontSize: 18, fontWeight: 900, color: "#4a3040", marginBottom: 16 }}>
            カテゴリから探す 🔍
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {CATEGORIES.map((cat, i) => (
              <div
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id); }}
                style={{
                  background: "white",
                  borderRadius: 20,
                  padding: "20px 8px",
                  textAlign: "center",
                  cursor: "pointer",
                  boxShadow: "0 2px 16px rgba(255,150,180,0.12)",
                  border: "1px solid rgba(255,200,220,0.3)",
                  transition: "all 0.3s ease",
                  animationDelay: `${i * 0.08}s`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,143,175,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 16px rgba(255,150,180,0.12)";
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 8, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}>{cat.emoji}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#5a4050" }}>{cat.label}</div>
              </div>
            ))}
          </div>

          {/* Skin tone tip */}
          <div style={{ ...styles.card, marginTop: 20, background: "linear-gradient(135deg, #fff5f8, #fff0ff)", border: "1px solid #ffe0f0" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ fontSize: 36 }}>💡</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#4a3040", marginBottom: 4 }}>
                  {SKIN_TONES.find(s => s.id === profile.skinTone)?.label}肌さんへのTips
                </div>
                <div style={{ fontSize: 12, color: "#907080", lineHeight: 1.6 }}>
                  {profile.skinTone === "fair" && "ブルベ寄りの色白さんは、青みピンクやラベンダーカラーが似合います。メガネはクリアフレームやライトブラウンが◎ ヘアカラーはミルクティやラベンダーアッシュで透明感UP！"}
                  {profile.skinTone === "light" && "コーラルピンクやピーチカラーがおすすめ。ゴールド系のメガネもよく映えます！ヘアカラーはマシュマロブラウン系が万能！"}
                  {profile.skinTone === "medium" && "テラコッタやブラウン系が得意。べっ甲柄のメガネが知的に。ヘアカラーはダークショコラやキャラメル系が自然！"}
                  {profile.skinTone === "tan" && "深みのあるカラーが映えます。サングラスはブラックフレームが相性◎ ヘアカラーはアッシュ系でこなれ感を！"}
                  {profile.skinTone === "dark" && "ビビッドカラーやゴールドがゴージャスに映えます。ゴールドフレームのメガネが華やか。ヘアカラーはブルーやグレー系で遊んで！"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nav Bar */}
        <div style={styles.navBar}>
          <div style={{ textAlign: "center", cursor: "pointer", color: "#ff8faf" }}>
            <div style={{ fontSize: 22 }}>🏠</div>
            <div style={{ fontSize: 10, fontWeight: 700, marginTop: 2 }}>ホーム</div>
          </div>
          <div onClick={() => setShowFavs(true)} style={{ textAlign: "center", cursor: "pointer", color: "#c0a0b0" }}>
            <div style={{ fontSize: 22, position: "relative" }}>
              💝
              {favorites.length > 0 && (
                <span style={{
                  position: "absolute", top: -4, right: -8,
                  background: "#ff6090", color: "white", fontSize: 9,
                  width: 16, height: 16, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700,
                }}>{favorites.length}</span>
              )}
            </div>
            <div style={{ fontSize: 10, marginTop: 2 }}>お気に入り</div>
          </div>
          <div onClick={() => { setProfileStep(0); navigate("profile"); }} style={{ textAlign: "center", cursor: "pointer", color: "#c0a0b0" }}>
            <div style={{ fontSize: 22 }}>👤</div>
            <div style={{ fontSize: 10, marginTop: 2 }}>プロフ</div>
          </div>
        </div>
      </div>
    );
  }

  // === PRODUCT LIST ===
  if (selectedCategory && !showFavs) {
    const products = getProducts();
    const catInfo = CATEGORIES.find((c) => c.id === selectedCategory);

    return (
      <div style={styles.app}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;700;900&display=swap');`}</style>
        <div style={styles.header}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div onClick={() => setSelectedCategory(null)} style={{
              cursor: "pointer", fontSize: 20, background: "rgba(255,255,255,0.25)",
              width: 36, height: 36, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>←</div>
            <div>
              <h2 style={{ color: "white", fontSize: 20, fontWeight: 900, margin: 0 }}>
                {catInfo?.emoji} {catInfo?.label}
              </h2>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 11, margin: "2px 0 0" }}>
                {SKIN_TONES.find(s => s.id === profile.skinTone)?.label}肌 × {profile.age} におすすめ
              </p>
            </div>
          </div>
        </div>

        <div style={{ padding: "16px 16px 100px", ...styles.fadeIn }}>
          {products.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
              <p style={{ color: "#b090a0", fontSize: 14 }}>この条件の商品を準備中です...</p>
            </div>
          ) : (
            products.map((product, i) => (
              <div key={i} style={{
                ...styles.card,
                display: "flex", gap: 14, alignItems: "flex-start",
                opacity: animIn ? 1 : 0,
                transform: animIn ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.4s cubic-bezier(0.34,1.2,0.64,1) ${i * 0.1}s`,
              }}>
                {/* Product color swatch / emoji */}
                <div style={{
                  width: 72, height: 72, borderRadius: 16,
                  background: `linear-gradient(135deg, ${product.color}, ${product.color}cc)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 32, flexShrink: 0,
                  boxShadow: `0 4px 12px ${product.color}40`,
                }}>
                  {product.img}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: "#4a3040", margin: 0, lineHeight: 1.4, paddingRight: 8 }}>
                      {product.name}
                    </h4>
                    <div onClick={() => toggleFav(product)} style={{ cursor: "pointer", fontSize: 20, flexShrink: 0, transition: "transform 0.2s", transform: isFav(product) ? "scale(1.2)" : "scale(1)" }}>
                      {isFav(product) ? "💖" : "🤍"}
                    </div>
                  </div>
                  <p style={{ fontSize: 11, color: "#a08090", margin: "4px 0", lineHeight: 1.5 }}>{product.desc}</p>
                  <StarRating rating={product.rating} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                    <span style={{ fontSize: 18, fontWeight: 900, color: "#d05080" }}>
                      ¥{product.price.toLocaleString()}
                    </span>
                    <a href={product.shopUrl} style={{
                      background: "linear-gradient(135deg, #ff8faf, #ffa0c8)",
                      color: "white", fontSize: 11, fontWeight: 700,
                      padding: "6px 14px", borderRadius: 20,
                      textDecoration: "none",
                      boxShadow: "0 2px 8px rgba(255,143,175,0.3)",
                    }}>
                      {product.shop}で見る →
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={styles.navBar}>
          <div onClick={() => setSelectedCategory(null)} style={{ textAlign: "center", cursor: "pointer", color: "#c0a0b0" }}>
            <div style={{ fontSize: 22 }}>🏠</div>
            <div style={{ fontSize: 10, marginTop: 2 }}>ホーム</div>
          </div>
          <div onClick={() => { setShowFavs(true); }} style={{ textAlign: "center", cursor: "pointer", color: "#c0a0b0" }}>
            <div style={{ fontSize: 22, position: "relative" }}>
              💝
              {favorites.length > 0 && (
                <span style={{
                  position: "absolute", top: -4, right: -8,
                  background: "#ff6090", color: "white", fontSize: 9,
                  width: 16, height: 16, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700,
                }}>{favorites.length}</span>
              )}
            </div>
            <div style={{ fontSize: 10, marginTop: 2 }}>お気に入り</div>
          </div>
          <div onClick={() => { setProfileStep(0); navigate("profile"); }} style={{ textAlign: "center", cursor: "pointer", color: "#c0a0b0" }}>
            <div style={{ fontSize: 22 }}>👤</div>
            <div style={{ fontSize: 10, marginTop: 2 }}>プロフ</div>
          </div>
        </div>
      </div>
    );
  }

  // === FAVORITES ===
  if (showFavs) {
    return (
      <div style={styles.app}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;700;900&display=swap');`}</style>
        <div style={styles.header}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div onClick={() => { setShowFavs(false); }} style={{
              cursor: "pointer", fontSize: 20, background: "rgba(255,255,255,0.25)",
              width: 36, height: 36, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>←</div>
            <h2 style={{ color: "white", fontSize: 20, fontWeight: 900, margin: 0 }}>
              💝 お気に入り
            </h2>
          </div>
        </div>

        <div style={{ padding: "16px 16px 100px", ...styles.fadeIn }}>
          {favorites.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>💝</div>
              <p style={{ color: "#b090a0", fontSize: 14 }}>まだお気に入りがありません</p>
              <p style={{ color: "#c0b0c0", fontSize: 12 }}>ハートをタップして追加してね</p>
            </div>
          ) : (
            favorites.map((product, i) => (
              <div key={i} style={{
                ...styles.card,
                display: "flex", gap: 14, alignItems: "flex-start",
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 16,
                  background: `linear-gradient(135deg, ${product.color}, ${product.color}cc)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 28, flexShrink: 0,
                }}>
                  {product.img}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: "#4a3040", margin: 0 }}>{product.name}</h4>
                    <div onClick={() => toggleFav(product)} style={{ cursor: "pointer", fontSize: 18 }}>💖</div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                    <span style={{ fontSize: 16, fontWeight: 900, color: "#d05080" }}>¥{product.price.toLocaleString()}</span>
                    <a href={product.shopUrl} style={{
                      background: "linear-gradient(135deg, #ff8faf, #ffa0c8)",
                      color: "white", fontSize: 11, fontWeight: 700,
                      padding: "5px 12px", borderRadius: 20,
                      textDecoration: "none",
                    }}>
                      {product.shop}で見る
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={styles.navBar}>
          <div onClick={() => { setShowFavs(false); setSelectedCategory(null); }} style={{ textAlign: "center", cursor: "pointer", color: "#c0a0b0" }}>
            <div style={{ fontSize: 22 }}>🏠</div>
            <div style={{ fontSize: 10, marginTop: 2 }}>ホーム</div>
          </div>
          <div style={{ textAlign: "center", cursor: "pointer", color: "#ff8faf" }}>
            <div style={{ fontSize: 22 }}>💝</div>
            <div style={{ fontSize: 10, fontWeight: 700, marginTop: 2 }}>お気に入り</div>
          </div>
          <div onClick={() => { setShowFavs(false); setProfileStep(0); navigate("profile"); }} style={{ textAlign: "center", cursor: "pointer", color: "#c0a0b0" }}>
            <div style={{ fontSize: 22 }}>👤</div>
            <div style={{ fontSize: 10, marginTop: 2 }}>プロフ</div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
