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

var timeout_handles = [];

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
    const data = JSON.parse(message);
    if (data.COMMAND === 0x0101) {
      setTimeout(() => {
        ws.send(JSON.stringify(gotMoneyMsg));
      }, 1000);
    } else if (data.COMMAND === 0x0105) {
      let money = JSON.parse(data.PARAMS)[0].VALUE;
      // send_money(money);
      // setTimeout(() => {
      //   ws.send(JSON.stringify(sentMoneyMsg));
      // }, 6000);
      console.log(money)
      for(let i=0 ; i < Number(money)/100 ; ++i){
        setTimeout(() => {
          ws.send(JSON.stringify(sentMoneyMsg));
        }, (i+1)*1000);
      }
    }
  });
});

send_money = (remain_amount, handle) => {
  if (remain_amount === 0) return;
  if (remain_amount / 100 in timeout_handles) {
    clearTimeout(timeout_handles[remain_amount / 100]);
  }
  timeout_handles[remain_amount / 100] = setTimeout(() => {
    ws.send(JSON.stringify(sentMoneyMsg));
  }, 1000);
  send_money(remain_amount - 100, handle);
};
