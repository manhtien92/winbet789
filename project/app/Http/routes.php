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

    Route::group(['prefix' => 'api'], function()
    {
        // User authenticate
        Route::post('authenticate', 'Auth\AuthController@authenticate');

        // Get current user
        Route::get('authenticate/user', 'Auth\AuthController@getAuthenticatedUser');

        
    });

    // Create new user
    Route::post('auth/signup', 'Auth\AuthController@create');
    
	// Home page
	Route::get('/', 'client\HomeController@index');

    // Get register view
    Route::get('register', 'Auth\AuthController@register');

    // Cofirm code
    Route::get('register/verify/{confirmationCode}', [
        'as' => 'confirmation_path',
        'uses' => 'Auth\AuthController@confirm'
    ]);
});
