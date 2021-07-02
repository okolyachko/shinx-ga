.. raw:: html

   <div id="orange-background"></div>

Passing the app state to the voice script
=========================================

When the user interacts with a Flutter app, it may be necessary to send some data from the app to the voice script. For example, you may need to provide the voice script with information about the current app state.

In Alan, you can send data from the app to the voice script in the following ways:

-  With `visual state <../../server-api/sending-data/visual-state.html>`__
-  With `project API <../../server-api/sending-data/project-api.html>`__

In this tutorial, we will work with a Flutter app having two screens. We will send information about the currently open screen to the voice script with the help of the visual state. On the script side, we will use the passed state to do the following:

-  Create a voice command that will let Alan reply differently depending on the screen open in the app
-  Create a screen-specific command that can be matched only if the necessary screen is open

What you will learn
-------------------

-  How to pass the app state from a Flutter app to the voice script with the visual state
-  How to access the data passed with the visual state in the voice script
-  How to filter intents by the app state

What you will need
------------------

To go through this tutorial, make sure the following prerequisites are met:

-  In this tutorial, we will continue using the Flutter app created in the previous tutorials. You can also use your own app with several screens. Make sure you have completed all steps from the previous tutorials:

   -  `Building a voice assistant for a Flutter app <integrating-flutter.html>`__
   -  `Navigating between screens in a Flutter app <navigating-flutter.html>`__

-  You have set up the Flutter environment and it is functioning properly. For details, see Flutter documentation.
-  The device on which you are planning to test drive the Flutter app is connected to the Internet. The Internet connection is required to let the Flutter app communicate with the voice script run in the Alan Cloud.

Step 1: Send the app state to the voice script
----------------------------------------------

To send data from the app to the voice script, you can use Alan's visual state object. This method can be particularly helpful if the dialog flow in your app depends on the app state. In this case, you need to know the app state on the script side to adjust the dialog logic. For example, you may want to filter out some voice commands, give responses applicable to a specific app state and so on.

The visual state allows you to send an arbitrary JSON object from the app to the script. You can then access the passed data through the ``p.visual`` runtime variable.

To send the visual state to the voice script, let's add the ``setVisuals()`` method to the ``_MyHomePageState`` class in the ``dart.main`` file. Here we call the `setVisualState() <../../client-api/methods/common-api.html#setvisualstate>`__ method of the Alan button and pass the object containing information about the current screen.

.. code:: dart

   ...
   void setVisuals(String screen) {
       var visual =
           "{\"screen\":\"$screen\"}";
       AlanVoice.setVisualState(visual);
   } 
   ...

Now let's to modify the ``_navigateTo()`` method. When we navigate to the second screen, we will call ``setVisuals`` and pass the ``second`` state to it. When we go back to the first screen, we will call ``setVisuals`` and pass the ``first`` state to it.

.. code:: dart

   ...
   void _navigateTo(String screen) {
       switch (screen) {
           case "forward":
               Navigator.push(
                   context,
                   MaterialPageRoute(builder: (context) => SecondRoute()),
               );
               //Set visual state to `second`
               setVisuals("second");
               break;
           case "back":
               Navigator.pop(context);
               //Set visual state to `first`
               setVisuals("first");
               break;
           default:
               print("Unknown screen: $screen");
       }
   } 
   ...

Step 2: Add a voice command with different answers for screens
--------------------------------------------------------------

Imagine we want to provide the user with a possibility to ask ``What screen is this?`` in the app, and Alan must reply differently depending on the screen open. Let's go back to Alan Studio and add a new intent to it:

.. code:: js

   intent(`What screen is this?`, p => {
       let screen = p.visual.screen;
       switch (screen) {
           case "first":
               p.play(`This is the first screen`);           
               break;
           case "second":
               p.play(`This is the second screen`);           
               break;
           default:
               p.play(`This is an example Flutter app by Alan`);
       }      
   });

Here we use the ``p.visual.screen`` variable to access data passed with the visual state. Depending on the variable value, Alan plays back different responses.

You can test it: run the app, say ``Navigate forward`` and ask: ``What screen is this?`` Alan will get back with ``This is the second screen``. Then say ``Go back`` and ask: ``What screen is this?`` Alan will answer: ``This is the first screen``.

Step 3: Set the visual state on button tap
------------------------------------------

At present, the visual state is sent only when we navigate through the app with voice. But our app is multimodal: users can interact with it either with voice or the app UI. We need to make sure the visual state is also sent when the user taps the buttons in the app.

Let's update the code blocks for buttons added to the first and second screens.

In the ``main.dart`` file, in the ``_MyHomePageState`` class, locate the code for the ``Navigate forward`` button and update it to call the ``setVisuals()`` method:

.. code:: dart

   ...
   class _MyHomePageState extends State<MyHomePage> {

     @override
     Widget build(BuildContext context) {

       return Scaffold(
         ...
         body: Center(
           child: Column(
             ...
             children: <Widget>[
               ...
               //Button code
               RaisedButton(
                 child: Text('Navigate forward'),
                 onPressed: () {
                   Navigator.push(
                     context,
                     MaterialPageRoute(builder: (context) => SecondRoute()),
                   );
                   //Set visual state to `second`
                   setVisuals("second");
                 },//Button code
               ),
             ],
           ),
         ),
         ...
       );
     }
   }
   ...

Now, when the button on the first screen is tapped, the app brings us to the second screen, and the visual state is set to ``second``.

Let's do the same for the second screen and its button. In the ``main.dart`` file, locate the ``SecondRoute`` class. First, add the ``setVisuals()`` method to it. Second, call the ``setVisuals()`` method in the code block for the ``Go back`` button and pass ``first`` to it.

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
               //Set visual state to `first`
               setVisuals("first");
             },
             child: Text('Go back'),
           ),
         ),
       );
     }

     void setVisuals(String screen) {
       var visual =
           "{\"screen\":\"$screen\"}";
       AlanVoice.setVisualState(visual);
     }
   }
   ...

Run the app and check how it works now, both when you interact with it with voice or using the UI. The result will be the same: Alan will report correctly depending on the open screen.

Step 4: Create a screen-specific command
----------------------------------------

If an app has several screens, it may be necessary to create voice commands that will work for specific screens only. In Alan, you can create screen-specific commands with the help of
`filters <../../server-api/sending-data/visual-state.html#filtering-commands>`__ added to intents. The filter in an intent defines conditions in which the intent can be matched. In our case, we can use information about the open screen as the filter.

Let's modify the intent for getting back to the first screen. This command must work only if the second screen is open; we cannot say ``Go back`` when at the first screen. In Alan Studio, update this intent to the following:

.. code:: javascript

   const vScreen = visual({"screen": "second"});

   intent(vScreen, "Go back", p => {
       p.play({command: 'navigation', route: 'back'})
   });

The filter comes as the first parameter in the intent. Now this intent will be matched only if the second screen is active and the visual state is ``{"screen": "second"}``.

You can test it: run the app, go to the second screen and say: ``Go back``. The first screen will be displayed. When the first screen is active, try saying this command again. Alan will not be able to match this intent.

