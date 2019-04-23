<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['json.response']], function () {

    // public routes
    //->login - POST
    Route::post('/login', 'Api\AuthController@login')->name('login.api');
    //->register - POST
    Route::post('/register', 'Api\AuthController@register')->name('register.api');

    // private routes

    Route::middleware('auth:api')->group(function () {

      //->user - GET
      Route::get('/user', function (Request $request) {
          return $request->user();
      });
      //->logout - GET
      Route::get('/logout', 'Api\AuthController@logout')->name('logout');
    });

});
