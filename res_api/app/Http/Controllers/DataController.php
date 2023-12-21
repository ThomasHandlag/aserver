<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DataController extends Controller
{
    public function getErrors()
    {
        return response()->json(['data' => DB::select("SELECT * FROM datas")]);
    }

    public function getNof(Request $request)
    {
        return response()->json(DB::select("SELECT * FROM notifications WHERE user_id = '$request->id'"));
    }

    public function getComments(Request $request)
    {
        return response()->json(DB::select("SELECT * FROM comments WHERE post_id = '$request->id'"));
    }

    public function getServices()
    {
        return response()->json(DB::select("SELECT * FROM services"));
    }

    public function getPosts(Request $request)
    {
        return response()->json(['posts' => DB::select("SELECT * FROM posts WHERE user_id = '$request->id'"),
         'count' => DB::table('posts')->where('user_id', $request->id)->count()]);
    }

    public function addComment(Request $request)
    {
        if (DB::insert("INSERT INTO comments (user_id, post_id, comment) VALUES ('$request->user_id', '$request->post_id', '$request->comment')")) {
            return response()->json(["success" => true]);
        } else {
            return response()->json(["success" => false]);
        }
    }

    public function addPost(Request $request)
    {
        $sc = DB::table('posts')->insert(['title' => $request->title, 'body' => $request->content, 'user_id' => $request->id, 'create_at' => now()]);
        if ($sc > 0) {
            return response()->json(['success' => true]);
        } else {
            return response()->json(['success' => false]);
        }
    }

    public function addService(Request $request)
    {
        if (DB::insert("INSERT INTO rentinfo (user_id, service) VALUES ('$request->user_id', '$request->service')")) {
            return response()->json(["success" => true]);
        } else {
            return response()->json(["success" => false]);
        }
    }

    public function deleteComment(Request $request)
    {
        if (DB::delete("DELETE FROM comments WHERE id = '$request->id'") > 0) {
            return response()->json(["success" => true]);
        } else {
            return response()->json(["success" => false]);
        }
    }

    public function deletePost(Request $request)
    {
        if (DB::delete("DELETE FROM posts WHERE id = '$request->id'") > 0) {
            return response()->json(["success" => true]);
        } else {
            return response()->json(["success" => false]);
        }
    }
    public function deleteService(Request $request)
    {
        if (DB::delete("DELETE FROM rentinfo WHERE id = '$request->id'") > 0) {
            return response()->json(["success" => true]);
        } else {
            return response()->json(["success" => false]);
        }
    }

    public function updatePost(Request $request)
    {
        if (DB::update("UPDATE posts SET post = '$request->post' WHERE id = '$request->id'") > 0) {
            return response()->json(["success" => true]);
        } else {
            return response()->json(["success" => false]);
        }
    }

    public function updateService(Request $request)
    {
        if (DB::update("UPDATE rentinfo SET service = '$request->service' WHERE id = '$request->id'") > 0) {
            return response()->json(["success" => true]);
        } else {
            return response()->json(["success" => false]);
        }
    }

    public function updatePassword(Request $request)
    {
        if (DB::update("UPDATE users SET password = '$request->password' WHERE id = '$request->id'") > 0) {
            return response()->json(["success" => true]);
        } else {
            return response()->json(["success" => false]);
        }
    }

    public function getAllPosts() {
        return response()->json(['data' => DB::select("SELECT * FROM posts")]);
    }
}
