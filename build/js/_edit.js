
class Edit {
	prepareEditPage(store) {
	    _watchItemsInDomForUpdates(store);
	    _setSelectedValuesFromBrief(store);
	}
}

function _watchItemsInDomForUpdates(store) {
    store['$dom']['optional'].forEach((obj) => {
      $('#' +obj.selector).on('change', function() {

        let selectCheck = document.getElementById(obj.affected_selector);
        if (selectCheck && selectCheck.type) {

          let index = ($(this).val() === obj.selected_value) ? 0 : 1;
          $('#' +obj.affected_selector)
            .val(obj.change_state[index])
            .change();

        } else {
          $('#' +obj.affected_selector).show();
          if ($(this).val() != obj.selected_value) { 
            $('#' +obj.affected_selector).hide();     

            if ($('#' +obj.affected_selector+ ' input[type=checkbox]').is(':checked')) {
              $('#' +obj.affected_selector+ ' input[type=checkbox]')
                    .prop('checked', false);
            }

          }
        };

      });
    });
  }

function _setSelectedValuesFromBrief(store) {
  store['$dom']['main'].find('select').each((i, select) => {
    $(select).find('option').each((i, el) => {

      if ($(el).text() === store['brief'][$(select)[0]['id']]) {
        $(el).prop('selected',true).change();
      } 
      $(el).attr('value', $(el).text());

    });
  });
}

module.exports = new Edit();