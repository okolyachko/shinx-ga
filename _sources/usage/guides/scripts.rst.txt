Voice scripts
=============

To let users interact with your application with their voice, you must create a voice script in Alan Studio. A voice script is a scenario by which the dialog with the user is carried out. It contains a set of commands that the user can execute and actions that must be taken in response to these commands.

Voice scripts are written in JavaScript. You can use Alan objects and entities and standard JavaScript means to write scripts. For details, see `Server API <server-api/script-concepts.html>`__.

In Alan, you can create custom scripts or use predefined scripts. Alan comes with a library of script templates that can give you a good example of how a voice script can be organized. You can add and remove predefined scripts from the project at any moment.

An Alan project can contain one or multiple voice scripts. Multiple scripts can be helpful, for example, if you want to split the project logic and separate configuration and data structures from utility functions. This will make your project more transparent and easier to support.

In projects with multiple scripts, scripts are loaded in the order they are set up, starting from the upper one. You can use the Alan built-in functionality to share data and make it accessible between scripts. For details, see `Multiple scripts in the project </server-api/script-concepts.html#multiple-scripts-in-the-project>`__.

To work with scripts in Alan Studio, you can do the following: 

- `Add, rename and delete scripts <#managing-scripts>`__
- `Export scripts <#exporting-scripts>`__
- `Import scripts <#importing-scripts>`__
- `Share and keep scripts in GitHub <#sharing-and-keeping-scripts-in-github>`__
- `View the script flowchart <#viewing-the-script-flowchart>`__
- `Change the code editor theme and font size  <#changing-the-code-editor-theme-and-font-size>`__
- `Find and replace text <#finding-and-replacing-text>`__
- `Use shortcuts when writing scripts <#using-shortcuts>`__

Managing scripts
----------------

To add a voice script to the Alan project:

1. In Alan Studio, open the project to which you want to add a voice script.
2. At the top of the left pane, click **Add Script**.
3. Do either of the following:

   -  To add a custom script, in the **New script name** field, enter the script name and click **Add New Script**.
   -  To add a predefined script, in the **Add script example** list, select one or more scripts and click **Add Predefined Scripts**. For details, see `Voice scripts examples </usage/examples/predefined-examples.html>`__.

.. image:: /_static/assets/img/studio/scripts.png
	  
You can rename a script or delete it from the project when necessary.

-  To rename a script, in the left pane, hover over the script name, click the options icon and select **Rename**.
-  To delete a script, in the left pane, hover over the script name, click the options icon and select **Delete**.
-  To discard the changes in the script and revert it to the latest saved state, in the left pane, hover over the script name, click the options icon and select **Discard local changes**.

Exporting scripts
-----------------

You can export a copy of your scripts from the Alan project, for example, if you want to save some script version locally.

To export scripts from the Alan project:

1. In Alan Studio, open the project from which you want to export scripts.
2. In the left pane, select a script.
3. At the bottom of the left pane, click **Export**. Alan will save a ZIP archive to the default downloads location on your computer. The archive will contain all scripts you have in the project.

.. image:: /_static/assets/img/studio/export-scripts.png

Importing scripts
-----------------

If you have an external file with a voice script, you can import it to work with it in Alan Studio. For example, you may want to import voice scripts that you exported from Alan Studio previously.

To import voice scripts to Alan Studio:

1. In Alan Studio, open the project to which you want to import scripts.
2. Drag one or more voice script files and drop them onto the **Import** button at the bottom left of Alan Studio. You can also click the **Import** button and select one or more files to be imported. Alan supports import of the following file types:

   -  JS files
   -  ZIP archives with voice scripts (JS files)

.. tip::

    If an imported script has the same name as a script already added to the project, you can choose to replace the existing script or add the imported script as a copy.

.. image:: /_static/assets/img/studio/scripts_import.png

Sharing and keeping scripts in GitHub
-------------------------------------

Alan Studio lets you integrate with GitHub to store voice scripts and share them with other people. This option can be helpful if you are working on a voice assistant in a team and want to safely merge every developer's work into a single project. You may also use it if you want to keep voice scripts in GitHub repositories, outside Alan Studio. 

GitHub integration settings are configured separately for every voice assistant project. You can integrate both with public and private repositories.

1. In Alan Studio, open your voice assistant project. 
2. In the left pane of the code editor, click **Sync with GitHub**. 
3. If you are not already signed in, sign in to GitHub. Agree to authorize Alan to access your GitHub account data.
4. In the left pane of the code editor, click **Add GitHub repo**. In the **GitHub repository URL** window, select a repository and branch in which voice assistant scripts must be stored and click **Add files**.

.. note:: 
  
   - The branch you select must have at least one file. You cannot select an empty branch for your project.<br/>
   - Make sure the names of the files you pull from a GitHub repository differ from the file names in your project in Alan Studio. Otherwise, a conflict will occur, and Alan will not be able to pull files from the repository.

.. image:: /_static/assets/img/studio/git-integration.png

Once you connect to a GitHub repository, Alan will automatically pull its content and display it in the code editor. To work with voice scripts over GitHub, you can do the following:

- To pull the latest version of voice scripts from the repository, in the left pane of the code editor, click **Pull**. If the script version in Alan Studio conflicts with the repository one, use the **Merge Changes** window to resolve the conflict. You can merge the changes using your version of the script or the remote one.

