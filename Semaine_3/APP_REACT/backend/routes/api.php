<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\VehiculeController;
use App\Http\Controllers\Api\ReparationController;
use App\Http\Controllers\Api\TechnicienController;

Route::prefix('v1')->group(function () {
    // AUTH
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('user', fn (Request $request) => $request->user());

        Route::apiResource('vehicules', VehiculeController::class);
        Route::apiResource('reparations', ReparationController::class);
        Route::apiResource('techniciens', TechnicienController::class);
    });
});
