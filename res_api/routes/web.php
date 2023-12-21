<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServerController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get(
    '/dashboard',
    [ServerController::class, 'index']
)->middleware(['auth', 'verified'])->name('home');

// get data to display info
Route::get('api/get_errors', [DataController::class, 'getErrors']);
Route::get('api/get_nofications', [DataController::class, 'getNof']);
Route::get('api/get_user', [UserController::class, 'getUser']);
Route::get('api/get_posts', [DataController::class, 'getPosts']);
Route::get('api/get_comments', [PostController::class, 'getComments']);
Route::get('api/get_services', [DataController::class, 'getServices']);

// user utilities
Route::get('api/sign_in', [UserController::class, 'signin']);
Route::post('api/sign_up', [UserController::class, 'signup']);
Route::get('api/delete_user', [UserController::class, 'delete']);

Route::post('api/add_comment', [DataController::class, 'addComment']);
Route::post('api/add_post', [DataController::class, 'addPost']);
Route::post('api/add_service', [DataController::class, 'addService']);

Route::get('api/delete_post', [DataController::class, 'deletePost']);
Route::get('api/delete_comment', [DataController::class, 'deleteComment']);
Route::get('delete_service', [DataController::class, 'deleteService']);

Route::get('api/update_post', [DataController::class, 'updatePost']);
Route::post('api/update_service', [DataController::class, 'updateService']);
Route::post('api/update_password', [UserController::class, 'updatePassword']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
