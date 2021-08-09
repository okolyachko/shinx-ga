.. raw:: html

   <div id="orange-background"></div>

Step 11: Highlight named items
==============================

In an app with a multimodal UX, it is always a good idea to accompany voice commands with visual effects in the app. Let's highlight the named items in the app. To do this, we will send another command from the voice script to the app.

1. In the voice script, update the voice commands for adding and removing items with the ``highlightItem`` command:

   .. code-block:: javascript
     :emphasize-lines: 8,9,16,17

      const itemList = "pepperoni_~pepperoni|margherita_~margherita|burrito_~burrito|burger_~burger|taco_~taco|apple pie_~apple pie";

      intent(`(I want|I will take|Add|) (a|an|) $(ITEM ${itemList}), (please|)`, 
             `(I want|I will take|Add|) $(NUMBER) $(ITEM ${itemList}), (please|)`, p => {
          p.play(`Adding ${p.ITEM.value} for you`, 'Sure', 'Here you go');
          let number = p.NUMBER ? p.NUMBER.number : 1;
          p.play({command: 'updateOrder', item: p.ITEM.label, quantity: number});
          // Sending the highlight command
          p.play({command: 'highlightItem', item: p.ITEM.label});
      });    

      intent(`Remove (a|an|) $(ITEM ${itemList}), (please|)`, 
             `Remove $(NUMBER) $(ITEM ${itemList}), (please|)`, p => {
          p.play(`Removing ${p.ITEM.value}`, 'No problem', 'Your order is updated');
          let number = p.NUMBER ? p.NUMBER.number : 1;
          p.play({command: 'updateOrder', item: p.ITEM.label, quantity: -number});
          // Sending the highlight command
          p.play({command: 'highlightItem', item: p.ITEM.label});
      });

2. To the app, add the ``highlight()`` function. This function will change the border color around the item and get back to the initial
   color after a timeout:

   .. code-block:: javascript

      function highlight(item){
          const el = document.getElementById(item.replace(/\s+/g, '-'));
          if (el) {
              el.style.border = "1px solid #22CBFF";
              setTimeout(() => {
                  el.style.border = "1px solid #C6C3C3";
              }, 1000);
          }
      }

3. Update the ``onCommand`` handler to call the ``highlight()`` function when ``highlightItem`` is received:

   .. code-block:: html
     :emphasize-lines: 10, 11

      <script>
      ...
          var alanBtnInstance = alanBtn({
              key: "e2fecaef4cb07cbe7d43485dbc3cb44a2e956eca572e1d8b807a3e2338fdd0dc/stage",

              // Handling the highlightItem command 
              onCommand: function (commandData) {
                  if (commandData.command == "updateOrder") {
                      changeOrder(commandData.item, commandData.quantity);
                  } else if (commandData.command == "highlightItem") {
                      highlight(commandData.item);
                  }
              },
              rootEl: document.getElementById("alan-btn"),
          });
      </script>

   `Web page source <../../_static/assets/img/tutorial2/4.html.txt>`__ | `Voice script <../../_static/assets/img/tutorial2/4.js>`__

In the app, try adding and removing items with voice and make sure they get highlighted when named.