// Populating fields with the delivery details

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
        // Sending the address to the app
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
        // Sending the time to the app
        p.play({command: "setTime", time: time});
        p.then(getComment);
        p.play(`We will deliver your order at ${time}`);
        p.play('Any comments?');
    });
});

let getComment = context(() => {
    intent('My comment is $(COMMENT* (.+))', p => {
        // Sending the comment to the app
        p.play({command: 'setComment', comment: p.COMMENT.value});
        p.play(`I'll' take a note: ${p.COMMENT.value}`);
    });
});