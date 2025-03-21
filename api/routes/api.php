<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/category', [CategoryController::class, 'index']);

Route::prefix('product')->group(function () {
    Route::get('/all', [ProductController::class, 'index']);
    Route::get('/search', [ProductController::class, 'search']);
    Route::get('/detail/{slug}', [ProductController::class, 'show']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/order', [OrderController::class, 'store']);

    Route::prefix('creator')->group(function () {
        Route::get('product', [ProductController::class, 'getAllbycreator']);
        Route::get('product/{slug}', [ProductController::class, 'getOnebycreator']);
        Route::post('product', [ProductController::class, 'store']);
        Route::post('product/{slug}', [ProductController::class, 'update']);
        Route::delete('product/{slug}', [ProductController::class, 'destroy']);
        Route::get('order/sales', [OrderController::class, 'getJualanAll']);
        Route::get('order/purchase', [OrderController::class, 'getPembelianAll']);
        Route::get('order/{order}', [OrderController::class, 'show']);
        Route::put('order/approve/{order}', [OrderController::class, 'updatePaid']);
    });
});
