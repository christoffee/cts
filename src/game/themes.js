game.module(
    'game.themes'
)
.body(function() {
game.flavours = [

    { name: 'sq" original',
        1: { 'colour': 'GREEN', 'colorCode': 1, 'button': 'green-square', 'fill': '662d91' },
        2: { 'colour': 'YELLOW', 'colorCode': 2, 'button': 'yellow-square', 'fill': 'FFFF00' },
        3: { 'colour': 'BLUE', 'colorCode': 3, 'button': 'blue-square', 'fill': '0071BC'  },
        4: { 'colour': 'RED', 'colorCode': 4, 'button': 'red-square', 'fill': 'FF003C' }
    },
    { name: 'sq" alt1',
        1: { 'colour': 'purple', 'colorCode': 1, 'button': 'purple-square', 'fill': 'FABE28' },
        2: { 'colour': 'black', 'colorCode': 2, 'button': 'black-square', 'fill': 'FFFF00' },
        3: { 'colour': 'orange', 'colorCode': 3, 'button': 'orange-square', 'fill': '0071BC'  },
        4: { 'colour': 'dgreen', 'colorCode': 4, 'button': 'dgreen-square', 'fill': 'FF003C' }
    },
    { name: 'full english',
        1: { 'colour': 'bacon', 'colorCode': 1, 'button': 'fried-bacon', 'fill': 'ffcc66' },
        2: { 'colour': 'fried egg', 'colorCode': 2, 'button': 'fried-egg', 'fill': 'F2F2F2' },
        3: { 'colour': 'sausage', 'colorCode': 3, 'button': 'fried-sausage', 'fill': '4B2409'  },
        4: { 'colour': 'beans', 'colorCode': 4, 'button': 'fried-beans', 'fill': 'FBB03B' }
    },
    { name: 'desserts',
        1: { 'colour': 'ice cream', 'colorCode': 1, 'button': 'dessert-icecream', 'fill': '29ABE2' },
        2: { 'colour': 'donut', 'colorCode': 2, 'button': 'dessert-donut', 'fill': 'FF7BAC' },
        3: { 'colour': 'cookie', 'colorCode': 3, 'button': 'dessert-cookie', 'fill': '8C6239'  },
        4: { 'colour': 'lemon', 'colorCode': 2, 'button': 'dessert-jelly', 'fill': 'FFFF00' }
    },
    { name: 'fish & chips',
        1: { 'colour': 'fish', 'colorCode': 1, 'button': 'fc-fish', 'fill': '88C100'  },
        2: { 'colour': 'mushy peas', 'colorCode': 2, 'button': 'fc-peas', 'fill': '009245' },
        3: { 'colour': 'chips', 'colorCode': 3, 'button': 'fc-chips', 'fill': 'FFFF00' },
        4: { 'colour': 'pie', 'colorCode': 4, 'button': 'fc-pie', 'fill': 'A67C52' }
    },
    { name: 'fast food',
        1: { 'colour': 'burger', 'colorCode': 1, 'button': 'ff-burger', 'fill': '006837' },
        2: { 'colour': 'onion', 'colorCode': 2, 'button': 'ff-onion', 'fill': 'FFFF00' },
        3: { 'colour': 'fish', 'colorCode': 3, 'button': 'ff-nuggets', 'fill': 'E79022'  },
        4: { 'colour': 'freid chicken', 'colorCode': 4, 'button': 'ff-chicken', 'fill': '42210B' }
    },
    { name: 'cup cakes',
        1: { 'colour': 'lemon', 'colorCode': 1, 'button': 'cc-lemon', 'fill': '22B573   ' },
        2: { 'colour': 'strawberry', 'colorCode': 2, 'button': 'cc-strawberry', 'fill': 'FFFF00' },
        3: { 'colour': 'plum', 'colorCode': 3, 'button': 'cc-plum', 'fill': 'E79022'  },
        4: { 'colour': 'chocolate', 'colorCode': 4, 'button': 'cc-chocolate', 'fill': '42210B' }
    } ,
    { name: 'jelly beans',
        1: { 'colour': 'lemon', 'colorCode': 1, 'button': 'jb-green', 'fill': '413C53   ' },
        2: { 'colour': 'strawberry', 'colorCode': 2, 'button': 'jb-purple', 'fill': 'FFFF00' },
        3: { 'colour': 'plum', 'colorCode': 3, 'button': 'jb-red', 'fill': 'E79022'  },
        4: { 'colour': 'chocolate', 'colorCode': 4, 'button': 'jb-white', 'fill': '42210B' }
    }
];

game.secret = [

    { name: 'original',
        1: { 'colour': 'GREEN', 'colorCode': 1, 'button': 'christoffee1', 'fill': '000000' },
        2: { 'colour': 'YELLOW', 'colorCode': 2, 'button': 'christoffee2', 'fill': 'FFFF00' },
        3: { 'colour': 'BLUE', 'colorCode': 3, 'button': 'christoffee3', 'fill': '0071BC'  },
        4: { 'colour': 'RED', 'colorCode': 4, 'button': 'christoffee4', 'fill': 'FF003C' }
    }
];
});
