.. raw:: html

   <div id="orange-background"></div>

Passing the app state to the voice script
=========================================

When the user interacts with an Android app, it may be necessary to send some data from the app to the voice script. For example, you may need to provide the voice script with information about the current app state.

In Alan, you can send data from the app to the voice script in the following ways:

-  With `visual state <../../server-api/sending-data/visual-state.html>`__
-  With `project API <../../server-api/sending-data/project-api.html>`__

In this tutorial, we will work with an Android app with two activities. We will send information about the current foreground activity to the voice script with the help of the visual state. On the script side, we
will use the passed state to do the following:

-  Create a voice command that will let Alan reply differently depending on the activity being current in the app
-  Create a command that can be matched only if the necessary activity is currently in the foreground


What you will learn
-------------------

-  How to pass the app state from an Android app to the voice script with the visual state
-  How to access the data passed with the visual state in the voice script
-  How to filter intents by the app state

What you will need
------------------

To go through this tutorial, make sure the following prerequisites are met:

-  You have set up the Android environment and it is functioning properly. For details, see `Android developers documentation <https://developer.android.com/guide>`__.
-  The device on which you are planning to test drive the Android app is connected to the Internet. The Internet connection is required to let the Android app communicate with the voice script run in the Alan Cloud.

Step 1: Send the app state to the voice script
----------------------------------------------

To send data from the app to the voice script, you can use Alan's visual state object. This method can be helpful, in particular, if the dialog flow in your app depends on the app state. In this case, you need to
know the app state on the script side to adjust the dialog logic. For example, you may want to use the app state to filter out some voice commands, give responses applicable to the current app state and so on.

The visual state allows you to send an arbitrary JSON object from the app to the script. You can access the passed data in the script through the ``p.visual`` runtime variable.

To send the visual state to the voice script, let's add the following code to the ``onCreate()`` method of ``MainActivity``:

.. tabbed:: Java

   .. code:: java
     
	  //MainActivity.java file
      ...
      public class MainActivity extends AppCompatActivity {

          @Override
          protected void onCreate(Bundle savedInstanceState) {
              ...
		      // Set the visual state
              JSONObject visualState = null;
              try {
                  visualState = new JSONObject("{\"activity\":\"main\"}");
              } catch (JSONException e) {
                  e.printStackTrace();
              }
              alanButton.setVisualState(visualState.toString());
		  ...
          };
      }
      ...   
	  
.. tabbed:: Kotlin

   .. code:: kotlin
     
	  //MainActivity.kt file
      ...
      class MainActivity : AppCompatActivity() {

          override fun onCreate(savedInstanceState: Bundle?) {
              ...
		      // Set the visual state
		      var visualState: JSONObject? = null
              try {
                  visualState = JSONObject("{\"activity\":\"main\"}")
              } catch (e: JSONException) {
                  e.printStackTrace()
              }
              alan_button.setVisualState(visualState.toString())
	      }
      }
      ... 

Now, when the activity is created, we call the `setVisualState() <../../client-api/methods/common-api.html#setvisualstate>`__ method of the Alan button and pass the JSON object containing information about the current activity.

Let's repeat the same for ``SecondActivity``. Mind that for the second activity, we will set the visual state to ``second``. Our second activity should look like this:

.. image:: /_static/assets/img/tutorial-java/java-set-visualstate.png

Step 2: Add a voice command with different answers for screens
--------------------------------------------------------------

Imagine we want to provide the user with a possibility to ask: ``What screen is this?`` in the app, and Alan must reply differently depending on the screen open. Let's go back to Alan Studio and add a new intent:

.. code:: js

   intent(`What screen is this?`, p => {
       let activity = p.visual.activity;
       switch (activity) {
           case "main":
               p.play(`This is the main screen`);           
               break;
           case "second":
               p.play(`This is the second screen`);           
               break;
           default:
               p.play(`This is an example Android app by Alan`);
       }      
   });

Here we use the ``p.visual.activity`` variable to access data passed with the visual state. Depending on the variable value, Alan plays back different responses.

You can test it: run the app and ask: ``What screen is this?`` Alan will get back with ``This is the main screen``. Then say ``Open the second screen`` and ask: ``What screen is this?`` Alan will answer: ``This is the second screen``.

.. image:: /_static/assets/img/tutorial-java/alan-mobile-send-data.jpg

Step 3: Create a screen-specific command
----------------------------------------

If an app has several screens, it may be necessary to create voice commands that will work for specific screens only. In Alan, you can create screen-specific commands with the help of `filters <../../server-api/sending-data/visual-state.html#filtering-commands>`__ added to intents. The filter in an intent defines conditions in which the intent can be matched. In our case, we can use information about the
open screen as the filter.

Let's modify the intent for getting back to the home screen. This command must work only if the second screen is open; we cannot say ``Go back`` when at the home screen. In Alan Studio, update this intent to the following:

.. code:: javascript

   const vScreen = visual({"activity": "second"});

   intent(vScreen, "Go back", p => {
       p.play('Going back');
       p.play({command: 'goBack'})
   });

The filter comes as the first parameter in the intent. Now this intent will be matched only if the second screen is open and the visual state is ``{"activity": "second"}``.

You can test it: run the app, tap the Alan button and say: ``Open the second screen``. Then say: ``Go back``. The home screen will be displayed. When at the home screen, try saying this command again. Alan will not be able to match this intent.