<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\PodcastProcessed;
use App\Events\PrivatePodcastProcessed;


class WSController extends Controller
{
    public function dispatch()
    {
        PodcastProcessed::dispatch("Hello");
        PrivatePodcastProcessed::dispatch("Hi");
        return "DISPATCHED";
    }
}
