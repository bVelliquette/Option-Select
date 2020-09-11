const express = require("express"),
  router = express.Router(),
  Schedule = require("../models/schedule.model");

router.route("/all").get((req, res) => {
  Schedule.find((err, scheds) => {
    if (err) res.status(400).send(err);
    else res.status(200).json(scheds);
  });
});

router.route("/all/full").get((req, res) => {
  Schedule.find()
    .populate("channels.blocks.game")
    .exec((err, scheds) => {
        if (err) res.status(400).send(err);
        else res.status(200).json(scheds);
    });
});

router.route("/find/:id").get((req,res) => {
  Schedule.findById(req.params.id).populate("channels.blocks.game")
  .exec((err, sched) => {
    if (err) res.status(400).send(err);
    else res.status(200).json(sched);
  })
})

router.route("/add").post((req, res) => {
  let schedule = new Schedule(req.body);
  schedule
    .save()
    .then((schedule) => {
      res.status(200).send("Schedule successfully added");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.route("/delete/:id").delete((req, res) => {
  Schedule.findById(req.params.id, (err, sched) => {
    if (!sched) res.status(400).send("Event not found");
    else {
      sched
        .remove()
        .then((sched) => {
          res.status(200).send("Event Deleted");
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    }
  });
});

module.exports = router;
