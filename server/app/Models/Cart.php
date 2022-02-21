<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
class Cart extends Model
{
    use HasFactory;

    public function product(){
        return $this->hasOne(Product::class, "id", "product_id");
    }

    function findByProductAndUser($product_id, $user_id){
        return $this->where("product_id", $product_id)->where("user_id", $user_id)->first();
    }

    function getUserCart($request){
        $user = new User();
        
        $userData = $user->getByToken($request->bearerToken());
        if(empty($userData)){
            return false;
        }
        $cart_data =  $this->where('user_id', $userData->id)->get();
        $cart_data->map(function($item) use ($userData){
            $item->description = $item->product->description; 
            $item->image = $item->product->image; 
            $item->name = $item->product->name; 
            return $item;
        });
        return $cart_data;
    }

    function addToCart($request){
        $user = new User();
        $userData = $user->getByToken($request->bearerToken());
        
        if(empty($userData)){
            return false;
        }
        $cart_item = $this->findByProductAndUser($request->id, $userData->id);
        if(empty($cart_item)){
            $cartObject = new Cart;
            $cartObject->qty = 1;
            $cartObject->price = $request->price;
            $cartObject->product_id = $request->id;
            $cartObject->user_id = $userData->id;
            $cartObject->save();
            return [$cartObject, 1];
        }
        
        $cart_item->qty = 1;
        $cart_item->update();
        return [$cart_item, 0];
    }

    function updateCartQty($request){
        $user = new User();
        $userData = $user->getByToken($request->bearerToken());
        
        if(empty($userData)){
            return false;
        }
        $cart_item = $this->findByProductAndUser($request->product_id, $userData->id);
        if(empty($cart_item)){
            return;
        }
        
        $cart_item->qty = $request->qty;
        $cart_item->update();
    }

    function removeCartItem($request){
        $user = new User();
        $userData = $user->getByToken($request->bearerToken());
        
        if(empty($userData)){
            return false;
        }
        $cart_item = $this->findByProductAndUser($request->product_id, $userData->id);
        if(empty($cart_item)){
            return;
        }

        
        
        $cart_item->delete();
    }

    function clearCart($request){
        $user = new User();
        $userData = $user->getByToken($request->bearerToken());
        
        if(empty($userData)){
            return false;
        }
        $this->where("user_id", $userData->id)->delete();
    }
}
