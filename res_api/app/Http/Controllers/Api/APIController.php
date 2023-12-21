<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class APIController extends Controller
{
    public function signin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        // Attempt to log the user in
        if (Auth::attempt($request->only('email', 'password'))) {
            $user = DB::select('SELECT * FROM users WHERE email = "' . $request->email . '"')[0];
            return response()->json(['user' => $user, 'success' => true]);
        }
        // Return an error response
        return response()->json([
            'error' => 'The provided credentials are incorrect.',
            'success' => false
        ]);
    }

    // Register a new user and insert into DB
    public function signup(Request $request)
    {
        // Create a new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $data = DB::select('SELECT * FROM users WHERE email = "' . $request->email . '"')[0];

        // Generate a token for the user
        $token = $user->createToken('res_api')->accessToken;
        return response()->json(
            ['success' => true, 'token' => $token, 'user' => $data],
            200
        );
    }

    // Delete user
    public function delete(Request $request)
    {
        DB::delete("DELETE FROM users WHERE id = '$request->id'");
        return response()->json(['success' => true]);
    }

    // Sign out 
    public function signout(Request $request)
    {
        $token = $request->user()->token();
        $request->user()->tokens()->where('id', $token->id)->delete();
    }

    public function getUser(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        return response()->json(['user' => $user, 'count' => DB::table('posts')->where('user_id', $user->id)->count()]);
    }

    public function updateProfile(Request $request)
    {
        $file = $request->file('file');
        $imageName =  substr(Hash::make($file->getClientOriginalName()), 0, 10). '.' . $file->extension();
        $store_path = $file->storeAs('images', $imageName);
        $ch = DB::table('users')->where('id', '=', $request->id)->update(['img_link' => $store_path]);
        if ($ch > 0) {
            return response()->json(['success' => true]);
        } else {
            return response()->json(['success' => false]);
        }
    }

    public function changePassword(Request $request)
    {
        $sc = DB::table('users')->where('id', '=', $request->id)->update(['password' => Hash::make($request->password)]);
        if ($sc > 0) {
            return response()->json(['success' => true]);
        } else {
            return response()->json(['success' => false]);
        }
    }

    public function getPosts(Request $request)
    {
        $posts = DB::select('SELECT * FROM posts WHERE user_id = "' . $request->id . '"');
        return response()->json(['posts' => $posts]);
    }

    public function addPost(Request $request)
    {
        $sc = DB::insert("INSERT INTO posts (title, body, user_id) VALUES ('" . $request->title . "', '" . $request->content . "', '" . $request->user_id . "')");
        if ($sc > 0) {
            return response()->json(['success' => true]);
        } else {
            return response()->json(['success' => false]);
        }
    }
}
