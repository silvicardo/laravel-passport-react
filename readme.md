<p align="center"><img src="https://laravel.com/assets/img/components/logo-laravel.svg"></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/d/total.svg" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/v/stable.svg" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/license.svg" alt="License"></a>
</p>

## Passport Steps

Install the basic authentication system integrated in Laravel and Laravel Passport:

```bash
composer require laravel/passport
php artisan make:auth
php artisan migrate
php artisan passport:install
```

Add the Laravel\Passport\HasApiTokens trait to our App\User model:

```php
<?php
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;
?>
```

Add the Passport::routes method within the boot method of our app/AuthServiceProvider like that:

```php
<?php

use Laravel\Passport\Passport;

...

public function boot()
{
    $this->registerPolicies();

    Passport::routes();
}
?>
```
in config/auth set the driver option of the api authentication guard to passport like that:

```php
<?php
'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],

    'api' => [
        'driver' => 'passport',
        'provider' => 'users',
    ],
],
```

## AuthController

Create your new controller:

```bash
php artisan make:controller Api/AuthController.php
```

## ForceJsonResponse Middleware

Create your new middleware:

```bash
php artisan make:middleware ForceJsonResponse
```

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ForceJsonResponse
{
public function handle(Request $request, Closure $next)
    {
        $request->headers->set('Accept', 'application/json');
        return $next($request);
    }
}
```

Add to the $routeMiddleware of the app/Http/Kernel.php file:

```php
<?php
'json.response' => \App\Http\Middleware\ForceJsonResponse::class,
```

## Routes

All routes will use ForceJsonResponse middleware, protected ones also use 'auth:api'

# Postman testing

Set Headers:

```
Content-Type: application/json
X-Requested-With: XMLHttpRequest
```

## Getting Started

Clone the project repository by running the command below if you use SSH

```bash
git clone https://github.com/silvicardo/laravel-passport-react.git
```

If you use https, use this instead

```bash
git clone https://github.com/silvicardo/laravel-passport-react.git
```

After cloning, run:

```bash
composer install
```

```bash
npm install
```

Duplicate `.env.example` and rename it `.env`

Then run:

```bash
php artisan key:generate
```

### Prerequisites

Be sure to fill in your database details in your `.env` file before running the migrations:

```bash
php artisan migrate
```

And finally, start the application:

```bash
php artisan serve
```

and visit [http://localhost:8000](http://localhost:8000) to see the application in action.

## Built With

* [Laravel](https://laravel.com) - The PHP Framework For Web Artisans
* [React](https://reactjs.org) - A JavaScript library for building user interfaces
* [React-Redux](https://react-redux.js.org/) - Official React bindings for Redux
