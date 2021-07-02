Ember
=====

Available on: :badge:`Web platform,badge-primary badge-pill`

Integration
-----------

1. Install the ``@alan-ai/alan-sdk-web`` package:

   .. code:: bash

       $ npm install @alan-ai/alan-sdk-web --save

2. Install the ``ember-auto-import`` package to have ability to use
   packages from npm:

   .. code:: bash

       $ npm install ember-auto-import --save

3. Add the following code to the ``app.js`` file in your project:

   .. code:: javascript

       alanBtn({ 
           key: 'YOUR_KEY_FROM_ALAN_STUDIO_HERE',
           onCommand: (commandData) => {
               if (commandData.command === 'go:back') {
                   // Call the client code that will react to the received command
               }
           },
       });

   For details, see `Alan button
   parameters <web-api.html#alan-button-parameters>`__.

Integration example
-------------------

See an example of the Ember app with the Alan button `here <https://github.com/alan-ai/alan-sdk-web/tree/master/examples/alan-example-integration-ember>`__.

.. raw:: html

   <div id="purple-background"></div>
