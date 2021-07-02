.. raw:: html

   <div id="orange-background"></div>

Navigating between tabs in an Ionic Angular app
===============================================

If your Ionic Angular app has several tabs, you can add voice commands to navigate through the app. In this tutorial, we will use a simple Ionic app with three tabs to demonstrate how to use voice commands to switch between them.

What you will learn
-------------------

-  How to send commands from the voice script to an Ionic Angular app
-  How to set up the Alan event listener and handle commands on the app side
-  How to navigate between tabs in an Ionic Angular app with voice

What you will need
------------------

To go through this tutorial, make sure the following prerequisites are met:

-  You have completed the following tutorial: `Building a voice assistant for an Ionic Angular
   app <integrating-angular.html>`__.
-  The environment for using the Ionic framework is properly set up. For details, see `Ionic documentation <https://ionicframework.com/docs/intro/environment>`__.

We will use an example Ionic Angular app provided by Alan. You can also use your own app with several tabs. Make sure you have added the Alan button to the app as described in the `previous
tutorial <integrating-angular.html>`__.


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

The user can now give a voice command to go to a specific tab in the app. In the intent, we use the `ORDINAL <../../server-api/slots.html#ordinal>`__ predefined slot. This slot allows us to catch the ordinal number in the user utterance. If the caught number is ``first``, ``second`` or ``third``, the ``navigation`` command and the tab number will be sent from the voice script to the app. If the voice command contains some other number, Alan will report that such tab is not found.


Step 2: Inject NavController
----------------------------

For this tutorial, we will use NavController to switch between the app tabs. We need to update the Ionic app to inject NavController.

1. In the Ionic app, go to ``src/app`` and open the ``app.component.ts`` file.
2. Find the following import statement:

   .. code:: javascript

      import { Platform } from '@ionic/angular'

   And replace it with:
   
   .. code:: javascript

      import { Platform, NavController } from '@ionic/angular';

3. To ``constructor`` of the ``AppComponent`` class, add ``private navCtrl: NavController``:

   .. code:: javascript

      ...
      export class AppComponent {

      @ViewChild('alanBtnEl', {static:false}) alanBtnComponent: ElementRef<HTMLAlanButtonElement>;

      constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private navCtrl: NavController
      ) {
        this.initializeApp();
      }
      ...

   `see full source <../../_static/assets/img/ionic/app.component.ts.txt>`__


Step 3: Handle commands on the app side
---------------------------------------

Now, when we say, for example, ``Go to the second tab``, Alan sends the ``navigation`` command and the ``2`` tab number to the app. We need to handle this command on the app side and make sure the app opens the
necessary tab when the command is received. To do this, we will add a handler to the app.

1. In the Ionic app, go to ``src/app`` and open the ``app.component.ts`` file.
2. In the ``ngAfterViewInit()`` method, update the code for the Alan button event listener:

   .. code:: javascript

      ngAfterViewInit() {
          this.alanBtnComponent.nativeElement.addEventListener('command', (data) => {
              const commandData = (<CustomEvent>data).detail;

              if (commandData.command === 'navigation') {
                  //call client code that will react to the received command
                  this.navCtrl.navigateForward([`/tabs/tab${commandData.tabNumber}`]);
              }
          });
      }

Here is how it works: when our app receives the ``navigation`` command from the voice script, the ``navigateForward`` method is invoked to go to the tab having the number obtained from the user utterance.

You can test it: run the app, click the Alan button and say: ``Go to the second tab``. The app will open the second tab. Then say: ``Go to the fifth tab``. Alan will reply: ``The tab with this number is not found``.

What's next?
------------

Have a look at the next tutorial: `Passing the app state to the voice script (Ionic Angular) <sending-data-angular.html>`__.
