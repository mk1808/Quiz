import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  menuItems = [
    {
      name: "Dragée wafer",
      items: [
        {
          name:"Candy soufflé",
          destination:"#"
        },
        {
          name:"jelly beans",
          destination:"#"
        },
        {
          name:"Icing pastry",
          destination:"#"
        },
        {
          name:"toffee jelly-o",
          destination:"#"
        }
      ]
    },
    {
      name: "candy donut",
      items: [
        {
          name:"Dessert liquorice",
          destination:"#"
        },
        {
          name:"jelly beans",
          destination:"#"
        },
        {
          name:"Icing pastry",
          destination:"#"
        },
        {
          name:"toffee jelly-o",
          destination:"#"
        }
      ]
    },
    {
      name: "Jelly tiramisu ",
      items: [
        {
          name:"Candy soufflé",
          destination:"#"
        },
        {
          name:"jelly beans",
          destination:"#"
        },
        {
          name:"Icing pastry",
          destination:"#"
        },
        {
          name:"toffee jelly-o",
          destination:"#"
        }
      ]
    },
    {
      name: "Candy canes",
      items: [
        {
          name:"Candy soufflé",
          destination:"#"
        },
        {
          name:"jelly beans",
          destination:"#"
        },
        {
          name:"Icing pastry",
          destination:"#"
        },
        {
          name:"toffee jelly-o",
          destination:"#"
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
