import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


 // public apiUrl:string="http://localhost:4000/cartItems/"
 public cartItem:any=[];
 public productList=new BehaviorSubject<any>([]);

  constructor(private hc:HttpClient) { }
  setproduct(product:any){
    this.cartItem.push(...product);
    this.productList.next(product);
      }
  getProducts(){
    return this.productList.asObservable();
   }
  getCartItems(): Observable<any> {

       return this.hc.get<any>("http://localhost:4000/cartItems")
  }
   




addToCart(item:any):Observable<any>
{ 
  this.cartItem.push(item);
  this.productList.next(this.cartItem);
  const userPhoneNumber:any = sessionStorage.getItem('username');
  // console.log("usernumber",userPhoneNumber);
  // console.log("add-service",item);

//   const params = new HttpParams().append('username', userPhoneNumber );
// console.log("ser-number",params);

  return this.hc.post(`http://ec2-54-172-210-123.compute-1.amazonaws.com:8080/tokenbased-0.0.1-SNAPSHOT/cart/cart/add/${userPhoneNumber}/${item}`,item)

}

removeCartItem(product:any): Observable<any>{
  console.log("remove",this.cartItem)
  this.cartItem.map((a:any,index:any)=>{
    if(product.id===a.id){
      this.cartItem.splice(index,1);
   
    }
  })
  this.productList.next(this.cartItem);
  
  return this.hc.delete(`http://localhost:4000/cartItems/${product.id}`)
}

removeAllcart(): Observable<any>{
  this.cartItem=[]
  this.productList.next(this.cartItem);
  return this.hc.delete<any>("http://localhost:4000/cartItems");
}


///Return Order function////

// checkout payment Data
CheckOutData(item:any):Observable<any>
{
  return this.hc.post("http://localhost:4000/Orders",item);
}

Orders():Observable<any>
{
  return this.hc.get(" http://localhost:4000/Orders");
}

CancelOrder(item:any):Observable<any>
{
  //console.log("cancelorder",item);
  return this.hc.delete(`http://localhost:4000/Orders/${item.id}`);
}
// PostOrder(item:any):Observable<any>
// {
//   return this.hc.post("http://localhost:4000/History",item)
// }
// History():Observable<any>
// {
//   return this.hc.get("http://localhost:4000/History")
// }
}
