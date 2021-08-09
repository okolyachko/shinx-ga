const itemList = "pepperoni|margherita|burrito|burger|taco|apple pie";

intent(`(add|I want|) $(ITEM ${itemList})`, p => {
    p.play({command: 'addItem',
            item: p.ITEM});
    p.play('adding ' + p.ITEM);
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