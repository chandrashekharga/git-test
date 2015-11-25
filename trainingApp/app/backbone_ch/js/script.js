$(document).ready(function(){
	//Modal
	/*$('#modal-button').on('click', function () {
		$('#myModal').modal({
			show: true,
			backdrop: 'static'
		})
	})*/
	/*$('#myModal').on('hidden.bs.modal', function () {
		alert('Modalbox hidden')
	})*/

	//Drodown
	$('.dropdown-toggle').dropdown();

	//Scrollspy
	$('.scrollspy-example').scrollspy({ target: '#navbar-example' })

	//Tabs
	$('#myTab a').click(function (e) {
		e.preventDefault()
		$(this).tab('show')
	})
	$('#myTab a:first').tab('show')

	//Tooltip
	 $('.tooltip-demo').tooltip({
      selector: "[data-toggle=tooltip]",
      container: "body"
    })

	//popover
	$("[data-toggle=popover]").popover();

	//button
	 $('#fat-btn').click(function () {
        var btn = $(this)
        btn.button('loading')
        setTimeout(function () {
          btn.button('reset')
        }, 3000)
      })


	//$('.typeahead').typeahead();
	});
