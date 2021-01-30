var Connect = function () {
    var objRes = document.getElementById("LB_RES");
    var objForm = document.getElementById("FORM_MAIN");
    var objAddr = "ws://192.168.1.181:5233/;" /*document.getElementById("TB_HOSP").value;*/
    var objData = "";/*document.getElementById("TB_DATA").value*/;
    const WM_USER = 0x0400;

    objRes.innerHTML += "Connecting to server...<br/>";

    window.ws = new WebSocket(objAddr);

    ws.onmessage = function (msg) {
        const data = JSON.parse(msg.data);
        let mData;

        switch (data.COMMAND) {
            case 0x0102:
                if (data.RETURNED_MESSAGE == "ERROR_CASH_NOCHANGE") {
                    $('#CashModal').modal('show');
                }
                break;
            case 0x1100:
                switch (parseInt(data.MESSAGE) - WM_USER) {
                    //Cash
                    case 0x1111:
                    case 0x1101:
                        //Get
                        mData = JSON.parse(data.DATA);
                        for (let i = 0; i < mData.length; i++) {
                            const item = mData[i];
                            if (item.NAME == "ITEM_CASH_TOTAL_ACCEPTED") {
                                document.getElementById("Amounts_Paid").innerHTML = item.VALUE;
                            }    
                        }
                        break;
                    case 0x1121:
                        //GET Change
                        mData = JSON.parse(data.DATA);
                        for (let i = 0; i < mData.length; i++) {
                            const item = mData[i];
                            if (item.NAME == "ITEM_CASH_CHANGE") {
                                document.getElementById("Amounts_Change").innerHTML = item.VALUE;
                                if (parseInt(item.VALUE) == 0) {
                                    setTimeout("location.href = 'SaleFinish.html?mType=0x0000'", 1500);
                                }
                            }
                        }
                        new funPrintStart(data.DATA)
                        break;
                    case 0x1123:
                        //Payout Finish
                        const Amount = parseInt(document.getElementById("Amounts_Change").innerHTML);
                        if (Amount == 0) {
                            location.href = "SaleFinish.html?mType=" + 0x0000;
                        }
                        break;
                    case 0x1124:
                        //Cancel
                        $("#Dispensed").val(1);
                        location.href = "SaleFinish.html?mType=" + 0x1120;
                        break;
                    case 0x1125:
                        //Timeout
                        $("#Dispensed").val(1);
                        location.href = "SaleFinish.html?mType=" + 0x1120;
                        break;
                    case 0x1130:
                        //Dispensed
                        if ($("#Dispensed").val() > 0) {
                            location.href = "SaleFinish.html?mType=" + 0x1120;
                        }
                        else {
                            location.href = "SaleFinish.html?mType=" + 0x0000;
                        }
                        
                        break;
                    //EZCard
                    case 0x1211:
                        location.href = "SaleFinish.html?mType=" + 0x0000;
                        mData = JSON.stringify(data.DATA);
                        for (let i = 0; i < mData.length; i++) {
                            const item = mData[i];
                            if (item.NAME == "ITEM_CASH_TOTAL_ACCEPTED") {
                                document.getElementById("Amounts_Paid").innerHTML = item.VALUE;
                            }
                        }
                        new funPrintStart(data.DATA)

                        break;
                    case 0x1212:
                        //Error
                        location.href = "SaleFinish.html?mType=" + 0x1121 + "&msg=" + data.RETURNED_MESSAGE;
                        break;
                    case 0x1215:
                    case 0x1213:
                        //TimeOut
                        $('#EZCardModal').modal('show');
                        break;
                    //CreditCard
                    case 0x1301:
                        location.href = "SaleFinish.html?mType=" + 0x0000;
                        new funPrintStart(data.DATA)
                        break;
                    case 0x1302:
                        //Error
                        location.href = "SaleFinish.html?mType=" + 0x1120;
                        break;
                    case 0x1303:
                        //TimeOut
                        $('#CreditModal').modal('show');
                        break;
                    //PRINT
                    //Finish
                    case 0x1401:
                        location.href = "SaleFinish.html?mType=" + 0x0000;
                        break;

                }
                break;
        }

        objRes.innerHTML += "Got Message: " + msg.data + '<BR/>';
    }

    ws.onopen = function () {
        objRes.innerHTML += 'Connection open <br/>'

        switch ($("#PayType").val()) {
            case "Cash":
                WS_PayStart("Cash");
                break;
        }
    }

    ws.onclose = function () {
        objRes.innerHTML += 'Connection closed<br/>';
    }

    //FORM_MAIN.addEventListener('submit', function (e) {
    //    e.preventDefault();
    //})
}

// -----------
function WS_Connect() {
    Connect();
}

function WS_SendData(objData) {
    //var objData = document.getElementById("TB_DATA").value;

    if (ws.OPEN && ws.readyState == 1) {
        ws.send(objData);
    }
    else if (ws.readyState == 2 || ws.readyState == 3) {
        alert("WebSocket Closed");
    }
}

function WS_PayCancel(Type) {
    let Cmd = 0;

    switch (Type) {
        case "Cash":
            Cmd = 0x0103;
            break;
        case "CreditCard":
            Cmd = 0x0303;
    }

    const data = {
        "COMMAND": Cmd,
        "PARAMS": "[]"
    };

    WS_SendData(JSON.stringify(data));
}


function WS_PayStart(Type) {
    let Cmd;
    let Params = JSON.stringify([{ "NAME": "ITEM_AMOUNT", "VALUE": document.getElementById("Total_Amount").textContent }]);

    switch (Type) {
        case "Cash":
            Cmd = 0x0101;
            break;
        case "CashNoCheck":
            Cmd = 0x0101;
            Params = JSON.stringify(
                [
                    { "NAME": "ITEM_AMOUNT", "VALUE": document.getElementById("Total_Amount").textContent },
                    { "NAME": "ITEM_CASH_CHECK_LOW", "VALUE": 0 }
                ]
            );
            break;
        case "EZCard":
            Cmd = 0x0207;
            break;
        case "Credit":
            Cmd = 0x0301;
            break;
    }

    var data = {
        "COMMAND": Cmd,
        "PARAMS": Params
    };

    WS_SendData(JSON.stringify(data));
}

function funPrintStart(data) {
    var PrintData = {
        "COMMAND": 0x0401,
        "PARAMS": data
    };

    WS_SendData(JSON.stringify(PrintData));
}