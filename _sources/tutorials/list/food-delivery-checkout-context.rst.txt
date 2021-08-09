.. raw:: html

   <div id="orange-background"></div>

Step 12: Add the checkout context
=================================

After users have ordered food, they can proceed to checking out and providing the delivery details. This step makes sense only after the food is in the cart. If the user provides the delivery details at the beginning of the dialog, this would be meaningless. For this reason, we will wrap this part of the dialog in a `context <../../server-api/contexts.html>`__.

In Alan, a context is a conversational branch, or the part of the dialog, that should become active at a specific moment of time. Let's update our voice script:

1. Add a new intent for initiating checkout:

   .. code:: javascript

      intent(`That's (all|it)`, '(Ready to|) checkout', p => {
          p.play('What is the delivery address?');
      });

2. Define the ``checkout`` context. Inside the checkout context, we will place a voice command for getting the delivery address and use the ``$(LOC)`` `predefined slot <../../server-api/slots.html#loc>`__ to capture the location:

   .. code:: javascript

      let checkout = context(() => {
          intent('(My address is|It is|) $(LOC)', p => {
              p.play(`Your order will be delivered to ${p.LOC.value}`);
          });
      });

3. Voice commands placed in a context are inactive until the context is `activated <../../server-api/contexts.html#activating-contexts>`__. We need to activate the context after the food is in the cart. Update the voice command for initiating checkout — add the ``p.then()`` function and pass the context name to it:

   .. code-block:: javascript
     :emphasize-lines: 4

      intent(`That's (all|it)`, '(Ready to|) checkout', p => {
          p.play('What is the delivery address?');
          // Activating the checkout context
          p.then(checkout);
      });

      let checkout = context(() => {
          intent('(My address is|It is|) $(LOC)', p => {
              p.play(`Your order will be delivered to ${p.LOC.value}`);
          });
      });

   `Web page source <../../_static/assets/img/tutorial2/4.html.txt>`__ | `Voice script <../../_static/assets/img/tutorial2/5.js>`__

Now, try the dialog in the Debugging Chat: 

1. Order the food 
2. Initiate checkout and provide the delivery address