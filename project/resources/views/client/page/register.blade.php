@extends('client.layout.master')

@section('title', 'Page Title')

@section('sidebar')
    @parent

    <p>This is appended to the master sidebar.</p>
@endsection

@section('content')
	
	<div class="container" id="register">
		<form id='frm-register'>
			<input type="hidden" name="_token" value="{{ csrf_token() }}">
			<div class="col-md-offset-1 col-md-10">
				<div class="row header-register">
					<div class="col-md-6 option-register">
						<span class="">MEMBER REGISTRATION</span>
					</div>
					<div class="col-md-6 option-register text-right">
						<span class="btn">FAST REGISTER</span>
					</div>
				</div>
				<div class="row content-header">
					<div class="col-md-6">
						<div class="row">
							<h3>YOUR ACCOUNT</h3>
						</div>

						<div class="row">
							<div class="col-md-5">
								User name<sup class="required">*</sup>
							</div>
							<div class="col-md-6">
								<input name='username' placeholder='Enter your username' />
								<div class="ip-error username"></div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-5">
								Email Address<sup class="required">*</sup>
							</div>
							<div class="col-md-6">
								<input name="email" placeholder="Email Address" />
								<div class="ip-notice">
									Important*</br>
									Correct email address is required for Password retrieval
								</div>
								<div class="ip-error email"></div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-5">
								Password<sup class="required">*</sup>
							</div>
							<div class="col-md-6">
								<input type="password" name="password" placeholder="Enter your password" />
								<div class="ip-error password"></div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-5">
								Confirm Password<sup class="required">*</sup>
							</div>
							<div class="col-md-6">
								<input type="password" name="password_confirmation" placeholder="Re-enter password" />
								<div class="ip-error password_confirmation"></div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-5">
								Phone Number<sup class="required">*</sup>
							</div>
							<div class="col-md-6">
								<input name="phone" placeholder="Your phone" />
								<div class="ip-notice">
									Important*
									Please fill in the correct phone number, in order to make you easier when need to reset password
								</div>
								<div class="ip-error phone"></div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-5">
								Currency<sup class="required">*</sup>
							</div>
							<div class="col-md-6">
								<select name="currency">
									<option>IDR</option>
								</select>
								<div class="ip-error currency"></div>
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
								Bank Name<sup class="required">*</sup>
							</div>
							<div class="col-md-6">
								<select name='bank_name'>
									<option>BANK BCA</option>
									<option>BANK BNI</option>
									<option>BANK BRI</option>
									<option>BANK MANDIRI</option>
								</select>
								<div class="ip-error bank_name"></div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-5 col-md-offset-1">
								Bank Account No<sup class="required">*</sup>
							</div>
							<div class="col-md-6">
								<input name="bank_account_number" placeholder="bank account number" />
								<div class="ip-notice">
									Important*
									Please fill in the correct bank account number, in order to be easier when need to do withdrawal
								</div>
								<div class="ip-error bank_account_number"></div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-5 col-md-offset-1">
								Bank Account Name<sup class="required">*</sup>
							</div>
							<div class="col-md-6">
								<input name="bank_account_name" placeholder="bank account name" />
								<div class="ip-error bank_account_name"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="row content-header condition">
					<div class="col-md-12">
						<input id="over18" type="checkbox" />
						*I am over 18 years of age and have read and accepted Terms & Conditions, Privacy Policy & Betting Rules as published on this site.
					</div>
				</div>
				<div class="row content-header">
					<div class="col-md-offset-9 col-md-3 submit">
						<button class="btn" type="submit">Submit</button>
					</div>
				</div>
			</div>
		</form>
	</div>
	<script type="text/javascript">
		$(document).ready(function () {
			Register.init();
		});
	</script>
	<script src="{{ URL::asset('assets/js/client/app/register.js') }}"></script>
@endsection