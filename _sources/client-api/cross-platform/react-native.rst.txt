Alan React Native Framework
===========================

Available on: :badge:`Android,badge-info` :badge:`iOS,badge-success`

To add Alan voice to a React Native app, you need to do the following:

1. `Set up the environment <#set-up-the-environment>`__
2. `Install the Alan React Native
   plugin <#install-the-alan-react-native-plugin>`__
3. `Add the Alan button to the app <#add-the-alan-button-to-the-app>`__
4. `Run the app on iOS <#run-the-app-on-ios>`__ or `run the app on
   Android <#run-the-app-on-android>`__ or `use the debug
   mode <#run-the-app-in-the-debug-mode>`__

Set up the environment
----------------------

Before you start integrating a React Native app with Alan, make sure all necessary tools are installed on your computer.

-  Install ``react-native-cli`` globally:

   .. code:: bash
   
      $ npm install -g react-native-cli``

-  (For iOS) Install CocoaPods to manage dependencies for Xcode projects:

   .. code:: bash

       $ sudo gem install cocoapods

Install the Alan React Native plugin
------------------------------------

To add the Alan React Native plugin to your app:

1. Navigate to the app folder:

   .. code:: bash

       $ cd myapp

2. Install the plugin:

   .. code:: bash

       $ npm i @alan-ai/alan-sdk-react-native --save

.. raw:: html

Add the Alan button to the app
------------------------------

Once the plugin is installed, you need to add the Alan button to your React Native app.

1. Add the Alan button and Alan text panel to the app. In the app folder, open ``App.js`` and add the following import statement at the top of the file:

   .. code:: javascript

       import { AlanView } from './AlanSDK.js';

2. In the ``App.js`` file, add a view with the Alan button and Alan text panel:

   .. code:: javascript

       return (
           <AlanView
             projectid={
               ''
             }
           />
         );

3. In ``projectID``, specify the Alan SDK key for your Alan Studio project. To get the key, in Alan Studio, at the top of the code editor, click **Integrations** and copy the value from the **Alan SDK Key** field.

   .. code:: javascript

       return (
           <AlanView
             projectid={
               'cc2b0aa23e5f90d2974f1bf6b6929c1b2e956eca572e1d8b807a3e2338fdd0dc/prod'
             }
           />
         );

4. You need to add a listener for events that will be coming from the Alan voice script. To start listening for events, in ``App.js``, add the following import statement:

   .. code:: javascript
      import { NativeEventEmitter, NativeModules } from 'react-native';``

5. In ``App.js``, create a new ``NativeEventEmitter`` object:

   .. code:: javascript

       const { AlanManager, AlanEventEmitter } = NativeModules;
       const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);

6. And subscribe to the voice script events:

   .. code:: javascript
   
      const subscription = alanEventEmitter.addListener('command', (data) => {         console.log(`got command event ${JSON.stringify(data)}`);     });``

7. Do not forget to remove the listener in your ``App()`` class:

   .. code:: javascript

       componentWillUnmount() {
           subscription.remove();
       }

Run the app on iOS
------------------

To run your app integrated with Alan on the iOS platform, you need to update the app settings for iOS.

1. In the Terminal, navigate to the ``ios`` folder in your app:

   .. code:: bash

       $ cd ios

2. In the ``ios`` folder, open the Podfile and change the minimum iOS version to 11:

   .. code:: ruby

       platform :ios, '11.0'
       ...

3. In the Terminal, run the following command to install dependencies for the project:

   .. code:: bash

       $ pod install

4. In the ``ios`` folder, open the generated XCode workspace file: ``<appname>.xcworkspace``. You should use this file to open your Xcode project from now on.

5. In iOS, the user must explicitly grant permission for an app to access the device microphone and camera. The ``Info.plist file`` of the app must contain ``NSMicrophoneUsageDescription`` and ``NSCameraUsageDescription`` keys with string values explaining how the app uses this data.

   To add the keys:

   a. In Xcode, go to the **Info** tab.

   b. In the **Custom iOS Target Properties** section, hover over any key in the list and click the plus icon to the right.

   c. From the list, select **Privacy - Microphone Usage Description**.

   d. In the **Value** field to the right, provide a description for the added key. This description will be displayed to the user when the app is launched.

   e. Repeat the steps above to add the **Privacy - Camera Usage Description** key.

   .. image:: /_static/assets/img/ios-quickstart-objc/pods-mic.png
      
6. In the Terminal, navigate to the app folder, up one folder level:

   .. code:: bash

       cd ..

7. To run your React Native app integrated with Alan on the iOS platform, use the following command:

   .. code:: bash

       $ react-native run-ios

   or

   .. code:: bash

       $ yarn ios

You can also open the ``<appname>.xcworkspace`` file in XCode and test drive the app on the simulator.

Run the app on Android
----------------------

To run your React Native app integrated with Alan on the Android platform:

1. Make sure the correct minimum SDK version is set for your app: ``minSdkVersion 21``. To check the version, open the
   ``/android/app/build.gradle`` file, under ``defaultConfig``, locate ``minSdkVersion`` and update its value if necessary.

2. Run the app using the following command:

   .. code:: bash

       $ react-native run-android

   or

   .. code:: bash

       $ yarn android

You can also launch the app from the Android Studio: open ``<app>/android`` in the IDE and run the app in a usual way.

Run the app in the Debug mode
-----------------------------

You can run your app on iOS or Android in the debug mode. The debug mode allows you to hot reload the app on the device or simulator as soon as you update anything in the app.

To run the app in the debug mode, make sure the Metro bundler is started. To start the Metro bundler, in the Terminal, run the following command:

.. code:: bash

    $ react-native start

The Terminal window with the Metro bundler will be launched. You can then run your app as usual with the following commands:

-  For iOS: ``$ react-native run-ios`` or ``$ yarn ios``
-  For Android: ``$ react-native run-android`` or ``$ yarn android``


.. raw:: html

   <div id="purple-background"></div>