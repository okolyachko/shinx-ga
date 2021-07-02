.. raw:: html

   <div id="orange-background"></div>

Navigating between tabs in an Ionic React app
=============================================

If your Ionic React app has several tabs, you can add voice commands to navigate through the app. In this tutorial, we will use a simple Ionic app with three tabs to demonstrate how to use voice commands to switch
between them.

What you will learn
-------------------

-  How to send commands from the voice script to an Ionic React app 
-  How to set up the Alan event listener and handle commands on the app side
-  How to navigate between tabs in an Ionic React app with voice

What you will need
------------------

To go through this tutorial, make sure the following prerequisites are met:

-  You have completed the following tutorial: `Building a voice assistant for an Ionic React app <integrating-react.html>`__.
-  The environment for using the Ionic framework is properly set up. For details, see Ionic documentation.

We will use an example Ionic React app provided by Alan. You can also use your own app with several tabs. Make sure you have added the Alan button to the app as described in the `previous tutorial <integrating-react.html>`__.

.. note:: 

   In this tutorial, we use Ionic React Router to navigate in the app. This component is already added to the example Alan app. If you prefer using your own app for this tutorial, make sure it has Ionic React Router. For details, see `Ionic documentation <https://ionicframework.com/docs/react/navigation>`__.

Step 1: Add voice commands for navigation
-----------------------------------------

We need to add a new `command <../../server-api/commands-and-responses.html>`__ to the Alan script to navigate between tabs with voice. In Alan Studio, open the project and in the code editor, add the following intent:

.. code:: javascript

   intent('Go to the $(ORDINAL) tab', p => {
       const availableTabs = new Set([1,2,3]);
       if (availableTabs.has(p.ORDINAL.number)) {
           p.play({command: 'navigation', tabNumber: p.ORDINAL.number});
       } else {
           p.play('The tab with this number is not found');
       }
   });

The user can now give a voice command to go to a specific tab in the app. In the intent, we use the `ORDINAL <../../server-api/slots.html#ordinal>`__ predefined slot. This slot allows us to catch the ordinal number in the
user utterance. If the caught number is ``first``, ``second`` or ``third``, the ``navigation`` command and the tab number will be sent from the voice script to the app. If the voice command contains some other number, Alan will report that such tab is not found.


Step 2: Handle commands on the app side
---------------------------------------

Now, when we say, for example, ``Go to the second tab``, Alan sends the ``navigation`` command and the ``2`` tab number to the app. We need to handle this command on the app side and make sure the app opens the necessary tab when the command is received.

In the Ionic app, go to ``src/components`` and open the ``AlanBtn.tsx`` file:

.. code:: javascript

   //AlanBtn.tsx file
   ...
   const AlanBtn: React.FC = (props: any) => {
       const alanBtnComponent = useRef<any>(null);

       useEffect(() => {
           alanBtnComponent.current.addEventListener('command', (data: CustomEvent) => {
               const commandData = data.detail;

               if (commandData.command === 'command') {
                   //call client code that will react to the received command
               }
           });
       }, []);

       return <alan-button ref={alanBtnComponent} alan-key="YOUR_KEY_FROM_ALAN_STUDIO_HERE" />;
   };
   ...

In the ``useEffect`` hook, we have the code for the Alan button event listener. Here we subscribe to events received from the voice script and define how our app must react to these events.

Let's update the ``if`` block for the event listener:

.. code:: javascript

   //AlanBtn.tsx file
   ...
   const AlanBtn: React.FC = (props: any) => {
       const alanBtnComponent = useRef<any>(null);

       useEffect(() => {
           alanBtnComponent.current.addEventListener('command', (data: CustomEvent) => {
               const commandData = data.detail;
               //If the navigation command is received, pass to the tab with the specified number 
               if (commandData.command === 'navigation') {
                   props.history.push(`/tab${commandData.tabNumber}`);
               }
           });
       }, []);

       return <alan-button ref={alanBtnComponent} alan-key="YOUR_KEY_FROM_ALAN_STUDIO_HERE" />;
   };
   ...

Here is how it works: when our app receives the ``navigation`` command from the voice script, we use the ``push`` method to go to the tab having the number obtained from the user utterance.

You can test it: run the app, click the Alan button and say: ``Go to the second tab``. The app will open the second tab. Then say: ``Go to the fifth tab``. Alan will reply: ``The tab with this number is not found``.
