const categories = [
    {
        name: "Burger",
        image: "assets/categories/Burger.png"
    },
    {
        name: "Pizza",
        image: "assets/categories/Pizza.png"
    },
    {
        name: "Tacos",
        image: "assets/categories/Tacos.png"
    },
    {
        name: "Sushi",
        image: "assets/categories/Sushi.png"
    },
    {
        name: "Pasta",
        image: "assets/categories/Pasta.png"
    }
];

const products = [
    // === BURGERS ===
    {
        id: 1,
        name: "Cheeseburger",
        category: "Burger",
        price: 199,
        image: "assets/images/burgers/Cheeseburger.png",
        description: "A juicy grilled beef patty topped with melted cheddar cheese, fresh lettuce, tomato, and our signature sauce on a toasted bun."
    },
    {
        id: 2,
        name: "Bacon Burger",
        category: "Burger",
        price: 249,
        image: "assets/images/burgers/Bacon Burger.png",
        description: "Our signature beef patty layered with crispy bacon strips, cheddar cheese, sliced pickles, and smoky barbecue sauce."
    },
    {
        id: 3,
        name: "Chicken Crisp Burger",
        category: "Burger",
        price: 189,
        image: "assets/images/burgers/Chicken Crisp Burger.png",
        description: "Crispy golden chicken breast fillet topped with creamy mayonnaise, fresh lettuce, and tangy pickles on a sesame bun."
    },
    {
        id: 4,
        name: "Veggie Burger",
        category: "Burger",
        price: 179,
        image: "assets/images/burgers/Veggie Burger.png",
        description: "A delicious plant-based patty packed with roasted vegetables and grains, served with lettuce, avocado slices, and herb aioli."
    },
    {
        id: 5,
        name: "Classic Double Burger",
        category: "Burger",
        price: 299,
        image: "assets/images/burgers/Classic Double burger.png",
        description: "Double the beef and double the cheese! Two flame-grilled patties, double cheddar, lettuce, onions, and classic burger relish."
    },

    // === PIZZAS ===
    {
        id: 6,
        name: "Margherita Pizza",
        category: "Pizza",
        price: 299,
        image: "assets/images/pizza/Margherita Pizza.png",
        description: "The classic Italian pizza made with rich tomato sauce, fresh mozzarella cheese, fresh basil leaves, and a drizzle of olive oil."
    },
    {
        id: 7,
        name: "BBQ Chicken Pizza",
        category: "Pizza",
        price: 379,
        image: "assets/images/pizza/BBQ Chicken Pizza.png",
        description: "Tender grilled chicken pieces, red onions, and fresh cilantro on a sweet and smoky barbecue sauce base, topped with mozzarella."
    },
    {
        id: 8,
        name: "Hawaiian Pizza",
        category: "Pizza",
        price: 349,
        image: "assets/images/pizza/Hawaiian Pizza.png",
        description: "A perfect sweet and savory combination of sliced ham, juicy pineapple chunks, mozzarella cheese, and tomato sauce."
    },
    {
        id: 9,
        name: "Veggie Supreme Pizza",
        category: "Pizza",
        price: 329,
        image: "assets/images/pizza/Veggie Supreme Pizza.png",
        description: "Loaded with colorful bell peppers, onions, black olives, sweet corn, mushrooms, and cherry tomatoes over fresh mozzarella."
    },
    {
        id: 10,
        name: "Pepperoni Feast Pizza",
        category: "Pizza",
        price: 399,
        image: "assets/images/pizza/Pepperoni Feast Pizza.png",
        description: "An all-time favorite loaded with premium sliced pepperoni, extra mozzarella cheese, and rich marinara sauce."
    },

    // === PASTAS ===
    {
        id: 11,
        name: "Spaghetti Carbonara",
        category: "Pasta",
        price: 279,
        image: "assets/images/pasta/Spaghetti Carbonara.png",
        description: "Classic Roman pasta dish made with spaghetti, crispy pancetta, eggs, pecorino romano cheese, and cracked black pepper."
    },
    {
        id: 12,
        name: "Fettuccine Alfredo",
        category: "Pasta",
        price: 269,
        image: "assets/images/pasta/Fettuccine Alfredo.png",
        description: "Rich and creamy Alfredo sauce tossed with flat fettuccine pasta and topped with freshly grated parmesan cheese."
    },
    {
        id: 13,
        name: "Lasagna",
        category: "Pasta",
        price: 319,
        image: "assets/images/pasta/Lasagna.png",
        description: "Layered lasagna sheets baked with seasoned ground beef bolognese, creamy bechamel, marinara sauce, and melted mozzarella."
    },
    {
        id: 14,
        name: "Penne Arrabbiata",
        category: "Pasta",
        price: 249,
        image: "assets/images/pasta/Penne Arrabbiata.png",
        description: "Penne pasta tossed in a spicy, fiery tomato sauce cooked with garlic, red chili flakes, and fresh parsley."
    },
    {
        id: 15,
        name: "Pesto Cremoso Pasta",
        category: "Pasta",
        price: 289,
        image: "assets/images/pasta/Pesto Cremoso Pasta.png",
        description: "Fresh pasta coated in a rich basil pesto cream sauce, blended with pine nuts, garlic, and fresh cherry tomatoes."
    },

    // === SUSHI ===
    {
        id: 16,
        name: "Salmon Nigiri",
        category: "Sushi",
        price: 349,
        image: "assets/images/sushi/Salmon Nigiri.png",
        description: "Slices of premium fresh raw salmon served over hand-formed seasoned sushi rice pads, with a touch of wasabi."
    },
    {
        id: 17,
        name: "California Roll",
        category: "Sushi",
        price: 299,
        image: "assets/images/sushi/California Roll.png",
        description: "Inside-out roll containing crab stick, fresh avocado, and cucumber, rolled with toasted sesame seeds and flying fish roe."
    },
    {
        id: 18,
        name: "Spicy Tuna Roll",
        category: "Sushi",
        price: 329,
        image: "assets/images/sushi/Spicy Tuna Roll.png",
        description: "Flavorsome sushi roll filled with minced spicy tuna and green onions, served with ginger slices and soy sauce."
    },
    {
        id: 19,
        name: "Dragon Roll",
        category: "Sushi",
        price: 389,
        image: "assets/images/sushi/Dragon Roll.png",
        description: "A premium roll with shrimp tempura and cucumber inside, layered with sliced avocado and eel, drizzled with sweet unagi sauce."
    },
    {
        id: 20,
        name: "Rainbow Roll",
        category: "Sushi",
        price: 399,
        image: "assets/images/sushi/Rainbow Roll.png",
        description: "A colorful California roll topped with an assortment of fresh raw fish fillets (tuna, salmon, yellowtail) and sliced avocado."
    },

    // === TACOS ===
    {
        id: 21,
        name: "Beef Taco",
        category: "Tacos",
        price: 159,
        image: "assets/images/tacos/Beef Taco.png",
        description: "Seasoned ground beef inside soft corn tortillas, loaded with fresh lettuce, shredded cheese, diced tomatoes, and sour cream."
    },
    {
        id: 22,
        name: "Fish Taco",
        category: "Tacos",
        price: 179,
        image: "assets/images/tacos/Fish Taco.png",
        description: "Crispy battered fish fillets inside tortillas, topped with shredded cabbage slaw and chipotle cream sauce."
    },
    {
        id: 23,
        name: "Pork Carnitas Taco",
        category: "Tacos",
        price: 169,
        image: "assets/images/tacos/Pork Carnitas Taco.png",
        description: "Slow-roasted tender pork carnitas served with diced onions, fresh cilantro, lime wedges, and green salsa."
    },
    {
        id: 24,
        name: "Veggie Taco",
        category: "Tacos",
        price: 149,
        image: "assets/images/tacos/Veggie Taco.png",
        description: "Grilled zucchini, sweet corn, black beans, and bell peppers topped with crumbled cotija cheese and avocado crema."
    },
    {
        id: 25,
        name: "Spicy Chicken Taco",
        category: "Tacos",
        price: 169,
        image: "assets/images/tacos/Spicy Chicken Taco.png",
        description: "Shredded chicken cooked in spicy adobo sauce, topped with fresh lettuce, pico de gallo, and pickled jalapenos."
    }
];