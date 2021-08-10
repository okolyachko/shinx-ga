// Getting item ingredients

const itemList = "pepperoni_~pepperoni|margherita_~margherita|burrito_~burrito|burger_~burger|taco_~taco|apple pie_~apple pie";

intent(`(I want|I will take|Add|) (a|an|) $(ITEM ${itemList}), (please|)`, 
       `(I want|I will take|Add|) $(NUMBER) $(ITEM ${itemList}), (please|)`, p => {
    p.play(`Adding ${p.ITEM.value} for you`, 'Sure', 'Here you go');
    let number = p.NUMBER ? p.NUMBER.number : 1;
    p.play({command: 'updateOrder', item: p.ITEM.label, quantity: number});
    p.play({command: 'highlightItem', item: p.ITEM.label});
});    

intent(`Remove (a|an|) $(ITEM ${itemList}), (please|)`, 
       `Remove $(NUMBER) $(ITEM ${itemList}), (please|)`, p => {
    p.play(`Removing ${p.ITEM.value}`, 'No problem', 'Your order is updated');
    let number = p.NUMBER ? p.NUMBER.number : 1;
    p.play({command: 'updateOrder', item: p.ITEM.label, quantity: -number});
    p.play({command: 'highlightItem', item: p.ITEM.label});
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

// Querying Spoonacular Food API
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