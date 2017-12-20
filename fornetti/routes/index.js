var express = require('express');
var router = express.Router();
const db = require("../module/db");

// Check user.
const checkUser = (req, callBack) => {
  // Check cookie.
  if (req.cookies.fornetti) {
    db.getOne("session", {where: [
      {field: "token", value: req.cookies.fornetti}
    ]}, (err, data) => {
      if (err) {
        return callBack(err);
      } else if (data.length !== 1) {
        return callBack("no valid session");
      }
      return callBack(null, data);
    });
  } else {
    return callBack("no cookie");
  }
};

// Random string generator.
const randString = (l) => {
  let token = "", range, index;
  let ranges = [
       [65, 90],
       [48, 57],
       [97, 122]
  ];
  for (var i = 0; i < l; i++) {
      range = ranges[Math.floor(Math.random()*ranges.length)];
      index = range[0] + Math.round(Math.random()*(range[1]-range[0]));
      token += String.fromCharCode(index);
  }
  return token;
};

// Set session.
const setSession = (res, user, callBack) => {
  const cookie = randString(15);
  let query = `INSERT INTO session 
                (token, user_id, expire) 
              VALUES 
                ('${cookie}', ${user.id}, now()+INTERVAL 1 day)`;
  db.connection.query(query, (err, results) => {
    res.cookie('fornetti', cookie);
    callBack();
  });
};

/* Render admin page. */
const renderAdmin = (res, user) => {
  db.list("inventory", (err, data) => {
    if (err) {
      console.error(err);
      return res.render('admin', { 
        title: 'Fornetti', 
        user: user,
        inventory: [] });
    } 

    res.render('admin', { 
      title: 'Fornetti', 
      user: user,
      inventory: data });
  });



  
};

/* GET home page. */
router.get('/', function(req, res, next) {

  checkUser(req, (err, data) => {
    if (err) {
      res.render('login', { title: 'Fornetti' });
    } else {
      db.getOne(
        "user", 
        {where: [{field: "id", value: data[0].user_id}]}, 
        (err, data) => {
          renderAdmin(res, data[0]);
      });
    }
  });

});

/* Post login data. */
router.post('/', function(req, res, next) {
  let options = {
    where: [
      {field: "email", value: req.body.email},
      {field: "password", value: req.body.password, flag: 'MD5'}
    ]
  };
  db.getOne("user", options, (err, data) => {
    if (err) {
      res.render('login');
      return console.error(err);
    }
    setSession(res, data[0], () => {
      renderAdmin(res, data[0]);
    });
  });
});

router.post("/update", (req, res, next) => {
  console.log(req.body);
  let obj = req.body;
  db.connection.query(`UPDATE inventory 
  SET name = '${obj.name}', code = '${obj.code}', 
    quantity = ${obj.quantity}, place = '${obj.place}' 
    WHERE id = ${req.body.id}`, (err) => {
      if (err) {
        return req.json({error: err});
      }
      res.json({success: true});
    });
});

router.post("/insert", (req, res, next) => {
  console.log(req.body);
  let obj = req.body;
  db.connection.query(`INSERT INTO inventory 
  (name, code, quantity, place) 
    VALUES 
  ('${obj.name}', '${obj.code}', ${obj.quantity}, '${obj.place}')`, 
  (err, result, fields) => {
      console.log(err, result, fields);
      if (err) {
        return req.json({error: err});
      }
      res.json({success: true, id: result.insertId});
    });
});

module.exports = router;
