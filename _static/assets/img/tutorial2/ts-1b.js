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