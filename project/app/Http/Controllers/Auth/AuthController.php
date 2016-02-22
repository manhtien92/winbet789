<?php

namespace App\Http\Controllers\Auth;

use Auth;
use App\User;
use Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest', ['except' => ['logout', 'register']]);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|confirmed|min:6',
        ]);
    }

    /**
     * Get register view
     *
     * @param  $request
     * @return HTML
     */
    protected function register(Request $request)
    {
        return view('client/page/register', ['auth' => Auth::user()]);
    }

    /**
     * Handle a login request to the application.
     *
     * @param  auth  $request
     * @return Response
     */
    public function auth(Request $request)
    {
        if (Auth::attempt($request->only('email', 'password'), true))
        {
            return response()->json(['result' => 'true'], 200);
        } else
        {
            return response()->json(['result' => 'false'], 401);
        }
    }

    /**
     * Handle a logout request to the application.
     *
     * @param  auth  $request
     * @return Response
     */
    public function logout(Request $request)
    {
        Auth::logout();
        return redirect('/');
    }
}
