Alan Ionic Framework
====================

Available on: :badge:`Web platform,badge-primary` :badge:`Android,badge-info` :badge:`iOS,badge-success`

.. raw:: html

   <iframe width="560" height="315" src="https://www.youtube.com/embed/NK8B5Qc-8x8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Integration
-----------

Alan can be integrated with apps based on the following platforms:

-  `Angular <#integrate-with-an-ionic-angular-app>`__
-  `React <#integrate-with-an-ionic-react-app>`__


Integrate with an Ionic Angular app
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To integrate an Ionic Angular app with Alan:

1. Navigate to the folder where your app resides:

   .. code:: bash

      $ cd /myApp

2. Install the Alan SDK Cordova component:

   .. code:: bash

      $ npm install @alan-ai/cordova-plugin-alan-voice --save
   
3. Install the Alan Web Component package:

   .. code:: bash
   
      $ npm install @alan-ai/alan-button --save

   .. note::
   
      For Ionic apps, you need to install the ``@alan-ai/alan-button`` and ``@alan-ai/cordova-plugin-alan-voice`` packages, not the    ``@alan-ai/alan-sdk-web`` package. Ionic apps can be run on mobile devices with Cordova; they require special versions of the Alan button.

4. Modify the app to enable the Alan button:

   a. Enable usage of custom HTML tags with AngularJS in the app. Include ``CUSTOM_ELEMENTS_SCHEMA`` in all modules where you will use custom elements:

      .. code:: typescript

         // app.module.ts file
         ...
         import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
         ...

         @NgModule({
            ...
           schemas: [CUSTOM_ELEMENTS_SCHEMA],
            ...
         })
         export class AppModule {}

   b. Register the Alan button Web Component. In ``main.ts``, import the ``@alan-button`` component and call the ``defineCustomElements(window)`` method:

      .. code:: typescript

         // main.ts file
         ...
         import {defineCustomElements as alanBtnDefineCustomElements} from '@alan-ai/alan-button/dist/loader';
         ...
         alanBtnDefineCustomElements(window);

   c. Add the Alan button HTML tag to the main app’s template. Open ``app.component.html`` and add the following tag:

      .. code:: html

         <ion-app>
             <ion-router-outlet></ion-router-outlet>
             <alan-button #alanBtnEl alan-key="YOUR_KEY_FROM_ALAN_STUDIO_HERE"></alan-button>
         </ion-app>

   d. In the Alan button HTML tag, replace ``YOUR_KEY_FROM_ALAN_STUDIO_HERE`` with the Alan SDK key for your Alan Studio project. To get the key, in Alan Studio, at the top of the code editor, click **Integrations** and copy the value from the **Alan SDK Key** field.

      .. code:: html

         <ion-app>
             <ion-router-outlet></ion-router-outlet>
             <alan-button #alanBtnEl alan-key="ff4f9c03e405a5a07d43485dbc3cb44a2e956eca572e1d8b807a3e2338fdd0dc/prod"></alan-button>
         </ion-app>

5. In the ``src/app`` folder, in ``app.component.ts``, make the following changes:

   a. Add the import statement for the Alan button Web Component:

      .. code:: typescript

         import "@alan-ai/alan-button";

   b. In the ``AppComponent`` class, use ``@ViewChild`` to add a reference to the Alan button element:

      .. code:: typescript

         @ViewChild('alanBtnEl', {static:false}) alanBtnComponent: ElementRef<HTMLAlanButtonElement>;

   c. Replace the first import statement with the following one:

      .. code:: typescript

         import { Component, ElementRef, ViewChild } from '@angular/core';

   d. In the ``AppComponent`` class, in the ``ngAfterViewInit()`` method, add a listener for the ``command`` event. All commands       sent from the voice script will be passed to this method. It’s a place where you can set up logic on how the app will react to commands from the voice script.

      .. code:: typescript

         ngAfterViewInit() {
             this.alanBtnComponent.nativeElement.addEventListener('command', (data) => {
                   const commandData = (<CustomEvent>data).detail;

                   if (commandData.command === 'navigation') {
                       //call client code that will react to the received command
                   }
             });
         }

That's it. You can now add voice commands to the script in Alan Studio, run the app, click the Alan button and interact with the app with voice.

Integrate with an Ionic React app
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To integrate an Ionic React app with Alan:

1. Navigate to the folder where your app resides:

   .. code:: bash

      $ cd /myApp

2. Install the Alan SDK Cordova component:

   .. code:: bash

      $ npm install @alan-ai/cordova-plugin-alan-voice --save
	  
3. Install the Alan Web Component package:

   .. code:: bash
   
      $ npm install @alan-ai/alan-button --save
	  
   .. note:: 

      For Ionic apps, you need to install the ``@alan-ai/alan-button`` and ``@alan-ai/cordova-plugin-alan-voice`` packages, not the  ``@alan-ai/alan-sdk-web`` package. Ionic apps can be run on mobile devices with Cordova; they require special versions of the Alan button.

