const mgdb = require('mongoose');
const express = require('express');

const db = require('../database/db'),
    users = require('../database/users');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.route("/search")
    .get((req, res) => {
        const { name } = req.query;
        mgdb.model('Users').find({"name":{"first": name}}, (err, users) => {
            if(err) throw err;
            res.json(users);
        })
    })

router.route('/')
    .get(function(req, res) {
        mgdb.model('Users').find({}, (err, users) => {
            if(err) throw err;
            res.json(users);
        })
    })
    .post((req, res) => {
        mgdb.model('Users').create(
            req.body,
            (err, user) => {
            if (err) {
                res.json({'message':'Users does not saved!'});
                console.log('error when save save ', user);
            }
            else {
                console.log('saved', user)
                res.json(user);
            }
        })
    })

router.route('/:id')
    .get(function (req, res) {
        mgdb.model('Users').findById(req.params.id,
            (err, user) => {
                if (err) {
                    console.log('There was a problem', err);
                }
                else {
                    console.log('Retrieving id ', req.params.id);
                    res.json(user);
                }
            })
    })
    .put(function (req, res) {
        mgdb.model('Users').findById(req.params.id,
            (err, user) => {
                if (err) {
                    console.log('There was a problem', err);
                }
                else {
                    console.log('Updating id ', req.params.id);
                    user.updateOne(req.body, (err, data) => {
                        res.json({
                            '_id': user_id,
                            'messages': 'Has been updated'
                        })
                    })
                }
            })
    })
    .delete(function (req, res) {
        mgdb.model('Users').findById(req.params.id,
            (err, user) => {
                if (err) {
                    console.log('There was a problem', err);
                }
                else {
                    console.log('Deleting id ', req.params.id);
                    user.remove((err, user) => {
                        if(err) res.json({'message': 'Has been NOT deleted'})
                        res.json({
                            '_id': user._id,
                            'messages': 'Has been deleted'
                        })
                    })
                }
            })
    })

module.exports = router;