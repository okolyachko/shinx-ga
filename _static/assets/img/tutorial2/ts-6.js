// menu items
const items = ['pepperoni', 'margherita', 'burrito',
    'burger', 'taco', 'apple pie'];

// itemList = "pepperoni_|margherita_|burrito_|burger_|taco_|apple pie_";
const itemList = items.map(i => i + '_').join('|');

// add items to order
intent(`(Add|I want|) $(ITEM ${itemList})`,
       `(Add|I want|) $(NUMBER) $(ITEM ${itemList})`, p => {
    let number = p.NUMBER ? p.NUMBER.number : 1;
    const item = items.find(i => p.ITEM.startsWith(i));
    p.play({
        command: 'changeOrder',
        item: item,
        quantity: number
    });
    p.play(`adding ${number} ${p.ITEM.value}`);
});

// remove or update order items
follow(`(Remove|Delete) $(ITEM ${itemList})`,
       `(Remove|Delete) $(NUMBER) $(ITEM ${itemList})`, p => {
    let order = p.visual.order || {};
    const item = items.find(i => p.ITEM.startsWith(i));
    if (!order[item]) {
        p.play(`${p.ITEM} has not been ordered yet`);
    } else {
        let quantity = order[item] ? order[item] : 0;
        let deleteQnty = p.NUMBER ? p.NUMBER.number : quantity;

        if (quantity - deleteQnty <= 0) {
            p.play('Removing all ' + p.ITEM.value);
        } else {
            p.play('Updating ' + p.ITEM.value);
        }
        p.play({
            command: 'changeOrder',
            item: item,
            quantity: -deleteQnty
        });
    }
});

// play order details
intent(visual(v => !_.isEmpty(v.order)), `(my order|order details|details)`, p => {
    p.play("You have ordered:");
    for (let product in p.visual.order) {
        p.play(p.visual.order[product] + " " + product);
    }
});

intent(visual(v => _.isEmpty(v.order)), `(my order|order details|details)`, p => {
    p.play('You have not ordered anything.');
});

// request delivery time
let whatTime = context(() => {
    follow('$(TIME)', '$(T now|asap|right now|as soon as possible)', '$(DATE)', p => {
        let time, date;
        if (p.T) {
            // deliver in 30 minutes
            date = api.moment().tz(p.timeZone).format("MMMM Do");
            time = api.moment().tz(p.timeZone).add(30, 'minutes').format("h:mm a");
        } else if (p.TIME) {
            p.state.time = time = p.TIME;
            if (p.state.date) {
                date = p.state.date;
            } else {
                p.play("What date?");
                return;
            }
        } else if (p.DATE) {
            p.state.date = date = p.DATE.moment.format("MMMM Do");
            if (p.state.time) {
                time = p.state.time;
            } else {
                p.play("What time?");
                return;
            }
        }
        if (date && time) {
            p.play({
                command: "time",
                time: time,
                date: date
            });
            p.play(`We will deliver your order to ${p.visual.address}. Delivery date is ${date} at ${time}`);
        }
    });
});

// request delivery address
let whatAddress = context(() => {
    follow('$(LOC)', p => {
        p.play({
            command: "address",
            address: p.LOC.value
        });
        p.play("What is delivery time?");
        p.then(whatTime);
    });
});

intent(`that's (all|it)`, '(ready to|) checkout', p => {
    p.play('What is delivery address?');
    p.then(whatAddress);
});

projectAPI.setToken = function(p, param, callback) {
    if (!param || !param.token) {
        callback("error: token undefined");
    }
    p.userData.token = param.token;
    callback();
};

function getBalanceFromServer(token, callback) {
    let req = {
        url: "https://studio.alan.app/api_playground/tutorialBalance",
        method: 'POST',
        json: {
            "token": token
        }
    };
    api.request(req, (err, res, body) => {
        const error = err || body.error;
        if (error) {
            callback(error);
        }
        callback(null, body.balance);
    });
}

projectAPI.getBalance = function(p, param, callback) {
    getBalanceFromServer(p.userData.token, callback);
}

intent('(what is my|) balance', p => {
    if (!p.userData.token) {
        p.play("Please login to get balance");
        return;
    }
    getBalanceFromServer(p.userData.token, (err, balance) => {
        if (err) {
            p.error(err);
            p.play('error');
            return;
        }
        p.play("Your balance is " + balance);
    });
});
