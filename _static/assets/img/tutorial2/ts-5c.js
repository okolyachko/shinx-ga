// menu items
const items = ['pepperoni', 'margherita', 'burrito',
    'burger', 'taco', 'apple pie'];

// itemList = "pepperoni_|margherita_|burrito_|burger_|taco_|apple pie_";
const itemList = items.map(i => i + '_').join('|');


// add items to order
intent(`(add|I want|) $(ITEM ${itemList})`,
       `(add|I want|) $(NUMBER) $(ITEM ${itemList})`, p => {
    let number = p.NUMBER ? p.NUMBER.number : 1;
    const item = items.find(i => p.ITEM.startsWith(i));
    p.play({
        command: 'changeOrder',
        item: item,
        quantity: number
    });
    p.play(`adding ${number} ${p.ITEM}`);
});

// remove or update order items
follow(`(remove|delete) $(ITEM ${itemList})`,
       `(remove|delete) $(NUMBER) $(ITEM ${itemList})`, p => {
    let order = p.visual.order || {};
    const item = items.find(i => p.ITEM.startsWith(i));
    if (!order[item]) {
        p.play(`${p.ITEM} has not been ordered yet`);
    } else {
        let quantity = order[item] ? order[item] : 0;
        let deleteQnty = p.NUMBER ? p.NUMBER.number : quantity;

        if (quantity - deleteQnty <= 0) {
            p.play('removing all ' + p.ITEM);
        } else {
            p.play('updating ' + p.ITEM);
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

var whatAddress = context(() => {
    follow('$(LOC)', p => {
        p.play({command: "address",
                address: p.LOC});
        p.play("We will deliver your order to " + p.LOC);
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
        p.play(`Your balance is $${balance}`);
    });
});
