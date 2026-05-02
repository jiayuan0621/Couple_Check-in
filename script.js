let places = JSON.parse(localStorage.getItem('couplePlaces')) || [];
let things = JSON.parse(localStorage.getItem('coupleThings')) || null;
let map = null;
let markers = [];

// 全球主要城市经纬度数据库
const citiesDatabase = [
    // 中国城市
    { name: "北京", lat: 39.9042, lng: 116.4074, country: "中国" },
    { name: "上海", lat: 31.2304, lng: 121.4737, country: "中国" },
    { name: "广州", lat: 23.1291, lng: 113.2644, country: "中国" },
    { name: "深圳", lat: 22.5431, lng: 114.0579, country: "中国" },
    { name: "杭州", lat: 30.2741, lng: 120.1551, country: "中国" },
    { name: "成都", lat: 30.5728, lng: 104.0668, country: "中国" },
    { name: "重庆", lat: 29.4316, lng: 106.9123, country: "中国" },
    { name: "武汉", lat: 30.5928, lng: 114.3055, country: "中国" },
    { name: "西安", lat: 34.3416, lng: 108.9398, country: "中国" },
    { name: "南京", lat: 32.0603, lng: 118.7969, country: "中国" },
    { name: "天津", lat: 39.3434, lng: 117.3616, country: "中国" },
    { name: "苏州", lat: 31.2989, lng: 120.5853, country: "中国" },
    { name: "长沙", lat: 28.2282, lng: 112.9388, country: "中国" },
    { name: "郑州", lat: 34.7466, lng: 113.6253, country: "中国" },
    { name: "青岛", lat: 36.0671, lng: 120.3826, country: "中国" },
    { name: "沈阳", lat: 41.8056, lng: 123.4328, country: "中国" },
    { name: "大连", lat: 38.9140, lng: 121.6147, country: "中国" },
    { name: "厦门", lat: 24.4798, lng: 118.0894, country: "中国" },
    { name: "昆明", lat: 25.0406, lng: 102.7129, country: "中国" },
    { name: "哈尔滨", lat: 45.8038, lng: 126.5340, country: "中国" },
    { name: "长春", lat: 43.8171, lng: 125.3235, country: "中国" },
    { name: "石家庄", lat: 38.0428, lng: 114.5149, country: "中国" },
    { name: "福州", lat: 26.0745, lng: 119.2965, country: "中国" },
    { name: "南昌", lat: 28.6829, lng: 115.8579, country: "中国" },
    { name: "济南", lat: 36.6512, lng: 117.1205, country: "中国" },
    { name: "太原", lat: 37.8706, lng: 112.5489, country: "中国" },
    { name: "兰州", lat: 36.0611, lng: 103.8343, country: "中国" },
    { name: "贵阳", lat: 26.6470, lng: 106.6302, country: "中国" },
    { name: "南宁", lat: 22.8170, lng: 108.3665, country: "中国" },
    { name: "海口", lat: 20.0444, lng: 110.1999, country: "中国" },
    { name: "乌鲁木齐", lat: 43.8256, lng: 87.6168, country: "中国" },
    { name: "拉萨", lat: 29.6500, lng: 91.1000, country: "中国" },
    { name: "呼和浩特", lat: 40.8424, lng: 111.7491, country: "中国" },
    { name: "三亚", lat: 18.2528, lng: 109.5117, country: "中国" },
    { name: "珠海", lat: 22.2710, lng: 113.5767, country: "中国" },
    { name: "东莞", lat: 23.0489, lng: 113.7447, country: "中国" },
    { name: "宁波", lat: 29.8683, lng: 121.5440, country: "中国" },
    { name: "无锡", lat: 31.4912, lng: 120.3119, country: "中国" },
    { name: "佛山", lat: 23.0218, lng: 113.1219, country: "中国" },
    { name: "合肥", lat: 31.8206, lng: 117.2272, country: "中国" },
    
    // 亚洲其他城市
    { name: "东京", lat: 35.6762, lng: 139.6503, country: "日本" },
    { name: "大阪", lat: 34.6937, lng: 135.5023, country: "日本" },
    { name: "京都", lat: 35.0116, lng: 135.7681, country: "日本" },
    { name: "北海道", lat: 43.0642, lng: 141.3469, country: "日本" },
    { name: "冲绳", lat: 26.5013, lng: 127.9458, country: "日本" },
    { name: "首尔", lat: 37.5665, lng: 126.9780, country: "韩国" },
    { name: "釜山", lat: 35.1796, lng: 129.0756, country: "韩国" },
    { name: "济州岛", lat: 33.4996, lng: 126.5312, country: "韩国" },
    { name: "台北", lat: 25.0330, lng: 121.5654, country: "台湾" },
    { name: "高雄", lat: 22.6273, lng: 120.3014, country: "台湾" },
    { name: "香港", lat: 22.3193, lng: 114.1694, country: "中国" },
    { name: "澳门", lat: 22.1987, lng: 113.5439, country: "中国" },
    { name: "曼谷", lat: 13.7563, lng: 100.5018, country: "泰国" },
    { name: "清迈", lat: 18.7883, lng: 98.9853, country: "泰国" },
    { name: "普吉岛", lat: 7.9519, lng: 98.3381, country: "泰国" },
    { name: "新加坡", lat: 1.3521, lng: 103.8198, country: "新加坡" },
    { name: "巴厘岛", lat: -8.3405, lng: 115.0920, country: "印度尼西亚" },
    { name: "吉隆坡", lat: 3.1390, lng: 101.6869, country: "马来西亚" },
    { name: "马尼拉", lat: 14.5995, lng: 120.9842, country: "菲律宾" },
    { name: "胡志明市", lat: 10.8231, lng: 106.6297, country: "越南" },
    { name: "河内", lat: 21.0285, lng: 105.8542, country: "越南" },
    { name: "芽庄", lat: 12.2388, lng: 109.1967, country: "越南" },
    { name: "吴哥窟", lat: 13.4125, lng: 103.8670, country: "柬埔寨" },
    { name: "新德里", lat: 28.6139, lng: 77.2090, country: "印度" },
    { name: "孟买", lat: 19.0760, lng: 72.8777, country: "印度" },
    { name: "加尔各答", lat: 22.5726, lng: 88.3639, country: "印度" },
    { name: "迪拜", lat: 25.2048, lng: 55.2708, country: "阿联酋" },
    { name: "马尔代夫", lat: 3.2028, lng: 73.2207, country: "马尔代夫" },
    { name: "斯里兰卡", lat: 7.8731, lng: 80.7718, country: "斯里兰卡" },
    { name: "尼泊尔", lat: 28.3949, lng: 84.1240, country: "尼泊尔" },
    
    // 欧洲城市
    { name: "伦敦", lat: 51.5074, lng: -0.1278, country: "英国" },
    { name: "巴黎", lat: 48.8566, lng: 2.3522, country: "法国" },
    { name: "罗马", lat: 41.9028, lng: 12.4964, country: "意大利" },
    { name: "威尼斯", lat: 45.4408, lng: 12.3155, country: "意大利" },
    { name: "佛罗伦萨", lat: 43.7696, lng: 11.2558, country: "意大利" },
    { name: "米兰", lat: 45.4642, lng: 9.1900, country: "意大利" },
    { name: "马德里", lat: 40.4168, lng: -3.7038, country: "西班牙" },
    { name: "巴塞罗那", lat: 41.3851, lng: 2.1734, country: "西班牙" },
    { name: "阿姆斯特丹", lat: 52.3676, lng: 4.9041, country: "荷兰" },
    { name: "布鲁塞尔", lat: 50.8503, lng: 4.3517, country: "比利时" },
    { name: "柏林", lat: 52.5200, lng: 13.4050, country: "德国" },
    { name: "慕尼黑", lat: 48.1351, lng: 11.5820, country: "德国" },
    { name: "法兰克福", lat: 50.1109, lng: 8.6821, country: "德国" },
    { name: "维也纳", lat: 48.2082, lng: 16.3738, country: "奥地利" },
    { name: "苏黎世", lat: 47.3769, lng: 8.5417, country: "瑞士" },
    { name: "日内瓦", lat: 46.2044, lng: 6.1432, country: "瑞士" },
    { name: "卢塞恩", lat: 47.0502, lng: 8.3093, country: "瑞士" },
    { name: "布拉格", lat: 50.0755, lng: 14.4378, country: "捷克" },
    { name: "布达佩斯", lat: 47.4979, lng: 19.0402, country: "匈牙利" },
    { name: "华沙", lat: 52.2297, lng: 21.0122, country: "波兰" },
    { name: "克拉科夫", lat: 50.0647, lng: 19.9450, country: "波兰" },
    { name: "哥本哈根", lat: 55.6761, lng: 12.5683, country: "丹麦" },
    { name: "奥斯陆", lat: 59.9139, lng: 10.7522, country: "挪威" },
    { name: "斯德哥尔摩", lat: 59.3293, lng: 18.0686, country: "瑞典" },
    { name: "赫尔辛基", lat: 60.1699, lng: 24.9384, country: "芬兰" },
    { name: "雷克雅未克", lat: 64.1466, lng: -21.9426, country: "冰岛" },
    { name: "都柏林", lat: 53.3498, lng: -6.2603, country: "爱尔兰" },
    { name: "爱丁堡", lat: 55.9533, lng: -3.1883, country: "英国" },
    { name: "曼彻斯特", lat: 53.4808, lng: -2.2426, country: "英国" },
    { name: "剑桥", lat: 52.2053, lng: 0.1218, country: "英国" },
    { name: "牛津", lat: 51.7520, lng: -1.2577, country: "英国" },
    { name: "尼斯", lat: 43.7102, lng: 7.2620, country: "法国" },
    { name: "戛纳", lat: 43.5528, lng: 7.0174, country: "法国" },
    { name: "里昂", lat: 45.7640, lng: 4.8357, country: "法国" },
    { name: "圣托里尼", lat: 36.3932, lng: 25.4615, country: "希腊" },
    { name: "雅典", lat: 37.9838, lng: 23.7275, country: "希腊" },
    { name: "伊斯坦布尔", lat: 41.0082, lng: 28.9784, country: "土耳其" },
    { name: "莫斯科", lat: 55.7558, lng: 37.6173, country: "俄罗斯" },
    { name: "圣彼得堡", lat: 59.9311, lng: 30.3609, country: "俄罗斯" },
    { name: "里斯本", lat: 38.7223, lng: -9.1393, country: "葡萄牙" },
    { name: "波尔图", lat: 41.1579, lng: -8.6291, country: "葡萄牙" },
    
    // 北美城市
    { name: "纽约", lat: 40.7128, lng: -74.0060, country: "美国" },
    { name: "洛杉矶", lat: 34.0522, lng: -118.2437, country: "美国" },
    { name: "旧金山", lat: 37.7749, lng: -122.4194, country: "美国" },
    { name: "拉斯维加斯", lat: 36.1699, lng: -115.1398, country: "美国" },
    { name: "夏威夷", lat: 21.3069, lng: -157.8583, country: "美国" },
    { name: "迈阿密", lat: 25.7617, lng: -80.1918, country: "美国" },
    { name: "奥兰多", lat: 28.5383, lng: -81.3792, country: "美国" },
    { name: "华盛顿", lat: 38.9072, lng: -77.0369, country: "美国" },
    { name: "波士顿", lat: 42.3601, lng: -71.0589, country: "美国" },
    { name: "芝加哥", lat: 41.8781, lng: -87.6298, country: "美国" },
    { name: "西雅图", lat: 47.6062, lng: -122.3321, country: "美国" },
    { name: "波特兰", lat: 45.5152, lng: -122.6784, country: "美国" },
    { name: "丹佛", lat: 39.7392, lng: -104.9903, country: "美国" },
    { name: "休斯顿", lat: 29.7604, lng: -95.3698, country: "美国" },
    { name: "达拉斯", lat: 32.7767, lng: -96.7970, country: "美国" },
    { name: "亚特兰大", lat: 33.7490, lng: -84.3880, country: "美国" },
    { name: "底特律", lat: 42.3314, lng: -83.0458, country: "美国" },
    { name: "费城", lat: 39.9526, lng: -75.1652, country: "美国" },
    { name: "圣地亚哥", lat: 32.7157, lng: -117.1611, country: "美国" },
    { name: "凤凰城", lat: 33.4484, lng: -112.0740, country: "美国" },
    { name: "盐湖城", lat: 40.7608, lng: -111.8910, country: "美国" },
    { name: "蒙特利尔", lat: 45.5017, lng: -73.5673, country: "加拿大" },
    { name: "多伦多", lat: 43.6532, lng: -79.3832, country: "加拿大" },
    { name: "温哥华", lat: 49.2827, lng: -123.1207, country: "加拿大" },
    { name: "卡尔加里", lat: 51.0447, lng: -114.0719, country: "加拿大" },
    { name: "魁北克城", lat: 46.8139, lng: -71.2080, country: "加拿大" },
    { name: "墨西哥城", lat: 19.4326, lng: -99.1332, country: "墨西哥" },
    { name: "坎昆", lat: 21.1619, lng: -86.8515, country: "墨西哥" },
    
    // 南美城市
    { name: "里约热内卢", lat: -22.9068, lng: -43.1729, country: "巴西" },
    { name: "圣保罗", lat: -23.5505, lng: -46.6333, country: "巴西" },
    { name: "布宜诺斯艾利斯", lat: -34.6037, lng: -58.3816, country: "阿根廷" },
    { name: "伊瓜苏", lat: -25.6953, lng: -54.4367, country: "阿根廷" },
    { name: "圣地亚哥", lat: -33.4489, lng: -70.6693, country: "智利" },
    { name: "利马", lat: -12.0464, lng: -77.0428, country: "秘鲁" },
    { name: "马丘比丘", lat: -13.1631, lng: -72.5450, country: "秘鲁" },
    { name: "库斯科", lat: -13.5320, lng: -71.9675, country: "秘鲁" },
    { name: "波哥大", lat: 4.7110, lng: -74.0721, country: "哥伦比亚" },
    { name: "加拉加斯", lat: 10.4806, lng: -66.9036, country: "委内瑞拉" },
    
    // 大洋洲城市
    { name: "悉尼", lat: -33.8688, lng: 151.2093, country: "澳大利亚" },
    { name: "墨尔本", lat: -37.8136, lng: 144.9631, country: "澳大利亚" },
    { name: "布里斯班", lat: -27.4698, lng: 153.0251, country: "澳大利亚" },
    { name: "珀斯", lat: -31.9505, lng: 115.8605, country: "澳大利亚" },
    { name: "阿德莱德", lat: -34.9285, lng: 138.6007, country: "澳大利亚" },
    { name: "凯恩斯", lat: -16.9186, lng: 145.7781, country: "澳大利亚" },
    { name: "黄金海岸", lat: -28.0167, lng: 153.4000, country: "澳大利亚" },
    { name: "奥克兰", lat: -36.8485, lng: 174.7633, country: "新西兰" },
    { name: "皇后镇", lat: -45.0312, lng: 168.6626, country: "新西兰" },
    { name: "惠灵顿", lat: -41.2865, lng: 174.7762, country: "新西兰" },
    
    // 非洲城市
    { name: "开罗", lat: 30.0444, lng: 31.2357, country: "埃及" },
    { name: "亚历山大", lat: 31.2001, lng: 29.9187, country: "埃及" },
    { name: "撒哈拉沙漠", lat: 23.4162, lng: 25.6628, country: "埃及" },
    { name: "开普敦", lat: -33.9249, lng: 18.4241, country: "南非" },
    { name: "约翰内斯堡", lat: -26.2041, lng: 28.0473, country: "南非" },
    { name: "内罗毕", lat: -1.2921, lng: 36.8219, country: "肯尼亚" },
    { name: "摩洛哥", lat: 31.7917, lng: -7.0926, country: "摩洛哥" },
    { name: "马拉喀什", lat: 31.6295, lng: -7.9811, country: "摩洛哥" },
    { name: "突尼斯", lat: 36.8065, lng: 10.1815, country: "突尼斯" },
    { name: "毛里求斯", lat: -20.3484, lng: 57.5522, country: "毛里求斯" },
    { name: "塞舌尔", lat: -4.6796, lng: 55.4920, country: "塞舌尔" },
    { name: "坦桑尼亚", lat: -6.3690, lng: 34.8888, country: "坦桑尼亚" }
];

