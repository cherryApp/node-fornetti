$('tr.db-record button').on('click', function() {
    var dataRow,
        inputs,
        postObject,
        button = $(this);
    // Update.
    if (button.hasClass('btn-info')) {
        dataRow = button.parents('.db-record');
        inputs = dataRow.find('input');
        postObject = {id: dataRow.data('id')};
        inputs.each(function(ind, input) {
            postObject[input.getAttribute('name')] = input.value;
        });
        console.log(postObject);

        // Send data to server.
        $.post('/update', postObject, function(err, params) {
            console.dir(arguments);
        });
    }
});

$('.new-record-btn').on('click', function() {
    var dataRow,
        inputs,
        postObject,
        button = $(this);
        
        // Insert.
        dataRow = button.parents('tr');
        inputs = dataRow.find('input');
        postObject = {};
        inputs.each(function(ind, input) {
            postObject[input.getAttribute('name')] = input.value;
        });
        console.log(postObject);

        // Send data to server.
        $.post('/insert', postObject, function(response) {
            console.log('resp', response);
            if (response.success) {
                dataRow = $('.db-record.template').clone();
                dataRow.find('input').each(function(ind, input) {
                    input.value = postObject[input.getAttribute('name')];
                });
                dataRow.find('td').eq(0).html(response.id);
                dataRow.attr('data-id', response.id);
                dataRow.appendTo($('.crud-body')).show();
            }
        });
});