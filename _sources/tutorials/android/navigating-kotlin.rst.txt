.. raw:: html

   <div id="orange-background"></div>

Navigating between screens in an Android app (Kotlin)
=====================================================

If your Android app has multiple activities, you can add commands to start these activities from the voice script. In this tutorial, we will use a simple app with two screens to see how to navigate between them with voice.

What you will learn
-------------------

-  How to send commands from the voice script to an Android app
-  How to handle commands on the Android app side
-  How to navigate between screens in an Android app with voice


What you will need
------------------

For this tutorial, we will use the example Android app integrated with Alan. To get the app: 

1. Clone the Alan Android SDK repository to your computer:

   .. code:: bash
   
      git clone https://github.com/alan-ai/alan-sdk-android.git

2. Go to the app folder: ``alan-sdk-android/examples/alan-example-integration-kotlin``.

3. Open the app in the IDE.

4. In the project, open the ``MainActivity.kt`` file and in ``setProjectId``, replace the Alan SDK key with the key for your Alan Studio project:

   .. code:: java

      class MainActivity : AppCompatActivity() {
          override fun onCreate(savedInstanceState: Bundle?) {
              ....
              val alanConfig = AlanConfig.builder()
                  .setProjectId("b23c22fa051d81b47d43485dbc3cb44a2e956eca572e1d8b807a3e2338fdd0dc/stage")
                  .build()
              alan_button.initWithConfig(alanConfig)
          }
      }

Step 1: Add the Navigation component and fragments
--------------------------------------------------

In this tutorial, we will use the Navigation Android component to switch between the app screens. So first let's add the Navigation component and fragments to the app.

1. Create a navigation graph:

   a. In the IDE, right-click the ``res`` folder and select **New** > **Android Resource File**.

   b. In the **New Resource File** window, in the **File name** field, specify the name for the component, for example, ``main_nav``.

   c. From the **Resource type** list, select ``Navigation``.
   
   .. image:: /_static/assets/img/tutorial-andr-navigate/navigation-component.png

   When prompted, import the libraries required for this component.

2. Next, we need to add the navigation host that will handle swapping fragment destinations. In the ``res/layout`` folder, open the main activity layout file. In the main activity layout, find the
   ``TextView`` section:

   .. code:: xml

      <TextView
          android:id="@+id/textView"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          android:text="Hello Alan!"
          app:layout_constraintBottom_toBottomOf="parent"
          app:layout_constraintLeft_toLeftOf="parent"
          app:layout_constraintRight_toRightOf="parent"
          app:layout_constraintTop_toTopOf="parent" />

   and replace it with:

   .. code:: xml

      <fragment
          android:layout_width="match_parent"
          android:layout_height="match_parent"
          android:id="@+id/nav_host_fragment"
          android:name="androidx.navigation.fragment.NavHostFragment"
          app:navGraph="@navigation/main_nav"
          app:defaultNavHost="true" />

3. Let's create new destinations:

   a. In the ``res/layout/navigation`` folder, open the ``main_nav.xml`` file and switch to the Design view.

   b. At the top of the view, click the **New Destination** button and select **Create new destination**.

   c. Select to create a blank fragment and click **Next**. In the **Fragment Name** field, specify the fragment name, for example, ``screen1`` and click **Finish**.
   
   .. image:: /_static/assets/img/tutorial-andr-navigate/screen-fragment.png

   d. Repeat steps a-c for the second screen and name it ``screen2``. Place the second screen to the right of the first one.

4. We now need to connect the created destinations. In the graph, select the first screen, click the circle at the right side of it, drag to the second screen and release. Repeat the same for the second screen to connect it to the first one.

   .. image:: /_static/assets/img/tutorial-andr-navigate/destinations-connect.png

5. Specify IDs for the created connections. To set the IDs, select a connection and in the **Attributes** section, in the **ID** field, enter the ID:

   -  ``action_global_screen2`` for the connection to the second screen
   -  ``action_global_screen1`` for the connection to the first screen
   
   .. image:: /_static/assets/img/tutorial-andr-navigate/connection-id.png

   We will address these IDs later, when we handle commands sent from the Alan script.

