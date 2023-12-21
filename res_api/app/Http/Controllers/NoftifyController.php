<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NoftifyController extends Controller
{
    public function index(Request $request) {
        $data = DB::table('mailstores')->get()->where("id", $request->id);
        return ['data' => $data ];
    }
}
