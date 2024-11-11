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
    public function getSongs()
    {
        $songs = DB::table('songs')->get();
        return response()->json($songs);
    }

    public function getSong($id)
    {
        $song = DB::table('songs')->where('id', $id)->first();
        return response()->json($song);
    }

    public function getSongByKeyword($keyword)
    {
        $songs = DB::table('songs')->where('title', 'like', '%' . $keyword . '%')->get();
        return response()->json($songs);
    }

    public function getSongByGenre($genre)
    {
        $songs = DB::table('songs')->where('genre', $genre)->get();
        return response()->json($songs);
    }

    public function getMostPopularSong()
    {
        //get 3 most popular songs
        $songs = DB::table('songs')->orderBy('play_count', 'desc')->take(3)->get();
        return response()->json($songs);
    }

    // get songs by given data
    public function getSongByData(Request $request)
    {
        $data = $request->all();
        $songs = DB::table('songs')->where($data)->get();
        return response()->json($songs);
    }

    //get songs that have nearest published date compare to current date
    public function getNewestSong()
    {
        $songs = DB::table('songs')->orderBy('published_date', 'desc')->take(3)->get();
        return response()->json($songs);
    }

    //get song by tag_int 
    public function getSongByTagInt($tag_int)
    {
        $songs = DB::table('songs')->where('tag_int', $tag_int)->get();
        return response()->json($songs);
    }
}
