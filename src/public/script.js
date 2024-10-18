// public/scripts.js
$(document).ready(function() {
	$('#add-collaborator-form').on('submit', function(event) {
		event.preventDefault();

		$.ajax({
			type: 'POST',
			url: '/addCollaborator',
			data: $(this).serialize(),
			success: function(response) {
				if (response.message) {
					$('#popup-message .modal-title').html(response.messageType);
					$('#popup-message .modal-body p').html(response.message);
					$('#popup-message').show();
				}
			},
			error: function(error) {
				alert('Error adding collaborator');
			}
		});
	});

	$('#close-popup').on('click', function() {
		$('#popup-message').hide();
	});
});