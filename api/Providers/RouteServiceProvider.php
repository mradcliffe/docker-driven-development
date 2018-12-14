<?php

namespace Radcliffe\DockerExample\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    protected $namespace = 'Radcliffe\DockerExample\Http\Controllers';
    protected $apiNamespace = 'Radcliffe\DockerExample\Http\Controllers\Api';

    /**
     * {@inheritdoc}
     */
    public function boot()
    {
        parent::boot();
    }

    /**
     * {@inheritdoc}
     */
    public function map()
    {
        $this->mapApiRoutes();
        $this->mapWebRoutes();
    }

    /**
     * {@inheritdoc}
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
            ->namespace($this->namespace)
            ->group(base_path('routes/web.php'));
    }

    /**
     * {@inheritdoc}
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
            ->middleware('api')
            ->namespace($this->apiNamespace)
            ->group(base_path('routes/api.php'));
    }
}
