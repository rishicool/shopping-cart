<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;


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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix("products")->group(function () {
    Route::get('/all', [ProductController::class, 'productList'])->name('products.list');
});

Route::prefix("auth")->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
    Route::post('/signup', [AuthController::class, 'signup'])->name('auth.signup');
});

Route::controller(CartController::class)->prefix("cart")->group(function () {
    Route::get('/', [CartController::class, 'cartList'])->name('cart.list');
    Route::post('add-to-cart', [CartController::class, 'addToCart'])->name('cart.store');
    Route::post('update-cart', [CartController::class, 'updateCartQty'])->name('cart.update');
    Route::post('remove', [CartController::class, 'removeCartItem'])->name('cart.remove');
    Route::post('clear', [CartController::class, 'clearAllCart'])->name('cart.clear');
});
Route::controller(OrderController::class)->group(function () {

});
    
    
    

