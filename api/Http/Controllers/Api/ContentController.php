<?php

namespace Radcliffe\DockerExample\Http\Controllers\Api;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Radcliffe\DockerExample\Http\Controllers\Controller;
use Radcliffe\DockerExample\Models\Message;
use Radcliffe\DockerExample\Models\Author;

class ContentController extends Controller
{

    /**
     * Returns content listing.
     *
     * @return array
     */
    public function index()
    {
        return $this->getContent();
    }

    /**
     * Return one message.
     *
     * @param \Illuminate\Http\Request $request
     *   The request object.
     * @param string $id
     *   The ID.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function get(Request $request, $id)
    {
        $response = new JsonResponse();

        if (!is_numeric($id)) {
            $response->setStatusCode(406, 'Invalid request');
            return $response;
        }

        try {
            $message = Message::where('id', $id)->firstOrFail();
            return [$message];
        } catch (ModelNotFoundException $e) {
            $response->setStatusCode(404, 'Message not found');
        }

        return $response;
    }

    /**
     * Add a message.
     *
     * @param \Illuminate\Http\Request $request
     *   The request object.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function new(Request $request)
    {
        $response = new JsonResponse();
        if (!$request->has(['author', 'message'])) {
            $response->setStatusCode(406, 'Invalid message');
            return $response;
        }

        $name = $request->input('author');
        $message = $request->input('message');

        if (!is_string($name) && preg_match('/[^a-zA-Z0-9\-_]/', $name)) {
            $response->setStatusCode(406, 'Invalid author');
            return $response;
        }

        if (!is_string($message)) {
            $response->setStatusCode(406, 'Invalid message');
            return $response;
        }

        try {
            $author = Author::where('props->name', $name)->first();
            if (!$author) {
                $author = new Author();
                $author->props = ['name' => $name];
                $author->save();
            }

            $msg = new Message();
            $msg->author = $author->id;
            $msg->props = [
                'text' => $message,
                'created' => time(),
                'changed' => time(),
            ];
            $msg->save();
        } catch (\Exception $e) {
            $response->setStatusCode(500, 'An error occurred saving the data');
            return $response;
        }

        $msg->author = $author;

        return [$msg];
    }

    /**
     * Get content.
     *
     * @return array
     *   An array of content objects.
     */
    protected function getContent()
    {
        $messages = Message::with('author:id,props')->get();
        return $messages->toArray();
    }
}
