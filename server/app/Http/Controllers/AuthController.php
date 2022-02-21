<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Cart;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{
    public function login(Request $request){
        $input = $request->all();

        $jsondata = [];
        $rules = array('username' => 'required', 'password' => 'required');
        $newnames = array(
            'username' => 'Username',
            'password' => 'Password'
        );

        $messages = array(
            'required' => ':attribute is required.',
        );
        $v = Validator::make($input, $rules, $messages);
        $v->setAttributeNames($newnames);
        if ($v->fails()) {
                $jsondata['status'] = 0;
                $jsondata['message'] = $v->messages();
                return json_encode($jsondata);
        } 
            $userTab = new User();
            $user = $userTab->getUserProfileByUsername($request->input('username'));
           
            if (empty($user)) {
                    $jsondata['status'] = 0;
                    $jsondata['message'] = $v->errors()->add('username','Login Authentication failed.');
                    return json_encode($jsondata);
            } 
            $hashedPassword = Hash::make($request->password);
            $isValid = Hash::check($request->password, $hashedPassword);
            
            // now check if is true then login else
            //return  false with rediecrt
            if (($isValid == false)) {
                
                $jsondata['status'] = 0;
                $jsondata['message'] = $v->errors()->add('username','Login Authentication failed.');
                return response()->json($jsondata, 200);
            } 
            $token = Str::random(60);
            $user->api_token = hash('sha256', $token);
            $user->save();
            $jsondata['status'] = 1;
            $jsondata['message'] = "Login successfull.";
            $jsondata['token'] = $user->api_token;
            return response()->json($jsondata, 200);
    }

    public function signup(Request $request){
        $input = $request->all();
        $jsondata = [];
        $rules = array('fullname' => 'required','username' => 'required','email' => "required|email|unique:users,email", 'password' => 'required');
        $newnames = array(
            'fullname' => 'Full name',
            'username' => 'Username',
            'email' => 'Email',
            'password' => 'Password'
        );

        $messages = array(
            'required' => ':attribute is required.',
        );
        $v = Validator::make($input, $rules, $messages);
        $v->setAttributeNames($newnames);
        if ($v->fails()) {
            $jsondata['status'] = 0;
            $jsondata['message'] = $v->messages();
            return json_encode($jsondata);
        } 
        $userTab = new User();
        
        $hashedPassword = Hash::make($request->password);
        
        $userTab->fullname = $request->fullname;
        $userTab->username = $request->username;
        $userTab->email = $request->email;
        $userTab->password = $hashedPassword;
        $token = Str::random(60);
        $userTab->api_token = hash('sha256', $token);
        $userTab->save();
        $jsondata['status'] = 1;
        $jsondata['message'] = "Created account successfully.";
        $jsondata['token'] = $userTab->api_token;
        return response()->json($jsondata, 200);
    }

    public function updateCartQty(Request $request)
    {
        $cartObject = new Cart();
        $cartObject->updateCartQty($request);
        response()->json(['message' => "Quantity updated successfully", "status" => 1]);
    }

    public function removeCartItem(Request $request)
    {
        $cartObject = new Cart();
        $cartObject->removeCartItem($request);
        response()->json(['message' => "Item removed successfully", "status" => 1]);
    }

    public function clearAllCart()
    {
        $cartObject = new Cart();
        $cartObject->clearCart($request);
        response()->json(['message' => "Cart is empty now", "status" => 1]);
    }
}