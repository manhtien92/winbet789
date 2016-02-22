@extends('client.layout.master')

@section('title', 'Page Title')

@section('sidebar')
    @parent

    <p>This is appended to the master sidebar.</p>
@endsection

@section('content')
	
	<div class="container" id="register">
		<div class="col-md-offset-1 col-md-10">
			<div class="row header-register">
				<div class="col-md-4 option-register">
					<span class="active">MEMBER REGISTRATION</span>
				</div>
				<div class="col-md-4 option-register">
					<span>FAST REGISTER</span>
				</div>
			</div>
			<div class="row content-header">
				<div class="col-md-6">
					<div class="row">
						<h3>YOUR ACCOUNT</h3>
					</div>
					<div class="row">
						<div class="col-md-5">
							Choose a Username*
						</div>
						<div class="col-md-6">
							<input name='username' placeholder='Choose a username' />
						</div>
					</div>
					<div class="row">
						<div class="col-md-5">
							Email Address*
						</div>
						<div class="col-md-6">
							<input name="email" placeholder="Email Address" />
						</div>
					</div>
					<div class="row">
						<div class="col-md-5">
							Password*
						</div>
						<div class="col-md-6">
							<input name="password" placeholder="Enter your password" />
						</div>
					</div>
					<div class="row">
						<div class="col-md-5">
							Confirm Password*
						</div>
						<div class="col-md-6">
							<input name="confirm-password" placeholder="Re-enter password" />
						</div>
					</div>
					<div class="row">
						<div class="col-md-5">
							Phone Number*
						</div>
						<div class="col-md-6">
							<input name="phone" placeholder="Your phone" />
						</div>
					</div>
					<div class="row">
						<div class="col-md-5">
							Currency*
						</div>
						<div class="col-md-6">
							<select>
								<option>IDR</option>
								<option>CNY</option>
								<option>MYR</option>
							</select>
						</div>
					</div>
					<div class="row">
						<div class="col-md-5">
							Prefer Wallet*
						</div>
						<div class="col-md-6">
							<select>
								<option>Main wallet</option>
							</select>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="row">
						<div class="col-md-offset-1">
							<h3>CONTACT DETAIL</h3>
						</div>
					</div>
					<div class="row">
						<div class="col-md-5 col-md-offset-1">
							Bank Name*
						</div>
						<div class="col-md-6">
							<select>
								<option>BANK BCA</option>
								<option>BANK BNI</option>
							</select>
						</div>
					</div>
					<div class="row">
						<div class="col-md-5 col-md-offset-1">
							Bank Account No*
						</div>
						<div class="col-md-6">
							<input name="bank-account-number" placeholder="Email Address" />
						</div>
					</div>
					<div class="row">
						<div class="col-md-5 col-md-offset-1">
							Bank Account Name*
						</div>
						<div class="col-md-6">
							<input name="bank-account-name" placeholder="Enter your password" />
						</div>
					</div>
					<div class="row">
						<div class="col-md-5 col-md-offset-1">
							Referral ID / Affiliate ID
						</div>
						<div class="col-md-6">
							<input name="Referral-id" placeholder="Enter your password" />
						</div>
					</div>
				</div>
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