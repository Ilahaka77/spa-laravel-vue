<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required', 'string', 'max:255', 'email'],
            'password' => ['required', 'string', 'min:8']
        ]);

        if(! Auth::attempt($request->only('email', 'password'))){
            return response()->json([
                'message' => 'Authenticate is invalid',
                'errors' => [
                    'root' => 'Could not sign in with those details'
                ]
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $accessToken = Auth::user()->createToken('access_token')->accessToken;

        return response()->json([
            'message' => 'success',
            'data' => Auth::user(),
            'meta' => [
                'token' => $accessToken
            ]
            ], Response::HTTP_CREATED);
    }

    public function logout()
    {
        Auth::user()->token()->revoke();
        return response()->json([
            'message' => 'logout success'
        ], Response::HTTP_OK);
    }
}
