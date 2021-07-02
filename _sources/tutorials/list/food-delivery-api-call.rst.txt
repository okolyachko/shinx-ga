.. raw:: html

   <div id="orange-background"></div>

Step 16: Make an API call to get ingredients
============================================

Our users should be able to ask about the item ingredients with voice. To do this, we will make a call to the `Spoonacular food API <https://spoonacular.com/food-api>`__ using the built-in `axios HTTP client <../../server-api/built-in-javascript-libraries.html#axios>`__.

1. `Sign up to Spoonacular food API <https://spoonacular.com/food-api>`__.

2. Upon confirming your account, `log in to the Spoonacular API console <https://spoonacular.com/food-api/console>`__ and navigate to the **Profile** page.

3. Copy the API key for your account.

4. To the voice script in Alan Studio, add the following command:

   .. code:: javascript

      let ingredients = [];
      let itemId = "";
      const appId = "fe1888f12c2942c6b9b354cdf5425421";

      intent(`What are the $(ITEM ${itemList}) ingredients?`, p => {
          let itemName = p.ITEM.value;
          switch(p.ITEM.value) {
              case 'pepperoni':
                  itemId = 776505;
                  break;
              case 'margherita':
                  itemId = 636954;
                  break;
              case 'burger':
                  itemId = 663050;
                  break;
              case 'taco':
                  itemId = 662744;
                  break;
              case 'burrito':
                  itemId = 637999;
                  break;
              case 'apple pie':
                  itemId = 632580;
                  break;
              default:
                  console.log('Could not get ingredients');
          }
          let SERVICE_URL = `https://api.spoonacular.com/recipes/${itemId}/ingredientWidget.json`;
          const request_url = `${SERVICE_URL}?apiKey=${appId}`;
          console.log(request_url);
          api.axios.get(request_url)
              .then((response) => {
                  let data = response.data;        
                  data.ingredients.forEach(element => {
                      ingredients.push(element.name);
                  });
              p.play(`The ${p.ITEM.value} ingredients are: ${ingredients}`);
          })
              .catch((error) => {
              console.log(error);
              p.play('Could not get ingredients');
          });
          ingredients = [];
      });

   `Web page source <../../_static/assets/img/tutorial2/5.html.txt>`__ | `Voice script <../../_static/assets/img/tutorial2/9.js>`__

5. In ``appId``, provide your own API key.

Here is how this command works: when the user asks about the ingredients of a specific item, Alan forms a URL based on the item name captured with ``p.ITEM.value`` and sends a request to the food API by this URL.
It then gets only the ingredients values from the response object and pushes them to the ``ingredients`` array. Once this is done, the list in the ``ingredients`` array is played back to the user.

Try the command in the Debugging Chat with different item names.