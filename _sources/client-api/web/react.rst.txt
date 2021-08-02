React
=====

Available on: :badge:`Web platform,badge-primary badge-pill`

Integration
-----------

1. Install the ``@alan-ai/alan-sdk-web`` package and import the
   ``alanBtn`` into your component:

   .. code:: bash

      $ npm install @alan-ai/alan-sdk-web --save

   .. code:: javascript

      import alanBtn from "@alan-ai/alan-sdk-web";

   Or just add the ``alan_lib.js`` library to your index.html page using the script tag:

   .. code:: html

      <script type="text/javascript" src="https://studio.alan.app/web/lib/alan_lib.min.js"></script>

2. Add the Alan button to your React component.

   -  If you use React Functional Components:

      .. code:: javascript

          useEffect(() => {
              alanBtn({
                  key: 'YOUR_KEY_FROM_ALAN_STUDIO_HERE',
                  onCommand: (commandData) => {
                     if (commandData.command === 'go:back') {
                        // Call the client code that will react to the received command
                     }
                  }
              });
          }, []);

   -  If you use React Functional Components with HMR (Hot Module Replacement):

      .. code:: javascript

          const alanBtnInstance = useRef(null);

          useEffect(() => {
             if (!alanBtnInstance.current) {
                alanBtnInstance.current = alanBtn({
                   key: 'YOUR_KEY_FROM_ALAN_STUDIO_HERE',
                   onCommand: (commandData) => {
                      if (commandData.command === 'go:back') {
                         // Call the client code that will react to the received command
                      }
                   }
               });
             }
         }, []);

   -  If you use React Class Components:

      .. code:: javascript

         componentDidMount() {
            this.alanBtnInstance = alanBtn({ 
               key: 'YOUR_KEY_FROM_ALAN_STUDIO_HERE',
               onCommand: (commandData) => {
                  if (commandData.command === 'go:back') {
                     // Call the client code that will react to the received command
                  }
               },
            });
         }

For details, see `Alan button parameters <web-api.html#alan-button-parameters>`__.

Integration example
-------------------

See an example of the React app with the Alan button `here <https://github.com/alan-ai/alan-sdk-web/tree/master/examples/alan-example-integration-react>`__.

.. raw:: html

   <div id="purple-background"></div>