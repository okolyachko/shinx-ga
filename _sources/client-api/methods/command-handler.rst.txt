onCommand handler
=================

Responsible for handling commands sent from the Alan voice script.

To accompany user’s utterances with activities in the app UI, you can send commands from the voice scripts to the client app. For example, once the user gives a voice command, another view or page can be opened in the app, a UI element can be selected on the screen and so on.

To send a command, use the ``play()`` function in the voice script and pass a JSON object to it. The JSON object contains the command name and, optionally, arbitrary data to be provided to the app. To handle the command on the client side, set up the logic in the ``onCommand`` handler in the app.

For details, see `Sending commands to the app <../../server-api/commands-and-responses.html#sending-commands-to-the-app>`__.

Examples
--------

Voice script
~~~~~~~~~~~~

.. code:: javascript

   intent(`Go to the home page`, p => {
       p.play({command: 'navigation', route: 'home'});
       p.play(`Opening the home page...`);
   });

Client app
~~~~~~~~~~

.. tabbed:: Web

    .. code-block:: javascript

		onCommand: function (commandData) {
			if (commandData.command === "navigation") {
				//call client code that will react on the received command
			}
		},

.. tabbed:: Objective-C

    .. code-block:: obj-c

	   // Client app
	   self.button.onCommand = ^(NSDictionary *command) {
	     NSString* commandName = [command objectForKey:@"command"];
	     NSLog(@"%@", commandName);
	   };

.. tabbed:: Swift

    .. code-block:: swift

	   // Client app
	   self.button.onCommand = { command in
	     guard let commandName = command?["command"] as? String else {
		   return
	     }
	     print(commandName)
	   }
   

.. tabbed:: Kotlin

    .. code-block:: kotlin

	   // Client app
	   val alanCallback: AlanCallback = object : AlanCallback() {
	     /// Handle commands from Alan Studio
	     override fun onCommand(eventCommand: EventCommand) {
		   try {
		     val command = eventCommand.data
		     val commandName = command.getJSONObject("data").getString("command")
		     Log.d("AlanButton", "onCommand: commandName: $commandName")
		   } catch (e: JSONException) {
		     Log.e("AlanButton", e.message)
		   }
	     }
	   };
		
.. tabbed:: Java

    .. code-block:: java

	   // Client app
	   AlanCallback alanCallback = new AlanCallback() {
	     /// Handle commands from Alan Studio
	     @Override
	     public void onCommand(final EventCommand eventCommand) {
		   try {
		     JSONObject command = eventCommand.getData();
			   String commandName = command.getJSONObject("data").getString("command");
			   Log.d("AlanButton", "onCommand: commandName: " + commandName);
		   } catch (JSONException e) {
		     Log.e("AlanButton", e.getMessage());
		   }
	     }
	  };

.. tabbed:: Flutter

    .. code-block:: dart
	
	   // Client app
	   _MyHomePageState() {
	​
	     /// Handle commands from Alan Studio
	     AlanVoice.onCommand.add((command) {
		   debugPrint("got new command ${command.toString()}");
	     });
	   }

.. tabbed:: Ionic

    .. code-block:: typescript
	
		this.alanBtnComponent.nativeElement.addEventListener('command', (data) => {
			const commandData = (data).detail;
		​
			if (commandData.command === 'navigation') {
				//call client code that will react to the received command
			}
		});
     
	   
.. tabbed:: React Native
   
	.. code-block:: javascript
	
	   // Client app
	   
	   import { NativeEventEmitter, NativeModules } from 'react-native';
	   const { AlanManager, AlanEventEmitter } = NativeModules;
	   const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);
	   
	   componentDidMount() {
	     /// Handle commands from Alan Studio
		 alanEventEmitter.addListener('onCommand', (data) => {
		   console.log(`onCommand: ${JSON.stringify(data)}`);
		 });
	   }​
	   componentWillUnmount() {
	     alanEventEmitter.removeAllListeners('onCommand');
	   }
	   
		
.. raw:: html

   <div id="purple-background"></div>