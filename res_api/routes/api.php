<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\APIController;
use App\Http\Controllers\DataController;
/*
|--------------------------------------------------------------------------
| v2 Routes
|--------------------------------------------------------------------------
|
| Here is where you can register v2 routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "v2" middleware group. Make something great!
|
*/
// user utilities
Route::post('v2/sign_up', [APIController::class, 'signup']);
Route::get('v2/sign_in', [APIController::class, 'signin']);
Route::get('v2/delete_user', [APIController::class, 'delete']);
Route::get('v2/get_user', [APIController::class, 'getUser']);
Route::post('v2/update_profile', [APIController::class, 'updateProfile']);
Route::post('v2/change_psw', [APIController::class, 'changePassword']);

Route::get('v2/get_errors', [DataController::class, 'getErrors']);
Route::get('v2/get_nofications', [DataController::class, 'getNof']);
Route::get('v2/get_posts', [DataController::class, 'getPosts']);
Route::get('v2/get_posts_all', [DataController::class, 'getAllPosts']);
Route::get('v2/get_comments', [PostController::class, 'getComments']);
Route::get('v2/get_services', [DataController::class, 'getServices']);

Route::post('v2/add_comment', [DataController::class, 'addComment']);
Route::post('v2/add_post', [DataController::class, 'addPost']);
Route::post('v2/add_service', [DataController::class, 'addService']);

Route::get('v2/delete_post', [DataController::class, 'deletePost']);
Route::get('v2/delete_comment', [DataController::class, 'deleteComment']);
Route::get('delete_service', [DataController::class, 'deleteService']);

Route::get('v2/update_post', [DataController::class, 'updatePost']);
Route::post('v2/update_service', [DataController::class, 'updateService']);
Route::post('v2/update_password', [APIController::class, 'updatePassword']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
