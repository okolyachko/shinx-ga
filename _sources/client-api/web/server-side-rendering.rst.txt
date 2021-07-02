Alan Web SDK and server-side rendering
======================================

The Alan Web SDK relies on some browser-specific APIs. If you use it in projects that are rendered on the server side, you need to make sure that you request and use the Alan button in the code which is running on the client side.

Server-side rendering with NextJS
---------------------------------

Below is an example of how to use the Alan button in a React application which is rendered on the server side with NextJS. In NextJS, the ``componentDidMount()`` method is executed only on the client where window- and other browser-specific APIs are available, so you can use the Alan button like this:

With React functional component
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: javascript

    useEffect(() => {
        const alanBtn = require('@alan-ai/alan-sdk-web');
        alanBtn({
            key: "YOUR KEY",
            rootEl: document.getElementById("alan-btn"),
        });
    }, []);

With React class component
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: javascript

    componentDidMount() {
        const alanBtn = require('@alan-ai/alan-sdk-web');
        alanBtn({
            key: "YOUR KEY",
            rootEl: document.getElementById("alan-btn"),
        });
    }
	

.. raw:: html

   <div id="purple-background"></div>