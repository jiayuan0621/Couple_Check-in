let places = JSON.parse(localStorage.getItem('couplePlaces')) || [];
let things = JSON.parse(localStorage.getItem('coupleThings')) || null;
let map = null;
let markers = [];

// 全球主要城市经纬度数据库
const citiesDatabase = [
    // 中国城市 - 包含所有省份主要城市
    // 华北地区
    { name: "北京", lat: 39.9042, lng: 116.4074, country: "中国" },
    { name: "天津", lat: 39.3434, lng: 117.3616, country: "中国" },
    { name: "石家庄", lat: 38.0428, lng: 114.5149, country: "中国" },
    { name: "唐山", lat: 39.6306, lng: 118.1802, country: "中国" },
    { name: "秦皇岛", lat: 39.9354, lng: 119.5977, country: "中国" },
    { name: "保定", lat: 38.8738, lng: 115.4646, country: "中国" },
    { name: "邯郸", lat: 36.6258, lng: 114.5391, country: "中国" },
    { name: "张家口", lat: 40.7677, lng: 114.8863, country: "中国" },
    { name: "承德", lat: 40.9512, lng: 117.9638, country: "中国" },
    { name: "沧州", lat: 38.3037, lng: 116.8387, country: "中国" },
    { name: "廊坊", lat: 39.5380, lng: 116.6837, country: "中国" },
    
    // 东北地区
    { name: "沈阳", lat: 41.8056, lng: 123.4328, country: "中国" },
    { name: "大连", lat: 38.9140, lng: 121.6147, country: "中国" },
    { name: "哈尔滨", lat: 45.8038, lng: 126.5340, country: "中国" },
    { name: "长春", lat: 43.8171, lng: 125.3235, country: "中国" },
    { name: "吉林", lat: 43.8377, lng: 126.5494, country: "中国" },
    { name: "鞍山", lat: 41.1086, lng: 122.9956, country: "中国" },
    { name: "抚顺", lat: 41.8807, lng: 123.9573, country: "中国" },
    { name: "齐齐哈尔", lat: 47.3543, lng: 123.9180, country: "中国" },
    { name: "大庆", lat: 46.5907, lng: 125.1039, country: "中国" },
    { name: "牡丹江", lat: 44.5512, lng: 129.6329, country: "中国" },
    { name: "葫芦岛", lat: 40.7106, lng: 120.8374, country: "中国" },
    
    // 西北地区
    { name: "西安", lat: 34.3416, lng: 108.9398, country: "中国" },
    { name: "兰州", lat: 36.0611, lng: 103.8343, country: "中国" },
    { name: "乌鲁木齐", lat: 43.8256, lng: 87.6168, country: "中国" },
    { name: "银川", lat: 38.4872, lng: 106.2309, country: "中国" },
    { name: "西宁", lat: 36.6171, lng: 101.7782, country: "中国" },
    { name: "咸阳", lat: 34.3296, lng: 108.7091, country: "中国" },
    { name: "宝鸡", lat: 34.3619, lng: 107.2372, country: "中国" },
    { name: "延安", lat: 36.5853, lng: 109.4898, country: "中国" },
    { name: "榆林", lat: 38.2852, lng: 109.7348, country: "中国" },
    { name: "天水", lat: 34.5809, lng: 105.7244, country: "中国" },
    { name: "酒泉", lat: 39.7326, lng: 98.4943, country: "中国" },
    { name: "张掖", lat: 38.9260, lng: 100.4491, country: "中国" },
    { name: "敦煌", lat: 40.1421, lng: 94.6618, country: "中国" },
    { name: "克拉玛依", lat: 45.5798, lng: 84.8892, country: "中国" },
    { name: "喀什", lat: 39.4677, lng: 75.9897, country: "中国" },
    
    // 华东地区
    { name: "上海", lat: 31.2304, lng: 121.4737, country: "中国" },
    { name: "南京", lat: 32.0603, lng: 118.7969, country: "中国" },
    { name: "杭州", lat: 30.2741, lng: 120.1551, country: "中国" },
    { name: "苏州", lat: 31.2989, lng: 120.5853, country: "中国" },
    { name: "无锡", lat: 31.4912, lng: 120.3119, country: "中国" },
    { name: "扬州", lat: 32.3932, lng: 119.4126, country: "中国" },
    { name: "常州", lat: 31.7728, lng: 119.9461, country: "中国" },
    { name: "南通", lat: 31.9807, lng: 120.8942, country: "中国" },
    { name: "徐州", lat: 34.2044, lng: 117.2859, country: "中国" },
    { name: "镇江", lat: 32.1880, lng: 119.4550, country: "中国" },
    { name: "盐城", lat: 33.3496, lng: 120.1633, country: "中国" },
    { name: "淮安", lat: 33.5517, lng: 119.0153, country: "中国" },
    { name: "泰州", lat: 32.4560, lng: 119.9230, country: "中国" },
    { name: "连云港", lat: 34.5967, lng: 119.2220, country: "中国" },
    { name: "宿迁", lat: 33.9633, lng: 118.2756, country: "中国" },
    { name: "宁波", lat: 29.8683, lng: 121.5440, country: "中国" },
    { name: "温州", lat: 28.0006, lng: 120.6994, country: "中国" },
    { name: "嘉兴", lat: 30.7522, lng: 120.7551, country: "中国" },
    { name: "湖州", lat: 30.8928, lng: 120.0930, country: "中国" },
    { name: "绍兴", lat: 30.0304, lng: 120.5801, country: "中国" },
    { name: "金华", lat: 29.0789, lng: 119.6479, country: "中国" },
    { name: "衢州", lat: 28.9355, lng: 118.8740, country: "中国" },
    { name: "舟山", lat: 29.9853, lng: 122.1073, country: "中国" },
    { name: "台州", lat: 28.6565, lng: 121.4209, country: "中国" },
    { name: "丽水", lat: 28.4677, lng: 119.9229, country: "中国" },
    { name: "合肥", lat: 31.8206, lng: 117.2272, country: "中国" },
    { name: "芜湖", lat: 31.3350, lng: 118.4330, country: "中国" },
    { name: "蚌埠", lat: 32.9169, lng: 117.3888, country: "中国" },
    { name: "淮南", lat: 32.6259, lng: 116.9997, country: "中国" },
    { name: "马鞍山", lat: 31.6702, lng: 118.5076, country: "中国" },
    { name: "安庆", lat: 30.5429, lng: 117.0634, country: "中国" },
    { name: "黄山", lat: 29.7145, lng: 118.3376, country: "中国" },
    { name: "滁州", lat: 32.3017, lng: 118.3173, country: "中国" },
    { name: "阜阳", lat: 32.8908, lng: 115.8142, country: "中国" },
    { name: "宿州", lat: 33.6460, lng: 116.9638, country: "中国" },
    { name: "六安", lat: 31.7348, lng: 116.5088, country: "中国" },
    { name: "宣城", lat: 30.9407, lng: 118.7584, country: "中国" },
    { name: "池州", lat: 30.6643, lng: 117.4916, country: "中国" },
    { name: "福州", lat: 26.0745, lng: 119.2965, country: "中国" },
    { name: "厦门", lat: 24.4798, lng: 118.0894, country: "中国" },
    { name: "泉州", lat: 24.8741, lng: 118.6756, country: "中国" },
    { name: "漳州", lat: 24.5093, lng: 117.6471, country: "中国" },
    { name: "莆田", lat: 25.4540, lng: 119.0078, country: "中国" },
    { name: "宁德", lat: 26.6656, lng: 119.5477, country: "中国" },
    { name: "三明", lat: 26.2654, lng: 117.6389, country: "中国" },
    { name: "南平", lat: 26.6416, lng: 118.1779, country: "中国" },
    { name: "龙岩", lat: 25.0751, lng: 117.0173, country: "中国" },
    { name: "南昌", lat: 28.6829, lng: 115.8579, country: "中国" },
    { name: "景德镇", lat: 29.2686, lng: 117.1786, country: "中国" },
    { name: "九江", lat: 29.7049, lng: 116.0016, country: "中国" },
    { name: "赣州", lat: 25.8452, lng: 114.9332, country: "中国" },
    { name: "吉安", lat: 27.1117, lng: 114.9930, country: "中国" },
    { name: "宜春", lat: 27.8136, lng: 114.4163, country: "中国" },
    { name: "抚州", lat: 27.9543, lng: 116.3582, country: "中国" },
    { name: "上饶", lat: 28.4558, lng: 117.9433, country: "中国" },
    { name: "萍乡", lat: 27.6229, lng: 113.8544, country: "中国" },
    { name: "新余", lat: 27.8179, lng: 114.9170, country: "中国" },
    { name: "鹰潭", lat: 28.2602, lng: 117.0694, country: "中国" },
    { name: "济南", lat: 36.6512, lng: 117.1205, country: "中国" },
    { name: "青岛", lat: 36.0671, lng: 120.3826, country: "中国" },
    { name: "烟台", lat: 37.5365, lng: 121.3914, country: "中国" },
    { name: "威海", lat: 37.5131, lng: 122.1205, country: "中国" },
    { name: "潍坊", lat: 36.7068, lng: 119.1619, country: "中国" },
    { name: "淄博", lat: 36.8130, lng: 118.0548, country: "中国" },
    { name: "临沂", lat: 35.1041, lng: 118.3566, country: "中国" },
    { name: "济宁", lat: 35.4147, lng: 116.5871, country: "中国" },
    { name: "泰安", lat: 36.1950, lng: 117.0881, country: "中国" },
    { name: "德州", lat: 37.4356, lng: 116.3575, country: "中国" },
    { name: "聊城", lat: 36.4569, lng: 115.9854, country: "中国" },
    { name: "滨州", lat: 37.3816, lng: 118.0193, country: "中国" },
    { name: "菏泽", lat: 35.2334, lng: 115.4809, country: "中国" },
    { name: "枣庄", lat: 34.8107, lng: 117.3239, country: "中国" },
    { name: "日照", lat: 35.4164, lng: 119.5269, country: "中国" },
    { name: "东营", lat: 37.4346, lng: 118.6749, country: "中国" },
    { name: "莱芜", lat: 36.2144, lng: 117.6766, country: "中国" },
    
    // 华中地区
    { name: "郑州", lat: 34.7466, lng: 113.6253, country: "中国" },
    { name: "洛阳", lat: 34.6197, lng: 112.4540, country: "中国" },
    { name: "开封", lat: 34.7971, lng: 114.3074, country: "中国" },
    { name: "南阳", lat: 32.9908, lng: 112.5283, country: "中国" },
    { name: "安阳", lat: 36.0969, lng: 114.3929, country: "中国" },
    { name: "新乡", lat: 35.3026, lng: 113.9268, country: "中国" },
    { name: "焦作", lat: 35.2159, lng: 113.2420, country: "中国" },
    { name: "平顶山", lat: 33.7661, lng: 113.1925, country: "中国" },
    { name: "许昌", lat: 34.0357, lng: 113.8526, country: "中国" },
    { name: "商丘", lat: 34.4143, lng: 115.6564, country: "中国" },
    { name: "周口", lat: 33.6237, lng: 114.6419, country: "中国" },
    { name: "信阳", lat: 32.1285, lng: 114.0913, country: "中国" },
    { name: "驻马店", lat: 32.9802, lng: 114.0246, country: "中国" },
    { name: "三门峡", lat: 34.7726, lng: 111.2001, country: "中国" },
    { name: "鹤壁", lat: 35.7478, lng: 114.2972, country: "中国" },
    { name: "濮阳", lat: 35.7548, lng: 115.0288, country: "中国" },
    { name: "漯河", lat: 33.5814, lng: 114.0166, country: "中国" },
    { name: "武汉", lat: 30.5928, lng: 114.3055, country: "中国" },
    { name: "宜昌", lat: 30.6918, lng: 111.2868, country: "中国" },
    { name: "襄阳", lat: 32.0091, lng: 112.1226, country: "中国" },
    { name: "荆州", lat: 30.3269, lng: 112.2395, country: "中国" },
    { name: "黄石", lat: 30.2016, lng: 115.0389, country: "中国" },
    { name: "十堰", lat: 32.6293, lng: 110.7980, country: "中国" },
    { name: "孝感", lat: 30.9279, lng: 113.9268, country: "中国" },
    { name: "荆门", lat: 31.0354, lng: 112.1997, country: "中国" },
    { name: "咸宁", lat: 29.8787, lng: 114.3224, country: "中国" },
    { name: "随州", lat: 31.6902, lng: 113.3819, country: "中国" },
    { name: "鄂州", lat: 30.3906, lng: 114.8946, country: "中国" },
    { name: "黄冈", lat: 30.4534, lng: 114.8725, country: "中国" },
    { name: "恩施", lat: 30.2720, lng: 109.4880, country: "中国" },
    { name: "长沙", lat: 28.2282, lng: 112.9388, country: "中国" },
    { name: "岳阳", lat: 29.3570, lng: 113.1286, country: "中国" },
    { name: "株洲", lat: 27.8274, lng: 113.1340, country: "中国" },
    { name: "湘潭", lat: 27.8291, lng: 112.9442, country: "中国" },
    { name: "衡阳", lat: 26.8933, lng: 112.5720, country: "中国" },
    { name: "邵阳", lat: 27.2389, lng: 111.4674, country: "中国" },
    { name: "常德", lat: 29.0319, lng: 111.6985, country: "中国" },
    { name: "张家界", lat: 29.1173, lng: 110.4792, country: "中国" },
    { name: "益阳", lat: 28.5539, lng: 112.3550, country: "中国" },
    { name: "郴州", lat: 25.7704, lng: 113.0149, country: "中国" },
    { name: "永州", lat: 26.4341, lng: 111.6131, country: "中国" },
    { name: "怀化", lat: 27.5494, lng: 109.9772, country: "中国" },
    { name: "娄底", lat: 27.6982, lng: 111.9931, country: "中国" },
    { name: "湘西", lat: 28.3117, lng: 109.7390, country: "中国" },
    
    // 华南地区
    { name: "广州", lat: 23.1291, lng: 113.2644, country: "中国" },
    { name: "深圳", lat: 22.5431, lng: 114.0579, country: "中国" },
    { name: "珠海", lat: 22.2710, lng: 113.5767, country: "中国" },
    { name: "东莞", lat: 23.0489, lng: 113.7447, country: "中国" },
    { name: "佛山", lat: 23.0218, lng: 113.1219, country: "中国" },
    { name: "中山", lat: 22.5176, lng: 113.3926, country: "中国" },
    { name: "惠州", lat: 23.1115, lng: 114.4163, country: "中国" },
    { name: "江门", lat: 22.5789, lng: 113.0815, country: "中国" },
    { name: "汕头", lat: 23.3540, lng: 116.6820, country: "中国" },
    { name: "湛江", lat: 21.2707, lng: 110.3594, country: "中国" },
    { name: "茂名", lat: 21.6629, lng: 110.9253, country: "中国" },
    { name: "肇庆", lat: 23.0469, lng: 112.4654, country: "中国" },
    { name: "梅州", lat: 24.2883, lng: 116.1224, country: "中国" },
    { name: "清远", lat: 23.6820, lng: 113.0510, country: "中国" },
    { name: "韶关", lat: 24.8108, lng: 113.5975, country: "中国" },
    { name: "揭阳", lat: 23.5499, lng: 116.3729, country: "中国" },
    { name: "阳江", lat: 21.8579, lng: 111.9825, country: "中国" },
    { name: "潮州", lat: 23.6567, lng: 116.6223, country: "中国" },
    { name: "河源", lat: 23.7462, lng: 114.7006, country: "中国" },
    { name: "汕尾", lat: 22.7861, lng: 115.3644, country: "中国" },
    { name: "云浮", lat: 22.9293, lng: 112.0444, country: "中国" },
    { name: "南宁", lat: 22.8170, lng: 108.3665, country: "中国" },
    { name: "桂林", lat: 25.2736, lng: 110.2900, country: "中国" },
    { name: "北海", lat: 21.4734, lng: 109.1193, country: "中国" },
    { name: "柳州", lat: 24.3263, lng: 109.4285, country: "中国" },
    { name: "梧州", lat: 23.4769, lng: 111.2791, country: "中国" },
    { name: "防城港", lat: 21.6875, lng: 108.3541, country: "中国" },
    { name: "钦州", lat: 21.9818, lng: 108.6543, country: "中国" },
    { name: "贵港", lat: 23.1113, lng: 109.5986, country: "中国" },
    { name: "玉林", lat: 22.6540, lng: 110.1811, country: "中国" },
    { name: "百色", lat: 23.9027, lng: 106.6181, country: "中国" },
    { name: "河池", lat: 24.6928, lng: 108.0853, country: "中国" },
    { name: "来宾", lat: 23.7516, lng: 109.2216, country: "中国" },
    { name: "贺州", lat: 24.4033, lng: 111.5669, country: "中国" },
    { name: "崇左", lat: 22.3768, lng: 107.3641, country: "中国" },
    { name: "三亚", lat: 18.2528, lng: 109.5117, country: "中国" },
    { name: "海口", lat: 20.0444, lng: 110.1999, country: "中国" },
    { name: "文昌", lat: 19.5431, lng: 110.7540, country: "中国" },
    { name: "琼海", lat: 19.2580, lng: 110.4748, country: "中国" },
    { name: "万宁", lat: 18.7959, lng: 110.3890, country: "中国" },
    { name: "五指山", lat: 18.7772, lng: 109.5169, country: "中国" },
    
    // 西南地区
    { name: "重庆", lat: 29.4316, lng: 106.9123, country: "中国" },
    { name: "成都", lat: 30.5728, lng: 104.0668, country: "中国" },
    { name: "昆明", lat: 25.0406, lng: 102.7129, country: "中国" },
    { name: "大理", lat: 25.6069, lng: 100.2676, country: "中国" },
    { name: "丽江", lat: 26.8721, lng: 100.2330, country: "中国" },
    { name: "贵阳", lat: 26.6470, lng: 106.6302, country: "中国" },
    { name: "遵义", lat: 27.7256, lng: 106.9272, country: "中国" },
    { name: "六盘水", lat: 26.5941, lng: 104.8301, country: "中国" },
    { name: "安顺", lat: 26.2456, lng: 105.9322, country: "中国" },
    { name: "毕节", lat: 27.3017, lng: 105.2850, country: "中国" },
    { name: "铜仁", lat: 27.7184, lng: 109.1912, country: "中国" },
    { name: "黔西南", lat: 25.0880, lng: 104.9064, country: "中国" },
    { name: "黔东南", lat: 26.5839, lng: 107.9850, country: "中国" },
    { name: "黔南", lat: 26.2582, lng: 107.5230, country: "中国" },
    { name: "曲靖", lat: 25.4900, lng: 103.7962, country: "中国" },
    { name: "玉溪", lat: 24.3518, lng: 102.5458, country: "中国" },
    { name: "保山", lat: 25.1120, lng: 99.1671, country: "中国" },
    { name: "昭通", lat: 27.3436, lng: 103.7172, country: "中国" },
    { name: "普洱", lat: 22.8254, lng: 100.9660, country: "中国" },
    { name: "临沧", lat: 23.8866, lng: 100.0870, country: "中国" },
    { name: "楚雄", lat: 25.0321, lng: 101.5280, country: "中国" },
    { name: "红河", lat: 23.3640, lng: 103.3841, country: "中国" },
    { name: "文山", lat: 23.3696, lng: 104.2447, country: "中国" },
    { name: "西双版纳", lat: 22.0076, lng: 100.7975, country: "中国" },
    { name: "德宏", lat: 24.4367, lng: 98.5784, country: "中国" },
    { name: "怒江", lat: 25.8173, lng: 98.8546, country: "中国" },
    { name: "迪庆", lat: 27.8190, lng: 99.7064, country: "中国" },
    { name: "拉萨", lat: 29.6500, lng: 91.1000, country: "中国" },
    { name: "日喀则", lat: 29.2675, lng: 88.8808, country: "中国" },
    { name: "林芝", lat: 29.6486, lng: 94.3624, country: "中国" },
    { name: "昌都", lat: 31.1369, lng: 97.1785, country: "中国" },
    { name: "山南", lat: 29.2360, lng: 91.7665, country: "中国" },
    { name: "那曲", lat: 31.4766, lng: 92.0517, country: "中国" },
    { name: "阿里", lat: 32.5010, lng: 80.1054, country: "中国" },
    
    // 内蒙古
    { name: "呼和浩特", lat: 40.8424, lng: 111.7491, country: "中国" },
    { name: "包头", lat: 40.6562, lng: 109.8403, country: "中国" },
    { name: "鄂尔多斯", lat: 39.6086, lng: 109.7813, country: "中国" },
    { name: "赤峰", lat: 42.2578, lng: 118.8867, country: "中国" },
    { name: "通辽", lat: 43.6174, lng: 122.2430, country: "中国" },
    { name: "呼伦贝尔", lat: 49.2122, lng: 119.7657, country: "中国" },
    { name: "巴彦淖尔", lat: 40.7430, lng: 107.3877, country: "中国" },
    { name: "乌兰察布", lat: 40.9945, lng: 113.1327, country: "中国" },
    { name: "兴安盟", lat: 46.0769, lng: 122.0378, country: "中国" },
    { name: "锡林郭勒", lat: 43.9333, lng: 116.0503, country: "中国" },
    { name: "阿拉善", lat: 38.8312, lng: 105.7286, country: "中国" },
    { name: "乌海", lat: 39.6550, lng: 106.7948, country: "中国" },
    
    // 港澳台
    { name: "香港", lat: 22.3193, lng: 114.1694, country: "中国" },
    { name: "澳门", lat: 22.1987, lng: 113.5439, country: "中国" },
    { name: "台北", lat: 25.0330, lng: 121.5654, country: "中国" },
    { name: "高雄", lat: 22.6273, lng: 120.3014, country: "中国" },
    { name: "台中", lat: 24.1477, lng: 120.6736, country: "中国" },
    { name: "台南", lat: 22.9998, lng: 120.2269, country: "中国" },
    { name: "新北", lat: 25.0122, lng: 121.4657, country: "中国" },
    { name: "桃园", lat: 24.9936, lng: 121.3010, country: "中国" },
    { name: "基隆", lat: 25.1283, lng: 121.7419, country: "中国" },
    { name: "花莲", lat: 23.9910, lng: 121.6111, country: "中国" },
    { name: "宜兰", lat: 24.7654, lng: 121.7198, country: "中国" },
    
    // 亚洲其他城市
    { name: "东京", lat: 35.6762, lng: 139.6503, country: "日本" },
    { name: "大阪", lat: 34.6937, lng: 135.5023, country: "日本" },
    { name: "京都", lat: 35.0116, lng: 135.7681, country: "日本" },
    { name: "北海道", lat: 43.0642, lng: 141.3469, country: "日本" },
    { name: "冲绳", lat: 26.5013, lng: 127.9458, country: "日本" },
    { name: "横滨", lat: 35.4437, lng: 139.6380, country: "日本" },
    { name: "名古屋", lat: 35.1815, lng: 136.9066, country: "日本" },
    { name: "福冈", lat: 33.5904, lng: 130.4017, country: "日本" },
    { name: "札幌", lat: 43.0618, lng: 141.3545, country: "日本" },
    { name: "首尔", lat: 37.5665, lng: 126.9780, country: "韩国" },
    { name: "釜山", lat: 35.1796, lng: 129.0756, country: "韩国" },
    { name: "济州岛", lat: 33.4996, lng: 126.5312, country: "韩国" },
    { name: "仁川", lat: 37.4563, lng: 126.7052, country: "韩国" },
    { name: "曼谷", lat: 13.7563, lng: 100.5018, country: "泰国" },
    { name: "清迈", lat: 18.7883, lng: 98.9853, country: "泰国" },
    { name: "普吉岛", lat: 7.9519, lng: 98.3381, country: "泰国" },
    { name: "芭提雅", lat: 12.9276, lng: 100.8770, country: "泰国" },
    { name: "苏梅岛", lat: 9.5120, lng: 100.0134, country: "泰国" },
    { name: "新加坡", lat: 1.3521, lng: 103.8198, country: "新加坡" },
    { name: "巴厘岛", lat: -8.3405, lng: 115.0920, country: "印度尼西亚" },
    { name: "雅加达", lat: -6.2088, lng: 106.8456, country: "印度尼西亚" },
    { name: "日惹", lat: -7.7956, lng: 110.3695, country: "印度尼西亚" },
    { name: "龙目岛", lat: -8.6500, lng: 116.3244, country: "印度尼西亚" },
    { name: "吉隆坡", lat: 3.1390, lng: 101.6869, country: "马来西亚" },
    { name: "马尼拉", lat: 14.5995, lng: 120.9842, country: "菲律宾" },
    { name: "宿雾", lat: 10.3157, lng: 123.8854, country: "菲律宾" },
    { name: "长滩岛", lat: 11.9674, lng: 121.9248, country: "菲律宾" },
    { name: "胡志明市", lat: 10.8231, lng: 106.6297, country: "越南" },
    { name: "河内", lat: 21.0285, lng: 105.8542, country: "越南" },
    { name: "芽庄", lat: 12.2388, lng: 109.1967, country: "越南" },
    { name: "岘港", lat: 16.0544, lng: 108.2022, country: "越南" },
    { name: "吴哥窟", lat: 13.4125, lng: 103.8670, country: "柬埔寨" },
    { name: "金边", lat: 11.5621, lng: 104.9160, country: "柬埔寨" },
    { name: "新德里", lat: 28.6139, lng: 77.2090, country: "印度" },
    { name: "孟买", lat: 19.0760, lng: 72.8777, country: "印度" },
    { name: "加尔各答", lat: 22.5726, lng: 88.3639, country: "印度" },
    { name: "斋浦尔", lat: 26.9124, lng: 75.7873, country: "印度" },
    { name: "阿格拉", lat: 27.1767, lng: 78.08, country: "印度" },
    { name: "迪拜", lat: 25.2048, lng: 55.2708, country: "阿联酋" },
    { name: "马尔代夫", lat: 3.2028, lng: 73.2207, country: "马尔代夫" },
    { name: "科伦坡", lat: 6.9271, lng: 79.8612, country: "斯里兰卡" },
    { name: "加德满都", lat: 27.7172, lng: 85.3240, country: "尼泊尔" },
    { name: "博卡拉", lat: 28.2282, lng: 83.9935, country: "尼泊尔" },
    
    // 欧洲城市
    { name: "伦敦", lat: 51.5074, lng: -0.1278, country: "英国" },
    { name: "巴黎", lat: 48.8566, lng: 2.3522, country: "法国" },
    { name: "罗马", lat: 41.9028, lng: 12.4964, country: "意大利" },
    { name: "威尼斯", lat: 45.4408, lng: 12.3155, country: "意大利" },
    { name: "佛罗伦萨", lat: 43.7696, lng: 11.2558, country: "意大利" },
    { name: "米兰", lat: 45.4642, lng: 9.1900, country: "意大利" },
    { name: "马德里", lat: 40.4168, lng: -3.7038, country: "西班牙" },
    { name: "巴塞罗那", lat: 41.3851, lng: 2.1734, country: "西班牙" },
    { name: "塞维利亚", lat: 37.3891, lng: -5.9845, country: "西班牙" },
    { name: "阿姆斯特丹", lat: 52.3676, lng: 4.9041, country: "荷兰" },
    { name: "布鲁塞尔", lat: 50.8503, lng: 4.3517, country: "比利时" },
    { name: "柏林", lat: 52.5200, lng: 13.4050, country: "德国" },
    { name: "慕尼黑", lat: 48.1351, lng: 11.5820, country: "德国" },
    { name: "法兰克福", lat: 50.1109, lng: 8.6821, country: "德国" },
    { name: "科隆", lat: 50.9375, lng: 6.9603, country: "德国" },
    { name: "维也纳", lat: 48.2082, lng: 16.3738, country: "奥地利" },
    { name: "苏黎世", lat: 47.3769, lng: 8.5417, country: "瑞士" },
    { name: "日内瓦", lat: 46.2044, lng: 6.1432, country: "瑞士" },
    { name: "卢塞恩", lat: 47.0502, lng: 8.3093, country: "瑞士" },
    { name: "因特拉肯", lat: 46.6863, lng: 7.8632, country: "瑞士" },
    { name: "布拉格", lat: 50.0755, lng: 14.4378, country: "捷克" },
    { name: "布达佩斯", lat: 47.4979, lng: 19.0402, country: "匈牙利" },
    { name: "华沙", lat: 52.2297, lng: 21.0122, country: "波兰" },
    { name: "克拉科夫", lat: 50.0647, lng: 19.9450, country: "波兰" },
    { name: "哥本哈根", lat: 55.6761, lng: 12.5683, country: "丹麦" },
    { name: "奥斯陆", lat: 59.9139, lng: 10.7522, country: "挪威" },
    { name: "卑尔根", lat: 60.3913, lng: 5.3221, country: "挪威" },
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
    { name: "马赛", lat: 43.2965, lng: 5.3698, country: "法国" },
    { name: "普罗旺斯", lat: 43.9493, lng: 6.0679, country: "法国" },
    { name: "圣托里尼", lat: 36.3932, lng: 25.4615, country: "希腊" },
    { name: "雅典", lat: 37.9838, lng: 23.7275, country: "希腊" },
    { name: "伊斯坦布尔", lat: 41.0082, lng: 28.9784, country: "土耳其" },
    { name: "卡帕多西亚", lat: 38.6431, lng: 34.8289, country: "土耳其" },
    { name: "莫斯科", lat: 55.7558, lng: 37.6173, country: "俄罗斯" },
    { name: "圣彼得堡", lat: 59.9311, lng: 30.3609, country: "俄罗斯" },
    { name: "伊尔库茨克", lat: 52.2855, lng: 104.2890, country: "俄罗斯" },
    { name: "里斯本", lat: 38.7223, lng: -9.1393, country: "葡萄牙" },
    { name: "波尔图", lat: 41.1579, lng: -8.6291, country: "葡萄牙" },
    { name: "巴塞罗那", lat: 41.3851, lng: 2.1734, country: "西班牙" },
    { name: "格拉纳达", lat: 37.1773, lng: -3.5985, country: "西班牙" },
    
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
    { name: "新奥尔良", lat: 29.9511, lng: -90.0715, country: "美国" },
    { name: "阿拉斯加", lat: 64.2008, lng: -152.4937, country: "美国" },
    { name: "黄石公园", lat: 44.4280, lng: -110.5885, country: "美国" },
    { name: "大峡谷", lat: 36.0544, lng: -112.1401, country: "美国" },
    { name: "蒙特利尔", lat: 45.5017, lng: -73.5673, country: "加拿大" },
    { name: "多伦多", lat: 43.6532, lng: -79.3832, country: "加拿大" },
    { name: "温哥华", lat: 49.2827, lng: -123.1207, country: "加拿大" },
    { name: "卡尔加里", lat: 51.0447, lng: -114.0719, country: "加拿大" },
    { name: "魁北克城", lat: 46.8139, lng: -71.2080, country: "加拿大" },
    { name: "班夫", lat: 51.1784, lng: -115.5708, country: "加拿大" },
    { name: "尼亚加拉", lat: 43.0896, lng: -79.0849, country: "加拿大" },
    { name: "墨西哥城", lat: 19.4326, lng: -99.1332, country: "墨西哥" },
    { name: "坎昆", lat: 21.1619, lng: -86.8515, country: "墨西哥" },
    { name: "瓜达拉哈拉", lat: 20.6597, lng: -103.3496, country: "墨西哥" },
    
    // 南美城市
    { name: "里约热内卢", lat: -22.9068, lng: -43.1729, country: "巴西" },
    { name: "圣保罗", lat: -23.5505, lng: -46.6333, country: "巴西" },
    { name: "布宜诺斯艾利斯", lat: -34.6037, lng: -58.3816, country: "阿根廷" },
    { name: "伊瓜苏", lat: -25.6953, lng: -54.4367, country: "阿根廷" },
    { name: "乌斯怀亚", lat: -54.8019, lng: -68.3030, country: "阿根廷" },
    { name: "巴塞罗那", lat: -33.4489, lng: -70.6693, country: "智利" },
    { name: "复活节岛", lat: -27.1127, lng: -109.3497, country: "智利" },
    { name: "利马", lat: -12.0464, lng: -77.0428, country: "秘鲁" },
    { name: "马丘比丘", lat: -13.1631, lng: -72.5450, country: "秘鲁" },
    { name: "库斯科", lat: -13.5320, lng: -71.9675, country: "秘鲁" },
    { name: "波哥大", lat: 4.7110, lng: -74.0721, country: "哥伦比亚" },
    { name: "加拉加斯", lat: 10.4806, lng: -66.9036, country: "委内瑞拉" },
    { name: "蒙得维的亚", lat: -34.9011, lng: -56.1645, country: "乌拉圭" },
    
    // 大洋洲城市
    { name: "悉尼", lat: -33.8688, lng: 151.2093, country: "澳大利亚" },
    { name: "墨尔本", lat: -37.8136, lng: 144.9631, country: "澳大利亚" },
    { name: "布里斯班", lat: -27.4698, lng: 153.0251, country: "澳大利亚" },
    { name: "珀斯", lat: -31.9505, lng: 115.8605, country: "澳大利亚" },
    { name: "阿德莱德", lat: -34.9285, lng: 138.6007, country: "澳大利亚" },
    { name: "凯恩斯", lat: -16.9186, lng: 145.7781, country: "澳大利亚" },
    { name: "黄金海岸", lat: -28.0167, lng: 153.4000, country: "澳大利亚" },
    { name: "堪培拉", lat: -35.2809, lng: 149.1300, country: "澳大利亚" },
    { name: "霍巴特", lat: -42.8821, lng: 147.3272, country: "澳大利亚" },
    { name: "达尔文", lat: -12.4435, lng: 130.8459, country: "澳大利亚" },
    { name: "大堡礁", lat: -18.2871, lng: 147.6992, country: "澳大利亚" },
    { name: "奥克兰", lat: -36.8485, lng: 174.7633, country: "新西兰" },
    { name: "皇后镇", lat: -45.0312, lng: 168.6626, country: "新西兰" },
    { name: "惠灵顿", lat: -41.2865, lng: 174.7762, country: "新西兰" },
    { name: "基督城", lat: -43.5320, lng: 172.6362, country: "新西兰" },
    { name: "罗托鲁阿", lat: -38.1368, lng: 176.2497, country: "新西兰" },
    { name: "大溪地", lat: -17.6509, lng: -149.4260, country: "法属波利尼西亚" },
    { name: "斐济", lat: -17.7134, lng: 178.0650, country: "斐济" },
    
    // 非洲城市
    { name: "开罗", lat: 30.0444, lng: 31.2357, country: "埃及" },
    { name: "亚历山大", lat: 31.2001, lng: 29.9187, country: "埃及" },
    { name: "卢克索", lat: 25.6872, lng: 32.6396, country: "埃及" },
    { name: "撒哈拉沙漠", lat: 23.4162, lng: 25.6628, country: "埃及" },
    { name: "开普敦", lat: -33.9249, lng: 18.4241, country: "南非" },
    { name: "约翰内斯堡", lat: -26.2041, lng: 28.0473, country: "南非" },
    { name: "德班", lat: -29.8587, lng: 31.0218, country: "南非" },
    { name: "比勒陀利亚", lat: -25.7479, lng: 28.2293, country: "南非" },
    { name: "内罗毕", lat: -1.2921, lng: 36.8219, country: "肯尼亚" },
    { name: "蒙巴萨", lat: -4.0435, lng: 39.6682, country: "肯尼亚" },
    { name: "摩洛哥", lat: 31.7917, lng: -7.0926, country: "摩洛哥" },
    { name: "马拉喀什", lat: 31.6295, lng: -7.9811, country: "摩洛哥" },
    { name: "卡萨布兰卡", lat: 33.5731, lng: -7.5898, country: "摩洛哥" },
    { name: "突尼斯", lat: 36.8065, lng: 10.1815, country: "突尼斯" },
    { name: "毛里求斯", lat: -20.3484, lng: 57.5522, country: "毛里求斯" },
    { name: "塞舌尔", lat: -4.6796, lng: 55.4920, country: "塞舌尔" },
    { name: "坦桑尼亚", lat: -6.3690, lng: 34.8888, country: "坦桑尼亚" },
    { name: "桑给巴尔", lat: -6.1659, lng: 39.2026, country: "坦桑尼亚" },
    { name: "纳米比亚", lat: -22.9576, lng: 18.4904, country: "纳米比亚" },
    { name: "维多利亚瀑布", lat: -17.9243, lng: 25.8572, country: "津巴布韦" },
    { name: "阿尔及利亚", lat: 28.0339, lng: 1.6596, country: "阿尔及利亚" }
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