const defaultThings = [
    "一起看日落",
    "一起看电影",
    "一起做饭",
    "一起去旅行",
    "一起看星星",
    "一起逛超市",
    "一起拍大头贴",
    "一起养宠物",
    "一起看日出",
    "一起放风筝",
    "一起去看海",
    "一起去爬山",
    "一起去露营",
    "一起去看演唱会",
    "一起去博物馆",
    "一起去游乐园",
    "一起去图书馆",
    "一起去健身房",
    "一起去看展览",
    "一起去看球赛",
    "一起去钓鱼",
    "一起去采摘",
    "一起去泡温泉",
    "一起去滑雪",
    "一起去冲浪",
    "一起去潜水",
    "一起去跳伞",
    "一起去蹦极",
    "一起去漂流",
    "一起去骑行",
    "一起去跑步",
    "一起去瑜伽",
    "一起去跳舞",
    "一起去唱歌",
    "一起去画画",
    "一起去做陶艺",
    "一起去做手工",
    "一起去做烘焙",
    "一起去做咖啡",
    "一起去做调酒",
    "一起去做SPA",
    "一起去做按摩",
    "一起去做美甲",
    "一起去做美发",
    "一起去做美容",
    "一起去买衣服",
    "一起去买鞋子",
    "一起去买包包",
    "一起去买首饰",
    "一起去买家具",
    "一起去买家电",
    "一起去买绿植",
    "一起去买宠物用品",
    "一起去买菜",
    "一起去买水果",
    "一起去买零食",
    "一起去买饮料",
    "一起去买蛋糕",
    "一起去买鲜花",
    "一起去买礼物",
    "一起写情书",
    "一起写日记",
    "一起拍视频",
    "一起拍照片",
    "一起做相册",
    "一起做视频剪辑",
    "一起做计划",
    "一起做预算",
    "一起做理财",
    "一起做牙齿护理",
    "一起做眼睛检查",
    "一起做皮肤护理",
    "一起做足疗",
    "一起做泰式按摩",
    "一起做热石按摩",
    "一起做拔罐",
    "一起做刮痧",
    "一起做艾灸",
    "一起做推拿",
    "一起做汗蒸",
    "一起做桑拿",
    "一起做水疗",
    "一起吃火锅",
    "一起吃烧烤",
    "一起吃日料",
    "一起吃西餐",
    "一起吃甜品",
    "一起吃早餐",
    "一起吃夜宵",
    "一起洗碗",
    "一起打扫房间",
    "一起整理衣柜",
    "一起看剧",
    "一起玩游戏",
    "一起做手模",
    "一起喂小动物",
    "一起坐摩天轮",
    "一起滑雪橇",
    "一起做饼干",
    "一起织毛衣"
];

