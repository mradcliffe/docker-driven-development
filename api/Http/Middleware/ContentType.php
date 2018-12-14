<?php

namespace Radcliffe\DockerExample\Http\Middleware;

use \Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ContentType
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $this->checkHeaders($request);
        return $next($request);
    }

    protected function checkHeaders(Request $request)
    {
        if ($request->getContentType() !== 'json') {
            throw new HttpException(415, 'Unsupported Media Type');
        }
        $accept = $request->getAcceptableContentTypes();

        if (!empty($accept) && !in_array('application/json', $request->getAcceptableContentTypes())) {
            throw new HttpException(406, 'Not Acceptable');
        }
    }
}
