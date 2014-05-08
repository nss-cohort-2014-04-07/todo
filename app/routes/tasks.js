'use strict';

var tasks = global.nss.db.collection('tasks');
var priorities = global.nss.db.collection('priorities');
var Mongo = require('mongodb');
var _ = require('lodash');

exports.index = (req, res)=>{
  tasks.find().toArray((e,t)=>{
    priorities.find().toArray((e,p)=>{

      t = t.map(task => {
        task.priority = _(p).find(pri =>pri._id.toString() === task.priorityId.toString());
        return task;
      });

      res.render('tasks/index', {priorities: p, tasks: t, title: 'Task List'});
    });
  });
};

exports.create = (req, res)=>{
  req.body.isComplete = false;
  req.body.due = new Date(req.body.due);
  req.body.priorityId = Mongo.ObjectID(req.body.priorityId);

  tasks.save(req.body, ()=>res.redirect('/tasks'));
};

exports.destroy = (req, res)=>{
  var _id = Mongo.ObjectID(req.params.id);
  tasks.findAndRemove({_id:_id}, ()=>res.redirect('/tasks'));
};

exports.filter = (req, res)=>{
  var _pid = Mongo.ObjectID(req.params.pid);

  tasks.find({priorityId:_pid}).toArray((e,t)=>{
    priorities.find().toArray((e,p)=>{

      t = t.map(task => {
        task.priority = _(p).find(pri =>pri._id.toString() === task.priorityId.toString());
        return task;
      });

      res.render('tasks/index', {priorities: p, tasks: t, title: 'Task List'});
    });
  });
};

exports.titlesort = (req, res)=>{
  tasks.find({}, {sort:[['title', 1]]}).toArray((e,t)=>{
    priorities.find().toArray((e,p)=>{

      t = t.map(task => {
        task.priority = _(p).find(pri =>pri._id.toString() === task.priorityId.toString());
        return task;
      });

      res.render('tasks/index', {priorities: p, tasks: t, title: 'Task List'});
    });
  });
};

exports.datesort = (req, res)=>{
  tasks.find({}, {sort:[['due', 1]]}).toArray((e,t)=>{
    priorities.find().toArray((e,p)=>{

      t = t.map(task => {
        task.priority = _(p).find(pri =>pri._id.toString() === task.priorityId.toString());
        return task;
      });

      res.render('tasks/index', {priorities: p, tasks: t, title: 'Task List'});
    });
  });
};


exports.update = (req, res)=>{
  var _id = Mongo.ObjectID(req.params.id);

  tasks.findOne({_id:_id}, (e,t)=>{
    t.isComplete = !t.isComplete;
    tasks.save(t, ()=>res.redirect('/tasks'));
  });
};
