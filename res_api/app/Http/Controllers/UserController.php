<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function signin(Request $request)
    {
        $data = DB::select("SELECT * FROM users WHERE email = '$request->email' AND password = '$request->password'");
        if (sizeof($data) > 0) {
            return response()->json(['success' => true, 'user' => $data]);
        } else
            return response()->json(['success' => false, 'error' => 'Something went wrong']);
    }

    public function signup(Request $request)
    {
        if (DB::insert("INSERT INTO users (name, email, phone, password) VALUES ('$request->name', '$request->email', '$request->phone', '$request->password')")) {
            return response()->json(['success' => true]);
        } else
            return response()->json(['success' => false, 'error' => 'Something went wrong']);
    }

    public function delete(Request $request)
    {
        DB::delete("DELETE FROM users WHERE id = '$request->id'");
        return response()->json(['success' => true]);
    }
}
