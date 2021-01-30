const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 4000 });
const gotMoneyMsg = {
  COMMAND: 4352,
  MESSAGE: 5409,
  RETURNED_MESSAGE: null,
  DATA:
    '[{"NAME":"ITEM_AMOUNT","VALUE":"100"},{"NAME":"ITEM_TOTAL_ACCEPTED","VALUE":"100"},{"NAME":"ITEM_CHANGE","VALUE":"0"}]',
};

const sentMoneyMsg = {
  COMMAND: 4352,
  MESSAGE: 0x1523,
  RETURNED_MESSAGE: null,
  DATA:
    '[{"NAME":"ITEM_AMOUNT","VALUE":"100"},{"NAME":"ITEM_TOTAL_ACCEPTED","VALUE":"100"},{"NAME":"ITEM_CHANGE","VALUE":"0"}]',
};

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
    const data = JSON.parse(message);
    if (data.COMMAND === 0x0101) {
      setTimeout(() => {
        ws.send(JSON.stringify(gotMoneyMsg));
      }, 1000);
    } else if (data.COMMAND === 0x0105) {
      setTimeout(() => {
        ws.send(JSON.stringify(sentMoneyMsg));
      }, 6000);
    }
  });
});
