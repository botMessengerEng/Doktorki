import { Pipe, PipeTransform } from '@angular/core';

@Pipe(
    {
        name: 'cityFilter'
    })

export class CityFilter implements PipeTransform {
    transform(value: any, cityArrayBoolean: any, cities): any {
console.log('dsds');
let rr=new Array();
          rr=this.x(cityArrayBoolean,cities);

             return rr ? 
                    value.filter((filtered: any) => {
                    return rr.find(element => element!=filtered.address.city);
  
                    }
    ) :value;
          

}


x(cityArrayBoolean,cities){
            let result= new Array();

       for (let i = 0; i < cityArrayBoolean.length; i++) {
                if(cityArrayBoolean[i]){
                    result.push(cities[i]);
                    console.log(result)
                }
             }
 return result;
}

}