6. When we added two fragments to the graph, two files were automatically created for these fragments: ``screen1.kt`` and ``screen2.kt``. In the app folder, open these files and replace their content with the following:

   -  For ``screen1.kt``:

   .. code:: kotlin

      // screen1.kt file
      package app.alan.exampleintegration.kotlin

      import android.os.Bundle
      import androidx.fragment.app.Fragment
      import android.view.LayoutInflater
      import android.view.View
      import android.view.ViewGroup
      import app.alan.basicexample.R

      class Screen1 : Fragment() {

          override fun onCreateView(
              inflater: LayoutInflater, container: ViewGroup?,
              savedInstanceState: Bundle?
          ): View? {
              // Inflate the layout for this fragment
              return inflater.inflate(R.layout.fragment_screen1, container, false)
          }
      }

   -  For ``screen2.kt``:

   .. code:: kotlin

      // screen2.kt file
      package app.alan.exampleintegration.kotlin

      import android.os.Bundle
      import androidx.fragment.app.Fragment
      import android.view.LayoutInflater
      import android.view.View
      import android.view.ViewGroup
      import app.alan.basicexample.R

      class Screen1 : Fragment() {

          override fun onCreateView(
              inflater: LayoutInflater, container: ViewGroup?,
              savedInstanceState: Bundle?
          ): View? {
              // Inflate the layout for this fragment
              return inflater.inflate(R.layout.fragment_screen2, container, false)
          }
      }

7. Go back to the ``main_nav.xml`` file, select a screen in the graph and in the **Attributes** section, check the **Name** field. Make sure the first screen is associated with ``Screen1``, and the second screen is associated with ``Screen2``.

That's it. We now have two screens in our app. Let's proceed with voice commands.


Step 2: Add voice commands to navigate between screens
------------------------------------------------------

We need to add new `commands <../../server-api/commands-and-responses.html>`__ to the Alan script to navigate between screens with voice. In Alan Studio, open the project and in the code editor, add the following intents:

.. code:: javascript

   intent(`Navigate forward`, p => {
           p.play({command: 'navigation', route: 'forward'});
           p.play(`Navigating forward`);
   });

   intent(`Go back`, p => {
           p.play({command: 'navigation', route: 'back'});
           p.play(`Going back`);
   });

Now, when we say one of these commands to the app, two things happen:

-  Alan plays back the action confirmation to us.
-  Alan sends the command provided in the intent to the Android app. To send the command, we need to specify a JSON object in the ``p.play`` function. Here the object contains the command name.

Step 3: Handle commands on the app side
---------------------------------------

When we say ``Navigate forward`` or ``Go back``, Alan sends a command to the Android app. We need to handle this command on the app side and make sure an appropriate action is performed. To do this, we will add a
handler to the app.

In the IDE, open the ``MainActivity.kt`` file and in the ``onCreate()`` function of the ``MainActivity`` class, register the Alan callback:

.. code:: kotlin

   class MainActivity : AppCompatActivity() {
       override fun onCreate(savedInstanceState: Bundle?) {
           ...
           val alanConfig = AlanConfig.builder()
                   .setProjectId("b23c22fa051d81b47d43485dbc3cb44a2e956eca572e1d8b807a3e2338fdd0dc/stage")
                   .build()
           alan_button.initWithConfig(alanConfig)
            
           // Register the Alan callback
           alan_button.registerCallback(
                   object : AlanCallback() {
                       override fun onCommandReceived(eventCommand: EventCommand?) {
                           super.onCommandReceived(eventCommand)
                           eventCommand?.data?.let {
                               if (it.optString("command") == "navigation") {
                                   if (it.optString("route") == "forward") {
                                       Navigation.findNavController(this@MainActivity, R.id.nav_host_fragment).navigate(R.id.action_global_screen2)
                                   } else {
                                       Navigation.findNavController(this@MainActivity, R.id.nav_host_fragment).navigate(R.id.action_global_screen1)
                                   }
                               }
                           }
                       }
                   }
           )
       }
   }

Here is how it works: when the Android app receives a command from the voice script, ``onCommandReceived`` is invoked. If the received command ``navigation``, the app checks the command route: 

- If the route is ``forward``, the app uses the ``action_global_screen2`` connection to bring you to the second screen.
- If the route has any other value, the app uses the ``action_global_screen1`` connection to bring you to the
first screen.

You can test it: run the app, tap the Alan button and say: ``Navigate forward``. The app will open the second screen. Then say ``Go back``, and the home screen will be displayed.

What you finally get
--------------------

After you pass through this tutorial, you will have an Android app with two screens and will be able to navigate in the app with voice.

You can get an example of such an app from the Alan GitHub to make sure you have set up your app correctly: `Navigation tutorial branch for the Android Kotlin example app <https://github.com/alan-ai/alan-sdk-android/tree/navigating/examples/alan-example-integration-kotlin>`__.


What's next?
------------

Have a look at the next tutorial: `Passing the app state to the voice script <sending-data.html>`__.