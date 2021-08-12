// Sending commands to the app

const itemList = "pepperoni_|margherita_|burrito_|burger_|taco_|apple pie_";

intent(`(I want|I will take|Add|) (a|an|) $(ITEM ${itemList}), (please|)`, 
       `(I want|I will take|Add|) $(NUMBER) $(ITEM ${itemList}), (please|)`, p => {
    p.play(`Adding ${p.ITEM.value} for you`, 'Sure', 'Here you go');
    let number = p.NUMBER ? p.NUMBER.number : 1;
    // Sending the command to the app
    p.play({command: 'updateOrder', item: p.ITEM.value, quantity: number});
});