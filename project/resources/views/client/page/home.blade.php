@extends('client.layout.master')

@section('title', 'Page Title')

@section('sidebar')
    @parent

    <p>This is appended to the master sidebar.</p>
@endsection

@section('content')
	

	<script type="text/javascript">
		$(document).ready(function () {
			Home.init();
		});
	</script>
	<script src="{{ URL::asset('assets/js/client/home.js') }}"></script>
@endsection