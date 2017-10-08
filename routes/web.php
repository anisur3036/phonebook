<?php
Route::get('/', function () {
    return view('welcome');
});
Route::get('/phonebook/{name}', function() {
	return redirect('/');
})->where('name', '[A-Za-z]+');

Route::resource('phonebook', 'PhoneBookController');
