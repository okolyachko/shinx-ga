// Using labels

const itemList = "pepperoni_~pepperoni|margherita_~margherita|burrito_~burrito|burger_~burger|taco_~taco|apple pie_~apple pie";

intent(`(I want|I will take|Add|) (a|an|) $(ITEM ${itemList}), (please|)`, 
	   `(I want|I will take|Add|) $(NUMBER) $(ITEM ${itemList}), (please|)`, p => {
	p.play(`Adding ${p.ITEM.value} for you`, 'Sure', 'Here you go');
	let number = p.NUMBER ? p.NUMBER.number : 1;
	// Sending the ITEM label instead of the ITEM value
	p.play({command: 'updateOrder', item: p.ITEM.label, quantity: number});
});