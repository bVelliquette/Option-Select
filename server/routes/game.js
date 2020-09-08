const express = require("express"),
  router = express.Router(),
  Game = require("../models/game.model");

router.route("/all").get((req, res) => {
  Game.find((err, games) => {
    if (err) console.log(err);
    else res.status(200).json(games);
  });
});

router.route("/add").post((req, res) => {
  let game = new Game(req.body);
  game
    .save()
    .then((Game) => {
      res.status(200).send("Game successfully added");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.route("/delete/:id").delete((req, res) => {
  Game.findById(req.params.id, (err, game) => {
    if (!game) res.status(400).send("Game not found");
    else {
      game
        .remove()
        .then((game) => {
          res.status(200).send("Game Deleted");
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    }
  });
});

module.exports = router;
