<meta charset="utf-8">
<meta name="description" content="">
<meta name="author" content="Huquduy">

<title>hokibet188</title>
<link rel="shortcut icon" type="image/x-icon" href="{{ URL::asset('assets/admin/imgs/logo.png')}}" />
<!-- Import font -->
<link rel="stylesheet" href="{{ URL::asset('assets/font/font-awesome-4.5.0/css/font-awesome.min.css') }}">

<!-- Import Css -->
<link rel="stylesheet" href="{{ URL::asset('assets/third-party/bootstrap/css/bootstrap.min.css') }}">
<link rel="stylesheet" href="{{ URL::asset('assets/third-party/jquery-ui-1.11.4/jquery-ui.css') }}">
<link rel="stylesheet" href="{{ URL::asset('assets/css/client/style.css') }}">
<link rel="stylesheet" href="{{ URL::asset('assets/css/client/customize.css') }}">
<link rel="stylesheet" href="{{ URL::asset('assets/css/client/responsive.css') }}">
<link rel="stylesheet" href="{{ URL::asset('assets/third-party/bxslider/jquery.bxslider.css') }}">

<!-- Import Javascript -->
<script src="{{ URL::asset('assets/js/lib/jquery/jquery-2.1.4.min.js') }}"></script>
<script src="{{ URL::asset('assets/third-party/jquery-ui-1.11.4/jquery-ui.min.js') }}"></script>
<script src="{{ URL::asset('assets/third-party/bootstrap/js/bootstrap.min.js') }}"></script>
<script src="{{ URL::asset('assets/third-party/bxslider/jquery.bxslider.min.js') }}"></script>
<script src="assets/admin/js/socket.io.js"></script>
<script src="assets/js//client/app/serverNodejs.js"></script>
<script src="{{ URL::asset('assets/js/client/app/auth.js') }}"></script>
<script type="text/javascript">
	var baseUrl = "{{ URL::to('/') }}" + '/';
	$(document).ready(function () {
		Auth.init();
	});
</script>