// Capturing the delivery time

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
        p.play(`Your order will be delivered to ${p.LOC.value}`);
        // Prompting for setting the delivery time
        p.play('What is the expected delivery time?');
        // Activating the getTime context
        p.then(getTime);
    });
});

// Defining the getTime context
let getTime = context(() => {
    intent('$(TIME)', '$(T now|asap|right now|as soon as possible)', p => {
        let time, date;
        // Delivering in 30 minutes
        if (p.T) {
            time = api.moment().tz(p.timeZone).add(30, 'minutes').format("h:mm a");
        }
        // Delivering at the exact time
        if (p.TIME) {
            time = p.TIME.value;
        }
        p.play(`We will deliver your order at ${time}`);
    });
});