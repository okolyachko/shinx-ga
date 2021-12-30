// Starting the dialog

const itemList = "pepperoni_~pepperoni|margherita_~margherita|burrito_~burrito|burger_~burger|taco_~taco|apple pie_~apple pie";

intent(`(I want|I will take|Add|) (a|an|) $(ITEM ${itemList}), (please|)`, 
       `(I want|I will take|Add|) $(NUMBER) $(ITEM ${itemList}), (please|)`, p => {
    p.play(`Adding ${p.ITEM.value} for you`, 'Sure', 'Here you go');
    let number = p.NUMBER ? p.NUMBER.number : 1;
    p.play({command: 'updateOrder', item: p.ITEM.label, quantity: number});
    p.play({command: 'highlightItem', item: p.ITEM.label});
});    

intent(`(Remove|Delete) $(ITEM ${itemList}), (please|)`,
       `(Remove|Delete) $(NUMBER) $(ITEM ${itemList}), (please|)`, p => {
    let order = p.visual.order || {};
    const item = p.ITEM.label;
    if (!order[item]) {
        p.play(`${p.ITEM.value} is not in the cart yet`);
    } else {
        let quantity = order[item] ? order[item] : 0;
        let deleteQnty = p.NUMBER ? p.NUMBER.number : quantity;

        if (quantity - deleteQnty <= 0) {
            p.play(`Removing all ${p.ITEM.value}`);
        } else {
            p.play(`Updating ${p.ITEM.value}`);
        }
        p.play({command: 'updateOrder', item: item, quantity: -deleteQnty});
    }
});

intent(`That's (all|it)`, '(Ready to|) checkout', p => {
    p.play('What is the delivery address?');
    p.then(checkout);
});

let checkout = context(() => {
    intent('(My address is|It is) $(LOC)', p => {
        p.play({command: 'setAddress', address: p.LOC.value});
        p.play(`Your order will be delivered to ${p.LOC.value}`);
        p.play('What is the expected delivery time?');
        p.then(getTime);
    });
});

let getTime = context(() => {
    intent('$(TIME)', '$(T now|asap|right now|as soon as possible)', p => {
        let time, date;
        if (p.T) {
            time = api.moment().tz(p.timeZone).add(30, 'minutes').format("h:mm a");
        }
        if (p.TIME) {
            time = p.TIME.value;
        }
        p.play({command: "setTime", time: time});
        p.then(getComment);
        p.play(`We will deliver your order at ${time}`);
        p.play('Any comments?');
    });
});

let getComment = context(() => {
    intent('My comment is $(COMMENT* (.+))', p => {
        p.play({command: 'setComment', comment: p.COMMENT.value});
        p.play(`I'll' take a note: ${p.COMMENT.value}`);
    });
});

let ingredients = [];
let itemId = "";
const appId = "fe1888f12c2942c6b9b354cdf5425421";

intent(`What are the $(ITEM ${itemList}) ingredients?`, p => {
    let itemName = p.ITEM.value;
    switch(p.ITEM.value) {
        case 'pepperoni':
            itemId = 776505;
            break;
        case 'margherita':
            itemId = 636954;
            break;
        case 'burger':
            itemId = 663050;
            break;
        case 'taco':
            itemId = 662744;
            break;
        case 'burrito':
            itemId = 637999;
            break;
        case 'apple pie':
            itemId = 632580;
            break;
	default:
	    console.log('Could not get ingredients');
    }
    let SERVICE_URL = `https://api.spoonacular.com/recipes/${itemId}/ingredientWidget.json`;
    const request_url = `${SERVICE_URL}?apiKey=${appId}`;
    console.log(request_url);
    api.axios.get(request_url)
        .then((response) => {
        let data = response.data;        
        data.ingredients.forEach(element => {
            ingredients.push(element.name);
        });
        p.play(`The ${p.ITEM.value} ingredients are: ${ingredients}`);
    })
        .catch((error) => {
        console.log(error);
        p.play('Could not get ingredients');
    });
    ingredients = [];
});

intent(visual(v => !_.isEmpty(v.order)), '(What are|) my order details?', p => {
    p.play('You have ordered:');
    for (let product in p.visual.order) {
        p.play(p.visual.order[product] + " " + product);
    }
});

intent(visual(v => _.isEmpty(v.order)), '(What are|) my order details?', p => {
    p.play('You have not ordered anything');
});

projectAPI.setToken = function(p, param, callback) {
    if (!param || !param.token) {
        callback("error: token undefined");
    }
    p.userData.token = param.token;
    p.play(`Hey, ${param.username}, nice to see you again!`);
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

intent('(What is my|) balance', p => {
    if (!p.userData.token) {
        p.play('Please log in to get balance');
        return;
    }
    getBalanceFromServer(p.userData.token, (err, balance) => {
        if (err) {
            p.error(err);
            p.play('error');
            return;
        }
        p.play(`Your balance is ${balance} dollars`);
    });
});

projectAPI.getBalance = function(p, param, callback) {
    getBalanceFromServer(p.userData.token, callback);
}

// Greeting the user when the Alan button is clicked
onUserEvent((p, e) => {
    if (e.event == 'micPermissionPrompt') {
        p.play('Hi, this is Alan, your voice assistant!');
        p.play('To order food with voice, click Allow microphone and say: I want two burritos or I will take a pepperoni, please');
    }
});