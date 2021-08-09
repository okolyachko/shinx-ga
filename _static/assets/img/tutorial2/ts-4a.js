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
intent(`(My order|Order details|Details)`, p => {
    p.play("You have ordered:");
    for (let product in p.visual.order) {
        p.play(p.visual.order[product] + " " + product);
    }
});

var whatAddress = context(() => {
    follow('$(LOC)', p => {
        p.play({command: "address",
                address: p.LOC.value});
        p.play("We will deliver your order to " + p.LOC.value);
    });
});

intent(`That's (all|it)`, '(Ready to|) checkout', p => {
    p.play('What is delivery address?');
    p.then(whatAddress);
});