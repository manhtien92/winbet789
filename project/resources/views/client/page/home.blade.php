@extends('client.layout.master')

@section('title', 'Page Title')

@section('sidebar')
    @parent

    <p>This is appended to the master sidebar.</p>
@endsection

@section('content')
	
	<div class="container">
		<div class="row">
			<div id="home_big_banner" class="left">
				<ul class="slider">
					<li>
						<a href=""><img src="{{ URL::asset('assets/img/client/slide/862552d17e7044309fc98a19cd0ae596.jpg') }}"></a>
					</li>
				</ul>
			</div>
			<div class="right small-slider">
				<div>
					<ul class="right-slider">
						<li>
							<a href=""><img src="{{ URL::asset('assets/img/client/slide/53cd4500d43e468184e4e2217089d7b3.jpg') }}"></a>
						</li>
					</ul>
				</div>
				<div style="margin-top:9px">
					<ul class="right-slider">
						<li>
							<a href=""><img src="{{ URL::asset('assets/img/client/slide/846727487ec946d8b39adfea282bb7e8.jpg') }}"></a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="progressive-en progressive m-top-10">
	            <div class="number" id="progressive_jackpot">285,621,980,181.18 IDR</div>
	        </div>
		</div>
	</div>
	<script type="text/javascript">
		$(document).ready(function () {
			Home.init();
		});
	</script>
	<script src="{{ URL::asset('assets/js/client/app/home.js') }}"></script>
@endsection