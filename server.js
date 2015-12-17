var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pages');
var Page = require('./app/models/page');


var router = express.Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'root api' });
});

router.route('/pages')

    .post(function(req, res) {

        var page = new Page();
        page.name = req.body.name;
        page.client_id = req.body.client_id;
        page.zones = req.body.zones;

        page.save(function(err) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Page ' + page._id + ' created' });
        });


    })

    .get(function(req, res) {
        Page.find(function(err, pages) {
            if (err) {
                res.send(err);
            }

            res.json(pages);
        });
    });

router.route('/pages/:page_id')

    .get(function(req, res) {
        Page.findById(req.params.page_id, function(err, page) {
            if (err) {
                res.send(err);
            }

            res.json(page);
        });
    })

    .put(function(req, res) {
        Page.findById(req.params.page_id, function(err, page) {

            if (err) {
                res.send(err);
            }

            page.name = req.body.name;
            page.client_id = req.body.client_id;
            page.zones = req.body.zones;

            page.save(function(err) {
                if (err) {
                    res.send(err);
                }

                res.json({ message: 'Page ' + req.params.page_id +' updated' });
            });

        });
    })

    .delete(function(req, res) {
        Page.remove({
            _id: req.params.page_id
        }, function(err, page) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Page ' + req.params.page_id +' deleted' });
        });
    });

app.use('/api', router);

app.listen(port);
console.log('Hosted on port ' + port);
