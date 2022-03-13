const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

//=================================
//             Product
//=================================

var storage = multer.diskStorage({
  // 파일 저장 위치
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // 저장될 때, 파일 이름 규칙
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var upload = multer({ storage: storage }).single('file');

router.post('/image', (req, res) => {
  // 가져온 이미지를 저장해주면 된다.
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post('/', (req, res) => {
  //받아온 정보들을 DB에 넣어 준다.
  const product = new Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post('/products', (req, res) => {
  // product collectrion에 들어 있는 모든 상품 정보를 가져오기
  let limit = req.body.limit ? parseInt(req.body.limit) : 20; // false의 수는 마음대로
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm; // 검색어

  let findArgs = {}; // filtering을 위한 객체 필요

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        findArgs[key] = {
          // mongoDB에서 사용하는.. Greater than equal
          $gte: req.body.filters[key][0],
          // mongoDB에서 사용하는.. Less than equal
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  if (term) {
    // $text, $search: mongoDB에서 제공
    Product.find(findArgs)
      .find({ $text: { $search: term } })
      .populate('writer')
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          productInfo,
          postSize: productInfo.length,
        });
      });
  } else {
    Product.find(findArgs)
      .populate('writer')
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          productInfo,
          postSize: productInfo.length,
        });
      });
    // .find(): Object 형식으로 원하는 조건을 넣어준다.
    // .populate("writer") 상품을 등록한 사람에 대한 모든 정보를 가져온다.
    // .exec((err, productInfo) =>{})
  }
});

router.get('/products_by_id', (req, res) => {
  //productId를 이용해서 DB에서  productId와 같은 상품의 정보를 가져온다.

  // post를 이용해 client에서 값을 가져올 때는 req.body를 이용
  // query를 이용해서 가져올 때는 req.query를 이용
  let productIds = req.query.id;

  Product.find({ _id: { $in: productIds } })
    .populate('writer')
    .exec((err, product) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send({
        success: true,
        product,
      });
    });
});

module.exports = router;
