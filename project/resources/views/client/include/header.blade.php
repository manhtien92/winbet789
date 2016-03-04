<div class="container">
    <div class="row header" ng-controller="AuthController">
        <div class="col-md-3">
            <a href="#home">
                <h1 style="color:#fff;font-size:30px">HOKIBET188</h1>
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
                        <div class="btn-group ico-dropdown">
                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                            <img id="languageico" src="{{ URL::asset('assets/img/client/flag/hdr_lag_en.gif') }}" width="18" height="14" border="0">
                            <span class="ico-down"></span>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="row info-user">

                <form ng-show="!currentUser" id="login-form" class="right">
                    <input placeholder="USERNAME"  ng-model="username" type="text" maxlength="30" required >
                    <input placeholder="PASSWORD" ng-model="password" type="password" maxlength="256" required>
                    <input type="submit" id="btn-login" ng-click="login()" value="Log In" class="log-btn">
                    <img src="{{ URL::asset('assets/img/client/hdr_icon_lock.png') }}" width="16" height="16" border="0">
                </form>
                <div ng-if="currentUser">
                    <div class="col-md-offset-3 col-md-4 col-sm-offset-3 col-sm-4">
                        <p ng-cloak class="right"><%'Hi ,' + currentUser.username%></p>
                    </div>
                    <div class="col-md-3 col-sm-3">
                        <p class="left">
                            <span ng-cloak id="main-balance"><%currentUser.main_balance%></span>
                            <span ng-cloak id="currency"><%currentUser.currency%></span>
                        </p>
                    </div>
                    <div class="col-md-2 col-sm-2">
                        <a ng-click="logout()" class="btn white right" href="">logout</a>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="input-notice col-md-6">
                    <span>NOTICE</span>
                    <em id="Notice">
                        <marquee scrollamount="2" onmouseout="this.start()" onmouseover="this.stop()">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - HOKIBET188.COM HOLD REGULAR GAMING LICENSE IN PHILIPPINES GOVERNMENT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-  PROMO EXTRA BONUS 100% &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- TOURNAMENT LIVE CASINO BY TURNOVER&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- NOW AG CASINO AND PLAYTECH ALREADY CAN ACCESS IN ANDROID SMARTPHONE</marquee>
                    </em>
                </div>
                <div class="col-md-6">
                    <a ng-if="!currentUser" class="light right" href="ForgetPassword">Forget login details?</a>
                    <div class="row" ng-if="currentUser">
                        <ul class="method right">
                            <li>
                                <a href="#">Deposit</a>
                            </li>
                            <li>
                                <a href="#">Transfer</a>
                            </li>
                            <li>
                                <a href="#">Withdrawal</a>
                            </li>
                            <li>
                                <a href="#">Profile</a>
                            </li>
                            <li>
                                <a href="#">Report</a>
                            </li>
                        </ul>
                    </div>
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
                    <li class="dropdown">
                        <a class="ico-home" href="#home">
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
                                    <img src="{{ URL::asset('assets/img/client/nav/cmd368.png') }}">
                                    <p>C-SPORTS</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="{{ URL::asset('assets/img/client/nav/menu-sbobet.png') }}">
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
                                    <img src="{{ URL::asset('assets/img/client/nav/gameplay_casino.png') }}">
                                    <p>GP CASINO</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="{{ URL::asset('assets/img/client/nav/allbet_casino.png') }}">
                                    <p>ALLBET CASINO</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="{{ URL::asset('assets/img/client/nav/ag_casino.png') }}">
                                    <p>AG CASINO</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="{{ URL::asset('assets/img/client/nav/855_casino.png') }}">
                                    <p>855 CASINO</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="dropdown ">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        SLOT GAMES <sup class="new">NEW</sup>
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
                    <li ng-if="!currentUser" class="dropdown alert-main">
                        <a href="#register">
                        JOIN NOW
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</div>
