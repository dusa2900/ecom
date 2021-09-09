
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/SERVICES/products.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CartService } from 'src/app/SERVICES/cart.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent implements OnInit {
  order:any=[];
 orders:any=[]
  reasonReturn:boolean=true;
  @ViewChild('returnProduct') returnProduct!:ElementRef;

  reasonStatus:any;
 adminStatus:any;
  adminReturn: boolean=true;
  commentForm:any
  products: any[]=[];
  dataid: any;
  historydata: any;
  constructor(private cs:CartService,private formbuilder:FormBuilder,private hc:HttpClient) { 
    this.commentForm=this.formbuilder.group({
      reason:['',[Validators.required,Validators.minLength(10)]],
      status:['',[Validators.required]],
      })
  }


  public color:number=50;
  public width:any;
  public bgcolor1:any="#3268ff";
  public bgcolor2:any;
  public bgcolor3:any;
  public bgcolor4:any;

 

  fun()

  {
    if(this.color == 0)
    {
      this.width="5%";
      this.bgcolor1="#3268ff"
    }
   else if (this.color >= 0 && this.color < 40) {
  this.width="34%";
    this.bgcolor2="#3268ff"
    }
    else if (this.color >= 40 && this.color < 80) {
      this.width="66%";
      this.bgcolor2="#3268ff";
      this.bgcolor3="#3268ff"
    }
    
    else if (this.color >= 80) {
      this.width="100%";
      this.bgcolor2="#3268ff";
      this.bgcolor3="#3268ff";
      this.bgcolor4="#3268ff"
    }
    else {
      console.log("No color");
    }
  
}

getorders(){
  this.cs.Orders().subscribe(res=>
    {
      this.order=res;
    
      this.order.map((item:any) => {

        console.log("orderid",item.orderId);


item.paycartS.map((item1:any) => {

console.log("idd",item1);

  this.products.push(item1)
  console.log("item",this.products);


  
})
        


      })

      console.log("get orders",res);
      
    }
    )
}


gettrackorder(cartsid:any){
 
  
  this.cs.Trackorder(cartsid).subscribe(res=>{ 
    console.log("trackorder",res);
  })

}
cancelorder(cartsid:any){
 
  this.cs.CancelOrder(cartsid).subscribe(res=>{ 

    console.log("CancelOrder",res);
  })

}

history(){
 

  this.cs.History().subscribe(res=>{ 
    this.historydata=res
    console.log("historydata",res);
  })

}

  ngOnInit(){
    this.getorders()

this.history()



this.cs.userOrders().subscribe( 
  (res:any)=>
  {
    console.log("returnn",res);
    
    this.orders=res;
    this.orders.forEach((a:any)=>{
      Object.assign(a,{reason:'',status:'pending'})
    })
   
  }
)
}
//   onReturn(order:any)
//   {
//     order.reason=this.returnProduct.nativeElement.value;
 
//     console.log("userreturn",order);
//  this.cs.returnOrder(order).subscribe(res=>    console.log("gettt",res));
//     alert(`Return request send successfully`)

    
//     this.reasonReturn=false;
//   }

  onReturn(order:any)
  {

 this.cs.returnOrder(order).subscribe(res=>    console.log("gettt",res));
    // alert(`Return request send successfully`)


  }




}
// function value(value: any) {
//   throw new Error('Function not implemented.');
// }

