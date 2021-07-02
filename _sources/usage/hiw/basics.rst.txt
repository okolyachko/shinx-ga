Alan basics
===========

Before you start working with Alan, it is good to see the whole picture.
With this section, you can take a quick look at Alan's fundamentals,
learn what is available and how Alan components work together. You will
also get pointers to sections in this documentation that will help you
decide on where to proceed.

.. raw:: html

   <div class="scroll-section">

Voice platform
--------------

Alan provides a complete AI voice platform. That is, you do not need to configure speech components, deploy an infrastructure for voice processing or train the speech recognition software. All deployment, maintenance and voice processing tasks are shifted to Alan, which does the bulk of work.

Alan acts as an AI-backend. It lets the app `'understand' the human language <voice-processing.html>`__ and provides a possibility to interact with the app through voice. To build a voice interface with Alan, you only need to complete the following tasks:

1. `Design a dialog for your voice assistant in Alan
   Studio <#dialog-design>`__
2. `Integrate the Alan voice to the app with Alan SDKs <#integration>`__

Dialog design
-------------

The first thing you need to do is to write a dialog — a `voice script </usage/guides/scripts.html>`__ — in Alan Studio. The voice script describes the expected conversation scenario with your users. It covers all topics, questions and phrases users can ask or say while interacting with the voice assistant. Voice scripts are written in JavaScript, which provides unlimited flexibility for dialog building.

Before you start writing a voice script, you may find it useful to sketch all possible branches users can go down and prototype alternative paths users can follow when getting to the next stage in the dialog. It will be much easier to create a voice script with such a 'navigation flow' of the conversation.

The core building blocks for the voice script are:

-  `Voice commands <#voice-commands>`__
-  `Slots <#slots>`__
-  `Dynamic entities <#dynamic-entities>`__
-  `Contexts <#contexts>`__

Voice commands
~~~~~~~~~~~~~~

Users interact with voice assistants through voice commands. You can add
commands to the voice script to complete tasks or actions requested by
users and answer users' questions. Some examples of voice commands are:

-  ``Give me a coffee``
-  ``Transfer $200 to my account``
-  ``Can you tell me about this phone model?``

A voice command is invoked by a specific utterance that the user says. In Alan, this invoking phrase is known as a `pattern </server-api/patterns>`__. When designing a voice script, you need to think of the different ways users may formulate their requests and come up with a list of likely spoken phrases. For example, the list of phrases for the ``Order a coffee`` command may be the following:

-  ``Give me a cup of coffee``
-  ``One coffee, please``
-  ``Can I get a coffee?``

and several more.

Together with the pattern, in the voice command you define the action that must be triggered when this command is invoked. For example, you can `play a response to the user </server-api/commands-and-responses#responding-to-the-user>`__ or `send a command to the client app </server-api/commands-and-responses#sending-commands-to-the-app>`__ to perform some activity on the app side.

A typical voice script contains multiple voice commands that can fulfill different types of users' requests to your app. When the user is interacting with Alan, Alan evaluates each user's utterance and chooses the best command from all possible options available in the script. This is known as intent matching. As soon as the intent is matched, Alan triggers the action defined in the command.

Slots
~~~~~

Alan allows you to add `slots </server-api/slots>`__ to voice commands. A slot is essentially a parameter in the user utterance that lets Alan identify and retrieve important information from the user input. With this data, Alan can fulfil user's request. For example, you can use a slot to get a location for a booking app or retrieve from user's utterance the necessary product category for a shopping app.

You can add the following types of slots to voice commands:

-  `User-defined slots </server-api/slots#user-defined-slots>`__ to list
   custom values that the user can say when giving a voice command.
-  `Predefined slots </server-api/slots#predefined-slots>`__ to get
   specific types of information from the user utterance, for example,
   location, time, numbers and so on.

Dynamic entities
~~~~~~~~~~~~~~~~

To get the necessary information from the user input, you can also add `dynamic entities </server-api/dynamic-entities>`__ to voice commands.

Dynamic entities are quite similar to user-defined slots. They contain a list of values that the user can name in the command, and these values are important for the further dialog flow. However, values for dynamic entities are not pre-set as in case of slots. Dynamic entities can be updated on the fly, as the dialog runs.

Dynamic entities are a great tool if you know that data in command patterns may change during the dialog session. For example, you need to retrieve some information for voice commands from an external source and you know that this information can be updated at any moment. In this case, dynamic entities will be the best choice.

Contexts
~~~~~~~~

Just like in real world conversations, in voice scripts some user commands may have meaning only within a `context </server-api/contexts>`__. For example, when interacting with a weather forecast voice assistant, the user can ask: ``And what about tomorrow?`` To answer this question in the best way, Alan needs to understand the situation to which the user is referring — know the location the user is asking about.

You can use contexts if you create a voice script for a multi-step conversation where some conversation steps can take place only in specific circumstances. In this case, you can put some part of the user dialog to a context and pass to this context — activate it — when the user says a certain phrase or gets to a certain turn in the dialog. For example, when designing a voice interface for an online store, you may want to create a context for getting the address and time details and activate this context only after the checkout process is initiated.

Built-in JavaScript libraries
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can utilize the following `JavaScript libraries </server-api/built-in-javascript-libraries>`__ when writing voice scripts: 

-  **axios** and **request** to make API calls from the voice script 
-  **moment-timezone** and **luxon** to work with time 
-  **lodash**

Data sharing
~~~~~~~~~~~~

When building a voice assistant for your app, you may need to exchange data between the voice script and app, or within the script itself. Alan provides you with several methods to do this:

-  To communicate some data from the app to the voice script, you can use the `project API  </server-api/sending-data/project-api>`__ and    `visual state </server-api/sending-data/visual-state>`__ objects.
-  To share data between contexts in the voice script, you can use `userData </server-api/objects#userdata>`__ and
   `state </server-api/objects#state>`__ objects.
-  You can use the `project </server-api/objects#project>`__ object, for example, if you have several scripts in one project and want some data to be available for all of the scripts.

Integration
-----------

Once the voice script is ready, the next step is to integrate Alan voice to your app. After integration, the app will get the draggable Alan button on top of its interface. The users will be able to tap this button and interact with your app, giving commands from the script you have designed.

Alan integrates with client apps through Alan's SDKs. To integrate your app with Alan, you need to embed the code for the Alan button in the app project. To learn about integration details, check out the **Integrations** section in Alan Studio, the `Alan Client SDK </client-api/client-sdks>`__ documentation or Alan's app examples on GitHub.

Alan provides `common Client API methods </client-api/methods/common-api>`__ for the Alan button. You can use these methods on the client app side. For example, you may want to play some greetings when the user starts the dialog session, activate or
deactivate the Alan button programmatically when necessary.

.. raw:: html

   <div id="blue-background"></div>
