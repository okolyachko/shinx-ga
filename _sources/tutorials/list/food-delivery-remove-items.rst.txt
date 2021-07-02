.. raw:: html

   <div id="orange-background"></div>

Step 10: Remove items with voice
================================

We can also allow users to remove items from the cart with voice.

1. To the voice script, add a new voice command. This command is similar to the command for adding items, except for sending a negative number with the ``updateOrder`` command.

   .. code-block:: javascript

      intent(`Remove (a|an|) $(ITEM ${itemList}), (please|)`, 
             `Remove $(NUMBER) $(ITEM ${itemList}), (please|)`, p => {
          p.play(`Removing ${p.ITEM.value}`, 'No problem', 'Your order is updated');
          let number = p.NUMBER ? p.NUMBER.number : 1;
          p.play({command: 'updateOrder', item: p.ITEM.label, quantity: -number});
      });

2. In the app, update the ``changeOrder()`` function to the following:

   .. code-block:: javascript

      function changeOrder(item, quantity) {
          let number = (order[item] ? order[item] : 0) + quantity;
          // Removing the item or updating the item quantity
          if (number <= 0) {
              delete order[item];
          } else {
              order[item] = number;
          }
          updateCart();
      }

   `Web page source <../../_static/assets/img/tutorial2/3.html.txt>`__ | `Voice script <../../_static/assets/img/tutorial2/3.js>`__

Now, when the number of items is less or equal to 0, the item is removed from the order; otherwise the number for the named position is updated.

In the app, click the Alan button and try adding and removing items from the cart with voice.