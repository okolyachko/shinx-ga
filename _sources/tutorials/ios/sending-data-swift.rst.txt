.. raw:: html

   <div id="orange-background"></div>

Passing the app state to the voice script
=========================================

When the user interacts with an iOS app, it may be necessary to send some data from the app to the voice script. For example, you may need to provide the voice script with information about the current app state.

In Alan, you can send data from the app to the voice script in the following ways:

-  With `visual state <../../server-api/sending-data/visual-state.html>`__
-  With `project API <../../server-api/sending-data/project-api.html>`__

In this tutorial, we will work with an iOS app with two views. We will send information about the current view to the voice script with the help of the visual state. On the script side, we will use the passed state to do the following:

-  Create a voice command that will let Alan reply differently depending on the view open in the app
-  Create a command that can be matched only if the necessary view is open 

What you will learn
-------------------

-  How to pass the app state from an iOS app to the voice script with the visual state
-  How to access the data passed with the visual state in the voice script
-  How to filter intents by the app state

What you will need
------------------

For this tutorial, we will continue using the starter iOS app created in the previous tutorials. You can also use an example app provided by Alan: `SwiftTutorial.part2.zip <https://github.com/alan-ai/alan-sdk-ios/blob/master/examples/SwiftTutorial/SwiftTutorial.part2.zip>`__. This is an XCode project of the app with two views already integrated with Alan.

Step 1: Send the app state to the voice script
----------------------------------------------

To send data from the app to the voice script, you can use Alan's visual state object. This method can be helpful, in particular, if the dialog flow in your app depends on the app state. In this case, you need to know the app state on the script side to adjust the dialog logic. For example, you may want to use the app state to filter out some voice commands, give responses applicable to the current app state and so on.

The visual state allows you to send an arbitrary JSON object from the app to the script. You can access the passed data in the script through the ``p.visual`` runtime variable.

To send the visual state to the voice script, let's do the following:

1. In Xcode, open the ``ViewController.swift`` file and to the ``ViewController`` class, add the following function:

   .. code:: swift

      class ViewController: UINavigationController {
      ...
          func setVisualState(state: [AnyHashable: Any]) {
              self.button.setVisualState(state)
          }
      ...
      }

   In this function, we call the `setVisualState() <../../client-api/methods/common-api.html#setvisualstate>`__ method of the Alan button and pass ``state`` in it.

2. In the project tree in Xcode, Control click the app folder and select **New File**. In the **Source** section, select **Cocoa Touch Class** and click **Next**. Name the class, for example,
   ``FirstViewController`` and click **Next**. Then click **Create**. A new file named ``FirstViewController.swift`` will be added to your app folder.

3. Open the created file and update its content to the following:

   .. code:: swift

      import UIKit

      class FirstViewController: UIViewController {

          override func viewDidLoad() {
              super.viewDidLoad()
          }

          /// Once the view is on the screen - send an updated visual state to Alan
          override func viewDidAppear(_ animated: Bool) {
              super.viewDidAppear(animated)
              /// Get the view controller with the Alan button
              if let rootVC = self.view.window?.rootViewController as? ViewController {
                  /// Send the visual state via the Alan button
                  rootVC.setVisualState(state: ["screen": "first"])
              }
          }
      }

4. In the same way, create one more file and name it ``SecondViewController``. The content of the file should be the following:

   .. code:: swift

      import UIKit

      class SecondViewController: UIViewController {

          override func viewDidLoad() {
              super.viewDidLoad()
          }

          /// Once the view is on the screen - send an updated visual state to Alan
          override func viewDidAppear(_ animated: Bool) {
              super.viewDidAppear(animated)
              /// Get the view controller with the Alan button
              if let rootVC = self.view.window?.rootViewController as? ViewController {
                  /// Send the visual state via the Alan button
                  rootVC.setVisualState(state: ["screen": "second"])
              }
          }
      }

   Here is what our project should look like:
   
   .. image:: /_static/assets/img/tutorial-ios/xcode-second-class.png

5. Open the app's storyboard: ``Main.storyboard``.
6. In the storyboard, select the first View Controller.
7. In the right pane, click the Identity Inspector icon.
8. In the **Custom Class** section, from the **Class** list, select ``FirstViewController``.

   .. image:: /_static/assets/img/tutorial-ios/xcode-link-class.png

9. Repeat steps 6-8 for the second Controller to connect it to the ``SecondViewController`` class.

In the procedure above, we created two classes: ``FirstViewController`` and ``SecondViewController`` and connected them to the first View Controller and second View Controller, respectively. Here is how our app works now: when the first View Controller appears on the device screen, the ``setVisualState()`` function is invoked and the ``["screen": "first"]`` JSON object is passed to the voice script. In a similar manner, when the second View Controller appears on the device screen, the ``["screen": "second"]`` JSON object is passed to the voice script.


Step 2: Add a voice command with different answers for views
------------------------------------------------------------

Imagine we want to provide the user with a possibility to ask: ``What view is this?`` in the app, and Alan must reply differently depending on the view open. Let's go back to Alan Studio and add a new
intent:

.. code:: js

   intent(`What view is this?`, p => {
       let screen = p.visual.screen;
       switch (screen) {
           case "first":
               p.play(`This is the initial view`);           
               break;
           case "second":
               p.play(`This is the second view`);           
               break;
           default:
               p.play(`This is an example iOS app by Alan`);
       }      
   });

Here we use the ``p.visual.screen`` variable to access data passed with the visual state. Depending on the variable value, Alan plays back different responses.

You can test it: run the app on the simulator and ask: ``What view is this?`` Alan will get back with
``This is the initial view``. Then say ``Navigate forward`` and ask: ``What view is this?`` Alan will answer: ``This is the second view``.

Step 3: Create a view-specific command
--------------------------------------

If an app has several views, it may be necessary to create voice commands that will work for specific views only. In Alan, you can create view-specific commands with the help of `filters <../../server-api/sending-data/visual-state.html#filtering-commands>`__ added to intents. The filter in an intent defines conditions in which the intent can be matched. In our case, we can use information about the open view as the filter.

Let's modify the intent for getting back to the initial view. This command must work only if the second view is open; we cannot say ``Go back`` when at the initial view. In Alan Studio, update this intent to the following:

.. code:: javascript

   const vScreen = visual({"screen": "second"});

   intent(vScreen, "Go back", p => {
       p.play({command: 'navigation', route: 'back'});
       p.play(`Going back`);
   });

The filter comes as the first parameter in the intent. Now this intent will be matched only if the second view is open and the visual state is ``{"screen": "second"}``.

You can test it: run the app on the simulator, tap the Alan button and say: ``Navigate forward``. Then say: ``Go back``. The initial view will be displayed. When at the initial view, try saying this command again. Alan will not be able to match this intent.

What you finally get
--------------------

After you pass through this tutorial, you will have an iOS app with two views and will be able to send view-specific commands. You can get an example of such an app from the Alan GitHub to make sure you have set up your app correctly.

-  `SwiftTutorial.part3.zip <https://github.com/alan-ai/alan-sdk-ios/blob/master/examples/SwiftTutorial/SwiftTutorial.part3.zip>`__: XCode project of the app
-  `SwiftTutorial.part3.js <https://github.com/alan-ai/alan-sdk-ios/blob/master/examples/SwiftTutorial/SwiftTutorial.part3.js>`__: voice commands used for this tutorial

What's next?
------------

Have a look at the next tutorial: `Highlighting items with voice <highlighting-swift.html>`__.