function init() {
    // 只在第一次加载或数据不存在时初始化100件事
    if (!things || things.length !== 100) {
        things = defaultThings.map((text, index) => ({
            id: index + 1,
            text: text,
            completed: false
        }));
        saveThings();
    }
    
    renderPlaces();
    renderThings();
    renderSummary();
    setupTabs();
    setupEnterKeys();
}

function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
    
    if (tabName === 'places') {
        setTimeout(initMap, 100);
    }
}

function setupEnterKeys() {
    document.getElementById('place-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchPlace();
    });
}

function searchPlace() {
    const input = document.getElementById('place-input');
    const searchBtn = document.getElementById('search-btn');
    const resultDiv = document.getElementById('search-result');
    const text = input.value.trim();
    
    if (!text) return;
    
    searchBtn.disabled = true;
    searchBtn.textContent = '搜索中...';
    resultDiv.style.display = 'none';
    
    // 使用内置数据库搜索
    const searchText = text.toLowerCase();
    const results = citiesDatabase.filter(city => 
        city.name.toLowerCase().includes(searchText) ||
        city.country.toLowerCase().includes(searchText)
    );
    
    if (results.length === 0) {
        resultDiv.innerHTML = '<div style="text-align: center; color: #888; padding: 20px;">未找到相关城市，请尝试其他关键词<br><small style="color: #aaa;">如：北京、上海、东京、巴黎、纽约...</small></div>';
        resultDiv.style.display = 'block';
    } else {
        resultDiv.innerHTML = results.slice(0, 8).map(r => `
            <div class="search-result-item">
                <div class="item-content" onclick="selectPlace('${r.name}', ${r.lat}, ${r.lng})">
                    <div class="name">${r.name}</div>
                    <div class="detail">${r.country}</div>
                </div>
                <button class="add-city-btn" onclick="addCityFromSearch('${r.name}', ${r.lat}, ${r.lng}, event)">+ 添加</button>
            </div>
        `).join('');
        resultDiv.style.display = 'block';
    }
    
    searchBtn.disabled = false;
    searchBtn.textContent = '🔍 搜索';
}

