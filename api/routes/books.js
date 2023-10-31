module.exports = function (server, restify) {

    server.get('/getBookid/:bookid', (req, res, next) => {
       if (req.params.bookid == null || req.params.bookid.length <= 0) {
            res.send({
                "status": "error",
                "msg": "bookid missing"
            });
            return next();
        }
        BOOK.getBookDataByid(req.params.bookid, function (bookdata, errMsg) {
            if (bookdata) {
                res.send({ status: "success", data: bookdata })
            } else {
                res.send({ status: "error", msg: errMsg })
            }
        })

    });

    server.get('/getBooks', (req, res, next) => {
        console.log("asasas")
         BOOK.getBookData(function (bookdata, errMsg) {
             if (bookdata) {
                 res.send({ status: "success", data: bookdata })
             } else {
                 res.send({ status: "error", msg: errMsg })
             }
         })
 
     });

    server.post('/addbook', (req, res, next) => {
        console.log(req.body)
        if (Array.isArray(req.body)) {
        var vStatus = validateRule(req.body[0], {
            "title": "required",
            "author":"required",
            "summery":"required"
        });
        if (! vStatus.status) {
            res.send({"status": "error", "errors": vStatus.errors, "msg": "Input Validation Failed"});
            return next();
        }
    }else{
        var vStatus = validateRule(req.body, {
            "title": "required",
            "author":"required",
            "summery":"required"
        });
        if (! vStatus.status) {
            res.send({"status": "error", "errors": vStatus.errors, "msg": "Input Validation Failed"});
            return next();
        } 
    }
        BOOK.insertRecords(req.body, function (bookdata, errMsg) {
            if (bookdata) {
                res.send({ status: "success", msg:"successfully created"  })
            } else {
                res.send({ status: "error", msg: errMsg })
            }
        })

    });

    server.put('/updatebook', (req, res, next) => {
        console.log(req.body)
        if (Array.isArray(req.body)) {
        var vStatus = validateRule(req.body[0], {
            "_id":"required",
            "title": "required",
            "author":"required",
            "summery":"required"
        });
        if (! vStatus.status) {
            res.send({"status": "error", "errors": vStatus.errors, "msg": "Input Validation Failed"});
            return next();
        }
    }else{
        var vStatus = validateRule(req.body, {
            "_id":"required",
            "title": "required",
            "author":"required",
            "summery":"required"
        });
        if (! vStatus.status) {
            res.send({"status": "error", "errors": vStatus.errors, "msg": "Input Validation Failed"});
            return next();
        } 
    }
        BOOK.editRecords(req.body, function (bookdata, errMsg) {
            if (bookdata) {
                res.send({ status: "success", msg:"successfully updated"  })
            } else {
                res.send({ status: "error", msg: errMsg })
            }
        })
    });

    server.post('/deletebook', (req, res, next) => {
        console.log(req.body)
        if (Array.isArray(req.body)) {
        var vStatus = validateRule(req.body[0], {
            "_id":"required"
        });
        if (! vStatus.status) {
            res.send({"status": "error", "errors": vStatus.errors, "msg": "Input Validation Failed"});
            return next();
        }
    }else{
        var vStatus = validateRule(req.body, {
            "_id":"required",
        });
        if (! vStatus.status) {
            res.send({"status": "error", "errors": vStatus.errors, "msg": "Input Validation Failed"});
            return next();
        } 
    }
        BOOK.deleteRecords(req.body, function (bookdata, errMsg) {
            if (bookdata) {
                res.send({ status: "success", msg:"successfully deleted"  })
            } else {
                res.send({ status: "error", msg: errMsg })
            }
        })
    });
}