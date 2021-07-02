.. raw:: html

   <div id="orange-background"></div>

Step 3: Integrate Alan with the app
===================================

To let users communicate with our app through voice, we need to add the Alan button to it.

1. In Alan Studio, click **Integrations**.

2. On the **JavaScript** tab, you can see two code snippets for the following elements:

   -  A container for the Alan button.
   -  A snippet with the code for the Alan button, together with the Alan SDK key. This key is unique for every voice assistant
      project.
	  
	  
   Click **Copy** next to each snippet and paste the code to the web page, at the end of the ``<body>`` section.
   
   .. image:: /_static/assets/img/tutorial2/integrate-alan.png

3. Refresh the web page. You will see the Alan button in the bottom right corner. Click the button and say: ``Hello world``.

   .. image:: /_static/assets/img/tutorial2/page-with-button.png

.. note:: 

   The web page works in the latest versions of Chrome, Firefox, Safari and Microsoft Edge. After clicking the Alan button, you need to allow Alan to access your microphone. Some browsers may block microphone access on unsecure pages or allow it only during the current session.


