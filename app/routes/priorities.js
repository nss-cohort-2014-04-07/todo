'use strict';

var priorities = global.nss.db.collection('priorities');
var Mongo = require('mongodb');


exports.index = (req, res)=>{
  priorities.find().toArray((e,r)=>res.render('priorities/index', {priorities: r, title: 'Priority List'}));
};

exports.destroy = (req, res)=>{
  var _id = Mongo.ObjectID(req.params.id);
  priorities.findAndRemove({_id:_id}, ()=>res.redirect('/priorities'));
};

exports.create = (req, res)=>{
  priorities.save(req.body, ()=>res.redirect('/priorities'));
};
