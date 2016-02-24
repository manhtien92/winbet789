<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
Route::get('/admin', 'admin\HomeController@index');
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/
//Route::get('getPass', function(){
//    echo Hash::make('lamtanphiho1');
//});
Route::group(['middleware' => ['web']], function () {

	// Home page
	Route::get('/', 'client\HomeController@index');

	// User login

    Route::post('auth', 'Auth\AuthController@auth');

    // User logout
    Route::get('logout', 'Auth\AuthController@logout');

    // Get register view
    Route::get('register', 'Auth\AuthController@register');
});
