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
Route::get('v2/getSongs', [APIController::class, 'getSongs']);
Route::get('v2/getSong/{id}', [APIController::class, 'getSong']);
//create a route to get a song by key word
Route::get('v2/getSongByKeyword/{keyword}', [APIController::class, 'getSongByKeyword']);
//create a route to get a song by genre
Route::get('v2/getSongByGenre/{genre}', [APIController::class, 'getSongByGenre']);
Route::get('v2/getMostPopularSong', [APIController::class, 'getMostPopularSong']);
Route::get('v2/getSongByData', [APIController::class, 'getSongByData']);
Route::get('v2/getNewestSong', [APIController::class, 'getNewestSong']);
Route::get('v2/getSongByTagInt/{tag_int}', [APIController::class, 'getSongByTagInt']);
