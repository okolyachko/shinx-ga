Alan Infrastructure
===================

To let you build voice assistants, Alan offers a conversational AI
platform. The platform comprises a set of tools and components to
design, embed and host voice interfaces in your apps:

-  `Alan Studio <#alan-studio>`__
-  `Alan SDKs <#alan-sdks>`__
-  `Alan Cloud <#alan-cloud>`__

.. image:: /_static/assets/img/about/alan-scheme.png

Alan Studio
-----------

Alan Studio is a web portal where developers can create voice scripts for their apps. The Studio provides a set of tools for convenient script writing and testing, including:

-  `Source code editor </usage/guides/scripts>`__: a simple but powerful web-based IDE
-  `Testing and debug tools </usage/guides/script-testing>`__: Alan Debug Chat, Test View and Alan Playground
-  `Analytics tools </usage/guides/analytics>`__ for getting statistics on user interactions

Alan Studio allows saving different script versions and getting back to them when required. Furthermore, it offers independent environments for developing, testing and rolling out voice scripts to production.

Alan SDKs
---------

To allow users to communicate with your app with voice and execute commands from voice scripts, you need to add the Alan button to your app. You can do it with Alan SDKs. Alan offers SDKs for different platforms:

-  `Web </client-api/web/web-api>`__
-  `iOS </client-api/ios/ios-api>`__
-  `Android </client-api/android/android-api>`__
-  `Ionic </client-api/cross-platform/ionic>`__
-  `Apache Cordova </client-api/cross-platform/cordova>`__
-  `Flutter </client-api/cross-platform/flutter>`__
-  `React Native </client-api/cross-platform/react-native>`__
-  `Microsoft PowerApps </client-api/cross-platform/powerapps>`__

Once you integrate your app with Alan, you will see a small draggable button on top of the app UI. The Alan button activates the voice interface and indicates the processing state.

The integration process for all platforms is straighforward and easy. Upon integration, you will not have to rebuild and redesign your app. If you need to extend voice scripts, you can add voice commands in Alan Studio and upgrade the script version. All changes will be applied on the fly, and users will not have to even restart their apps.

Alan Cloud
----------

With Alan, you do not need to plan for and deploy any components to run voice scripts. The solution architecture is
serverless: voice scripts are run on VMs in the `cloud managed for you </usage/how-works/deployment#alan-cloud>`__.

Being backed by the cloud, Alan is highly scalable. It can scale up to millions of users as your requirements grow. All resources to support the necessary workloads are automatically provisioned by Alan.

The cloud is where voice scripts you create are executed and all `voice processing </usage/how-works/voice-processing>`__ takes place. Alan leverages advanced algorithms to handle voice commands and dialog flows of any complexity. You do not need to perform any speech training: Alan trains on intents using the terminology for your application and learns
to understand the logic of your domain.

.. note::

   If necessary, you can migrate your data to a private cloud or on premises. For details, see `Deployment options </usage/how-works/deployment>`__.
   
.. raw:: html

   <div id="blue-background"></div>
