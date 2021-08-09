.. raw:: html

   <div id="orange-background"></div>

Building a voice assistant for an Angular app
=============================================

You can create a voice assistant or chatbot and embed it to your Angular app with Alan's `voice assistant SDK for
Web <../../client-api/web/web-api.html>`__. In this tutorial, we will create a simple voice enabled Angular app. The app users will be able to click the Alan button and give custom voice commands, and Alan will reply to
them.

What you will learn
-------------------

-  How to add a voice interface to an Angular app
-  How to write simple voice commands for an Angular app


What you will need
------------------

To go through this tutorial, make sure Node.js and the Angular CLI are installed on your machine. For details, see `Angular documentation <https://angular.io/guide/setup-local>`__.

Step 1. Sign up for Alan Studio
-------------------------------

First, we need to sign up for Alan Studio — the web portal where we will create a dialog scenario, or the voice script, for our voice assistant.

1. Go to Alan Studio.
2. Sign up with a Google or GitHub account or with your email address.

   .. tip:: 
      When you sign up, Alan adds free interactions to your balance to let you get started. To get additional interactions to your balance, sign up with your GitHub account or connect your Alan account with your GitHub account and give stars to `Alan repositories <https://github.com/alan-ai>`__.

3. In Alan Studio, click **Create Voice Assistant**. Select to create an empty project and give it any name you want.

Step 2: Create an Angular app
-----------------------------

Now let's create a simple Angular app.

1. On your machine, navigate to the folder in which the app will reside and run the following command:

   .. code:: bash

      $ ng new my-app

   The ``ng`` new command will prompt about features to include in the app. Press **Enter** on your keyboard to create an app with default features.

2. Switch to the folder with the app:

   .. code:: bash

      $ cd my-app

3. Start the app:

   .. code:: bash

      $ ng serve --open
   
   .. image:: /_static/assets/img/web-frameworks/angular-app-starter.png

Step 3: Install the Alan Web component
--------------------------------------

We need to add the Alan Web component to the app. In the app folder, install the Alan Web component with the following command:

.. code:: bash

   $ npm i @alan-ai/alan-sdk-web

Step 4: Add the Alan button to the app
--------------------------------------

Now we need to update our app to add the Alan button to it.

1. In the ``src/app`` folder, open the ``app.component.ts`` file.
2. At the top of the file, add the import statement for the Alan Web component:

   .. code:: javascript

      import alanBtn from "@alan-ai/alan-sdk-web";

3. In the ``AppComponent`` class, add the Alan button:

   .. code:: javascript

      export class AppComponent {

          alanBtnInstance;

          constructor(){
              this.alanBtnInstance = alanBtn({
                  key: 'YOUR_KEY_FROM_ALAN_STUDIO_HERE',
              });
          }
      }

4. In the ``key`` field above, we need to replace ``YOUR_KEY_FROM_ALAN_STUDIO_HERE`` with the Alan SDK key for our Alan
   Studio project. In Alan Studio, at the top of the code editor, click **Integrations**, copy the value provided in the **Alan SDK Key** field and paste this value to ``key``.

   .. code:: javascript

      export class AppComponent {

          alanBtnInstance;

          constructor(){
              this.alanBtnInstance = alanBtn({
                  key: '28b4365114e0f2f67d43485dbc3cb44a2e956eca572e1d8b807a3e2338fdd0dc/stage',
              });
          }
      }

Step 5. Add voice commands
--------------------------

Let's add some `voice commands <../../server-api/commands-and-responses.html>`__ so that we can interact with our Angular app through voice. In Alan Studio, open the project and, in the code editor, add the following intents:

.. code:: javascript

   intent (`What is your name?`, p => {
       p.play(`It's Alan, and yours?`);
   });

   intent (`How are you doing?`, p => {
       p.play(`Good, thank you. What about you?`);
   });

Now in the app click the Alan button and ask: ``What is your name?`` and ``How are you doing?`` Alan will give responses provided in the intents.

.. image:: /_static/assets/img/web-frameworks/angular-app-button.png