function selectPlace(name, lat, lng) {
    const input = document.getElementById('place-input');
    const resultDiv = document.getElementById('search-result');
    
    input.value = name;
    resultDiv.style.display = 'none';
    
    // 将地图中心移动到选择的位置
    if (map) {
        map.setView([lat, lng], 10);
    }
}

function addPlace() {
    const input = document.getElementById('place-input');
    const text = input.value.trim();
    
    if (!text) {
        alert('请先搜索并选择城市');
        return;
    }
    
    // 查找城市数据
    const cityData = citiesDatabase.find(city => city.name === text);
    
    if (!cityData) {
        alert('请从搜索结果中选择城市，不要手动输入');
        return;
    }
    
    // 检查是否已添加
    if (places.some(p => p.text === cityData.name)) {
        alert('这个城市已经添加过了！');
        return;
    }
    
    places.push({
        id: Date.now(),
        text: cityData.name,
        lat: cityData.lat,
        lng: cityData.lng,
        country: cityData.country,
        date: new Date().toLocaleDateString('zh-CN')
    });
    
    savePlaces();
    renderPlaces();
    renderSummary();
    input.value = '';
    
    // 创建爱心特效
    const event = { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 };
    createHeartParticles(event);
}

function addCityFromSearch(name, lat, lng, event) {
    event.stopPropagation();
    
    // 检查是否已添加
    if (places.some(p => p.text === name)) {
        alert('这个城市已经添加过了！');
        return;
    }
    
    // 查找城市数据
    const cityData = citiesDatabase.find(city => city.name === name);
    
    places.push({
        id: Date.now(),
        text: name,
        lat: lat,
        lng: lng,
        country: cityData ? cityData.country : '',
        date: new Date().toLocaleDateString('zh-CN')
    });
    
    savePlaces();
    renderPlaces();
    renderSummary();
    
    // 将地图中心移动到该城市
    if (map) {
        map.setView([lat, lng], 10);
    }
    
    // 创建爱心特效
    const heartEvent = { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 };
    createHeartParticles(heartEvent);
    
    alert('💕 成功添加 ' + name + '！');
}

