// Dữ liệu sản phẩm thực tế, trích xuất & phân loại tự động từ file "Check PRV.xlsx"
const CATEGORIES = [
  {
    "slug": "ao",
    "name": "Áo & Áo Khoác",
    "icon": "👕"
  },
  {
    "slug": "quan",
    "name": "Quần & Váy",
    "icon": "👖"
  },
  {
    "slug": "giay",
    "name": "Giày & Dép",
    "icon": "👟"
  },
  {
    "slug": "phu-kien",
    "name": "Phụ Kiện",
    "icon": "🎒"
  }
];

const BRANDS = [
  {
    "slug": "adidas",
    "name": "Adidas"
  },
  {
    "slug": "nike",
    "name": "Nike"
  },
  {
    "slug": "asics",
    "name": "Asics"
  },
  {
    "slug": "lining",
    "name": "Li-Ning"
  },
  {
    "slug": "361-degrees",
    "name": "361 Degrees"
  },
  {
    "slug": "lacoste",
    "name": "Lacoste"
  }
];

const PRODUCTS = [
  {
    "id": 1,
    "name": "Áo polo Poly",
    "code": "JM1203",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 500000,
    "oldPrice": 1250000,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/club-graph-polo-ngoc-lam-jm1203-21-model.jpg?v=1750747158000"
    ]
  },
  {
    "id": 2,
    "name": "Áo polo Poly",
    "code": "JM1205",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 500000,
    "oldPrice": 1250000,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/club-tennis-climacool-graphic-polo-shirt-grey-jm1205-21-model.jpg?v=1750747157927"
    ]
  },
  {
    "id": 3,
    "name": "Quần ngắn",
    "code": "HR7938",
    "brand": "adidas",
    "category": "quan",
    "gender": "Nam",
    "price": 700000,
    "oldPrice": 1750000,
    "stock": 3,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/upload6170206ce8b24118ad7a948c-52d7bb7a-8b1b-4586-97c8-4a6d0a7e11d3.jpg?v=1742786130727"
    ]
  },
  {
    "id": 4,
    "name": "Mũ lưỡi trai",
    "code": "IQ2908",
    "brand": "adidas",
    "category": "phu-kien",
    "gender": "Nam",
    "price": 280000,
    "oldPrice": 700000,
    "stock": 6,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/formancehatwhiteiq290801standa-a662efe6-bee0-4a64-b4f3-06d5c23d9764.jpg?v=1742786173543"
    ]
  },
  {
    "id": 5,
    "name": "Áo polo Poly tổng hợp",
    "code": "JD5426",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 500000,
    "oldPrice": 1250000,
    "stock": 10,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/aopolographictennisclimacoolcl-78b33cee-4d4d-47ae-beab-d4a7fbd391b4.png?v=1750747173513"
    ]
  },
  {
    "id": 6,
    "name": "Quần short chun Cotton tổng hợp",
    "code": "JF3348",
    "brand": "adidas",
    "category": "quan",
    "gender": "Nam",
    "price": 320000,
    "oldPrice": 800000,
    "stock": 6,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/quan-short-city-escape-trang-jf3348-21-model.jpg?v=1746507359717"
    ]
  },
  {
    "id": 7,
    "name": "Mũ",
    "code": "IM9181",
    "brand": "adidas",
    "category": "phu-kien",
    "gender": "Nam",
    "price": 280000,
    "oldPrice": 700000,
    "stock": 5,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/uxanhdatroiim918101standard1b7-b4bb9638-8111-4b15-9b12-a4254dc6f07c.jpg?v=1742786173310"
    ]
  },
  {
    "id": 8,
    "name": "Áo polo Poly tổng hợp",
    "code": "JD5427",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 500000,
    "oldPrice": 1250000,
    "stock": 7,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/aopolographictennisclimacoolcl.png?v=1750747168930"
    ]
  },
  {
    "id": 9,
    "name": "Quần đùi Golf",
    "code": "JF9018",
    "brand": "adidas",
    "category": "quan",
    "gender": "Nam",
    "price": 880000,
    "oldPrice": 2200000,
    "stock": 7,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/ultimate365texturedgolfshortsb-3fb844d8-9a1f-46b1-8048-ce9e0bac5cee.png?v=1742786327043"
    ]
  },
  {
    "id": 10,
    "name": "Áo T-shirt Poly",
    "code": "JI8129",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 420000,
    "oldPrice": 1050000,
    "stock": 6,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/ao-thun-3-soc-designed-4-training-mau-xanh-da-troi-ji8129-21-model.jpg?v=1742978423867"
    ]
  },
  {
    "id": 11,
    "name": "Áo T-shirt Cotton tổng hợp",
    "code": "JW4737",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 420000,
    "oldPrice": 1050000,
    "stock": 1,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-48-adidas-z-n-e-tee-brown-jw4737-21-model.jpg?v=1751264347803"
    ]
  },
  {
    "id": 12,
    "name": "Quần short chun Cotton tổng hợp",
    "code": "JW4744",
    "brand": "adidas",
    "category": "quan",
    "gender": "Nam",
    "price": 500000,
    "oldPrice": 1250000,
    "stock": 20,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-72-z-n-e-shorts-brown-jw4744-21-model.jpg?v=1751264089823"
    ]
  },
  {
    "id": 13,
    "name": "Áo T-shirt Poly",
    "code": "JW7438",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 320000,
    "oldPrice": 800000,
    "stock": 4,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-13-camiseta-train-essentials-feelready-marrom-jw7438-21-model.jpg?v=1765953756463",
      "#ERROR!"
    ]
  },
  {
    "id": 14,
    "name": "Quần short chun Poly",
    "code": "JM5400",
    "brand": "adidas",
    "category": "quan",
    "gender": "Nam",
    "price": 420000,
    "oldPrice": 1050000,
    "stock": 10,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-74-own-the-run-climacool-2-in-1-shorts-black-jm5400-21-model.jpg?v=1755230492750"
    ]
  },
  {
    "id": 15,
    "name": "Quần short chun Poly tổng hợp",
    "code": "JL8707",
    "brand": "adidas",
    "category": "quan",
    "gender": "Nam",
    "price": 420000,
    "oldPrice": 1050000,
    "stock": 19,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-1-own-the-run-allover-print-shorts-blue-jl8707-21-model.jpg?v=1756363924600"
    ]
  },
  {
    "id": 16,
    "name": "Áo gió có mũ",
    "code": "IL7230",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 760000,
    "oldPrice": 1900000,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-83-ao-khoac-run-it-djen-il7230-hm1.jpg?v=1758008421690"
    ]
  },
  {
    "id": 17,
    "name": "Áo gió có mũ",
    "code": "JM5742",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 680000,
    "oldPrice": 1700000,
    "stock": 11,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-77-run-it-jacket-mau-xanh-la-jm5742-21-model.jpg?v=1751447522093"
    ]
  },
  {
    "id": 18,
    "name": "Áo gió có mũ",
    "code": "JN6327",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 720000,
    "oldPrice": 1800000,
    "stock": 11,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-81-ao-khoac-in-toan-bo-own-the-run-xam-jn6327-21-model.jpg?v=1759733966467"
    ]
  },
  {
    "id": 19,
    "name": "Áo gió có mũ",
    "code": "JX2249",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 720000,
    "oldPrice": 1800000,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-82-ao-khoac-own-the-run-mau-xanh-da-troi-jx2249-21-model.jpg?v=1758082556063"
    ]
  },
  {
    "id": 20,
    "name": "Bộ quần áo thể thao",
    "code": "JX5529",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 720000,
    "oldPrice": 1800000,
    "stock": 15,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-32-jx5529-21-model.jpg?v=1761719222413",
      "#ERROR!"
    ]
  },
  {
    "id": 21,
    "name": "Quần nỉ poly bo gấu",
    "code": "JN1822",
    "brand": "adidas",
    "category": "quan",
    "gender": "Nam",
    "price": 800000,
    "oldPrice": 2000000,
    "stock": 12,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-94-stadium-track-tracksuit-bottoms-black-jn1822-21-model.jpg?v=1761722526763",
      "#ERROR!"
    ]
  },
  {
    "id": 22,
    "name": "Áo polo poly",
    "code": "JL5274",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 760000,
    "oldPrice": 1900000,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-80-ultimate365-micro-argyle-polo-shirt-black-jl5274.jpg?v=1761726786450",
      "#ERROR!"
    ]
  },
  {
    "id": 23,
    "name": "Áo polo poly",
    "code": "JL5264",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 760000,
    "oldPrice": 1900000,
    "stock": 7,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-69-ultimate365-hounds-jacquard-polo-shirt-turquoise-jl5264-21-model.jpg?v=1761705140953",
      "#ERROR!"
    ]
  },
  {
    "id": 24,
    "name": "Áo T-shirt Poly",
    "code": "JN0609",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 320000,
    "oldPrice": 800000,
    "stock": 9,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-81-all-szn-washed-tee-brown-jn0609-21-model.jpg?v=1761724163980",
      "#ERROR!"
    ]
  },
  {
    "id": 25,
    "name": "Tất ngắn cổ",
    "code": "HS5577",
    "brand": "adidas",
    "category": "phu-kien",
    "gender": "Nam",
    "price": 180000,
    "oldPrice": 450000,
    "stock": 13,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://picsum.photos/seed/HS5577/500/650"
    ]
  },
  {
    "id": 26,
    "name": "Áo gió không mũ",
    "code": "JM5559",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 920000,
    "oldPrice": 2300000,
    "stock": 12,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-5-manchester-united-z-n-e-anthem-jacket-n-a-black-jm5559-21-model.jpg?v=1765509004420",
      "#ERROR!"
    ]
  },
  {
    "id": 27,
    "name": "Áo T-shirt Cotton tổng hợp",
    "code": "JE3078",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 460000,
    "oldPrice": 1150000,
    "stock": 8,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/aothunadidasznetrangje307821mo-aaa40fe8-dab5-4490-a70d-bf5ce1afb83c.jpg?v=1742786287873"
    ]
  },
  {
    "id": 28,
    "name": "Quần short chun Cotton tổng hợp",
    "code": "JE6417",
    "brand": "adidas",
    "category": "quan",
    "gender": "Nam",
    "price": 380000,
    "oldPrice": 950000,
    "stock": 4,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/taixuong20241231t112156554e5ff-14bdbf17-7a85-4ba1-ada2-3adc943808b2.png?v=1742786215800"
    ]
  },
  {
    "id": 29,
    "name": "Áo cộc tay không cổ",
    "code": "JD4877",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 420000,
    "oldPrice": 1050000,
    "stock": 10,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/aothun3socfutureiconsdjenjd487-da1636b3-4b37-4374-83ca-e226f5527a52.png?v=1742786226887"
    ]
  },
  {
    "id": 30,
    "name": "Áo T-shirt Cotton tổng hợp",
    "code": "JE3069",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 460000,
    "oldPrice": 1150000,
    "stock": 11,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/adidaszneteeblackje306921model-32637758-812b-4a90-9507-f66b2f27bd28.jpg?v=1742786308447"
    ]
  },
  {
    "id": 31,
    "name": "Quần short chun poly",
    "code": "JZ7705",
    "brand": "adidas",
    "category": "quan",
    "gender": "Nam",
    "price": 480000,
    "oldPrice": 1200000,
    "stock": 9,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-24-quan-short-adi365-formotion-nau-jz7705-21-model.jpg?v=1769414764900"
    ]
  },
  {
    "id": 32,
    "name": "Áo T-shirt poly",
    "code": "KE9938",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 480000,
    "oldPrice": 1200000,
    "stock": 8,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-25-ao-thun-3-soc-d4t-power-mau-xanh-la-ke9938-21-model.jpg?v=1769494815353"
    ]
  },
  {
    "id": 33,
    "name": "Áo T-shirt poly",
    "code": "KE9936",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 480000,
    "oldPrice": 1200000,
    "stock": 9,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-26-ao-thun-3-soc-d4t-primelift-nau-ke9936-21-model.jpg?v=1770255777717"
    ]
  },
  {
    "id": 34,
    "name": "Áo polo poly",
    "code": "KB4832",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 960000,
    "oldPrice": 2400000,
    "stock": 8,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-27-ao-polo-ngan-tay-color-block-djen-kb4832-21-model.jpg?v=1774333544380"
    ]
  },
  {
    "id": 35,
    "name": "Áo polo poly",
    "code": "KE7707",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 680000,
    "oldPrice": 1700000,
    "stock": 13,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-27-ao-polo-ultimate365-mesh-print-climacool-mau-xanh-da-troi-ke7707-21-model.jpg?v=1775098103263"
    ]
  },
  {
    "id": 36,
    "name": "Áo T-shirt poly",
    "code": "KF3097",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 480000,
    "oldPrice": 1200000,
    "stock": 9,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-27-ao-thun-d4t-primelift-aop-djen-kf3097-21-model.jpg?v=1775035984900"
    ]
  },
  {
    "id": 37,
    "name": "Áo T-shirt poly",
    "code": "JZ6849",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 460000,
    "oldPrice": 1150000,
    "stock": 10,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imageye-imgi-25-ao-thun-luoi-stadium-co-graphic-mau-xanh-da-troi-jz6849-21-model.jpg?v=1773297472933"
    ]
  },
  {
    "id": 38,
    "name": "Quần short chun poly",
    "code": "KC0423",
    "brand": "adidas",
    "category": "quan",
    "gender": "Nam",
    "price": 460000,
    "oldPrice": 1150000,
    "stock": 8,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imageye-imgi-22-stadium-kc0423-21-model.jpg?v=1773128816907"
    ]
  },
  {
    "id": 39,
    "name": "Áo T-shirt poly",
    "code": "KC0430",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 380000,
    "oldPrice": 950000,
    "stock": 4,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imageye-imgi-25-ao-thun-stadium-mau-xanh-da-troi-kc0430-21-model.jpg?v=1773130182063"
    ]
  },
  {
    "id": 40,
    "name": "Áo T-shirt cotton",
    "code": "KE4694",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 460000,
    "oldPrice": 1150000,
    "stock": 8,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imageye-imgi-25-ao-thun-adidas-z-n-e-be-ke4694-21-model.jpg?v=1773201070207"
    ]
  },
  {
    "id": 41,
    "name": "Áo T-shirt cotton",
    "code": "KE4699",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 460000,
    "oldPrice": 1150000,
    "stock": 4,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-27-ao-thun-adidas-z-n-e-xam-ke4699-21-model-1.jpg?v=1776764371193"
    ]
  },
  {
    "id": 42,
    "name": "Quần short chun poly",
    "code": "KE4704",
    "brand": "adidas",
    "category": "quan",
    "gender": "Nam",
    "price": 600000,
    "oldPrice": 1500000,
    "stock": 9,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-27-quan-short-z-n-e-xam-ke4704-21-model.jpg?v=1775094075363"
    ]
  },
  {
    "id": 43,
    "name": "Áo T-shirt cotton",
    "code": "KR0204",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 460000,
    "oldPrice": 1150000,
    "stock": 11,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imageye-imgi-25-adidas-z-n-e-tee-blue-kr0204-21-model.jpg?v=1773222470470"
    ]
  },
  {
    "id": 44,
    "name": "Quần short chun poly",
    "code": "JY9592",
    "brand": "adidas",
    "category": "quan",
    "gender": "Nam",
    "price": 480000,
    "oldPrice": 1200000,
    "stock": 5,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-32-quan-short-graphic-club-tennis-climacool-xam-jy9592-25-model.jpg?v=1775466093117"
    ]
  },
  {
    "id": 45,
    "name": "Quần short chun poly",
    "code": "JY9593",
    "brand": "adidas",
    "category": "quan",
    "gender": "Nam",
    "price": 480000,
    "oldPrice": 1200000,
    "stock": 9,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-28-quan-short-graphic-club-tennis-climacool-trang-jy9593-21-model.jpg?v=1778118526010"
    ]
  },
  {
    "id": 46,
    "name": "Áo polo poly",
    "code": "JY9595",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 500000,
    "oldPrice": 1250000,
    "stock": 9,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-27-ao-polo-graphic-climacool-cau-lac-bo-tennis-trang-jy9595-21-model.jpg?v=1775465518123"
    ]
  },
  {
    "id": 47,
    "name": "Áo polo poly",
    "code": "JY9596",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 500000,
    "oldPrice": 1250000,
    "stock": 6,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-23-club-tennis-climacool-graphic-polo-shirt-grey-jy9596-21-model.jpg?v=1775464483560"
    ]
  },
  {
    "id": 48,
    "name": "Mũ lưỡi trai",
    "code": "JZ0448",
    "brand": "adidas",
    "category": "phu-kien",
    "gender": "Nam",
    "price": 360000,
    "oldPrice": 900000,
    "stock": 8,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-8-tour-print-snapback-hat-white-jz0448-01-00-standard.jpg?v=1774316622627"
    ]
  },
  {
    "id": 49,
    "name": "Áo polo poly",
    "code": "KE6691",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 720000,
    "oldPrice": 1800000,
    "stock": 12,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-31-ke6691-21-model.jpg?v=1775094991867"
    ]
  },
  {
    "id": 50,
    "name": "Áo T-shirt poly",
    "code": "KE5896",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 480000,
    "oldPrice": 1200000,
    "stock": 11,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-28-ao-thun-puremotion-mau-xanh-la-ke5896-21-model.jpg?v=1778212470007"
    ]
  },
  {
    "id": 51,
    "name": "Quần short chun poly",
    "code": "KA7393",
    "brand": "adidas",
    "category": "quan",
    "gender": "Nam",
    "price": 560000,
    "oldPrice": 1400000,
    "stock": 10,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-25-puremotion-shorts-green-ka7393-21-model.jpg?v=1778123009103"
    ]
  },
  {
    "id": 52,
    "name": "Áo T-shirt poly",
    "code": "KB6145",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 420000,
    "oldPrice": 1050000,
    "stock": 13,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-28-ao-track-top-house-of-tiro-nations-pack-trang-kb6145-21-model.jpg?v=1778126335837"
    ]
  },
  {
    "id": 53,
    "name": "Áo T-shirt poly",
    "code": "KB6144",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nam",
    "price": 420000,
    "oldPrice": 1050000,
    "stock": 13,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/34a8eb6bdc6c4d86877e1befd4ed9df2_9366/Ao_Track_Top_House_of_Tiro_Nations_Pack_trang_KB6144_21_model.jpg"
    ]
  },
  {
    "id": 54,
    "name": "Dép quai ngang",
    "code": "JI2236",
    "brand": "adidas",
    "category": "giay",
    "gender": "Nữ",
    "price": 260000,
    "oldPrice": 650000,
    "stock": 6,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-39-ji2236-06-standard.jpg?v=1765505514767",
      "#ERROR!"
    ]
  },
  {
    "id": 55,
    "name": "Áo T-shirt cotton tổng hợp",
    "code": "JL7334",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nữ",
    "price": 460000,
    "oldPrice": 1150000,
    "stock": 8,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-26-jl7334-25-model.jpg?v=1751276114727"
    ]
  },
  {
    "id": 56,
    "name": "Quần dài Cotton tổng hợp",
    "code": "JE1306",
    "brand": "adidas",
    "category": "quan",
    "gender": "Nữ",
    "price": 520000,
    "oldPrice": 1300000,
    "stock": 5,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/taixuong20250109t1545465818c4e-b031e5de-b09a-4b26-b822-c3a3688be2bd.png?v=1742786248547"
    ]
  },
  {
    "id": 57,
    "name": "Quần gió ống xuông",
    "code": "JX7664",
    "brand": "adidas",
    "category": "quan",
    "gender": "Nữ",
    "price": 480000,
    "oldPrice": 1200000,
    "stock": 8,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-73-essentials-3-stripes-lifestyle-woven-parachute-pants-brown-jx7664-21-model.jpg?v=1751446404557"
    ]
  },
  {
    "id": 58,
    "name": "Quần short chun Cotton tổng hợp",
    "code": "JE7845",
    "brand": "adidas",
    "category": "quan",
    "gender": "Nữ",
    "price": 600000,
    "oldPrice": 1500000,
    "stock": 9,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/quanshortadidasznedjenje784521-3bfc602a-94bf-480e-ba0d-09082c10d519.jpg?v=1742786294643"
    ]
  },
  {
    "id": 59,
    "name": "Áo T-shirt cotton",
    "code": "KC7723",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nữ",
    "price": 460000,
    "oldPrice": 1150000,
    "stock": 8,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/kc7723-2-apparel-on-model-standard-view-grey.jpg?v=1769482208223"
    ]
  },
  {
    "id": 60,
    "name": "Áo T-shirt Cotton tổng hợp",
    "code": "JE7846",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nữ",
    "price": 460000,
    "oldPrice": 1150000,
    "stock": 6,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/adidaszneteeblackje784625model-47798bc1-263d-4e22-ab96-8817c3b2248f.jpg?v=1742786309087"
    ]
  },
  {
    "id": 61,
    "name": "Áo T-shirt",
    "code": "KF0709",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nữ",
    "price": 460000,
    "oldPrice": 1150000,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-25-ao-tank-top-adidas-z-n-e-trang-kf0709-21-model.jpg?v=1769495450650"
    ]
  },
  {
    "id": 62,
    "name": "Áo T-shirt",
    "code": "KC7762",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nữ",
    "price": 460000,
    "oldPrice": 1150000,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-25-ao-tank-top-adidas-z-n-e-djen-kc7762-21-model.jpg?v=1769482475243"
    ]
  },
  {
    "id": 63,
    "name": "Mũ nửa đầu",
    "code": "KD8873",
    "brand": "adidas",
    "category": "phu-kien",
    "gender": "Nữ",
    "price": 400000,
    "oldPrice": 1000000,
    "stock": 5,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-22-kd8873-01-00-standard.jpg?v=1774345674150"
    ]
  },
  {
    "id": 64,
    "name": "Mũ nửa đầu",
    "code": "KD8872",
    "brand": "adidas",
    "category": "phu-kien",
    "gender": "Nữ",
    "price": 400000,
    "oldPrice": 1000000,
    "stock": 3,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-27-ribbon-visor-beige-kd8872-01-00-standard.jpg?v=1774345398660"
    ]
  },
  {
    "id": 65,
    "name": "Áo polo poly",
    "code": "KE8871",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nữ",
    "price": 500000,
    "oldPrice": 1250000,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imageye-imgi-26-ke8871-21-model.jpg?v=1773212616557"
    ]
  },
  {
    "id": 66,
    "name": "Áo polo cotton",
    "code": "KB7205",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nữ",
    "price": 460000,
    "oldPrice": 1150000,
    "stock": 8,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imageye-imgi-25-ao-thun-pop-art-graphic-polo-q2-trang-kb7205-21-model.jpg?v=1773127779717"
    ]
  },
  {
    "id": 67,
    "name": "Áo polo cotton",
    "code": "KB7204",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nữ",
    "price": 460000,
    "oldPrice": 1150000,
    "stock": 9,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imageye-imgi-25-ao-thun-pop-art-graphic-polo-q2-mau-xanh-da-troi-kb7204-21-model.jpg?v=1773128118807"
    ]
  },
  {
    "id": 68,
    "name": "Áo T-shirt poly",
    "code": "KC7695",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nữ",
    "price": 360000,
    "oldPrice": 900000,
    "stock": 6,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-27-ao-thun-dap-noi-3-gach-hyperglam-djen-kc7695-21-model.jpg?v=1775121306930"
    ]
  },
  {
    "id": 69,
    "name": "Chân váy",
    "code": "KE8869",
    "brand": "adidas",
    "category": "quan",
    "gender": "Nữ",
    "price": 680000,
    "oldPrice": 1700000,
    "stock": 4,
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-27-chan-vay-tennis-classics-trang-ke8869-21-model.jpg?v=1775118680887"
    ]
  },
  {
    "id": 70,
    "name": "Quần short chun poly",
    "code": "KD7025",
    "brand": "adidas",
    "category": "quan",
    "gender": "Nữ",
    "price": 360000,
    "oldPrice": 900000,
    "stock": 8,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-27-quan-short-det-dap-noi-3-gach-hyperglam-djen-kd7025-21-model.jpg?v=1775122214720"
    ]
  },
  {
    "id": 71,
    "name": "Quần short chun poly",
    "code": "KA6996",
    "brand": "adidas",
    "category": "quan",
    "gender": "Nữ",
    "price": 520000,
    "oldPrice": 1300000,
    "stock": 8,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-27-quan-short-dang-rong-soft-lux-mau-xanh-la-ka6996-21-model.jpg?v=1774318294377"
    ]
  },
  {
    "id": 72,
    "name": "Áo T-shirt poly",
    "code": "KA6988",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nữ",
    "price": 380000,
    "oldPrice": 950000,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-27-ao-tank-top-soft-lux-mau-xanh-la-ka6988-21-model.jpg?v=1775120725403"
    ]
  },
  {
    "id": 73,
    "name": "Quần short chun poly",
    "code": "KA8694",
    "brand": "adidas",
    "category": "quan",
    "gender": "Nữ",
    "price": 420000,
    "oldPrice": 1050000,
    "stock": 8,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-28-quan-short-adi365-formotion-mau-xanh-da-troi-ka8694-21-model.jpg?v=1778123483167"
    ]
  },
  {
    "id": 74,
    "name": "Áo T-shirt poly",
    "code": "KE8080",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nữ",
    "price": 760000,
    "oldPrice": 1900000,
    "stock": 14,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/bf2837bc9f9f4dafaec12990eea3ed1d_9366/Ao_DJau_San_Khach_Dang_Lung_DJoi_Tuyen_DJuc_26_Mau_xanh_da_troi_KE8080_21_model.jpg"
    ]
  },
  {
    "id": 75,
    "name": "Áo T-shirt poly",
    "code": "KD2343",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nữ",
    "price": 260000,
    "oldPrice": 650000,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-27-ao-baby-tee-dang-om-3-soc-essentials-hong-kd2343-21-model.jpg?v=1776053368917"
    ]
  },
  {
    "id": 76,
    "name": "Quần short chun cotton",
    "code": "KD4777",
    "brand": "adidas",
    "category": "quan",
    "gender": "Nữ",
    "price": 340000,
    "oldPrice": 850000,
    "stock": 7,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-27-quan-short-cotton-3-gach-essentials-hong-kd4777-21-model.jpg?v=1776053124900"
    ]
  },
  {
    "id": 77,
    "name": "Áo T-shirt poly",
    "code": "KA6163",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nữ",
    "price": 320000,
    "oldPrice": 800000,
    "stock": 17,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-27-ao-thun-adi365-climacool-mau-xanh-da-troi-ka6163-21-model.jpg?v=1776052715007"
    ]
  },
  {
    "id": 78,
    "name": "Áo T-shirt poly",
    "code": "KA6970",
    "brand": "adidas",
    "category": "ao",
    "gender": "Nữ",
    "price": 380000,
    "oldPrice": 950000,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/164dba9f11724c00a440c47df04e3618_9366/Ao_TANK_TOP_GAN_ALL_SZN_trang_KA6970_21_model.jpg"
    ]
  },
  {
    "id": 79,
    "name": "Túi cầm tay",
    "code": "JD1308",
    "brand": "adidas",
    "category": "phu-kien",
    "gender": "Trẻ Em",
    "price": 140000,
    "oldPrice": 350000,
    "stock": 19,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://picsum.photos/seed/JD1308/500/650"
    ]
  },
  {
    "id": 80,
    "name": "Tất cao cổ",
    "code": "HT3458",
    "brand": "adidas",
    "category": "phu-kien",
    "gender": "Unisex",
    "price": 160000,
    "oldPrice": 400000,
    "stock": 19,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://product.hstatic.net/1000367250/product/bo_3_djoi_tat_co_cao_lot_djem_3_soc_trang_ht3458_03_standard_733858af65234ef186e15d832c4d5d63.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ6nGIR9TX_QtzKxdCKSNZEeSeORpFhKnxzz_uHmCyZw&s=10"
    ]
  },
  {
    "id": 81,
    "name": "Mũ",
    "code": "JH3263",
    "brand": "adidas",
    "category": "phu-kien",
    "gender": "Unisex",
    "price": 180000,
    "oldPrice": 450000,
    "stock": 4,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-22-mu-luoi-trai-aeroready-essential-trang-jh3263-01-00-standard.jpg?v=1765870275963",
      "#ERROR!"
    ]
  },
  {
    "id": 82,
    "name": "Tất ngắn cổ",
    "code": "HT3434",
    "brand": "adidas",
    "category": "phu-kien",
    "gender": "Unisex",
    "price": 140000,
    "oldPrice": 350000,
    "stock": 4,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://product.hstatic.net/1000367250/product/upload_c5058b6c2ffc4ac7afacecc557976ce0_2602bbf1a45049a7a76bf79a05365c79.jpg"
    ]
  },
  {
    "id": 83,
    "name": "Tất cao cổ",
    "code": "HT3446",
    "brand": "adidas",
    "category": "phu-kien",
    "gender": "Unisex",
    "price": 160000,
    "oldPrice": 400000,
    "stock": 1,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/uploadbaa1b0ae5f3c4641997a8de2-ad97b5f7-09ef-4339-b98b-04f8a5a6381b.jpg?v=1742786236570"
    ]
  },
  {
    "id": 84,
    "name": "Tất ngắn cổ",
    "code": "HT3463",
    "brand": "adidas",
    "category": "phu-kien",
    "gender": "Unisex",
    "price": 105000,
    "oldPrice": 350000,
    "stock": 7,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://product.hstatic.net/1000367250/product/upload_5b2bd87583044bac922a228ad08de248.jpg"
    ]
  },
  {
    "id": 85,
    "name": "Tất ngắn cổ",
    "code": "IC1282",
    "brand": "adidas",
    "category": "phu-kien",
    "gender": "Unisex",
    "price": 140000,
    "oldPrice": 350000,
    "stock": 6,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/uploadf83b5a267843485b852020f7-3340099b-bbdd-4c55-a1e1-a8de88f319a1.jpg?v=1742786234703"
    ]
  },
  {
    "id": 86,
    "name": "Tất cao cổ",
    "code": "IC1323",
    "brand": "adidas",
    "category": "phu-kien",
    "gender": "Unisex",
    "price": 160000,
    "oldPrice": 400000,
    "stock": 9,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/uploadd5325573e642417b9e0683a1-68e10413-3a06-429c-a335-4d7be5626b7a.jpg?v=1742786233927"
    ]
  },
  {
    "id": 87,
    "name": "Tất ngắn cổ",
    "code": "IC1332",
    "brand": "adidas",
    "category": "phu-kien",
    "gender": "Unisex",
    "price": 140000,
    "oldPrice": 350000,
    "stock": 3,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/cushioned-low-cut-socks-3-pairs-black-ic1332-01-04-standard.jpg?v=1750816309597"
    ]
  },
  {
    "id": 88,
    "name": "Tất ngắn cổ",
    "code": "IC1327",
    "brand": "adidas",
    "category": "phu-kien",
    "gender": "Unisex",
    "price": 140000,
    "oldPrice": 350000,
    "stock": 21,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://product.hstatic.net/1000367250/product/upload_921696706fcd418faee24ca2a3927db6.jpg"
    ]
  },
  {
    "id": 89,
    "name": "Tất cao cổ",
    "code": "IC1321",
    "brand": "adidas",
    "category": "phu-kien",
    "gender": "Unisex",
    "price": 160000,
    "oldPrice": 400000,
    "stock": 12,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/upload60c93ddeca5546d6b1cb4065-510cc988-101f-4122-ae62-276236b444fd.jpg?v=1742786234503"
    ]
  },
  {
    "id": 90,
    "name": "Tất ngắn cổ",
    "code": "IC1277",
    "brand": "adidas",
    "category": "phu-kien",
    "gender": "Unisex",
    "price": 140000,
    "oldPrice": 350000,
    "stock": 6,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/uploada8d1f567b83c4c7ea87b2dc6.jpg?v=1742786245020"
    ]
  },
  {
    "id": 91,
    "name": "Tất cao cổ",
    "code": "HT3456",
    "brand": "adidas",
    "category": "phu-kien",
    "gender": "Unisex",
    "price": 140000,
    "oldPrice": 350000,
    "stock": 2,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/3djoitatcolunglotdjem3socsport-66e0945f-f77f-4f11-a25c-0454a04cd5ab.jpg?v=1742786264183"
    ]
  },
  {
    "id": 92,
    "name": "Dép quai ngang",
    "code": "JS4965",
    "brand": "adidas",
    "category": "giay",
    "gender": "Unisex",
    "price": 300000,
    "oldPrice": 750000,
    "stock": 5,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imageye-imgi-35-dep-adilette-shower-liverpool-djo-js4965-06-standard.jpg?v=1773043392150"
    ]
  },
  {
    "id": 93,
    "name": "Dép quai ngang",
    "code": "HQ2591",
    "brand": "adidas",
    "category": "giay",
    "gender": "Unisex",
    "price": 300000,
    "oldPrice": 750000,
    "stock": 9,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-36-dep-adilette-shower-manchester-united-djen-hq2591-06-standard.jpg?v=1770190598433"
    ]
  },
  {
    "id": 94,
    "name": "Dép quai ngang",
    "code": "JS4863",
    "brand": "adidas",
    "category": "giay",
    "gender": "Unisex",
    "price": 300000,
    "oldPrice": 750000,
    "stock": 16,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imageye-imgi-35-dep-adilette-shower-real-madrid-trang-js4863-06-standard.jpg?v=1773040503447"
    ]
  },
  {
    "id": 95,
    "name": "Giày RUNNING SUPERNOVA SOLUTION 2 M",
    "code": "IG2171",
    "brand": "adidas",
    "category": "giay",
    "gender": "Nam",
    "price": 1520000,
    "oldPrice": 3800000,
    "stock": 12,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-87-giay-chay-bo-supernova-solution-2-0-xam-ig2171-06-standard.jpg?v=1751512131893"
    ]
  },
  {
    "id": 96,
    "name": "Giày chạy ADIZERO SL",
    "code": "JR5074",
    "brand": "adidas",
    "category": "giay",
    "gender": "Nam",
    "price": 1200000,
    "oldPrice": 3000000,
    "stock": 24,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-92-giay-adizero-sl-2-xam-jr5074-06-standard.jpg?v=1757408079293"
    ]
  },
  {
    "id": 97,
    "name": "Giày RUNNING PUREBOOST 5",
    "code": "IF9191",
    "brand": "adidas",
    "category": "giay",
    "gender": "Nam",
    "price": 1280000,
    "oldPrice": 3200000,
    "stock": 16,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/giaychaybopureboost5djenif9191.jpg?v=1742786258257"
    ]
  },
  {
    "id": 98,
    "name": "Giày tennis GameCourt 2",
    "code": "KI0781",
    "brand": "adidas",
    "category": "giay",
    "gender": "Nam",
    "price": 800000,
    "oldPrice": 2000000,
    "stock": 9,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/ki0781-5-footwear-photography-side-medial-center-view-grey.jpg?v=1764053181827",
      "#ERROR!"
    ]
  },
  {
    "id": 99,
    "name": "Giày chạy PUREBOOST 5",
    "code": "JQ6896",
    "brand": "adidas",
    "category": "giay",
    "gender": "Nam",
    "price": 1280000,
    "oldPrice": 3200000,
    "stock": 12,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-32-giay-chay-bo-pureboost-5-xam-jq6896-06-standard.jpg?v=1765589441120",
      "#ERROR!"
    ]
  },
  {
    "id": 100,
    "name": "Giày chạy",
    "code": "JQ6902",
    "brand": "adidas",
    "category": "giay",
    "gender": "Nam",
    "price": 1280000,
    "oldPrice": 3200000,
    "stock": 16,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/jq6902-5-footwear-photography-side-medial-center-view-grey.jpg?v=1765781116583",
      "#ERROR!"
    ]
  },
  {
    "id": 101,
    "name": "Giày chạy",
    "code": "JQ4252",
    "brand": "adidas",
    "category": "giay",
    "gender": "Nam",
    "price": 920000,
    "oldPrice": 2300000,
    "stock": 13,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/jq4252-5-footwear-photography-side-medial-center-view-grey.jpg?v=1765780474520"
    ]
  },
  {
    "id": 102,
    "name": "Giày RUNNING PUREBOOST 5",
    "code": "IF9195",
    "brand": "adidas",
    "category": "giay",
    "gender": "Nam",
    "price": 1280000,
    "oldPrice": 3200000,
    "stock": 18,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/giaychaybopureboost5mauxanhlai.jpg?v=1742786290087"
    ]
  },
  {
    "id": 103,
    "name": "Giày tennis",
    "code": "JS1927",
    "brand": "adidas",
    "category": "giay",
    "gender": "Nam",
    "price": 1680000,
    "oldPrice": 4200000,
    "stock": 7,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-37-giay-tennis-barricade-14-trai-cam-js1927-06-standard.jpg?v=1774255979803"
    ]
  },
  {
    "id": 104,
    "name": "Giày tennis",
    "code": "JR1743",
    "brand": "adidas",
    "category": "giay",
    "gender": "Nam",
    "price": 1680000,
    "oldPrice": 4200000,
    "stock": 11,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-42-giay-tennis-barricade-14-trang-jr1743-06-standard.jpg?v=1775459459193"
    ]
  },
  {
    "id": 105,
    "name": "Giày tennis",
    "code": "JR1736",
    "brand": "adidas",
    "category": "giay",
    "gender": "Nam",
    "price": 1520000,
    "oldPrice": 3800000,
    "stock": 15,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-38-giay-tennis-adizero-ubersonic-5-trang-jr1736-hm7.jpg?v=1775461169550"
    ]
  },
  {
    "id": 106,
    "name": "Giày RUNNING DURAMO RC2 W",
    "code": "JS4435",
    "brand": "adidas",
    "category": "giay",
    "gender": "Nữ",
    "price": 520000,
    "oldPrice": 1300000,
    "stock": 7,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-33-giay-chay-bo-duramo-rc2-djen-js4435-06-standard.jpg?v=1765951880263",
      "#ERROR!"
    ]
  },
  {
    "id": 107,
    "name": "Giày RUNNING DURAMO SL2 W",
    "code": "IH8225",
    "brand": "adidas",
    "category": "giay",
    "gender": "Nữ",
    "price": 720000,
    "oldPrice": 1800000,
    "stock": 7,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-56-duramo-sl-2-running-shoes-black-ih8225-hm7.jpg?v=1751275225610"
    ]
  },
  {
    "id": 108,
    "name": "Giày chạy ADIZERO SL2 W",
    "code": "JI2991",
    "brand": "adidas",
    "category": "giay",
    "gender": "Nữ",
    "price": 1200000,
    "oldPrice": 3000000,
    "stock": 6,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-86-giay-adizero-sl2-hong-ji2991-06-standard.jpg?v=1757405892843"
    ]
  },
  {
    "id": 109,
    "name": "GIÀY SPORTSWEAR STREETTALK",
    "code": "JP8282",
    "brand": "adidas",
    "category": "giay",
    "gender": "Nữ",
    "price": 720000,
    "oldPrice": 1800000,
    "stock": 5,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-33-giay-streettalk-trang-jp8282-06-standard.jpg?v=1765939595320",
      "#ERROR!"
    ]
  },
  {
    "id": 110,
    "name": "GIÀY SPORTSWEAR STREETTALK",
    "code": "JP8283",
    "brand": "adidas",
    "category": "giay",
    "gender": "Nữ",
    "price": 720000,
    "oldPrice": 1800000,
    "stock": 13,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-18-streettalk-white-jp8283-06-standard.jpg?v=1765939744423",
      "#ERROR!"
    ]
  },
  {
    "id": 111,
    "name": "Giày chạy RESPONSE 2",
    "code": "KJ1757",
    "brand": "adidas",
    "category": "giay",
    "gender": "Nữ",
    "price": 800000,
    "oldPrice": 2000000,
    "stock": 11,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/kj1757-5-footwear-photography-side-medial-center-view-grey.jpg?v=1764225290937",
      "#ERROR!"
    ]
  },
  {
    "id": 112,
    "name": "Giày chạy adizero Evo SL",
    "code": "KI3383",
    "brand": "adidas",
    "category": "giay",
    "gender": "Nữ",
    "price": 1600000,
    "oldPrice": 4000000,
    "stock": 5,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/adizero-evo-sl-shoes-silver-ki3383-hm4-hover.jpg?v=1766645418920",
      "#ERROR!"
    ]
  },
  {
    "id": 113,
    "name": "Giày chạy",
    "code": "JQ6948",
    "brand": "adidas",
    "category": "giay",
    "gender": "Nữ",
    "price": 880000,
    "oldPrice": 2200000,
    "stock": 7,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-94-ultrarun-5-w-running-shoes-white-jq6948-06-standard.jpg?v=1765781392963",
      "#ERROR!"
    ]
  },
  {
    "id": 114,
    "name": "Giày tennis",
    "code": "KI0789",
    "brand": "adidas",
    "category": "giay",
    "gender": "Nữ",
    "price": 800000,
    "oldPrice": 2000000,
    "stock": 10,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/ki0789-20-footwear-photography-heromrktng-view-7.jpg?v=1768880330123"
    ]
  },
  {
    "id": 115,
    "name": "Giày chạy",
    "code": "JQ9399",
    "brand": "adidas",
    "category": "giay",
    "gender": "Nữ",
    "price": 720000,
    "oldPrice": 1800000,
    "stock": 10,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imageye-imgi-35-runfalcon-5-running-shoes-purple-jq9399-06-standard.jpg?v=1773029046277"
    ]
  },
  {
    "id": 116,
    "name": "Giày tennis",
    "code": "JR1765",
    "brand": "adidas",
    "category": "giay",
    "gender": "Nữ",
    "price": 1680000,
    "oldPrice": 4200000,
    "stock": 9,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/imgi-38-giay-tennis-barricade-14-trang-jr1765-06-standard.jpg?v=1774255537600"
    ]
  },
  {
    "id": 117,
    "name": "Giày chạy",
    "code": "JQ6949",
    "brand": "adidas",
    "category": "giay",
    "gender": "Nữ",
    "price": 880000,
    "oldPrice": 2200000,
    "stock": 7,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/ultrarun-5-w-running-shoes-purple-jq6949-hm7-jpg-jpeg.jpg?v=1765781738670"
    ]
  },
  {
    "id": 118,
    "name": "Áo cộc tay có cổ",
    "code": "GQ121MTS21-BLCK",
    "brand": "lacoste",
    "category": "ao",
    "gender": "Nam",
    "price": 1174254,
    "oldPrice": 2935636,
    "stock": 6,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/gq121mts21blckl1470cf556964349.jpg?v=1748838099677"
    ]
  },
  {
    "id": 119,
    "name": "Áo cộc tay có cổ",
    "code": "LG5SHS16MV-BG00",
    "brand": "lacoste",
    "category": "ao",
    "gender": "Nam",
    "price": 938618,
    "oldPrice": 2346545,
    "stock": 8,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/nam00620462e0734b08343e9a86fe7.jpg?v=1751686467493"
    ]
  },
  {
    "id": 120,
    "name": "Áo cộc tay có cổ",
    "code": "QQ113TTS32-WHT0",
    "brand": "lacoste",
    "category": "ao",
    "gender": "Nam",
    "price": 702982,
    "oldPrice": 1757455,
    "stock": 2,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/8lecoq01554f74f9bcfbab94764b96.jpg?v=1752725571513"
    ]
  },
  {
    "id": 121,
    "name": "Áo khoác nỉ",
    "code": "LT4FJG11MV-BK00",
    "brand": "lacoste",
    "category": "ao",
    "gender": "Nam",
    "price": 977891,
    "oldPrice": 2444727,
    "stock": 6,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/lt4fjg11mv-bk00-1.jpg?v=1727151276900"
    ]
  },
  {
    "id": 122,
    "name": "Quần nỉ",
    "code": "LT4FPZ11MV-BK00",
    "brand": "lacoste",
    "category": "quan",
    "gender": "Nam",
    "price": 781527,
    "oldPrice": 1953818,
    "stock": 9,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/lt4fpz11mv-bk00-1.jpg?v=1727151232160"
    ]
  },
  {
    "id": 123,
    "name": "Áo cộc tay có cổ",
    "code": "GQ121MTS35-WHTE",
    "brand": "lacoste",
    "category": "ao",
    "gender": "Nam",
    "price": 1134982,
    "oldPrice": 2837455,
    "stock": 10,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/gq121mts35whtel14070792b576044.jpg?v=1748838098733"
    ]
  },
  {
    "id": 124,
    "name": "Áo thun dài tay có cổ",
    "code": "LG4FLS03MV-WH00",
    "brand": "lacoste",
    "category": "ao",
    "gender": "Nam",
    "price": 781527,
    "oldPrice": 1953818,
    "stock": 2,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/lg4fls03mvwh001611dec5bd24647b.jpg?v=1736502061170"
    ]
  },
  {
    "id": 125,
    "name": "Áo cộc tay có cổ",
    "code": "GQ121MTS32-BLCK",
    "brand": "lacoste",
    "category": "ao",
    "gender": "Nam",
    "price": 1409891,
    "oldPrice": 3524727,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/gq121mts32blckl16aa72ee8b39741.jpg?v=1748838099227"
    ]
  },
  {
    "id": 126,
    "name": "Áo thun dài tay có cổ",
    "code": "L243MCNA1009-A02",
    "brand": "lacoste",
    "category": "ao",
    "gender": "Nam",
    "price": 1370618,
    "oldPrice": 3426545,
    "stock": 3,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/l243mcna1009a0214f4196d3c0ff41-49a5a829-fd32-4f7d-82ea-f699c847546f.jpg?v=1736502054293"
    ]
  },
  {
    "id": 127,
    "name": "Áo phao lông vũ",
    "code": "LG4FWB06MV-NV00",
    "brand": "lacoste",
    "category": "ao",
    "gender": "Nam",
    "price": 1174254,
    "oldPrice": 2935636,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/lg4fwb06mvnv00l18e273b4b294a4f.jpg?v=1759982648560"
    ]
  },
  {
    "id": 128,
    "name": "Áo khoác gió",
    "code": "LG4FWB00MV-BK00",
    "brand": "lacoste",
    "category": "ao",
    "gender": "Nam",
    "price": 938618,
    "oldPrice": 2346545,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/lg4fwb00mvbk0019b3435d4ca6a428-0e0efecf-260d-44af-b210-8de87bccdc06.jpg?v=1736502058050"
    ]
  },
  {
    "id": 129,
    "name": "Quần nỉ",
    "code": "QP123TFP31-IVY0",
    "brand": "lacoste",
    "category": "quan",
    "gender": "Nam",
    "price": 820800,
    "oldPrice": 2052000,
    "stock": 5,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/bcd0864copy8c81935400d24f92a11-5299e015-6535-4379-8daf-ba025a2ebf43.jpg?v=1733283896300"
    ]
  },
  {
    "id": 130,
    "name": "Quần gió",
    "code": "QP321EFP71-BLK0",
    "brand": "lacoste",
    "category": "quan",
    "gender": "Nam",
    "price": 899346,
    "oldPrice": 2248364,
    "stock": 8,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/3q7a02993a0ad861df9640e28fa744-d52e69db-1ac0-4bde-86ff-e29b15a90495.jpg?v=1733122055413"
    ]
  },
  {
    "id": 131,
    "name": "Quần dài",
    "code": "LG5SLP00MV-BK00",
    "brand": "lacoste",
    "category": "quan",
    "gender": "Nam",
    "price": 860073,
    "oldPrice": 2150182,
    "stock": 8,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc05892c610b127528141bc948877.jpg?v=1760156701573"
    ]
  },
  {
    "id": 132,
    "name": "Quần sooc",
    "code": "LG5FHP10MV-GY00",
    "brand": "lacoste",
    "category": "quan",
    "gender": "Nam",
    "price": 938618,
    "oldPrice": 2346545,
    "stock": 9,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc0554575bcf98a41e04cfd869b87.jpg?v=1760156701357"
    ]
  },
  {
    "id": 133,
    "name": "Quần sooc",
    "code": "LG5FHP10MV-NV00",
    "brand": "lacoste",
    "category": "quan",
    "gender": "Nam",
    "price": 938618,
    "oldPrice": 2346545,
    "stock": 6,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc05927f2a20077864d4b95bf9bed.jpg?v=1760156701270"
    ]
  },
  {
    "id": 134,
    "name": "Áo cộc tay có cổ",
    "code": "LG5FHS11MV-WH00",
    "brand": "lacoste",
    "category": "ao",
    "gender": "Nam",
    "price": 899346,
    "oldPrice": 2248364,
    "stock": 1,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc0519502986e2e73ea4766876926.jpg?v=1760156701777"
    ]
  },
  {
    "id": 135,
    "name": "Quần nỉ",
    "code": "QQ123EFP11-BLK0",
    "brand": "lacoste",
    "category": "quan",
    "gender": "Nam",
    "price": 899346,
    "oldPrice": 2248364,
    "stock": 1,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc00597d8a0c1292b64462ca8269b.jpg?v=1759982649620"
    ]
  },
  {
    "id": 136,
    "name": "Áo gió có mũ",
    "code": "AFDU163-6V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 663709,
    "oldPrice": 1659273,
    "stock": 8,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/0285adadec972fadc8712702d01957.jpg?v=1734080407610"
    ]
  },
  {
    "id": 137,
    "name": "Quần short chun poly",
    "code": "AKSV089-1V",
    "brand": "lining",
    "category": "quan",
    "gender": "Nam",
    "price": 349527,
    "oldPrice": 873818,
    "stock": 1,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/838cf6c9dcb6ec8323bf74479672a1.jpg?v=1744701690600"
    ]
  },
  {
    "id": 138,
    "name": "Quần short cạp",
    "code": "AKSV735-1V",
    "brand": "lining",
    "category": "quan",
    "gender": "Nam",
    "price": 467346,
    "oldPrice": 1168364,
    "stock": 4,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/aksv7351v14e656e1bfb9a4840a06c.jpg?v=1748253099277"
    ]
  },
  {
    "id": 139,
    "name": "Áo polo poly",
    "code": "APLV647-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 373091,
    "oldPrice": 932727,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/aplv6471v1bd2eb5e76b6d44259f23.jpg?v=1749435669130"
    ]
  },
  {
    "id": 140,
    "name": "Áo T-shirt poly",
    "code": "ATSV083-2V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 349527,
    "oldPrice": 873818,
    "stock": 8,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/d9700af7670a066a37d97b2aabc4f7.jpg?v=1746694003750"
    ]
  },
  {
    "id": 141,
    "name": "Áo T-shirt poly",
    "code": "ATSV083-3V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 349527,
    "oldPrice": 873818,
    "stock": 7,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/76d19520d09b31f7d8ae4c1c01ccb8.jpg?v=1746694003617"
    ]
  },
  {
    "id": 142,
    "name": "Quần gió ống suông",
    "code": "AYKU459-2V",
    "brand": "lining",
    "category": "quan",
    "gender": "Nam",
    "price": 388800,
    "oldPrice": 972000,
    "stock": 7,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/79a802677ba3ab89b6d4def81529fd.jpg?v=1734080414403"
    ]
  },
  {
    "id": 143,
    "name": "Quần dài golf",
    "code": "AYKU667-1V",
    "brand": "lining",
    "category": "quan",
    "gender": "Nam",
    "price": 585164,
    "oldPrice": 1462909,
    "stock": 7,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/bcd0836d6f16377bac44b03ae6fec3-29d09a9e-5113-405b-ad18-01d580f16441.jpg?v=1734494148727"
    ]
  },
  {
    "id": 144,
    "name": "Áo T-shirt poly",
    "code": "P-AAYV043-3V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 227782,
    "oldPrice": 569455,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://picsum.photos/seed/P-AAYV043-3V/500/650"
    ]
  },
  {
    "id": 145,
    "name": "Áo gió có mũ",
    "code": "AFDU389-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 663709,
    "oldPrice": 1659273,
    "stock": 6,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc00478b39157246222483c96d5c6.jpg?v=1734080407477"
    ]
  },
  {
    "id": 146,
    "name": "Áo gió có mũ",
    "code": "AFDU459-4V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 506618,
    "oldPrice": 1266545,
    "stock": 12,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/1964313d52f2af2733799f8ba2d010-56211d05-8791-459e-b90a-814daa42739d.jpg?v=1734494145420"
    ]
  },
  {
    "id": 147,
    "name": "Áo gió có mũ",
    "code": "AFDU089-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 663709,
    "oldPrice": 1659273,
    "stock": 8,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://product.hstatic.net/1000312752/product/dsc00478_b39157246222483c96d5c62d07461ccc.jpg"
    ]
  },
  {
    "id": 148,
    "name": "Áo gió có mũ",
    "code": "AFDU389-5V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 663709,
    "oldPrice": 1659273,
    "stock": 14,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc00588dfe69698531f45d9b69024.jpg?v=1734080407370"
    ]
  },
  {
    "id": 149,
    "name": "Áo polo poly",
    "code": "APLV641-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 428073,
    "oldPrice": 1070182,
    "stock": 9,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/aplv6411v18297d280f3d44208a45c.jpg?v=1749435665740"
    ]
  },
  {
    "id": 150,
    "name": "Áo gió có mũ",
    "code": "AFDU089-3V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 663709,
    "oldPrice": 1659273,
    "stock": 9,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/faec0766f3d39be620be8d3ef34a60-9f60daf2-b7a4-45cb-8578-bbe082f801f2.jpg?v=1734494145630"
    ]
  },
  {
    "id": 151,
    "name": "Quần gió bo gấu",
    "code": "AYKU461-4V",
    "brand": "lining",
    "category": "quan",
    "gender": "Nam",
    "price": 388800,
    "oldPrice": 972000,
    "stock": 11,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc00831b005427ac65d4d08acadc5.jpg?v=1733905941607"
    ]
  },
  {
    "id": 152,
    "name": "Áo gió có mũ",
    "code": "AFDUD69-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 781527,
    "oldPrice": 1953818,
    "stock": 9,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/xx08727566e7a7d4bee4517b38f707-f40decdc-7ed0-4b0d-801d-f96a8be20a3e.jpg?v=1740447033687"
    ]
  },
  {
    "id": 153,
    "name": "Áo gió có mũ",
    "code": "AJDU335-3V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 1174254,
    "oldPrice": 2935636,
    "stock": 7,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/ajdu3353v1242679252dd1412c8aea.jpg?v=1741251648410"
    ]
  },
  {
    "id": 154,
    "name": "Áo khoác nỉ có mũ",
    "code": "AWDU867-2V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 781527,
    "oldPrice": 1953818,
    "stock": 9,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/27c3ab22150e4c8e89c26fe90e1e18.jpg?v=1733905937843"
    ]
  },
  {
    "id": 155,
    "name": "Quần gió ống suông",
    "code": "AYKU103-2V",
    "brand": "lining",
    "category": "quan",
    "gender": "Nam",
    "price": 506618,
    "oldPrice": 1266545,
    "stock": 7,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/df94a51db401e2014ccfecaae005ea.jpg?v=1734080410870"
    ]
  },
  {
    "id": 156,
    "name": "Áo khoác nỉ có mũ",
    "code": "AWDU181-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 742254,
    "oldPrice": 1855636,
    "stock": 11,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/0061a07f32da0927acabce1b29c35e.jpg?v=1733905938340"
    ]
  },
  {
    "id": 157,
    "name": "Áo khoác nỉ có mũ",
    "code": "AWDU181-8V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 742254,
    "oldPrice": 1855636,
    "stock": 10,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/3df09fe64868f7526ef6398bd13343-11987e40-6e08-4eec-8934-707b0e04802c.jpg?v=1740447032520"
    ]
  },
  {
    "id": 158,
    "name": "Áo polo poly",
    "code": "APLV537-6V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 545891,
    "oldPrice": 1364727,
    "stock": 6,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://product.hstatic.net/1000312752/product/aplv537-6v__1__6c557dd143094969b5fc6d8e426c29f4.jpg"
    ]
  },
  {
    "id": 159,
    "name": "Áo T-shirt poly",
    "code": "ATSV083-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 349527,
    "oldPrice": 873818,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://product.hstatic.net/1000312752/product/atsv083-1_e00ff8961867410aa925db49258671ab.jpg"
    ]
  },
  {
    "id": 160,
    "name": "Quần short chun poly",
    "code": "AKSV803-3V",
    "brand": "lining",
    "category": "quan",
    "gender": "Nam",
    "price": 467346,
    "oldPrice": 1168364,
    "stock": 10,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://cdn.hstatic.net/products/1000312752/aksv803-3v__1__ec5c7a9ab62c46d1b7dd9eb707fa4a32.jpg"
    ]
  },
  {
    "id": 161,
    "name": "Áo polo poly",
    "code": "APLV667-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 663709,
    "oldPrice": 1659273,
    "stock": 7,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://product.hstatic.net/1000312752/product/aplv667-1v__1__32e7c9f2698149ef86e43c29cca73755.jpg"
    ]
  },
  {
    "id": 162,
    "name": "Áo T-shirt poly",
    "code": "ATSV723-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 333818,
    "oldPrice": 834545,
    "stock": 9,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://product.hstatic.net/1000312752/product/atsv723-1v__1__5887a53d9eee4f5ba5edbef121a7334a.jpg"
    ]
  },
  {
    "id": 163,
    "name": "Quần short cạp",
    "code": "AKSV739-2V",
    "brand": "lining",
    "category": "quan",
    "gender": "Nam",
    "price": 506618,
    "oldPrice": 1266545,
    "stock": 10,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/aksv7392v19ae38285f6a14949bb94.jpg?v=1753320461777"
    ]
  },
  {
    "id": 164,
    "name": "Áo polo poly",
    "code": "APLV649-2V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 388800,
    "oldPrice": 972000,
    "stock": 7,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://product.hstatic.net/1000312752/product/aplv649-2v__1__b7f606459ea945199b41bbad31d0d182.jpg"
    ]
  },
  {
    "id": 165,
    "name": "Áo polo poly",
    "code": "APLV035-8V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 506618,
    "oldPrice": 1266545,
    "stock": 7,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://product.hstatic.net/1000312752/product/aplv035-8v__1__2071cc4391324e509f3952b67751a72c.jpg"
    ]
  },
  {
    "id": 166,
    "name": "Áo polo poly",
    "code": "APLV649-3V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 388800,
    "oldPrice": 972000,
    "stock": 7,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://product.hstatic.net/1000312752/product/aplv649-3v__1__89215e945c734912a6ed8f35058b31b9.jpg"
    ]
  },
  {
    "id": 167,
    "name": "Áo gió không mũ",
    "code": "P-AFDU465-2V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 467346,
    "oldPrice": 1168364,
    "stock": 3,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc00307766ca054246d446593419b-1c7c9b0d-b116-4790-9127-4ad477e0b045.jpg?v=1734494145207"
    ]
  },
  {
    "id": 168,
    "name": "Áo T-shirt poly",
    "code": "ATSV727-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 310254,
    "oldPrice": 775636,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc054079b9c3cae45ce4a9197937a.jpg?v=1755506765647"
    ]
  },
  {
    "id": 169,
    "name": "Quần short chun poly",
    "code": "AKSV825-4V",
    "brand": "lining",
    "category": "quan",
    "gender": "Nam",
    "price": 428073,
    "oldPrice": 1070182,
    "stock": 6,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/lnq2s8q2s102407048391698d40865.jpg?v=1755506777457"
    ]
  },
  {
    "id": 170,
    "name": "Quần short chun poly",
    "code": "AKSV757-3V",
    "brand": "lining",
    "category": "quan",
    "gender": "Nam",
    "price": 506618,
    "oldPrice": 1266545,
    "stock": 5,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/lnq2s8q2s102407047589a792951d8.jpg?v=1755506770713"
    ]
  },
  {
    "id": 171,
    "name": "Áo gió không mũ",
    "code": "P-AFDU465-3V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 467346,
    "oldPrice": 1168364,
    "stock": 2,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc003347ae982ae92d042dc8de241-28d24714-cc62-4f0f-8506-5dc47889fbe9.jpg?v=1734494145113"
    ]
  },
  {
    "id": 172,
    "name": "Áo polo poly",
    "code": "APLV763-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 608727,
    "oldPrice": 1521818,
    "stock": 7,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc05514cef54b93a761496294a5cb.jpg?v=1757562569420"
    ]
  },
  {
    "id": 173,
    "name": "Áo polo poly",
    "code": "APLV763-2V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 608727,
    "oldPrice": 1521818,
    "stock": 6,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc05541c2e92637c0fb45679bc486.jpg?v=1757562569290"
    ]
  },
  {
    "id": 174,
    "name": "Áo polo poly",
    "code": "APLV763-3V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 608727,
    "oldPrice": 1521818,
    "stock": 7,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc0548636c05ab52d7d4d5ca0f567.jpg?v=1757562569190"
    ]
  },
  {
    "id": 175,
    "name": "Áo polo poly",
    "code": "APLV763-7V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 608727,
    "oldPrice": 1521818,
    "stock": 7,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc05502c2f53dbcb9784e24989e7d.jpg?v=1757562567387"
    ]
  },
  {
    "id": 176,
    "name": "Áo T-shirt cotton",
    "code": "AHSV483-4V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 333818,
    "oldPrice": 834545,
    "stock": 11,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc97625a07798c12f9441199e7046.jpg?v=1758786139373"
    ]
  },
  {
    "id": 177,
    "name": "Quần short cạp",
    "code": "AKSV811-1V",
    "brand": "lining",
    "category": "quan",
    "gender": "Nam",
    "price": 506618,
    "oldPrice": 1266545,
    "stock": 9,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/lnq2s8q2s102407047208f4a9980f3-8110401f-aaaa-4ff1-9975-5f5bb77ab2c4.jpg?v=1762081486483",
      "#ERROR!"
    ]
  },
  {
    "id": 178,
    "name": "Quần short cạp",
    "code": "AKSV811-2V",
    "brand": "lining",
    "category": "quan",
    "gender": "Nam",
    "price": 506618,
    "oldPrice": 1266545,
    "stock": 14,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/lnq2s8q2s10240704793f4e6e70963-4d30ec5e-6aad-491e-a779-f84eaccde3e3.jpg?v=1762081486400",
      "#ERROR!"
    ]
  },
  {
    "id": 179,
    "name": "Quần short cạp",
    "code": "AKSV811-3V",
    "brand": "lining",
    "category": "quan",
    "gender": "Nam",
    "price": 506618,
    "oldPrice": 1266545,
    "stock": 10,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/lnq2s8q2s10240704707c273724f7e-1f714410-d7c7-4d7f-93ff-f93c978edff9.jpg?v=1762081487050",
      "#ERROR!"
    ]
  },
  {
    "id": 180,
    "name": "Áo polo poly",
    "code": "APLV691-2V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 506618,
    "oldPrice": 1266545,
    "stock": 9,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc05458cc66f513c8f044578ecaec-af74d79c-000b-4153-be67-9d1058bd1127.jpg?v=1762081486843",
      "#ERROR!"
    ]
  },
  {
    "id": 181,
    "name": "Áo T-shirt poly",
    "code": "ATSV785-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 545891,
    "oldPrice": 1364727,
    "stock": 6,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc054200bdbe4fef81b4721a4bf11-96498916-7d40-40d6-b999-1813dbaea574.jpg?v=1762081486640",
      "#ERROR!"
    ]
  },
  {
    "id": 182,
    "name": "Áo T-shirt poly",
    "code": "ATSV785-2V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 545891,
    "oldPrice": 1364727,
    "stock": 11,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc053009c54fcc36c5b4ac1bfe4a5-483d0a2e-7b54-4107-a127-2105147363d8.jpg?v=1762081486560",
      "#ERROR!"
    ]
  },
  {
    "id": 183,
    "name": "Quần short chun poly",
    "code": "AAPV073-3V",
    "brand": "lining",
    "category": "quan",
    "gender": "Nam",
    "price": 388800,
    "oldPrice": 972000,
    "stock": 6,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/c1eb9d2159065bac451e20008abd28-1672cdd6-bcf8-4efc-ae01-5ef1d69aaad4.jpg?v=1762081499270",
      "#ERROR!"
    ]
  },
  {
    "id": 184,
    "name": "Áo T-shirt poly",
    "code": "ATSVA29-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 270982,
    "oldPrice": 677455,
    "stock": 4,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://picsum.photos/seed/ATSVA29-1V/500/650"
    ]
  },
  {
    "id": 185,
    "name": "Áo polo poly",
    "code": "APLV669-2V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 467346,
    "oldPrice": 1168364,
    "stock": 7,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc05018c7e28941dfb34cd0883d3d.jpg?v=1772154749350"
    ]
  },
  {
    "id": 186,
    "name": "Áo T-shirt poly",
    "code": "ATSV369-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 388800,
    "oldPrice": 972000,
    "stock": 4,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/ee0d7e4731896f9b82097d565be87c.jpg?v=1773736067830"
    ]
  },
  {
    "id": 187,
    "name": "Áo polo poly",
    "code": "APLV285-5V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 467346,
    "oldPrice": 1168364,
    "stock": 6,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/ea5b6e4b7cd8a08ed36160581a1d86.jpg?v=1773736068253"
    ]
  },
  {
    "id": 188,
    "name": "Áo polo poly",
    "code": "APLV669-3V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 467346,
    "oldPrice": 1168364,
    "stock": 6,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc050406f62ddb815da4499930ba7.jpg?v=1773303515660"
    ]
  },
  {
    "id": 189,
    "name": "Áo polo poly",
    "code": "APLV285-6V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 467346,
    "oldPrice": 1168364,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/3164468adef982f1f9b82681798b5f.jpg?v=1773736068170"
    ]
  },
  {
    "id": 190,
    "name": "Áo polo poly",
    "code": "APLV973-4V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 506618,
    "oldPrice": 1266545,
    "stock": 7,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc05071550f9e599e0244598ee8c1.jpg?v=1773303515423"
    ]
  },
  {
    "id": 191,
    "name": "Áo polo poly",
    "code": "APLV973-3V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nam",
    "price": 506618,
    "oldPrice": 1266545,
    "stock": 11,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc05076d78aebecba624d3bbb3fae.jpg?v=1773303515540"
    ]
  },
  {
    "id": 192,
    "name": "Quần short chun poly",
    "code": "AKSV178-5V",
    "brand": "lining",
    "category": "quan",
    "gender": "Nữ",
    "price": 333818,
    "oldPrice": 834545,
    "stock": 4,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/aksv1785v1e343e9ed7d3b4af3baf1.jpg?v=1749435669583"
    ]
  },
  {
    "id": 193,
    "name": "Quần short chun poly",
    "code": "AKSV736-1V",
    "brand": "lining",
    "category": "quan",
    "gender": "Nữ",
    "price": 349527,
    "oldPrice": 873818,
    "stock": 9,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/aksv7361v13bbe37c2ecb2437d8188.jpg?v=1749435669377"
    ]
  },
  {
    "id": 194,
    "name": "Áo polo poly",
    "code": "APLV016-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 310254,
    "oldPrice": 775636,
    "stock": 8,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/aplv0161v12fdf028b32a94df19486.jpg?v=1749435669297"
    ]
  },
  {
    "id": 195,
    "name": "Áo polo poly",
    "code": "APLV264-4V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 388800,
    "oldPrice": 972000,
    "stock": 6,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/aplv2644v147d034274ad24667a57b.jpg?v=1749435666073"
    ]
  },
  {
    "id": 196,
    "name": "Áo T-shirt poly",
    "code": "ATSV100-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 333818,
    "oldPrice": 834545,
    "stock": 6,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/atsv1001v11bb90ad69b6a4b9aae6f.jpg?v=1749435668057"
    ]
  },
  {
    "id": 197,
    "name": "Áo T-shirt poly",
    "code": "ATSV100-5V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 333818,
    "oldPrice": 834545,
    "stock": 17,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/atsv1005v164d813f5acb246c5ae66.jpg?v=1749435667947"
    ]
  },
  {
    "id": 198,
    "name": "Quần nỉ bo gấu",
    "code": "AKLU134-5V",
    "brand": "lining",
    "category": "quan",
    "gender": "Nữ",
    "price": 467346,
    "oldPrice": 1168364,
    "stock": 8,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/52a8bb6274433abd2da65ce1158d5f.jpg?v=1734080412660"
    ]
  },
  {
    "id": 199,
    "name": "Áo khoác nỉ không mũ",
    "code": "AWDU156-6V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 624436,
    "oldPrice": 1561091,
    "stock": 13,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/3q7a2201da4a1c40ae3546f6a83b65-48ec8b1c-f220-4d52-b1e3-cc56cda53552.jpg?v=1740447032617"
    ]
  },
  {
    "id": 200,
    "name": "Áo nỉ cổ tròn có mũ",
    "code": "AWDU600-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 624436,
    "oldPrice": 1561091,
    "stock": 7,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/3q7a4562bb5190f567db4e09bad1b2-59348ef9-5e48-49e1-ad8d-7edce3310537.jpg?v=1740453567557"
    ]
  },
  {
    "id": 201,
    "name": "Áo khoác nỉ không mũ",
    "code": "AWDUJ12-2V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 702982,
    "oldPrice": 1757455,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/xx08676e90fc9f7cb11447ba5e7bbe-badd6eff-496f-45e1-a349-aee5478c7b5c.jpg?v=1740447033593"
    ]
  },
  {
    "id": 202,
    "name": "Quần nỉ ống suông",
    "code": "AYKUA84-2V",
    "brand": "lining",
    "category": "quan",
    "gender": "Nữ",
    "price": 585164,
    "oldPrice": 1462909,
    "stock": 5,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/xx05184d8ae666899d9401a9e17c35.jpg?v=1737013909637"
    ]
  },
  {
    "id": 203,
    "name": "Áo nỉ cổ tròn có mũ",
    "code": "AWDU600-2V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 624436,
    "oldPrice": 1561091,
    "stock": 8,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/3q7a4533d6d4307fef5b44adaa5ee2-cf4628f7-4ab7-4329-ad67-136df663fceb.jpg?v=1740453511227"
    ]
  },
  {
    "id": 204,
    "name": "Áo gió có mũ",
    "code": "AFDU532-5V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 781527,
    "oldPrice": 1953818,
    "stock": 11,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/afdu5325v2a8db61d443e84809b849-5db360e1-686c-42e5-8aa2-574c0c689cf0.jpg?v=1734494153023"
    ]
  },
  {
    "id": 205,
    "name": "Áo gió có mũ",
    "code": "AFDU532-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 781527,
    "oldPrice": 1953818,
    "stock": 11,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/afdu5321v25c3fc7f2fe384e5f883f-2bbb93df-21d6-4eb8-8f30-212ce49a7fa6.jpg?v=1734494153100"
    ]
  },
  {
    "id": 206,
    "name": "Áo polo poly",
    "code": "APLV650-2V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 294546,
    "oldPrice": 736364,
    "stock": 10,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/aplv6502v1950c173e582341d29af9.jpg?v=1749435668697"
    ]
  },
  {
    "id": 207,
    "name": "Quần nỉ bo gấu",
    "code": "AKLU140-4V",
    "brand": "lining",
    "category": "quan",
    "gender": "Nữ",
    "price": 467346,
    "oldPrice": 1168364,
    "stock": 10,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/ad4438eb456468250bbbff49c10103-5b7ae322-6334-4b47-a2f9-aabddcd96c4e.jpg?v=1734494151557"
    ]
  },
  {
    "id": 208,
    "name": "Áo T-shirt cotton",
    "code": "ATSV710-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 255273,
    "oldPrice": 638182,
    "stock": 6,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/atsv7101v10d397372e50441a5aaab.jpg?v=1751345781567"
    ]
  },
  {
    "id": 209,
    "name": "Áo nỉ cổ tròn không mũ",
    "code": "AWDU150-4V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 624436,
    "oldPrice": 1561091,
    "stock": 6,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/f01a6387556d7af6fe596430141a54.jpg?v=1734080414190"
    ]
  },
  {
    "id": 210,
    "name": "Áo nỉ cổ tròn không mũ",
    "code": "AWDU150-6V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 624436,
    "oldPrice": 1561091,
    "stock": 7,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/89d5df56882ec24cd01aecb4f3fa03.jpg?v=1734080414107"
    ]
  },
  {
    "id": 211,
    "name": "Áo khoác nỉ không mũ",
    "code": "AWDU838-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 628364,
    "oldPrice": 1570909,
    "stock": 10,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/o1cn013zz65l29gtwjlb5yl-2-item-pic.png?v=1768622635363"
    ]
  },
  {
    "id": 212,
    "name": "Quần nỉ ống suông",
    "code": "AYKUA84-1V",
    "brand": "lining",
    "category": "quan",
    "gender": "Nữ",
    "price": 585164,
    "oldPrice": 1462909,
    "stock": 5,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/xx05203439939d634bc412a8af7cb3.jpg?v=1737013909817"
    ]
  },
  {
    "id": 213,
    "name": "Áo nỉ có cổ không mũ",
    "code": "AWDU604-2V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 624436,
    "oldPrice": 1561091,
    "stock": 7,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/xx050349d43bd2246bc4173930451c-8b70201c-5c36-42b3-8465-5c8d99ee4f12.jpg?v=1734494150597"
    ]
  },
  {
    "id": 214,
    "name": "Áo gió không mũ",
    "code": "AFMU002-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 938618,
    "oldPrice": 2346545,
    "stock": 10,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://picsum.photos/seed/AFMU002-1V/500/650"
    ]
  },
  {
    "id": 215,
    "name": "Áo T-shirt poly",
    "code": "ATSV344-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 310254,
    "oldPrice": 775636,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/atsv3441v199d62beee0824db0a480.jpg?v=1753320461103"
    ]
  },
  {
    "id": 216,
    "name": "Áo T-shirt poly",
    "code": "ATSV708-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 255273,
    "oldPrice": 638182,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/atsv7081v1fff8d2958cf645e5b82a.jpg?v=1751345779943"
    ]
  },
  {
    "id": 217,
    "name": "Áo T-shirt poly",
    "code": "ATSV708-2V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 255273,
    "oldPrice": 638182,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/atsv7082v1cbcd651f79c144db8f0e.jpg?v=1751345779843"
    ]
  },
  {
    "id": 218,
    "name": "Áo T-shirt poly",
    "code": "ATSV724-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 270982,
    "oldPrice": 677455,
    "stock": 7,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/atsv7241v172a4ff3b0c1248f3be78.jpg?v=1751345781377"
    ]
  },
  {
    "id": 219,
    "name": "Áo khoác nỉ không mũ",
    "code": "AWDU442-3V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 624436,
    "oldPrice": 1561091,
    "stock": 4,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/xx00142a42021bff89b41eabb97c99.jpg?v=1736391285173"
    ]
  },
  {
    "id": 220,
    "name": "Áo nỉ cổ tròn không mũ",
    "code": "AWDU456-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 663709,
    "oldPrice": 1659273,
    "stock": 8,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/192796df0503bf838113b5c9bedc08.jpg?v=1766721754543",
      "#ERROR!"
    ]
  },
  {
    "id": 221,
    "name": "Áo khoác nỉ không mũ",
    "code": "AWDU838-2V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 628364,
    "oldPrice": 1570909,
    "stock": 10,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/awdu8382v13c2f9cf89fb54e7d914a-7aead4de-a353-49d5-ade0-434118ac0aff.jpg?v=1734494146737"
    ]
  },
  {
    "id": 222,
    "name": "Quần short chun cotton",
    "code": "AKSV806-1V",
    "brand": "lining",
    "category": "quan",
    "gender": "Nữ",
    "price": 255273,
    "oldPrice": 638182,
    "stock": 5,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/aksv8061v1bb2e5ebc1ad04cd0bb4d.jpg?v=1753320460497"
    ]
  },
  {
    "id": 223,
    "name": "Quần short chun poly",
    "code": "AKSV814-1V",
    "brand": "lining",
    "category": "quan",
    "gender": "Nữ",
    "price": 231709,
    "oldPrice": 579273,
    "stock": 10,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/aksv8141v2081db380c8f744c6975d.jpg?v=1755506782647"
    ]
  },
  {
    "id": 224,
    "name": "Áo T-shirt poly",
    "code": "ATSV732-2V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 380946,
    "oldPrice": 952364,
    "stock": 6,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/astv7322v27586dcf7bcb34ac3a771.jpg?v=1755506750747"
    ]
  },
  {
    "id": 225,
    "name": "Áo polo poly",
    "code": "APLV692-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 388800,
    "oldPrice": 972000,
    "stock": 7,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/aplv6921v26b7e644ca52243719763.jpg?v=1755506763607"
    ]
  },
  {
    "id": 226,
    "name": "Áo polo poly",
    "code": "APLV690-2V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 349527,
    "oldPrice": 873818,
    "stock": 10,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/aplv6902v3fe48e17691a342048385.jpg?v=1757562569567"
    ]
  },
  {
    "id": 227,
    "name": "Áo T-shirt cotton",
    "code": "AHSV472-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 349527,
    "oldPrice": 873818,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/q3s30889353a875b725214740ae8fa.jpg?v=1758786139040"
    ]
  },
  {
    "id": 228,
    "name": "Áo T-shirt poly",
    "code": "ATSV376-2V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 388800,
    "oldPrice": 972000,
    "stock": 7,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/affb815f450713e4cc5a5b9b2c21ef-260e20d1-1248-4a97-b434-40e6d54923c2.jpg?v=1762081503643",
      "#ERROR!"
    ]
  },
  {
    "id": 229,
    "name": "Áo polo poly",
    "code": "APLV294-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 428073,
    "oldPrice": 1070182,
    "stock": 14,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/3q7a329221851fb95f7e4bd988e2c2-111457d9-1981-4e8c-a816-9f97bb6423bd.jpg?v=1762081505267",
      "#ERROR!"
    ]
  },
  {
    "id": 230,
    "name": "Quần short chun poly",
    "code": "AKSV438-1V",
    "brand": "lining",
    "category": "quan",
    "gender": "Nữ",
    "price": 349527,
    "oldPrice": 873818,
    "stock": 10,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/738e1594b394f5c2c286f98c6e74d8.jpg?v=1766721759270",
      "#ERROR!"
    ]
  },
  {
    "id": 231,
    "name": "Áo T-shirt poly",
    "code": "ATSV998-2V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 388800,
    "oldPrice": 972000,
    "stock": 8,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc0856582bdf48b928f4858b23eba.jpg?v=1767840691923"
    ]
  },
  {
    "id": 232,
    "name": "Chân váy",
    "code": "ASKV438-2V",
    "brand": "lining",
    "category": "quan",
    "gender": "Nữ",
    "price": 506618,
    "oldPrice": 1266545,
    "stock": 7,
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc084992081c500f3074b318bc02a.jpg?v=1767840691733"
    ]
  },
  {
    "id": 233,
    "name": "Áo polo poly",
    "code": "APLVA14-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 388800,
    "oldPrice": 972000,
    "stock": 7,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc04189082211cf0f4e4f2ab20b53.jpg?v=1773303516420"
    ]
  },
  {
    "id": 234,
    "name": "Áo polo poly",
    "code": "APLVA14-2V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 388800,
    "oldPrice": 972000,
    "stock": 4,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc04199a178ef839e9f45b9a95de9.jpg?v=1773303516330"
    ]
  },
  {
    "id": 235,
    "name": "Chân váy",
    "code": "ASKV440-1V",
    "brand": "lining",
    "category": "quan",
    "gender": "Nữ",
    "price": 388800,
    "oldPrice": 972000,
    "stock": 6,
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc0413618f9bb92b41e49d1b2bf03.jpg?v=1773303516153"
    ]
  },
  {
    "id": 236,
    "name": "Chân váy",
    "code": "ASKV440-3V",
    "brand": "lining",
    "category": "quan",
    "gender": "Nữ",
    "price": 388800,
    "oldPrice": 972000,
    "stock": 6,
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc041570bd6d7284a0d4131b05c7e.jpg?v=1773303515980"
    ]
  },
  {
    "id": 237,
    "name": "Áo T-shirt poly",
    "code": "ATSV372-1V",
    "brand": "lining",
    "category": "ao",
    "gender": "Nữ",
    "price": 388800,
    "oldPrice": 972000,
    "stock": 10,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/4345ad51bfe4dc5ca1407a57858570.jpg?v=1773736067443"
    ]
  },
  {
    "id": 238,
    "name": "Balo",
    "code": "ABSU205-2V",
    "brand": "lining",
    "category": "phu-kien",
    "gender": "Unisex",
    "price": 432000,
    "oldPrice": 1080000,
    "stock": 1,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/b12123dd1107d53af1b217530c0281.jpg?v=1735360724960"
    ]
  },
  {
    "id": 239,
    "name": "Balo",
    "code": "ABSU205-3V",
    "brand": "lining",
    "category": "phu-kien",
    "gender": "Unisex",
    "price": 432000,
    "oldPrice": 1080000,
    "stock": 2,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/e55899bb4d8364ad15c5a2188dfa05.jpg?v=1735360724893"
    ]
  },
  {
    "id": 240,
    "name": "Hộp bóng Pickleball 40",
    "code": "P-ACPV003-7",
    "brand": "lining",
    "category": "phu-kien",
    "gender": "Unisex",
    "price": 51054,
    "oldPrice": 127636,
    "stock": 11,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/bong-pick-1.jpg?v=1755481073003"
    ]
  },
  {
    "id": 241,
    "name": "Tất ngắn cổ",
    "code": "P-AWST061-3",
    "brand": "lining",
    "category": "phu-kien",
    "gender": "Unisex",
    "price": 35346,
    "oldPrice": 88364,
    "stock": 4,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://picsum.photos/seed/P-AWST061-3/500/650"
    ]
  },
  {
    "id": 242,
    "name": "Tất ngắn cổ",
    "code": "P-AWST061-4",
    "brand": "lining",
    "category": "phu-kien",
    "gender": "Unisex",
    "price": 35346,
    "oldPrice": 88364,
    "stock": 1,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://picsum.photos/seed/P-AWST061-4/500/650"
    ]
  },
  {
    "id": 243,
    "name": "Ba lô thể thao",
    "code": "ABSV219-1V",
    "brand": "lining",
    "category": "phu-kien",
    "gender": "Unisex",
    "price": 373091,
    "oldPrice": 932727,
    "stock": 3,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/42374963922342af8c25a244f957d5.jpg?v=1763785117403",
      "#ERROR!"
    ]
  },
  {
    "id": 244,
    "name": "Giày chạy CHITU 8",
    "code": "ARPV001-1V",
    "brand": "lining",
    "category": "giay",
    "gender": "Nam",
    "price": 702982,
    "oldPrice": 1757455,
    "stock": 11,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/arpv00113bbfa660640c4bca82f1c8.jpg?v=1746694005337"
    ]
  },
  {
    "id": 245,
    "name": "Giày chạy CHITU 8",
    "code": "ARPV001-16V",
    "brand": "lining",
    "category": "giay",
    "gender": "Nam",
    "price": 702982,
    "oldPrice": 1757455,
    "stock": 6,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/arpv00116v943053e12b433443db96.jpg?v=1749435668437"
    ]
  },
  {
    "id": 246,
    "name": "Giày chạy CHITU 8",
    "code": "ARPV001-11V",
    "brand": "lining",
    "category": "giay",
    "gender": "Nam",
    "price": 702982,
    "oldPrice": 1757455,
    "stock": 12,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/340/361/products/arpv001159d5941097911487989d9d.jpg?v=1746694005337"
    ]
  },
  {
    "id": 247,
    "name": "Giày chạy SUPER LIGHT 22",
    "code": "ARVV001-25V",
    "brand": "lining",
    "category": "giay",
    "gender": "Nam",
    "price": 977891,
    "oldPrice": 2444727,
    "stock": 8,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://product.hstatic.net/1000312752/product/dab8f4c11b28df77a03ff06813939e3a88c77fafd2f46ce667be42b38624078f777ed3_4441acf69ba24b34ab4e552e822677bb.jpg"
    ]
  },
  {
    "id": 248,
    "name": "Giày chạy CHITU 8 PRO",
    "code": "ARPV003-15V",
    "brand": "lining",
    "category": "giay",
    "gender": "Nam",
    "price": 938618,
    "oldPrice": 2346545,
    "stock": 8,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/af7844d2af846283b3cfd078a5f4be.jpg?v=1757562567070"
    ]
  },
  {
    "id": 249,
    "name": "Giày chạy CHITU 8",
    "code": "ARPV001-13V",
    "brand": "lining",
    "category": "giay",
    "gender": "Nam",
    "price": 702982,
    "oldPrice": 1757455,
    "stock": 9,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/0ffb54ab3e5406524f886626e417bf.jpg?v=1757562567290"
    ]
  },
  {
    "id": 250,
    "name": "Giày thời trang",
    "code": "AGLV063-5V",
    "brand": "lining",
    "category": "giay",
    "gender": "Nam",
    "price": 663709,
    "oldPrice": 1659273,
    "stock": 12,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/aglv0635v5102061bf1de7842628f9-a4e5ab9f-7e01-4fde-b690-6f99c1446b78.jpg?v=1764831134023",
      "#ERROR!"
    ]
  },
  {
    "id": 251,
    "name": "Giày thời trang",
    "code": "AGLV063-3V",
    "brand": "lining",
    "category": "giay",
    "gender": "Nam",
    "price": 663709,
    "oldPrice": 1659273,
    "stock": 13,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/44735bed44f80e2a7c9d43b54affa0-46c20857-f7f8-4970-ac46-c55e429b8a4e.jpg?v=1764831134153",
      "#ERROR!"
    ]
  },
  {
    "id": 252,
    "name": "Giày thời trang",
    "code": "AGCV269-1V",
    "brand": "lining",
    "category": "giay",
    "gender": "Nam",
    "price": 663709,
    "oldPrice": 1659273,
    "stock": 6,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/58ef97afbdf436d126f294d0151ee9.jpg?v=1766721755440",
      "#ERROR!"
    ]
  },
  {
    "id": 253,
    "name": "Giày thời trang",
    "code": "AGLV063-2V",
    "brand": "lining",
    "category": "giay",
    "gender": "Nam",
    "price": 663709,
    "oldPrice": 1659273,
    "stock": 8,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/aglv0632v510019ea771d9c48a5974.jpg?v=1766721755237",
      "#ERROR!"
    ]
  },
  {
    "id": 254,
    "name": "Giày thời trang",
    "code": "AGLV063-4V",
    "brand": "lining",
    "category": "giay",
    "gender": "Nam",
    "price": 663709,
    "oldPrice": 1659273,
    "stock": 9,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/aglv0634v51ca88db1a99ef401c857.jpg?v=1766721755143",
      "#ERROR!"
    ]
  },
  {
    "id": 255,
    "name": "Giày chạy",
    "code": "ARSV038-11V",
    "brand": "lining",
    "category": "giay",
    "gender": "Nữ",
    "price": 545891,
    "oldPrice": 1364727,
    "stock": 7,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/xx01411aa7ed28b8f7e49669d60ead.jpg?v=1743500644957"
    ]
  },
  {
    "id": 256,
    "name": "Giày chạy SUPER LIGHT 22",
    "code": "ARVV002-14V",
    "brand": "lining",
    "category": "giay",
    "gender": "Nữ",
    "price": 977891,
    "oldPrice": 2444727,
    "stock": 11,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/290c57ef4cc15814ce8b797e171ede.jpg?v=1744701689780"
    ]
  },
  {
    "id": 257,
    "name": "Giày chạy SUPER LIGHT 22",
    "code": "ARVV002-40V",
    "brand": "lining",
    "category": "giay",
    "gender": "Nữ",
    "price": 977891,
    "oldPrice": 2444727,
    "stock": 9,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/xx02063982b9d5f44c546ba89487d3.jpg?v=1744701689653"
    ]
  },
  {
    "id": 258,
    "name": "Giày chạy CHITU 8",
    "code": "ARPV004-1V",
    "brand": "lining",
    "category": "giay",
    "gender": "Nữ",
    "price": 702982,
    "oldPrice": 1757455,
    "stock": 9,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/arpv004148c2e550954146a2a11ab2.jpg?v=1746694004997"
    ]
  },
  {
    "id": 259,
    "name": "Giày thời trang SOFT GO 2 KNIT",
    "code": "AGVV018-9V",
    "brand": "lining",
    "category": "giay",
    "gender": "Nữ",
    "price": 663709,
    "oldPrice": 1659273,
    "stock": 8,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/d0c9d851cb9bd5d757dd352d9652bf.jpg?v=1741251648787"
    ]
  },
  {
    "id": 260,
    "name": "Giày chạy CHITU 8",
    "code": "ARPV004-5V",
    "brand": "lining",
    "category": "giay",
    "gender": "Nữ",
    "price": 702982,
    "oldPrice": 1757455,
    "stock": 9,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/arpv00453c509231e71b43f7b3dcef.jpg?v=1746694004860"
    ]
  },
  {
    "id": 261,
    "name": "Giày chạy SUPER LIGHT 22",
    "code": "ARVV002-5V",
    "brand": "lining",
    "category": "giay",
    "gender": "Nữ",
    "price": 977891,
    "oldPrice": 2444727,
    "stock": 7,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/ee0286b848a8f6b1e3f28698122834.jpg?v=1746694004690"
    ]
  },
  {
    "id": 262,
    "name": "Giày thời trang",
    "code": "AGCV270-2V",
    "brand": "lining",
    "category": "giay",
    "gender": "Nữ",
    "price": 663709,
    "oldPrice": 1659273,
    "stock": 8,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/agcv2702v515a9ea860687444daae2.jpg?v=1766721759477",
      "#ERROR!"
    ]
  },
  {
    "id": 263,
    "name": "Giày thời trang",
    "code": "AGCV458-1V",
    "brand": "lining",
    "category": "giay",
    "gender": "Nữ",
    "price": 545891,
    "oldPrice": 1364727,
    "stock": 10,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/agcv4581v514bf38fca24f64ee3985.jpg?v=1766721759377",
      "#ERROR!"
    ]
  },
  {
    "id": 264,
    "name": "Quần gió",
    "code": "W552432005B-2C",
    "brand": "361-degrees",
    "category": "quan",
    "gender": "Nam",
    "price": 388800,
    "oldPrice": 972000,
    "stock": 11,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/w552432005b2c13bd874d867634652.jpg?v=1734315455357"
    ]
  },
  {
    "id": 265,
    "name": "Áo T-shirt Poly",
    "code": "W552529002A-2C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nam",
    "price": 270982,
    "oldPrice": 677455,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/361091056be24185e5b6409a80b371.jpg?v=1750124846277"
    ]
  },
  {
    "id": 266,
    "name": "Áo T-shirt Poly",
    "code": "W552529002A-5C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nam",
    "price": 270982,
    "oldPrice": 677455,
    "stock": 6,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/36108955c8e1f97b23bc4e06ac4b6c.jpg?v=1750124846167"
    ]
  },
  {
    "id": 267,
    "name": "Quần short chun cotton",
    "code": "W552529002B-1C",
    "brand": "361-degrees",
    "category": "quan",
    "gender": "Nam",
    "price": 349527,
    "oldPrice": 873818,
    "stock": 7,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/w552529002b1c1fd4407fea03547c5.jpg?v=1748057100730"
    ]
  },
  {
    "id": 268,
    "name": "Quần short cạp poly",
    "code": "T552514705-2C",
    "brand": "361-degrees",
    "category": "quan",
    "gender": "Nam",
    "price": 506618,
    "oldPrice": 1266545,
    "stock": 9,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/t5525147052c14a509fb2ef694915a.jpg?v=1745543591150"
    ]
  },
  {
    "id": 269,
    "name": "Áo khoác nỉ không mũ",
    "code": "W552439003A-3C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nam",
    "price": 585164,
    "oldPrice": 1462909,
    "stock": 1,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/w552439003a3c1a5e6f5d67ec546ba.jpg?v=1734315453663"
    ]
  },
  {
    "id": 270,
    "name": "Quần nỉ",
    "code": "W552439003B-5C",
    "brand": "361-degrees",
    "category": "quan",
    "gender": "Nam",
    "price": 467346,
    "oldPrice": 1168364,
    "stock": 3,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/w552439003b5c1e19ad26b0cb44cbd.jpg?v=1734315455263"
    ]
  },
  {
    "id": 271,
    "name": "Quần short chun cotton",
    "code": "W552529002B-4C",
    "brand": "361-degrees",
    "category": "quan",
    "gender": "Nam",
    "price": 349527,
    "oldPrice": 873818,
    "stock": 11,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/w552529002b4c1acb301353521416d.jpg?v=1748057100230"
    ]
  },
  {
    "id": 272,
    "name": "Áo gió không mũ",
    "code": "W552439004A-3C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nam",
    "price": 585164,
    "oldPrice": 1462909,
    "stock": 4,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/w552439004a3c191055fb573eb4831.jpg?v=1734315453467"
    ]
  },
  {
    "id": 273,
    "name": "Quần gió",
    "code": "W552439004B-3C",
    "brand": "361-degrees",
    "category": "quan",
    "gender": "Nam",
    "price": 373091,
    "oldPrice": 932727,
    "stock": 1,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/w552439004b3c166ccb3870915426d.jpg?v=1734315455930"
    ]
  },
  {
    "id": 274,
    "name": "Quần gió",
    "code": "W552423701-3C",
    "brand": "361-degrees",
    "category": "quan",
    "gender": "Nam",
    "price": 373091,
    "oldPrice": 932727,
    "stock": 1,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/mml7590copy.jpg?v=1747716087277"
    ]
  },
  {
    "id": 275,
    "name": "Áo gió không mũ",
    "code": "W552431602-1C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nam",
    "price": 624436,
    "oldPrice": 1561091,
    "stock": 3,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/3q7a0756d6f4f63bcd374edf984d67.jpg?v=1733906444730"
    ]
  },
  {
    "id": 276,
    "name": "Quần short cạp poly",
    "code": "T552514704-2C",
    "brand": "361-degrees",
    "category": "quan",
    "gender": "Nam",
    "price": 428073,
    "oldPrice": 1070182,
    "stock": 4,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/t5525147042c14898dddb85bd49939.jpg?v=1748057091947"
    ]
  },
  {
    "id": 277,
    "name": "Quần gió",
    "code": "W552414718-2C",
    "brand": "361-degrees",
    "category": "quan",
    "gender": "Nam",
    "price": 702982,
    "oldPrice": 1757455,
    "stock": 2,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc03391ba3be0f3ceed48aeb2a5e3.jpg?v=1722053341967"
    ]
  },
  {
    "id": 278,
    "name": "Áo khoác nỉ không mũ",
    "code": "W552439001A-1C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nam",
    "price": 545891,
    "oldPrice": 1364727,
    "stock": 4,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/3q7a07256c9377080e6a4acf914834.jpg?v=1734315456487"
    ]
  },
  {
    "id": 279,
    "name": "Áo gió không mũ",
    "code": "W552439601-6C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nam",
    "price": 545891,
    "oldPrice": 1364727,
    "stock": 2,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/w5524396016c14e00587b5d734e2fa.jpg?v=1734315453203"
    ]
  },
  {
    "id": 280,
    "name": "Áo T-shirt Poly",
    "code": "W552512103-1C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nam",
    "price": 255273,
    "oldPrice": 638182,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/xx01415cec6982a55ba43839fda858.jpg?v=1748057093917"
    ]
  },
  {
    "id": 281,
    "name": "Áo T-shirt Poly",
    "code": "W552512103-2C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nam",
    "price": 255273,
    "oldPrice": 638182,
    "stock": 2,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/xx0143129314a2f3a0e4cd18e86517.jpg?v=1748057093773"
    ]
  },
  {
    "id": 282,
    "name": "Áo T-shirt Poly",
    "code": "W552522181-3C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nam",
    "price": 310254,
    "oldPrice": 775636,
    "stock": 5,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/361q2s201252d2a7c5dc4c6548bf8f.jpg?v=1748057106127"
    ]
  },
  {
    "id": 283,
    "name": "Áo T-shirt Poly",
    "code": "W552522181-5C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nam",
    "price": 310254,
    "oldPrice": 775636,
    "stock": 4,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/361q2s201115072be171539d4bfa8b.jpg?v=1748057105950"
    ]
  },
  {
    "id": 284,
    "name": "Áo khoác nỉ có mũ",
    "code": "W552434015A-1C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nam",
    "price": 585164,
    "oldPrice": 1462909,
    "stock": 3,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/3q7a05567346804cbec24c6d9416f5.jpg?v=1734315458347"
    ]
  },
  {
    "id": 285,
    "name": "Áo T-shirt Poly",
    "code": "W552522181-2C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nam",
    "price": 310254,
    "oldPrice": 775636,
    "stock": 1,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/361q2s201269022479f901384b5ab3.jpg?v=1748057106240"
    ]
  },
  {
    "id": 286,
    "name": "Áo T-shirt Poly",
    "code": "W552524103-1C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nam",
    "price": 270982,
    "oldPrice": 677455,
    "stock": 1,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://cdn.hstatic.net/products/200000378371/36100489_79b5910bb49b43ba941f8f98b47fc3dc.jpg"
    ]
  },
  {
    "id": 287,
    "name": "Áo polo poly",
    "code": "T552524101-1C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nam",
    "price": 428073,
    "oldPrice": 1070182,
    "stock": 11,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://cdn.hstatic.net/products/200000378371/36102942_32057d6732b14d42a78ccbd7d0d5682e.jpg"
    ]
  },
  {
    "id": 288,
    "name": "Áo polo poly",
    "code": "T552524101-3C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nam",
    "price": 428073,
    "oldPrice": 1070182,
    "stock": 6,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://cdn.hstatic.net/products/200000378371/36102942_63e37b4881704af391a18c25c9513add.jpg"
    ]
  },
  {
    "id": 289,
    "name": "Quần short chun Poly",
    "code": "W552522712-2C",
    "brand": "361-degrees",
    "category": "quan",
    "gender": "Nam",
    "price": 310254,
    "oldPrice": 775636,
    "stock": 4,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://cdn.hstatic.net/products/200000378371/36103213_dd4273a90dbf4bf6863512b9f7579d1e.jpg"
    ]
  },
  {
    "id": 290,
    "name": "Quần short chun Poly",
    "code": "W552522717-2C",
    "brand": "361-degrees",
    "category": "quan",
    "gender": "Nam",
    "price": 294546,
    "oldPrice": 736364,
    "stock": 6,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://cdn.hstatic.net/products/200000378371/36103228_2ffa6e5db885412784e9d6c6fc1d8ba0.jpg"
    ]
  },
  {
    "id": 291,
    "name": "Áo polo poly",
    "code": "W552524009A-6C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nam",
    "price": 349527,
    "oldPrice": 873818,
    "stock": 2,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://cdn.hstatic.net/products/200000378371/36100677_ad5a6d7f0e0f4cb796cfccb6e2ac89be.jpg"
    ]
  },
  {
    "id": 292,
    "name": "Áo polo poly",
    "code": "W552524009A-8C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nam",
    "price": 349527,
    "oldPrice": 873818,
    "stock": 2,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://cdn.hstatic.net/products/200000378371/36100594_a622aff177f34d6db9daf2b4475d2635.jpg"
    ]
  },
  {
    "id": 293,
    "name": "Áo polo poly",
    "code": "T552524102-1C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nam",
    "price": 585164,
    "oldPrice": 1462909,
    "stock": 8,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://cdn.hstatic.net/products/200000378371/36102888_45b750868dac4228a413836e02eee402.jpg"
    ]
  },
  {
    "id": 294,
    "name": "Quần short cạp poly",
    "code": "T552524702-1C",
    "brand": "361-degrees",
    "category": "quan",
    "gender": "Nam",
    "price": 506618,
    "oldPrice": 1266545,
    "stock": 6,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://cdn.hstatic.net/products/200000378371/36103022_f70bcae0a4fa4825bbb8f7447b28bc85.jpg"
    ]
  },
  {
    "id": 295,
    "name": "Quần short chun poly",
    "code": "W552522722-2C",
    "brand": "361-degrees",
    "category": "quan",
    "gender": "Nam",
    "price": 310254,
    "oldPrice": 775636,
    "stock": 7,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://cdn.hstatic.net/products/200000378371/36103200_12c00e197e854c3ca20dc63ae048951c.jpg"
    ]
  },
  {
    "id": 296,
    "name": "Áo polo poly",
    "code": "W552524010A-7C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nam",
    "price": 373091,
    "oldPrice": 932727,
    "stock": 11,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://cdn.hstatic.net/products/200000378371/36100578_5ab094a5de7a4257aa00160edf171193.jpg"
    ]
  },
  {
    "id": 297,
    "name": "Áo nỉ cổ tròn có mũ",
    "code": "W552439811-6C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nam",
    "price": 506618,
    "oldPrice": 1266545,
    "stock": 4,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/3q7a1047e952d76fd4334aa49e7e27.jpg?v=1734315456723"
    ]
  },
  {
    "id": 298,
    "name": "Quần short chun Poly",
    "code": "W552532717-1C",
    "brand": "361-degrees",
    "category": "quan",
    "gender": "Nam",
    "price": 270982,
    "oldPrice": 677455,
    "stock": 6,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/361q3s114072504434da9dff2ea59c-0feb2496-1d72-4099-b014-080d8b8d51d0.jpg?v=1757050550983"
    ]
  },
  {
    "id": 299,
    "name": "Quần short chun Poly",
    "code": "W552534726-3C",
    "brand": "361-degrees",
    "category": "quan",
    "gender": "Nam",
    "price": 322036,
    "oldPrice": 805091,
    "stock": 7,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/361q3s1140725043960529e6d876bd-1a8bc2da-9739-4bf8-9db8-f508efee7ed3.jpg?v=1757050550803"
    ]
  },
  {
    "id": 300,
    "name": "Áo polo Poly",
    "code": "W552534107-2C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nam",
    "price": 467346,
    "oldPrice": 1168364,
    "stock": 10,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/361q3s2067198a34bde115754f62a3-226f4f97-e2cc-4619-9146-aaed328c0584.jpg?v=1757640790117"
    ]
  },
  {
    "id": 301,
    "name": "Áo polo Poly",
    "code": "W552534109-5C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nam",
    "price": 467346,
    "oldPrice": 1168364,
    "stock": 3,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/361q3s20666318e25663ad4f844209-ead408c5-7d60-40c1-acde-b11b30ecf055.jpg?v=1757050553980"
    ]
  },
  {
    "id": 302,
    "name": "Áo polo Poly",
    "code": "W552534023A-1C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nam",
    "price": 349527,
    "oldPrice": 873818,
    "stock": 10,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/361q3s2067408e91f24abb5f4ed2a6-a376b49e-b340-4d8f-887c-d930a7a31621.jpg?v=1756953332610"
    ]
  },
  {
    "id": 303,
    "name": "Áo polo Poly",
    "code": "W552534023A-3C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nam",
    "price": 349527,
    "oldPrice": 873818,
    "stock": 6,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/361q3s206769e7a389853d4e49bb8d-f411aa51-2966-4ba3-8987-93818ad0bc53.jpg?v=1757640847397"
    ]
  },
  {
    "id": 304,
    "name": "Áo T-shirt Poly",
    "code": "W562524117-3C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nữ",
    "price": 255273,
    "oldPrice": 638182,
    "stock": 3,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/36109161fff03b5aa2184d0a8f8514.jpg?v=1750124845867"
    ]
  },
  {
    "id": 305,
    "name": "Quần gió",
    "code": "W562424728-2C",
    "brand": "361-degrees",
    "category": "quan",
    "gender": "Nữ",
    "price": 373091,
    "oldPrice": 932727,
    "stock": 5,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/m-ml7678-copy.jpg?v=1722053321610"
    ]
  },
  {
    "id": 306,
    "name": "Quần short chun Poly",
    "code": "W562522710-3C",
    "brand": "361-degrees",
    "category": "quan",
    "gender": "Nữ",
    "price": 270982,
    "oldPrice": 677455,
    "stock": 9,
    "sizes": [
      "29",
      "30",
      "31",
      "32",
      "33",
      "34"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/w5625227103c15a7c68cae63244bd8.jpg?v=1748057097537"
    ]
  },
  {
    "id": 307,
    "name": "Áo T-shirt Cotton",
    "code": "W562514105-1C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nữ",
    "price": 255273,
    "oldPrice": 638182,
    "stock": 9,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/xx01593e1a95d51ecba44aaa3e38a8.jpg?v=1748310282157"
    ]
  },
  {
    "id": 308,
    "name": "Áo T-shirt Poly",
    "code": "W562522181-1C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nữ",
    "price": 270982,
    "oldPrice": 677455,
    "stock": 9,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/36100179904f46083fa64b54b4e82b.jpg?v=1752035617580"
    ]
  },
  {
    "id": 309,
    "name": "Áo T-shirt Cotton",
    "code": "W562529111-3C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nữ",
    "price": 270982,
    "oldPrice": 677455,
    "stock": 9,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/361000900691c6d266814f0aacee8d.jpg?v=1752035621427"
    ]
  },
  {
    "id": 310,
    "name": "Áo polo poly",
    "code": "W562524009A-2C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nữ",
    "price": 310254,
    "oldPrice": 775636,
    "stock": 2,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/36100136dff47f7418974332952c44.jpg?v=1752035621993"
    ]
  },
  {
    "id": 311,
    "name": "Áo polo Poly",
    "code": "W562534023A-4C",
    "brand": "361-degrees",
    "category": "ao",
    "gender": "Nữ",
    "price": 349527,
    "oldPrice": 873818,
    "stock": 6,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/361q3s2069462302c356e31e4ceaaf-7919d459-f6a9-4b66-9d43-839c8760acc0.jpg?v=1757050553783"
    ]
  },
  {
    "id": 312,
    "name": "Túi đeo chéo",
    "code": "W512511027-1",
    "brand": "361-degrees",
    "category": "phu-kien",
    "gender": "Unisex",
    "price": 247418,
    "oldPrice": 618545,
    "stock": 2,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/xx09265af535ccd25a34b13a9b234f-7795065a-d040-410a-9ea8-4786a714cc37.jpg?v=1741318911207"
    ]
  },
  {
    "id": 313,
    "name": "Túi đeo chéo",
    "code": "W512511027-3",
    "brand": "361-degrees",
    "category": "phu-kien",
    "gender": "Unisex",
    "price": 247418,
    "oldPrice": 618545,
    "stock": 3,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/xx09190a8c9ba47835449cdb550269-d6a50e33-5a0c-4508-a713-49d71206cf03.jpg?v=1741318911117"
    ]
  },
  {
    "id": 314,
    "name": "Giày RUNNING",
    "code": "W572512219-7",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nam",
    "price": 545891,
    "oldPrice": 1364727,
    "stock": 4,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc092513f41866d1fd74e66872e64.jpg?v=1746613211587"
    ]
  },
  {
    "id": 315,
    "name": "Giày RUNNING",
    "code": "W572512219-10",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nam",
    "price": 545891,
    "oldPrice": 1364727,
    "stock": 10,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc09263f47ea9278f0f44e59cb27d.jpg?v=1746613211717"
    ]
  },
  {
    "id": 316,
    "name": "Giày RUNNING",
    "code": "W582522235-1",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nữ",
    "price": 585164,
    "oldPrice": 1462909,
    "stock": 8,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/361q2s201942d59d735e07f04ca784.jpg?v=1748057101860"
    ]
  },
  {
    "id": 317,
    "name": "Giày RUNNING",
    "code": "W582522288-2",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nữ",
    "price": 663709,
    "oldPrice": 1659273,
    "stock": 9,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc05582177b80b97167438aae2616.jpg?v=1746613207067"
    ]
  },
  {
    "id": 318,
    "name": "Giày RUNNING",
    "code": "W572522288-3",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nam",
    "price": 702982,
    "oldPrice": 1757455,
    "stock": 7,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc054202e395502f34647218cdedf-10d2a479-3200-474d-9230-dbf66a44e40e.jpg?v=1746613209603"
    ]
  },
  {
    "id": 319,
    "name": "Giày RUNNING",
    "code": "W582522288-1",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nữ",
    "price": 663709,
    "oldPrice": 1659273,
    "stock": 9,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/dsc05505a955d0322f174fa2a1a2bb.jpg?v=1746613207277"
    ]
  },
  {
    "id": 320,
    "name": "Giày RUNNING",
    "code": "W682122227-3",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nữ",
    "price": 310254,
    "oldPrice": 775636,
    "stock": 9,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/3610001261e478ac954642a0a5127f.jpg?v=1752035615757"
    ]
  },
  {
    "id": 321,
    "name": "Giày RUNNING",
    "code": "W582532214-2",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nữ",
    "price": 506618,
    "oldPrice": 1266545,
    "stock": 8,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/361q3s206495cb611d936d194294bd-fa1ffcc0-5f37-42f0-9421-0ec78d8a6f9f.jpg?v=1756953332337"
    ]
  },
  {
    "id": 322,
    "name": "Giày SPORTLIFE",
    "code": "W582536603-5",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nữ",
    "price": 467346,
    "oldPrice": 1168364,
    "stock": 6,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/361q3s206383ac6dafc385ef4a4c83-42cb11e5-2fb3-436d-bd48-fd508fc755eb.jpg?v=1756953332173"
    ]
  },
  {
    "id": 323,
    "name": "Giày RUNNING",
    "code": "W672122227-4",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nam",
    "price": 322036,
    "oldPrice": 805091,
    "stock": 4,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/361q3s114072506177b52d86a30da6-1c2c4e62-750f-4e25-8bd6-a6dd40b3eb23.jpg?v=1757641080937"
    ]
  },
  {
    "id": 324,
    "name": "Giày RUNNING",
    "code": "W572532214-4",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nam",
    "price": 506618,
    "oldPrice": 1266545,
    "stock": 6,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/361q3s11407250611914cbd1c0aee6-ebab7ef7-88eb-41a3-9b27-cabbb05aff24.jpg?v=1757640735643"
    ]
  },
  {
    "id": 325,
    "name": "Giày SPORTLIFE",
    "code": "W572536603-3",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nam",
    "price": 467346,
    "oldPrice": 1168364,
    "stock": 8,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/361q3s1140725061939d538208546b-5779c94b-5e53-4000-a9a8-7b9b68e5eab3.jpg?v=1757050550493"
    ]
  },
  {
    "id": 326,
    "name": "Giày SPORTLIFE",
    "code": "W672336622-1",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nam",
    "price": 365236,
    "oldPrice": 913091,
    "stock": 8,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/361q3s114072502176814ce7461e3e-2572fa91-37db-4248-b627-fa7e1078354c.jpg?v=1757641072217"
    ]
  },
  {
    "id": 327,
    "name": "Giày RUNNING",
    "code": "W682532231-1",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nữ",
    "price": 545891,
    "oldPrice": 1364727,
    "stock": 5,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/361q3s20643922c99fae3e6f495cab-51d2763d-c741-42dd-83d0-2a5fb2aac50d.jpg?v=1756953332247"
    ]
  },
  {
    "id": 328,
    "name": "Giày RUNNING",
    "code": "W572532202-7",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nam",
    "price": 585164,
    "oldPrice": 1462909,
    "stock": 7,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/361q3s206267e69ab47848184fc191-0c7471ad-9bae-4292-8910-271fbed203ed.png?v=1757921885840",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLk35jwqWbCmchb9x5B3B6cPwb5ZFjVojzcXE7orTPYQ&s=10"
    ]
  },
  {
    "id": 329,
    "name": "Giày SPORTLIFE",
    "code": "W682536621-2",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nữ",
    "price": 349527,
    "oldPrice": 873818,
    "stock": 6,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/q3s308525bbce44951b2c486995d2a.jpg?v=1758690723063"
    ]
  },
  {
    "id": 330,
    "name": "Giày RUNNING",
    "code": "W572532209-8",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nam",
    "price": 624436,
    "oldPrice": 1561091,
    "stock": 8,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/q3s3086047eeda249cfe049358f7aa.jpg?v=1758690723480"
    ]
  },
  {
    "id": 331,
    "name": "Giày RUNNING",
    "code": "W572532216-5",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nam",
    "price": 585164,
    "oldPrice": 1462909,
    "stock": 13,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/q3s308639e9c6b65d016143618aac7.jpg?v=1758690723243"
    ]
  },
  {
    "id": 332,
    "name": "Giày RUNNING",
    "code": "W582532209-7",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nữ",
    "price": 624436,
    "oldPrice": 1561091,
    "stock": 9,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/q3s308589b141febc460e46e5b7f43.jpg?v=1758690723397"
    ]
  },
  {
    "id": 333,
    "name": "Giày RUNNING",
    "code": "W582532215-1",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nữ",
    "price": 585164,
    "oldPrice": 1462909,
    "stock": 7,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/361q3000621093690687a74e53ac8c.jpg?v=1758690723140"
    ]
  },
  {
    "id": 334,
    "name": "Giày SPORTLIFE",
    "code": "W582536608-3",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nữ",
    "price": 506618,
    "oldPrice": 1266545,
    "stock": 9,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/q3s308540327ab9a5ca3a48cc82bb6.jpg?v=1758690722977"
    ]
  },
  {
    "id": 335,
    "name": "Giày RUNNING",
    "code": "W572532209-7",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nam",
    "price": 624436,
    "oldPrice": 1561091,
    "stock": 9,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/q3s308632cfde84238f004027ba6f3.jpg?v=1758763487150"
    ]
  },
  {
    "id": 336,
    "name": "Giày SPORTLIFE",
    "code": "W572536608-1",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nam",
    "price": 506618,
    "oldPrice": 1266545,
    "stock": 10,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/361q300108b9090b90421e47fd8d06.jpg?v=1758763486523"
    ]
  },
  {
    "id": 337,
    "name": "Giày SPORTLIFE",
    "code": "W572536608-3",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nam",
    "price": 506618,
    "oldPrice": 1266545,
    "stock": 8,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/361q300093e3f371e4b6b44aff814a.jpg?v=1758763486430"
    ]
  },
  {
    "id": 338,
    "name": "Giày RUNNING",
    "code": "W682532228-1",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nữ",
    "price": 545891,
    "oldPrice": 1364727,
    "stock": 9,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/w6825322281499a249a27c9546efae.jpg?v=1765164388107",
      "#ERROR!"
    ]
  },
  {
    "id": 339,
    "name": "Giày chạy",
    "code": "W582542202-6",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nữ",
    "price": 589091,
    "oldPrice": 1472727,
    "stock": 8,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/1265ec5efd694306413ba321d0d089-5828d05d-11f0-4a42-bf33-d7b9a6c6ab21.jpg?v=1766996257347",
      "#ERROR!"
    ]
  },
  {
    "id": 340,
    "name": "Giày chạy bộ",
    "code": "W582542206-5",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nữ",
    "price": 624436,
    "oldPrice": 1561091,
    "stock": 8,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/w58254220654564e8761f9a244e293-bc72ee35-2d22-454f-843a-0546c7ad3baa.jpg?v=1766996255303",
      "#ERROR!"
    ]
  },
  {
    "id": 341,
    "name": "Giày chạy bộ",
    "code": "W572542202-2",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nam",
    "price": 624436,
    "oldPrice": 1561091,
    "stock": 5,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/w572542202246144e404eaec4c758e-679cca17-8ac7-4454-ac8c-1b284cb7a1fb.jpg?v=1766996254937",
      "#ERROR!"
    ]
  },
  {
    "id": 342,
    "name": "Giày chạy bộ",
    "code": "W572542206-3",
    "brand": "361-degrees",
    "category": "giay",
    "gender": "Nam",
    "price": 624436,
    "oldPrice": 1561091,
    "stock": 8,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/w572542206345b99f7623b8e4eb9a2-705fa233-b929-49f2-94ff-acd4135ab24b.jpg?v=1766996255400",
      "#ERROR!"
    ]
  },
  {
    "id": 343,
    "name": "GiàyRUNNINGGEL-KAYANO 32",
    "code": "1011C052.101",
    "brand": "asics",
    "category": "giay",
    "gender": "Nam",
    "price": 1806153,
    "oldPrice": 4515382,
    "stock": 7,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/thiet-ke-chua-co-ten-2025-06-16t114107-754.jpg?v=1750153665010"
    ]
  },
  {
    "id": 344,
    "name": "Giày RUNNINGDYNABLAST",
    "code": "1011B983.100",
    "brand": "asics",
    "category": "giay",
    "gender": "Nam",
    "price": 1138516,
    "oldPrice": 2846291,
    "stock": 3,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/bv2672-063-2025-01-08t115401-297.jpg?v=1736312068567"
    ]
  },
  {
    "id": 345,
    "name": "Giày RUNNINGEXCITE",
    "code": "1011B600.405",
    "brand": "asics",
    "category": "giay",
    "gender": "Nam",
    "price": 804698,
    "oldPrice": 2011745,
    "stock": 3,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/thiet-ke-chua-co-ten-5.jpg?v=1740555757340"
    ]
  },
  {
    "id": 346,
    "name": "Giày RUNNINGDYNABLAST",
    "code": "1011B983.001",
    "brand": "asics",
    "category": "giay",
    "gender": "Nam",
    "price": 1138516,
    "oldPrice": 2846291,
    "stock": 6,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/asics-57.jpg?v=1752113111727"
    ]
  },
  {
    "id": 347,
    "name": "Giày RUNNINGNOVABLAST",
    "code": "1011B974.404",
    "brand": "asics",
    "category": "giay",
    "gender": "Nam",
    "price": 1413426,
    "oldPrice": 3533564,
    "stock": 4,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/them-tieu-de-2025-08-12t135023-917.jpg?v=1754981472913"
    ]
  },
  {
    "id": 348,
    "name": "Giày RUNNINGEXCITE",
    "code": "1011C134.300",
    "brand": "asics",
    "category": "giay",
    "gender": "Nam",
    "price": 981426,
    "oldPrice": 2453564,
    "stock": 3,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/them-tieu-de-2025-08-12t142724-473.jpg?v=1754983745337"
    ]
  },
  {
    "id": 349,
    "name": "Giày RUNNINGNIMBUS",
    "code": "1012B753.400",
    "brand": "asics",
    "category": "giay",
    "gender": "Nữ",
    "price": 1688334,
    "oldPrice": 4220836,
    "stock": 8,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/bv2672-063-2025-01-10t131110-633.jpg?v=1736489553363"
    ]
  },
  {
    "id": 350,
    "name": "Giày RUNNINGDYNABLAST",
    "code": "1012B776.700",
    "brand": "asics",
    "category": "giay",
    "gender": "Nữ",
    "price": 1138516,
    "oldPrice": 2846291,
    "stock": 7,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/asics-2025-07-10t095847-685.jpg?v=1752116450480"
    ]
  },
  {
    "id": 351,
    "name": "Giày RUNNINGDYNABLAST",
    "code": "1012B776.401",
    "brand": "asics",
    "category": "giay",
    "gender": "Nữ",
    "price": 1138516,
    "oldPrice": 2846291,
    "stock": 11,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/cau-long-giay-2026-01-02t093852-716.jpg?v=1767321619330",
      "#ERROR!"
    ]
  },
  {
    "id": 352,
    "name": "GIÀY RUNNING ZOOM RIVAL FLY 4",
    "code": "FV6040-001",
    "brand": "nike",
    "category": "giay",
    "gender": "Nam",
    "price": 1268120,
    "oldPrice": 3170300,
    "stock": 10,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/nike-air-zoom-rival-fly-4.jpg?v=1752561768210"
    ]
  },
  {
    "id": 353,
    "name": "GIÀY RUNNING PEGASUS 41",
    "code": "FD2722-014",
    "brand": "nike",
    "category": "giay",
    "gender": "Nam",
    "price": 1556000,
    "oldPrice": 3890000,
    "stock": 10,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/air-zoom-pegasus-41-10.jpg?v=1752562707487"
    ]
  },
  {
    "id": 354,
    "name": "GIAY SPORTSWEAR COURT SHOT",
    "code": "FQ8146-112",
    "brand": "nike",
    "category": "giay",
    "gender": "Nam",
    "price": 946080,
    "oldPrice": 2365200,
    "stock": 8,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/court-shot.jpg?v=1757988851430"
    ]
  },
  {
    "id": 355,
    "name": "Balo",
    "code": "CW9301-010",
    "brand": "nike",
    "category": "phu-kien",
    "gender": "Nữ",
    "price": 368760,
    "oldPrice": 921900,
    "stock": 3,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/sportswearfutura365minibackpac.jpg?v=1722053362287"
    ]
  },
  {
    "id": 356,
    "name": "Balo",
    "code": "FQ5559-370",
    "brand": "nike",
    "category": "phu-kien",
    "gender": "Nữ",
    "price": 463040,
    "oldPrice": 1157600,
    "stock": 3,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/bv2672-063-2024-10-14t162715-766.jpg?v=1728898103733"
    ]
  },
  {
    "id": 357,
    "name": "Tất bàn chân",
    "code": "SX5277-011",
    "brand": "nike",
    "category": "phu-kien",
    "gender": "Nữ",
    "price": 176320,
    "oldPrice": 440800,
    "stock": 12,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/u-plus-nk-plus-everyday-plus-plus-plus-ltwt-plus-footie-4.jpg?v=1740556880267"
    ]
  },
  {
    "id": 358,
    "name": "GIÀY NIKE SPORTSWEAR AIR MAX EXCEE",
    "code": "CD5432-010",
    "brand": "nike",
    "category": "giay",
    "gender": "Nữ",
    "price": 1146360,
    "oldPrice": 2865900,
    "stock": 11,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/wmns-plus-nike-plus-air-plus-max-plus-excee-13.jpg?v=1740556065383"
    ]
  },
  {
    "id": 359,
    "name": "GIÀY NIKE SPORTSWEAR AIR MAX EXCEE",
    "code": "CD5432-131",
    "brand": "nike",
    "category": "giay",
    "gender": "Nữ",
    "price": 1146360,
    "oldPrice": 2865900,
    "stock": 11,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/bv2672-063-2024-10-14t163211-073.jpg?v=1728898392287"
    ]
  },
  {
    "id": 360,
    "name": "GIÀY NIKE SPORTSWEAR AIR MAX EXCEE",
    "code": "CD5432-101",
    "brand": "nike",
    "category": "giay",
    "gender": "Nữ",
    "price": 1146360,
    "oldPrice": 2865900,
    "stock": 10,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/wmns-plus-nike-plus-air-plus-max-plus-excee-5.jpg?v=1739581590517"
    ]
  },
  {
    "id": 361,
    "name": "GIÀY RUNNING REVOLUTION 8",
    "code": "HJ8485-100",
    "brand": "nike",
    "category": "giay",
    "gender": "Nữ",
    "price": 824320,
    "oldPrice": 2060800,
    "stock": 9,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/w-nike-revolution-8.jpg?v=1752561578123"
    ]
  },
  {
    "id": 362,
    "name": "GIÀY SPORTSWEAR TERRA MANTA (GS)",
    "code": "HV9702-101",
    "brand": "nike",
    "category": "giay",
    "gender": "Nữ",
    "price": 769360,
    "oldPrice": 1923400,
    "stock": 10,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/terra-manta-gs.jpg?v=1754465673190"
    ]
  },
  {
    "id": 363,
    "name": "GIAY SPORTSWEAR AIR MAX 90",
    "code": "DH8010-100",
    "brand": "nike",
    "category": "giay",
    "gender": "Nữ",
    "price": 1519480,
    "oldPrice": 3798700,
    "stock": 10,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/wmns-air-max-90.jpg?v=1757992154363"
    ]
  },
  {
    "id": 364,
    "name": "GIAY RUNNING UPLIFT SC",
    "code": "IF1749-100",
    "brand": "nike",
    "category": "giay",
    "gender": "Nữ",
    "price": 604400,
    "oldPrice": 1511000,
    "stock": 8,
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/nike-uplift-sc-gs.jpg?v=1757987281033"
    ]
  },
  {
    "id": 365,
    "name": "Mũ lưỡi trai",
    "code": "FB5370-100",
    "brand": "nike",
    "category": "phu-kien",
    "gender": "Unisex",
    "price": 262720,
    "oldPrice": 656800,
    "stock": 1,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/thiet-ke-chua-co-ten-2024-08-01t153033-958-cffc4d53edba4b338fdd1ba96d2c50b4-master.png?v=1724728634357"
    ]
  },
  {
    "id": 366,
    "name": "Tất bàn chân",
    "code": "SX7678-964",
    "brand": "nike",
    "category": "phu-kien",
    "gender": "Unisex",
    "price": 192040,
    "oldPrice": 480100,
    "stock": 2,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/everydaylightweighttrainingnos-jpeg.jpg?v=1722053339793"
    ]
  },
  {
    "id": 367,
    "name": "Balo",
    "code": "DD0562-010",
    "brand": "nike",
    "category": "phu-kien",
    "gender": "Unisex",
    "price": 439480,
    "oldPrice": 1098700,
    "stock": 1,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/nk-plus-elmntl-plus-bkpk-plus-plus-lbr.jpg?v=1739526305250"
    ]
  },
  {
    "id": 368,
    "name": "Túi đeo chéo",
    "code": "DR6266-478",
    "brand": "nike",
    "category": "phu-kien",
    "gender": "Unisex",
    "price": 353080,
    "oldPrice": 882700,
    "stock": 1,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/nk-plus-heritage-plus-s-plus-wstpck-plus-plus-retro-21.jpg?v=1739955813543"
    ]
  },
  {
    "id": 369,
    "name": "Mũ có vành",
    "code": "FB5382-104",
    "brand": "nike",
    "category": "phu-kien",
    "gender": "Unisex",
    "price": 286280,
    "oldPrice": 715700,
    "stock": 2,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/bv2672-063-2024-10-14t144205-455.jpg?v=1728891769123"
    ]
  },
  {
    "id": 370,
    "name": "Tất bàn chân",
    "code": "SX7554-100",
    "brand": "nike",
    "category": "phu-kien",
    "gender": "Unisex",
    "price": 192040,
    "oldPrice": 480100,
    "stock": 3,
    "sizes": [
      "Freesize"
    ],
    "images": [
      "https://bizweb.dktcdn.net/100/340/361/products/aurorasx7554100phcfh0012000b9f-jpeg.jpg?v=1728706868893"
    ]
  }
];

function formatPrice(n) {
  return n.toLocaleString("vi-VN") + "₫";
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === Number(id));
}

function getCategoryName(slug) {
  const c = CATEGORIES.find((c) => c.slug === slug);
  return c ? c.name : slug;
}

function getBrandName(slug) {
  const b = BRANDS.find((b) => b.slug === slug);
  return b ? b.name : slug;
}
