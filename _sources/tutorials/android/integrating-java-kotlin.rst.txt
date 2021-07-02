.. raw:: html

   <div id="orange-background"></div>

Building a voice assistant for an Android Java or Kotlin app
============================================================

You can create a voice assistant or chatbot and embed it to your Android app written in Java or Kotlin with Alan's `voice assistant SDK for Android <../../client-api/android/android-api.html>`__. In this tutorial, we will build a simple Android app with Alan voice and test drive it on a device. The app users will be able to tap the Alan button and give custom voice commands, and Alan will reply to them.


What you will learn
-------------------

-  How to add a voice interface to an Android app
-  How to write simple voice commands for an Android app

What you will need
------------------

To go through this tutorial, make sure the following prerequisites are met:

-  You have signed up to Alan Studio.
-  You have `created a project <../../usage/guides/projects.html>`__ in Alan Studio.
-  You have set up the Android environment and it is functioning properly. For details, see `Android developers documentation <https://developer.android.com/guide>`__.
-  The device on which you are planning to test drive the Android app is connected to the Internet. The Internet connection is required to let the Android app communicate with the voice script run in the Alan Cloud.

.. tip:: 
   When you sign up, Alan adds free interactions to your balance to let you get started. To get additional interactions to your balance, sign up with your GitHub account or connect your Alan account with your GitHub account and give stars to `Alan repositories <https://github.com/alan-ai>`__.


Step 1: Create a starter Android app
------------------------------------

For this tutorial, we will be using a simple Android app with a single screen. Let's create it.

1. Open the IDE and select to start a new Android project.
2. Select **Empty activity** as the project template. Then click **Next**.
3. Enter a project name (for example, *myapp*) and select the language: *Java* or *Kotlin*. Then click **Next**. 
4. Click **Finish**.

.. image:: /_static/assets/img/tutorial-java/tutorial-java-install.png

Step 2: Integrate the app with Alan
-----------------------------------

Now we will add the Alan button to the app. Do the following:

1. Open the ``build.gradle`` file at the module level.
2. In the ``dependencies`` block, add the dependency configuration for the Alan Android SDK.

   .. code:: gradle

      //build.gradle file at the module level
      dependencies {
          ...
          //Add Alan SDK dependency
          implementation 'app.alan:sdk:4.7.15'
      }

3. Then sync the project with the gradle file. Here is what your ``build.gradle`` file should look like:

   .. image:: /_static/assets/img/tutorial-java/tutorial-java-gradle.png

4. Now we need to add the XML layout for the Alan button to the main app activity. Open the ``main_activity.xml`` file and add the following layout to it:

   .. code:: xml

      <com.alan.alansdk.button.AlanButton
          app:layout_constraintBottom_toBottomOf="parent"
          app:layout_constraintEnd_toEndOf="parent"
          android:id="@+id/alan_button"
          android:layout_width="match_parent"
          android:layout_height="wrap_content"/>

   Here is what your ``main_activity.xml`` file should look like:
   
   .. image:: /_static/assets/img/tutorial-java/tutorial-java-xml-button.png

5. Add the ``alanConfig`` object to the app. This object describes the parameters that are provided for the Alan button. To do this, open the ``MainActivity.java`` or ``MainActivity.kt`` file and add the following code to the ``MainActivity`` class:

.. tabbed:: Java

   .. code:: java
     
	  // MainActivity.java file
	  
      public class MainActivity extends AppCompatActivity {
          ...
	      @Override protected void onCreate(Bundle savedInstanceState) {
	          ...
		      // Alan button
		      AlanButton alanButton = findViewById(R.id.alan_button);
		
		      // Alan config object
		      AlanConfig alanConfig = AlanConfig.builder()
			      .setProjectId("")
			      .build();
		      alanButton.initWithConfig(alanConfig);
	      }
      }
	  
.. tabbed:: Kotlin

   .. code:: kotlin
     
	  // MainActivity.kt file
	  
      class MainActivity : AppCompatActivity() {
          ...
	      override fun onCreate(savedInstanceState: Bundle?) {
	          ...
	          // Alan config object
		      val config = AlanConfig.builder()
			      .setProjectId("")
			      .build()
		      alan_button.initWithConfig(config)
	      }
      }

6. To ``setProjectId``, we need to add the Alan SDK key for our project. To get the key, in Alan Studio, at the top of the code editor click **Integrations** and copy the key value from the **Alan SDK Key** field.

   .. image:: /_static/assets/img/tutorial-java/alan-sdk-key.png

7. In the ``MainActivity.java`` or ``MainActivity.kt`` file, import the necessary classes. Here is what your main activity file should look like:

   .. image:: /_static/assets/img/tutorial-java/tutorial-java-builder.png

8. Run the app.

After the app is built, it will be launched on the connected device. Tap the Alan button and say: ``Hello world``.

.. image:: /_static/assets/img/tutorial-java/alan-mobile.jpg

However, if you try to ask: ``How are you doing?`` Alan will not give an appropriate response. This is because the voice script in Alan Studio does not contain the necessary voice commands so far.


Step 3: Add voice commands
--------------------------

Let's add some `voice commands <../../server-api/commands-and-responses.html>`__ so that we can interact with Alan. In Alan Studio, open the project and in the code editor, add the following intents:

.. code:: javascript

   intent (`What is your name?`, p => {
       p.play(`It's Alan, and yours?`);
   });

   intent (`How are you doing?`, p => {
       p.play(`Good, thank you. What about you?`);
   });

Now in the app tap the Alan button and ask: ``What is your name?`` and ``How are you doing?`` Alan will give responses we have provided in the added intents.

.. image:: /_static/assets/img/tutorial-java/alan-mobile-script.jpg

What's next?
------------

You can now proceed to building a voice interface with Alan. Here are some helpful resources:

-  Have a look at the next tutorial: `Navigating between screens in an Android app <navigating-kotlin.html>`__.
-  Go to `Server API <../../server-api/script-concepts.html>`__ to learn about Alan concepts and functionality you can use to create a voice script.
-  In Alan Git, get the `Android Java <https://github.com/alan-ai/alan-sdk-android/tree/master/examples/alan-example-integration-java>`__ example app or `Android Kotlin <https://github.com/alan-ai/alan-sdk-android/tree/master/examples/alan-example-integration-kotlin>`__ example app. Use this example app to see how integration for Android apps can be implemented.