function deletePlace(id) {
    places = places.filter(p => p.id !== id);
    savePlaces();
    renderPlaces();
    renderSummary();
}

function toggleThing(id, event) {
    const thing = things.find(t => t.id === id);
    if (thing) {
        thing.completed = !thing.completed;
        saveThings();
        renderThings();
        renderSummary();
        if (thing.completed) {
            createHeartParticles(event);
        }
    }
}

function savePlaces() {
    localStorage.setItem('couplePlaces', JSON.stringify(places));
}

function saveThings() {
    localStorage.setItem('coupleThings', JSON.stringify(things));
}

function renderPlaces() {
    const showcase = document.getElementById('places-showcase');
    
    if (places.length === 0) {
        showcase.innerHTML = `
            <div class="empty-state">
                <div class="emoji">🗺️</div>
                <p>还没有记录去过的地方<br>开始你们的旅程吧！</p>
            </div>
        `;
    } else {
        showcase.innerHTML = `
            <h3>📍 我们去过的地方</h3>
            <div class="places-list">
                ${places.map(place => `
                    <div class="place-tag">
                        <span class="heart-icon">❤️</span>
                        <span>${escapeHtml(place.text)}</span>
                        <span class="delete-icon" onclick="deletePlace(${place.id})">✕</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    initMap();
}

function renderThings() {
    const grid = document.getElementById('things-grid');
    
    grid.innerHTML = things.map(thing => `
        <div class="thing-card ${thing.completed ? 'completed' : ''}" onclick="toggleThing(${thing.id}, event)">
            <div class="thing-number">${thing.id}</div>
            <div class="thing-text">${escapeHtml(thing.text)}</div>
            <div class="thing-check">✓</div>
        </div>
    `).join('');
}

function renderSummary() {
    const statsDiv = document.getElementById('summary-stats');
    const placesDiv = document.getElementById('summary-places');
    const thingsDiv = document.getElementById('summary-things');
    
    const completedThings = things.filter(t => t.completed);
    
    statsDiv.innerHTML = `
        <div class="stat-card">
            <div class="stat-number">${places.length}</div>
            <div class="stat-label">已打卡地点</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${completedThings.length}/100</div>
            <div class="stat-label">已完成事情</div>
        </div>
    `;
    
    if (places.length === 0) {
        placesDiv.innerHTML = `<div class="empty-state"><p>还没有打卡任何地点</p></div>`;
    } else {
        placesDiv.innerHTML = `
            <div class="summary-list">
                ${places.map(p => `<div class="summary-item">${escapeHtml(p.text)}</div>`).join('')}
            </div>
        `;
    }
    
    if (completedThings.length === 0) {
        thingsDiv.innerHTML = `<div class="empty-state"><p>还没有完成任何事情</p></div>`;
    } else {
        thingsDiv.innerHTML = `
            <div class="summary-list">
                ${completedThings.map(t => `<div class="summary-item">${escapeHtml(t.text)}</div>`).join('')}
            </div>
        `;
    }
}

function initMap() {
    if (map) {
        map.remove();
    }
    
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    
    map = L.map('map', {
        center: [35, 105],
        zoom: 6,
        minZoom: 3,
        maxZoom: 14,
        zoomControl: true,
        scrollWheelZoom: true
    });
    
    // 中文地图 - 高德地图（标准中文标注，显示市级别地名）
    const amapLayer = L.tileLayer('https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', {
        attribution: '&copy; <a href="https://www.amap.com">高德地图</a>',
        subdomains: '1234',
        maxZoom: 18
    });
    
    // 高德地图详细版（更多标注）
    const amapDetailedLayer = L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
        attribution: '&copy; <a href="https://www.amap.com">高德地图</a>',
        subdomains: '1234',
        maxZoom: 18
    });
    
    // 英文卡通风格地图
    const streetsLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    });
    
    // 水彩风格
    const watercolorLayer = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>',
        maxZoom: 16
    });
    
    // 默认为中文详细地图
    amapDetailedLayer.addTo(map);
    
    // 添加图层切换控件
    const baseMaps = {
        "🗺️ 中文详细": amapDetailedLayer,
        "🗺️ 中文标准": amapLayer,
        "🎨 卡通风格": streetsLayer,
        "💧 水彩风格": watercolorLayer
    };
    
    L.control.layers(baseMaps).addTo(map);
    
    updateMapMarkers();
}

