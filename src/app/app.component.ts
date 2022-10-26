import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jonaspizza';
  pizzas = [
    {
      name:'Tomatos',
      price:1,
      small:false,
      medium:false,
      large:false,
      extralarge:false
    },
    {
      name:'Onions',
      price:0.5,
      small:false,
      medium:false,
      large:false,
      extralarge:false
    },
    {
      name:'Bell Pepper',
      price:1,
      small:false,
      medium:false,
      large:false,
      extralarge:false
    },
    {
      name:'Mushrooms',
      price:1.2,
      small:false,
      medium:false,
      large:false,
      extralarge:false
    },
    {
      name:'Pineable',
      price:0.75,
      small:false,
      medium:false,
      large:false,
      extralarge:false
    },
    {
      name:'Sausage',
      price:1,
      small:false,
      medium:false,
      large:false,
      extralarge:false
    },
    {
      name:'Peperoni',
      price:2,
      small:false,
      medium:false,
      large:false,
      extralarge:false
    },
    {
      name:'Barbecue Chicken',
      price:3,
      small:false,
      medium:false,
      large:false,
      extralarge:false
    }
  ];
  kindOffer = 0;

  getPizzaSizePrice(pizza:any){
    if(pizza.small)
      return 5;
    else if(pizza.medium)
      return 7;
    else if(pizza.large)
      return 8;
    else if(pizza.extralarge)
      return 9;
    else 
      return 0;
  }

  onChangeCheckbox(kind:string,index:number){
    if(kind=='small'){
      this.pizzas[index].small= !this.pizzas[index].small;
      this.pizzas[index].medium= false;
      this.pizzas[index].large= false;
      this.pizzas[index].extralarge= false;
    }else if(kind=='medium'){
      this.pizzas[index].small= false;
      this.pizzas[index].medium= !this.pizzas[index].medium;
      this.pizzas[index].large= false;
      this.pizzas[index].extralarge= false;
    }else if(kind=='large'){
      this.pizzas[index].small= false;
      this.pizzas[index].medium= false;
      this.pizzas[index].large= !this.pizzas[index].large;
      this.pizzas[index].extralarge= false;
    }else if(kind=='extralarge'){
      this.pizzas[index].small= false;
      this.pizzas[index].medium= false;
      this.pizzas[index].large= false;
      this.pizzas[index].extralarge= !this.pizzas[index].extralarge;
    }
  }

  getPartialValue(){
    let value = 0;
    for(var i = 0;i < this.pizzas.length;i++){
      var pizza = this.pizzas[i];
      if(pizza.small || pizza.medium || pizza.extralarge || pizza.large){
        value+= pizza.price * this.getPizzaSizePrice(pizza);
      }
    }
    return value;
  }

  getMeddiumPizzaValue(){
    let value = 0;
    for(var i = 0;i < this.pizzas.length;i++){
      var pizza = this.pizzas[i];
      if(pizza.medium){
        value+= pizza.price * this.getPizzaSizePrice(pizza);
      }
    }
    return value;
  }

  detectOffer(){
    let value = 0;
    let qtdeMeddium = 0;
    let qtdeLarge = 0;
    let offerOne = false;
    let offerTwo = false;
    let lastOffer  = false;
    let priceLarge = 0;
    this.kindOffer = 0;

    for(var i = 0;i < this.pizzas.length;i++){
      var pizza = this.pizzas[i];
      if(pizza.medium)
        qtdeMeddium+=1;

      if(pizza.large){
        qtdeLarge+=(pizza.name!='Peperoni'&&pizza.name!='Barbecue Chicken'?1:2);
        priceLarge+=pizza.price*(pizza.name!='Peperoni'&&pizza.name!='Barbecue Chicken'?1:2);
      }
        
      if(pizza.medium && qtdeMeddium>=2)
        offerOne=true;

      if(pizza.medium && qtdeMeddium>=4)
        offerTwo=true;

      if(pizza.large && qtdeMeddium>=4)
        lastOffer=true;
    }

    //use offer
    if(lastOffer){
      this.kindOffer=3;
      value=priceLarge*0.5;//just subtract the value
    }else if(offerTwo){
      this.kindOffer=2;
      value=(qtdeMeddium/4)*9;//first we will subtract all meddiuns and add at the end
    }else if(offerOne){
      this.kindOffer=1;
      value=5;//just subtract the value
    }

    return value;
  }

  getTotalValueWithDiscont(){
    var discont = this.detectOffer();
    var partialValue = this.getPartialValue();
    if(this.kindOffer==0)
      return partialValue;
    else if(this.kindOffer==2 || this.kindOffer==1)
      return partialValue-discont;
    else {
      return partialValue-this.getMeddiumPizzaValue()+discont;
    }
  }

  getNameOffer(){
    this.detectOffer();
    if(this.kindOffer>0)
      return 'Offer ' + this.kindOffer.toString();
    else 
      return '';
  }

}
