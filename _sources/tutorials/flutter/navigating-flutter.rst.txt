.. raw:: html

   <div id="orange-background"></div>

Navigating between screens in a Flutter app
===========================================

If your Flutter app has several screens, you can add voice commands to navigate through the app. For example, if the app shows a list of products, you may let the user open product details and then go back to the products list with voice. In this tutorial, we will add a new screen to our simple Flutter app and create voice commands to navigate between the app screens.

What you will learn
-------------------

-  How to send commands to a Flutter app
-  How to handle commands on the Flutter app side
-  How to navigate between screens of a Flutter app with voices

What you will need
------------------

To go through this tutorial, make sure the following prerequisites are met:

-  You have completed the following tutorial: `Building a voice assistant for a Flutter
   app <integrating-flutter.html>`__.
-  You have set up the Flutter environment and it is functioning properly. For details, see Flutter documentation.
-  The device on which you are planning to test drive the Flutter app is connected to the Internet. The Internet connection is required to let the Flutter app communicate with the voice script run in the Alan Cloud.

Step 1: Add a new screen to the Flutter app
-------------------------------------------

.. note::

   This step is required if you are using the Flutter app created in the `previous tutorial <integrating-flutter.html>`__. You can also use your own app with several screens. In this case, skip this step and go to `step 2 <#step-2-add-voice-commands-for-navigation>`__.

In the `Adding voice to a Flutter app <integrating-flutter.html>`__ tutorial, we have created a single-screen Flutter app with the Alan button. Now let's add a new screen to this app.

Open the app, go to the ``main.dart`` file and add the code for the second screen:

.. code:: dart

   ...
   class SecondRoute extends StatelessWidget {
     @override
     Widget build(BuildContext context) {
       return Scaffold(
         appBar: AppBar(
           title: Text("Flutter Demo Second Page"),
         ),
         body: Center(
           child: RaisedButton(
               onPressed: () {
                 Navigator.pop(context);
               },
             child: Text('Go back'),
           ),
         ),
       );
     }
   }
   ...

The second screen contains only one button that brings us back to the home screen. Let's also add a button to the home screen to navigate to the second screen. To the body of the home screen, add the following button code:

.. code:: dart

   ...
   @override
     Widget build(BuildContext context) {
       ...
         body: Center(
           ...
           child: Column(
             ...
              
             children: <Widget>[
               ...
               Text(
                 '$_counter',
                 style: Theme.of(context).textTheme.display1,
               ),
               //Button code
               RaisedButton(
                 child: Text('Navigate forward'),
                 onPressed: () {
                   Navigator.push(
                     context,
                     MaterialPageRoute(builder: (context) => SecondRoute()),
                   );
                 },
               ),//Button code
       ...
   }
   ...

You can test it: run the app. Now our app has two screens, and we can navigate between them. Tap the ``Navigate forward`` and ``Go back`` buttons to go to the second screen and back.

.. image:: /_static/assets/img/tutorial5/screens.jpg

Step 2: Add voice commands for navigation
-----------------------------------------

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

-  Alan sends the command provided in the intent to the Flutter app. To send the command, we need to specify a JSON object in the ``p.play`` function. In this tutorial, the object contains the command name and the route we want to pass to the app: ``forward`` or ``back``.
-  Alan plays back the action confirmation to us.

Step 3: Handle commands on the app side
---------------------------------------

When we say ``Navigate forward`` or ``Go back``, Alan sends a command to the Flutter app. We need to handle this command on the app side and make sure an appropriate action is performed. To do this, we will add a handler in the app.

1. In the ``main.dart`` file, locate the ``_MyHomePageState()`` method and add a listener for the ``command`` event. All commands sent from the voice script will be passed to this method:

   .. code:: dart

      ...
      class _MyHomePageState extends State<MyHomePage> {
      ...
          _MyHomePageState() {
              //Init Alan with sample project id
              AlanVoice.addButton(
                  "ff4f9c03e405a5a07d43485dbc3cb44a2e956eca572e1d8b807a3e2338fdd0dc/stage",
                  buttonAlign: AlanVoice.BUTTON_ALIGN_LEFT);

              //Add listener for command event
              AlanVoice.callbacks.add((command) => _handleCommand(command.data));
          }
      ...
      }
      ...

2. To the ``_MyHomePageState`` class, add the ``_handleCommand()`` method. It will handle commands passed from the voice script:

   .. code:: dart
   
      ...
          void _handleCommand(Map<String, dynamic> command) {
              switch (command["command"]) {
                  case "navigation":
                      _navigateTo(command["route"]);
                      break;
                  default:
                      debugPrint("Unknown command: ${command}");
              }
          }
      ...

   .. tip:: 

      At present, there is only one command. You can add more commands when you extend your voice script and send more commands to the app.

3. Finally, to the ``_MyHomePageState`` class, add the ``_navigateTo`` method. It does the same as tapping the ``Navigate forward`` and ``Go back`` buttons.

   .. code:: dart

      ...
          void _navigateTo(String screen) {
              switch (screen) {
                  case "forward":
                      Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) => SecondRoute()),
                      );
                      break;
                  case "back":
                      Navigator.pop(context);
                      break;
                  default:
                      print("Unknown screen: $screen");
              }
          }
       ...

Here is how it works: when the Flutter app receives some command from the voice script, ``_handleCommand`` is invoked. If the sent command is ``navigation``, the app uses the ``_navigateTo()`` function to go to the second screen or back to the home screen, depending on the ``route`` provided in the command: ``forward`` or ``back``.

You can test it: run the app on the device, tap the Alan button and say: ``Navigate forward``. The app should switch you to the second screen. Then say ``Go back``. The home screen will be displayed.

What's next?
------------

Have a look at the next tutorial: `Passing the app state to the voice
script <sending-data-flutter.html>`__.
