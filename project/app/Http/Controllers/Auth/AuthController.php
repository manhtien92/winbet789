<?php

namespace App\Http\Controllers\Auth;

use Auth;
use Mail;
use Event;
use Hash;
use Session;
use App\User;
use Validator;
use Illuminate\Http\Request;
use App\Events\UserWasRegistered;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

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
        $this->middleware('jwt.auth', ['except' => ['authenticate']]);
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
            'name'      => 'required|min:3|max:60',
            'email'     => 'required|email|max:60|unique:users',
            'password'  => 'required|confirmed|min:6|max:20',
            'phone'     => 'required|min:6|max:20',
            'currency'  => 'required|size:3',
            'bank_name' => 'required|min:6|max:60',
            'bank_account_number'   => 'required|min:6|max:30',
            'bank_account_name'     => 'required|min:6|max:30',
        ]);
    }

    /**
     * Handle a user request to create new user.
     *
     * @param  Request  $request
     * @return Response
     */
    public function create(Request $request)
    {
        // Run validator
        $validator = $this->validator( $request->all() );

        // Throw error if validate fail
        if ( $validator->fails() ) {

            $result = array(
                'result'    => FALSE,
                'data'      => $validator->messages()->toArray()
            );
            return response()->json($result, 403);

        } else {
            // Set db column allow write
            $user = $request->only('name', 'email', 'password', 'phone', 'currency', 'bank_name', 'bank_account_number', 'bank_account_name' );

            // Genarate confirmation code
            $user['confirmation_code'] = str_random(30);

            // Hash password
            $user['password'] = Hash::make($user['password']);

            $user = User::create($user);

            if ($user) {
                $user['base_url'] = asset('/');
                Mail::send('emails.contact', ['data' => $user], function ($message) use ($user) {
                    $message->subject('Welcome to Hokibet188')
                            ->to($user['email'])
                            ->replyTo('Hokibet188@gmail.com');
                });
                return response()->json(['result' => TRUE], 200);
            }
        }
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
    public function authenticate(Request $request)
    {
        $credentials = $request->only('username', 'password');
        try {
            // verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        // if no errors are encountered we can return a JWT
        return response()->json(compact('token'));
    }

    /**
     * Confirm code to active account
     *
     * @param  $confirmation_code
     * @return Home page
     */
    public function confirm($confirmation_code)
    {
        if( ! $confirmation_code)
        {
            throw new InvalidConfirmationCodeException;
        }

        $user = User::whereConfirmationCode($confirmation_code)->first();

        Auth::login($user);

        if ( ! $user)
        {
            throw new InvalidConfirmationCodeException;
        }

        $user->confirmed = 1;
        $user->confirmation_code = null;
        $user->save();

        return redirect('/');
    }

    /**
     * Return the authenticated user
     *
     * @return Response
     */
    public function getAuthenticatedUser()
    {
        try {

            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['token_expired'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json(['token_invalid'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());

        }

        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('user'));
    }

}
