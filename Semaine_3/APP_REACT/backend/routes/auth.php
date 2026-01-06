<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\VehiculeController;
use App\Http\Controllers\Api\ReparationController;
use App\Http\Controllers\Api\TechnicienController;
use App\Http\Controllers\Api\AuthController;


Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest')
    ->name('register');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest')
    ->name('login');

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
    ->middleware('guest')
    ->name('password.email');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
    ->middleware('guest')
    ->name('password.store');

Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
    ->middleware(['auth', 'signed', 'throttle:6,1'])
    ->name('verification.verify');

Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
    ->middleware(['auth', 'throttle:6,1'])
    ->name('verification.send');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

// API Routes
Route::prefix('v1')->group(function () {

    //connexion
    //Route::post('/login', [AuthController::class, 'login']);
    //Route::post('/register', [AuthController::class, 'register']);
    //Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'register']);
    Route::get('/logout', [AuthController::class, 'logout']);

    // Véhicules
    Route::get('/vehicules', [VehiculeController::class, 'index']);
    Route::post('/vehicules', [VehiculeController::class, 'store']);
    Route::get('/vehicules/{id}', [VehiculeController::class, 'show']);
    Route::put('/vehicules/{id}', [VehiculeController::class, 'update']);
    Route::delete('/vehicules/{id}', [VehiculeController::class, 'destroy']);

    // Réparations
    Route::get('/reparations', [ReparationController::class, 'index']);
    Route::post('/reparations', [ReparationController::class, 'store']);
    Route::get('/reparations/{id}', [ReparationController::class, 'show']);
    Route::put('/reparations/{id}', [ReparationController::class, 'update']);
    Route::delete('/reparations/{id}', [ReparationController::class, 'destroy']);

    // Techniciens
    Route::get('/techniciens', [TechnicienController::class, 'index']);
    Route::post('/techniciens', [TechnicienController::class, 'store']);
    Route::get('/techniciens/{id}', [TechnicienController::class, 'show']);
    Route::put('/techniciens/{id}', [TechnicienController::class, 'update']);
    Route::delete('/techniciens/{id}', [TechnicienController::class, 'destroy']);

    // Routes supplémentaires
    Route::get('/vehicules/{id}/reparations', function ($id) {
        $vehicule = \App\Models\Vehicule::with('reparations.techniciens')->find($id);

        if (!$vehicule) {
            return response()->json([
                'success' => false,
                'message' => 'Véhicule non trouvé'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $vehicule->reparations
        ]);
    });

    Route::get('/techniciens/{id}/reparations', function ($id) {
        $technicien = \App\Models\Technicien::with('reparations.vehicule')->find($id);

        if (!$technicien) {
            return response()->json([
                'success' => false,
                'message' => 'Technicien non trouvé'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $technicien->reparations
        ]);
    });
});

