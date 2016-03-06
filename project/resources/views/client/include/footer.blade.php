<div class="copyright text-center container">
	<div class="col-md-6 col-sm-6">
		<div class="row">
			<h4 class="title">Powered By:</h4>
			<div class="col-md-12">
				<img src="{{ URL::asset('assets/img/client/powered_by.jpg') }}">
			</div>
		</div>
		
	</div>
	<div class="col-md-3 middle col-sm-3">
		<div class="row">
			<h4 class="title">Banking</h4>
			<div class="col-md-12">
				<div class="left">
					<img src="{{ URL::asset('assets/img/client/bank_1.jpg') }}">
				</div>
				<div class="left">
					<img src="{{ URL::asset('assets/img/client/bank_2.jpg') }}">
				</div>
				<div class="left">
					<img src="{{ URL::asset('assets/img/client/bank_3.jpg') }}">
				</div>
				<div class="left">
					<img src="{{ URL::asset('assets/img/client/bank_5.jpg') }}">
				</div>
				<div class="left">
					<img src="{{ URL::asset('assets/img/client/bank_4.jpg') }}">
				</div>
				<div class="left">
					
				</div>
			</div>
			<h4 class="title">Media Sosial:</h4>
			<div class="col-md-12 sosial">
				<div class="left">
					<a href="#" target="_blank"><img src="{{ URL::asset('assets/img/client/connect_fb.jpg') }}"></a>
				</div>
				<div class="left">
					<a href="#" target="_blank"><img src="{{ URL::asset('assets/img/client/connect_blog.jpg') }}"></a>
				</div>
			</div>
		</div>
	</div>
	<div class="col-md-3 footer-contact col-sm-3">
		<h3 class="title">Contact us:</h3>
		<div class="footer_contact_2">
			<div class=""><img src="{{ URL::asset('assets/img/client/footer_yahoo.png') }}"></div>
			<div class="footer_contact_detail_2">call Hokibet</div>
		</div>
		<div class="footer_contact">
			<div class=""><img src="{{ URL::asset('assets/img/client/footer_whatsapp.png') }}"></div>
			<div class="footer_contact_detail_2">call Hokibet</div>
		</div>
		<div class="footer_contact clearfix">
			<div class=""><img src="{{ URL::asset('assets/img/client/footer_bbm.png') }}"></div>
			<div class="footer_contact_detail_2">5BBAF469</div>
		</div>
	</div>
</div>
<div class="copyright-content">
	<div class="containWrap">
		<div class="copyright_txt">© Copyright 2016 Hokibet188</div>
	</div>
</div>
<div id='loading'>
	<div class="spinner">
	  	<div class="rect1"></div>
	  	<div class="rect2"></div>
	  	<div class="rect3"></div>
	  	<div class="rect4"></div>
	  	<div class="rect5"></div>
	</div>
</div>

<script type="text/ng-template" id="popupTmpl.html">
    <div class="popup_T1" style="background:#27ae60;text-align:center;position: absolute;width: 100%;left: 0;top: 0;">
		<img style="height: 50px;width: 210px;" src="/upload/image/logowebsite-vinataobao.png" title="Mỹ phẩm xách tay - Vinataobao" alt="Mỹ phẩm xách tay - Vinataobao"/>
	</div>
	<div class="popup_Co">
		<p class="text1">
			Số lượng không hợp lệ</br>
			Vui lòng chọn số lượng!
		</p>
	</div>
</script>

<div id="dialog" title="Notice">
  	<p class="dialog-content">Register Success</p>
</div>

<!-- Import Javascript -->
<script src="{{ URL::asset('assets/third-party/jquery/jquery-2.1.4.min.js') }}"></script>
<script src="{{ URL::asset('assets/third-party/bootstrap/js/bootstrap.min.js') }}"></script>
<script src="{{ URL::asset('assets/third-party/jquery-ui-1.11.4/jquery-ui.min.js') }}"></script>
<script src="{{ URL::asset('assets/third-party/bxslider/jquery.bxslider.min.js') }}"></script>
<script src="{{ URL::asset('assets/admin/js/socket.io.js') }}"></script>


<!-- Application Dependencies -->
<script src="assets/js/node_modules/angular/angular.js"></script>
<script src="assets/js/node_modules/angular-ui-router/build/angular-ui-router.js"></script>
<script src="assets/js/node_modules/satellizer/satellizer.js"></script>
<script src="assets/js/node_modules/ng-dialog/js/ngDialog.min.js"></script>

<!-- Application Angular -->
<script src="assets/js/client/app/app.js"></script>


<!-- Application Controller -->
<script src="assets/js/client/app/controller/authController.js"></script>
<script src="assets/js/client/app/controller/registerController.js"></script>

<!-- Application Directive -->
<script src="assets/js/client/app/directive/hokibetSlide.js"></script>

<script type="text/javascript">
	var auth = {
		email : "{{ isset( Auth::user()->email ) ? Auth::user()->email : null}}",
		session : "{{ Session::getId() }}"
	};
</script>
<script src="{{ URL::asset('assets/js/client/app/serverNodejs.js') }}"></script>
<script src="{{ URL::asset('assets/js/toastr.js') }}"></script>
<link rel="stylesheet" href="{{ URL::asset('assets/css/toastr.min.css') }}">
