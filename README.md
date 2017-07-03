# dev_template_example
<a href="http://www.ckbar.co.za/dev_template/">Cupcake generator example</a> made from the dev templates

Generator is able to :<br>
	- Randomize Cupcake from builder options<br>
	- Pre-populate Edit options with exsting build data<br>
	- Edit current Cupcake build with builder options<br>
	- Add / Remove Cupcake build to custom list<br>
	- Menu shows all Cupcake builds added to custom list<br>
	- Create new build based on custom list item on click to : edit or delete<br>
	- Editing and saving an existing cake will update that cake to list<br>
	- Removing a Cupcake with show next/previous Cupcake build saved to custom list<br>
	- If there is no more Cupcakes in custom list, randomize a new Cupcake build<br><br>


Code renamed to generic terms<br>
Now the generator can be applied to anything by manipulating :<br>
	- build/js/_store_builder.js and template/edit.html<br><br>

Generator needn't follow any specific naming convention :<br>
	- See build/js/_store_locations.js for main container naming and<br>
		+ build/js/main.js, see function 'createActions' and replace find values for generator button naming<br><br>

Generator also has optional selectors to manipulate other selectors.<br>
	- build/js/_store_locations.js, see "this.optional" to set options<br>
	- build/js/_build.js, see "_checkOptionalValues" to see function<br><br>

Init project by:<br>
	1: Clone from Github<br>
	2: In CMD "npm install"<br>
	3: In CMD "gulp"