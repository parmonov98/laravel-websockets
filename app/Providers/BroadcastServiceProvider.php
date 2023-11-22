<?php

namespace App\Providers;

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if(request()->hasHeader('Authorization')) {
            Broadcast::routes(["middleware" => "auth:api"]); //is for the api clients requests(React Native App in my case)
        } else {
            Broadcast::routes();//is for the web requests
        }

        require base_path('routes/channels.php');
    }
}