function updateMapMarkers() {
    if (!map) return;
    
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    const validPlaces = places.filter(p => typeof p.lat === 'number' && typeof p.lng === 'number');
    
    validPlaces.forEach(place => {
        const icon = L.divIcon({
            html: `
                <div style="
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                ">
                    <div style="
                        background: linear-gradient(135deg, #ff6b9d 0%, #c44569 50%, #ff9a9e 100%);
                        width: 42px;
                        height: 42px;
                        border-radius: 50% 50% 50% 0;
                        transform: rotate(-45deg);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0 4px 15px rgba(196, 69, 105, 0.6), inset 0 2px 10px rgba(255, 255, 255, 0.3);
                        border: 3px solid rgba(255, 255, 255, 0.8);
                        animation: heartBeat 1.5s ease-in-out infinite;
                    ">
                        <span style="
                            transform: rotate(45deg);
                            font-size: 22px;
                            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
                        ">💕</span>
                    </div>
                </div>
            `,
            className: 'heart-marker',
            iconSize: [42, 42],
            iconAnchor: [21, 42]
        });
        
        try {
            const marker = L.marker([place.lat, place.lng], { 
                icon: icon,
                title: place.text
            }).addTo(map);
            marker.bindPopup(`
                <div style="
                    text-align: center;
                    padding: 10px;
                    font-family: 'Microsoft YaHei', sans-serif;
                ">
                    <div style="font-size: 24px; margin-bottom: 8px;">💕</div>
                    <div style="
                        font-size: 16px;
                        font-weight: bold;
                        color: #c44569;
                        margin-bottom: 5px;
                    ">${escapeHtml(place.text)}</div>
                    <div style="
                        font-size: 12px;
                        color: #888;
                    ">坐标: ${place.lat.toFixed(4)}, ${place.lng.toFixed(4)}</div>
                </div>
            `, {
                className: 'custom-popup'
            });
            markers.push(marker);
        } catch (e) {
            console.error('Error adding marker:', e);
        }
    });
    
    if (validPlaces.length > 0) {
        try {
            const bounds = L.latLngBounds(validPlaces.map(p => [p.lat, p.lng]));
            map.fitBounds(bounds, { padding: [80, 80] });
        } catch (e) {
            console.error('Error fitting bounds:', e);
        }
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function createHeartParticles(event) {
    const container = document.createElement('div');
    container.className = 'heart-particles';
    document.body.appendChild(container);
    
    const hearts = ['💕', '💖', '💗', '💓', '❤️', '💝'];
    
    const clientX = event?.clientX || window.innerWidth / 2;
    const clientY = event?.clientY || window.innerHeight / 2;
    
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = clientX + (Math.random() - 0.5) * 150 + 'px';
        heart.style.top = clientY + 'px';
        heart.style.animationDelay = Math.random() * 0.3 + 's';
        container.appendChild(heart);
    }
    
    setTimeout(() => {
        container.remove();
    }, 1500);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.15);
        }
    }
`;
document.head.appendChild(style);

init();
