
class DOMLocations {

	constructor() {
		this.main          = $('#main'),
		this.actions       = $('#actions'),
		this.optional      = [
			{
			  selector          : 'icing_type',
			  selected_value    : 'swirl',
			  affected_selector : 'type',
			  change_state      : ['tall', 'short']
			},
			{
			  selector          : 'type',
			  selected_value    : 'tall',
			  affected_selector : 'hasWafer',
			  change_state      : [true, false]
			},
			{
			  selector          : 'type',
			  selected_value    : 'short',
			  affected_selector : 'hasCream',
			  change_state      : [true, false]
			}
		]
	}
}

module.exports = new DOMLocations();