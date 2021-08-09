.. raw:: html

   <div id="orange-background"></div>

Step 8: Send a command to display items in the cart
===================================================

When the user gives a command, we want to display the ordered items in the cart on the web page. To do this, we will send a command from the voice script to the app and, once the command is received, have the app perform the necessary activity.

1. We will start with the voice script. First, let's add the ``number`` variable to our command. If the user's input contains the number and it is caught with the ``NUMBER`` slot, ``number`` is set to a `numeric representation of the item quantity <../../server-api/slots.html#number>`__ — ``p.NUMBER.number``;  otherwise, it is set to 1.

   .. code-block:: javascript
     :emphasize-lines: 7

      const itemList = "pepperoni_|margherita_|burrito_|burger_|taco_|apple pie_";

      intent(`(I want|I will take|Add|) (a|an|) $(ITEM ${itemList}), (please|)`, 
             `(I want|I will take|Add|) $(NUMBER) $(ITEM ${itemList}), (please|)`, p => {
          p.play(`Adding ${p.ITEM.value} for you`, 'Sure', 'Here you go');
          // Getting the number of ordered items
          let number = p.NUMBER ? p.NUMBER.number : 1;
      });

2. To send a command from the voice script, add another ``p.play()`` function and specify a JSON object in it. In our case, the object
   contains the command name — ``updateOrder``, item name and quantity: 

   .. code-block:: javascript
     :emphasize-lines: 8

      const itemList = "pepperoni_|margherita_|burrito_|burger_|taco_|apple pie_";

      intent(`(I want|I will take|Add|) (a|an|) $(ITEM ${itemList}), (please|)`, 
             `(I want|I will take|Add|) $(NUMBER) $(ITEM ${itemList}), (please|)`, p => {
          p.play(`Adding ${p.ITEM.value} for you`, 'Sure', 'Here you go');
          let number = p.NUMBER ? p.NUMBER.number : 1;
          // Sending the command to the app
          p.play({command: 'updateOrder', item: p.ITEM.value, quantity: number});
      });

   Try the command in the Debugging Chat. Notice that together with the answer, Alan now sends the command we have added.

3. We need to handle this command on the app side. To do this, let's add the ``order`` object, ``changeOrder()`` and ``updateCart()``
   functions to our web page:

   .. code-block:: html

      <script>
          ...
          // Setting the order
          let order = {};

          // Showing the order on the page
          function updateCart() {
              let html = "";
              for (let key in order) {
                  html += `<tr><td>${key}</td><td>${order[key]}</td>`;
              }
              html = `<table border="0">${html}</table>`;
              document.getElementById("order").innerHTML = html;
          }

          // Changing the number of items in the order
          function changeOrder(item, quantity) {
              let number = (order[item] ? order[item] : 0) + quantity;
              order[item] = number;
              updateCart();
          }
      </script>

4. Finally, we will make sure the ``changeOrder()`` function is called when the user gives the command. In the Alan button code block in the app, find the `onCommand handler <../../client-api/methods/command-handler.html>`__ and update it so that the ``changeOrder()`` function is invoked once the app receives the ``updateOrder`` command. To the function, we will pass the item name and quantity:

   .. code-block:: html
     :emphasize-lines: 7-9

      <script>
          ...
          var alanBtnInstance = alanBtn({
              key: "e2fecaef4cb07cbe7d43485dbc3cb44a2e956eca572e1d8b807a3e2338fdd0dc/stage",
              // Handling the updateOrder command 
              onCommand: function (commandData) {
                  if (commandData.command == "updateOrder") {
                       changeOrder(commandData.item, commandData.quantity);
                  }
              },
              rootEl: document.getElementById("alan-btn"),
          });
      </script>

   `Web page source <../../_static/assets/img/tutorial2/1.html.txt>`__ | `Voice script <../../_static/assets/img/tutorial2/1.js>`__

Here is how it works: when the user makes an order, Alan plays a response and sends the ``updateOrder`` command to the app. With this
command, it sends the item name and quantity. On the app side, the ``changeOrder()`` function is called that updates the ``order`` object
and shows the current order on the page with ``updateCart()``.

You can test it: in the app, click the Alan button and try ordering food with voice.