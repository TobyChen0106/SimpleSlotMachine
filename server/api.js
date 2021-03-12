const express = require("express");
const router = express.Router();
const path = require("path");

const fs = require("fs");

router.get("/get-reward", (req, res) => {
  fs.readFile(
    path.join(__dirname, "reward_list.csv"),
    "utf8",
    function (err, data) {
      if (err) {
        console.log("read data error!");
        res.json({ reward: 0 });
      } else {
        let dataArray = data.split(/\r?\n/);
        let current_reward_id = Number(dataArray[1].split(",")[4]);
        if (current_reward_id > dataArray.length - 2) {
          current_reward_id = 0;
          // res.json({ reward: 0 });
        }
        // console.log(dataArray[current_reward_id + 1]);
        const current_rewards = dataArray[current_reward_id + 1].split(
          ","
        )[2];
        res.json({ reward: current_rewards });
        console.log("current rewards: ", current_rewards);
        const next_reward_id = current_reward_id + 1;
        let _temp = dataArray[1].split(",");
        _temp[4] = next_reward_id;
        _tempArray = _temp.join(",");
        dataArray[1] = _tempArray;
        saveDataArray = dataArray.join("\n");
        // console.log(saveDataArray);

        fs.writeFile(
          path.join(__dirname, "reward_list.csv"),
          saveDataArray,
          "utf8",
          function (err) {
            if (err) {
              console.log("writeFile Error!");
            } else {
              // console.log("It's saved!");
            }
          }
        );

      }
    }
  );
});

module.exports = router;
