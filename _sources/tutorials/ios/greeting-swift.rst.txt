.. raw:: html

   <div id="orange-background"></div>

Playing a greeting in an iOS Swift app
======================================

In a typical dialog flow, the user gives commands to Alan and Alan replies to the user. If necessary, you can let Alan start the dialog. For example, Alan can welcome the user and say a few words about the app and its capabilities.

In this tutorial, we will make our app greet the user when it is started. The Alan button will be automatically activated, Alan will say: ``Welcome to the Swift tutorial``, and the Alan button will be
deactivated. To greet the user, we will use the `playText() <../../client-api/methods/common-api.html#playtext>`__ method of the Alan iOS SDK.

What you will learn
-------------------

-  What states the Alan button can have
-  How to play a greeting in the app with voice
-  How to use the following Alan iOS SDK methods:\

   - `isActive <../../client-api/methods/common-api.html#isactive>`__,
   - `activate() <../../client-api/methods/common-api.html#activate>`__,
   - `deactivate() <../../client-api/methods/common-api.html#deactivate>`__ and
   - `playText() <../../client-api/methods/common-api.html#playtext>`__ in an iOS Swift app.

What you will need
------------------

For this tutorial, we will continue using the starter iOS app created in the previous tutorials. You can also use an example app provided by Alan: `SwiftTutorial.part5.zip <https://github.com/alan-ai/alan-sdk-ios/blob/master/examples/SwiftTutorial/SwiftTutorial.part5.zip>`__. This is an XCode project of the app with two views already integrated with Alan.


Step 1: Set up the flag for the greeting
----------------------------------------

When an app with Alan voice is launched, the state of the Alan button changes in the following way:

1. While the app is connecting to the Alan Studio project, the Alan button state is set to ``connecting``. 
2. After the connection to the project has been established, the button state changes to ``online``. The button remains in the ``online`` state until it is activated — programmatically, with voice or when the user taps the Alan button in the app. 
3. After the Alan button is activated, it can be in one of the following states: 

   - ``listen``: Alan is listening to the user input 
   - ``process``: Alan is processing the user input
   - ``reply``: Alan is replying to the user 
   
4. After the Alan button is deactivated, its state changes back to ``online``.

For error situations, the following states are also available:

-  ``offline``: no connection to the Internet; the connection to the Alan Studio project cannot be established 
-  ``noPermission``: permissions to use the device microphone are not granted

In this tutorial, our app will greet the user when the Alan button state is ``online`` (the connection to the Alan Studio project is established but the Alan button is not yet activated). While our app runs, the Alan button can return to the ``online`` state several times. We need to make
sure our greeting is played only once, when the app is started. To do this, let's add a flag that will tell if the greeting has been played or not.

In Xcode, open the ``ViewController.swift`` file and in the ``ViewController`` class, declare the following variable:

.. code:: swift

   class ViewController: UINavigationController {
        
       /// Flag to indicate that the greeting is played
       fileprivate var greetingIsPlayed = false
   ...
   }


Step 2: Add a handler and function for the greeting
---------------------------------------------------

Next, we need to add a handler that will be listening to the Alan button state change and a function for playing the greeting.

1. In the ``ViewController.swift`` file, in ``ViewDidLoad()``, call the ``setupAlanStateHandler()`` function:

   .. code:: swift

      class ViewController: UINavigationController {

          /// Flag to indicate that the greeting is played
          fileprivate var greetingIsPlayed = false
          ...
          override func viewDidLoad() {
              super.viewDidLoad()
              ...
              /// Set up a handler for Alan button states
              self.setupAlanStateHandler()
          }
          ...
      }

2. To the ``ViewController`` class, add the ``setupAlanStateHandler()`` function itself. In this function, we have an observer for the Alan button state notifications. Once the button state changes, the ``handleState()`` function is invoked.

   .. code:: swift

      class ViewController: UINavigationController {
      ...
          fileprivate func setupAlanStateHandler() {
              NotificationCenter.default.addObserver(self, selector: #selector(self.handleState(_:)), name:NSNotification.Name(rawValue: "kAlanSDKAlanButtonStateNotification"), object:nil)
          }

          /// State handler
          @objc func handleState(_ notification: Notification) {
              /// Get the user info object from Alan
              guard let userInfo = notification.userInfo,
                  /// Get the number value for the Alan button state
                  let stateValue = userInfo["onButtonState"] as? NSNumber,
                  /// Get the Alan button state
                  let buttonState = AlanSDKButtonState.init(rawValue: stateValue.intValue)
              else {
                  return
              }

              switch buttonState {
                  case .online:
                      /// then the Alan button is connected but is not turned on
                      /// we can make greeting here
                      /// make sure you are using the flag ("greetingIsPlayed" in our case)
                      /// because the Alan button will be returned to this state once it is turned off by user
                      /// and we dont want to play the greeting for the second time
                      /// ...
                      /// Check that the greeting is not played yet
                      if !self.greetingIsPlayed {
                          /// Set the flag that the greeting is played
                          self.greetingIsPlayed = true
                          /// Make sure we use the main queue
                          DispatchQueue.main.async {
                              /// Play the greeting
                              self.makeGreeting()
                          }
                      }
                      break
                  case .offline:
                      /// then the Alan button has no Internet connection
                      break
                  case .noPermission:
                      /// then the Alan button has no permission for mic
                      break
                  case .connecting:
                      /// then the Alan button is connecting
                      /// basically nothing to do here
                      break
                  case .listen:
                      /// then Alan listening to the user input
                      break
                  case .process:
                      /// then Alan processing the user input
                      break
                  case .reply:
                      /// then Alan replies back
                      break
                  default:
                      break
              }
          }
      ...
      }

3. And finally, in the ``ViewController`` class, add the greeting function itself:

   .. code:: swift

      class ViewController: UINavigationController {
      ...
          /// Greeting
          fileprivate func makeGreeting() {
              /// Check if the Alan button is active
              if !self.button.isActive() {
                  /// Activate the Alan button
                  self.button.activate()
              }
              /// Play the greeting text
              self.button.playText("Welcome to the Swift tutorial")
              /// Delay for a few seconds
              DispatchQueue.main.asyncAfter(deadline: .now() + 4) {
                  /// And deactivate the Alan button
                  self.button.deactivate()
              }
          }
      ...
      }

Let's have a look at the code above to see how it works:

1. When the app is started, the ``greetingIsPlayed`` flag is initially set to ``false``.
2. Once the button state changes, the ``handleState()`` function is invoked. This function checks the Alan button state. If the button state is ``online``, the ``greetingIsPlayed`` flag is set to ``true`` and the ``makeGreeting()`` function is called.
3. The ``makeGreeting()`` function activates the Alan button, plays the greeting text and deactivates the Alan button after a while.

You can test how it works: run the app on the simulator. Once the app is launched, the Alan button will be activated and Alan will greet you with: ``Welcome to the Swift tutorial``. Several seconds later, the Alan button will be deactivated.


What you finally get
--------------------

After you pass through this tutorial, you will have an iOS app integrated with Alan that greets you when launched on the device. You can get an example of such an app from the Alan GitHub to make sure you have set up your app correctly.

-  `SwiftTutorial.part6.zip <https://github.com/alan-ai/alan-sdk-ios/blob/master/examples/SwiftTutorial/SwiftTutorial.part6.zip>`__: XCode project of the app
-  `SwiftTutorial.part6.js <https://github.com/alan-ai/alan-sdk-ios/blob/master/examples/SwiftTutorial/SwiftTutorial.part6.js>`__: voice commands used for this tutorial