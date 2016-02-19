<div class="container">
	<div class="row header">
		<div class="col-md-3">
			<a href="home">
				<img src="{{ URL::asset('assets/img/client/hdr_logo.png') }}">
			</a>
		</div>
		<div class="col-md-9">
			<div class="row contact">
				<ul class="right">
                    <li>
                    	<a href="/GetLiveChat" class="ico-livechat" target="livechat">LIVE HELP</a>
                    </li>
                    <li>
                    	<a target="_blank" href="help/rulesSportsbook">BETTING RULES</a>
                    </li>
                    <li>
                    	<a target="_blank" href="help/contact">CONTACT US</a>
                    </li>
                    <li>
                    	<a target="_blank" style="color: red;" href="#">Affiliate</a>
                    </li>
                    <li>
                        <div class="btn-group ico-dropdown">
                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                <img id="languageico" src="{{ URL::asset('assets/img/client/flag/hdr_lag_en.gif') }}" width="18" height="14" border="0">
                                <span class="ico-down"></span>
                            </button>
                        </div>
                    </li>
                </ul>
			</div>
			<div class="row">
				<form id="login-form" class="right">
                    <input placeholder="USERNAME" name="UID" type="text" id="UID" maxlength="30" required="true" value="">
                    <input placeholder="PASSWORD" id="PWD" name="PWD" type="password" maxlength="256" required="true" value="">
                    <input type="submit" onclick=" login() " value="Log In" class="log-btn">
                    <img src="{{ URL::asset('assets/img/client/hdr_icon_lock.png') }}" width="16" height="16" border="0">
                </form>
			</div>
			<div class="row">
				<div class="input-notice left">
                    <span>NOTICE</span><em id="Notice"><marquee scrollamount="2" onmouseout="this.start()" onmouseover="this.stop()">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - QQ288.COM HOLD REGULAR GAMING LICENSE IN PHILIPPINES GOVERNMENT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-  PROMO EXTRA BONUS 100% &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- TOURNAMENT LIVE CASINO BY TURNOVER&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- NOW AG CASINO AND PLAYTECH ALREADY CAN ACCESS IN ANDROID SMARTPHONE</marquee></em>
                </div>
                <div class="right">
                	<a class="light" href="ForgetPassword">Forget login details?</a>
                </div>
			</div>
		</div>
	</div>
	<div class="row">
		<nav class="navbar navbar-default">
		    <div class="navbar-header">
		        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
		            <span class="icon-bar"></span>
		            <span class="icon-bar"></span>
		            <span class="icon-bar"></span> 
		        </button>
		    </div>
		    <div class="collapse navbar-collapse" id="myNavbar">
		        <ul class="nav navbar-nav">
		        	<li class="dropdown active">
		            	<a class="ico-home" href="#">
		            	</a>
		            </li>
		            <li class="dropdown ">
		            	<a class="ico-mobile" href="#">
		            	</a>
		            </li>
		            <li class="dropdown ">
		            	<a class="dropdown-toggle" data-toggle="dropdown" href="#">
		            		SPORTS
		            	</a>
		            	<ul class="dropdown-menu">
          					<li>
          						<a href="#">
          							<img src="{{ URL::asset('assets/img/client/nav/hdr_submn_csports.gif') }}">
          							<p>C-SPORTS</p>
          						</a>
          					</li>
          					<li>
          						<a href="#">
          							<img src="{{ URL::asset('assets/img/client/nav/hdr_submn_lvcsn_ic.gif') }}">
          							<p>I-SPORTS</p>
          						</a>
          					</li>
          					<li>
          						<a href="#">
          							<img src="{{ URL::asset('assets/img/client/nav/hdr_submn_ssports.gif') }}">
          							<p>S-SPORTS</p>
          						</a>
          					</li>
        				</ul>
		            </li>
		            <li class="dropdown ">
		            	<a class="dropdown-toggle" data-toggle="dropdown" href="#">
		            		LIVE CASINO <sup class="new">NEW</sup>
		            	</a>
		            	<ul class="dropdown-menu">
          					<li>
          						<a href="#">
          							<img src="{{ URL::asset('assets/img/client/nav/hdr_submn_lvcsn_gp.gif') }}">
                        <p>GP CASINO</p>
          						</a>
          					</li>
          					<li>
          						<a href="#">
          							<img src="{{ URL::asset('assets/img/client/nav/hdr_submn_lvcsn_allbet.gif') }}">
                        <p>ALLBET CASINO</p>
          						</a>
          					</li>
          					<li>
          						<a href="#">
          							<img src="{{ URL::asset('assets/img/client/nav/hdr_submn_lvcsn_ag.gif') }}">
                        <p>AG CASINO</p>
          						</a>
          					</li>
                    <li>
                      <a href="#">
                        <img src="{{ URL::asset('assets/img/client/nav/hdr_submn_lvcsn_pt.gif') }}">
                        <p>PT CASINO</p>
                      </a>
                    </li>
        				</ul>
		            </li>
		            <li class="dropdown ">
		            	<a class="dropdown-toggle" data-toggle="dropdown" href="#">
		            		E-GAMES <sup class="new">NEW</sup>
		            	</a>
		            	<ul class="dropdown-menu">
          					<li>
          						<a href="#">
          							<h3>C-SPORTS</h3>
          							<p>Thiết kế theo yêu cầu khách hàng</p>
          						</a>
          					</li>
          					<li>
          						<a href="#">
          							<h3>I-SPORTS</h3>
          							<p>Tiết kiệm chi phí</p>
          						</a>
          					</li>
          					<li>
          						<a href="#">
          							<h3>S-SPORTS</h3>
          							<p>Tiết kiệm chi phí</p>
          						</a>
          					</li>
        				</ul>
		            </li>
		            <li class="dropdown ">
		            	<a class="dropdown-toggle" data-toggle="dropdown" href="#">
		            		LOTTERY
		            	</a>
		            	<ul class="dropdown-menu">
          					<li>
          						<a href="#">
          							<img src="{{ URL::asset('assets/img/client/nav/keno.gif') }}">
                        <p>KENO</p>
          						</a>
          					</li>
          					<li>
          						<a href="#">
          							<img src="{{ URL::asset('assets/img/client/nav/ilotto.gif') }}">
                        <p>I LOTTO</p>
          						</a>
          					</li>
          					<li>
          						<a href="#">
          							<img src="{{ URL::asset('assets/img/client/nav/4d.gif') }}">
                        <p>ISIN4D</p>
          						</a>
          					</li>
        				</ul>
		            </li>
		            <li class="dropdown ">
		            	<a class="dropdown-toggle" data-toggle="dropdown" href="#">
		            		POKER
		            	</a>
		            	<ul class="dropdown-menu">
          					<li>
          						<a href="#">
          							<h3>C-SPORTS</h3>
          							<p>Thiết kế theo yêu cầu khách hàng</p>
          						</a>
          					</li>
          					<li>
          						<a href="#">
          							<h3>I-SPORTS</h3>
          							<p>Tiết kiệm chi phí</p>
          						</a>
          					</li>
          					<li>
          						<a href="#">
          							<h3>S-SPORTS</h3>
          							<p>Tiết kiệm chi phí</p>
          						</a>
          					</li>
        				</ul>
		            </li>
		            <li class="dropdown ">
		            	<a class="dropdown-toggle" data-toggle="dropdown" href="#">
		            		PROMOTION
		            	</a>
		            	<ul class="dropdown-menu">
          					<li>
          						<a href="#">
          							<h3>C-SPORTS</h3>
          							<p>Thiết kế theo yêu cầu khách hàng</p>
          						</a>
          					</li>
          					<li>
          						<a href="#">
          							<h3>I-SPORTS</h3>
          							<p>Tiết kiệm chi phí</p>
          						</a>
          					</li>
          					<li>
          						<a href="#">
          							<h3>S-SPORTS</h3>
          							<p>Tiết kiệm chi phí</p>
          						</a>
          					</li>
        				</ul>
		            </li>
		            <li class="dropdown alert-main">
		            	<a href="#">
		            		REFERRAL
		            	</a>
		            </li>
		            <li class="dropdown alert-main">
		            	<a href="#">
		            		JOIN NOW
		            	</a>
		            </li>
		        </ul>
		    </div>
		</nav>
	</div>
</div>