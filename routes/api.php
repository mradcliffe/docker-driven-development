<?php

use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'message'], function () {
    Route::get('/', 'ContentController@index')->name('message.index');
    Route::get('/{id}', 'ContentController@get')->name('message.show');
    Route::post('/', 'ContentController@new')->name('message.create');
});