4. Create a wrapper component for the Alan button. In the ``src/components`` app folder, create the ``AlanBtn.tsx`` file:

   .. code:: typescript

       //AlanBtn.tsx file
       import React, {
           useEffect,
           useRef,
       } from 'react';
       import { withRouter } from 'react-router';

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

       export default withRouter(AlanBtn);

   The Effect Hook in the Alan button component lets you subscribe to command events from Alan. It’s a place where you can set up logic on
   how your app will react to commands received from the voice script.

5. In ``alan-key``, replace ``YOUR_KEY_FROM_ALAN_STUDIO_HERE`` with the Alan SDK key for your Alan Studio project. To get the key, in Alan
   Studio, at the top of the code editor, click **Integrations** and copy the value from the **Alan SDK Key** field.

   .. code:: typescript

       //AlanBtn.tsx file
       ...
       const AlanBtn: React.FC = (props: any) => {
           ...
           return <alan-button ref={alanBtnComponent} alan-key="6f60897fd223a4367d43485dbc3cb44a2e956eca572e1d8b807a3e2338fdd0dc/stage" />;
       };

       export default withRouter(AlanBtn);

6. In the ``App.tsx`` file, add the following import statement to import the Alan button component:

   .. code:: typescript

      import AlanBtn from './components/AlanBtn';

7. In the ``App.tsx`` file, add the Alan button component:

   .. code:: javascript

      //App.tsx file
      ...
      const App: React.FC = () => (
          <IonApp>
              <IonReactRouter>
                  ...
                  <AlanBtn />
              </IonReactRouter>
          </IonApp>
      );
      ...

8. In the ``src`` folder, create a typescript declaration file named ``alan-btn.d.ts``:

   .. code:: typescript

      //alan-btn.d.ts file
      declare namespace JSX {
          interface IntrinsicElements {
              [tagName:string]: any
          }
      }

9. In the ``index.tsx`` file, import the Alan button component loader and call the loader:

   .. code:: typescript

       //index.tsx file
       ...
       import {
           applyPolyfills,
           defineCustomElements,
       } from '@alan-ai/alan-button/dist/loader';

       ...
       applyPolyfills().then(_ => {
           defineCustomElements();
       });

That's it. You can now add voice commands to the script in Alan Studio, run the app, click the Alan button and interact with the app with voice.

Run Ionic apps on iOS and Android
---------------------------------

To build and deploy your Ionic app as a native iOS or Android app, you can use:

-  `Capacitor <#capacitor>`__
-  `Cordova <#cordova>`__

Capacitor
~~~~~~~~~

To use Capacitor, run the following commands to add a new platform-specific folder to your project and open the IDE for the native
project:

-  For iOS:

   .. code:: bash

       ionic capacitor add ios
       ionic capacitor open ios 

-  For Android:

   .. code:: bash

      ionic capacitor add android
      ionic capacitor open android 

   On the iOS platform, you need to disable Bitcode for your app builds. For details, see Disable Bitcode for Capacitor iOS.

Cordova
~~~~~~~

To use Cordova, do the following:

1. `Install the Cordova CLI <#step-1-install-the-cordova-cli>`__
2. `Build and run the app <#step-2-build-and-run-the-app>`__

Step 1. Install the Cordova CLI
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To install the Cordova CLI, run the following command:

.. code:: bash
   
   $ npm install -g ionic cordova
   
For Mac or Linux, you may need to run the command with ``sudo``.

Step 2. Build and run the app
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To run an Ionic app on an iOS or Android device or simulator, use the commands below. For more details, see the Ionic CLI documentation.

1. To add a platform for which you want to build the app, run the following commands:

   .. code:: bash

       ionic cordova platform add ios
       ionic cordova platform add android

2. To build the app for iOS or Android, run the following commands:

   .. code:: bash

       ionic cordova platform build ios
       ionic cordova platform build android

3. (For iOS) To set the ``NSMicrophoneUsageDescription`` and ``NSCameraUsageDescription`` in iOS, run the following commands. These commands will add declarations to the ``Info.plist`` file.

   .. code:: bash

      ionic cordova plugin add cordova-plugin-ios-microphone-permissions
      ionic cordova plugin add cordova-plugin-ios-camera-permissions

4. To launch the app on a device or simulator, run the following
   commands:

   .. code:: bash

      ionic cordova platform run ios
      ionic cordova platform run android

   You may need to install the ``native-run`` globally. To do this, run:
   
   .. code:: bash
   
      npm i -g native-run

.. warning:: 

   The Alan button won't work if you run the app using Ionic DevApp. The Ionic DevApp works with the limited list of Cordova plugins, and while there is no ``@alan-ai/cordova-plugin-alan-voice`` in this list, the button won't appear.
   
.. raw:: html

   <div id="purple-background"></div>