- To push an updated script version to the repository, in the left pane of the code editor, click **Push** and enter a comment on the pushed changes. If there are changes in the remote repository made by other team members, you will need to pull the remote script version before committing the local changes.

- To integrate with another GitHub repository, in the left pane, disconnect from the current repository by clicking the close icon next to the repository name and connect to a new repository as described above.

Viewing the script flowchart
----------------------------

To get a visual representation of your voice script, you can use the flowchart panel in Alan Studio. The flowchart can help you better understand the script workflow, analyze its design and identify potential flaws.

The flowchart panel is located at the bottom right of the code editor. To expand it, in the bottom left corner of the panel, click the expand icon.

.. image:: /_static/assets/img/studio/flowchart.png

The flowchart presents the voice script as a diagram consisting of a set of blocks — the `global context and user-defined
contexts </server-api/contexts.html>`__. The global context is depicted on the left, while user-defined contexts are available on the right. All `voice commands </server-api/commands-and-responses.html>`__ added to the voice script belong to this or that context block.

User-defined contexts are connected to voice commands with arrows. This way, you can easily see from which place in the script a context is activated. In a script with a great number of contexts, the number of connections can be great as well. To see how a specific element is linked with others, hover over it, and all connections going from or pointing at it will be highlighted.

For even better visualization, Alan displays the following script objects in the flowchart: 

- `Slots </server-api/slots.html>`__ added to voice commands are presented as colored blocks inside commands. 
- `Visual filters </server-api/sending-data/visual-state.html>`__ are presented in the block at the top left of the chart. 
- `Project variables </server-api/script-concepts.html#multiple-scripts-in-the-project>`__ are presented in the block at the top right of the chart.

Visual filters and project variables are linked to voice commands in which they are used.

.. tip::

    If the voice script contains no voice commands, only configuration and data structures, the flowchart will be empty.

Here are some tips you can follow when working with the flowchart:

-  To zoom in and out in the flowchart, click the plus and minus icons in the bottom left corner of the flowchart.
-  To go to the necessary line in the voice script, click the block or element in the flowchart.
-  And, vice versa, to see what element in the flowchart corresponds to a specific line of code in the script, in the bottom left corner of the flowchart, click the target icon so that it becomes enabled and then click the necessary line in the code editor. The corresponding element in the flowchart will be highlighted.
-  If a voice command has several alternatives, only the first command is displayed in the command block. The number of remaining alternatives is displayed at the right of the block. To see all possible variants, hover over the command block.
-  To make more room for the flowchart and the code editor, collapse the scripts list and, if you are not planning to test your voice commands, the Debug Chat. To do this, at the top of the code editor, click the left and right arrow buttons.


Changing the code editor theme and font size
--------------------------------------------

If you want to change colors and the font size for the code in Alan Studio, you can do the following:

-  To choose another color theme, in the top right corner, click the menu button and select **Color Theme** > theme you want to apply.
-  To make the font size larger or smaller, in the top right corner, click the menu button and select **Font Size** > **Small**, **Medium** or **Large**.

.. image:: /_static/assets/img/studio/color-theme.png

Using shortcuts
---------------

While writing voice scripts, you can use the following shortcuts:

.. tabbed:: macOS

   - **Cmd** + **/** — comment out the current line or block of code or uncomment the previously commented one
   - **Cmd** + **D** — duplicate the current line or block of code
   - **Cmd** + **Del** — delete the current line or block of code
   - **Cmd** + **Alt** + **L** — prettify (auto-format) the current script
   - **Shift** + **Tab** — prettify (auto-format) the current line or block of code
   - **Cmd** + **S** — save the changes
   - **Cmd** + left mouse click on the function or variable — navigate to the function or variable definition
   - **Shift** + Backspace — navigate back
   
.. tabbed:: Windows  

   - **Ctrl** + **/** — comment out the current line or block of code or uncomment the previously commented one
   - **Ctrl** + **D** — duplicate the current line or block of code
   - **Ctrl** + **Del** — delete the current line or block of code-editor-theme-and-font-size
   - **Ctrl** + **Alt** + **L** — prettify (auto-format) the current script
   - **Shift** + **Tab** — prettify (auto-format) the current line or block of code
   - **Ctrl** + **S** — save the changes
   - **Ctrl** + left mouse click on the function or variable — navigate to the function or variable definition
   - **Shift** + **Backspace** — navigate back


Finding and replacing text
--------------------------

.. tabbed:: macOS

   - **Cmd** + **F** — open the search bar
   - **Cmd** + **Shift** + **F** — open the search and replace bar
   - **Enter** — move to the next occurrence
   - **Shift** + **Enter** — move to the previous occurrence
   - (With the focus in the Replace field) **Enter** — replace the current occurrence with a new string
   - **Cmd** + **Alt** + **Enter** — replace all occurrences with a new string
   - **Esc** — close the search bar
   
.. tabbed:: Windows

   - **Ctrl** + **F** — open the search bar
   - **Ctrl** + **Shift** + **F** — open the search and replace bar
   - **Enter** — move to the next occurrence
   - **Shift** + **Enter** — move to the previous occurrence
   - (With the focus in the Replace field) **Enter** — replace the current occurrence with a new string
   - **Ctrl** + **Alt** + **Enter** — replace all occurrences with a new string
   - **Esc** — close the search bar



.. raw:: html

   <div id="blue-background"></div>